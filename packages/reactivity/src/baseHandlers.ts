function createGetter() {
  return function get(target: object, key: string | symbol, receiver: object) {
    const res = Reflect.get(target, key, receiver)

    return res
  }
}

const get = createGetter()

export const mutableHandlers = {
  get
}
