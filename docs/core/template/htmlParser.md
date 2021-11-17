## 解析上下文

创建解析上下文

```js
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

- 文本，例如“难凉热血”
- HTML 注释，例如`<!-- 我是注释 -->`
- 条件注释，例如`<!-- [if !IE]> -->我是注释<!--< ![endif] -->`
- DOCTYPE，例如`<!DOCTYPE html>`
- 开始标签，例如`<div>`
- 结束标签，例如`</div>`

#### 解析 HTML 注释

```html
<!-- 注释内容 -->
```

我们知道 HTML 注释是以`<!--`开头，以`-->`结尾，这两者中间的内容就是注释内容，那么我们只需用正则判断待解析的模板字符串 html 是否以`<!--`开头，若是，那就继续向后寻找`-->`，如果找到了，OK，注释就被解析出来了。

#### 解析开始标签

#### 解析文本
