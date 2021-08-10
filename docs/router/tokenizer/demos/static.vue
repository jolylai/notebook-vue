<template>
  <n-input-group>
    <n-input
      v-model:value="path"
      :style="{ width: '50%' }"
      @keypress.enter="onParsePath"
    />
    <n-button type="primary" ghost @click="onParsePath">解析</n-button>
  </n-input-group>
</template>

<script setup>
import { ref } from 'vue'
import { tokenizePath } from '../index'

const path = ref(location.pathname)

const onParsePath = () => {
  try {
    const tokens = tokenizePath(path.value)
    console.log('tokens: ', tokens)
  } catch (error) {
    console.log('error: ', error)
  }
}
</script>
