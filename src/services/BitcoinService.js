import Axios from "axios";

export default {
  getCurrency,
  getMarketPrice,
  getConfirmedTransactions
};

async function getCurrency() {
  const res = await Axios.get(
    "https://blockchain.info/tobtc?currency=USD&value=1"
  );
  return res.data;
}

async function getMarketPrice() {
  const res = await Axios.get(
    "https://api.blockchain.info/charts/market-price?timespan=6months&format=json&cors=true"
  );
  const data = res.data;
  const ratesByDay = data.values.map(day => day.y);
  return ratesByDay;
}

async function getConfirmedTransactions() {
  const res = await Axios.get(
    "https://api.blockchain.info/charts/n-transactions?format=json&timespan=30days&cors=true"
  );
  const data = res.data;
  const transByDay = data.values.map(day => day.y);
  return transByDay;
}
