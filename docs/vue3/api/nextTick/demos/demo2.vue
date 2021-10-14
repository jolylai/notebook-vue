<template>
  <div ref="countRef">{{ count }}</div>
  <button @click="increase">increase</button>
</template>

<script setup>
import { ref, onUpdated } from 'vue'

const countRef = ref()
const count = ref(0)

const increase = () => {
  count.value++

  // console.log('instance: ', countRef.value.innerText)

  for (let i = 0; i < 1000; i++) {
    count.value = i
  }
}

onUpdated(() => {
  console.log('update')
})
</script>
