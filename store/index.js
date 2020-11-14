import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reducers from "./reducers/index";

export function makeStore(initialState) {
  // Create store
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware())
  );

  // Return store
  return store;
}
