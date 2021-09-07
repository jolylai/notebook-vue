## 前言

- 懒执行副作用；
- 更具体地说明什么状态应该触发侦听器重新运行；
- 访问侦听状态变化前后的值。

## 侦听单一源

侦听一个 getter

```js
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)
```

直接侦听一个 ref

```js
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

## 侦听多个源

侦听多个 ref

```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```

侦听多个 getter

```js
const state = reactive({ foo: 0, bar: 0 })

watch(
  () => [state.foo, state.bar],
  ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  }
)
```
