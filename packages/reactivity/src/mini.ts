type Target = Record<string, any>

// 响应式数据
export const reactive = (target: Target) => {
  const proxy = new Proxy(target, {
    get(target, key) {
      track(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      trigger(target, key)
      return Reflect.set(target, key, value)
    }
  })

  return proxy
}

type Effect = () => void

let activeEffect: Effect

/**
 * 注册副作用函数
 * @param fn 副作用函数
 */
export const effect = (fn: () => void) => {
  activeEffect = fn

  // 执行副作用函数收集依赖
  fn()
}

const targetMap = new WeakMap()

/**
 * 依赖收集
 * @param target
 * @param key
 */
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

/**
 * 触发副作用函数
 * @param target
 * @param key
 * @returns
 */
const trigger = (target: Target, key: string | symbol) => {
  const depsMap = targetMap.get(target)

  if (!depsMap) {
    return
  }

  let deps = depsMap.get(key) as Effect[]

  deps.forEach(fn => {
    fn()
  })
}
