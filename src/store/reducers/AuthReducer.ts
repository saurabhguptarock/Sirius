import { LOGIN_USER, LOGOUT_USER } from "../actions/AuthAction";

const initialState = {
  user: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.user,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
export default AuthReducer;
