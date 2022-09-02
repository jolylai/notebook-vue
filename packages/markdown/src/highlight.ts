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
