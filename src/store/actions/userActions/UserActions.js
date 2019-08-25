import types from "./userActionTypes";
import userService from "../../../services/userService";

const _setUser = user => ({ type: types.SET_USER, user });

const loadLoggedUser = () => {
  return async dispatch => {
    try {
      const user = await userService.getLoggedUser();
      return dispatch(_setUser(user));
    } catch (err) {
      console.log("had problems with loading logged user", err);
      throw err;
    }
  };
};

const login = username => {
  return async dispatch => {
    try {
      const user = await userService.login(username);
      return dispatch(_setUser(user));
    } catch (err) {
      console.log("had problems with login", err);
      throw err;
    }
  };
};

const signup = username => {
  return async dispatch => {
    try {
      const user = await userService.signup(username);
      return dispatch(_setUser(user));
    } catch (err) {
      console.log("had problems with signup", err);
      throw err;
    }
  };
};

const logout = () => {
  return async dispatch => {
    try {
      await userService.logout();
      return dispatch(_setUser(null));
    } catch (err) {
      console.log("had problems with logout", err);
      throw err;
    }
  };
};

const createTransaction = (contact, amount) => {
  return async dispatch => {
    try {
      const user = await userService.createTransaction(contact, amount);
      return dispatch(_setUser(user));
    } catch (err) {
      console.log("had problems with creating a transaction", err);
      throw err;
    }
  };
};

export default {
  loadLoggedUser,
  login,
  signup,
  logout,
  createTransaction
};
