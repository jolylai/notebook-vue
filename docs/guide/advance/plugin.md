---
title: 插件
---

## 前言

插件是自包含的代码，通常向 Vue 添加全局级功能。它可以是公开 `install()` 方法的 `object`，也可以是 `function`

插件的功能范围没有严格的限制——一般有下面几种：

1. 添加全局资源：指令/过滤器/过渡等。如：vue-touch

```js
export default function(app, options) {
  // 指令
  app.directive('focus', function focus(el) {
    el.focus()
  })

  // 过滤器  vue 3.0 去除了
  app.filters('focus', function() {})
}
```

2. 通过全局混入来添加一些组件选项。如 [vue-router](https://github.com/vuejs/vue-router)

```js
export default function(app, options) {
  app.mixin({
    methods: {
      foo() {}
    }
  })
}
```

3. 添加全局实例方法，通过把它们添加到 `config.globalProperties` 上实现。

```js
export default function(app, options) {
  app.config.globalProperties.$customProperty = 1
  app.config.globalProperties.$customFuction = function() {}
}
```

```js
import { getCurrentInstance } from 'vue'

export default {
  setup() {
    const { ctx } = getCurrentInstance()
    ctx.$translate('foo')
  }
}
```

4. 添加全局方法或者 property。如：vue-custom-element

```js
export default function(app, options) {
  app.provide('i18n', { foo: 1 })
}
```

```js
import { inject } from 'vue'

export default {
  setup() {
    const i18n = inject('i18n')
    console.log('i18n: ', i18n)
  }
}
```

5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router

## 编写插件

每当这个插件被添加到应用程序中时，如果它是一个对象，就会调用 `install` 方法。

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // Plugin code goes here
  }
}
```

如果它是一个 `function`，则函数本身将被调用。

```js
// plugins/i18n.js
export default function(app, options) {
  // Plugin code goes here
}
```

在这两种情况下——它都会收到两个参数：由 Vue 的 createApp 生成的 app 对象和用户传入的选项。

## 使用插件

```js
import { createApp } from 'vue'
import Root from './App.vue'
import i18nPlugin from './plugins/i18n'

const app = createApp(Root)
const i18nStrings = {
  greetings: {
    hi: 'Hallo!'
  }
}

app.use(i18nPlugin, i18nStrings)
app.mount('#app')
```
