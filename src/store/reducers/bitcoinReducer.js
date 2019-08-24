import types from "../actions/bitcoinActions/bitcoinActionTypes";
import initialState from "../initialState";

export default (state = initialState.bitcoin, action) => {
  switch (action.type) {
    case types.SET_CURRENCY:
      return { ...state, currency: action.currency };

    case types.SET_CONFIRMED_TRANSACTIONS_DATA:
      return {
        ...state,
        confirmedTransactionsData: action.confirmedTransactionsData
      };

    case types.SET_MARKET_PRICES_DATA:
      return { ...state, marketPricesData: action.marketPricesData };

    default:
      return state;
  }
};
