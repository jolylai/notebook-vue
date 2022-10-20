---
title: 快速开始
---

## 目录结构

```
.
├── compiler-core // 顾名思义，核心中的核心，抽象语法树和渲染桥接实现
├── compiler-dom // Dom的实现
├── compiler-sfc // Vue单文件组件(.vue)的实现
├── compiler-ssr
├── global.d.ts
├── reactivity
├── runtime-core
├── runtime-dom
├── runtime-test
├── server-renderer // 服务端渲染实现
├── shared  // package 之间共享的工具库
├── size-check
├── template-explorer
└── vue
```

## 顺序

通过结构我们可以看到 package 中最重要的模块有 5 个，分别为

- compiler-core
- compiler-dom
- runtime-core
- runtime-dom
- reactivity

## Runtime 跟 CompileTime

compile time 我们可以理解为程序编绎时，是指我们写好的源代码在被编译成为目标文件这段时间，但我们可以通俗的看成是我们写好的源代码在被转换成为最终可执行的文件这段时间，在这里可以理解为我们将.vue 文件编绎成浏览器能识别的.html 文件的一些工作，

run time 可以理解为程序运行时，即是程序被编译了之后，打开程序并运行它直到程序关闭的这段时间的系列处理

#### Reference

- [Vue3](https://vue3js.cn/start/)
- [Vue2](https://vue-js.com/learn-vue/start/#_1-%E5%89%8D%E8%A8%80)
- [snabbdom](https://github.com/snabbdom/snabbdom)
- [Github vue2](https://github.com/vuejs/vue/blob/dev/src/compiler/parser/index.js)
- [Github vue3](https://github.com/vuejs/vue-next/blob/master/packages/compiler-core/src/parse.ts)
