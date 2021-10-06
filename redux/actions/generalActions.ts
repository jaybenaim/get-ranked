import * as t from "../types";

export const setErrors = (decoded) => {
  return {
    type: t.SET_ERRORS,
    payload: decoded,
  };
};

