module.exports = {
  guide: [
    {
      title: '基础',
      collapsable: false,
      children: ['/guide/basic/getting-start', '/guide/basic/event']
    },
    {
      title: '深入组件',
      collapsable: false,
      children: [
        '/guide/component/registration',
        '/guide/component/props',
        '/guide/component/lifecycle',
        '/guide/component/data',
        '/guide/component/slot',
        '/guide/component/instance',
        '/guide/component/async-components'
      ]
    },
    {
      title: '高级语法',
      collapsable: false,
      children: [
        '/guide/advance/mixin',
        '/guide/advance/directive',
        '/guide/advance/teleport',
        '/guide/advance/render',
        '/guide/advance/plugin'
      ]
    },
    {
      title: 'Composition API',
      collapsable: false,
      children: [
        '/guide/composition/reactive',
        '/guide/composition/setup',
        '/guide/composition/ref',
        '/guide/composition/computed',
        '/guide/composition/watch',
        '/guide/composition/watchEffect',
        '/guide/composition/provide&inject'
      ]
    }
    // {
    //   title: '生态系统',
    //   collapsable: false,
    //   children: [
    //     '/guide/ecosystem/vue-cli',
    //     '/guide/ecosystem/vue-router',
    //     '/guide/ecosystem/vuex'
    //   ]
    // }
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
