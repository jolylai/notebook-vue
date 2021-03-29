import { createVNode } from './vnode'
import { render } from './renderer'

export function createApp(rootComponent) {
  const app = {
    _component: rootComponent,
    mount(rootContainer) {
      const vnode = createVNode(rootComponent)
      render(vnode, rootContainer)
    }
  }

  return app
}
