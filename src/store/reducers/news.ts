import { AnyAction } from "redux";
import News from "../../models/News";
import { SET_NEWS_DATA } from "../actions/news";

export interface NewsState {
  news: News[];
}

const initialState: NewsState = {
  news: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_NEWS_DATA:
      return {
        news: action.news,
      };
    default:
      return state;
  }
};
