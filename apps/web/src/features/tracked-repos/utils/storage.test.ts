import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { loadTrackedRepos, saveTrackedRepos, STORAGE_KEY } from './storage';

describe('tracked repos storage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns an empty list when nothing is stored', () => {
    expect(loadTrackedRepos()).toEqual([]);
  });

  it('returns an empty list when the stored value is not valid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not json');

    expect(loadTrackedRepos()).toEqual([]);
  });

  it('returns an empty list when the stored value is not an array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ repos: {}, ids: [] }));

    expect(loadTrackedRepos()).toEqual([]);
  });

  it('drops entries that do not match the expected shape', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        { id: 1, full_name: 'facebook/react' },
        { id: '2', full_name: 'vuejs/core' },
        { id: 3 },
        null,
        'sveltejs/svelte',
      ])
    );

    expect(loadTrackedRepos()).toEqual([
      { id: 1, full_name: 'facebook/react' },
    ]);
  });

  it('reads back what it saved', () => {
    const repos = [
      { id: 1, full_name: 'facebook/react' },
      { id: 2, full_name: 'vuejs/core' },
    ];

    saveTrackedRepos(repos);

    expect(loadTrackedRepos()).toEqual(repos);
  });

  it('returns an empty list when reading throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage is blocked');
    });

    expect(loadTrackedRepos()).toEqual([]);
  });

  it('does not throw when writing fails', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });

    expect(() =>
      saveTrackedRepos([{ id: 1, full_name: 'facebook/react' }])
    ).not.toThrow();
  });
});
