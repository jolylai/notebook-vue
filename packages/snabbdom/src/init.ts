import { isArray, isPrimitive } from './utils'
import { DOMAPI, htmlDomApi } from './htmldomapi'
import { Module } from './modules/module'
import { vnode, VNode } from './vnode'

function isUndef(s: any): boolean {
  return s === undefined
}

function isDef(s: any) {
  return s !== undefined
}

const emptyNode = vnode('', {}, [], undefined, undefined)

type ArraysOf<T> = {
  [K in keyof T]: Array<T[K]>
}

type ModuleHooks = ArraysOf<Required<Module>>

type VNodeQueue = VNode[]

const hooks: Array<keyof Module> = [
  'create',
  'update',
  'remove',
  'destroy',
  'pre',
  'post'
]

function init(modules: Array<Partial<Module>>) {
  // 收集所有注册模块的hook

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

      if (currentHook) {
        ;(cbs[hook] as any[]).push(currentHook)
      }
    }
  }

  const api: DOMAPI = htmlDomApi

  function emptyNodeAt(elm: Element) {
    const id = elm.id ? `#${elm.id}` : ''

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

  function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    let { data, children, sel, text } = vnode

    if (data !== undefined) {
      const init = data.hook?.init
      if (isDef(init)) {
        init(vnode)
      }
    }

    if (sel === '!') {
      vnode.elm = api.createComment(isUndef(text) ? '' : text)
    } else if (isDef(sel)) {
      // 解析选择器
      const hashIdx = sel.indexOf('#')
      const dotIdx = sel.indexOf('.')
      const hash = hashIdx > 0 ? hashIdx : sel.length
      const dot = dotIdx > 0 ? dotIdx : sel.length

      const tag =
        hashIdx !== -1 || dotIdx !== -1
          ? sel.slice(0, Math.min(hashIdx, dotIdx))
          : sel

      const elm = api.createElement(tag, data)

      // hash must before dot
      if (hash < dot) elm.setAttribute('id', sel.slice(hash + 1, dot))
      if (dot > 0)
        elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '))

      // invoke create hook
      for (let i = 0; i < cbs.create.length; i++)
        cbs.create[i](emptyNode, vnode)

      // resolve children
      if (Array.isArray(children)) {
        // recursive create child
        for (let child of children) {
          if (child != null) {
            api.appendChild(elm, createElm(child as VNode, insertedVnodeQueue))
          }
        }
      } else if (isPrimitive(vnode.text)) {
        api.appendChild(elm, api.createTextNode(vnode.text))
      }

      const hook = vnode.data!.hook
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
    startIdx: number,
    endIdx: number,
    insertedVnodeQueue: VNodeQueue
  ) {
    for (; startIdx < endIdx; startIdx++) {
      const child = vnodes[startIdx]
      if (child != null) {
        api.insertBefore(
          parentElm,
          createElm(child as VNode, insertedVnodeQueue),
          before
        )
      }
    }
  }

  function invokeDestroyHook(vnode: VNode) {
    const { data, children } = vnode

    if (data != null) {
      data?.hook?.hook?.destroy?.(vnode)
      for (let i = 0; i < cbs.destroy.length; i++) cbs.destroy[i](vnode)

      if (isArray(children)) {
        for (let child of children) {
          if (child != null && typeof child !== 'string') {
            invokeDestroyHook(child)
          }
        }
      }
    }
  }

  function removeVnodes(
    parentElm: Node,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number
  ): void {}

  function patchVnode(
    oldVnode: VNode,
    vnode: VNode,
    insertedVnodeQueue: VNodeQueue
  ) {
    const hook = vnode.data?.hook
    hook?.prepatch?.(oldVnode, vnode)
    const elm = (vnode.elm = oldVnode.elm)
    const oldCh = oldVnode.children as VNode[]
    const ch = vnode.children as VNode[]

    if (oldVnode === vnode) return

    if (vnode.data !== undefined) {
      for (let i = 0; i < cbs.update.length; i++) cbs.update[i](oldVnode, vnode)
      vnode.data?.hook?.update?.(oldVnode, vnode)
    }

    if (isUndef(vnode.text)) {
      // 都有 children
      if (isDef(oldCh) && isDef(ch)) {
        // updateChildren
        // if(oldCh !== ch) updateChildren(elm, )
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) api.setTextContent(elm, '')
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      }
    } else if (oldVnode.text !== vnode.text) {
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
      }

      api.setTextContent(elm, vnode.text)
    }
  }

  return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
    const insertedVnodeQueue: VNodeQueue = []

    return vnode
  }
}
