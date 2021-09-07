function createBaseLocation() {
  return location.protocol + '//' + location.host
}

function createCurrentLocation(base, location) {
  const { pathname, search, hash } = location

  const path = stripBase(pathname, base)
  return path + search + hash
}

function stripBase(pathname, base) {
  if (!base || pathname.toLowerCase().startsWith(base.toLowerCase()))
    return pathname

  return pathname.slice(base.length) || '/'
}

function useHistoryStateNavigation(base) {
  const { history, location } = window

  const currentLocation = {
    value: createCurrentLocation(base, location)
  }

  const historyState = {
    value: history.state
  }

  if (!historyState.value) {
    changeLocation(
      currentLocation.value,
      {
        back: null,
        current: currentLocation.value,
        forward: null,
        position: history.length - 1,
        replaced: true,
        scroll: null
      },
      true
    )
  }

  function changeLocation(to, state, replace) {
    const hashIndex = base.indexOf('#')

    // todo ???
    const url =
      hashIndex > -1
        ? location.host && document.querySelector('base')
          ? base
          : base.slice(hashIndex) + to
        : createBaseLocation() + base + to

    try {
      history[replace ? 'replaceState' : 'pushState'](state, '', url)
      historyState.value = state
    } catch (error) {
      console.log('error: ', error)
      // Force the navigation, this also resets the call count
      location[replace ? 'replace' : 'assign'](url)
    }
  }

  function replace(to, data) {
    const state = Object.assign({}, history.state, data, {
      position: historyState.value.position
    })

    changeLocation(to, state, true)
    currentLocation.value = to
  }

  function push(to, data) {
    const state = Object.assign({}, historyState.value, history.state, {
      forward: to
    })

    changeLocation(to, state, false)

    currentLocation.value = to
  }

  return {
    location: currentLocation,
    state: historyState,

    replace,
    push
  }
}

function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = []
  let teardowns = []
}

export function createWebHistory(base = '') {
  const historyNavigation = useHistoryStateNavigation(base)
  console.log('historyNavigation: ', historyNavigation)
}
