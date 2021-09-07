# nextTick

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

## 异步渲染

获取异步渲染后的宽高

<script setup>
  import Demo1 from './demos/demo1.vue'
</script>

<demo1 />

<<< docs/api/nextTick/demos/demo1.vue
