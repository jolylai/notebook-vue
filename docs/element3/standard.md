---
title: 开发规范
---

## 项目目录结构

## 代码规范

安装依赖

```shell
yarn add eslint -D
yarn add eslint-formatter-pretty -D
yarn add eslint-plugin-json -D
yarn add eslint-plugin-prettier -D
yarn add eslint-plugin-vue -D
yarn add @vue/eslint-config-prettier -D
yarn add babel-eslint -D
yarn add prettier -D
```

创建 `.eslintrc.js` 定义代码效验规则

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  globals: {
    ga: true,
    chrome: true,
    __DEV__: true
  },
  extends: [
    'plugin:json/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/prettier'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error'
  }
}
```

创建 `.eslintignore` 排除不需要进行代码效验的文件和文件夹

```
src/utils/popper.js
src/utils/date.js
examples/play
*.sh
node_modules
lib
coverage
*.md
*.scss
*.woff
*.ttf
src/index.js
dist
```

package.json

```json
{
  "scripts": {
    "lint": "eslint --no-error-on-unmatched-pattern --ext .vue --ext .js --ext .jsx packages/**/ src/**/ --fix"
  }
}
```

## git 版本规范

#### Commit 规范

内容规范

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

大致分为三个部分(使用空行分割):

1. 标题行: 必填, 描述主要修改类型和内容
2. 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
3. 页脚注释: 可以写注释，BUG 号链接

   - `feat`: 新功能、新特性
   - `fix`: 修改 bug
   - `perf`: 更改代码，以提高性能
   - `refactor`: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
   - `docs`: 文档修改
   - `style`: 代码格式修改, 注意不是 css 修改（例如分号修改）
   - `test`: 测试用例新增、修改
   - `build`: 影响项目构建或依赖项修改
   - `revert`: 恢复上一次提交
   - `ci`: 持续集成相关文件修改
   - `chore`: 其他修改（不在上述类型中的修改）
   - `release`: 发布新版本
   - `workflow`: 工作流相关文件修改

4. scope: commit 影响的范围, 比如: route, component, utils, build...
5. subject: commit 的概述
6. body: commit 具体修改内容, 可以分为多行.
7. footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

[查看 Vue 仓库代码提交规范](https://github.com/vuejs/vue/pulls)

**fix（修复 BUG）**

如果修复的这个 BUG 只影响当前修改的文件，可不加范围。如果影响的范围比较大，要加上范围描述。

例如这次 BUG 修复影响到全局，可以加个 `global`。如果影响的是某个目录或某个功能，可以加上该目录的路径，或者对应的功能名称。

```
// 示例1
fix(global):修复checkbox不能复选的问题

// 示例2 下面圆括号里的 common 为通用管理的名称
fix(common): 修复字体过小的BUG，将通用管理下所有页面的默认字体大小修改为 14px

// 示例3
fix: value.length -> values.length
```

**feat（添加新功能或新页面）**

```
feat: 添加网站主页静态页面
这是一个示例，假设对点检任务静态页面进行了一些描述。

这里是备注，可以是放BUG链接或者一些重要性的东西。
```

**chore（其他修改）**

chore 的中文翻译为日常事务、例行工作，顾名思义，即不在其他 commit 类型中的修改，都可以用 chore 表示。

```
chore: 将表格中的查看详情改为详情
```

## 自动化提交效验

安装 `husky` （哈士奇）

```shell
yarn add -D husky chalk
```

在 `package.json` 加上下面的代码

```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "node script/verify-commit.js",
    "pre-push": "npm test"
  }
}
```

现在来解释下各个钩子的含义：

1. `"pre-commit": "npm run lint"`，在 git commit 前执行 npm run lint 检查代码格式。
2. `"commit-msg": "node script/verify-commit.js"`，在 git commit 时执行脚本 verify-commit.js 验证 commit 消息。如果不符合脚本中定义的格式，将会报错。
3. `"pre-push": "npm test"`，在你执行 git push 将代码推送到远程仓库前，执行 npm test 进行测试。如果测试失败，将不会执行这次推送。

然后在你项目根目录下新建一个文件夹 `script`，并在下面新建一个文件 `verify-commit.js`，输入以下代码：

```js
const msgPath = process.env.HUSKY_GIT_PARAMS
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim()
const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/
if (!commitRE.test(msg)) {
  console.log()
  console.error(`
        不合法的 commit 消息格式。
        请查看 git commit 提交规范：https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md
    `)
  process.exit(1)
}
```

/scripts/verifyCommit.js

```js
// Invoked on the commit-msg git hook by yorkie.
const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim()
const commitRE = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?(.{1,10})?: .{1,50}/
const mergeRe = /^(Merge pull request|Merge branch)/
if (!commitRE.test(msg)) {
  if (!mergeRe.test(msg)) {
    console.log(msg)
    console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
        `invalid commit message format.`
      )}\n\n` +
        chalk.red(
          `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
        ) +
        `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
        `    ${chalk.green(
          `fix(v-model): handle events on blur (close #28)`
        )}\n\n` +
        chalk.red(
          `  See https://github.com/vuejs/vue-next/blob/master/.github/commit-convention.md for more details.\n`
        )
    )
    process.exit(1)
  }
}
```

## 文件命名规范

[风格指南](https://cn.vuejs.org/v2/style-guide/index.html)

#### Component

除了 `index.vue`所有的 `Component` 文件都是以大写开头 (PascalCase)，这也是官方推荐的。

- `@/src/components/BackToTop/index.vue`
- `@/src/components/Charts/Line.vue`
- `@/src/views/example/components/Button.vue`

#### JS 文件

所有的.js 文件都遵循横线连接 (kebab-case)。

- `@/src/utils/open-window.js`
- `@/src/views/svg-icons/require-icons.js`
- `@/src/components/MarkdownEditor/default-options.js`

#### Views

在 views 文件下，代表路由的`.vue` 文件都使用横线连接 (kebab-case)，代表路由的文件夹也是使用同样的规则。

- `@/src/views/svg-icons/index.vue`
- `@/src/views/svg-icons/require-icons.js`

使用横线连接 (kebab-case)来命名 views 主要是出于以下几个考虑。

横线连接 (kebab-case) 也是官方推荐的命名规范之一 文档
views 下的.vue 文件代表的是一个路由，所以它需要和 component 进行区分(component 都是大写开头)
页面的 url 也都是横线连接的，比如https://www.xxx.admin/export-excel，所以路由对应的view应该要保持统一
没有大小写敏感问题
