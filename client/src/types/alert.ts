export type AlertPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Alert {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: AlertPriority;
  location: string;
  source: string;
  published_at: string;
  state_id?: string;
  city_id?: string;
  created_by?: string;
}
