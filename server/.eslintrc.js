module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "globals": {
    "__DEV__": true,
    "Raven": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "rules": {
    "no-console": "off",
    "arrow-spacing": 2, // 强制箭头函数的箭头前后使用一致的空格
    "no-var":2, //禁止var
    'comma-spacing': [ 'error', { before: false, after: true }],
    "brace-style": 2, //强制在代码块中使用一致的大括号风格
    "block-spacing": [2, "always"], // 强制在单行代码块中使用一致的空格
    "no-this-before-super": 2, 
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }],//该规则规定了在对象字面量语法中，key和value之间的空白，冒号前不要空格，冒号后面需要一个空格
    "object-curly-spacing": ["error", "always"],//大括号内是否允许不必要的空格
    "brace-style": [1, "1tbs"],//大括号风格
    "no-const-assign":2,// 禁止修改 const 声明的变量
    "no-undef":0,
    'array-bracket-spacing': [ 'error', 'always', {
      objectsInArrays: false,
      arraysInArrays: false,
    }],
    'space-before-function-paren': [ 'error', {
      anonymous: 'always',
      named: 'never',
    }],
    "space-before-blocks": [2, "always"], 
    "space-unary-ops": "error",
    "space-infix-ops": "error",
    "indent": ["error", 2],
    "linebreak-style": "off",
    "quotes": ["error", "single"],
    "semi": ["error", "never"]
  }
};