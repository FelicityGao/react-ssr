import React, { Component } from 'react'
import { Button } from 'antd';


export default class index extends Component<any> {
  constructor(props:any){
    console.log('props',props)
    super(props)
  }
  static getInitialProps(opt:any){
    // let a = await fetch(xxxx)
    return {
      title: '关于我们',
      text: '首先先明确，用node+ts的目的，为什么不ng+ts。这一点后面还会反复提醒自己 node毕竟不是ng'
    }
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
