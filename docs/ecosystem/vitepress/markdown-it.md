# Markdown

## markdown-it

```shell
pnpm add @types/markdown-it -D
pnpm add markdown-it
```

```ts
import MarkdownIt from 'markdown-it'

const md = MarkdownIt({
  // 允许在文件中写 HTML 标签
  html: false,
  // 自动将 url 转换为链接
  linkify: true
})

const html = md.render('# Markdown')
```

## 代码高亮

安装 `prismjs`

```shell
pnpm add prismjs
pnpm add -D @types/prismjs
```

将代码片段转换成 HTML

```ts
import prism from 'prismjs'

// The code snippet you want to highlight, as a string
const code = `var data = 1;`

// Returns a highlighted HTML string
const html = prism.highlight(code, Prism.languages.javascript, 'javascript')
```

Prism 会自动加载默认的 `markup`, `css`, `clike` 和 `javascript`. 可以使用 `loadLanguages()` 加载自己所需要的高亮语言

```ts
import prism from 'prismjs'
import loadLanguages from 'prismjs/components/index'

// required to make embedded highlighting work...
loadLanguages(['markup', 'css', 'javascript'])

// The code snippet you want to highlight, as a string
const code = `var data = 1;`

// Returns a highlighted HTML string
const html = prism.highlight(code, Prism.languages.javascript, 'javascript')
```

```ts
import prism from 'prismjs'
import loadLanguages from 'prismjs/components/index'

// required to make embedded highlighting work...
loadLanguages(['markup', 'css', 'javascript'])

function getLangCodeFromExtension(extension: string) {
  const extensionMap: Record<string, string> = {
    vue: 'markup',
    html: 'markup',
    md: 'markdown',
    rb: 'ruby',
    ts: 'typescript',
    py: 'python',
    sh: 'bash',
    yml: 'yaml',
    styl: 'stylus',
    kt: 'kotlin',
    rs: 'rust'
  }

  return extensionMap[extension] || extension
}

function wrap(str: string, lang: string) {
  return `<pre class="language-${lang}"><code>${str}</code></pre>`
}

export default (str: string, lang: string) => {
  lang = getLangCodeFromExtension(lang)

  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    } catch (error) {
      throw new Error(
        `Syntax highlight for language "${lang}" is not supported.`
      )
    }
  }

  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, lang)
  }

  return wrap(str, 'text')
}
```
