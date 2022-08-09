## 前言

立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

<!-- <script setup>
  import Demo1 from './demos/demo1.vue'
  import Demo2 from './demos/demo2.vue'
</script> -->

## 停止侦听

当 watchEffect 在组件的 setup() 函数或生命周期钩子被调用时，侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。

显式调用返回值以停止侦听

```js
const stop = watchEffect(() => {
  /* ... */
})

// later
stop()
```

## 清除副作用

有时副作用函数会执行一些异步的副作用,

- 副作用即将重新执行时
- 侦听器被停止 (如果在 setup() 或生命周期钩子函数中使用了 watchEffect，则在组件卸载时)

<!-- <demo1 /> -->

<!-- <<< @/guide/composition/watchEffect/demos/demo1.vue -->

## 副作用刷新时机

<!-- <demo2 /> -->

<!-- <<< @/guide/composition/watchEffect/demos/demo2.vue -->
