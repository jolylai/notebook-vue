<template>
  <n-button @click="onFetchUserList" :loading="loading">获取用户列表</n-button>
  <ul ref="listRef">
    <li v-for="user in userList">
      {{ user.email }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import axios from 'axios'

type User = {
  email: string
}

const userList = ref<User[]>([])
const listRef = ref()
const loading = ref(false)

const fetchUser = async (params = { results: 10 }) => {
  loading.value = true
  const response = await axios('https://randomuser.me/api', {
    method: 'get',
    params
  })

  loading.value = false

  return response.data.results
}

const onFetchUserList = async () => {
  userList.value = await fetchUser()

  console.log('nextTick: before', listRef.value.clientHeight)
  await nextTick()
  console.log('nextTick: after', listRef.value.clientHeight)
}
</script>
