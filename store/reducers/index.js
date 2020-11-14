import { combineReducers } from "redux";
import settingsReducer from "./user/settings";
import userReducer from "./user";

export default combineReducers({
  settings: settingsReducer,
  user: userReducer,
});
