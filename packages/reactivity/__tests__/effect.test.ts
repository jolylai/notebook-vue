// import { describe, test, expect } from 'vitest'
// import { reactive, effect } from '../src/index'

// describe('reactivity/effect', () => {
//   test('should run the passed function once (wrapped by a effect)', () => {
//     const fnSpy = jest.fn(() => {})
//     effect(fnSpy)
//     expect(fnSpy).toHaveBeenCalledTimes(1)
//   })

//   test('should observe basic properties', () => {
//     let dummy
//     const counter = reactive({ num: 0 })
//     effect(() => (dummy = counter.num))

//     expect(dummy).toBe(0)
//     counter.num = 7
//     expect(dummy).toBe(7)
//   })
// })
