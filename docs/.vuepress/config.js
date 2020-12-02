const sidebar = require('./sidebar')

module.exports = ctx => ({
  title: 'Vue Notebook',
  description: 'Vue 学习笔记',
  themeConfig: {
    repo: 'jolylai/notebook-vue',
    editLinks: true,
    smoothScroll: true,
    editLinkText: 'Edit this on GitHub!',
    lastUpdated: 'Last updated',
    docsDir: 'src',
    sidebarDepth: 2,
    nav: require('./nav'),
    sidebar: {
      '/guide/': sidebar.guide,
      // '/router/': require('./sidebar/router'),
      '/component/': sidebar.component
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    ['@vuepress/medium-zoom', true],
    // ['@vuepress/google-analytics', {
    //   ga: 'UA-128189152-1'
    // }],
    [
      'container',
      {
        type: 'vue',
        before: '<pre class="vue-container"><code>',
        after: '</code></pre>'
      }
    ],
    [
      'container',
      {
        type: 'upgrade',
        before: info => `<UpgradePath title="${info}">`,
        after: '</UpgradePath>'
      }
    ]
    // ['flowchart'],
  ],
  extraWatchFiles: ['.vuepress/nav.js', '.vuepress/sidebar.js']
})
