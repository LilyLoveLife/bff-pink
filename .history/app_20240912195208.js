const Koa = require('koa');
// const { fetchData } = require('./aggregator');
const { fetchDataWithCache } = require('./aggregator');
const Router = require('koa-router')();

const router = new Router()

const app = new Koa();

router.get('/test1', async (ctx, next) => {
    //从ctx里面获取get传值,query是格式化之后的，querystring是字符串的
    console.log(ctx.query)
    //ctx里面的request对象是那一大串东西
    ctx.body = 'koa2 string'
  })
  

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
    const url1 = './test1.json';
    const url2 = './test2.json';

    const aggregatedData = await fetchDataWithCache(url1, url2);

    ctx.body = aggregatedData;
});

app.listen(3006, () => {
  console.log('Server is running at http://localhost:3006');
});