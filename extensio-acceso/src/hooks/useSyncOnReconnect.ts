import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { getLocalVisits, sendVisitToServer, clearLocalVisits } from '../services/visitService';

export const useSyncOnReconnect = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        const pending = await getLocalVisits();
        const successfullySent = [];

        for (const visit of pending) {
          try {
            await sendVisitToServer(visit);
            successfullySent.push(visit);
          } catch (err) {
            console.warn('Error sincronizando visita:', err);
          }
        }

        // Limpia almacenamiento solo si todas fueron exitosas
        if (successfullySent.length === pending.length) {
          await clearLocalVisits();
          console.log('Todas las visitas fueron sincronizadas.');
        } else {
          console.warn('Algunas visitas no se pudieron sincronizar. Conservando localmente.');
        }
      }
    });

    return () => unsubscribe();
  }, []);
};
