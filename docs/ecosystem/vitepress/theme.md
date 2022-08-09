# 主题配置

## 目录结构

```
.
├─ docs
│  ├─ .vitepress
│  │  ├─ theme
│  │  │  └─ index.js
│  │  └─ config.js
│  └─ index.md
└─ package.json
```

- theme/global-components: 该目录下的组件都会被自动注册为全局组件。想了解更多，请参考 [@vuepress/plugin-register-components(opens new window)](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-register-components)。
- theme/components: Vue 组件。
- theme/layouts: 布局组件，其中 Layout.vue 是必需的。
- theme/styles: 全局的样式和调色板。
- theme/templates: 修改默认的模板文件。
- theme/index.js: 主题文件的入口文件。
- theme/enhanceApp.js: 主题水平的客户端增强文件。

```typescript
import ElementPlus from 'element-plus'

import VPApp, { NotFound, globals } from '../vitepress'
import { define } from '../utils/types'
import 'uno.css'

import type { Theme } from 'vitepress'

export default define<Theme>({
  NotFound,
  Layout: VPApp,
  enhanceApp: ({ app }) => {
    app.use(ElementPlus)

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
})
```
