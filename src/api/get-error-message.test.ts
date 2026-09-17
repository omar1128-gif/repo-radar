import { describe, expect, it } from 'vitest';

import { getErrorMessage } from './get-error-message';

describe('getErrorMessage', () => {
  it('falls back when there is no error', () => {
    expect(getErrorMessage(undefined)).toBe('Something went wrong.');
  });

  it('explains a network failure', () => {
    expect(
      getErrorMessage({ status: 'FETCH_ERROR', error: 'TypeError: failed' })
    ).toBe('Network error. Check your connection and try again.');
  });

  it('reports the rate limit on 429', () => {
    expect(getErrorMessage({ status: 429, data: { message: 'Too many' } })).toBe(
      'GitHub rate limit reached. Wait a minute and try again.'
    );
  });

  it('reports the rate limit on a 403 that mentions it', () => {
    expect(
      getErrorMessage({
        status: 403,
        data: { message: 'API rate limit exceeded for 1.2.3.4.' },
      })
    ).toBe('GitHub rate limit reached. Wait a minute and try again.');
  });

  it('passes through a 403 that is not about the rate limit', () => {
    expect(
      getErrorMessage({ status: 403, data: { message: 'Repository disabled' } })
    ).toBe('Repository disabled');
  });

  it('explains a rejected search query', () => {
    expect(
      getErrorMessage({ status: 422, data: { message: 'Validation Failed' } })
    ).toBe('Invalid search query.');
  });

  it('uses GitHub own message when there is one', () => {
    expect(
      getErrorMessage({ status: 404, data: { message: 'Not Found' } })
    ).toBe('Not Found');
  });

  it('falls back to the status when the body is not a GitHub error', () => {
    expect(getErrorMessage({ status: 500, data: 'oops' })).toBe(
      'Request failed (500).'
    );
  });

  it('uses the message of a serialized error', () => {
    expect(getErrorMessage({ message: 'Something exploded' })).toBe(
      'Something exploded'
    );
  });
});
