## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es6",
    "moduleResolution": "node",
    "module": "commonjs",
    "strict": true,
    "declaration": true,
    // 若有未使用的局部变量则抛错
    "noUnusedLocals": true,
    "esModuleInterop": true
  }
}
```

`target`：指定编译出来的 ECMAScript 目标版本 "ES3"（默认）， es3, es5, es6/es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, or esnext
`module` :用来指定要使用的模块化规范"None"， "CommonJS"， "AMD"， "System"， "UMD"， "ES6"或 "ES2015"。
`moduleResolution`: 决定如何处理模块。或者是"Node"对于 Node.js/io.js，或者是"Classic"（默认）。
`declaration`: 生成相应的 .d.ts 文件。
`noUnusedLocals`: 若有未使用的局部变量则抛错。

## Jest

```shell
yarn add --dev jest typescript

yarn add --dev ts-jest @types/jest

yarn ts-jest config:init

yarn test or yarn jest
```

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
