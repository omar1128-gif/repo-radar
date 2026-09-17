import { trackedReposListeners } from '@/features/tracked-repos/stores';

export function setupAppListeners() {
  trackedReposListeners();
}
