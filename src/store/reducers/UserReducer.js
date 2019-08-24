import types from "../actions/userActions/userActionTypes";

export default function userReducer(state = { user: null }, action) {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
