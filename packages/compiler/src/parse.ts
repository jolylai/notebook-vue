import { Token } from './tokenize'

export interface Node {}

function parse(tokens: Token[]) {
  console.log('tokens: ', tokens)
  const stack = []
}

export default parse
