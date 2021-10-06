import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./reducers/rootReducer"
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger();

const middleware = [thunk, loggerMiddleware];

const initialState = {};

const makeStore = () =>
createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
)

export const wrapper = createWrapper(makeStore)
