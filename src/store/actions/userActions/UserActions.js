import types from "./userActionTypes";
import userService from "../../../services/userService";

const _setUser = user => ({ type: types.SET_USER, user });

const loadUser = () => {
  return async dispatch => {
    try {
      const user = await userService.loadUser();
      return dispatch(_setUser(user));
    } catch (err) {
      throw err;
    }
  };
};

export default {
  loadUser
};
