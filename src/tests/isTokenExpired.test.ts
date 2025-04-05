import {describe, it, expect} from 'vitest';
import {isTokenExpired} from '../utils/checkTokenValidity';

describe('isTokenExpired', () => {
  it('returns true if no expiry is in localStorage', () => {
    localStorage.removeItem('spotify_token_expiry');
    expect(isTokenExpired()).toBe(true);
  });

  it('returns true if token is expired', () => {
    localStorage.setItem('spotify_token_expiry', `${Date.now() - 1000}`);
    expect(isTokenExpired()).toBe(true);
  });

  it('returns false if token is still valid', () => {
    localStorage.setItem('spotify_token_expiry', `${Date.now() + 10000}`);
    expect(isTokenExpired()).toBe(false);
  });
});
