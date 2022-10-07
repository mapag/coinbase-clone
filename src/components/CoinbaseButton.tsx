import React, { FC } from "react";
import {
  TouchableHighlight,
  View,
  Text,
  Animated,
  StyleSheet,
} from "react-native";
import * as Haptics from "expo-haptics";
import Colors from "../constants/Colors";

interface CoinbaseButtonProps {
  title: string;
}

const CoinbaseButton: FC<CoinbaseButtonProps> = ({ title }) => {
  const animatedValue = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableHighlight
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{ borderRadius: 10 }}
        activeOpacity={0.8}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <View style={styles.button}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    borderRadius: 8,
  },
  button: {
    width: "100%",
    height: 57,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.cbBlue,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
export default CoinbaseButton;
