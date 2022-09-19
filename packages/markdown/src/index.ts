import MarkdownIt from 'markdown-it'
import fs from 'fs-extra'

import highlight from './highlight'
import path from 'path'

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

const outputDir = path.join(__dirname, '../dist')

fs.ensureDirSync(outputDir)
fs.writeFileSync(path.resolve(outputDir, 'index.html'), result, 'utf-8')
