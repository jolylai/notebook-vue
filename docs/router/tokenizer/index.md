## 路径解析

[路由的匹配语法](https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html)

- 静态路由
- 自定义参数
- 可重复的参数
- 可选参数

token 类型

```js
export const TokenType = {
  Static: 0,
  Param: 1,
  Group: 2
}
```

## 静态路由

<static />

<script setup>
  import Static from './demos/static.vue'
</script>

<!-- <<< @/router/tokenizer/index.js -->
