import { combineReducers } from "redux"
import responsive from "./responsive"
import errors from './errorReducers'
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  errors,
  responsive,
  firestore: firestoreReducer,
})

export default rootReducer;