---
title: 综述
---

## 前言

Vue 是数据驱动视图，如何有效控制 DOM 操作

js 模拟 DOM 结构

## 虚拟 DOM

直接操纵 DOM 是非常耗费性能，

- '|':(或) 有一个是 1，结果即为 1
- '&':(与)同为 1，结果为 1，否则为 0

```js
// 组件的类型
export const enum ShapeFlags {
    // 最后要渲染的 element 类型
    ELEMENT = 1,
    // 组件类型
    STATEFUL_COMPONENT = 1 << 2,
    // vnode 的 children 为 string 类型
    TEXT_CHILDREN = 1 << 3,
    // vnode 的 children 为数组类型
    ARRAY_CHILDREN = 1 << 4,
    // vnode 的 children 为 slots 类型
    SLOTS_CHILDREN = 1 << 5
  }
```

```js
const vnode = {
  // HTML上真正的节点
  el: null,
  component: null,
  key: props.key || null,
  type,
  props,
  children,
  // 类型标记
  shapeFlag: getShapeFlag(type)
}
```

## Hooks

```ts
const hooks: Array<keyof Module> = [
  'create',
  'update',
  'remove',
  'destroy',
  'pre',
  'post'
]
```
