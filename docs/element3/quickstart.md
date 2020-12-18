---
title: 快速开始
---

## 技术栈

Ant Design + Vue 3.0 + TypeScript + Vue Router + VueX

- [Vue 3](https://vue3js.cn/)
- [antdv](https://2x.antdv.com//)
- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [ant-design-vue-pro](https://github.com/vueComponent/ant-design-vue-pro)
- [Hooks](https://github.com/vueComponent/use)
- [Pro Layout](https://github.com/vueComponent/pro-layout)
- [Vue Cli](https://cli.vuejs.org/zh/)

* Setup and development
* Architecture
* Languages and technologies
* Routing, layouts, and views
* State management
* Tests and mocking the API
* Linting and formatting
* Editor integration
* Building and deploying to production
* Troubleshooting

```
├── README.md
├── babel.config.js
├── config
│   ├── plugin.config.js
│   └── themePluginConfig.js
├── jest.config.js
├── jsconfig.json
├── package.json
├── postcss.config.js
├── public
│   ├── avatar2.jpg
│   ├── index.html
│   └── logo.png
├── src
│   ├── App.vue
│   ├── api
│   │   ├── login.js
│   │   └── manage.js
│   ├── assets
│   │   ├── background.svg
│   │   ├── icons
│   │   │   └── bx-analyse.svg
│   │   ├── logo.png
│   │   └── logo.svg
│   ├── components
│   │   ├── index.js
│   ├── plugins
│   │   ├── defaultSettings.js
│   │   └── router.config.js
│   ├── core
│   │   ├── bootstrap.js
│   │   ├── directives
│   │   │   └── action.js
│   │   ├── icons.js
│   │   ├── lazy_use.js
│   │   └── use.js
│   ├── global.less
│   ├── layouts
│   │   ├── BasicLayout.less
│   │   ├── BasicLayout.vue
│   │   ├── BlankLayout.vue
│   │   ├── PageView.vue
│   │   ├── RouteView.vue
│   │   ├── UserLayout.vue
│   │   └── index.js
│   ├── locales
│   │   ├── index.js
│   │   └── lang
│   │       ├── en-US.js
│   │       └── zh-CN.js
│   ├── main.js
│   ├── mock
│   │   ├── index.js
│   │   ├── services
│   │   │   ├── article.js
│   │   │   ├── auth.js
│   │   │   ├── manage.js
│   │   │   ├── other.js
│   │   │   ├── tagCloud.js
│   │   │   └── user.js
│   │   └── util.js
│   ├── permission.js
│   ├── router
│   │   ├── README.md
│   │   ├── generator-routers.js
│   │   └── index.js
│   ├── store
│   │   ├── app-mixin.js
│   │   ├── device-mixin.js
│   │   ├── getters.js
│   │   ├── i18n-mixin.js
│   │   ├── index.js
│   │   ├── modules
│   │   │   ├── app.js
│   │   │   ├── async-router.js
│   │   │   ├── permission.js
│   │   │   └── user.js
│   │   └── mutation-types.js
│   ├── utils
│   │   ├── axios.js
│   │   ├── domUtil.js
│   │   ├── filter.js
│   │   ├── helper
│   │   │   └── permission.js
│   │   ├── permissions.js
│   │   ├── request.js
│   │   ├── routeConvert.js
│   │   ├── screenLog.js
│   │   ├── util.js
│   │   └── utils.less
│   └── views
│       ├── 404.vue
│       ├── account
│       │   ├── center
│       │   │   ├── index.vue
│       │   │   └── page
│       │   │       ├── App.vue
│       │   │       ├── Article.vue
│       │   │       ├── Project.vue
│       │   │       └── index.js
│       │   └── settings
│       │       ├── AvatarModal.vue
│       │       ├── BaseSetting.vue
│       │       ├── Binding.vue
│       │       ├── Custom.vue
│       │       ├── Index.vue
│       │       ├── Notification.vue
│       │       └── Security.vue
│       ├── dashboard
│       │   ├── Analysis.vue
│       │   ├── Monitor.vue
│       │   ├── TestWork.vue
│       │   ├── Workplace.less
│       │   └── Workplace.vue
│       ├── exception
│       │   ├── 403.vue
│       │   ├── 404.vue
│       │   └── 500.vue
│       ├── form
│       │   ├── advancedForm
│       │   │   ├── AdvancedForm.vue
│       │   │   ├── RepositoryForm.vue
│       │   │   └── TaskForm.vue
│       │   ├── basicForm
│       │   │   └── index.vue
│       │   └── stepForm
│       │       ├── Step1.vue
│       │       ├── Step2.vue
│       │       ├── Step3.vue
│       │       └── StepForm.vue
│       ├── list
│       │   ├── BasicList.vue
│       │   ├── CardList.vue
│       │   ├── QueryList.vue
│       │   ├── TableList.vue
│       │   ├── components
│       │   │   └── Info.vue
│       │   ├── modules
│       │   │   ├── CreateForm.vue
│       │   │   ├── StepByStepModal.vue
│       │   │   └── TaskForm.vue
│       │   ├── search
│       │   │   ├── Applications.vue
│       │   │   ├── Article.vue
│       │   │   ├── Projects.vue
│       │   │   ├── SearchLayout.vue
│       │   │   └── components
│       │   │       ├── CardInfo.vue
│       │   │       └── IconText.vue
│       │   └── table
│       │       ├── Edit.vue
│       │       └── List.vue
│       ├── other
│       │   ├── BigForm.vue
│       │   ├── IconSelectorView.vue
│       │   ├── PermissionList.vue
│       │   ├── RoleList.vue
│       │   ├── TableInnerEditList.vue
│       │   ├── TreeList.vue
│       │   ├── UserList.vue
│       │   └── modules
│       │       ├── OrgModal.vue
│       │       └── RoleModal.vue
│       ├── profile
│       │   ├── advanced
│       │   │   └── Advanced.vue
│       │   └── basic
│       │       └── index.vue
│       ├── result
│       │   ├── Error.vue
│       │   └── Success.vue
│       ├── role
│       │   └── RoleList.vue
│       └── user
│           ├── Login.vue
│           ├── Register.vue
│           └── RegisterResult.vue
├── tests
│   └── unit
├── vue.config.js
├── webstorm.config.js
└── yarn.lock
```

## Layout

- PageContainer
