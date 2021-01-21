import { reactive } from './reactive'

const state = {
  name: 'Tom',
  age: 12,
  obj: {
    name: 'Tom',
    age: 12
  },
  arr: [1, 2]
}

const proxyState = reactive(state)

console.log('proxyState.obj.name: ', proxyState.obj.name)

proxyState.obj.age = 28

console.log(proxyState)
