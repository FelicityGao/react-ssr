import Koa from 'koa';
import consola from'consola';
import Router from 'koa-router';
import koaStatic from 'koa-static';
import React from 'react';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
const webpackDevMiddleware = require('webpack-dev-middleware');
// import { matchRoutes } from "react-router-config";
// import routes from '../src/router/routes.ts';
import App from '../src/App.tsx';
import webpack from 'webpack';

// 配置文件
const config = {
  port: 3030,
  host: process.env.HOST || '127.0.0.1'
};
const webpackConfig = require('../config/webpackServer.config.js');
// 实例化 koa
const app = new Koa();
const router = new Router();
// const branch = matchRoutes(routes, path);
const ROOT_PATH = process.cwd();

const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  // publicPath: webpackConfig.output.publicPath
}));

// //得到要渲染的组件
// const Component = branch[0].route.component;

// 静态资源
app.use(
  koaStatic(path.join(__dirname, '../build'), {
    maxage: 365 * 24 * 60 * 1000,
    index: 'root' 
    // 这里配置不要写成'index'就可以了，因为在访问localhost:3030时，不能让服务默认去加载index.html文件，这里很容易掉进坑。
  })
);

// 设置路由
app.use(
  router
    .get('*', async (ctx, next) => {
      ctx.response.type = 'html'; //指定content type
      let shtml = '';
      await new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../build/index.html'), 'utf-8', function(err, data) {
          if (err) {
            reject();
            return console.log(err);
          }
          shtml = data;
          resolve();
        });
      });
      // 替换掉 {{root}} 为我们生成后的HTML
      ctx.response.body = shtml.replace('{{root}}', renderToString(<App />));
    })
    .routes()
);
// //查找组件
// const branch = matchRoutes(routes,url);
// //得到组件
// const Component = branch[0].route.component;
// //将组件渲染为 html 字符串
// const html = renderToString(<Component data={data}/>);
// res.end(html);
app.listen(config, function() {
  consola.ready({
    message: `Server listening on http://${config.host}:${config.port}`,
    badge: true
  })
});
