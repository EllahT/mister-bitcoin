export default {
  getUser
};

function getUser() {
  return Promise.resolve({
    name: "Moshe Cohen",
    coins: 100,
    moves: []
  });
}
