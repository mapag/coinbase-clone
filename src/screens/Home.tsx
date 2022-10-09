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
import { NewsState } from "../store/reducers/news";

import { useSelector, useDispatch } from "react-redux";

import * as watchlistActions from "../store/actions/watchlist";
import * as topmoversActions from "../store/actions/topmovers";
import * as newsActions from "../store/actions/news";

import Watchlist from "../components/Watchlist";
import { AnyAction } from "redux";
import TopMoversList from "../components/TopMoversList";
import NewsList from "../components/NewsList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

interface RootState {
  news: NewsState;
  watchlist: WatchlistState;
  topmovers: TopMoversState;
}

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const watchlistData = useSelector((state: RootState) => state.watchlist);

  const topmoversData = useSelector((state: RootState) => state.topmovers);

  const newsData = useSelector((state: RootState) => state.news);

  console.log(newsData);
  const dispatch = useDispatch();
  const loadData = () => {
    try {
      dispatch(watchlistActions.fetchCoinData() as unknown as AnyAction);
      dispatch(topmoversActions.fetchTopMoversData() as unknown as AnyAction);
      dispatch(newsActions.fetchNewsData() as unknown as AnyAction);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const viewMoreHandler = () => {
    navigation.navigate("News");
  };

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
        <NewsList
          isHomeScreen={true}
          viewMoreHandler={viewMoreHandler}
          newsData={newsData.news}
        />
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
