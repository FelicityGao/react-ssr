// 实现数据的跨组件传输

import React from 'react';
import RootContext from './root-context';

export default class Index extends React.Component<any> {
    constructor(props:any, context:any){
        super(props)
      }

    componentDidMount() {
        
    }

    changeContext = (data:any) => {
    }

    render() {
        //使用了 provider 可以让消费者订阅变化，从而重新渲染
        return (
            <RootContext.Provider value= { this.props.initData || {} } >
            { this.props.children }
            </RootContext.Provider>)
    }
}