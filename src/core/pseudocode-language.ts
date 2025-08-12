export interface PseudocodeLanguageSpec {
  syntax: {
    functions: {
      declaration: string
      parameters: string
      returnStatement: string
    }
    variables: {
      declaration: string
      assignment: string
    }
    conditionals: {
      if: string
      elseIf: string
      else: string
    }
    loops: {
      for: string
      while: string
    }
    operators: {
      arithmetic: string[]
      comparison: string[]
      logical: string[]
    }
    comments: string
  }
  examples: {
    simpleFunction: string
    conditionalLogic: string
    loopExample: string
  }
}

export const PSEUDOCODE_SPEC: PseudocodeLanguageSpec = {
  syntax: {
    functions: {
      declaration: 'FUNCTION name(parameters)',
      parameters: 'param1, param2, ...',
      returnStatement: 'RETURN value'
    },
    variables: {
      declaration: 'SET variable = value',
      assignment: 'SET variable = newValue'
    },
    conditionals: {
      if: 'IF condition THEN',
      elseIf: 'ELSE IF condition THEN',
      else: 'ELSE'
    },
    loops: {
      for: 'FOR i FROM start TO end DO',
      while: 'WHILE condition DO'
    },
    operators: {
      arithmetic: ['+', '-', '*', '/', '%'],
      comparison: ['==', '!=', '<', '>', '<=', '>='],
      logical: ['AND', 'OR', 'NOT']
    },
    comments: '// Comment'
  },
  examples: {
    simpleFunction: `FUNCTION add(a, b)
  RETURN a + b
END`,
    conditionalLogic: `FUNCTION isEven(number)
  IF number % 2 == 0 THEN
    RETURN true
  ELSE
    RETURN false
  END
END`,
    loopExample: `FUNCTION sum(numbers)
  SET total = 0
  FOR i FROM 0 TO LENGTH(numbers) - 1 DO
    SET total = total + numbers[i]
  END
  RETURN total
END`
  }
}

export type PseudocodeValue = number | string | boolean | null | PseudocodeValue[]

export interface PseudocodeFunction {
  name: string
  parameters: string[]
  body: PseudocodeStatement[]
}

export interface PseudocodeStatement {
  type: 'assignment' | 'return' | 'if' | 'for' | 'while' | 'expression'
  [key: string]: unknown
}

export interface PseudocodeContext {
  variables: Map<string, PseudocodeValue>
  functions: Map<string, PseudocodeFunction>
}