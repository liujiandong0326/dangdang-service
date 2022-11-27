import { Context } from 'koa'
import Router from '@koa/router'

const router = new Router()

router.prefix('/usermodule')

interface FindParams extends Context {
  params: {
    username: string
  }
}

router.get('/findUserinfo/:username', async (ctx: FindParams) => {
  const { username } = ctx.params
  ctx.body = `欢迎! ${username}`
})

router.post('/addUser', async ctx => {
  const user = ctx.request.body
  ctx.body = `欢迎! ${user.username}`
})

module.exports = router
