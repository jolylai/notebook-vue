import fs from 'fs'
import path from 'path'
;/<([a-zA-Z_][\w\-\.]*)/g

const comment = /^<!\--/
const conditionalComment = /^<!\[/
const doctype = /^<!DOCTYPE [^>]+>/i

const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`

const startTagOpen = new RegExp(`^<${qnameCapture}`)

const startTagClose = /^\s*(\/?)>/

const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/

const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

export function parseHTML(html, options) {
  const stack = []

  let index = 0

  function advance(n) {
    index += n
    html = html.substring(n)
  }

  function parseStartTag() {
    const start = html.match(startTagOpen)
    if (start) {
      //
      const match = {
        tagName: start[1],
        attrs: [],
        start: index
      }

      advance(start[0].length)

      let end, attr

      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        attr.start = index

        advance(attr[0].length)
        attr.end = index
        match.attrs.push(attr)
      }

      if (end) {
        match.unarySlash = end[1]
        advance(end[0].length)
        match.end = index

        return match
      }
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end)
    }
  }

  function handleStartTag(match) {}

  while (html) {
    let textEnd = html.indexOf('<')

    if (textEnd === 0) {
      // 注释节点
      if (comment.test(html)) {
        const commentEnd = html.indexOf('-->')

        if (commentEnd >= 0) {
          options.comment(html.substring(4, commentEnd))
          advance(commentEnd + 3)
          continue
        }
      }

      // 条件注释
      if (conditionalComment.test(html)) {
        const conditionalEnd = html.indexOf(']>')

        if (conditionalEnd >= 0) {
          advance(conditionalEnd + 2)
          continue
        }
      }

      // doctype
      const doctypeMatch = html.match(doctype)
      if (doctypeMatch) {
        advance(doctypeMatch[0].length)

        continue
      }

      // end Tag
      const endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        continue
      }

      // start tag
      const startTagMatch = parseStartTag()
      if (startTagMatch) {
        handleStartTag()
        continue
      }
    }
    advance(1)

    // 文本节点
    // let text, rest, next
    // if (textEnd >= 0) {
    //   rest = html.substring(textEnd)
    //   while (
    //     !endTag.test(rest) &&
    //     !startTagOpen.test(rest) &&
    //     !comment.test(rest) &&
    //     !conditionalComment.test(rest)
    //   ) {
    //     next = rest.indexOf('<')
    //     if (next < 0) break
    //     textEnd += next
    //     rest = html.slice(textEnd)
    //   }
    //   text = html.substring(0, textEnd)
    // }

    // if (text) {
    //   advance(text.length)
    // }
  }
}

const template = fs
  .readFileSync(path.resolve(__dirname, './index.html'))
  .toString()

//
parseHTML(template, {
  start(tag, attrs, unary) {
    console.log('tag: ', tag)
  },
  // 当解析到结束标签时，调用该函数
  end() {},
  // 当解析到文本时，调用该函数
  chars(text) {},
  // 当解析到注释时，调用该函数
  comment(text) {}
})
