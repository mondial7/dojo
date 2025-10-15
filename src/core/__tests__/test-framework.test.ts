import { describe, it, expect, beforeEach } from 'vitest'
import { PseudocodeTestFramework } from '../test-framework'

describe('PseudocodeTestFramework', () => {
  let framework: PseudocodeTestFramework

  beforeEach(() => {
    framework = new PseudocodeTestFramework()
  })

  describe('add function test scenario', () => {
    const addImplementation = `FUNCTION add(a, b)
  RETURN a + b
END`

    const addTests = `TEST "add should return sum of two positive numbers"
  ASSERT add(2, 3) == 5
END

TEST "add should handle negative numbers"
  ASSERT add(-1, 1) == 0
END

TEST "add should handle zero"
  ASSERT add(0, 5) == 5
END`

    it('should parse test cases correctly', () => {
      const tests = framework.parseTestCode(addTests)
      
      expect(tests).toHaveLength(3)
      expect(tests[0].name).toBe('"add should return sum of two positive numbers"')
      expect(tests[0].code).toBe('ASSERT add(2, 3) == 5')
      expect(tests[1].name).toBe('"add should handle negative numbers"')
      expect(tests[1].code).toBe('ASSERT add(-1, 1) == 0')
      expect(tests[2].name).toBe('"add should handle zero"')
      expect(tests[2].code).toBe('ASSERT add(0, 5) == 5')
    })

    it('should run all tests and return correct results when implementation is correct', () => {
      const suite = framework.runTests(addImplementation, addTests, 'Add Function Tests')
      
      expect(suite.name).toBe('Add Function Tests')
      expect(suite.total).toBe(3)
      expect(suite.passed).toBe(3)
      expect(suite.failed).toBe(0)
      
      expect(suite.tests[0].passed).toBe(true)
      expect(suite.tests[0].actual).toBe(5)
      expect(suite.tests[0].expected).toBe(5)
      
      expect(suite.tests[1].passed).toBe(true)
      expect(suite.tests[1].actual).toBe(0)
      expect(suite.tests[1].expected).toBe(0)
      
      expect(suite.tests[2].passed).toBe(true)
      expect(suite.tests[2].actual).toBe(5)
      expect(suite.tests[2].expected).toBe(5)
    })

    it('should detect test failures when implementation is incorrect', () => {
      const wrongImplementation = `FUNCTION add(a, b)
  RETURN a - b
END`
      
      const suite = framework.runTests(wrongImplementation, addTests, 'Wrong Add Tests')
      
      expect(suite.total).toBe(3)
      expect(suite.passed).toBe(0)
      expect(suite.failed).toBe(3)
      
      expect(suite.tests[0].passed).toBe(false)
      expect(suite.tests[0].actual).toBe(-1)
      expect(suite.tests[0].expected).toBe(5)
      expect(suite.tests[0].error).toContain('Expected 5, but got -1')
    })

    it('should handle missing function implementation', () => {
      const emptyImplementation = ''
      
      const suite = framework.runTests(emptyImplementation, addTests, 'Missing Function')
      
      expect(suite.total).toBe(3)
      expect(suite.passed).toBe(0)
      expect(suite.failed).toBe(3)
      
      suite.tests.forEach(test => {
        expect(test.passed).toBe(false)
        expect(test.error).toContain("Function 'add' not found")
      })
    })
  })

  describe('EXPECT syntax support', () => {
    const addImplementation = `FUNCTION add(a, b)
  RETURN a + b
END`

    const expectTests = `TEST "should support EXPECT syntax"
  EXPECT add(2, 3) TO_BE 5
END`

    it('should parse and run EXPECT assertions', () => {
      const suite = framework.runTests(addImplementation, expectTests, 'Expect Tests')
      
      expect(suite.total).toBe(1)
      expect(suite.passed).toBe(1)
      expect(suite.failed).toBe(0)
      expect(suite.tests[0].passed).toBe(true)
      expect(suite.tests[0].actual).toBe(5)
      expect(suite.tests[0].expected).toBe(5)
    })
  })

  describe('test status determination', () => {
    it('should return "idle" for empty test suite', () => {
      const suite = framework.runTests('', '', 'Empty')
      const status = framework.determineStatus(suite)
      expect(status).toBe('idle')
    })

    it('should return "red" when tests fail', () => {
      const wrongImplementation = `FUNCTION add(a, b)
  RETURN 0
END`
      const tests = `TEST "test"
  ASSERT add(1, 2) == 3
END`
      
      const suite = framework.runTests(wrongImplementation, tests, 'Failing')
      const status = framework.determineStatus(suite)
      expect(status).toBe('red')
    })

    it('should return "green" when all tests pass', () => {
      const correctImplementation = `FUNCTION add(a, b)
  RETURN a + b
END`
      const tests = `TEST "test"
  ASSERT add(1, 2) == 3
END`
      
      const suite = framework.runTests(correctImplementation, tests, 'Passing')
      const status = framework.determineStatus(suite)
      expect(status).toBe('green')
    })
  })

  describe('edge cases and error handling', () => {
    it('should handle tests without END statement', () => {
      const testsWithoutEnd = `TEST "incomplete test"
  ASSERT add(1, 2) == 3`
      
      const tests = framework.parseTestCode(testsWithoutEnd)
      expect(tests).toHaveLength(1)
      expect(tests[0].name).toBe('"incomplete test"')
    })

    it('should handle invalid ASSERT syntax', () => {
      const implementation = `FUNCTION add(a, b)
  RETURN a + b
END`
      const invalidTests = `TEST "invalid syntax"
  ASSERT invalid syntax here
END`
      
      const suite = framework.runTests(implementation, invalidTests, 'Invalid')
      expect(suite.tests[0].passed).toBe(false)
      expect(suite.tests[0].error).toBe('Invalid ASSERT syntax')
    })

    it('should handle invalid EXPECT syntax', () => {
      const implementation = `FUNCTION add(a, b)
  RETURN a + b
END`
      const invalidTests = `TEST "invalid expect"
  EXPECT invalid syntax
END`
      
      const suite = framework.runTests(implementation, invalidTests, 'Invalid Expect')
      expect(suite.tests[0].passed).toBe(false)
      expect(suite.tests[0].error).toBe('Invalid EXPECT syntax')
    })

    it('should handle tests with no assertions', () => {
      const implementation = `FUNCTION add(a, b)
  RETURN a + b
END`
      const noAssertionTests = `TEST "no assertions"
  // just a comment
END`
      
      const suite = framework.runTests(implementation, noAssertionTests, 'No Assertions')
      expect(suite.tests[0].passed).toBe(false)
      expect(suite.tests[0].error).toBe('No assertions found in test')
    })

    it('should handle function calls with different parameter types', () => {
      const implementation = `FUNCTION add(a, b)
  RETURN a + b
END`
      const mixedTypeTests = `TEST "string numbers"
  ASSERT add("2", "3") == "23"
END`
      
      const suite = framework.runTests(implementation, mixedTypeTests, 'Mixed Types')
      expect(suite.tests[0].passed).toBe(false)
    })
  })

  describe('complex test scenarios', () => {
    it('should handle multiple assertions in different test formats', () => {
      const implementation = `FUNCTION add(a, b)
  RETURN a + b
END`
      
      const mixedTests = `TEST "using ASSERT"
  ASSERT add(1, 2) == 3
END

TEST "using EXPECT"
  EXPECT add(4, 5) TO_BE 9
END`
      
      const suite = framework.runTests(implementation, mixedTests, 'Mixed Syntax')
      expect(suite.total).toBe(2)
      expect(suite.passed).toBe(2)
      expect(suite.failed).toBe(0)
    })

    it('should handle decimal number assertions correctly', () => {
      const implementation = `FUNCTION add(a, b)
  RETURN a + b
END`
      
      const decimalTests = `TEST "decimal addition"
  ASSERT add(1.5, 2.3) == 3.8
END`
      
      const suite = framework.runTests(implementation, decimalTests, 'Decimal Tests')
      expect(suite.tests[0].passed).toBe(true)
      expect(suite.tests[0].actual).toBe(3.8)
    })

    it('should reset interpreter state between test runs', () => {
      const implementation1 = `FUNCTION add(a, b)
  RETURN a + b
END`
      
      const implementation2 = `FUNCTION add(a, b)
  RETURN a * b
END`
      
      const tests = `TEST "test"
  ASSERT add(2, 3) == 5
END`
      
      const suite1 = framework.runTests(implementation1, tests, 'First')
      expect(suite1.tests[0].passed).toBe(true)
      
      const suite2 = framework.runTests(implementation2, tests, 'Second')
      expect(suite2.tests[0].passed).toBe(false)
      expect(suite2.tests[0].actual).toBe(6)
    })
  })
})