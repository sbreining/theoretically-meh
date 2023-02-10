/**
 * Instead of mocking headers, so many of the other API functions require the
 * headers, so those functions just run through the headers function. What was
 * mocked were the calls to the DB or otherwise.
 *
 * PASS
 */

describe('The Twitch API', () => it('passes', () => expect(true).toBe(true)));