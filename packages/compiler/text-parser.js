const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

function textParser(text) {
  const tagRE = defaultTagRE

  if (!tagRE.test(text)) return

  const tokens = []
  const rawTokens = []

  let lastIndex = (tagRE.lastIndex = 0)
  let match, index, tokenValue
  while ((match = tagRE.exec(text))) {
    index = match.index

    if (index > lastIndex) {
      rawTokens.push((tokenValue = text.slice(lastIndex, index)))
      tokens.push(JSON.stringify(tokenValue))
    }

    const exp = match[1].trim()
    console.log('exp: ', exp)
    tokens.push(`_s(${exp})`)
    rawTokens.push({ '@binding': exp })

    lastIndex = index + match[0].length
  }

  if (lastIndex < text.length) {
    rawTokens.push((tokenValue = text.slice(lastIndex)))
    tokens.push(JSON.stringify(tokenValue))
  }

  return { expression: tokens.join('+'), tokens: rawTokens }
}

const text = textParser('我叫{{name}}，我今年{{age}}岁了')
console.log('text: ', text)
