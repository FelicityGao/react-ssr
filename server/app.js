import Koa from 'koa';
import consola from 'consola';
import Router from 'koa-router';
import koaStatic from 'koa-static';
import React from 'react';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from "react-router-config";
import routes from '@/router/routes.ts';
import cnf from '../share/config.js'
import { insertString } from '@/utils/utils.ts'
import proConfig from '../share/config'


// 配置文件
const config = {
  port: 3000,
  host: process.env.HOST || '127.0.0.1'
};
// 实例化 koa
const app = new Koa();
const router = new Router();
const ROOT_PATH = process.cwd();

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
      let shtml = '',
        fetchResult = {},//属于预取结果
        metaHtml = '',
        page = cnf.page || {};
      await new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../build/index.html'), 'utf-8', function (err, data) {
          if (err) {
            reject();
            return console.log(err);
          }
          shtml = data;
          resolve();
        });
      });
      // 路由同构
      const branch = matchRoutes(routes, ctx.request.url);
      //得到要渲染的组件
      const Component = branch[0].route.component;
      // 数据预取
      let fetchDataFn;
      fetchDataFn = Component.getInitialProps ? Component.getInitialProps : null;
      if (fetchDataFn) {
        fetchResult = await fetchDataFn(branch[0].match.params);
        if (fetchResult.page) {
          page = fetchResult.page
        }
      }
      // 循环出meta
      for (let key in page) {
        switch (page[key].name) {
          case 'title':
            // 替换掉原来的title标签
            shtml = shtml.replace(/<title>.+<\/title>/g, `<title>${page[key].value}</title>`)
            break;
          case 'meta':
            metaHtml += `<meta name="${key}" content="${page[key].value}"/>`;
            break;
          case 'script':
            metaHtml += `<l src="${page[key].value}"/></l>`;
            break;
          case 'link':
            metaHtml += `<link href="${page[key].value}"/></link>`;
            break;
        }
      }
      // 数据注入
      const propsData = `<textarea id="krs-server-render-data-box" style="display:none" > ${JSON.stringify(fetchResult)} </textarea>`
      const windowVar = `<script>window.__IS__SSR__=${proConfig.__IS_SSR__};</script>`

      // 替换掉 {{root}} 生成HTML
      shtml = insertString(shtml, '</head>', metaHtml)
      shtml = insertString(shtml, '</body>', propsData)
      shtml = insertString(shtml, '</html>', windowVar)
      ctx.response.body = shtml.replace('{{root}}', renderToString(<Component data={fetchResult} />));
      ctx.response.body = ctx.response.body.replace('{{propsData}}', propsData);
      ctx.response.body = ctx.response.body.replace('{{meta}}', metaHtml)
    })
    .routes()
);
app.listen(config, function () {
  consola.ready({
    message: `Server listening on http://${config.host}:${config.port}`,
    badge: true
  })
});
