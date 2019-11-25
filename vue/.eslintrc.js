module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'plugin:vue/essential',
      '@vue/standard'
    ],
    rules: {
      //'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // 不强制要求代码分号
      'semi': 0,
      // 不强制缩进格式
      'indent': 0,
      // 关闭函数名称跟括号直接的空格检测
      'space-before-function-paren': 0,
      // 忽略大括号内的空格
      'object-curly-spacing': 0
    },
    parserOptions: {
      parser: 'babel-eslint'
    }
  }