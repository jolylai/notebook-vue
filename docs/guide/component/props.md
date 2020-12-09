---
title: Props
---

## 传递静态或动态的 Prop

```html
<blog-post title="My journey with Vue"></blog-post>

<!-- 动态赋予一个变量的值 -->
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue     -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。             -->
<blog-post :title="42"></blog-post>
```

## Props 效验

```js
app.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
    // 具有默认值的函数
    propG: {
      type: Function,
      // 与对象或数组默认值不同，这不是一个工厂函数 —— 这是一个用作默认值的函数
      default: function() {
        return 'Default function'
      }
    }
  }
})
```

#### 类型检查

type 可以是下列原生构造函数中的一个：

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

此外，type 还可以是一个自定义的构造函数，并且通过 `instanceof` 来进行检查确认。例如，给定下列现成的构造函数：

```js
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

app.component('blog-post', {
  props: {
    author: Person
  }
})
```

用于验证 author prop 的值是否是通过 new Person 创建的。

```js
export default {
  props: {
    title: {
      type: String,
      default: '1',
      validator(value) {}
    }
  }
}
```

## 单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

另外，**每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值**。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

## Prop 的大小写命名

HTML 中的 attribute 名是大小写不敏感的，所以**浏览器会把所有大写字符解释为小写字符**。

组件 props 使用 camelCase (驼峰命名法)

```js
const app = Vue.createApp({})

app.component('blog-post', {
  // camelCase in JavaScript
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

DOM 模板`Props`需要使用 `kebab-case` (短横线分隔命名) 传入

```html
<!-- kebab-case in HTML -->

<blog-post post-title="hello!"></blog-post>
```
