import { mutableHandlers } from './baseHandlers'

const ReactiveFlags = {
  SKIP: '__v_skip',
  IS_REACTIVE: '__v_isReactive',
  IS_READONLY: '__v_isReadonly',
  RAW: '__v_raw'
}

export function reactive(target) {
  return createReactiveObject(target, false, mutableHandlers)
}

function createReactiveObject(
  target,
  isReadonly,
  mutableHandlers,
  collectionHandlers
) {
  const observer = new Proxy(target, mutableHandlers)
  return observer
}
