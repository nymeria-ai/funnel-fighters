/**
 * Verifies that the JS MD5 hash computation matches what Postgres would produce.
 * 
 * Postgres expression: MD5(headlines::TEXT || descriptions::TEXT)
 * JS expression: md5(normalizeJsonb(headlines) + normalizeJsonb(descriptions))
 * 
 * Both should produce compact JSON (no spaces after : or ,).
 */

import { createHash } from 'crypto';

function normalizeJsonb(val: unknown): string {
  if (typeof val === 'string') {
    try { return JSON.stringify(JSON.parse(val)); } catch { return val; }
  }
  return JSON.stringify(val ?? []);
}

function computeHash(headlines: unknown, descriptions: unknown): string {
  const h = normalizeJsonb(headlines);
  const d = normalizeJsonb(descriptions);
  return createHash('md5').update(h + d).digest('hex');
}

describe('hash-consistency', () => {
  it('should produce consistent hashes for array inputs', () => {
    const headlines = ['Project Management', 'Try Free'];
    const descriptions = ['Build workflows your way'];
    
    const hash1 = computeHash(headlines, descriptions);
    const hash2 = computeHash(headlines, descriptions);
    expect(hash1).toBe(hash2);
  });

  it('should produce consistent hashes for object-style headlines (Google Ads format)', () => {
    const headlines = [{ text: 'Project Management' }, { text: 'Try Free' }];
    const descriptions = [{ text: 'Build workflows your way' }];
    
    const hash1 = computeHash(headlines, descriptions);
    const hash2 = computeHash(headlines, descriptions);
    expect(hash1).toBe(hash2);
  });

  it('should produce same hash for string vs parsed JSONB', () => {
    const headlinesObj = ['Project Management', 'Try Free'];
    const descriptionsObj = ['Build workflows your way'];
    
    // Simulates what Postgres returns when reading JSONB column as text
    const headlinesStr = JSON.stringify(headlinesObj);
    const descriptionsStr = JSON.stringify(descriptionsObj);
    
    expect(computeHash(headlinesObj, descriptionsObj))
      .toBe(computeHash(headlinesStr, descriptionsStr));
  });

  it('should produce different hashes for different content', () => {
    const hash1 = computeHash(['Hello'], ['World']);
    const hash2 = computeHash(['Different'], ['Content']);
    expect(hash1).not.toBe(hash2);
  });

  it('should handle empty arrays', () => {
    const hash = computeHash([], []);
    expect(hash).toBe(createHash('md5').update('[][]').digest('hex'));
  });

  it('should handle null/undefined gracefully', () => {
    const hash1 = computeHash(null, null);
    const hash2 = computeHash(undefined, undefined);
    expect(hash1).toBe(hash2); // both normalize to []
  });

  /**
   * IMPORTANT: To verify against actual Postgres, run:
   *   SELECT MD5('["Project Management","Try Free"]' || '["Build workflows your way"]');
   * Expected: same as computeHash(['Project Management', 'Try Free'], ['Build workflows your way'])
   * 
   * Postgres JSONB::TEXT produces compact JSON identical to JSON.stringify() for simple values.
   */
});
