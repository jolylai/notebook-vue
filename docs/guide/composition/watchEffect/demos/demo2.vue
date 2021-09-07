<template>
  <div id="watchEffectFlush" ref="countRef">{{ count }}</div>
  <button @click="increase">Increase</button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
const countRef = ref()
const count = ref(0)

const increase = () => {
  count.value++
}

watchEffect(() => {
  count.value
  console.log(document.getElementById('watchEffectFlush'))
})

watchEffect(
  () => {
    count.value
    console.log(document.getElementById('watchEffectFlush'))
  },
  {
    flush: 'post'
  }
)
</script>
