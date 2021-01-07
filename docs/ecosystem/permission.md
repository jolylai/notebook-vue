---
title: 权限篇
---

## 前言

前端会维护一份路由表，路由表中的路由大致可以分为以下三种

- `constantRoutes`：不需要动态判断权限的路由，如登录页或通用页面。
- `asyncRoutes`：基于 BasicLayout，通常需要登录或权限认证的路由。
- `errorPage`：例如 404。

通过获取当前用户的权限去比对路由表，动态生成当前用户具有权限可访问的路由表，通过 `router.addRoutes` 动态挂载到 `router` 上，并动态生成侧边栏。

## 整体流程

1. **登录**：当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个 `token`
2. **获取用户信息**：使用 `token` 获取用户的详细信息（如用户权限，用户名等）。
3. **生成权限路由**：通过获取的用户权限信息，生成对应权限的路由表。
4. **动态挂载路由**：通过 `router.addRoutes` 动态挂载这些路由。
5. **生成侧边栏**：通过权限路由表生成对应的侧边栏

## 登录获取 token

用户登录成功后，获取到 `token`,需要将这个 `token` 做持久化存储， 保证刷新页面后能记住用户登录状态不用再次重新登录， [js-cookie](https://github.com/js-cookie/js-cookie) 可很好的做到这点

安装 `js-cookie`

```bash
yarn add js-cookie
```

新建`src/utils/auth.js`文件，做些简单的封装,便于调用

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

登录获取 `token`, `src/store/modules/user.js`

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
  // 用户登录
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

将用户名和密码传递给登录接口（出于安全考虑，还需要将密码进行 md5 加密再传输），获取到 `token` 并存放到 `state` 中，同时使用封装的`setToken(data.token)`将 `token` 持久化存储，刷新浏览器时不会丢失 `token`

## 获取用户信息

获取到 `token` 之后，使用 `token` 获取用户的详细信息,如: 用户权限，用户名等。

```js
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { roles, name, avatar, introduction } = data

          // roles 必须是非空数组
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 删除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}
```

## 生成路由

获取到了用户权限，比对用户权限和路由元信息，判断用户是否拥有路由权限（可以根据公司当前的权限数据结构进行设计）

创建`store/permission.js`

```js
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
```

递归过滤掉没有权限的路由

```js
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
```

获取到用户权限后调用 `store.dispatch('permission/generateRoutes', roles);` 生成权限路由

```js
import { asyncRoutes, constantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
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

## 路由守卫

[permission](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/permission.js)

通过是否有 token 判断当前用户是否已经登录，

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
    // 接口没有返回权限信息
    // 删除 token 跳转到登录页重新登录
    await store.dispatch('user/resetToken')
    Message.error(error || 'Has Error')
    next(`/login?redirect=${to.path}`)
  }
})
```

这里需要注意以下几点

- 未登录时是可以访问登录页面，登录后访问登录页需要从定向到首页
- 用户接口需要分会不为空的权限信息数组，若果返回空则清空 token 重新登录
- 白名单里的页面无需登录就可以访问

#### 参考文档

- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.cn/post/6844903478880370701#heading-5)
- [新搭建一个 Vue 项目后，我有了这 15 点思考](https://mp.weixin.qq.com/s/LKaHJX1cwLlkzU7qQ7kkwg)
