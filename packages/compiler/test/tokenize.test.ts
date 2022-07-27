import { describe, expect, test } from 'vitest'
import tokenize from '../src/tokenize'

describe('tokenize', () => {
  test('single tag', () => {
    expect(tokenize('<div>vue</div>')).toEqual([
      { type: 'tag', name: 'p' }, // 开始标签
      { type: 'text', content: 'vue' }, // 文本节点
      { type: 'tagEnd', name: 'p' } // 结束标签
    ])
  })

  test('multiple tag', () => {
    const tokens = tokenize(`<div><p>Vue</p><p>Template</p></div>`)
    const ast = [
      { type: 'tag', name: 'div' }, // 开始标签
      { type: 'tag', name: 'p' }, // 开始标签
      { type: 'text', content: 'Vue' }, // 文本节点
      { type: 'tagEnd', name: 'p' }, // 结束标签
      { type: 'tag', name: 'p' }, // 开始标签
      { type: 'text', content: 'Template' }, // 文本节点
      { type: 'tagEnd', name: 'p' }, // 结束标签
      { type: 'tagEnd', name: 'div' } // 结束标签
    ]

    expect(1).toEqual(2)
    expect(tokens).toEqual(ast)
  })
})
