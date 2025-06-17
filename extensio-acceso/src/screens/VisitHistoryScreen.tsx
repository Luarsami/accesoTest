import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchAllVisits } from "../services/visitService";
import { Visit } from "../services/visitService";

export default function VisitHistoryScreen() {
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllVisits();
        setVisits(data);
      } catch (err) {
        console.warn("Error al cargar visitas", err);
      }
    };
    load();
  }, []);

  const renderItem = ({ item }: { item: Visit }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Productor ID: {item.producer_id}</Text>
      <Text>Fecha: {new Date(item.date).toLocaleString()}</Text>
      <Text>Usuario: {item.user_id}</Text>
      <Text>Obs: {item.observations}</Text>
    </View>
  );

  return (
    <FlatList
      data={visits}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    backgroundColor: "#e0f2f1",
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
  },
});
