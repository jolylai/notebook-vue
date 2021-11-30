## 解析上下文

创建解析上下文

```js
export const defaultParserOptions: MergedParserOptions = {
  delimiters: [`{{`, `}}`],
  getNamespace: () => Namespaces.HTML,
  getTextMode: () => TextModes.DATA,
  isVoidTag: NO,
  isPreTag: NO,
  isCustomElement: NO,
  decodeEntities: (rawText: string): string =>
    rawText.replace(decodeRE, (_, p1) => decodeMap[p1]),
  onError: defaultOnError,
  onWarn: defaultOnWarn,
  comments: __DEV__
}

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
```

获取当前解析上下文位置

```js
function getCursor(context) {
  const { column, line, offset } = context
  return { column, line, offset }
}
```

```js
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
```

获取解析的代码

```js
function getSelection(context, start, end) {
  end = end || getCursor(context)
  return {
    start,
    end,
    source: context.originalSource.slice(start.offset, end.offset)
  }
}
```

节点类型

```ts
export const enum NodeTypes {
  ROOT,
  ELEMENT,
  TEXT,
  COMMENT,
  SIMPLE_EXPRESSION,
  INTERPOLATION,
  ATTRIBUTE,
  DIRECTIVE,
```

## 解析不同的内容

#### 注释节点

- HTML 注释，例如`<!-- 我是注释 -->`
- 条件注释，例如`<!-- [if !IE]> -->我是注释<!--< ![endif] -->`
- DOCTYPE，例如`<!DOCTYPE html>`

HTML 注释是以`<!--`开头，以`-->`结尾，这两者中间的内容就是注释内容，那么我们只需用正则判断待解析的模板字符串 html 是否以`<!--`开头，若是，那就继续向后寻找`-->`，如果找到了，OK，注释就被解析出来了。

```js
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
```

- parseInterpolation(context, mode)
- parseComment(context)
- parseBogusComment(context)
- parseCDATA(context, ancestors)
- parseTag(context, TagType.End, parent)
- parseElement(context, ancestors)
- parseText(context, mode)

解析

- 文本，例如“难凉热血”

- 开始标签，例如`<div>`
- 结束标签，例如`</div>`

#### 解析开始标签

#### 解析文本
