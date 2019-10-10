# Vue.extend

使用基础 Vue 构造器，创建一个“子类”。

> `data` 选项是特例，需要注意 - 在 `Vue.extend()` 中它必须是函数

```html
<div id="app"></div>
```

```js
const Name = Vue.extend({
  template: "<div>{{name}}</div>",
  data: function() {
    return {
      name: "jack"
    };
  }
});
new Name().$mount("#app");
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <title>Extend</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript">
      const Name = Vue.extend({
        template: "<div>{{name}}</div>",
        data: function() {
          return {
            name: "jack"
          };
        }
      });
      new Name().$mount("#app");
    </script>
  </body>
</html>
```
