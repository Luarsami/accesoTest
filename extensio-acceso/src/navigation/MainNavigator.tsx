// src/navigation/MainNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import ProducersScreen from "../screens/ProducersScreen";
import VisitFormScreen from "../screens/VisitFormScreen";
import VisitHistoryScreen from "../screens/VisitHistoryScreen";

export type RootStackParamList = {
  Home: undefined;
  Producers: undefined;
  VisitForm: { producerId: string };
  VisitHistory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
      <Stack.Screen
        name="Producers"
        component={ProducersScreen}
        options={{ title: "Productores" }}
      />
      <Stack.Screen
        name="VisitForm"
        component={VisitFormScreen}
        options={{ title: "Nueva Visita" }}
      />
      <Stack.Screen
        name="VisitHistory"
        component={VisitHistoryScreen}
        options={{ title: "Historial" }}
      />
    </Stack.Navigator>
  );
}
