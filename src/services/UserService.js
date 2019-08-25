import utilService from "../utils/utils";

export default {
  login,
  signup,
  logout,
  createTransaction,
  getLoggedUser
};

const USERSKEY = "bitcoinUsers";
const LOGGEDINUSERKEY = "bitcoinLoggedUser";

let currUserId = _load(LOGGEDINUSERKEY) || null;
let users = _load(USERSKEY) || [];

function getLoggedUser() {
  const currUser = users.find(user => user._id === currUserId);
  if (!currUser) Promise.reject("no logged in user");
  return Promise.resolve(currUser);
}

function signup(username) {
  if (users.find(u => u.username === username))
    return Promise.reject(
      "username already exists, choose another one or log in"
    );
  const user = {
    _id: utilService.makeId(),
    username,
    coins: 100,
    transactions: []
  };
  users.push(user);
  saveUsers();
  return login(username);
}

function login(username) {
  const loggedUser = users.find(user => user.username === username);
  _store(LOGGEDINUSERKEY, loggedUser._id);
  currUserId = loggedUser._id;
  return getLoggedUser();
}

function logout() {
  currUserId = null;
  _store(LOGGEDINUSERKEY, null);
}

function createTransaction(contact, amount) {
  const transaction = {
    toId: contact._id,
    to: contact.name,
    at: new Date(),
    amount
  };
  const currUser = users.find(user => user._id === currUserId);
  const currUserIdx = users.findIndex(user => user._id === currUserId);
  currUser.transactions.push(transaction);
  users.splice(currUserIdx, 1, currUser);
  saveUsers();
  return Promise.resolve(currUser);
}

function saveUsers() {
  _store(USERSKEY, users);
}

function _store(key, any) {
  localStorage[key] = JSON.stringify(any);
}

function _load(key) {
  var str = localStorage[key] || "null";
  return JSON.parse(str);
}
