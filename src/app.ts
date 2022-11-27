import Koa from 'koa'
import koaBody from 'koa-body'
import json from 'koa-json'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()
router.prefix('/dang') // 为所有的路由访问添加路由前缀/dang,来作为一级路由

app.use(json())
app.use(koaBody())

router.get('/test', async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.body = '第一个测试页面'
})
// 加载路由到全局路由上
app.use(router.routes())

app.listen(3002)
console.log('server running on port 3002')
