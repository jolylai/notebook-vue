enum State {
  // 初始状态
  Initial,
  // 标签开始状态
  TagOpen,
  // 标签名称状态
  TagName,
  // 文本状态
  Text,
  // 标签结束状态
  TagEnd,
  // 标签闭合状态
  TagEndName
}

export type Token = {
  type: 'tag' | 'text' | 'tagEnd'
  name?: string
  content?: string
}

const charReg = /^[a-zA-Z]$/
const isChar = (char: string) => charReg.test(char)

function tokenize(template: string): Token[] {
  let currentState = State.Initial
  const tokens: Token[] = []
  const chars: string[] = []

  while (template) {
    const char = template[0]

    switch (currentState) {
      case State.Initial:
        if (char === '<') {
          currentState = State.TagOpen
          template = template.slice(1)
        }
        break

      case State.TagOpen:
        if (isChar(char)) {
          currentState = State.TagName
          chars.push(char)
          template = template.slice(1)
        }
        break
      case State.TagName:
        if (isChar(char)) {
          chars.push(char)
          template = template.slice(1)
        }
        break
      default:
        template = template.slice(1)
        break
    }
  }

  return tokens
}

export default tokenize
