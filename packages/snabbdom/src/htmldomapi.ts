export interface DOMAPI {
  tagName: (elm: Element) => string
  createComment: (text: string) => Comment
  createElement: (tagName: any, options?: ElementCreationOptions) => any
  createTextNode: (text: string) => Text
  insertBefore: (
    parentNode: Node,
    insertNode: Node,
    referenceNode?: Node | null
  ) => void
  appendChild: (node: Node, child: Node) => void
  getTextContent: (node: Node) => string | null
  setTextContent: (node: Node, text: string | null) => void
  parentNode: (node: Node) => Node | null
  removeChild: (node: Node, child: Node) => void
  nextSibling: (node: Node) => Node | null
}

function tagName(el: Element): string {
  return el.tagName
}

function createElement(tagName: any, options?: ElementCreationOptions): Node {
  return document.createElement(tagName, options)
}

function createComment(text: string): Comment {
  return document.createComment(text)
}

function createTextNode(text: string): Text {
  return document.createTextNode(text)
}

function appendChild(node: Node, child: Node): void {
  node.appendChild(node)
}

function insertBefore(
  parentNode: Node,
  insertNode: Node,
  referenceNode?: Node | null
) {
  parentNode.insertBefore(insertNode, referenceNode)
}

function setTextContent(node: Node, text: string | null): void {
  node.textContent = text
}

function getTextContent(node: Node): string | null {
  return node.textContent
}

function parentNode(node: Node): Node | null {
  return node.parentNode
}

function removeChild(node: Node, child: Node) {
  node.removeChild(child)
}

function nextSibling(node: Node): Node | null {
  return node.nextSibling
}
export const htmlDomApi: DOMAPI = {
  tagName,
  createComment,
  createElement,
  createTextNode,
  appendChild,
  insertBefore,
  getTextContent,
  setTextContent,
  parentNode,
  removeChild,
  nextSibling
}
