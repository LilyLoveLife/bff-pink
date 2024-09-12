const Koa = require('koa');
// const { fetchData } = require('./aggregator');
const { fetchDataWithCache } = require('./aggregator');
const Router = require('koa-router');
const route = require('koa-route')

const router = new Router()

const app = new Koa();

const about = ctx => { 
    ctx.response.type = 'html'
    ctx.response.body = '<h1>这是另一页</h1><a href="/"> 返回首页</a> '
}


  app.use(route.get('/test1',about))
  app.use(route.get('/test2',about))
 
 
  app.use(route.get('/about',about))

// 错误处理中间件
app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      ctx.status = error.response.status || 500;
      ctx.body = {
        message: error.message,
      };
    }
});



app.use(async ctx => {
//   ctx.body = 'Hello World!';
    // const url1 = 'https://api.example.com/data1';
    // const url2 = 'https://api.example.com/data2';
    // const url1 = './test1.json';
    // const url2 = './test2.json';
    const url1 = '/test1';
    const url2 = '/test2';

    const aggregatedData = await fetchDataWithCache(url1, url2);

    ctx.body = aggregatedData;
    // ctx.body =  'asd'
});

app.listen(3006, () => {
  console.log('Server is running at http://localhost:3006');
});