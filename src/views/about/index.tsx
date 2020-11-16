import React, { Component } from 'react'
import { Button } from 'antd';
import RootContext from  '@/client/root-context.tsx'
import request from '@/utils/https.ts'


export default class index extends Component<any> {
  constructor(props:any, context:any){
    super(props)
  }
  static contextType = RootContext;
  static async getInitialProps(opt:any){
    let a = await request('/article/show-hot')
    return {
      fetchData: {a},
      page: {
        title: {name: 'title',value:'关于我们' },
        keywords:{name: 'meta', value:'ssr, react, koa'},
        description:{name: 'meta', value:'我是一段描述'},
      }
    };
  }
  componentDidMount(){
    // 客户端渲染时调用
  }
  render() {
    return (
      <div>
        <h3>清清浅浅1111</h3>
        <p>的点点滴滴</p>
        <Button type="primary">wwwww</Button>
      </div>
    )
  }
}
