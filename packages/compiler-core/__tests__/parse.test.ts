import { parse } from 'path'
import { describe, expect, test } from 'vitest'
import { tokenized } from '../src/parse'

describe('parse', () => {
  test.only('tokenized', () => {
    expect(tokenized('<div>vue</div>')).toEqual([
      { type: 'tag', name: 'p' }, // 开始标签
      { type: 'text', content: 'vue' }, // 文本节点
      { type: 'tagEnd', name: 'p' } // 结束标签
    ])
  })

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
