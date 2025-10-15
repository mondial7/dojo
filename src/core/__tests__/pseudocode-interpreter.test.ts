import { describe, it, expect, beforeEach } from 'vitest'
import { PseudocodeInterpreter } from '../pseudocode-interpreter'

describe('PseudocodeInterpreter', () => {
  let interpreter: PseudocodeInterpreter

  beforeEach(() => {
    interpreter = new PseudocodeInterpreter()
  })

  describe('add function scenario', () => {
    const addFunctionCode = `FUNCTION add(a, b)
  RETURN a + b
END`

    it('should parse and load add function correctly', () => {
      interpreter.loadCode(addFunctionCode)
      const result = interpreter.execute('add', [2, 3])
      expect(result).toBe(5)
    })

    it('should handle positive numbers', () => {
      interpreter.loadCode(addFunctionCode)
      expect(interpreter.execute('add', [2, 3])).toBe(5)
      expect(interpreter.execute('add', [10, 15])).toBe(25)
      expect(interpreter.execute('add', [1, 1])).toBe(2)
    })

    it('should handle negative numbers', () => {
      interpreter.loadCode(addFunctionCode)
      expect(interpreter.execute('add', [-1, 1])).toBe(0)
      expect(interpreter.execute('add', [-5, -3])).toBe(-8)
      expect(interpreter.execute('add', [5, -2])).toBe(3)
    })

    it('should handle zero', () => {
      interpreter.loadCode(addFunctionCode)
      expect(interpreter.execute('add', [0, 5])).toBe(5)
      expect(interpreter.execute('add', [0, 0])).toBe(0)
      expect(interpreter.execute('add', [7, 0])).toBe(7)
    })

    it('should handle decimal numbers', () => {
      interpreter.loadCode(addFunctionCode)
      expect(interpreter.execute('add', [2.5, 3.7])).toBe(6.2)
      expect(interpreter.execute('add', [-1.5, 1.5])).toBe(0)
    })

    it('should throw error when function not found', () => {
      expect(() => interpreter.execute('nonexistent', [1, 2])).toThrow("Function 'nonexistent' not found")
    })

    it('should handle missing parameters', () => {
      interpreter.loadCode(addFunctionCode)
      expect(interpreter.execute('add', [5])).toBe(5)
      expect(interpreter.execute('add', [])).toBe(0)
    })
  })

  describe('function parsing', () => {
    it('should parse function with parameters correctly', () => {
      const functions = interpreter.parse(`FUNCTION add(a, b)
  RETURN a + b
END`)
      
      expect(functions).toHaveLength(1)
      expect(functions[0].name).toBe('add')
      expect(functions[0].parameters).toEqual(['a', 'b'])
      expect(functions[0].body).toHaveLength(1)
      expect(functions[0].body[0].type).toBe('return')
    })

    it('should parse function without parameters', () => {
      const functions = interpreter.parse(`FUNCTION getConstant()
  RETURN 42
END`)
      
      expect(functions).toHaveLength(1)
      expect(functions[0].name).toBe('getConstant')
      expect(functions[0].parameters).toEqual([])
    })

    it('should ignore comments and empty lines', () => {
      const functions = interpreter.parse(`// This is a comment
FUNCTION add(a, b)
  // Another comment
  RETURN a + b
END

// Final comment`)
      
      expect(functions).toHaveLength(1)
      expect(functions[0].name).toBe('add')
    })
  })

  describe('expression evaluation', () => {
    beforeEach(() => {
      interpreter.loadCode(`FUNCTION add(a, b)
  RETURN a + b
END`)
    })

    it('should evaluate number literals', () => {
      expect(interpreter.execute('add', [5, 10])).toBe(15)
      expect(interpreter.execute('add', [-3, 7])).toBe(4)
      expect(interpreter.execute('add', [0, 0])).toBe(0)
    })

    it('should handle arithmetic operations in expressions', () => {
      const code = `FUNCTION complexAdd(a, b)
  RETURN a + b
END`
      interpreter.reset()
      interpreter.loadCode(code)
      expect(interpreter.execute('complexAdd', [2, 3])).toBe(5)
    })
  })

  describe('variable scope', () => {
    it('should maintain function parameter scope', () => {
      const code = `FUNCTION add(a, b)
  RETURN a + b
END

FUNCTION multiply(a, b)
  RETURN a * b
END`
      
      interpreter.loadCode(code)
      expect(interpreter.execute('add', [2, 3])).toBe(5)
      expect(interpreter.execute('multiply', [2, 3])).toBe(6)
    })
  })

  describe('error handling', () => {
    it('should handle function execution errors gracefully', () => {
      interpreter.loadCode(`FUNCTION add(a, b)
  RETURN a + b
END`)
      
      expect(() => interpreter.execute('add', [null, 5])).not.toThrow()
    })
  })
})