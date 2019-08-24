import types from "./bitcoinActionTypes";
import bitcoinService from "../../../services/bitcoinService";

const _setCurrency = currency => ({ type: types.SET_CURRENCY, currency });

const loadCurrency = () => async dispatch => {
  try {
    const currency = await bitcoinService.getCurrency();
    dispatch(_setCurrency(currency));
  } catch (err) {
    console.log("somthing went wrong", err);
    throw err;
  }
};

const _setMarketPricesData = marketPricesData => ({
  type: types.SET_MARKET_PRICES_DATA,
  marketPricesData
});

const loadMarketPricesData = () => async dispatch => {
  try {
    const data = await bitcoinService.getMarketPrice();
    dispatch(_setMarketPricesData(data));
  } catch (err) {
    console.log("somthing went wrong", err);
    throw err;
  }
};

const _setConfirmedTransactionsData = confirmedTransactionsData => ({
  type: types.SET_CONFIRMED_TRANSACTIONS_DATA,
  confirmedTransactionsData
});

const loadConfirmedTransactionsData = () => async dispatch => {
  try {
    const data = await bitcoinService.getConfirmedTransactions();
    dispatch(_setConfirmedTransactionsData(data));
  } catch (err) {
    console.log("somthing went wrong", err);
    throw err;
  }
};

export default {
  loadCurrency,
  loadMarketPricesData,
  loadConfirmedTransactionsData
};
