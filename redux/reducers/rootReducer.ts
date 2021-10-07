import { combineReducers } from "redux"
import responsive from "./responsive"
import errors from './errorReducers'
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  errors,
  responsive,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
})

export default rootReducer;