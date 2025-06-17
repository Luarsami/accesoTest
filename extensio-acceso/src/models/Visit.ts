export interface Visit {
  id: string;
  producer_id: string;
  user_id: number;
  date: string;
  lat: number;
  lon: number;
  observations: string;
  photo?: string; 
  synced: boolean;   
}