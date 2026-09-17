import { isObject } from '@/utils/type-guards';

import type { TrackedRepoItem } from '../types';

export function isTrackedRepoItem(item: unknown): item is TrackedRepoItem {
  return (
    isObject(item) &&
    typeof item.id === 'number' &&
    typeof item.full_name === 'string'
  );
}
