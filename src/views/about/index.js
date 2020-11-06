import React, { Component } from 'react'

export default class index extends Component {
  constructor(props){
    console.log('props',props)
    super(props)
  }
  static getInitialProps(opt){
    return {
      title: '关于我们',
      text: '首先先明确，用node+ts的目的，为什么不ng+ts。这一点后面还会反复提醒自己 node毕竟不是ng'
    }
  }
  render() {
    return (
      <div>
        <h3>{this.props.data.title}</h3>
        <p>{this.props.data.text}</p>
        
      </div>
    )
  }
}
