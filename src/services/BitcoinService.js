import Axios from "axios";

export default {
  getCurrency,
  getMarketPrice,
  getConfirmedTransactions
};

async function getCurrency() {
  const currency = _load("bitcoinCurrency");
  if (currency) return Promise.resolve(currency);
  else {
    const res = await Axios.get(
      "https://blockchain.info/tobtc?currency=USD&value=1"
    );
    _store("bitcoinCurrency", res.data);
    return res.data;
  }
}

async function getMarketPrice() {
  const marketPrice = _load("marketPrice");
  if (marketPrice) return Promise.resolve(marketPrice);
  else {
    const res = await Axios.get(
      "https://api.blockchain.info/charts/market-price?timespan=6months&format=json&cors=true"
    );
    const data = res.data;
    const ratesByDay = data.values.map(day => day.y);
    _store("marketPrice", ratesByDay);
    return ratesByDay;
  }
}

async function getConfirmedTransactions() {
  const confirmedTransactions = _load("confirmedTransactions");
  if (confirmedTransactions) return Promise.resolve(confirmedTransactions);
  else {
    const res = await Axios.get(
      "https://api.blockchain.info/charts/n-transactions?format=json&timespan=30days&cors=true"
    );
    const data = res.data;
    const transByDay = data.values.map(day => day.y);
    _store("confirmedTransactions", transByDay);
    return transByDay;
  }
}

function _store(key, any) {
  localStorage[key] = JSON.stringify(any);
}

function _load(key) {
  var str = localStorage[key] || "null";
  return JSON.parse(str);
}
