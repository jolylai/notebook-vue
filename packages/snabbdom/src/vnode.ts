import { Hooks } from './hooks'

export type Key = string | number | symbol

export interface VNodeData {
  // props?:  Props
  hook: Hooks
  is?: string
  [key: string]: any
}

export interface VNode {
  sel: string | undefined
  data: VNodeData | undefined
  children: Array<VNode | string> | undefined
  elm: Node | undefined
  text: string | undefined
  key: Key | undefined
}

export function sameVnode(vnode1: VNode, vnode2: VNode): boolean {
  const isSameKey = vnode1.key === vnode2.key
  const isSameIs = vnode1.data?.is === vnode2.data?.is
  const isSameSel = vnode1.sel === vnode2.sel

  return isSameKey && isSameIs && isSameSel
}

export function isVnode(vnode: any): vnode is VNode {
  return vnode.sel !== undefined
}

export function vnode(
  sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined
): VNode {
  const key = data === undefined ? undefined : data.key
  return { sel, data, children, elm, text, key }
}
