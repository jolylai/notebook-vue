type Target = Record<string, any>

const reactive = (target: Target) => {
  const proxy = new Proxy(target, {
    get(target, key) {
      track(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      return Reflect.set(target, key, value)
    }
  })

  return proxy
}

let activeEffect: () => void
const effect = (fn: () => void) => {
  activeEffect = fn
  fn()
}

const targetMap = new WeakMap()
const track = (target: Target, key: string | symbol) => {
  let depsMap = targetMap.get(target)

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }

  deps.add(activeEffect)
}

const trigger = (target: Target, key: string) => {}

const state = reactive({ count: 1 })
effect(() => {
  console.log(state.count)
})
