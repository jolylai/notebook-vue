import {
  hostInsert,
  hostCreateText,
  hostSetText,
  hostCreateElement,
  hostSetElement,
  hostSetElementText,
  hostPatchProps
} from '../../runtime-dom/src/index'
import { ShapeFlags } from '../../shared/shapeFlags'

/**
 * 将虚拟节点渲染到 HTML 节点上
 * @param {Object} vnode 虚拟节点
 * @param {Object} container HTML 容器节点
 */
export function renderer(vnode, container) {
  patch(null, vnode, container)
}

/**
 *
 * @param {Object} n1 旧的虚拟节点
 * @param {Object} n2 新的虚拟节点
 * @param {Object} container HTML 容器节点
 * @param {Object} parentComponent 父节点
 */
export function patch(n1, n2, container = null, parentComponent = null) {
  const { type, shapeFlag } = n2

  switch (type) {
    // 文本类型节点
    case Text:
      processText(n1, n2, container)
      break

    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement()
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent()
      }
      break
  }
}

/**
 * 处理文本节点
 * @param {Object} n1 旧的虚拟节点
 * @param {Object} n2 新的虚拟节点
 * @param {Object} container HTML 容器元素
 */
export function processText(n1, n2, container) {
  if (n1 == null) {
    // 创建文本节点
    hostInsert((n2.el = hostCreateText(n2.children)), container)
  } else {
    // 更新文本节点
    const el = (n2.el = n1.el)
    if (n2.children !== n1.children) {
      hostSetText(el, n2.children)
    }
  }
}

export function processElement(n1, n2, container) {
  if (n1 == null) {
    mountElement(n2, container)
  } else {
  }
}

export function mountElement(vnode, container) {
  const { shapeFlag, props } = vnode

  const el = (vnode.el = hostCreateElement(vnode.type))

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    hostSetElementText(el, vnode.children)
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(el.children, el)
  }

  // 设置 el 属性
  if (props) {
    for (let key in props) {
      const nextValue = props[key]
      hostPatchProps(el, key, null, nextValue)
    }
  }

  // todo
  // 触发 beforeMount() 钩子
  console.log('vnodeHook  -> onVnodeBeforeMount')
  console.log('DirectiveHook  -> beforeMount')
  console.log('transition  -> beforeEnter')

  // 插入
  hostInsert(el, container)

  // todo
  // 触发 mounted() 钩子
  console.log('vnodeHook  -> onVnodeMounted')
  console.log('DirectiveHook  -> mounted')
  console.log('transition  -> enter')
}

export function mountChildren(children, container) {
  children.forEach(VNodeChild => {
    patch(null, VNodeChild, container)
  })
}

/**
 * 更新元素
 * @param {Object} n1 旧的虚拟节点
 * @param {Object} n2 新的虚拟节点
 * @param {Object} container HTML 容器
 */
export function updateElement(n1, n2, container) {}
