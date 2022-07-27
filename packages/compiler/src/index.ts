import generate from './generate'
import parse from './parse'
import tokenize from './tokenize'
import transform from './transform'

function compiler(template) {
  const tokens = tokenize(template)
  const ast = parse(tokens)
  const transformedAst = transform(ast)
  const code = generate(transformedAst)
  return code
}

export default compiler
