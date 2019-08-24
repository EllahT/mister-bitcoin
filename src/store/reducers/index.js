import { combineReducers } from "redux";
import contactReducer from "./contactsReducer";
import userReducer from "./userReducer";

const combinedReducer = combineReducers({
  contacts: contactReducer,
  user: userReducer
});

export default combinedReducer;
