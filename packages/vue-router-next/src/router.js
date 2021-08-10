export function createRouter(options) {
  function addRoute(parentOrRoute, route) {
    let parent
    let record

    if (isRouteName(parentOrRoute)) {
      parent = marcher.getRecordMatcher(parentOrRoute)
      record = route
    } else {
      record = parentOrRoute
    }

    return matcher.addRoute(record, parent)
  }
}
