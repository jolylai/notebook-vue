---
title: ref
---

## 模板 Ref

```vue
<template>
  <div ref="root"></div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const root = ref(null)

    onMounted(() => {
      // 在渲染完成后, 这个 div DOM 会被赋值给 root ref 对象
      console.log(root.value) // <div/>
    })

    return {
      root
    }
  }
}
</script>
```
