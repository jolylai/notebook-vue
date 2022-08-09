# Plugin

## Todo

- [ ] demo
- [ ] search

## Demo

1. markdown-it 的处理方式
1. vite 插件处理方式

1. md -> vue
1. <code src='' />

![code.png](https://cdn.nlark.com/yuque/0/2021/png/226152/1625186740899-efafd4dd-a02e-4c79-acf4-6adda9def675.png#crop=0&crop=0&crop=1&crop=1&height=495&id=fNe12&margin=%5Bobject%20Object%5D&name=code.png&originHeight=1228&originWidth=968&originalType=binary&ratio=1&rotation=0&showTitle=false&size=164075&status=done&style=none&title=&width=390)

```vue
<template>
  <component-demo
    demo-file-name="<!--DEMO_FILE_NAME-->"
    relative-url="<!--URL-->"
    title="<!--TITLE_SLOT-->"
    code="<!--CODE_SLOT-->"
  >
    <template #title>
      <!--TITLE_SLOT-->
    </template>
    <template #content>
      <!--CONTENT_SLOT-->
    </template>
    <template #demo>
      <div class="demo-card__view">
        <!--DEMO_SLOT-->
      </div>
    </template>
  </component-demo>
</template>

<!--SCRIPT_SLOT-->

<!--STYLE_SLOT-->
```

```javascript
const marked = require('marked')
const fs = require('fs')
const path = require('path')
const createRenderer = require('./md-renderer')
const mdRenderer = createRenderer()

const demoBlock = fs
  .readFileSync(path.resolve(__dirname, 'ComponentDemoTemplate.vue'))
  .toString()

function getPartsOfDemo(tokens) {
  let template = null
  let script = null
  let style = null
  let title = null
  const contentTokens = []
  contentTokens.links = tokens.links
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      title = token.text
    } else if (
      token.type === 'code' &&
      (token.lang === 'template' || token.lang === 'html')
    ) {
      template = token.text
    } else if (
      token.type === 'code' &&
      (token.lang === 'script' || token.lang === 'js')
    ) {
      script = token.text
    } else if (
      token.type === 'code' &&
      (token.lang === 'style' || token.lang === 'css')
    ) {
      style = token.text
    } else {
      contentTokens.push(token)
    }
  }
  return {
    template: template,
    script: script,
    style: style,
    title: title,
    content: marked.parser(contentTokens, {
      renderer: mdRenderer
    })
  }
}

function mergeParts(parts) {
  const mergedParts = {
    ...parts
  }
  mergedParts.title = parts.title
  mergedParts.content = parts.content
  mergedParts.code = ''
  if (parts.template) {
    mergedParts.code += `<template>\n${parts.template
      .split('\n')
      .map(line => (line.length ? '  ' + line : line))
      .join('\n')}\n</template>`
  }
  if (parts.script) {
    if (parts.template) mergedParts.code += '\n\n'
    mergedParts.code += `<script>
${parts.script}
</script>`
  }
  if (parts.style) {
    if (parts.template || parts.script) mergedParts.code += '\n\n'
    mergedParts.code += `<style>
${parts.style}
</style>`
  }
  mergedParts.code = encodeURIComponent(mergedParts.code)
  return mergedParts
}

const cssRuleRegex = /([^{}]*)(\{[^}]*\})/g

// simulate scss style
// to remove dep of sass
// xxx {
//   mystyle
// }
function genStyle(sourceStyle) {
  let match
  let matched = false
  const rules = []

  while ((match = cssRuleRegex.exec(sourceStyle)) !== null) {
    matched = true
    const selector = match[1]
    const body = match[2]
    rules.push(
      selector
        .split(',')
        .map(part => `.demo-card__view ${part}, .naive-ui-doc ${part}`)
        .join(',') + body
    )
  }
  if (!matched) return null
  return '<style scoped>\n' + rules.join('\n') + '</style>'
}

function genVueComponent(parts, fileName, relativeUrl, noRunning = false) {
  const demoFileNameReg = /<!--DEMO_FILE_NAME-->/g
  const relativeUrlReg = /<!--URL-->/g
  const titleReg = /<!--TITLE_SLOT-->/g
  const contentReg = /<!--CONTENT_SLOT-->/
  const codeReg = /<!--CODE_SLOT-->/
  const scriptReg = /<!--SCRIPT_SLOT-->/
  const styleReg = /<!--STYLE_SLOT-->/
  const demoReg = /<!--DEMO_SLOT-->/
  let src = demoBlock
  src = src.replace(demoFileNameReg, fileName)
  src = src.replace(relativeUrlReg, relativeUrl)
  if (parts.content) {
    src = src.replace(contentReg, parts.content)
  }
  if (parts.title) {
    src = src.replace(titleReg, parts.title)
  }
  if (parts.code) {
    src = src.replace(codeReg, parts.code)
  }
  if (parts.script && !noRunning) {
    src = src.replace(scriptReg, '<script>\n' + parts.script + '\n</script>')
  }
  if (parts.style) {
    const style = genStyle(parts.style)
    if (style !== null) {
      src = src.replace(styleReg, style)
    }
  }
  if (parts.template) {
    src = src.replace(demoReg, parts.template)
  }
  return src.trim()
}

function getFileName(resourcePath) {
  const dirs = resourcePath.split('/')
  const fileNameWithExtension = dirs[dirs.length - 1]
  return [fileNameWithExtension.split('.')[0], fileNameWithExtension]
}

function convertMd2Demo(text, { resourcePath, relativeUrl }) {
  const noRunning = /<!--no-running-->/.test(text)
  const tokens = marked.lexer(text)
  const parts = getPartsOfDemo(tokens)
  const mergedParts = mergeParts(parts)
  const [fileName] = getFileName(resourcePath)
  const vueComponent = genVueComponent(
    mergedParts,
    fileName,
    relativeUrl,
    noRunning
  )
  return vueComponent
}

module.exports = convertMd2Demo
```

````markdown
:::demo Progress 组件设置`percentage`属性即可，表示进度条对应的百分比，**必填**，必须在 0-100。通过 `format` 属性来指定进度条文字内容。

```html
<el-progress :percentage="50"></el-progress>
<el-progress :percentage="100" :format="format"></el-progress>

<script>
  export default {
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`
      }
    }
  }
</script>
```
````

:::

````
## markdown-it
```javascript
// default mode
var md = require('markdown-it')();

// enable everything
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});

// full options list (defaults)
var md = require('markdown-it')({
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (
).
                              // This is only for full CommonMark compatibility.
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
  linkify:      false,        // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) { return ''; }
});
````

## markdown-it-container

[https://github.com/markdown-it/markdown-it-container#readme](https://github.com/markdown-it/markdown-it-container#readme)

```javascript
import MarkdownIt from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'

md.use(MarkdownItContainer, 'demo', {
  marker: ':',
  validate(params) {
    return params.trim().match(/^demo\s*(.*)$/)
  },
  render(tokens, idx) {
    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
    if (tokens[idx].nesting === 1) {
      const description = m && m.length > 1 ? m[1] : ''
      const content =
        tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
      return `<demo-block>
      ${description ? `<div>${md.render(description)}</div>` : ''}
      <!--element-demo: ${content}:element-demo-->
      `
    }
    return '</demo-block>'
  }
})
```

将

```markdown
<demo-block>
  <div>
    <p>Progress 组件设置<code>percentage</code>属性即可，表示进度条对应的百分比，<strong>必填</strong>，必须在 0-100。通过 <code>format</code> 属性来指定进度条文字内容。</p>
  </div>
  <!--element-demo: 
    <el-progress :percentage="50">
      </el-progress>
      <el-progress :percentage="100" :format="format"></el-progress>
      <el-progress :percentage="100" status="success"></el-progress>
      <el-progress :percentage="100" status="warning"></el-progress>
      <el-progress :percentage="50" status="exception"></el-progress>

      <script>
        export default {
          methods: {
            format(percentage) {
              return percentage === 100 ? '满' : `${percentage}%`
            },
          },
        }
      </script>

:element-demo-->

        <pre><code class="language-html">&lt;el-progress :percentage=&quot;50&quot;&gt;&lt;/el-progress&gt;

&lt;el-progress :percentage=&quot;100&quot; :format=&quot;format&quot;&gt;&lt;/el-progress&gt;
&lt;el-progress :percentage=&quot;100&quot; status=&quot;success&quot;&gt;&lt;/el-progress&gt;
&lt;el-progress :percentage=&quot;100&quot; status=&quot;warning&quot;&gt;&lt;/el-progress&gt;
&lt;el-progress :percentage=&quot;50&quot; status=&quot;exception&quot;&gt;&lt;/el-progress&gt;

&lt;script&gt;
export default {
methods: {
format(percentage) {
return percentage === 100 ? '满' : `${percentage}%`
},
},
}
&lt;/script&gt;
</code></pre>
</demo-block>
```

## markdown-it-chain

```vue
<template>
  <section class="content element-doc">
    <demo-block>
      <div>
        <p>
          Progress
          组件设置<code>percentage</code>属性即可，表示进度条对应的百分比，<strong>必填</strong>，必须在
          0-100。通过 <code>format</code> 属性来指定进度条文字内容。
        </p>
      </div>
      <template #source><element-demo0 /></template>
      <pre><code class="language-html">&lt;el-progress :percentage=&quot;50&quot;&gt;&lt;/el-progress&gt;
&lt;el-progress :percentage=&quot;100&quot; :format=&quot;format&quot;&gt;&lt;/el-progress&gt;
&lt;el-progress :percentage=&quot;100&quot; status=&quot;success&quot;&gt;&lt;/el-progress&gt;
&lt;el-progress :percentage=&quot;100&quot; status=&quot;warning&quot;&gt;&lt;/el-progress&gt;
&lt;el-progress :percentage=&quot;50&quot; status=&quot;exception&quot;&gt;&lt;/el-progress&gt;

&lt;script&gt;
  export default {
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`
      },
    },
  }
&lt;/script&gt;
</code></pre>
    </demo-block>
  </section>
</template>
<script lang="js">
              import * as Vue from 'vue';
              export default {
                name: 'component-doc',
                components: {
                  "element-demo0": (function() {

    const { resolveComponent: _resolveComponent, createVNode: _createVNode, openBlock: _openBlock, createBlock: _createBlock } = Vue

function render(_ctx, _cache) {
  const _component_el_progress = _resolveComponent("el-progress")

  return (_openBlock(), _createBlock("div", null, [
    _createVNode(_component_el_progress, { percentage: 50 }),
    _createVNode(_component_el_progress, {
      percentage: 100,
      format: _ctx.format
    }, null, 8 /* PROPS */, ["format"]),
    _createVNode(_component_el_progress, {
      percentage: 100,
      status: "success"
    }),
    _createVNode(_component_el_progress, {
      percentage: 100,
      status: "warning"
    }),
    _createVNode(_component_el_progress, {
      percentage: 50,
      status: "exception"
    })
  ]))
}

    const democomponentExport = {
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`
      },
    },
  }
    return {
      render,
      ...democomponentExport
    }
  })(),
                }
              }
</script>
```
