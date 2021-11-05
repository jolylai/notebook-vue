import { isVnode, sameVnode, vnode, VNode } from './vnode'
import { DOMAPI, htmlDomApi } from './htmldomapi'

import { Module } from './modules/module'
import { isArray, isPrimitive } from './utils'

type VNodeQueue = VNode[]

type ArraysOf<T> = {
  [K in keyof T]: Array<T[K]>
}

type ModuleHooks = ArraysOf<Required<Module>>

type KeyToIndexMap = { [key: string]: number }

const emptyNode = vnode('', {}, [], undefined, undefined)

function isUndef(s: any): boolean {
  return s === undefined
}

function createKeyToOldIdx(
  children: VNode[],
  beginIdx: number,
  endIdx: number
) {
  const map: KeyToIndexMap = {}

  for (let i = beginIdx; i <= endIdx; ++i) {
    const key = children[i]?.key
    if (key !== undefined) {
      map[key as string] = i
    }
  }
  return map
}

type NonUndefined<T> = T extends undefined ? never : any

function isDef<A>(s: A): s is NonUndefined<A> {
  return s !== undefined
}

const hooks: Array<keyof Module> = [
  'create',
  'update',
  'remove',
  'destroy',
  'pre',
  'post'
]

export function init(modules: Array<Partial<Module>>) {
  const api: DOMAPI = htmlDomApi

  const cbs: ModuleHooks = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: []
  }

  for (const hook of hooks) {
    for (const module of modules) {
      const currentHook = module[hook]
      if (currentHook !== undefined) {
        ;(cbs[hook] as any[]).push(currentHook)
      }
    }
  }

  function emptyNodeAt(elm: Element): VNode {
    const id = elm.id ? '#' + elm.id : ''
    const classes = elm.getAttribute('class')

    const c = classes ? '.' + classes.split(' ').join('.') : ''

    return vnode(
      api.tagName(elm).toLowerCase() + id + c,
      {},
      [],
      undefined,
      elm
    )
  }

  // 执行销毁 hook
  function invokeDestroyHook(vnode: VNode) {
    const { data } = vnode
    if (isDef(data)) {
      // 执行 vnode 中的 destroy hook
      data?.hook?.destroy?.(vnode)

      // 执行 module 中的 destroy hook
      for (let i = 0; i < cbs.destroy.length; i++) cbs.destroy[i](vnode)

      if (isDef(vnode.children)) {
        for (let child of vnode.children) {
          if (isDef(child) && typeof child !== 'string')
            invokeDestroyHook(child)
        }
      }
    }
  }

  function createRmCb(childElm: Node, listeners: number) {
    return function rmCb() {
      if (--listeners == 0) {
        const parent = api.parentNode(childElm)
        api.removeChild(parent, childElm)
      }
    }
  }

  // 虚拟节点创建DOM 节点
  function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    let data = vnode.data

    // 初始化
    if (isDef(data)) {
      const init = data?.hook?.init
      if (isDef(init)) {
        init(vnode)
        data = vnode.data
      }
    }

    const { children, sel } = vnode

    if (sel === '!') {
      // 注释节点
      if (isUndef(vnode.text)) {
        vnode.text = ''
      }
      vnode.elm = api.createComment(vnode.text)
    } else if (isDef(sel)) {
      const hashIdx = sel.indexOf('#')
      const dotIdx = sel.indexOf('.', hashIdx)

      const hash = hashIdx > 0 ? hashIdx : sel.length
      const dot = dotIdx > 0 ? dotIdx : sel.length

      const tag =
        hashIdx !== -1 || dotIdx !== -1
          ? sel.slice(0, Math.min(hashIdx, dotIdx))
          : sel

      const elm = (vnode.elm = api.createElement(tag, data))

      if (hash < dot) elm.setAttribute('id', sel.slice(hash + 1, dot))
      if (dotIdx > 0)
        elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '))

      //  create Hook
      for (let i = 0; i < cbs.create.length; i++)
        cbs.create[i](emptyNode, vnode)

      if (isArray(children)) {
        for (let child of children) {
          if (child != null) {
            api.appendChild(elm, createElm(child as VNode, insertedVnodeQueue))
          }
        }
      } else if (isPrimitive(vnode.text)) {
        api.appendChild(elm, api.createTextNode(vnode.text))
      }

      const hook = vnode?.data?.hook

      if (isDef(hook)) {
        hook.create?.(emptyNode, vnode)

        if (hook.insert) {
          insertedVnodeQueue.push(vnode)
        }
      }
    } else {
      vnode.elm = api.createTextNode(vnode.text)
    }

    return vnode.elm
  }

  function addVnodes(
    parentElm: Node,
    before: Node | null,
    vnodes: VNode[],
    startIndex: number,
    endIndex: number,
    insertedVnodeQueue: VNodeQueue
  ) {
    for (; startIndex < endIndex; ++startIndex) {
      const ch = vnodes[startIndex]
      if (ch != null) {
        api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before)
      }
    }
  }

  // 删除节点
  function removeVnodes(
    parentElm: Node,
    vnodes: VNode[],
    startIndex: number,
    endIndex: number
  ): void {
    for (; startIndex < endIndex; ++startIndex) {
      let listeners: number
      let rm: () => void
      const ch = vnodes[startIndex]

      if (ch != null) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch)

          // invoke module remove hook
          listeners = cbs.remove.length + 1
          rm = createRmCb(ch.elm, listeners)
          for (let i = 0; i < cbs.remove.length; i++) cbs.remove[i](ch, rm)

          const removeHook = ch.data?.hook?.remove

          if (isDef(removeHook)) {
            removeHook(ch, rm)
          } else {
            rm()
          }
        }
      } else {
        api.removeChild(parentElm, ch.elm)
      }
    }
  }

  function updateChildren(
    parentElm: Node,
    oldCh: VNode[],
    newCh: VNode[],
    insertedVnodeQueue: VNodeQueue
  ) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx: KeyToIndexMap | undefined
    let idxInOld: number
    let elmToMove: VNode
    let before: any

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx]
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
        api.insertBefore(
          parentElm,
          oldStartVnode.elm!,
          api.nextSibling(oldEndVnode.elm!)
        )
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
        api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        }
        idxInOld = oldKeyToIdx[newStartVnode.key as string]
        if (isUndef(idxInOld)) {
          // New element
          api.insertBefore(
            parentElm,
            createElm(newStartVnode, insertedVnodeQueue),
            oldStartVnode.elm!
          )
        } else {
          elmToMove = oldCh[idxInOld]
          if (elmToMove.sel !== newStartVnode.sel) {
            api.insertBefore(
              parentElm,
              createElm(newStartVnode, insertedVnodeQueue),
              oldStartVnode.elm!
            )
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            oldCh[idxInOld] = undefined as any
            api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
        addVnodes(
          parentElm,
          before,
          newCh,
          newStartIdx,
          newEndIdx,
          insertedVnodeQueue
        )
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
      }
    }
  }

  // 更新 VNode
  function patchVnode(
    oldVnode: VNode,
    vnode: VNode,
    insertedVnodeQueue: VNodeQueue
  ) {
    const hook = vnode.data?.hook
    hook?.prepatch?.(oldVnode, vnode)

    const elm = (oldVnode.elm = vnode.elm)
    const oldCh = oldVnode.children as VNode[]
    const ch = vnode.children as VNode[]

    // exec update hook
    if (vnode.data !== undefined) {
      for (let i = 0; i < cbs.update.length; i++) {
        cbs.update[i](oldVnode, vnode)
        vnode.data.hook?.update?.(oldVnode, vnode)
      }
    }

    if (isUndef(vnode.text)) {
      // 非文本节点
      if (isDef(oldCh) && isDef(ch)) {
        // 更新children
      } else if (isDef(ch)) {
        // 新增 children
      } else if (isDef(oldCh)) {
        // 删除 children
        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        // 删除文本节点
        api.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      // 跟新问文本节点
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
      }

      api.setTextContent(elm, vnode.text)
    }

    hook?.postpatch?.(oldVnode, vnode)
  }

  return function patch(oldNode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node

    const insertedVnodeQueue: VNodeQueue = []

    if (!isVnode(oldNode)) {
      oldNode = emptyNodeAt(oldNode)
    }

    if (sameVnode(oldNode, vnode)) {
      patchVnode(oldNode, vnode, insertedVnodeQueue)
    } else {
      elm = oldNode.elm
      parent = api.parentNode(elm)

      createElm(vnode, insertedVnodeQueue)

      if (parent != null) {
        api.insertBefore(parent, vnode.elm, api.nextSibling(elm))
        removeVnodes(parent, [oldNode], 0, 0)
      }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i])
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]()
    return vnode
  }
}
