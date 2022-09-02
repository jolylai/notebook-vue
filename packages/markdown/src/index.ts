import MarkdownIt from 'markdown-it'
import fs from 'fs-extra'

import highlight from './highlight'

const content = fs.readFileSync('README.md', 'utf-8')
console.log('content: ', content)

const md = MarkdownIt({
  html: false,
  linkify: true,
  highlight(str, lang, attrs) {
    const code = highlight(str, lang)
    return code
  }
})

const result = md.render(content)
console.log('result: ', result)
