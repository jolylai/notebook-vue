# Pinia

安装 Pinia

```shell
pnpm add pinia
```

创建 Pinia 实例并作为插件传递给 app

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```
