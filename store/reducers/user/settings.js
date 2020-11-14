import { HYDRATE } from "next-redux-wrapper";
import { USER_SETTINGS_UPDATE_LANGUAGE } from "../../actions";

const initialState = {
  language: "pt-br",
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
