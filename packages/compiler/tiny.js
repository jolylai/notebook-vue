function tokenizer(input) {
  let current = 0
  let tokens = []

  while (current < input.length) {
    let char = input[current]

    // 解析 （）
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      })

      current++
      continue
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      })

      current++
      continue
    }

    //
    let WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++
      continue
    }

    let NUMBERS = /[0-9]/

    if (NUMBERS.test(char)) {
      let value = ''

      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: 'number', value })

      continue
    }

    if (char === '"') {
      let value = ''

      char = input[++current]

      while (char !== '"') {
        value += char
        char = input[++current]
      }
      char = input[++current]

      tokens.push({ type: 'string', value })

      continue
    }

    let LETTERS = /[a-z]/i

    if (LETTERS.test(char)) {
      let value = ''

      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: 'name', value })
      continue
    }

    throw new TypeError('I dont know what this character is: ' + char)
  }

  return tokens
}

function parser(tokens) {
  let current = 0

  function walk() {
    let token = tokens[current]

    if (token.type === 'number') {
      current++
      return { type: 'NumberLiteral', value: token.value }
    }

    if (token.type === 'string') {
      current++
      return { type: 'StringLiteral', value: token.value }
    }

    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++current]

      let node = {
        type: 'CallExpression',
        name: token.value,
        params: []
      }

      token = tokens[++current]

      while (
        token.type !== 'paren' ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        // we'll call the `walk` function which will return a `node` and we'll
        // push it into our `node.params`.
        node.params.push(walk())
        token = tokens[current]
      }

      current++

      return node
    }

    throw new TypeError(token.type + token.value)
  }

  let ast = {
    type: 'Program',
    body: []
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}

function traverser(ast, visitor) {
  function traverseArray(array, parent) {
    array.forEach(children => {
      traverseNode(children, parent)
    })
  }

  function traverseNode(node, parent) {
    let methods = visitor[node.type]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node)
        break

      default:
        break
    }
  }
}

function transformer(ast) {
  let newAst = {
    type: 'Program',
    body: []
  }

  ast._context = newAst.body
}

function compiler(input) {
  console.log('input: ', input)
  let tokens = tokenizer(input)
  console.log('tokens: ', tokens)
  let ast = parser(tokens)
  console.log('ast: ', ast)
  // let newAst = transformer(ast);
  // let output = codeGenerator(newAst);

  // // and simply return the output!
  // return output;
}

compiler('(add 2 (subtract 4 2))')
