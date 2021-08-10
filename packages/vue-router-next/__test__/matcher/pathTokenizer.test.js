import { tokenizerPath, TokenType } from '../../src/matcher/pathTokenizer'

describe('pathTokenizer', () => {
  test('root', () => {
    expect(tokenizerPath('/')).toEqual([
      [{ type: TokenType.Static, value: '' }]
    ])
  })
})
