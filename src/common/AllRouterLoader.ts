import path from 'path'
import fs from 'fs'
import Router from '@koa/router'
import Koa from 'koa'
import json from 'koa-json'
import koaBody from 'koa-body'

/*
 * 自动加载路由
 * */
class AllRouterLoader {
  app!: Koa
  static loaderRouter: AllRouterLoader = new AllRouterLoader()

  init(app: Koa) {
    this.app = app
    const rootRouter = this.loadAllRouterWrapper()
    this.app.use(rootRouter.routes())
    this.listen()
  }
  // 1. 加载所有路由文件数组
  getFiles(dir: string) {
    // 方法将返回一个包含“指定目录下所有文件名称”的数组对象。
    return fs.readdirSync(dir)
  }

  // 2. 加载所有路由文件绝对路径数组
  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), 'src/router')
    const allFiles = this.getFiles(dir)
    const allFullFilePaths: string[] = []

    for (const file of allFiles) {
      const fullFilePath = dir + '/' + file
      allFullFilePaths.push(fullFilePath)
    }
    return allFullFilePaths
  }

  // 自定义守卫
  isRouter(data: any): data is Router {
    return data instanceof Router
  }

  getRootRouter() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang') // 为所有的路由访问添加路由前缀/dang,来作为一级路由
    this.app.use(json())
    this.app.use(koaBody())
    return rootRouter
  }

  // 3. 加载所有二级路由到一级路由中
  loadAllRouterWrapper() {
    const rootRouter = this.getRootRouter()
    // 3.1 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths()
    this.loadAllRouter(allFullFilePaths, rootRouter)
    return rootRouter
  }

  loadAllRouter(allFullFilePaths: string[], rootRouter: Router) {
    for (const fullFilePath of allFullFilePaths) {
      const module = require(fullFilePath)
      if (this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods())
      }
    }
  }

  listen() {
    this.app.listen(3002)
    console.log('服务已启动，地址为：http://localhost:3002')
  }
}

export default AllRouterLoader.loaderRouter
