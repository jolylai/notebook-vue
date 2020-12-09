---
title: Vue Router
---

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
