import { screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { RootState } from '@/app/store';
import { renderWithProviders } from '@/test/render-with-providers';
import type { GitHubCommit, GitHubRepo } from '@/types';

import type { TrackedRepo } from '../types';
import { TrackedRepoItem } from './tracked-repo-item';

const REACT: TrackedRepo = { id: 1, full_name: 'facebook/react' };
const MISSING: TrackedRepo = { id: 2, full_name: 'ghost/deleted-repo' };

const reactRepo: GitHubRepo = {
  id: 1,
  full_name: 'facebook/react',
  html_url: 'https://github.com/facebook/react',
  description: 'A library for web and native user interfaces',
  language: 'JavaScript',
  stargazers_count: 238_000,
  open_issues_count: 700,
  updated_at: '2026-09-17T10:00:00Z',
  pushed_at: '2026-09-18T09:00:00Z',
  owner: {
    login: 'facebook',
    avatar_url: 'https://avatars.github.com/u/69631',
  },
  topics: [],
};

const reactCommit: GitHubCommit = {
  sha: 'abc123',
  html_url: 'https://github.com/facebook/react/commit/abc123',
  commit: {
    message: 'Fix hydration warning',
    author: {
      name: 'Dan',
      email: 'dan@example.com',
      date: '2026-09-18T08:00:00Z',
    },
    committer: {
      name: 'Dan',
      email: 'dan@example.com',
      date: '2026-09-18T08:00:00Z',
    },
  },
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function mockGitHub() {
  const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = input instanceof Request ? input.url : String(input);

    if (url.includes('facebook/react/commits')) {
      return jsonResponse([reactCommit]);
    }
    if (url.includes('repos/facebook/react')) {
      return jsonResponse(reactRepo);
    }
    return jsonResponse({ message: 'Not Found' }, 404);
  });

  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

const preloadedState: Partial<RootState> = {
  trackedRepos: {
    repos: { [REACT.id]: REACT, [MISSING.id]: MISSING },
    ids: [REACT.id, MISSING.id],
  },
};

describe('TrackedRepoItem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('shows the repository name and a skeleton while stats are loading', () => {
    mockGitHub();

    renderWithProviders(<TrackedRepoItem trackedRepo={REACT} />, {
      preloadedState,
    });

    expect(screen.getByText('facebook/react')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Untrack facebook/react' })
    ).toBeInTheDocument();
    expect(screen.queryByText('238K')).not.toBeInTheDocument();
  });

  it('shows stars, open issues and the last commit once loaded', async () => {
    mockGitHub();

    renderWithProviders(<TrackedRepoItem trackedRepo={REACT} />, {
      preloadedState,
    });

    expect(await screen.findByText('238K')).toBeInTheDocument();
    expect(screen.getByText('700')).toBeInTheDocument();
    expect(screen.getByText(/^Committed /)).toBeInTheDocument();
    expect(screen.getByText(/^Pushed /)).toBeInTheDocument();
  });

  it('keeps loading and error states independent per repository', async () => {
    mockGitHub();

    renderWithProviders(
      <>
        <TrackedRepoItem trackedRepo={REACT} />
        <TrackedRepoItem trackedRepo={MISSING} />
      </>,
      { preloadedState }
    );

    expect(await screen.findByText('238K')).toBeInTheDocument();
    expect(await screen.findByText('Not Found')).toBeInTheDocument();

    // the failing repo keeps its own retry, the loaded one shows no error
    expect(screen.getAllByRole('button', { name: 'Retry' })).toHaveLength(1);
    expect(screen.getByText('ghost/deleted-repo')).toBeInTheDocument();
  });

  it('treats an empty repository as having no commits, not as an error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = input instanceof Request ? input.url : String(input);

        if (url.includes('commits')) {
          return jsonResponse({ message: 'Git Repository is empty.' }, 409);
        }
        return jsonResponse({ ...reactRepo, stargazers_count: 0 });
      })
    );

    renderWithProviders(<TrackedRepoItem trackedRepo={REACT} />, {
      preloadedState,
    });

    expect(await screen.findByText('No commits')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Retry' })
    ).not.toBeInTheDocument();
  });
});
