import { PseudocodeInterpreter } from './pseudocode-interpreter'
import type { PseudocodeValue } from './pseudocode-language'

export interface TestCase {
  name: string
  code: string
  passed: boolean | null
  error?: string
  actual?: PseudocodeValue
  expected?: PseudocodeValue
}

export interface TestSuite {
  name: string
  tests: TestCase[]
  passed: number
  failed: number
  total: number
}

export type TestStatus = 'red' | 'green' | 'refactor' | 'idle'

export class PseudocodeTestFramework {
  private interpreter: PseudocodeInterpreter
  private testSuites: Map<string, TestSuite>

  constructor() {
    this.interpreter = new PseudocodeInterpreter()
    this.testSuites = new Map()
  }

  parseTestCode(testCode: string): TestCase[] {
    const tests: TestCase[] = []
    const lines = testCode.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('//'))
    
    let currentTest: Partial<TestCase> = {}
    let insideTest = false
    let testBody: string[] = []
    
    for (const line of lines) {
      if (line.startsWith('TEST ')) {
        // Save previous test if exists
        if (insideTest && currentTest.name) {
          tests.push({
            name: currentTest.name,
            code: testBody.join('\n'),
            passed: null
          })
        }
        
        // Start new test
        const testName = line.substring(5).trim()
        currentTest = { name: testName }
        testBody = []
        insideTest = true
      } else if (line === 'END TEST' || line === 'END') {
        if (insideTest && currentTest.name) {
          tests.push({
            name: currentTest.name,
            code: testBody.join('\n'),
            passed: null
          })
        }
        insideTest = false
        currentTest = {}
        testBody = []
      } else if (insideTest) {
        testBody.push(line)
      }
    }
    
    // Handle last test if no END statement
    if (insideTest && currentTest.name) {
      tests.push({
        name: currentTest.name,
        code: testBody.join('\n'),
        passed: null
      })
    }
    
    return tests
  }

  runTests(implementation: string, testCode: string, suiteName: string = 'Default'): TestSuite {
    this.interpreter.reset()
    this.interpreter.loadCode(implementation)
    
    const tests = this.parseTestCode(testCode)
    const results: TestCase[] = []
    
    for (const test of tests) {
      try {
        const result = this.runSingleTest(test)
        results.push(result)
      } catch (error) {
        results.push({
          ...test,
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }
    
    const passed = results.filter(t => t.passed === true).length
    const failed = results.filter(t => t.passed === false).length
    
    const suite: TestSuite = {
      name: suiteName,
      tests: results,
      passed,
      failed,
      total: results.length
    }
    
    this.testSuites.set(suiteName, suite)
    return suite
  }

  private runSingleTest(test: TestCase): TestCase {
    const lines = test.code.split('\n').map(line => line.trim()).filter(line => line)
    
    for (const line of lines) {
      if (line.startsWith('ASSERT ')) {
        return this.processAssert(line, test)
      } else if (line.startsWith('EXPECT ')) {
        return this.processExpect(line, test)
      }
    }
    
    return {
      ...test,
      passed: false,
      error: 'No assertions found in test'
    }
  }

  private processAssert(assertLine: string, test: TestCase): TestCase {
    // ASSERT function(args) == expected
    const match = assertLine.match(/ASSERT\s+(.+?)\s*==\s*(.+)/)
    if (!match) {
      return {
        ...test,
        passed: false,
        error: 'Invalid ASSERT syntax'
      }
    }
    
    const functionCall = match[1].trim()
    const expectedStr = match[2].trim()
    
    try {
      const actual = this.evaluateFunctionCall(functionCall)
      const expected = this.parseValue(expectedStr)
      
      const passed = this.deepEqual(actual, expected)
      
      return {
        ...test,
        passed,
        actual,
        expected,
        error: passed ? undefined : `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`
      }
    } catch (error) {
      return {
        ...test,
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  private processExpect(expectLine: string, test: TestCase): TestCase {
    // EXPECT function(args) TO_BE value
    const match = expectLine.match(/EXPECT\s+(.+?)\s+TO_BE\s+(.+)/)
    if (!match) {
      return {
        ...test,
        passed: false,
        error: 'Invalid EXPECT syntax'
      }
    }
    
    const functionCall = match[1].trim()
    const expectedStr = match[2].trim()
    
    try {
      const actual = this.evaluateFunctionCall(functionCall)
      const expected = this.parseValue(expectedStr)
      
      const passed = this.deepEqual(actual, expected)
      
      return {
        ...test,
        passed,
        actual,
        expected,
        error: passed ? undefined : `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`
      }
    } catch (error) {
      return {
        ...test,
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  private evaluateFunctionCall(call: string): PseudocodeValue {
    const match = call.match(/(\w+)\s*\(([^)]*)\)/)
    if (!match) {
      throw new Error(`Invalid function call: ${call}`)
    }
    
    const functionName = match[1]
    const argsStr = match[2].trim()
    const args = argsStr ? argsStr.split(',').map(arg => this.parseValue(arg.trim())) : []
    
    return this.interpreter.execute(functionName, args)
  }

  private parseValue(valueStr: string): PseudocodeValue {
    valueStr = valueStr.trim()
    
    // Number
    if (/^-?\d+(\.\d+)?$/.test(valueStr)) {
      return parseFloat(valueStr)
    }
    
    // String
    if ((valueStr.startsWith('"') && valueStr.endsWith('"')) || 
        (valueStr.startsWith("'") && valueStr.endsWith("'"))) {
      return valueStr.slice(1, -1)
    }
    
    // Boolean
    if (valueStr === 'true') return true
    if (valueStr === 'false') return false
    if (valueStr === 'null') return null
    
    throw new Error(`Cannot parse value: ${valueStr}`)
  }

  private deepEqual(a: PseudocodeValue, b: PseudocodeValue): boolean {
    if (a === b) return true
    if (a === null || b === null) return a === b
    if (typeof a !== typeof b) return false
    
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false
      return a.every((item, index) => this.deepEqual(item, b[index]))
    }
    
    return false
  }

  getTestSuite(name: string): TestSuite | undefined {
    return this.testSuites.get(name)
  }

  getAllTestSuites(): TestSuite[] {
    return Array.from(this.testSuites.values())
  }

  determineStatus(suite: TestSuite): TestStatus {
    if (suite.total === 0) return 'idle'
    if (suite.failed > 0) return 'red'
    if (suite.passed === suite.total) return 'green'
    return 'idle'
  }
}