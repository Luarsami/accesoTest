// src/screens/HomeScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/MainNavigator";
import { commonStyles, typography } from "../theme/styles";

export const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={commonStyles.container}>
      <Text style={typography.title}>Extensio Acceso</Text>

      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => navigation.navigate("Producers")}
      >
        <Text style={typography.buttonText}>Ver productores</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => navigation.navigate("VisitHistory")}
      >
        <Text style={typography.buttonText}>Historial de visitas</Text>
      </TouchableOpacity>
    </View>
  );
};
