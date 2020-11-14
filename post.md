Nesse post vou explicar o passo a passo para instalar o [Redux](https://redux.js.org/) no [NexJs](https://nextjs.org/).
Usaremos a versão mais atual de ambos, que no momento é **NexJs v10.0.1** e **Redux 7.2.2**.

Você pode ver o código completo no repositório abaixo:
{% github Jullymac/post_nextjs-redux no-readme %}

## Instalação

Iniciaremos instalando o NextJs com o create app:

```sh
npx create-next-app project
```

Este comando criará um projeto no diretório "project" com a estrutura inicial para trabalharmos no NextJs.

O próximo passo é instalar o Redux para ReacJs e mais algumas depedências:

```sh
npm install redux react-redux next-redux-wrapper
npm install --save-dev redux-devtools-extension
```

- [redux](https://www.npmjs.com/package/redux) = Redux package
- [react-redux](https://www.npmjs.com/package/react-redux) = Extensão para utilizar o Redux com ReactJs
- [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) = HOC que une Next.js e Redux
- [redux-devtools-extension](https://www.npmjs.com/package/redux-devtools-extension) = Pacote para debugar alterações de estado

Agora que temos tudo instalado, é hora de colocar a mão na massa!

## Actions (ações)

> Uma ação é um objeto JavaScript simples que possui um campo de tipo.
> Você pode pensar em uma ação como um evento que descreve algo que aconteceu na aplicação.

Primeiro vamos criar nossa lista de tipos de ações em `/store/actions/index.js`:

```js
// *** USER ***
export const USER_UPDATE = "USER_UPDATE";
export const USER_RESET = "USER_RESET";

// *** SETTINGS ***
export const USER_SETTINGS_UPDATE_LANGUAGE = "USER_SETTINGS_UPDATE_LANGUAGE";

// *** POSTS ***
export const POSTS_UPDATE_LIST = "POSTS_UPDATE_LIST";
```

Agora vamos criar as nossas ações.

As de usuário em `/store/actions/users/index.js`:

```js
import { USER_UPDATE, USER_RESET } from "../";

export const userUpdate = (user) => ({
  type: USER_UPDATE,
  payload: user,
});

export const userReset = () => {
  return {
    type: USER_RESET,
  };
};
```

As de configurações de usuário, em `/store/actions/users/settings.js`:

```js
import { USER_SETTINGS_UPDATE_LANGUAGE } from "../";

export const settingsUpdateLang = (lang) => ({
  type: USER_SETTINGS_UPDATE_LANGUAGE,
  payload: lang,
});
```

As de postagens, em `/store/actions/posts/index.js`:

```js
import { POSTS_UPDATE_LIST, POSTS_GET_LIST } from "../";

export const postsUpdateList = (posts) => {
  return {
    type: POSTS_UPDATE_LIST,
    payload: posts,
  };
};
```

## Reducers

O próximo passo é criar os reducers.

> Um reducer é uma função que recebe o estado atual e um objeto de ação, decide como atualizar o estado se necessário e retorna o novo estado.

O novo estado retornado é o que será guardado na store.

Vamos criar o reducer de usuário em `/store/reducers/users/index.js`:

```js
import { HYDRATE } from "next-redux-wrapper";
import { USER_UPDATE, USER_RESET } from "../../actions";

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  fullName: null,
  avatar: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user };
    case USER_UPDATE:
      const newState = { ...state, ...action.payload };
      newState.fullName = `${newState.firstName} ${newState.lastName}`;
      return newState;
    case USER_RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
```

O reducer de configurações do usuário em `/store/reducers/users/settings.js`:

```js
import { HYDRATE } from "next-redux-wrapper";
import { USER_SETTINGS_UPDATE_LANGUAGE } from "../../actions";

const initialState = {
  language: "pt-br",
  postsPerPage: 4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.settings };
    case USER_SETTINGS_UPDATE_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export default reducer;
```

O reducer de postagens em `/store/reducers/posts/index.js`:

```js
import { HYDRATE } from "next-redux-wrapper";
import { POSTS_UPDATE_LIST } from "../../actions";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload.posts;
    case POSTS_UPDATE_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
```

Como deve ter notado, nossos reducers possuem um tipo de ação chamado "HYDRATE" que importamos do pacote `next-redux-wrapper`.

O termo "Hydrate" é bastante usado quando falamos de server-side rendering (SSR). Hydrate consiste em fazer a aplicação ajustar a versão que vem do server com a versão do client.
Mas ao invés de substituir tudo, nós apenas atualizamos o conteúdo do server aplicando as alterações do client ao conteúdo existente.

O NextJs já faz um trabalho excepcional com o Hydrate do DOM. Para nossa Redux store, nós precisamos adicionar o tipo de ação "HYDRATE" e informar como queremos que essa atualização ocorra.

No paylod do "HYDRATE" recebemos todo o estado da store. Nos nossos exemplos fazemos uma substituição apenas dos dados do reducer que está sendo hidratado no momento.
Em uma aplicação real, cada caso deve ser analisado para ser feita a reconciliação da forma correta.

Com todos os reducers criados, vamos fazer a combiná-los para adicionar na nossa store.
Em `/store/reducers/index.js`:

```js
import { combineReducers } from "redux";
import settingsReducer from "./user/settings";
import userReducer from "./user";
import postsReducer from "./posts";

export default combineReducers({
  settings: settingsReducer,
  user: userReducer,
  posts: postsReducer,
});
```

## Store

> O estado atual da aplicação é guardado em um objeto chamado store.

Vamos criar a store em `/store/index.js`:

```js
import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reducers from "./reducers";

const makeStore = () => {
  // Create store
  const store = createStore(reducers, composeWithDevTools());

  // Return store
  return store;
};

// export an assembled wrapper
export const storeWrapper = createWrapper(makeStore, { debug: false });
```

## Inicializar a store

Tudo criado, mas nada disso funciona se não fizermos a inicialização da store na aplicação, certo?

Vamos alterar o arquivo `/pages/_app.js`. Nele vamos importar o wrapper da nossa store e vamos aplicá-la no export da aplicação. O resultado:

```js
import "../styles/globals.css";
import { storeWrapper } from "../store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default storeWrapper.withRedux(MyApp);
```

## Mais algumas terminologias

### Dispatch

> A store do Redux possui um método chamado dispatch. A única forma que temos de atualizar um estado é chamando o dispatch passando uma ação. A store vai executar o reducer e salvar o novo estado.

Usamos o dispatch sempre que precisamos atualizar algo na store.

### Selectors

> Selectors são funções que sabem como extrair informações específicas do estado da store.

Usamos os selectores para recuperar um valor guardado na store.

Obs: Alternativamente também podemos acessar todo o estado utilizando o método `getState` disponível na store do Redux.

## Exemplos de utilização

Existem algumas formas de acessar nossa store, que variam de acordo com o local que tentamos acessar.

### Em componentes usamos Hooks

Dentro de componentes conseguimos manipular a store utilizando hooks.
Para isso devemos fazer o import dos hooks:

```js
import { useSelector, useDispatch } from "react-redux";
```

O useSelector Hook recebe uma função que tem acesso a todo o estado da store, e deve retornar apenas as informações que desejamos utilizar.

Exemplo:

```js
const { language } = useSelector((state) => state.settings);
const { id, fullName } = useSelector((state) => state.user);
const posts = useSelector((state) => state.posts);
```

O useDispatch Hook não recebe parâmetros, e sempre retorna a função de dispatch.

```js
const dispatch = useDispatch();
```

Para fazermos o dispatch, devemos importar a ação que vamos utilizar e enviá-la para o dispatch:

```js
import { settingsUpdateLang } from "../store/actions/user/settings";
```

```js
const handleSwitchLang = () => {
  const newLang = language === "pt-br" ? "en" : "pt-br";
  dispatch(settingsUpdateLang(newLang));
};
```

### Em **getServerSideProps** e **getStaticProps** usamos o context

Para isso, devemos importar o nosso storeWrapper e utilizarmos o método específico de cada um.

```js
import { storeWrapper } from "./../store";
```

Em `getServerSideProps` :

```js
export const getServerSideProps = storeWrapper.getServerSideProps(
  async ({ store }) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();

    // Example get store state
    const state = store.getState();
    const { postsPerPage } = state.settings;

    //Example dispatch
    store.dispatch(postsUpdateList(posts.slice(0, postsPerPage)));

    return {
      props: {},
    };
  }
);
```

Nos exemplos acima podemos ver como recuperar o estado, nesse caso utilizando o `store.getState();` e como fazer o dispatch, utilizando `store.dispatch`.

Podemos utilizar exatamente da mesma forma no `getStaticProps`, apenas alteramos o método do storeWrapper:

```js
export const getStaticProps = storeWrapper.getStaticProps(async ({ store }) => {
  // ...

  return {
    props: {},
  };
});
```
