## 在组件上使用

你可以在对象中传入更多字段来动态切换多个 class。此外，:class 指令也可以与普通的 class attribute 共存。当有如下模板：

```vue
<template>
  <button class="el-button" :class="buttonClass">
</template>

<script setup>
  import { computed, defineProps, onMounted, ref } from 'vue'

  const props = defineProps({
    round: { type: Boolean, default: false}
  })

  const buttonClass = {
    'el-button-round': props.round
  }
</script>
```

## 数组语法

```vue
<template>
  <span :class="avatarClass"></span>
</template>

<script setup>
  import { computed, defineProps, onMounted, ref } from 'vue'

  const props = defineProps({
    shape: { type: Boolean, default: false}
    size: { type: Number, default: false}
  })

const avatarClass = computed(() => {
  const { size, shape } = props

  const classList = ['po-avatar']

  if (size && typeof size === 'string') {
    classList.push(`po-avatar-${size}`)
  }

  if (shape) {
    classList.push(`po-avatar-${shape}`)
  }

  return classList
})
</script>
```
