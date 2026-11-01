export interface DcrEntry {
  doctor: string;
  fme: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  brands: string[];
  comment: string;
  observation: string;
  business?: string;
  region?: string;
  area?: string;
  priority?: string;
  lastCall?: string;
  workWith?: string;
  other?: string;
  id?: string;
}

export type Page = 'Home' | 'Dashboard' | 'Doctor Call Report' | 'DCR History' | 'API Inventory';
