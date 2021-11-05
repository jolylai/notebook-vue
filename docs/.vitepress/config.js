const vue3 = [
  {
    text: '基础',
    collapsable: false,
    children: [
      { text: '快速开始', link: '/vue3/basic/getting-start' },
      {
        text: 'Class 与 Style 绑定',
        link: '/vue3/basic/class-and-style'
      }
    ]
  },
  {
    text: '深入组件',
    collapsable: false,
    children: [
      { text: 'Registration', link: '/vue3/component/registration' },
      { text: 'Props', link: '/vue3/component/props' },
      { text: 'Lifecycle', link: '/vue3/component/lifecycle' },
      { text: 'Data', link: '/vue3/component/data' },
      { text: 'Slot', link: '/vue3/component/slot' },
      { text: 'Instance', link: '/vue3/component/instance' },
      { text: '异步组件', link: '/vue3/component/async' }
    ]
  },
  {
    text: '高级语法',
    collapsable: false,
    children: [
      { text: 'Teleport', link: '/vue3/advance/teleport' },
      { text: 'Mixin', link: '/vue3/advance/mixin' },
      { text: 'Directive', link: '/vue3/advance/directive' },
      { text: 'Render', link: '/vue3/advance/render/index' },
      { text: 'Plugin', link: '/vue3/advance/plugin' }
    ]
  },
  {
    text: 'Composition API',
    collapsable: false,
    children: [
      { text: 'Reactive', link: '/vue3/composition/reactive/' },
      { text: 'Setup', link: '/vue3/composition/setup/' },
      { text: 'Composition', link: '/vue3/composition/ref/' },
      { text: 'Computed', link: '/vue3/composition/computed/' },
      { text: 'Watch', link: '/vue3/composition/watch/' },
      { text: 'WatchEffect', link: '/vue3/composition/watchEffect/' },
      { text: 'Provide', link: '/vue3/composition/provide&inject/' }
    ]
  },
  {
    text: 'API',
    collapsable: false,
    children: [{ text: 'nextTick', link: '/vue3/api/nextTick/' }]
  }
]

const core = [
  {
    text: '阅前必读',
    collapsable: false,
    children: [{ text: '快速开始', link: '/core/getting-start' }]
  },
  // {
  //   title: '数据驱动',
  //   collapsable: false,
  //   children: ['/core/reactivity/reactive']
  // },
  // {
  //   title: '模板编译',
  //   collapsable: false,
  //   children: ['/core/template/overview', '/core/template/slot']
  // },
  {
    text: '虚拟DOM',
    collapsable: false,
    children: [
      { text: 'Virtual Node', link: '/core/virtual-dom/vnode' },
      { text: 'Diff', link: '/core/virtual-dom/diff' }
    ]
  }
  // {
  //   title: '实例方法',
  //   collapsable: false,
  //   children: ['/core/ecology/vuex']
  // },
  // {
  //   title: '全局API',
  //   collapsable: false,
  //   children: ['/core/ecology/vuex']
  // },
  // {
  //   title: '指令',
  //   collapsable: false,
  //   children: ['/core/ecology/vuex']
  // }
]

const router = [
  {
    text: '配置器',
    collapsable: false,
    children: [
      { text: 'Token', link: '/router/tokenizer/' },
      { text: 'Router Matcher', link: '/router/matcher/' }
    ]
  }
]

module.exports = {
  title: 'Vue',
  description: 'Vue 学习笔记',
  themeConfig: {
    repo: 'jolylai/notebook-vue',
    editLinks: true,
    smoothScroll: true,
    editLinkText: 'Edit this on GitHub!',
    lastUpdated: 'Last updated',
    docsDir: 'docs',
    sidebarDepth: 2,
    nav: [
      {
        text: 'Vue3',
        link: '/vue3/basic/getting-start',
        activeMatch: '^/vue3/'
      },
      {
        text: 'Vue Router',
        link: '/router/tokenizer',
        activeMatch: '^/vue-route/'
      },
      {
        text: 'Vue 源码',
        link: '/core/virtual-dom/vnode',
        activeMatch: '^/core/'
      }
    ],
    sidebar: {
      '/vue3/': vue3,
      '/router/': router,
      '/core/': core
    }
  },
  markdown: {
    lineNumbers: false
  }
}
