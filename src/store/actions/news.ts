import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { NewsState } from "../reducers/news";

import News from "../../models/News";

export const SET_NEWS_DATA = "SET_NEWS_DATA";

export const fetchNewsData = () => {
  return async (dispatch: ThunkDispatch<NewsState, void, Action>) => {
    try {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
      );
      const responseData = await response.json();

      const newsData: News[] = [];

      for (const data of responseData.Data) {
        const formattedDate = new Date(data.published_on * 1000)
          .toString()
          .split(" ")
          .splice(1, 2)
          .join(" ");

        newsData.push(
          new News(
            data.source_info.name,
            formattedDate,
            data.title,
            data.url,
            data.imageurl
          )
        );

        if (newsData.length === 20) {
          break;
        }
      }

      dispatch({
        type: SET_NEWS_DATA,
        news: newsData,
      });
    } catch (err) {
      throw err;
    }
  };
};
