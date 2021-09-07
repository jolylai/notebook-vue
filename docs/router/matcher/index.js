export function createRouterMatcher(routes, globalOptions) {
  /**
   * 添加路由
   * @param {Object} record 用户配置的原生路由
   * @param {*} parent
   * @param {*} originalRecord
   */
  function addRoute(record, parent, originalRecord) {
    const normalizedRecords = [record]

    for (let normalizedRecord of normalizedRecords) {
      // create the object before hand so it can be passed to children
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options)
    }
  }

  return
}

export function createRouteRecordMatcher(record, parent, options) {}
