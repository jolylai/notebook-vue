// {
//   target: {
//     key: [effect1, effect2]
//   }
// }

const targetMap = new WeakMap()
const effectStack = []

function track(target, key) {
  const hasEffect = effectStack[effectStack.length - 1]

  if (hasEffect) {
    let depsMap = targetMap.get(target)

    // 初始化
    if (depsMap === undefined) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }

    let deps = depsMap.get(key)
    if (deps === undefined) {
      deps = new Set()

      depsMap.set(key, deps)
    }

    // 双向缓存
    const effect = effectStack[effectStack.length - 1]
    if (!deps.has(effect)) {
      deps.add(effect)
      effect.deps.push(deps)
    }
  }
}

function trigger(target, key, val) {
  const depsMap = targetMap.get(target)

  // 没有 effect 副作用
  if (depsMap === undefined) {
    return
  }

  const effects = new Set()

  // 特殊的 effect
  const computeds = new Set()

  if (key) {
    const deps = depsMap.get(key)
    deps.forEach(effect => {
      if (effect.computed) {
        computeds.add(effect)
      } else {
        effects.add(effect)
      }
    })
  }

  effects.forEach(effect => effect())
  computeds.forEach(computed => computed())
}

const baseHandler = {
  get(target, key) {
    // 搜集依赖
    track(target, key)
    return Reflect.get(target, key)
  },
  set(target, key, val) {
    const oldValue = target[key]
    console.log('oldValue: ', oldValue)
    trigger(target, key, val)
    Reflect.set(target, key, val)
  }
}

function reactive(target) {
  const observed = new Proxy(target, baseHandler)
  return observed
}

function computed(fn) {
  const runner = effect(fn, { lazy: true, computed: true })

  return {
    effect: runner,
    get value() {
      return runner
    }
  }
}

function effect(fn, options = {}) {
  let e = createRectiveEffect(fn, options)

  if (!options.lazy) {
    e()
  }

  return e
}

function createRectiveEffect(fn, options) {
  const effect = function effect(...args) {
    return run(effect, fn, args)
  }

  effect.deps = []
  effect.computed = options.computed
  effect.lazy = options.lazy

  return effect
}

function run(effect, fn, args) {
  if (effectStack.indexOf(effect) === -1) {
    try {
      effectStack.push(effect)
      return fn(...args)
    } finally {
      effectStack.pop()
    }
  }
}
