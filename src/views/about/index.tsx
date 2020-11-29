import React, { Component } from 'react'
import { Button } from 'antd';
// import RootContext from  '@/client/root-context.tsx'
import request from '@/utils/https.ts'
import pageContainer from '@/client/page-container'


class index extends Component<any> {
  constructor(props:any, context:any){
    super(props)
  }
  // static contextType = RootContext;
  static async getInitialProps(opt:any){
    let a:any = await request('/article/show-hot')
    return {
      fetchData: {...a.data.data},
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
    const { fetchData } = this.props.initialData||{};
    return (
      <div>
        {fetchData && fetchData.data.map((item:any)=>
          <p key={item.id}>{item.article_type_name}</p>
        )}
        <Button type="primary">按钮</Button>
      </div>
    )
  }
}
export default pageContainer(index)
