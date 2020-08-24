import thunk from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import TileReducer from "./reducers/TileReducer";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

const initialState = {};
const middleware = [thunk];
let devtools = (x: any): any => x;
declare let window: any;

const RootReducer = combineReducers({
  auth: AuthReducer,
  tiles: TileReducer,
});

if (
  process.env.NODE_ENV !== "production" &&
  process.browser &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const Store = createStore(
  RootReducer,
  initialState,
  compose(applyMiddleware(...middleware), devtools)
);
export default Store;
