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
