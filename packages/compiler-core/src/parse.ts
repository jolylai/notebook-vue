enum State {
  Initial,
  TagOpen,
  TagName,
  Text,
  TagEnd,
  TagEndName
}

type Token = {
  type: 'tag' | 'text' | 'tagEnd'
  name?: string
  content?: string
}

const charReg = /^[a-zA-Z]$/
const isChar = (char: string) => charReg.test(char)

export function tokenized(template: string) {
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

export function parse() {}
