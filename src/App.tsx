import React, { Component } from "react";

import logo from "./logo.svg";
import './app.less';


class App extends Component {
  
  static getInitialProps(opt:any){
    // let a = await fetch(xxxx)
    return {
      title: '关于我们',
      text: '首先先明确，用node+ts的目的，为什么不ng+ts。这一点后面还会反复提醒自己 node毕竟不是ng'
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
