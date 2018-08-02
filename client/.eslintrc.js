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
    "eslint:recommended",
    "plugin:react/recommended"
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
  "plugins": [
    "react"
  ],
  "rules": {
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
    "no-console":0,
    "space-unary-ops": "error",
    "space-infix-ops": "error",
    "indent": ["error", 2],
    "linebreak-style": "off",
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "jsx-quotes": [2, "prefer-double"], //强制在JSX属性（jsx-quotes）中一致使用双引号
    "react/display-name": 0, //防止在React组件定义中丢失displayName
    "react/forbid-prop-types": [2, {"forbid": ["any"]}], //禁止某些propTypes
    "react/jsx-boolean-value": 2, //在JSX中强制布尔属性符号
    "react/jsx-closing-bracket-location": 1, //在JSX中验证右括号位置
    "react/jsx-curly-spacing": [2, {"when": "always", "children": true}], //在JSX属性和表达式中加强或禁止大括号内的空格。
    "react/jsx-indent-props": [2, 4], //验证JSX中的props缩进
    "react/jsx-key": 2, //在数组或迭代器中验证JSX具有key属性
    "react/jsx-max-props-per-line": [1, {"maximum": 4}], // 限制JSX中单行上的props的最大数量
    "react/jsx-no-bind": 0, //JSX中不允许使用箭头函数和bind
    "react/jsx-no-duplicate-props": 2, //防止在JSX中重复的props
    "react/jsx-no-literals": 0, //防止使用未包装的JSX字符串
    "react/jsx-no-undef": 1, //在JSX中禁止未声明的变量
    "react/jsx-pascal-case": 0, //为用户定义的JSX组件强制使用PascalCase
    "react/jsx-sort-props": 0, //强化props按字母排序
    "react/jsx-uses-react": 1, //防止反应被错误地标记为未使用
    "react/jsx-uses-vars": 2, //防止在JSX中使用的变量被错误地标记为未使用
    "react/no-danger": 0, //防止使用危险的JSX属性
    "react/no-did-mount-set-state": 0, //防止在componentDidMount中使用setState
    "react/no-did-update-set-state": 1, //防止在componentDidUpdate中使用setState
    "react/no-direct-mutation-state": 2, //防止this.state的直接变异
    "react/no-multi-comp": 0, //防止每个文件有多个组件定义
    "react/no-set-state": 0, //防止使用setState
    "react/no-unknown-property": 2, //防止使用未知的DOM属性
    "react/prefer-es6-class": 2, //为React组件强制执行ES5或ES6类
    "react/prop-types": 2, //防止在React组件定义中丢失props验证
    "react/react-in-jsx-scope": 2, //使用JSX时防止丢失React
    "react/self-closing-comp": 0, //防止没有children的组件的额外结束标签
    "react/sort-comp": 2, //强制组件方法顺序
    "no-extra-boolean-cast": 0, //禁止不必要的bool转换
    "react/no-array-index-key": 0, //防止在数组中遍历中使用数组key做索引
    "react/no-deprecated": 1, //不使用弃用的方法
    "react/jsx-equals-spacing": [2, "always"] //在JSX属性中强制或禁止等号周围的空格
  }
};