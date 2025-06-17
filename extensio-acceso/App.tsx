import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigation/MainNavigator";
import { OfflineBanner } from "./src/components/OfflineBanner";
import { NetInfoProvider } from "./src/context/NetInfoContext";
import { useSyncOnReconnect } from "./src/hooks/useSyncOnReconnect";

export default function App() {
  useSyncOnReconnect();

  return (
    <NetInfoProvider>
      <NavigationContainer>
        <OfflineBanner />
        <MainNavigator />
      </NavigationContainer>
    </NetInfoProvider>
  );
}
