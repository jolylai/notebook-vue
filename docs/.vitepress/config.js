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
        activeMatch: '^/$|^/guide/'
      }
    ],
    sidebar: {
      '/guide/': sidebar.guide
      // '/ecosystem/': sidebar.ecosystem,
      // '/admin/': sidebar.admin,
      // '/core/': sidebar.core,
      // '/element3/': sidebar.element3
    }
  },
  markdown: {
    lineNumbers: true
  }
}
