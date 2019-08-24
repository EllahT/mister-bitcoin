import types from "../actions/userActions/userActionTypes";
import initialState from "../initialState";

export default (state = initialState.users, action) => {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
