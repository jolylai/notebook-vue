export const TokenType = {
  Static: 0,
  Param: 1,
  Group: 2
}

const TokenizerState = {
  Static: 0,
  Params: 1,
  ParamsRegExp: 2,
  ParamsRegExpEnd: 3,
  EscapeNext: 4
}

const VALID_PARAM_RE = /[a-zA-Z0-9_]/

export function tokenizePath(path) {
  console.log('path: ', path)
  let state = TokenizerState.Static
  const previousState = state

  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`)
  }

  const tokens = []
  let segment = []

  // index on the path
  let i = 0
  // char at index
  let char
  // buffer of the value read
  let buffer = ''
  // custom regexp for a param
  let customRe = ''

  function finalizeSegment() {
    if (segment) tokens.push(segment)
    segment = []
  }

  function addCharToBuffer() {
    buffer += char
  }

  function consumeBuffer() {
    if (!buffer) {
      return
    }
    if (state === TokenizerState.Static) {
      segment.push({
        type: TokenizerState.Static,
        value: buffer
      })
    } else if (
      state === TokenizerState.Params ||
      state === TokenizerState.ParamsRegExp ||
      state === TokenizerState.ParamsRegExpEnd
    ) {
      segment.push({
        type: TokenizerState.Params,
        value: buffer,
        // 正则
        regexp: customRe,
        // 可重复
        repeatable: char === '*' || char === '+',
        // 可选
        optional: char === '*' || char === '?'
      })
    }

    buffer = ''
  }

  while (i < path.length) {
    char = path[i++]

    switch (state) {
      case TokenizerState.Static:
        if (char === '/') {
          if (buffer) {
            consumeBuffer()
          }
          finalizeSegment()
        } else if (char === ':') {
          consumeBuffer()
          state = TokenizerState.Params
        } else {
          addCharToBuffer()
        }

        break

      case TokenizerState.Params:
        if (char === '(') {
          state.TokenizerState.ParamsRegExp
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer()
        } else {
          consumeBuffer()
          state = TokenizerState.Static
        }
        break
      // 正则
      case TokenizerState.ParamsRegExp:
        if (char === ')') {
          if (customRe[customRe.length - 1] === '\\') {
            customRe = customRe.slice(0, -1) + char
          } else {
            state = TokenizerState.ParamsRegExpEnd
          }
        } else {
          customRe += char
        }
        break

      case TokenizerState.ParamsRegExpEnd:
        consumeBuffer()

        state = TokenizerState.Static
        customRe = ''

        break

      default:
        crash('Unknown state')
        break
    }
  }

  consumeBuffer()
  finalizeSegment()

  return tokens
}
