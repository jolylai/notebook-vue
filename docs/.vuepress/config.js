module.exports = {
  title: "Vue",
  description: "🚀 持续构建",
  base: "/notebook-vue/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    repo: "Jolylai/notebook-devops",
    nav: require("./nav/zh"),
    sidebar: require("./siderbar/index"),
    lastUpdated: "上次更新"
  },
  markdown: {
    lineNumbers: true
  }
};
