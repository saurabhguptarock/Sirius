import { SET_LOADING, SET_ERROR } from "../actions/AppStateAction";

const initialState = { isLoading: true, error: "" };

const AppStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default AppStateReducer;
