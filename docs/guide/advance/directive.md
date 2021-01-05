---
title: 指令
---

- [8 个非常实用的 Vue 自定义指令](https://juejin.cn/post/6906028995133833230)

自定义指令可以提供很好的帮助：

- 组件权限验证
- 文本复制
- 快捷键绑定
- 滚动至指定位置
- 图片懒加载
- 焦点

## 生命周期

```js
Vue.directive('color', {
  bind() {},
  inserted() {},
  update() {},
  componentUpdated() {},
  unbind() {}
})
```

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

- `update`：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。

- `componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

- `unbind`：只调用一次，指令与元素解绑时调用。

## 参数

HTML 与 JS 之间的通讯

```html
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
```

```js
Vue.directive('demo', {
  bind: function(el, binding, vnode) {}
})
```

在 binding 中拿到的 HTML 中对应的传参的表达式

```
v-name:arg.modifiers=expression
```

其中 value 为 expression 执行的结果

- el：指令所绑定的元素，可以用来直接操作 DOM 。
- binding：一个对象，包含以下属性：
  - name：指令名，不包括 v- 前缀。
  - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
- vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
- oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

### 动态指令参数(arg)

```html
<p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
```

```js
Vue.directive('pin', {
  bind: function(el, binding, vnode) {
    el.style.position = 'fixed'
    // binding.arg 获取动态指令参数
    var s = binding.arg == 'left' ? 'left' : 'top'
    el.style[s] = binding.value + 'px'
  }
})

new Vue({
  el: '#dynamicexample',
  data: function() {
    return {
      direction: 'left'
    }
  }
})
```

### 对象字面量(value)

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
Vue.directive('demo', function(el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## 函数简写

在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子。

```js
Vue.directive('color', function(el, binding, vnode) {
  el.style = `color: ${binding.value}`
})
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <title>自定义指令</title>
  </head>
  <body>
    <div id="app">
      <div v-color="color">Color</div>
    </div>
    <script type="text/javascript">
      Vue.directive('color', function(el, binding, vnode) {
        el.style = `color: ${binding.value}`
      })
      const app = new Vue({
        el: '#app',
        data: {
          color: 'red'
        }
      })
    </script>
  </body>
</html>
```

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
