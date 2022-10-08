import React, { FC, useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import * as Haptics from "expo-haptics";

import WatchlistItem from "./WatchlistItem";
import * as watchlistActions from "../store/actions/watchlist";

import Coin from "../models/Coin";
import Colors from "../constants/Colors";
import { AnyAction } from "redux";

interface TopMoversProps {
  coinData: Coin[];
}

const Watchlist: FC<TopMoversProps> = ({ coinData }) => {
  const dispatch = useDispatch();

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<Coin>) => {
      return (
        <WatchlistItem
          id={item.id}
          name={item.name}
          symbol={item.symbol}
          price={item.price}
          percentChange={item.percentChange}
          drag={drag}
          isActive={isActive}
        />
      );
    },
    []
  );

  return (
    <View>
      <Text style={styles.title}>Watchlist</Text>
      <View style={styles.watchlistContainer}>
        {coinData.length > 0 ? (
          <DraggableFlatList
            data={coinData}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            onDragBegin={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }
            onDragEnd={({ data }) =>
              dispatch(
                watchlistActions.updateCoinData(data) as unknown as AnyAction
              )
            }
            renderItem={renderItem}
          />
        ) : (
          <Text style={styles.title}>Your watchlist is empty.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    fontWeight: "600",
    marginTop: 64,
    marginBottom: 10,
  },
  watchlistContainer: {
    width: "88%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.border,
    backgroundColor: "white",
  },
});

export default Watchlist;
