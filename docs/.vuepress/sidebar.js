module.exports = {
  guide: [
    '/guide/start',
    {
      title: '实例',
      collapsable: false,
      children: ['/guide/instance', '/guide/directive', '/guide/plugin']
    }
  ],
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
      children: ['/core/template/slot']
    },
    {
      title: '生态',
      collapsable: false,
      children: ['/core/ecology/vuex']
    }
  ],
  component: [
    {
      title: '开发指南',
      collapsable: false,
      children: [
        '/component/quickstart',
        '/component/standard',
        '/component/table'
      ]
    }
  ]
}
