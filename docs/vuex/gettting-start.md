---
title: 快速开始
order: 1
---

安装

```shell
yarn add vuex
```

创建`/src/store/index.js`

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({});

export default store;
```

在`/src/main.js` 中全局注入

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
```
