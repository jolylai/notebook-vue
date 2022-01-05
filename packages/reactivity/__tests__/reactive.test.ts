import { reactive } from '../src'

describe('reactivity', () => {
  test('should ', () => {
    const original: any = { foo: 1 }
    const observed = reactive(original)

    expect(observed.foo).toBe(1)
    // set
    observed.bar = 1
    expect(observed.bar).toBe(1)
    expect(original.bar).toBe(1)
  })
})
