module.exports = {
  title: "Vue",
  description: "🚀 Vue 学习笔记",
  base: "/notebook-vue/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    repo: "Jolylai/notebook-vue",
    nav: require("./nav/zh"),
    sidebar: require("./siderbar/index"),
    lastUpdated: "上次更新"
  },
  markdown: {
    lineNumbers: true
  }
};
