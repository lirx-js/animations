[![npm (scoped)](https://img.shields.io/npm/v/@lirx/animations.svg)](https://www.npmjs.com/package/@lirx/animations)
![npm](https://img.shields.io/npm/dm/@lirx/animations.svg)
![NPM](https://img.shields.io/npm/l/@lirx/animations.svg)
![npm type definitions](https://img.shields.io/npm/types/@lirx/animations.svg)

## @lirx/animations

## 📦 Installation

```bash
yarn add @lirx/animations
# or
npm install @lirx/animations --save
```

This library supports:

- **common-js** (require): transpiled as es2015, with .cjs extension, useful for old nodejs versions
- **module** (esm import): transpiled as esnext, with .mjs extension (requires node resolution for external packages)

In a **node** environment the library works immediately (no extra tooling required),
however, in a **browser** environment, you'll probably need to resolve external imports thought a bundler like
[snowpack](https://www.snowpack.dev/),
[rollup](https://rollupjs.org/guide/en/),
[webpack](https://webpack.js.org/),
etc...
or directly using [skypack](https://www.skypack.dev/):
[https://cdn.skypack.dev/@lirx/animations](https://cdn.skypack.dev/@lirx/animations)
