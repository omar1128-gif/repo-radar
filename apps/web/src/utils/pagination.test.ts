import { describe, expect, it } from 'vitest';

import { getTotalPages } from './pagination';

describe('getTotalPages', () => {
  it('returns 0 when there are no results', () => {
    expect(getTotalPages(0, 10)).toBe(0);
  });

  it('returns 0 for an invalid page size', () => {
    expect(getTotalPages(100, 0)).toBe(0);
  });

  it('counts a partial last page', () => {
    expect(getTotalPages(95, 10)).toBe(10);
  });

  it('caps at the 1000 results GitHub returns', () => {
    expect(getTotalPages(50_000, 10)).toBe(100);
    expect(getTotalPages(50_000, 100)).toBe(10);
  });

  it('accepts a different cap', () => {
    expect(getTotalPages(500, 10, 50)).toBe(5);
  });
});
