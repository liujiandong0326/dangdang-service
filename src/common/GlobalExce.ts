import Koa, { Context } from 'koa'

const globalException = async (ctx: Context, next: Koa.Next) => {
  console.log('进入到通用异常')
  try {
    await next()
  } catch (err: any) {
    const errResult = err as { message: string }
    ctx.body = `服务器错误：${errResult.message}`
  }
}

export default globalException
