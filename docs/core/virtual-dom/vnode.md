## 前言

所谓虚拟 DOM，就是用一个 JS 对象来描述一个 DOM 节点

```html
<div class="a" id="b">我是内容</div>
```

上面的 HTML 可以用下面的 JS 对象来描述

```js
{
  tag:'div',        // 元素标签
  attrs:{           // 属性
    class:'a',
    id:'b'
  },
  text:'我是内容',  // 文本内容
  children:[]       // 子元素
}
```

我们把组成一个 DOM 节点的必要东西通过一个 JS 对象表示出来，那么这个 JS 对象就可以用来描述这个 DOM 节点，我们把这个 JS 对象就称为是这个真实 DOM 节点的虚拟 DOM 节点。

## VNode 的类型

- 注释节点
- 文本节点
- 元素节点
- 组件节点
- 函数式组件节点
- 克隆节点

### 注释节点

```js
export function createCommentVNode(text: string = ''): VNode {
  return createVNode(Comment, null, text)
}
```

### 文本节点

```js
export function createTextVNode(text: string = ' ', flag: number = 0): VNode {
  return createVNode(Text, null, text, flag)
}
```

```ts
function createBaseVNode(
  type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
  props: (Data & VNodeProps) | null = null,
  children: unknown = null,
  patchFlag = 0,
  dynamicProps: string[] | null = null,
  shapeFlag = type === Fragment ? 0 : ShapeFlags.ELEMENT,
  isBlockNode = false,
  needFullChildrenNormalization = false
) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  } as VNode

  return vnode
}
```
