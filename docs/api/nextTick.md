# Vue.nextTick

Vue 在更新 DOM 时是异步执行的。DOM 节点更新成功后调用

```js
const vm = new Vue({
  el: "#app",
  data: {
    message: "Hello"
  },
  methods: {
    updateMessage: async function() {
      this.message = "已更新";
      console.log(this.$el.textContent); // => '未更新'
      await this.$nextTick();
      console.log(this.$el.textContent); // => '已更新'
    }
  }
});

// 更新数据
vm.message = "Hello World";

Vue.nextTick(function() {
  // DOM 更新了
  console.log("vm.$el: ", vm.$el);
});

Vue.nextTick().then(function() {
  // DOM 更新了
});

vm.$nextTick(function() {
  // DOM 更新了
  console.log("vm.$nextTick: ", vm.$el);
});

vm.$nextTick().then(function() {
  // DOM 更新了
});
```
