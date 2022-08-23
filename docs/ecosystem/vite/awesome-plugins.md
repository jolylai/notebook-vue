# 常用插件

## 组件自动导入

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

## API 自动导入

安装 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

```shell
pnpm add unplugin-auto-import -D
```

Vite 项目中自动导入 `vue` 和 `vue-router` 的 API

```ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router']
    })
  ]
})
```

导入三方库 API

```ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        {
          '@vueuse/core': [
            // named imports
            // import { useMouse } from '@vueuse/core',
            'useMouse',
            // alias
            // import { useFetch as useMyFetch } from '@vueuse/core',
            ['useFetch', 'useMyFetch']
          ],
          axios: [
            // default imports
            // import { default as axios } from 'axios',
            ['default', 'axios']
          ]
        }
      ]
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
