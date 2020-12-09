---
title: 指令
---

## 简介

#### 内置指令

`vue` 默认内置了一些指令，如`v-model` 、`v-bind` 和 `v-show` 等

```vue
<template>
  <a-input v-modal:value="form.foo" />
</template>
<script>
import { rective } from 'vue'
export default {
  setup() {}
}
</script>
```

#### 何时需要自定义指令

除了核心功能默认内置的指令 (v-model 和 v-show)，Vue 也允许注册自定义指令。
然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

## 自定义指令

#### 注册指令

```js
const app = Vue.createApp({})
// 注册一个全局自定义指令 `v-focus`
app.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  mounted(el) {
    // Focus the element
    el.focus()
  }
})
// 注册 (功能指令)
app.directive('my-directive', () => {
  // 这将被作为 `mounted` 和 `updated` 调用
})
```

#### 检索全局指令

```js
// getter, 如果已注册，则返回指令定义
const myDirective = app.directive('my-directive')
```

如果已注册，则返回指令定义(即 `app.directive()` 的第二个参数),如果未注册则返回`undefined`

## 钩子函数

指令是具有一组生命周期的钩子

```js
// 注册
app.directive('my-directive', {
  // 在绑定元素的父组件挂载之前调用
  beforeMount() {},
  // 绑定元素的父组件挂载时调用
  mounted() {},
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate() {},
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated() {},
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount() {},
  // 卸载绑定元素的父组件时调用
  unmounted() {}
})
```

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `beforeMount`：当指令第一次绑定到元素并且在挂载父组件之前调用。在这里你可以做一次性的初始化设置。
- `mounted`：在挂载绑定元素的父组件时调用。
- `beforeUpdate`：在更新包含组件的 VNode 之前调用。
- `updated`：在包含组件的 VNode 及其子组件的 VNode 更新后调用。
- `beforeUnmount`：在卸载绑定元素的父组件之前调用
- `unmounted`：当指令与元素解除绑定且父组件已卸载时，只调用一次。

#### 函数简写

在很多时候，你可能想在 mounted 和 updated 时触发相同行为，而不关心其它的钩子。比如这样写：

```js
app.directive('pin', (el, binding) => {
  el.style.position = 'fixed'
  const s = binding.arg || 'top'
  el.style[s] = binding.value + 'px'
})
```

#### 钩子函数参数

```js
app.directive('pin', (el, binding, vNode, prevNode) => {
  // some code
})
```

- **el**

指令绑定到的元素。这可用于直接操作 DOM。

- **binding**

包含以下 property 的对象。

- `instance`：使用指令的组件实例。
- `value`：传递给指令的值。例如，在 `v-my-directive="1 + 1"` 中，该值为 2。
- `oldValue`：先前的值，仅在 `beforeUpdate` 和 `updated` 中可用。值是否已更改都可用。
- `arg`：参数传递给指令 (如果有)。例如在 v-my-directive:foo 中，arg 为 "foo"。
- `modifiers`：包含修饰符 (如果有) 的对象。例如在 `v-my-directive.foo.bar` 中，修饰符对象为 `{foo: true，bar: true}`。
- `dir`：一个对象，在注册指令时作为参数传递。例如，在以下指令中

```js
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
```

dir 将会是以下对象：

```js
{
mounted(el) {
el.focus()
}
}
```

- **vnode**

上面作为 el 参数收到的真实 DOM 元素的蓝图。

- **prevNode**

上一个虚拟节点，仅在 beforeUpdate 和 updated 钩子中可用。
