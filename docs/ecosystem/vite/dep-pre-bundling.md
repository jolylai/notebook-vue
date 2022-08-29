# 依赖预构建

#### CommonJS 和 UMD 兼容性

开发阶段中，Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。

#### 性能

Vite 将有许多内部模块的 ESM 依赖关系转换为单个模块，以提高后续页面加载性能。例如将 lodash 中的小模块打包成一个大的文件

## 缓存

#### 文件系统缓存

Vite 会将预构建的依赖缓存到 `node_modules/.vite`。它根据几个源来决定是否需要重新运行预构建步骤:

- package.json 中的 dependencies 列表
- 包管理器的 lockfile，例如 package-lock.json, yarn.lock，或者 pnpm-lock.yaml
- 可能在 vite.config.js 相关字段中配置过的

只有在上述其中一项发生更改时，才需要重新运行预构建。

如果出于某些原因，你想要强制 Vite 重新构建依赖，你可以用 --force 命令行选项启动开发服务器，或者手动删除 node_modules/.vite 目录。
