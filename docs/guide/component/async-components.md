---
title: 异步组件
---

不带选项的异步组件

```js
import { defineAsyncComponent } from 'vue'

const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))
```

带选项的异步组件

```js
import { defineAsyncComponent } from 'vue'

const LoadingComponent = {
  template: `<div v-loading="true" style="min-height: 500px; width: 100%;"></div>`
}
const ErrorComponent = {
  template: `
    <div style="text-align: center;padding: 100px 0;">Loading error. Please refresh the page and try again</div>`
}

const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

loader 函数不再接收 resolve 和 reject 参数，且必须始终返回 Promise。
