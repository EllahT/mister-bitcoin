import types from "../types";
import ContactService from "../../services/ContactService";

const fetchData = data => {
  return {
    type: types.FETCH_CONTACTS,
    data
  };
};

export const fetchContactsData = (filterBy = null) => {
  return async dispatch => {
    try {
      const res = await ContactService.getContacts(filterBy);
      return dispatch(fetchData(res));
    } catch (err) {
      throw err;
    }
  };
};
