---
title: 开发规范
---

## 项目目录结构

## 文件命名规范

[风格指南](https://cn.vuejs.org/v2/style-guide/index.html)

#### Component

除了 `index.vue`所有的 `Component` 文件都是以大写开头 (PascalCase)，这也是官方推荐的。

- `@/src/components/BackToTop/index.vue`
- `@/src/components/Charts/Line.vue`
- `@/src/views/example/components/Button.vue`

#### JS 文件

所有的.js 文件都遵循横线连接 (kebab-case)。

- `@/src/utils/open-window.js`
- `@/src/views/svg-icons/require-icons.js`
- `@/src/components/MarkdownEditor/default-options.js`

#### Views

在 views 文件下，代表路由的`.vue` 文件都使用横线连接 (kebab-case)，代表路由的文件夹也是使用同样的规则。

- `@/src/views/svg-icons/index.vue`
- `@/src/views/svg-icons/require-icons.js`

使用横线连接 (kebab-case)来命名 views 主要是出于以下几个考虑。

横线连接 (kebab-case) 也是官方推荐的命名规范之一 文档
views 下的.vue 文件代表的是一个路由，所以它需要和 component 进行区分(component 都是大写开头)
页面的 url 也都是横线连接的，比如https://www.xxx.admin/export-excel，所以路由对应的view应该要保持统一
没有大小写敏感问题
