import types from "../actions/contactsActions/contactsActionTypes";

export default function contactReducer(
  state = { contacts: null, filteredContacts: null, searchTerm: "" },
  action
) {
  switch (action.type) {
    case types.SET_CONTACTS:
      if (action.isFiltered) {
        return { ...state, filteredContacts: action.contacts };
      } else {
        return { ...state, contacts: action.contacts };
      }

    case types.DELETE_CONTACT:
      const newContacts = state.contacts.filter(
        contact => contact._id !== action.id
      );
      return { ...state, contacts: newContacts };

    case types.SET_CONTACTS_SEARCH_TERM:
      return { ...state, searchTerm: action.searchTerm };

    default:
      return state;
  }
}
