import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ListReducer from "./TileReducer";

export default combineReducers({
  auth: AuthReducer,
  lists: ListReducer,
});
