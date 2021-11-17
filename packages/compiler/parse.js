const fs = require('fs')
const path = require('path')
console.log(__dirname)

const extend = Object.assign

const startsWidth = (source, searchString) => {
  return source.indexOf(searchString) == 0
}

const defaultParserOptions = {
  delimiters: [`{{`, `}}`]
  // getNamespace: () => Namespaces.HTML,
  // getTextMode: () => TextModes.DATA,
  // isVoidTag: NO,
  // isPreTag: NO,
  // isCustomElement: NO,
  // decodeEntities: (rawText: string): string =>
  //   rawText.replace(decodeRE, (_, p1) => decodeMap[p1]),
  // onError: defaultOnError,
  // onWarn: defaultOnWarn,
  // comments: __DEV__
}

// ===================  上下文操作 ====================
/**
 *
 * @param {*} content
 * @param {*} rawOptions
 * @returns
 */
function createParserContext(content, rawOptions) {
  const options = extend({}, defaultParserOptions, rawOptions)

  return {
    options,
    column: 1,
    line: 1,
    offset: 0,
    originalSource: content,
    source: content,
    inPre: false,
    inVPre: false,
    onWarn: options.onWarn
  }
}

/**
 * 获取当前解析上下文位置
 * @param {Object} context
 * @returns
 */
function getCursor(context) {
  const { column, line, offset } = context
  return { column, line, offset }
}

function advanceBy(context, numberOfCharacters) {
  const { source } = context

  advancePositionWithMutation(context, source, numberOfCharacters)

  context.source = source.slice(numberOfCharacters)
}

function advancePositionWithMutation(
  pos,
  source,
  numberOfCharacters = source.length
) {
  let linesCount = 0
  let lastNewLinePos = -1
  for (let i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10 /* newline char code */) {
      linesCount++

      lastNewLinePos = i
    }
  }

  pos.offset += numberOfCharacters
  pos.line += linesCount
  pos.column =
    lastNewLinePos === -1
      ? pos.column + numberOfCharacters
      : numberOfCharacters - lastNewLinePos

  return pos
}

function getSelection(context, start, end) {
  end = end || getCursor(context)
  return {
    start,
    end,
    source: context.originalSource.slice(start.offset, end.offset)
  }
}

function parseBogusComment(context) {
  const start = getCursor(context)
  const contentStart = context.source[1] === '?' ? 1 : 2
  const closeIndex = context.source.indexOf('>')

  let content

  if (closeIndex === -1) {
    content = context.source.slice(contentStart)
    advanceBy(context, context.length)
  } else {
    content = context.source.slice(contentStart, closeIndex)
    advanceBy(context, closeIndex + 1)
  }

  return {
    type: 3,
    content,
    loc: getSelection(context, start)
  }
}

function parseTag(context) {
  const match = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source)
  console.log('match: ', match)
  const tag = match[1]
  advanceBy(context, match[0].length)
}

function parseElement(context, type) {
  const start = getCursor(context)
  console.log('start: ', start)
  parseTag(context, 0)
}

// 解析插槽值
function parseInterpolation(context) {
  const [open, close] = context.options.delimiters

  const closeIndex = context.source.indexOf(close, open.length)
  const start = getCursor(context)
  advanceBy(context, open.length)

  const innerStart = getCursor(context)
  const innerEnd = getCursor(context)

  const rawContentLength = closeIndex - open.length
  const rawContent = context.source.slice(0, rawContentLength)
}

function parseTextData(context, length) {
  const rawText = context.source.slice(0, length)
  advanceBy(context, length)
}

function parse(content, options) {
  const context = createParserContext(content, options)
  console.log('context: ', context)

  let node

  if (startsWidth(context.source, '<!DOCTYPE')) {
    node = parseBogusComment(context)
  } else if (startsWidth(context.source, '<!--')) {
  } else if (startsWidth(context.source, context.options.delimiters[0])) {
    parseInterpolation(context)
  } else if (/[a-z]/i.test(context.source[1])) {
    node = parseElement(context)
  }

  console.log('node: ', node)

  // console.log(context)
}

// let template = `<div id="counter"> Counter: {{ counter }}</div>`

// template = fs
//   .readFileSync(path.resolve(__dirname, './index.html'))
//   .toString()
//   .replace(/\n/g, '')

parse('<div id="1">element</div>', {})
