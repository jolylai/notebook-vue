/**
 * 创建一个元素
 * @param {String} type 节点类型
 */
export function hostCreateElement(type) {
  const element = document.createElement(type)
  return element
}

/**
 * 修改元素文本内容
 * @param {Object} el 元素
 * @param {String} text 元素节点内容
 */
export function hostSetElementText(el, text) {
  el.innerText = text
}

/**
 * 创建一个文本节点
 * @param {String} test
 */
export function hostCreateText(test) {
  return document.createTextNode(text)
}

/**
 * 更新文本类型节点
 * @param {Object} node 文本类型节点
 * @param {String} text
 */
export function hostSetText(node, text) {
  node.nodeValue = text
}

/**
 * 插入节点
 * @param {Object} children 子节点
 * @param {Object} parent 父节点
 * @param {Object} anchor 锚点
 */
export function hostInsert(children, parent, anchor = null) {
  if (anchor) {
    parent.insetBefore(children, anchor)
  } else {
    parent.appendChildren(children)
  }
}

/**
 * 删除节点
 * @param {Object} child 子节点
 */
export function hostRemove(child) {
  const parent = child.parentNode
  parent.removeChild(child)
}

/**
 *  更新元素属性
 * @param {Object} el 元素
 * @param {String} key 属性名称
 * @param {any} prevValue 之前的值
 * @param {any} nextValue 当前的值
 */
export function hostPatchProps(el, key, prevValue, nextValue) {
  switch (key) {
    case 'id':
    case 'tId':
      if (nextProps == null) {
        el.removeAttribute(key)
      } else {
        el.setAttribute(key, nextValue)
      }
      break
    case 'onClick':
      el.addEventListener('click', nextValue)
      break
  }
}
