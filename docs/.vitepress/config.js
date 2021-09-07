const sidebar = require('./sidebar')

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
        text: '指南',
        link: '/guide/basic/getting-start',
        activeMatch: '^/guide/'
      },
      {
        text: 'API',
        link: '/api/nextTick',
        activeMatch: '^/api/'
      },
      {
        text: 'Vue Router',
        link: '/router/tokenizer',
        activeMatch: '^/vue-route/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          collapsable: false,
          children: [
            { text: '快速开始', link: '/guide/basic/getting-start' },
            {
              text: 'Class 与 Style 绑定',
              link: '/guide/basic/class-and-style'
            }
          ]
        },
        {
          text: '深入组件',
          collapsable: false,
          children: [
            { text: 'Registration', link: '/guide/component/registration' },
            { text: 'Props', link: '/guide/component/props' },
            { text: 'Lifecycle', link: '/guide/component/lifecycle' },
            { text: 'Data', link: '/guide/component/data' },
            { text: 'Slot', link: '/guide/component/slot' },
            { text: 'Instance', link: '/guide/component/instance' },
            { text: '异步组件', link: '/guide/component/async' }
          ]
        },
        {
          text: '高级语法',
          collapsable: false,
          children: [
            { text: 'Teleport', link: '/guide/advance/teleport' },
            { text: 'Mixin', link: '/guide/advance/mixin' },
            { text: 'Directive', link: '/guide/advance/directive' },
            { text: 'Render', link: '/guide/advance/render/index' },
            { text: 'Plugin', link: '/guide/advance/plugin' }
          ]
        },
        {
          text: 'Composition API',
          collapsable: false,
          children: [
            { text: 'Reactive', link: '/guide/composition/reactive/' },
            { text: 'Setup', link: '/guide/composition/setup/' },
            { text: 'Composition', link: '/guide/composition/ref/' },
            { text: 'Computed', link: '/guide/composition/computed/' },
            { text: 'Watch', link: '/guide/composition/watch/' },
            { text: 'WatchEffect', link: '/guide/composition/watchEffect/' },
            { text: 'Provide', link: '/guide/composition/provide&inject/' }
          ]
        }

        // {
        //   text: '生态系统',
        //   collapsable: false,
        //   children: [
        //     { text: 'Cli', link: '/guide/ecosystem/vue-cli' },
        //     { text: 'Router', link: '/guide/ecosystem/vue-router' },
        //     { text: 'Vuex', link: '/guide/ecosystem/vuex' }
        //   ]
        // }
      ],
      '/api/': [
        {
          text: 'API',
          collapsable: false,
          children: [{ text: 'nextTick', link: '/api/nextTick' }]
        }
      ],
      '/router/': [
        {
          text: '配置器',
          collapsable: false,
          children: [
            { text: 'Token', link: '/router/tokenizer/' },
            { text: 'Router Matcher', link: '/router/matcher/' }
          ]
        }
      ]
      // '/ecosystem/': sidebar.ecosystem,
      // '/admin/': sidebar.admin,
      // '/core/': sidebar.core,
      // '/element3/': sidebar.element3
    }
  },
  markdown: {
    lineNumbers: false
  }
}
