import { WatchlistState } from "./../reducers/watchlist";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Coin from "../../models/Coin";
import cmpData from "../../data/CoinMarketCapData";

export const SET_WATCHLIST_DATA = "SET_WATCHLIST_DATA";

export const fetchCoinData = () => {
  return async (dispatch: ThunkDispatch<WatchlistState, void, Action>) => {
    const coins = ["BTC", "ETH", "XRP", "DOGE", "SHIB", "MANA"];

    try {
      const cryptoResponse = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
      );

      const cryptoResponseData = await cryptoResponse.json();

      const coinData: Coin[] = [];
      coins.forEach((coin) => {
        try {
          const coinDetails = cryptoResponseData.RAW[coin].USD ?? {};
          const cmpDetails = cmpData.data.find(
            (cmpCoin) => cmpCoin.symbol === coinDetails.FROMSYMBOL
          );
          const coinId = cmpDetails?.id ?? 0;
          const coinName = cmpDetails?.name ?? "N/A";

          coinData.push(
            new Coin(
              coinId,
              coinName,
              coin,
              coinDetails.PRICE,
              coinDetails.CHANGEPCT24HOUR
            )
          );
        } catch (error) {
          console.log(coin, error);
          throw error;
        }
      });

      dispatch({ type: SET_WATCHLIST_DATA, coinData });
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCoinData = (newData: Coin[]) => {
  return async (dispatch: ThunkDispatch<WatchlistState, void, Action>) => {
    dispatch({ type: SET_WATCHLIST_DATA, coinData: newData });
  };
};
