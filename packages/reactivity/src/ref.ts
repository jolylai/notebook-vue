import { Dep } from './dep'
import { toRaw, toReactive } from './reactivity'

declare const RefSymbol: unique symbol

export interface Ref<T> {
  value: T
  [RefSymbol]: true
}

export function ref(value?: unknown) {
  return createRef(value, false)
}

export function shallowRef(value?: unknown) {
  return createRef(value, true)
}

class RefImpl<T> {
  private _value: T
  private _rawValue: T

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    // todo 收集依赖
    return this._value
  }

  set value(newValue) {
    // 触发
  }
}

export function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }

  return new RefImpl(rawValue, shallow)
}

export function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
export function isRef(r: any): r is Ref<any> {
  return Boolean(r && r.__v_isRef === true)
}

type RefBase<T> = {
  dep?: Dep
  value: T
}

export function trackRefValue(ref: RefBase<any>) {
  // if(isTracking)
}
