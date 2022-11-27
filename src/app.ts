import Koa from 'koa'
import Router from '@koa/router'
import AllRouterLoader from './common/AllRouterLoader'

const app = new Koa()
const router = new Router()

AllRouterLoader.init(app)
