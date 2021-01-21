import { baseHandler } from './baseHandler'

export function reactive(target) {
  return createReactiveObject(target, baseHandler)
}

function createReactiveObject(target, baseHandler) {
  const observer = new Proxy(target, baseHandler)
  return observer
}
