import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import Colors from "../constants/Colors";
import CoinbaseButton from "../components/CoinbaseButton";

import { WatchlistState } from "../store/reducers/watchlist";
import { TopMoversState } from "../store/reducers/topmovers";

import { useSelector, useDispatch } from "react-redux";

import * as watchlistActions from "../store/actions/watchlist";
import * as topmoversActions from "../store/actions/topmovers";

import WatchlistItem from "../components/WatchlistItem";
import Watchlist from "../components/Watchlist";
import { AnyAction } from "redux";
import TopMoversListItem from "../components/TopMoversListItem";
import TopMoversList from "../components/TopMoversList";

interface RootState {
  watchlist: WatchlistState;
  topmovers: TopMoversState;
}

const Home = () => {
  const watchlistData = useSelector((state: RootState) => state.watchlist);

  const topmoversData = useSelector((state: RootState) => state.topmovers);

  console.log(JSON.stringify(topmoversData));

  const dispatch = useDispatch();
  const loadData = () => {
    try {
      dispatch(watchlistActions.fetchCoinData() as unknown as AnyAction);
      dispatch(topmoversActions.fetchTopMoversData() as unknown as AnyAction);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Image
          source={{ uri: "https://i.imgur.com/9EEaSaS.png" }}
          style={styles.image}
        />
        <Text style={styles.title}>Welcome to Coinbase!</Text>
        <Text style={styles.subTitle}>Make your first investment today</Text>
        <CoinbaseButton title="Get started" />
        <Watchlist coinData={watchlistData.watchlistData} />
        <TopMoversList coinData={topmoversData.topMovers} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  image: {
    height: 250,
    width: 150,
    marginTop: 40,
  },
  title: {
    fontSize: 21,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subTitle: {
    fontSize: 17,
    marginBottom: 24,
    color: Colors.subtitle,
  },
});

export default Home;
