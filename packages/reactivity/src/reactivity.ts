import { mutableHandlers } from './baseHandlers'

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

export function reactive<T extends object>(target: object) {
  const proxy = new Proxy(target, mutableHandlers)

  reactiveMap.set(target, proxy)

  return proxy
}

export function isReactive(value: unknown): boolean {
  if (isReadonly(value)) {
    return isReactive((value as Target)[ReactiveFlags.RAW])
  }
  return !!(value && (value as Target)[ReactiveFlags.IS_REACTIVE])
}

export function isReadonly(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.IS_READONLY])
}

export function toRaw<T>(observed: T): T {
  const raw = observed && (observed as Target)[ReactiveFlags.RAW]
  return raw ? toRaw(raw) : observed
}

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value) : value
