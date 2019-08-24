import types from "./contactsActionTypes";
import ContactService from "../../../services/ContactService";

const setContactsSearchTerm = searchTerm => ({
  type: types.SET_CONTACTS_SEARCH_TERM,
  searchTerm
});

const setContacts = (contacts, isFiltered) => ({
  type: types.SET_CONTACTS,
  contacts,
  isFiltered
});

export const fetchContacts = (searchTerm = "") => {
  return async dispatch => {
    try {
      dispatch(setContacts(null, !!searchTerm));
      const res = await ContactService.getContacts(searchTerm);
      dispatch(setContacts(res, !!searchTerm));
      dispatch(setContactsSearchTerm(searchTerm));
      return res;
    } catch (err) {
      throw err;
    }
  };
};

export const deleteContact = id => async dispatch => {
  try {
    await ContactService.deleteContact(id);
    dispatch({ type: types.DELETE_CONTACT, id });
  } catch (err) {
    throw err;
  }
};
