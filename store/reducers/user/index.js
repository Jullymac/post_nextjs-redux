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
