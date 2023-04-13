import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loading = () => (
  <ActivityIndicator style={styles.loading} animating={true} />
);

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 999,
  },
});
export default Loading;
