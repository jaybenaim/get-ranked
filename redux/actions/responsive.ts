import * as t from "../types";

export const setWindowWidth = (decoded) => {
  return {
    type: t.SET_WINDOW_WIDTH,
    payload: decoded,
  };
};

