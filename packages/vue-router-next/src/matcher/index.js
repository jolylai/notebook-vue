export function createRouterMatcher(routes, globalOptions) {
  // normalized ordered array of matchers
  const matchers = []

  const matcherMap = new Map()

  function getRecordMatcher(name) {
    return matcherMap.get(name)
  }

  /**
   * 新增路由
   * @param {*} record 用户配置的路由
   * @param {*} parent 父节点
   * @param {*} originalRecord
   */
  function addRoute(record, parent, originalRecord) {
    const normalizedRecords = [record]

    // 当前路由匹配器
    let matcher
    let originalMatcher

    for (let normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord

      matcher = createRouterMatcher(normalizedRecord)

      if ('children' in normalizedRecord) {
        const children = normalizedRecord.children
        for (let i = 0; i < children.length; i++) {
          addRoute(
            children[i],
            matcher,
            originalRecord && originalRecord.children[i]
          )
        }
      }

      // if there was no original record, then the first one was not an alias and all
      // other alias (if any) need to reference this record when adding children
      originalRecord = originalRecord || matcher
    }
  }

  //
  function insertMatcher(matcher) {}

  function resolve() {}
  function removeRoute() {}
  function getRoutes() {
    return matchers
  }

  return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher }
}

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const matcher = createMatcher(routes)
