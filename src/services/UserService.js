export default {
  loadUser
};

function loadUser() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: "Moshe Cohen",
        coins: 100,
        moves: []
      });
    }, 500);
  });
}

function addUser() {}
