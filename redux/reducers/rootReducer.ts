import { combineReducers } from "redux"
import responsive from "./responsive"
import errors from './errorReducers'

const rootReducer = combineReducers({
  errors,
  responsive
})

export default rootReducer;