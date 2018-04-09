This repo is for bug reproduction, an issue with @babel/register applied with monorepo-structured packages using [Yarn Workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/).

# How to reproduce
```
yarn
yarn test
```

If you can see the following error message, it's reproducted.

```
/path/to/babel-register-with-upper-dir/packages/pkg-b/index.js:1
(function (exports, require, module, __filename, __dirname) { export default { name: 'pkg-b'  }
                                                              ^^^^^^
SyntaxError: Unexpected token export
```

# Description
monorepo structure 
```
├── node_modules
│   ├── pkg-a -> ../packages/pkg-a
│   ├── pkg-b -> ../packages/pkg-b
│   ...
├── README.md
├── package.json
├── packages
│   ├── pkg-a
│   │   ├── index.js
│   │   ├── package.json
│   │   └── test.js
│   └── pkg-b
│       ├── index.js
│       └── package.json
└── yarn.lock
```

- `packages` contains two workspaces. `pkg-a` and `pkg-b`.
- `pkg-a` depends on `pkg-b`.
- All packages are located on `node_modules` at the project root.
- `pkg-a` and `pkg-b` are also symlinked at `node_modules` at the project root.
- A test is written using [mocha](https://github.com/mochajs/mocha) at `pkg-a`.
- mocha is passed `--compiler js:@babel/register` option.
- As `pkg-a` uses `pkg-b`, `pkg-b/index.js` will be imported at the test.
- Then, `pkg-b/index.js` **cannot be applied babel**. This is an unexpected behavior.
- At `.babelrc`, `only` option is specified and `pkg-b` should be the target.

