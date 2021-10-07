import * as t from "../types";

const initialState = {
  errors: {}
};

// eslint-disable-next-line
export default function errorReducers(state = initialState, action) {
  switch (action.type) {
    case t.GET_ERRORS:
      return state;
    case t.SET_ERRORS:
      state.errors = { ...state.errors, ...action.payload }
      return state;
    default:
      return state;
  }
}
