import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNetInfo } from "../context/NetInfoContext";

export const OfflineBanner = () => {
  const { isConnected } = useNetInfo();

  if (isConnected) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sin conexión a internet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f44336",
    padding: 8,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
