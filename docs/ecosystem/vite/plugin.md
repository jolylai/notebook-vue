## 通用钩子

![image.png](https://cdn.nlark.com/yuque/0/2022/png/226152/1651037959714-d0785697-9e1c-430b-a7df-2a69e97cf6e0.png#clientId=uc74539f4-510b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=442&id=u71c5e746&margin=%5Bobject%20Object%5D&name=image.png&originHeight=884&originWidth=1670&originalType=binary&ratio=1&rotation=0&showTitle=false&size=145150&status=done&style=none&taskId=ue58f0719-57de-4dea-bd4f-beac1375ae7&title=&width=835)
![](https://cdn.nlark.com/yuque/0/2022/jpeg/226152/1644544403868-c4380eaf-2928-4392-bd22-71dbb5b27942.jpeg)

```javascript
export default function vitePlugin() {
  // 定义vite插件唯一id
  const virtualFileId = '@my-virtual-plugin'
  // 返回插件对象
  return {
    // 必须的，将会显示在 warning 和 error 中
    name: 'vite-plugin',

    // *以下钩子函数按照实际执行顺序排列*

    /**
     * config 可以在被解析之前修改 Vite 配置
     * Vite独有钩子
     * https://cn.vitejs.dev/guide/api-plugin.html#config
     * @param config vite配置信息
     * @param env 描述配置环境的变量
     */
    config: (config, env) => ({}),

    /**
     * configResolved 解析 Vite 配置后调用,使用这个钩子读取和存储最终解析的配置
     * Vite独有钩子
     * https://cn.vitejs.dev/guide/api-plugin.html#configresolved
     * @param config vite配置信息
     */
    configResolved: config => ({}),

    /**
     * options 替换或操作传递给rollup.rollup()的选项
     * 通用钩子
     * https://rollupjs.org/guide/en/#options
     * @param options rollup配置信息
     */
    options: options => ({}),

    /**
     * configureServer 用于配置开发服务器
     * Vite独有钩子
     * https://cn.vitejs.dev/guide/api-plugin.html#configureserver
     * @param server ViteDevServer配置信息
     * https://cn.vitejs.dev/guide/api-javascript.html#vitedevserver
     */
    configureServer: server => ({}),

    /**
     * buildStart 在每个rollup.rollup()构建时被调用
     * 通用钩子
     * https://rollupjs.org/guide/en/#buildstart
     * @param options rollup配置信息
     */
    buildStart: options => ({}),

    /**
     * 此时 Vite dev server is running
     */

    /**
     * transformIndexHtml 转换 index.html 的专用钩子
     * Vite独有钩子
     * https://cn.vitejs.dev/guide/api-plugin.html#transformindexhtml
     * @param html html字符串
     * @param ctx 转换上下文; 在开发期间会额外暴露ViteDevServer实例; 在构建期间会额外暴露Rollup输出的包
     */
    transformIndexHtml: (html, ctx) => ({}),

    /**
     * resolveId 用户自定义解析器
     * 通用钩子 会在每个传入模块请求时被调用
     * https://rollupjs.org/guide/en/#resolveid
     * @param source 源导入者 例子: import { foo } from '../bar.js', '../bar.js' 为source
     * @param importer 导入者所在文件绝对路径
     */
    resolveId: (source, importer) => ({}),

    /**
     * load 用户自定义加载器
     * 通用钩子 会在每个传入模块请求时被调用
     * https://rollupjs.org/guide/en/#load
     * @param id 同resolveId source
     */
    load: id => ({}),

    /**
     * transform 可以用来转换单个模块
     * 通用钩子 会在每个传入模块请求时被调用
     * https://rollupjs.org/guide/en/#transform
     * @param code 模块代码
     * @param id 同resolveId source
     */
    transform: (code, id) => ({})
  }
}
```

### resolveId

## 插件配置

plugins 也可以接受将多个插件作为单个元素的预设。这对于使用多个插件实现的复杂特性（如框架集成）很有用。该数组将在内部被扁平化（flatten）。

```javascript
// vite.config.js
import vitePlugin from 'vite-plugin-feature'
import rollupPlugin from 'rollup-plugin-feature'

export default defineConfig({
  plugins: [vitePlugin(), rollupPlugin()]
})
```

## Vite 独有钩子

### config

```javascript
const vitePlugin
```

## 强制插件排序

为了与某些 Rollup 插件兼容，可能需要强制修改插件的执行顺序

一个 Vite 插件可以额外指定一个 enforce 属性来调整它的应用顺序。enforce 的值可以是 pre 或 post。解析后的插件将按照以下顺序排列：

- Alias
- 带有 enforce: 'pre' 的用户插件
- Vite 核心插件
- 没有 enforce 值的用户插件
- Vite 构建用的插件
- 带有 enforce: 'post' 的用户插件
- Vite 后置构建插件（最小化，manifest，报告）

## 按需应用

默认情况下插件在开发 (serve) 和生产 (build) 模式中都会调用。如果插件在服务或构建期间按需使用，请使用 apply 属性指明它们仅在 'build' 或 'serve' 模式时调用：

```javascript
import typescript2 from 'rollup-plugin-typescript2'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      ...typescript2(),
      apply: 'build'
    }
  ]
})
```

```typescript
const vitePluginVitepressDemo = (): PluginOption => {
  /** filter out files which aren't Markdown files */
  const filter = createFilter(/\.md$/)

  return {
    name: 'vite-plugin-vitepress-demo',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!filter(id)) return

      try {
        return transformCode(code, id)
      } catch (error) {
        this.error(error)
      }
    }
  }
}

export default vitePluginVitepressDemo
```

## 文件过滤

```shell
pnpm add @rollup/pluginutils -D
```

```ts
import { createFilter } from '@rollup/pluginutils'

function VitePluginMarkdown(userOptions: Options = {}): Plugin {
  /** filter out files which aren't Markdown files */
  const filter = createFilter(
    userOptions.include || /\.md$/,
    userOptions.exclude
  )

  return {
    name: 'vite-plugin-md',
    transform(code: string, id: string) {
      if (!filter(id)) return

      // 仅对 md 文件进行处理
    }
  }
}
```
