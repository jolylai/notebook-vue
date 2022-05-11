import { createDep, Dep, finalizeDepMarkers, initDepMarkers } from './dep'
import { EffectScope, recordEffectScope } from './effectScope'

// 存储 {target -> key -> dep} 关联
type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<any, KeyToDepMap>()

// The number of effects currently being tracked recursively.
let effectTrackDepth = 0

export let trackOpBit = 1

/**
 * The bitwise track markers support at most 30 levels of recursion.
 * This value is chosen to enable modern JS engines to use a SMI on all platforms.
 * When recursion depth is greater, fall back to using a full cleanup.
 */
const maxMarkerBits = 30

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
      try {
        effectStack.push((activeEffect = this))
        enableTracking()

        //
        trackOpBit = 1 << ++effectTrackDepth

        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this)
        } else {
          cleanupEffect(this)
        }
        return this.fn()
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this)
        }

        trackOpBit = 1 << --effectTrackDepth

        // resetTracking()
        effectStack.pop()
        const n = effectStack.length
        activeEffect = n > 0 ? effectStack[n - 1] : undefined
      }
    }
  }
}

// 清除所有的依赖
function cleanupEffect(effect: ReactiveEffect) {
  const { deps } = effect

  if (deps) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}

export interface ReactiveEffectRunner<T = any> {
  (): T
  effect: ReactiveEffect
}

export interface ReactiveEffectOptions {
  lazy?: boolean
  scheduler?: EffectScheduler
  scope?: EffectScope
  allowRecurse?: boolean
  onStop?: () => void
}

export function effect(fn: () => void) {
  const _effect = new ReactiveEffect(fn)

  _effect.run()
}

let shouldTrack = true
const trackStack: boolean[] = []

export function enableTracking() {
  trackStack.push(shouldTrack)
  shouldTrack = true
}

export const enum TrackOpTypes {
  GET = 'get',
  HAS = 'has',
  ITERATE = 'iterate'
}

export function track(target: object, type: TrackOpTypes, key: unknown) {
  let depsMap = targetMap.get(target)

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)

  if (!dep) {
    depsMap.set(key, (dep = createDep()))
  }

  trackEffects(dep)
}

export function trackEffects(dep: Dep) {
  // let shouldTrack = false
  // if(effectTrackDepth <= maxMarkerBits){
  //   if(!newTracked(dep)){
  //   }
  // }

  dep.add(activeEffect!)
  activeEffect!.deps.push(dep)
}

export function trigger(target: object) {
  const depsMap = targetMap.get(target)
  console.log('depsMap: ', depsMap)
}
