import React from 'react';
import {RouterAPI, router} from 'dva'

import routes from './routes'
import { renderRoutes } from "react-router-config";



function RouterConfig(api:RouterAPI ) {
  const {history} = api
  const { Router, Switch } = router;
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