import { describe, expect, test, vi } from 'vitest'
import { reactive, effect } from '../src/mini'

describe('mini', () => {
  test('Object', () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    expect(observed).not.toBe(original)

    // get
    expect(observed.foo).toBe(1)
    // has
    expect('foo' in observed).toBe(true)
    // ownKeys
    expect(Object.keys(observed)).toEqual(['foo'])
  })

  test('响应式', () => {
    const fn = vi.fn()

    const data = { count: 1 }
    const obj = reactive(data)
    effect(fn)
    expect(fn).toBeCalledTimes(1)

    obj.count++

    expect(fn).toBeCalledTimes(2)
  })
})
