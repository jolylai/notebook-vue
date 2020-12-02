---
title: VueX
---

> [Vuex](https://vuex.vuejs.org/zh/)

## 快速开始

Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是**响应式的**。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

安装 `vuex4.x`版本

```shell
yarn add vuex@next
```

创建`/src/store/index.js`

```js
import { createStore } from 'vuex'

const store = createStore({
  state,
  mutations,
  actions
})

export default store
```

在`/src/main.js` 中全局注入

```js
import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'

const app = createApp(App).use(store)

app.mount('#app')
```

## Getter

#### 定义派生状态

从 `store` 中的 `state` 中派生出一些状态（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

```js
import { createStore } from 'vuex'

const store = createStore({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id)
    }
  }
})
```

#### 访问

```js
export default {
  setup() {
    const store = useStore()

    // 通过属性访问
    const doneTodosCount = store.getters.doneTodosCount

    // 通过方法访问
    const todo = store.getters.getTodoById(2)

    return {
      doneTodosCount,
      todo
    }
  }
}
```

#### mapGetters 辅助函数

mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性

```js
import { computed }  from 'vue';
import { useStore } from 'vuex';

const module = 'myModule';

export default {
    setup() {
        const store = useStore();

        return {
            // getter
            one: computed(() => store.getters[`${module}/myStateVariable`],

            // state
            two: computed(() => store.state[module].myStateVariable,
        };
    },
};
```

## Action

Action 类似于 mutation，不同在于：

Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。
