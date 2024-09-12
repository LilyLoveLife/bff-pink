const Koa = require('koa');
// const { fetchData } = require('./aggregator');
const { fetchDataWithCache } = require('./aggregator');

const app = new Koa();

app.use(async ctx => {
//   ctx.body = 'Hello World!';
    const url1 = 'https://api.example.com/data1';
    const url2 = 'https://api.example.com/data2';

    const aggregatedData = await fetchDataWithCache(url1, url2);

    ctx.body = aggregatedData;
});

app.listen(3006, () => {
  console.log('Server is running at http://localhost:3006');
});