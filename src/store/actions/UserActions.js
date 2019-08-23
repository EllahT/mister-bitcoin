import types from "../types";
import userService from "../../services/UserService";

export const fetchData = (data, type) => {
  return {
    type: types[type],
    data
  };
};

export const getUser = () => {
  return async dispatch => {
    try {
      const res = await userService.getUser();
      return dispatch(fetchData(res, "GET_USER"));
    } catch (err) {
      throw err;
    }
  };
};

export const getUserMoves = () => {
  return async dispatch => {
    try {
      const res = await userService.getUserMoves();
      return dispatch(fetchData(res, "GET_USER_MOVES"));
    } catch (err) {
      throw err;
    }
  };
};
