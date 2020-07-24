---
title: 面包屑
---

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user',
      component: Layout,
      name: 'User',
      meta: {
        title: 'User',
      },
      children: [
        {
          path: 'list',
          component: () => import('@/views/user/list'),
          name: 'List',
          meta: { title: 'List' },
        },
        {
          path: 'detail/:id',
          component: () => import('@/views/user/detail'),
          name: 'Detail',
          meta: { title: 'Detail' },
        },
      ],
    },
  ],
});
```
