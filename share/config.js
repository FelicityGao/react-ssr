module.exports = {
  __IS_SSR__: true,//是否为 ssr 模式
  asyncComponentKey: '__IS_ASYNC_COMP_FLAG__',//标志组件是否是按需加载 turn | false
  page: {
    title: { name: 'title', value: '首页' },
    keywords: { name: 'meta', value: '我是默认的keywords' },
    description: { name: 'meta', value: '我是默认的一段描述' },
  }
}