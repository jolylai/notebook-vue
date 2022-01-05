import { Dep } from './dep'
import { EffectScope, recordEffectScope } from './effectScope'

export type EffectScheduler = (...args: any[]) => any

const effectStack: ReactiveEffect[] = []
let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
  active = true

  deps: Dep[] = []
  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null,
    scope?: EffectScope | null
  ) {
    recordEffectScope(this, scope)
  }

  run() {
    if (!this.active) {
      return this.fn()
    }

    if (!effectStack.includes(this)) {
      effectStack.push((activeEffect = this))
      enableTracking()
    }
  }
}

export interface ReactiveEffectRunner<T = any> {
  (): T
  effect: ReactiveEffect
}

export function effect(fn: () => void) {
  const _effect = new ReactiveEffect(fn)
}

let shouldTrack = true
const trackStack: boolean[] = []

export function enableTracking() {
  trackStack.push(shouldTrack)
  shouldTrack = true
}
