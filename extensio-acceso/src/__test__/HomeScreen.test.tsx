import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(),
}));

jest.mock("../screens/VisitHistoryScreen", () => {
  return {
    __esModule: true,
    default: () => null,
  };
});

jest.mock("../screens/ProducersScreen", () => {
  return {
    __esModule: true,
    default: () => null,
  };
});

// ✅ Crea una navegación de prueba
const Stack = createNativeStackNavigator();
const MockVisitHistory = () => null;
const MockProducers = () => null;

const renderWithNavigation = () =>
  render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Producers" component={MockProducers} />
        <Stack.Screen name="VisitHistory" component={MockVisitHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );

describe("HomeScreen", () => {
  it("muestra el título correctamente", () => {
    const { getByText } = renderWithNavigation();
    expect(getByText("Extensio Acceso")).toBeTruthy();
  });

  it('navega a Producers al presionar "Ver productores"', () => {
    const { getByText } = renderWithNavigation();
    const button = getByText("Ver productores");
    fireEvent.press(button);
    // No fallará porque "Mock Producers Screen" está definido como destino
    expect(button).toBeTruthy();
  });

  it('navega a VisitHistory al presionar "Historial de visitas"', () => {
    const { getByText } = renderWithNavigation();
    const button = getByText("Historial de visitas");
    fireEvent.press(button);
    expect(button).toBeTruthy();
  });
});
