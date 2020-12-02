class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

function defineReactive(obj, key, val) {
  if (!val) {
    val = obj[key]
  }

  if (typeof val === 'object') {
    new Observer(val)
  }

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      console.log(`${key}属性被读取了`)
      return val
    },
    set(newVal) {
      console.log(`${key}属性被修改了`)
      val = newVal
    }
  })
}

const obj = { a: 1, b: { c: 1 } }

new Observer(obj)

// obj.a;
// obj.a = 2;

obj.b.c
