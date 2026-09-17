import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from '@/utils/storage';

import type { TrackedRepoItem } from '../types';
import { isTrackedRepoItem } from './type-guards';

export const STORAGE_KEY = 'repo_radar:tracked_repos:v1';

export function loadTrackedRepos(): TrackedRepoItem[] {
  const rawData = loadStateFromLocalStorage(STORAGE_KEY);
  if (!Array.isArray(rawData)) {
    return [];
  }
  return rawData.filter(isTrackedRepoItem);
}

export function saveTrackedRepos(repos: TrackedRepoItem[]): void {
  saveStateToLocalStorage(STORAGE_KEY, repos);
}
