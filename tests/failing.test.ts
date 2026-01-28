// Intentionally Failing Test - Demonstrates test failure handling
import { describe, it, expect } from 'bun:test';

describe('Intentionally Failing Test', () => {
  it('should fail - TODO: fix this test', () => {
    // This test is intentionally failing
    expect(true).toBe(false);
  });
});

// TODO: Fix the failing test above
