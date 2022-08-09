# 快速开始

## 安装 vitepress

```shell
pnpm add --dev vitepress@latest
```

## 创建首页

```shell
mkdir docs && echo '# Hello VitePress' > docs/index.md
```

```markdown
---
layout: home

title: Pomelo Plus
titleTemplate: Vite & Vue Powered Static Site Generator

hero:
  name: Pomelo Plus
  text: Vite & Vue Powered Static Site Generator
  tagline: Simple, powerful, and performant. Meet the modern SSG framework you've always wanted.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/vuejs/vitepress

features:
  - title: "Vite: The DX that can't be beat"
    details: Feel the speed of Vite. Instant server start and lightning fast HMR that stays fast regardless of the app size.
  - title: Designed to be simplicity first
    details: With Markdown-centered content, it's built to help you focus on writing and deployed with minimum configuration.
  - title: Power of Vue meets Markdown
    details: Enhance your content with all the features of Vue in Markdown, while being able to customize your site with Vue.
  - title: Fully static yet still dynamic
    details: Go wild with true SSG + SPA architecture. Static on page load, but engage users with 100% interactivity from there.
---
```

## 启动脚本

添加脚本到 `package.json`

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  }
}
```

`vitepress dev docs` docs 为文档文件的根目录

## 路由配置

创建 `.vitepress/config.ts` 配置文件

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vitepress',
  description: 'Vitepress 学习笔记',
  lastUpdated: true,
  themeConfig: {
    nav: [
      {
        text: 'Vitepress',
        link: '/vitepress/getting-start',
        activeMatch: '^/vitepress/'
      }
    ],
    sidebar: {
      '/vitepress/': getVitepressSidebar()
    }
  },
  markdown: {
    lineNumbers: false
  }
})

function getVitepressSidebar() {
  return [
    {
      text: '基础',
      items: [{ text: '快速开始', link: '/vue3/basic/getting-start' }]
    }
  ]
}
```
