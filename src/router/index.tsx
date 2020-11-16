import React from 'react';
import {RouterAPI, router} from 'dva'

import routes from './routes'
import { renderRoutes } from "react-router-config";
import Provider from "../client/provider";

function entryIndex(){
  //  取得数据'
  let APP_INIT_DATA = {}
  let stateText:any = document.getElementById('krs-server-render-data-box')
  //let stateText:any = window.__KOASSR__;
  if(stateText){
    APP_INIT_DATA = JSON.parse(stateText.value || '{}')
  }
  return  APP_INIT_DATA
}
function RouterConfig(api:RouterAPI ) {
  const {history} = api
  const { Router, Switch } = router;
  const data = entryIndex()
  return (
    <Router history={history}>
      <Switch>
      <Provider initData ={data}>
      {renderRoutes(routes)}
        {/* {
          routes.map((route, i) => (
            <Route key={i} path={route.path} component={route.component} 
            exact={route.exact} />
          ))
        } */}
        </Provider>
      </Switch>
      
    </Router>
  );
}

export default RouterConfig;