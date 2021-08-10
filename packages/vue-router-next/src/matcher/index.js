export function createMatcher(routes, globalOptions) {
  const matcherMap = new Map()

  function getRecordMatcher(name) {
    return matcherMap.get(name)
  }

  /**
   *
   * @param {*} record
   * @param {*} parent
   * @param {*} originalRecord
   */
  function addRoute(record, parent, originalRecord) {
    const normalizedRecords = [record]

    for (let normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord
    }
  }

  return { getRecordMatcher }
}
