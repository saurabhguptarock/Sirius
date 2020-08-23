import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];
let devtools = (x: any): any => x;
declare let window: any;

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
