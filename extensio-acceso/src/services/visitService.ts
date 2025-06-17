import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const VISIT_STORAGE_KEY = 'pending_visits';
const API_URL = 'https://6848999bec44b9f3494165c2.mockapi.io/api/v1/visits';

export interface Visit {
  user_id: number;
  producer_id: string;
  date: string;
  lat: number;
  lon: number;
  observations: string;
  photo?: string;
}

export async function saveVisit(visit: Visit): Promise<void> {
  try {
    // Intenta enviarla a la API
    await sendVisitToServer(visit);
  } catch (err) {
    // Si falla, la guarda localmente
    const pending = await getLocalVisits();
    pending.push(visit);
    await AsyncStorage.setItem(VISIT_STORAGE_KEY, JSON.stringify(pending));
    console.warn('Visita almacenada localmente por error:', err);
  }
}

export async function sendVisitToServer(visit: Visit): Promise<void> {
  await axios.post(API_URL, visit);
}

export async function getLocalVisits(): Promise<Visit[]> {
  const data = await AsyncStorage.getItem(VISIT_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function clearLocalVisits(): Promise<void> {
  await AsyncStorage.removeItem(VISIT_STORAGE_KEY);
}

export async function fetchAllVisits(): Promise<Visit[]> {
  const response = await axios.get(API_URL);
  return response.data;
}

// Sincroniza visitas locales cuando haya conexión
export async function syncLocalVisits(): Promise<void> {
  const net = await NetInfo.fetch();

  if (net.isConnected) {
    const localVisits = await getLocalVisits();
    if (localVisits.length === 0) return;

    const successfullySent: Visit[] = [];

    for (const visit of localVisits) {
      try {
        await sendVisitToServer(visit);
        successfullySent.push(visit);
      } catch (err) {
        console.warn('Error enviando visita guardada localmente:', err);
      }
    }

    // Si todas fueron exitosas, limpia almacenamiento
    if (successfullySent.length === localVisits.length) {
      await clearLocalVisits();
      console.log('Visitas locales sincronizadas exitosamente.');
    }
  }
}

