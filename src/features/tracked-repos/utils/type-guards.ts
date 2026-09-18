import { isObject } from '@/utils/type-guards';

import type { TrackedRepo } from '../types';

export function isTrackedRepo(item: unknown): item is TrackedRepo {
  return (
    isObject(item) &&
    typeof item.id === 'number' &&
    typeof item.full_name === 'string'
  );
}
