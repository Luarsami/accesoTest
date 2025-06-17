import { Producer } from '../models/Producer';

const API_URL = 'https://6848999bec44b9f3494165c2.mockapi.io/api/v1/producers';

export const getProducers = async (): Promise<Producer[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error loading producers');
  return res.json();
};