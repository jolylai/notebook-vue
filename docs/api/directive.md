# Vue.directive

## 钩子函数

### 生命周期

```js
Vue.directive("color", {
  bind() {},
  inserted() {},
  update() {},
  componentUpdated() {},
  unbind() {}
});
```

::: tip

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

- `update`：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。

- `componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

- `unbind`：只调用一次，指令与元素解绑时调用。

:::

## 参数

HTML 与 JS 之间的通讯

```html
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
```

```js
Vue.directive("demo", {
  bind: function(el, binding, vnode) {}
});
```

在 binding 中拿到的 HTML 中对应的传参的表达式

```
v-name:arg.modifiers=expression
```

其中 value 为 expression 执行的结果

- el：指令所绑定的元素，可以用来直接操作 DOM 。
- binding：一个对象，包含以下属性：
  - name：指令名，不包括 v- 前缀。
  - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
- vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
- oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

### 动态指令参数(arg)

```html
<p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
```

```js
Vue.directive("pin", {
  bind: function(el, binding, vnode) {
    el.style.position = "fixed";
    // binding.arg 获取动态指令参数
    var s = binding.arg == "left" ? "left" : "top";
    el.style[s] = binding.value + "px";
  }
});

new Vue({
  el: "#dynamicexample",
  data: function() {
    return {
      direction: "left"
    };
  }
});
```

### 对象字面量(value)

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
Vue.directive("demo", function(el, binding) {
  console.log(binding.value.color); // => "white"
  console.log(binding.value.text); // => "hello!"
});
```

## 函数简写

在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子。

```js
Vue.directive("color", function(el, binding, vnode) {
  el.style = `color: ${binding.value}`;
});
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <title>自定义指令</title>
  </head>
  <body>
    <div id="app">
      <div v-color="color">Color</div>
    </div>
    <script type="text/javascript">
      Vue.directive("color", function(el, binding, vnode) {
        el.style = `color: ${binding.value}`;
      });
      const app = new Vue({
        el: "#app",
        data: {
          color: "red"
        }
      });
    </script>
  </body>
</html>
```
