# 生命周期

## 生命周期图

![lifecycle](../.vuepress/images/lifecycle.png)

## 生命周期钩子

### beforeCreate

在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

### created

在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，\$el 属性目前不可见。

### beforeMount

在挂载开始之前被调用：相关的 render 函数首次被调用。
::: tip
该钩子在服务器端渲染期间不被调用。
:::

### mounted

::: tip
该钩子在服务器端渲染期间不被调用。
:::

el 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 `vm.$el` 也在文档内。

注意 **`mounted` 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 `vm.$nextTick` 替换掉 `mounted`**

```js
mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
  })
}
```

### beforeUpdate

数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。

::: tip
该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。
:::

### updated

由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。

注意 **`updated` 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 `vm.$nextTick` 替换掉 `updated`：**

```js
updated: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been re-rendered
  })
}
```

::: tip
该钩子在服务器端渲染期间不被调用。
:::

### activated

keep-alive 组件激活时调用。
::: tip
该钩子在服务器端渲染期间不被调用。
:::

### deactivated

keep-alive 组件停用时调用。
::: tip
该钩子在服务器端渲染期间不被调用。
:::

### beforeDestroy

实例销毁之前调用。在这一步，实例仍然完全可用。

::: tip
该钩子在服务器端渲染期间不被调用。
:::

### destroyed

Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

::: tip
该钩子在服务器端渲染期间不被调用。
:::

## 完整生命周期钩子

```js
var app = new Vue({
  el: "#app",
  data: {},
  methods: {},
  beforeCreate: function() {
    console.log("1-beforeCreate 初始化之后");
  },
  created: function() {
    console.log("2-created 创建完成");
  },
  beforeMount: function() {
    console.log("3-beforeMount 挂载之前");
  },
  mounted: function() {
    console.log("4-mounted 被创建");
  },
  beforeUpdate: function() {
    console.log("5-beforeUpdate 数据更新前");
  },
  updated: function() {
    console.log("6-updated 被更新后");
  },
  activated: function() {
    console.log("7-activated");
  },
  deactivated: function() {
    console.log("8-deactivated");
  },
  beforeDestroy: function() {
    console.log("9-beforeDestroy 销毁之前");
  },
  destroyed: function() {
    console.log("10-destroyed 销毁之后");
  }
});
```
