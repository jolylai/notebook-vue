export function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

export function isEqual(newValue, oldValue) {
  return newValue === oldValue
}

export const hasOwnProperty = Object.prototype.hasOwnProperty
