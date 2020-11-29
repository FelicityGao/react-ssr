//高阶组件 用于提取重复逻辑

import React, { Component } from 'react'

let _this = null;
let _isPop = false;//是否触发过popState
let _isMount = false;//组件是否挂载完成
const popStateCallback = () => {
  if (_this && _this.getInitialProps) {
    _isPop = true;
    if (_isMount) {//只有当前组件挂载后才能执行数据预取，否则会报错
      _this.getInitialProps();
    }
  }
};
export default (SourceComponent) => {
  return class HoComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        initialData: {},
        canClientFetch: false//浏览器端是否需要请求数据
      }
    }
    //用于服务端调用
    static async getInitialProps(ctx) {
      return SourceComponent.getInitialProps ? await SourceComponent.getInitialProps(ctx) : {};
    }

    //用于封装处理
    async getInitialProps() {
      // ssr首次进入页面以及csr/ssr切换路由时才调用组件的getInitialProps方法
      const { match, location } = this.props;
      const res = SourceComponent.getInitialProps ? await SourceComponent.getInitialProps({ match, location }) : {};
      this.setState({
        initialData: res,
        canClientFetch: true
      })
      let tdk = res.page;
      if (tdk) {
        document.title = tdk.title.value;
        document.querySelector("meta[name='keywords']").setAttribute('content', tdk.keywords.value)
        document.querySelector("meta[name='description']").setAttribute('content', tdk.description.value)
      }
    }

    async componentDidMount() {
      //注册事件，用于在页面回退和前进的时候触发
      _isMount = true;
      if (window && window.__IS__SSR__) {//只有当启用 ssr 时
        _this = this;
        window.addEventListener('popstate', popStateCallback);
        if (_isPop) {//如果前进或者后退 则需要异步获取数据
          this.getInitialProps();
        }
      }
      const canClientFetch = this.props.history && this.props.history.action === 'PUSH';//路由跳转的时候可以异步请求数据
      if (canClientFetch || !window.__IS__SSR__) {
        await this.getInitialProps();
      }
    }

    componentWillUnmount() {
      _isPop = false; //重置为未触发
      _isMount = false;//重置为未挂载
    }

    render() {
      // 只有在首次进入页面需要将window.__INITIAL_DATA__作为props，路由切换时不需要
      const props = {
        initialData: {},
        ...this.props
      };
      if (global.__SERVER__) {
        //服务端渲染
        props.initialData = this.props.initialData || {};
      } else {
        //客户端渲染
        if (this.state.canClientFetch) {//需要异步请求数据
          props.initialData = this.state.initialData || {};
        } else {
          props.initialData = window.__INITIAL_DATA__;
          window.__INITIAL_DATA__ = null;//使用过后清除数据,否则其他页面会使用

        }
      }
      return <SourceComponent  {...props}></SourceComponent>
    }
  }
}