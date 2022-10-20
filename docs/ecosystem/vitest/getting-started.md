
安装 vitest
```shell
// 使用 npm
$ npm install -D vitest

// 使用 yarn
$ yarn add -D vitest

// 使用 pnpm
$ pnpm add -D vitest
```
在构建可靠的应用程序时，自动化测试可以在构建新特性、重构代码和修复 BUG 方面发挥关键作用。
在一个 Vue 应用程序中，自动化测试可以覆盖不同类型的需要：

- **逻辑**：验证非 UI 层面的渲染逻辑是否正确实现。这通常涉及整个应用的业务逻辑（如状态管理存储）和一些工具函数。
- **视图**：给出特定的 props / 状态输入，验证单个组件以及整个组件树是否按照预期渲染出了正确的视图。
- **交互**：模拟用户行为，例如单击或输入，验证单个组件或整个组件树是否呈现正确的更新输出。
- **用户体验**：模拟用户在尝试解决一个问题时所需的一系列交互动作，查看最终效果是否符合预期。

对于不同的测试需求，我们需要使用不同的测试技术方案：

- **单元测试** 涵盖了一系列 **逻辑** 测试。
- **组件测试** 涵盖了 **视图** 和 **交互** 的测试。
- **端到端（E2E）测试** 对应了 **用户体验** 的测试。

## Jest 配置
ESM
```shell

yarn add --dev @babel/core @babel/plugin-transform-modules-commonjs babel-jest
```
```javascript
//	babel.config.js
module.exports = {
  env: {
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"]
    }
  }
};

// jest.config.js
module.exports = {
  "transform": {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
};
```

