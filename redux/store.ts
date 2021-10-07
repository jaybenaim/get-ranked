import { createStore, applyMiddleware, compose, Store } from "redux"
import thunk from "redux-thunk"
import { Context, createWrapper } from "next-redux-wrapper"
import rootReducer from "./reducers/rootReducer"
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger();

const middleware = [thunk, loggerMiddleware];

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
)

const makeStore = () => store

const wrapper = createWrapper(makeStore)

// create a makeStore function

export { wrapper, store }
