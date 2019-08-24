import types from "./userActionTypes";
import userService from "../../../services/UserService";

const setUser = user => ({ type: types.SET_USER, user });

export const loadUser = () => {
  return async dispatch => {
    try {
      const user = await userService.loadUser();
      return dispatch(setUser(user));
    } catch (err) {
      throw err;
    }
  };
};
