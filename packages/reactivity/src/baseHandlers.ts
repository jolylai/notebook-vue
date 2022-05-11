// import { track, TrackOpTypes } from './effect'

function createGetter() {
  return function get(target: object, key: string, receiver: object) {
    const res = Reflect.get(target, key, receiver)

    // track(target, TrackOpTypes.GET, key)

    return res
  }
}

const get = createGetter()

function createSetter() {
  return function set(
    target: object,
    key: string,
    value: unknown,
    receiver: object
  ) {
    const res = Reflect.set(target, key, value, receiver)
    return res
  }
}

const set = createSetter()

function has(target: object, key: string) {
  const result = Reflect.has(target, key)

  return result
}

function ownKeys(target: object) {
  return Reflect.ownKeys(target)
}

function deleteProperty(target: object, key: string) {
  const result = Reflect.deleteProperty(target, key)

  return result
}

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  has,
  deleteProperty,
  ownKeys
}
