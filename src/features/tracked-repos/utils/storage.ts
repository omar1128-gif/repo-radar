import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from '@/utils/storage';

import type { TrackedRepo } from '../types';
import { isTrackedRepo } from './type-guards';

export const STORAGE_KEY = 'repo_radar:tracked_repos:v1';

export function loadTrackedRepos(): TrackedRepo[] {
  const rawData = loadStateFromLocalStorage(STORAGE_KEY);
  if (!Array.isArray(rawData)) {
    return [];
  }
  return rawData.filter(isTrackedRepo);
}

export function saveTrackedRepos(repos: TrackedRepo[]): void {
  saveStateToLocalStorage(STORAGE_KEY, repos);
}
