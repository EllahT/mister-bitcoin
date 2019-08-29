import types from "./contactsActionTypes";
import contactService from "../../../services/contactService";

const _setContactsSearchTerm = searchTerm => ({
  type: types.SET_CONTACTS_SEARCH_TERM,
  searchTerm
});

const _setContacts = (contacts, isFiltered) => ({
  type: types.SET_CONTACTS,
  contacts,
  isFiltered
});

const _setContact = contact => ({
  type: types.SET_CONTACT,
  contact
});

const loadContacts = (searchTerm = "") => {
  return async dispatch => {
    try {
      dispatch(_setContacts(null, !!searchTerm));
      const res = await contactService.getContacts(searchTerm);
      dispatch(_setContacts(res, !!searchTerm));
      dispatch(_setContactsSearchTerm(searchTerm));
      return res;
    } catch (err) {
      throw err;
    }
  };
};

const deleteContact = id => async dispatch => {
  try {
    await contactService.deleteContact(id);
    dispatch({ type: types.DELETE_CONTACT, id });
  } catch (err) {
    throw err;
  }
};

const loadContactById = id => async dispatch => {
  try {
    dispatch(loadContacts());
    const contact = await contactService.getContactById(id);
    dispatch(_setContact(contact));
    return;
  } catch (err) {
    throw err;
  }
};

const saveContact = contact => async dispatch => {
  try {
    await contactService.saveContact(contact);
    dispatch({ type: types.SAVE_CONTACT, contact });
  } catch (err) {
    throw err;
  }
};

export default {
  loadContacts,
  deleteContact,
  loadContactById,
  saveContact
};
