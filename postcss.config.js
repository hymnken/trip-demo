module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, //设计稿大小
      selectorBlackList: ['favor']
    },
  },
};