import thunk from "redux-thunk";
import reducer from "./reducers";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";

const middlewares = [thunk];
if (process.env.NODE_ENV !== "production") {
  middlewares.push(createLogger());
}

export default () => createStore(reducer, applyMiddleware(...middlewares));
