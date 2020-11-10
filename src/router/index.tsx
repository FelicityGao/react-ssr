import React from 'react';
import {RouterAPI, router} from 'dva'

import routes from './routes'
import { renderRoutes } from "react-router-config";
import Provider from "../client/provider";



function RouterConfig(api:RouterAPI ) {
  const {history} = api
  const { Router, Switch } = router;
  return (
    <Router history={history}>
      
      <Switch>
      <Provider initialData={{'a':11111}}>
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