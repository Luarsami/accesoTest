import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Producer } from "../models/Producer";
import { getProducers } from "../api/producersApi";
import ProducerCard from "../components/ProducerCard";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/MainNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Nav = NativeStackNavigationProp<RootStackParamList, "Producers">;

export default function ProducersScreen() {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<Nav>();

  const loadProducers = async () => {
    try {
      const data = await getProducers();
      setProducers(data);
    } catch (error) {
      console.error("Error loading producers", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProducers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadProducers();
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  return (
    <FlatList
      data={producers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProducerCard
          producer={item}
          onPress={() =>
            navigation.navigate("VisitForm", { producerId: item.id })
          }
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}
