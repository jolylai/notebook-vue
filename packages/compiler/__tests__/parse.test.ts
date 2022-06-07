import { describe, expect, test } from 'vitest'
import parse from '../src/parse'

describe('parse', () => {
  test('parse', () => {
    const template = `<div>
      <p>Vue</p>
      <p>Template</p>
    </div>`
    const templateAst = [
      { type: 'tag', name: 'div' }, // div开始标签节点
      { type: 'tag', name: 'p' }, //  p开始标签节点
      { type: 'text', content: 'Vue' }, //文本节点
      { type: 'tagEnd', name: 'p' }, // p结束标签节点
      { type: 'tag', name: 'p' }, //  p开始标签节点
      { type: 'text', content: 'Template' }, //文本节点
      { type: 'tagEnd', name: 'p' }, // p结束标签节点
      { type: 'tagEnd', name: 'div' } // div结束标签节点
    ]
    expect(parse(template)).toEqual(templateAst)
  })
})
