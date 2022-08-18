# 常用插件

## 自动导入

#### 组件自动导入

```shell
pnpm add unplugin-vue-components -D
```

```ts
import { defineConfig } from 'vite'

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ]
})
```

## Uno CSS

```shell
pnpm add unocss -D
```

#### tailwind

```shell
pnpm add -D @unocss/preset-wind
```

```ts
import presetWind from '@unocss/preset-wind'

Unocss({
  presets: [presetWind()]
})
```

Tailwind 会自动获取根目录下 `tailwind.config.js` 作为配置文件

```js
module.exports = {
  content: ['./src/**/*.{vue,html,js}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

在 ESM 项目中，Tailwind 在 `v2.0.3` 版本之后会自动获取 `tailwind.config.cjs` 作为配置文件

VS Code 中安装 Tailwind CSS IntelliSense 插件
