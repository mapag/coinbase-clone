import { AnyAction } from "redux";
import Coin from "../../models/Coin";
import { SET_TOP_MOVERS_DATA } from "../actions/topmovers";

export interface TopMoversState {
  topMovers: Coin[];
}

const initialState: TopMoversState = {
  topMovers: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TOP_MOVERS_DATA:
      return {
        ...state,
        topMovers: action.coinData,
      };
    default:
      return state;
  }
};
