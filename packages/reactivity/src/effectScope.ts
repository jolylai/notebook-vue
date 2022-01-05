import { ReactiveEffect } from './effect'

// 当前作用域
let activeEffectScope: EffectScope | undefined
// 作用域栈
const effectScopeStack: EffectScope[] = []

export class EffectScope {
  active = true
  parent: EffectScope | undefined

  effect: ReactiveEffect[] = []

  constructor(detached = false) {
    if (!detached && activeEffectScope) {
      this.parent
    }
  }

  run<T>(fn: () => T): T | undefined {
    if (this.active) {
      try {
        this.on()
        return fn()
      } finally {
        this.off()
      }
    }
  }

  on() {
    if (this.active) {
      effectScopeStack.push(this)
      activeEffectScope = this
    }
  }

  off() {
    if (this.active) {
      effectScopeStack.pop()
      activeEffectScope = effectScopeStack[effectScopeStack.length - 1]
    }
  }
}

export function recordEffectScope(
  effect: ReactiveEffect,
  scope?: EffectScope | null
) {
  scope = scope || activeEffectScope
  if (scope && scope.active) {
    scope.effect.push(effect)
  }
}
