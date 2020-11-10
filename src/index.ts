
import * as serviceWorker from './serviceWorker';
import dva from 'dva';
import './index.less';
import { createBrowserHistory } from 'history'

// 1. Initialize
const app = dva({
  history: createBrowserHistory(),
});
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router/index').default);

// 5. Start
app.start('#root');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
