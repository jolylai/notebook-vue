import { ShapeFlags } from '../../shared'

/**
 *
 * @param {String | Object | Function} type HTML 标签名、组件或异步组件。使用返回 null 的函数将渲染一个注释。此参数是必需的。
 * @param {Object} props 一个对象，与我们将在模板中使用的 attribute、prop 和事件相对应。可选。
 * @param {String | Array | Object} children 子代 VNode，使用 h() 生成，或者使用字符串来获取“文本 VNode”，或带有插槽的对象。可选。
 */
export function createVNode(type, props, children) {
  const vnode = {
    el: null,
    component: null,
    key: props.key || null,
    type,
    props,
    children,
    shapeFlag: getShapeFlag(type)
  }

  normalizeChildren(vnode, children)

  return vnode
}

/**
 * 标记节点类型
 * @param {Object} vnode 虚拟节点
 * @param {String | Array | Object} children 子节点
 */
function normalizeChildren(vnode, children) {
  // 判断子节点类型
  if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  } else if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  }

  if (typeof children === 'object') {
    // 暂时主要是为了标识出 slots_children 这个类型来
    // 暂时我们只有 element 类型和 component 类型的组件
    // 所以我们这里除了 element ，那么只要是 component 的话，那么children 肯定就是 slots 了
    if (vnode.shapeFlag & ShapeFlags.ELEMENT) {
      // 如果是 element 类型的话，那么 children 肯定不是 slots
    } else {
      // 这里就必然是 component 了,
      vnode.shapeFlag |= ShapeFlags.SLOTS_CHILDREN
    }
  }
}

export const Text = Symbol('Text')

/**
 * 创建一个文本节点
 * @param {String} text
 */
export function createTextNode(text) {
  return createVNode(Text, {}, text)
}

/**
 * 基于 type 来判断是什么类型的组件
 * @param {String | Object | Function} type
 */
function getShapeFlag(type) {
  return typeof type === 'string'
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT
}
