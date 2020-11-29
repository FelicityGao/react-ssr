import React from 'react';
import {RouterAPI, router} from 'dva'

import routes from './routes'
import { renderRoutes } from "react-router-config";
// import Provider from "../client/provider";

function entryIndex(){
  //  取得数据'
  let stateText:any = document.getElementById('krs-server-render-data-box')
  if(stateText){
    window.__INITIAL_DATA__=JSON.parse(stateText.value || '{}')
  }
}
function RouterConfig(api:RouterAPI ) {
  const {history} = api
  const { Router, Switch } = router;
  entryIndex()
  return (
    <Router history={history}>
      <Switch>
      {renderRoutes(routes)}
        {/* {
          routes.map((route, i) => (
            <Route key={i} path={route.path} component={route.component} 
            exact={route.exact} />
          ))
        } */}
      </Switch>
      
    </Router>
  );
}

export default RouterConfig;