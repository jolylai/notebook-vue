<template>
  <div>{{ count }}</div>
  <button @click="increase">Increase</button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
const count = ref(0)

const increase = () => {
  count.value++
}

watchEffect(onInvalidate => {
  console.log(count.value)
  onInvalidate(() => {
    console.log('onInvalidate')
  })
})
</script>
