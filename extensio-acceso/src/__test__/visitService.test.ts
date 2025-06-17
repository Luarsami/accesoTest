import axios from 'axios';
import { saveVisit, getLocalVisits, clearLocalVisits } from '../services/visitService';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('axios');
jest.mock('@react-native-community/netinfo');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

const fakeVisit = {
  user_id: 1,
  producer_id: '2',
  observations: 'test obs',
  lat: 0,
  lon: 0,
  date: new Date().toISOString(),
};

describe('Visit Service', () => {
  it('guarda una visita en local si falla el envío', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    mockedAxios.post.mockRejectedValueOnce(new Error('fail'));

    await saveVisit(fakeVisit);

    expect(AsyncStorage.setItem).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Visita almacenada localmente por error:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('recupera visitas locales', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([fakeVisit]));
    const visits = await getLocalVisits();
    expect(visits.length).toBe(1);
  });

  it('limpia visitas locales', async () => {
    await clearLocalVisits();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('pending_visits');
  });
});
