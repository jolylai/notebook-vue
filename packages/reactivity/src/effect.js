// export interface ReactiveEffect<T = any> {
//   (): T
//   _isEffect: true
//   id: number
//   active: boolean
//   raw: () => T
//   deps: Array<Dep>
//   options: ReactiveEffectOptions
//   allowRecurse: boolean
// }

// {
//   target: {
//     key: deps
//   }
// }

const targetMap = new Map()

const effectStack = []

let activeEffect

/**
 *
 */

function isEffect(fn) {
  return fn && fn._isEffect === true
}

export function effect(fn, options = {}) {
  if (isEffect(fn)) {
    fn = fn.raw
  }

  const effect = createReactiveEffect(fn, options)

  if (!options.lazy) {
    effect()
  }

  return effect
}

let uid = 0

/**
 *
 * @param {*} fn
 * @param {*} options
 *
 * @returns effect
 */
export function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      try {
        effectStack.push(effect)
        activeEffect = effect
        return fn()
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }

  effect.uid = uid++
  effect.deps = []
  effect.raw = fn
  effect.options = options

  return effect
}

/**
 * 清除依赖
 * @param {Fucntion} effect
 */
function cleanup(effect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }

    deps.length = 0
  }
}

export function track(target, type, key) {
  let depsMap = targetMap.get(target)

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)

  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

/**
 *
 * @param {Object} target
 * @param {*} type
 * @param {*} key
 * @param {*} newValue
 * @param {*} oldValue
 * @param {*} oldTarget
 */
export function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target)

  if (!depsMap) {
    return
  }

  const effects = new Set()

  const add = effectToAdd => {
    if (effectToAdd) {
      effectToAdd.forEach(effect => {
        if (effect !== activeEffect || effect.allowRecurse) {
          effects.add(effect)
        }
      })
    }
  }

  const run = effect => {
    effect()
  }

  effects.forEach(run)
}
