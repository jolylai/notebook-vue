# 事件

## v-on

监听事件，可以用 v-on 指令监听 DOM 事件来触发一些 javascript 代码。

用在普通元素上时，只能监听`原生 DOM 事件`。用在自定义元素组件上时，也可以监听子组件触发的`自定义事件`。

### 方法处理器

在监听原生 DOM 事件时，方法以事件为唯一的参数。

```html
<button v-on:click="doThis"></button>
```

缩写

```html
<button @click="doThis"></button>
```

如果使用内联语句，语句可以访问一个 `$event` 属性：`v-on:click="handle('ok', $event)"`。

```html
<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>
```

### 动态事件(2.6.0+)

```html
<button v-on:[event]="doThis"></button>

<!-- 动态事件缩写 -->
<button @[event]="doThis"></button>
```

### 修饰符

```html
<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>

<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>

<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>

<!--  串联修饰符 -->
<button @click.stop.prevent="doThis"></button>

<!-- 键修饰符，键别名 -->
<input @keyup.enter="onEnter" />

<!-- 键修饰符，键代码 -->
<input @keyup.13="onEnter" />
```

修饰符：

- `.stop` - 调用 event.stopPropagation()。
- `.prevent` - 调用 event.preventDefault()。
- `.capture` - 添加事件侦听器时使用 capture 模式。
- `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
- `.native` - 监听组件根元素的原生事件。
- `.once` - 只触发一次回调。
- `.left` - (2.2.0) 只当点击鼠标左键时触发。
- `.right` - (2.2.0) 只当点击鼠标右键时触发。
- `.middle` - (2.2.0) 只当点击鼠标中键时触发。
- `.passive` - (2.3.0) 以 { passive: true } 模式添加侦听器

### 对象语法 (2.4.0+)

```html
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
```
