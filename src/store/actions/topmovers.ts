import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import Coin from "../../models/Coin";
import cmpData from "../../data/CoinMarketCapData";
import { TopMoversState } from "../reducers/topmovers";

export const SET_TOP_MOVERS_DATA = "SET_TOP_MOVERS_DATA";

interface CBRequiredData {
  quote_currency: string;
  base_currency: string;
}

export const fetchTopMoversData = () => {
  return async (dispatch: ThunkDispatch<TopMoversState, void, Action>) => {
    try {
      const cbResponse = await fetch("https://api.pro.coinbase.com/products");
      const cbResponseData = await cbResponse.json();

      const availableCoins: string[] = [];

      const filteredCoins = cbResponseData.filter(
        (coin: CBRequiredData) => coin.quote_currency === "USD"
      );

      filteredCoins.forEach((coin: CBRequiredData) => {
        availableCoins.push(coin.base_currency);
      });

      const cryptoResponse = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${availableCoins
          .slice(0, 100)
          .join()}`
      );

      const cryptoResponseData = await cryptoResponse.json();

      let dataAsArray: any[] = Object.values(cryptoResponseData.RAW);

      dataAsArray.sort((a: any, b: any) =>
        Math.abs(a.USD.CHANGEPCT24HOUR) < Math.abs(b.USD.CHANGEPCT24HOUR)
          ? 1
          : -1
      );

      const coinData: Coin[] = [];

      for (const data of dataAsArray) {
        try {
          const coinDetails = data.USD ?? {};
          const cmpDetails = cmpData.data.find(
            (cmpCoin) => cmpCoin.symbol === coinDetails.FROMSYMBOL
          );
          const coinId = cmpDetails?.id ?? 0;
          const coinName = cmpDetails?.name ?? "N/A";

          coinData.push(
            new Coin(
              coinId,
              coinName,
              coinDetails.FROMSYMBOL,
              coinDetails.PRICE,
              coinDetails.CHANGEPCT24HOUR
            )
          );

          if (coinData.length === 6) {
            break;
          }

          dispatch({ type: SET_TOP_MOVERS_DATA, coinData: coinData });
        } catch (error) {
          console.log(data, error);
          throw error;
        }
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };
};
