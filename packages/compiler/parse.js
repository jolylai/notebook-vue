const fs = require('fs')
const path = require('path')

const extend = Object.assign

const startsWidth = (source, searchString) => {
  return source.indexOf(searchString) == 0
}

const defaultParserOptions = {
  delimiters: [`{{`, `}}`],
  // getNamespace: () => Namespaces.HTML,
  // getTextMode: () => TextModes.DATA,
  // isVoidTag: NO,
  // 是否 <pre> tag
  isPreTag: 0
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

/**
 * 去除头部空格
 * @param {Object} context
 */
function advanceSpaces(context) {
  const match = /^[\t\r\n\f]+/.exec(context.source)

  if (match) {
    advanceBy(context, match[0].length)
  }
}

function getSelection(context, start, end) {
  end = end || getCursor(context)
  return {
    start,
    end,
    source: context.originalSource.slice(start.offset, end.offset)
  }
}

function parseComment(context) {}

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

/**
 * 解析标签 <div id="id">div</div>
 * @param {Object} context
 * @param {Number} type 0： 开始标签  1：结束标签
 * @param {Element[]}} parent 父节点
 */
function parseTag(context, type, parent) {
  const start = getCursor(context)
  // </div>
  const match = /<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source)

  // 标签名
  const tag = match[1]
  advanceBy(context, match[0].length)

  const cursor = getCursor(context)
  const currentSource = context.source

  const props = parseAttributes(context)
}

/**
 * 解析标签属性
 * @param {Object} context
 * @param {Set} nameSet 属性名集合
 */
function parseAttribute(context, nameSet) {
  const start = getCursor(context)
  console.log('context: ', context.source)
  const match = /[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source)
  // 属性名称
  const name = match[0]
  console.log('name: ', name)
  nameSet.add(name)

  advanceBy(context, name.length)

  let value

  if (/^[\t\r\n\f ]*=/.test(context.source)) {
    advanceSpaces(context)
    // 跳过 =
    advanceBy(context, 1)
    // 去除等号后的空格
    advanceSpaces(context)

    value = parseAttributeValue(context)
    console.log('value: ', value)
  }

  const loc = getSelection(context, start)
  console.log('loc: ', loc)
}

/**
 * 解析标签属性值
 * @param {Object} context
 */
function parseAttributeValue(context) {
  const start = getCursor(context)
  let content

  const quote = context.source[0]
  const isQuoted = quote === `"` || quote === `'`

  if (isQuoted) {
    advanceBy(context, 1)
    const endIndex = context.source.indexOf(quote)
    if (endIndex === -1) {
    } else {
      content = parseTextData()
    }
  }

  return { context, isQuoted, loc: getSelection(context, start) }
}

function parseAttributes(context, type) {
  const props = []
  const attributeNames = new Set()

  const attr = parseAttribute(context, attributeNames)
}

/**
 * 解析元素
 * @param {Object} context
 * @param {Element []} ancestors 祖先元素
 */
function parseElement(context, ancestors) {
  const start = getCursor(context)

  // 父节点
  const parent = ancestors[ancestors.length - 1]
  // 开始标签
  const element = parseTag(context, 0)
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
  // 创建解析上下文
  const context = createParserContext(content, options)
  //

  let node

  while (context.source) {
    if (startsWidth(context.source, '<!DOCTYPE')) {
      node = parseBogusComment(context)

      continue
    }
    //  else if (startsWidth(context.source, '<!--')) {
    //   parseComment(context)
    //   continue
    // } else if (startsWidth(context.source, context.options.delimiters[0])) {
    //   parseInterpolation(context)
    //   continue
    // }
    else if (/[a-z]/i.test(context.source[1])) {
      node = parseElement(context, [])
      continue
    }
    //
    break
  }

  //
}

const templatePath = path.resolve(__dirname, './index.html')

let template = fs.readFileSync(templatePath, 'utf-8').replace(/\n/g, '')

parse(template, {})
