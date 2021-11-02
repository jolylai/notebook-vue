export function isPrimitive(s: any): s is string | number {
  return (
    typeof s === 'string' ||
    typeof s === 'number' ||
    s instanceof String ||
    s instanceof Number
  )
}

export function isArray(s: any): boolean {
  return Array.isArray(s)
}
