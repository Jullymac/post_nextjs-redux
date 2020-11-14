import { combineReducers } from "redux";
import settingsReducer from "./user/settings";
import userReducer from "./user";
import postsReducer from "./posts";

export default combineReducers({
  settings: settingsReducer,
  user: userReducer,
  posts: postsReducer,
});
