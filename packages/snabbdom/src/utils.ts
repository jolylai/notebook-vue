export const isArray = Array.isArray

export function isPrimitive(s: any): s is string | number {
  return (
    typeof s === 'string' ||
    typeof s === 'number' ||
    s instanceof String ||
    s instanceof Number
  )
}
