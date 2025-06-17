import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { saveVisit } from "../services/visitService";

export default function VisitFormScreen() {
  const [userId, setUserId] = useState("");
  const [producerId, setProducerId] = useState("");
  const [observations, setObservations] = useState("");
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const validateForm = () => {
    if (!userId || !producerId || !observations) {
      Alert.alert(
        "Campos requeridos",
        "Por favor completa todos los campos obligatorios."
      );
      return false;
    }
    if (!location) {
      Alert.alert(
        "Ubicación requerida",
        "Debes permitir acceso a la ubicación."
      );
      return false;
    }
    return true;
  };

  const handleGetLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "No se puede acceder a la ubicación");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({ lat: loc.coords.latitude, lon: loc.coords.longitude });
    } catch (err) {
      Alert.alert("Error obteniendo ubicación", String(err));
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets?.length) {
      setPhoto(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const visit = {
      user_id: Number(userId),
      producer_id: producerId,
      observations,
      lat: location!.lat,
      lon: location!.lon,
      photo,
      date: new Date().toISOString(),
    };

    try {
      await saveVisit(visit);
      Alert.alert("Éxito", "Visita registrada");
      setUserId("");
      setProducerId("");
      setObservations("");
      setPhoto("");
    } catch (err) {
      Alert.alert("Error", "No se pudo guardar la visita");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Usuario (ID):</Text>
      <TextInput
        style={styles.input}
        value={userId}
        onChangeText={setUserId}
        keyboardType="numeric"
      />
      <Text>Productor (ID):</Text>
      <TextInput
        style={styles.input}
        value={producerId}
        onChangeText={setProducerId}
      />
      <Text>Observaciones:</Text>
      <TextInput
        style={styles.input}
        value={observations}
        onChangeText={setObservations}
        multiline
      />
      <Button title="Obtener ubicación" onPress={handleGetLocation} />
      <Button title="Seleccionar foto" onPress={handlePickImage} />
      {photo ? <Image source={{ uri: photo }} style={styles.image} /> : null}
      <Button title="Registrar visita" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, marginBottom: 8, padding: 8 },
  image: { width: 100, height: 100, marginVertical: 8 },
});
