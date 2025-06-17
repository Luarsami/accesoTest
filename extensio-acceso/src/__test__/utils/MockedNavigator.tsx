import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../screens/HomeScreen";
import ProducersScreen from "../../screens/ProducersScreen";

const Stack = createNativeStackNavigator();

export const MockedNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Producers" component={ProducersScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
