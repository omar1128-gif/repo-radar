import { isAnyOf } from '@reduxjs/toolkit';

import { startAppListening } from '@/app/listener-middleware';

import { saveTrackedRepos } from '../utils';
import { selectTrackedReposList } from './tracked-repos-selectors';
import { trackRepo, untrackRepo } from './tracked-repos-slice';

export function trackedReposListeners() {
  startAppListening({
    matcher: isAnyOf(trackRepo, untrackRepo),
    effect: (_, { getState }) => {
      saveTrackedRepos(selectTrackedReposList(getState()));
    },
  });
}
