---
title: 快速开始
---

- [vue-router-next](https://github.com/vuejs/vue-router-next)
- [](https://next.router.vuejs.org/guide/essentials/history-mode.html#hash-mode)

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

安装 `vue-router`

```shell
yarn add vue-router@next
```

创建`/src/router/index.js`文件

```js
import { createRouter, createWebHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/App')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
```

修改`/src/App.Vue`

```vue
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```
