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
        text: 'Vue Router',
        link: '/router/tokenizer',
        activeMatch: '^/vue-route/'
      }
    ],
    sidebar: {
      '/guide/': sidebar.guide,
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
