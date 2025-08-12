import type { PseudocodeValue, PseudocodeFunction, PseudocodeStatement, PseudocodeContext } from './pseudocode-language'

export class PseudocodeInterpreter {
  private context: PseudocodeContext

  constructor() {
    this.context = {
      variables: new Map(),
      functions: new Map()
    }
  }

  parse(code: string): PseudocodeFunction[] {
    const lines = code.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('//'))
    const functions: PseudocodeFunction[] = []
    let currentFunction: PseudocodeFunction | null = null
    let currentBody: PseudocodeStatement[] = []
    
    for (const line of lines) {
      if (line.startsWith('FUNCTION ')) {
        if (currentFunction) {
          currentFunction.body = currentBody
          functions.push(currentFunction)
        }
        
        const match = line.match(/FUNCTION\s+(\w+)\s*\(([^)]*)\)/)
        if (match) {
          const name = match[1]
          const params = match[2] ? match[2].split(',').map(p => p.trim()) : []
          currentFunction = { name, parameters: params, body: [] }
          currentBody = []
        }
      } else if (line === 'END') {
        if (currentFunction) {
          currentFunction.body = currentBody
          functions.push(currentFunction)
          currentFunction = null
          currentBody = []
        }
      } else if (currentFunction) {
        const statement = this.parseStatement(line)
        if (statement) {
          currentBody.push(statement)
        }
      }
    }
    
    if (currentFunction) {
      currentFunction.body = currentBody
      functions.push(currentFunction)
    }
    
    return functions
  }

  private parseStatement(line: string): PseudocodeStatement | null {
    // SET variable = value
    if (line.startsWith('SET ')) {
      const match = line.match(/SET\s+(\w+)\s*=\s*(.+)/)
      if (match) {
        return {
          type: 'assignment',
          variable: match[1],
          value: match[2]
        }
      }
    }
    
    // RETURN value
    if (line.startsWith('RETURN ')) {
      const value = line.substring(7).trim()
      return {
        type: 'return',
        value
      }
    }
    
    // IF condition THEN
    if (line.startsWith('IF ')) {
      const match = line.match(/IF\s+(.+)\s+THEN/)
      if (match) {
        return {
          type: 'if',
          condition: match[1],
          thenBlock: [],
          elseBlock: []
        }
      }
    }
    
    return null
  }

  execute(functionName: string, args: PseudocodeValue[] = []): PseudocodeValue {
    const func = this.context.functions.get(functionName)
    if (!func) {
      throw new Error(`Function '${functionName}' not found`)
    }
    
    // Create new scope for function execution
    const oldVariables = new Map(this.context.variables)
    
    // Bind parameters
    func.parameters.forEach((param, index) => {
      this.context.variables.set(param, args[index] || null)
    })
    
    try {
      const result = this.executeStatements(func.body)
      return result
    } finally {
      // Restore previous scope
      this.context.variables = oldVariables
    }
  }

  private executeStatements(statements: PseudocodeStatement[]): PseudocodeValue {
    for (const statement of statements) {
      const result = this.executeStatement(statement)
      if (statement.type === 'return') {
        return result
      }
    }
    return null
  }

  private executeStatement(statement: PseudocodeStatement): PseudocodeValue {
    switch (statement.type) {
      case 'assignment':
        const value = this.evaluateExpression(statement.value)
        this.context.variables.set(statement.variable, value)
        return value
        
      case 'return':
        return this.evaluateExpression(statement.value)
        
      default:
        return null
    }
  }

  private evaluateExpression(expr: string): PseudocodeValue {
    expr = expr.trim()
    
    // Number literal
    if (/^-?\d+(\.\d+)?$/.test(expr)) {
      return parseFloat(expr)
    }
    
    // String literal
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1)
    }
    
    // Boolean literal
    if (expr === 'true') return true
    if (expr === 'false') return false
    if (expr === 'null') return null
    
    // Variable
    if (/^\w+$/.test(expr)) {
      return this.context.variables.get(expr) || null
    }
    
    // Simple arithmetic operations
    if (expr.includes(' + ')) {
      const [left, right] = expr.split(' + ', 2)
      const leftVal = this.evaluateExpression(left)
      const rightVal = this.evaluateExpression(right)
      if (typeof leftVal === 'number' && typeof rightVal === 'number') {
        return leftVal + rightVal
      }
    }
    
    if (expr.includes(' - ')) {
      const [left, right] = expr.split(' - ', 2)
      const leftVal = this.evaluateExpression(left)
      const rightVal = this.evaluateExpression(right)
      if (typeof leftVal === 'number' && typeof rightVal === 'number') {
        return leftVal - rightVal
      }
    }
    
    if (expr.includes(' * ')) {
      const [left, right] = expr.split(' * ', 2)
      const leftVal = this.evaluateExpression(left)
      const rightVal = this.evaluateExpression(right)
      if (typeof leftVal === 'number' && typeof rightVal === 'number') {
        return leftVal * rightVal
      }
    }
    
    if (expr.includes(' / ')) {
      const [left, right] = expr.split(' / ', 2)
      const leftVal = this.evaluateExpression(left)
      const rightVal = this.evaluateExpression(right)
      if (typeof leftVal === 'number' && typeof rightVal === 'number') {
        return leftVal / rightVal
      }
    }
    
    if (expr.includes(' % ')) {
      const [left, right] = expr.split(' % ', 2)
      const leftVal = this.evaluateExpression(left)
      const rightVal = this.evaluateExpression(right)
      if (typeof leftVal === 'number' && typeof rightVal === 'number') {
        return leftVal % rightVal
      }
    }
    
    // Comparison operations
    if (expr.includes(' == ')) {
      const [left, right] = expr.split(' == ', 2)
      return this.evaluateExpression(left) === this.evaluateExpression(right)
    }
    
    return null
  }

  loadCode(code: string): void {
    const functions = this.parse(code)
    functions.forEach(func => {
      this.context.functions.set(func.name, func)
    })
  }

  reset(): void {
    this.context.variables.clear()
    this.context.functions.clear()
  }
}