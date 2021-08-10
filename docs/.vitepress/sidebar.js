module.exports = {
  guide: [
    {
      text: '基础',
      collapsable: false,
      children: [{ text: '快速开始', link: '/guide/basic/getting-start' }]
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
        { text: 'Components', link: '/guide/component/async-components' }
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
        { text: 'Reactive', link: '/guide/composition/reactive' },
        { text: 'Setup', link: '/guide/composition/setup' },
        { text: 'Composition', link: '/guide/composition/ref' },
        { text: 'Computed', link: '/guide/composition/computed' },
        { text: 'Watch', link: '/guide/composition/watch' },
        { text: 'WatchEffect', link: '/guide/composition/watchEffect' },
        { text: 'Provide', link: '/guide/composition/provide&inject/index' }
      ]
    },
    {
      text: '生态系统',
      collapsable: false,
      children: [
        { text: 'Cli', link: '/guide/ecosystem/vue-cli' },
        { text: 'Router', link: '/guide/ecosystem/vue-router' },
        { text: 'Vuex', link: '/guide/ecosystem/vuex' }
      ]
    }
  ],
  router: [
    {
      text: '配置器',
      collapsable: false,
      children: [{ text: 'Token', link: '/router/matcher/tokenizer' }]
    },
    {
      text: '深入组件',
      collapsable: false,
      children: [{ text: '快速开始', link: '/router/matcher/tokenizer' }]
    }
  ],
  ecosystem: [
    {
      title: '后台管理',
      collapsable: false,
      children: [
        '/ecosystem/quickstart',
        '/ecosystem/permission',
        '/ecosystem/vue-router'
      ]
    }
  ],
  admin: ['/admin/quickstart', '/admin/standard'],
  core: [
    {
      title: '阅前必读',
      collapsable: false,
      children: ['/core/start']
    },
    {
      title: '数据驱动',
      collapsable: false,
      children: ['/core/reactivity/reactive']
    },
    {
      title: '模板编译',
      collapsable: false,
      children: ['/core/template/overview', '/core/template/slot']
    },
    {
      title: '虚拟DOM',
      collapsable: false,
      children: ['/core/virtual-dom/overview', '/core/virtual-dom/diff']
    },
    {
      title: '实例方法',
      collapsable: false,
      children: ['/core/ecology/vuex']
    },
    {
      title: '全局API',
      collapsable: false,
      children: ['/core/ecology/vuex']
    },
    {
      title: '指令',
      collapsable: false,
      children: ['/core/ecology/vuex']
    }
  ],
  element3: [
    {
      title: '开发指南',
      collapsable: false,
      children: [
        '/element3/guide',
        '/element3/quickstart',
        '/element3/standard'
      ]
    },
    {
      title: '组件',
      collapsable: false,
      children: ['/element3/table', '/element3/form']
    }
  ]
}
