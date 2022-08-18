# nextTick

当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个 "tick" 才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。

<demo2 />

<<< @/vue3/api/nextTick/demos/demo2.vue

将回调推迟到下一个 DOM 更新周期之后执行。在更改了一些数据以等待 DOM 更新后，浏览器重新渲染之前立即使用它。

Vue 在更新 DOM 时是异步执行的。DOM 节点更新成功后调用

```js
import { createApp, nextTick } from 'vue'

const app = createApp({
  setup() {
    const message = ref('Hello!')
    const changeMessage = async newMessage => {
      message.value = newMessage
      await nextTick()
      console.log('Now DOM is updated')
    }
  }
})
```

## 实现原理

<!-- https://github.com/vuejs/vue-next/blob/36ae23d27e2d9d7cfb6d7244539952bf57561e44/packages/runtime-core/src/scheduler.ts -->

```ts
export function nextTick<T = void>(
  this: T,
  fn?: (this: T) => void
): Promise<void> {
  const p = currentFlushPromise || resolvedPromise
  return fn ? p.then(this ? fn.bind(this) : fn) : p
}
```

## 异步渲染

获取异步渲染后的宽高

<script setup>
  import Demo1 from './demos/demo1.vue'
  import Demo2 from './demos/demo2.vue'
</script>

<demo1 />

<<< @/vue3/api/nextTick/demos/demo1.vue
