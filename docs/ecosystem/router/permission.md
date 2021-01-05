---
title: 权限验证
---

## 前言

不同角色的用户会登录后会有不同的权限，不同的权限对应着不同的路由，根据不同的权限**异步生成**侧边栏

1. **登录**：当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个 `token`
2. **获取用户信息**：拿到 `token` 之后，使用 `token` 获取用户的详细信息（如用户权限，用户名等）。
3. **权限验证**：通过获取的用户权限信息，生成对应权限的路由
4. **动态挂载路由**：通过 `router.addRoutes` 动态挂载这些路由。

上述所有的数据和操作都是通过 vuex 全局管理控制的。(补充说明：刷新页面后 vuex 的内容也会丢失，所以需要重复上述的那些操作)

## 登录

用户登录成功后，获取到 `token`,需要将这个 `token` 做持久化存储， 保证刷新页面后能记住用户登录状态不用再次重新登录， [js-cookie](https://github.com/js-cookie/js-cookie) 可很好的做到这点

安装 `js-cookie`

```bash
yarn add js-cookie
```

新建`src/utils/auth.js`文件，做些简单的封装

```js
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
```

```js
import { login } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

## 获取用户信息

```js
import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // get token from cookie

// 白名单
const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  // 确定用户是否已经登录
  const hasToken = getToken()

  // 未登录 重定向到登录页面
  if (!hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      //   访问白名单内个路由直接跳转
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
    return
  }

  //   如果已经登录重定向到首页
  if (to.path === '/login') {
    next({ path: '/' })
  }

  try {
    // 获取用户信息
    const { roles } = await store.dispatch('user/getInfo')

    // generate accessible routes map based on roles
    const accessRoutes = await store.dispatch(
      'permission/generateRoutes',
      roles
    )

    // 动态添加可访问路由
    router.addRoutes(accessRoutes)

    // hack method to ensure that addRoutes is complete
    // set the replace: true, so the navigation will not leave a history record
    next({ ...to, replace: true })
  } catch (error) {
    // remove token and go to login page to re-login
    await store.dispatch('user/resetToken')
    Message.error(error || 'Has Error')
    next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
})
```

这里需要注意以下几点

- 未登录时是可以访问登录页面，登录后访问登录页需要从定向到首页

## Layout

布局暂时分为三大类：

- `constantRoutes`：不需要动态判断权限的路由，如登录页或通用页面。
- `asyncRoutes`：基于 BasicLayout，通常需要登录或权限认证的路由。
- `errorPage`：例如 404。

通过获取当前用户的权限去比对路由表，生成当前用户具的权限可访问的路由表，通过 router.addRoutes 动态挂载到 router 上。

1. 判断页面是否需要登陆状态，需要则跳转到 /user/login
2. 本地存储中不存在 token 则跳转到 /user/login
3. 如果存在 token，用户信息不存在，自动调用 vuex '/system/user/getInfo'

在路由中，集成了权限验证的功能，需要为页面增加权限时，在 meta 下添加相应的 key：

```js
import router from '@/router'
import store from '@/store'
import storage from 'store'
import util from '@/libs/utils'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const loginRoutePath = '/user/login'
const defaultRoutePath = '/home'

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 进度条
  NProgress.start()
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some(r => r.meta.auth)) {
    // 是否存有token作为验证是否登录的条件
    const token = storage.get('ACCESS_TOKEN')
    if (token && token !== 'undefined') {
      // 是否处于登录页面
      if (to.path === loginRoutePath) {
        next({ path: defaultRoutePath })
        // 查询是否储存用户信息
      } else if (Object.keys(store.state.system.user.info).length === 0) {
        store.dispatch('system/user/getInfo').then(() => {
          next()
        })
      } else {
        next()
      }
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
    }
  } else {
    // 不需要身份校验 直接通过
    next()
  }
})

router.afterEach(to => {
  // 进度条
  NProgress.done()
  util.title(to.meta.title)
})
```
