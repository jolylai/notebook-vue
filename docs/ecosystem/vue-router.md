---
title: Vue Router
---

- [vue-router-next](https://github.com/vuejs/vue-router-next)
- [](https://next.router.vuejs.org/guide/essentials/history-mode.html#hash-mode)

## 快速开始

安装 `vue-router`

```shell
yarn add vue-router
```

创建`/src/router/index.js`文件

```js
import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '../components/HelloWorld'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/',
    component: HelloWorld
  }
]

// 工厂函数
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

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

## 路由模式

### Hash 模式

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ]
})
```

实际的 URL 前面会有一个 `#`。因为这部分 URL 不会发送到服务器，我们无需对服务器进行特殊的配置。但不利于 SEO（搜索引擎优化），

### HTML5 模式

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ]
})
```

## 面包屑

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user',
      component: Layout,
      name: 'User',
      meta: {
        title: 'User'
      },
      children: [
        {
          path: 'list',
          component: () => import('@/views/user/list'),
          name: 'List',
          meta: { title: 'List' }
        },
        {
          path: 'detail/:id',
          component: () => import('@/views/user/detail'),
          name: 'Detail',
          meta: { title: 'Detail' }
        }
      ]
    }
  ]
})
```
