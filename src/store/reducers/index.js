import { combineReducers } from "redux";
import contactReducer from "./contactsReducer";
import userReducer from "./userReducer";
import bitcoinReducer from "./bitcoinReducer";

const combinedReducer = combineReducers({
  contacts: contactReducer,
  user: userReducer,
  bitcoin: bitcoinReducer
});

export default combinedReducer;
