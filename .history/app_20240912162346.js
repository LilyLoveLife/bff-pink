const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World!';
});

app.listen(3006, () => {
  console.log('Server is running at http://localhost:3006');
});