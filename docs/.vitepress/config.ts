import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue',
  description: 'Vue 学习笔记',
  lastUpdated: true,
  themeConfig: {
    nav: [
      {
        text: 'Vue3',
        link: '/vue3/basic/getting-start',
        activeMatch: '^/vue3/'
      },
      {
        text: 'Vue 源码',
        link: '/core/reactivity/reactive',
        activeMatch: '^/core/'
      },
      {
        text: '生态系统',
        link: '/ecosystem/vitepress/quick-start',
        activeMatch: '^/ecosystem/'
      }
    ],
    sidebar: {
      '/vue3/': getVue3Sidebar(),
      '/core/': getCoreSidebar(),
      '/ecosystem/': getEcosystemSidebar()
    }
  }
})

function getVue3Sidebar() {
  return [
    {
      text: '基础',
      collapsable: false,
      items: [
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
      items: [
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
      items: [
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
      items: [
        { text: 'Reactive', link: '/vue3/composition/reactive/' },
        { text: 'Setup', link: '/vue3/composition/setup/' },
        { text: 'Composition', link: '/vue3/composition/ref/' },
        { text: 'Computed', link: '/vue3/composition/computed/' },
        { text: 'Watch', link: '/vue3/composition/watch/' },
        { text: 'WatchEffect', link: '/vue3/composition/watchEffect/' },
        { text: '依赖注入', link: '/vue3/composition/dependency-injection/' }
      ]
    },
    {
      text: 'API',
      collapsable: false,
      items: [{ text: 'nextTick', link: '/vue3/api/nextTick/' }]
    }
  ]
}

function getCoreSidebar() {
  return [
    {
      text: '阅前必读',
      collapsable: false,
      items: [{ text: '快速开始', link: '/core/getting-start' }]
    },
    {
      text: '响应式系统',
      collapsable: false,
      items: [
        {
          text: 'reactive',
          link: '/core/reactivity/reactive'
        },
        {
          text: 'effect',
          link: '/core/reactivity/effect'
        }
      ]
    },
    {
      text: '模板编译',
      collapsable: false,
      items: [
        { text: '编译原理', link: '/core/template/overview' },
        { text: 'HTML 解析器', link: '/core/template/htmlParser' }
      ]
    }
    // {
    //   text: '虚拟DOM',
    //   collapsable: false,
    //   items: [
    //     { text: 'Virtual Node', link: '/core/virtual-dom/vnode' },
    //     { text: 'Diff', link: '/core/virtual-dom/diff' }
    //   ]
    // }
    // {
    //   title: '实例方法',
    //   collapsable: false,
    //   items: ['/core/ecology/vuex']
    // },
    // {
    //   title: '全局API',
    //   collapsable: false,
    //   items: ['/core/ecology/vuex']
    // },
    // {
    //   title: '指令',
    //   collapsable: false,
    //   items: ['/core/ecology/vuex']
    // }
  ]
}

function getEcosystemSidebar() {
  return [
    {
      text: 'vitepress',
      items: [
        { text: '快速开始', link: '/ecosystem/vitepress/quick-start' },
        { text: '主题', link: '/ecosystem/vitepress/theme' },
        { text: '插件', link: '/ecosystem/vitepress/plugin' }
      ]
    }
  ]
}
