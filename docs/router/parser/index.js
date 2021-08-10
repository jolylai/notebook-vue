import { TokenType } from './pathTokenizer'

export function tokensToParser(segments, extraOptions) {
  const options = Object.assign({}, extraOptions)

  const score = []
  const keys = []

  let pattern = options.start ? '^' : ''

  const re = new RegExp(pattern, options.sensitive ? '' : i)
  function parse(path) {
    const match = path.match(re)
    const params = {}

    if (!match) return null
    // for(let i = 1; i< match.length, i++){
    //   const value = match[i] || ''
    //   // const key = keys[i -1]

    // }
  }

  function stringify(params) {
    let path = ''

    for (let token of segments) {
      if (token.type === TokenType.Static) {
        path += token.value
      } else if (token.type === TokenType.Param) {
        const { value, repeatable, optional } = token

        const param = value in params ? params[value] : ''
        const text = Array.isArray(param) ? param.join('/') : param

        path += text
      }
    }

    return path
  }
}
