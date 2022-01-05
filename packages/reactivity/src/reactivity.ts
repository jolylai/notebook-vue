// import { mutableHandlers } from './baseHandlers'

export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw'
}

export interface Target {
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.RAW]?: any
}

const reactiveMap = new WeakMap<Target, any>()

export function reactive<T extends object>(target: T): T {
  const proxy = new Proxy(target, {
    get(target: Target, key: string, receiver: object) {
      const res = Reflect.get(target, key, receiver)

      return res
    },
    set(target: T, key: string, value: unknown, receiver: object) {
      const res = Reflect.set(target, key, value, receiver)

      return res
    }
  })

  reactiveMap.set(target, proxy)

  return proxy
}
