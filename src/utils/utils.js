function formatURL(url, params) {
  Object.entries(params).forEach(([name, value]) => {
    url = url.replace(`:${name}`, value.toString());
  });
  return url;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getTodayAsInputVal() {
  var local = new Date();
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
}

function createSortFuncTxt(txt, op) {
  return (a, b) => {
    if (op === "+") {
      if (a[txt] > b[txt]) {
        return 1;
      } else if (a[txt] < b[txt]) {
        return -1;
      } else {
        return 0;
      }
    } else {
      if (a[txt] < b[txt]) {
        return 1;
      } else if (a[txt] > b[txt]) {
        return -1;
      } else {
        return 0;
      }
    }
  };
}

export default {
  getRandomInt,
  makeId,
  getTodayAsInputVal,
  createSortFuncTxt,
  formatURL
};
