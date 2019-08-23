import { combineReducers } from "redux";
import ContactReducer from "./ContactsReducer";
import UserReducer from "./UserReducer";

const combinedReducer = combineReducers({
  ContactReducer,
  UserReducer
});

export default combinedReducer;
