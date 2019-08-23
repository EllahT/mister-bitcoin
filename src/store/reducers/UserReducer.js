import types from "../types";

export default function ContactReducer(state = { user: {} }, action) {
  switch (action.type) {
    case types.GET_USER:
      return { ...state, user: action.data };
    default:
      return state;
  }
}
