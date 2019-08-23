import types from "../types";

export default function ContactReducer(state = { contacts: [] }, action) {
  switch (action.type) {
    case types.FETCH_CONTACTS:
      return { ...state, contacts: action.data };
    default:
      return state;
  }
}
