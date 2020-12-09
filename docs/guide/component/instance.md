---
title: 实例
---

## 插件一个应用实例

每个 `Vue` 应用都是通过用 `createApp` 函数创建一个新的应用实例开始的

```js
import { createApp } from 'vue'

const app = createApp({})
```

## 根组件

```js
const RootComponent = {
  /* 选项 */
}
const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')
```
