import { DcrEntry } from '../types';

const STORAGE_KEY = 'dcr_offline_drafts_v1';

export function loadDrafts(): DcrEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load drafts from storage:', err);
    return [];
  }
}

export function saveDrafts(entries: DcrEntry[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch (err) {
    console.error('Failed to save drafts to storage:', err);
    return false;
  }
}
