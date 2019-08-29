import types from "../actions/contactsActions/contactsActionTypes";
import initialState from "../initialState";

export default (state = initialState.contacts, action) => {
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

    case types.SET_CONTACT:
      return { ...state, currContact: action.contact };

    case types.SAVE_CONTACT:
      let updatedContacts = action.contact._id
        ? state.contacts.filter(contact =>
            contact._id !== action.contact._id ? contact : action.contact
          )
        : [...state.contacts, action.contact];
      return { ...state, contacts: updatedContacts };

    default:
      return state;
  }
};
