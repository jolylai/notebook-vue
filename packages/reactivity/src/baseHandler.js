import { hasOwnProperty } from './utils'

function createGetter() {
  return function get(target, key, receiver) {
    const result = Reflect.get(target, key, receiver)
    console.log('get', key)
    return result
  }
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver)

    const isKeyExist = hasOwnProperty.call(target, key)

    if (!isKeyExist) {
      // 新增属性
    } else {
      // 修改属性
    }
    const oldValue = target[key]
    console.log('set', key)
    return res
  }
}

export const baseHandler = {
  get: createGetter(),
  set: createSetter()
}
