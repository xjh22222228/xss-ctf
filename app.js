const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static-server');
const path = require('path');
const render = require('koa-ejs');
const xss = require('xss');

const app = new Koa();
const router = new Router();
const title = 'XSS平台|CTF欢迎来到XSS挑战|XSS之旅|XSS测试';

app.use(async (ctx, next) => {
  ctx.set({ 'X-XSS-Protection': 0 });
  await next();
});

router
.get('/', async ctx => {
  await ctx.render('index', { title });
})
.get('/good', async ctx => {
  await ctx.render('good', { title: '恭喜您，全部通关！' });
})
.get('/level1', async ctx => {
  const name = ctx.query.name || '';
  await ctx.render('level-1', { title: '欢迎来到level1', name });
})
.get('/level2', async ctx => {
  const keyword = ctx.query.keyword || '';
  await ctx.render('level-2', { title: '欢迎来到level2', keyword, xss: xss(keyword) });
})
.get('/level3', async ctx => {
  const keyword = ctx.query.keyword || '';
  await ctx.render('level-3', { title: '欢迎来到level3', keyword, xss: xss(keyword) });
})
.get('/level4', async ctx => {
  const keyword = ctx.query.keyword || '';
  const result = keyword.replace('>', '').replace('<', '');
  await ctx.render('level-4', {
    title: '欢迎来到level4', keyword: result, xss: xss(keyword)
  });
})
.get('/level5', async ctx => {
  const keyword = ctx.query.keyword || '';
  const result = keyword.replace('<script', '<scr_ipt').replace('on', 'o_n');
  await ctx.render('level-5', {
    title: '欢迎来到level5', keyword: result, xss: xss(keyword)
  });
})
.get('/level6', async ctx => {
  const keyword = ctx.query.keyword || '';
  const result = keyword
                  .replace('<script', '<scr_ipt')
                  .replace('on', 'o_n')
                  .replace('src', 'sr_c')
                  .replace('data', 'da_ta')
                  .replace('href', 'hr_ef');
  await ctx.render('level-6', {
    title: '欢迎来到level6', keyword: result, xss: xss(keyword)
  });
})
.get('/level7', async ctx => {
  const keyword = ctx.query.keyword || '';
  const result = keyword
                  .replace('<script', '')
                  .replace('on', '')
                  .replace('src', '')
                  .replace('data', '')
                  .replace('href', '');
  await ctx.render('level-7', {
    title: '欢迎来到level7', keyword: result, xss: xss(keyword)
  });
})
.get('/level8', async ctx => {
  const keyword = ctx.query.keyword || '';
  const result = keyword
                  .replace('<script', 'scr_ipt')
                  .replace('on', 'o_n')
                  .replace('src', 'sr_c')
                  .replace('data', 'da_ta')
                  .replace('href', 'hr_ef')
                  .replace('"', '&quot');
  await ctx.render('level-8', {
    title: '欢迎来到level8', keyword: result, xss: xss(keyword)
  });
})
.get('/level9', async ctx => {
  const keyword = ctx.query.keyword || '';
  const result = keyword
                  .replace('<script', 'scr_ipt')
                  .replace('on', 'o_n')
                  .replace('src', 'sr_c')
                  .replace('data', 'da_ta')
                  .replace('href', 'hr_ef')
                  .replace('"', '&quot');
  await ctx.render('level-9', {
    title: '欢迎来到level9', keyword: result, xss: xss(keyword)
  });
})
.get('/level10', async ctx => {
  const keyword = ctx.query.keyword || '';
  const t_sort = ctx.query.t_sort || '';
  const result = t_sort
                  .replace('>', '')
                  .replace('<', '');

  await ctx.render('level-10', {
    title: '欢迎来到level10', keyword, xss: xss(keyword), t_sort: result
  });
})
.get('/level11', async ctx => {
  const keyword = ctx.query.keyword || '';
  const t_sort = ctx.query.t_sort || '';
  const referrer = ctx.headers['referer'] || '';
  const result = referrer
                  .replace('>', '')
                  .replace('<', '');

  await ctx.render('level-11', {
    title: '欢迎来到level11', keyword, xss: xss(keyword), t_sort: xss(t_sort), str3: result
  });
})
.get('/level12', async ctx => {
  const keyword = ctx.query.keyword || '';
  const t_sort = ctx.query.t_sort || '';
  const userAgent = ctx.headers['user-agent'] || '';
  const result = userAgent
                  .replace('>', '')
                  .replace('<', '');

  await ctx.render('level-12', {
    title: '欢迎来到level12', keyword, xss: xss(keyword), t_sort: xss(t_sort), str3: result
  });
})
.get('/level13', async ctx => {
  const keyword = ctx.query.keyword || '';
  const t_sort = ctx.query.t_sort || '';
  const cookie = ctx.cookies.get('t_cook') || '';
  const result = cookie
                  .replace('>', '')
                  .replace('<', '');

  await ctx.render('level-13', {
    title: '欢迎来到level13', keyword, xss: xss(keyword), t_sort: xss(t_sort), str3: result
  });
})
.get('/level14', async ctx => {
  const src = ctx.query.src;
  await ctx.render('level-14', { title: '欢迎来到level14', src });
})
.get('/level15', async ctx => {
  const keyword = (ctx.query.keyword || '').toLowerCase();
  const str = keyword
              .replace('script', '&nbsp;')
              .replace(' ', '&nbsp;')
              .replace('/', '&nbsp;')
              .replace(' ', '&nbsp;')

  await ctx.render('level-15', {
    title: '欢迎来到level15', keyword, str
  });
})




render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: true,
  debug: false
});

app
.use(router.routes())
.use(serve({ rootDir: 'public', rootPath: '' }))
.use(router.allowedMethods());

app.listen(7888);
