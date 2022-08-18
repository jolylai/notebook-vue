# 快速开始

安装 `vue-router`

```shell
pnpm add vue-router
```

创建`/src/router/index.ts`文件

```ts
import { createRouter, createWebHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
```

在 `app.ts` 中使用 router

```ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router).mount('#app')
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

内置一些功能，主要是对以下这些功能做了一些封装：

- 用户信息管理（储存信息、对 token 进行操作等）
- 登陆（调接口）
- 菜单管理（储存路由信息，生成菜单，模糊查询等功能）
- UA 信息
- 全屏操作
- Loading
- 日志管理（消息提醒、日志留存、日志上报）

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

#### Reference

- [vue-router-next](https://github.com/vuejs/vue-router-next)
- [](https://next.router.vuejs.org/guide/essentials/history-mode.html#hash-mode)
