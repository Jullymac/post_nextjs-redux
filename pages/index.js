import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { storeWrapper } from "./../store";
import UserDetails from "../components/UserDetails";
import styles from "../styles/Home.module.css";
import { settingsUpdateLang } from "../store/actions/user/settings";
import { userUpdate, userReset } from "../store/actions/user";
import { postsUpdateList } from "../store/actions/posts";

const Home = () => {
  const dispatch = useDispatch();

  // Example get store state
  const { language } = useSelector((state) => state.settings);
  const { id, fullName } = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  // Examples dispatch
  const handleSwitchLang = () => {
    const newLang = language === "pt-br" ? "en" : "pt-br";
    dispatch(settingsUpdateLang(newLang));
  };

  const handleLogin = () => {
    const firstNames = ["John", "Mary", "Natalie", "Max", "Ammy"];
    const lastNames = ["Doe", "Poppins", "Romanoff", "Steel", "Winehouse"];
    dispatch(
      userUpdate({
        id: Math.floor(Math.random() * 31),
        firstName: firstNames[Math.floor(Math.random() * 5)],
        lastName: lastNames[Math.floor(Math.random() * 5)],
      })
    );
  };

  const handleLogout = () => {
    dispatch(userReset());
  };

  const truncateString = (text, count) =>
    text.length > count ? `${text.substring(0, count)}...` : text;

  return (
    <div className={styles.container}>
      <Head>
        <title>Project: NextJs + Redux + Saga</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Project: NextJs + Redux + Saga</h1>

        <p className={styles.description}>
          <a href="https://bit.ly/35e8aN3" target="_blank">
            Click here to check the tutorial
          </a>
        </p>

        <section className={styles.userDetails}>
          <UserDetails
            id={id}
            language={language}
            name={fullName}
            isLoggedIn={id !== null}
            onSwitchLanguage={handleSwitchLang}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </section>

        <section className={styles.grid}>
          {posts.map((post) => (
            <article key={post.id} className={styles.card}>
              <h3>{truncateString(post.title, 15)}</h3>
              <p>{truncateString(post.body, 90)}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className={styles.footer}>
        <a href="https://bit.ly/3o4zbLq" target="_blank">
          Created by
          <img src="/logo.png" alt="Jullymac Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export const getServerSideProps = storeWrapper.getServerSideProps(
  async ({ store }) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();

    // Example get store state server side
    const state = store.getState();
    const { postsPerPage } = state.settings;

    //Example dispatch server side
    store.dispatch(postsUpdateList(posts.slice(0, postsPerPage)));

    return {
      props: {},
    };
  }
);

export default Home;
