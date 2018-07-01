const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const config = require('./config/config')

/*mongoose连接数据库*/
mongoose.Promise = require('bluebird')
mongoose.connect(config.dbConnect, { useMongoClient: true })

/*获取数据库表对应的js对象所在的路径*/
const models_path = path.join(__dirname, './app/models')

/*用递归的形式，读取models文件夹下的js模型文件，并require*/
var walk = function (modelPath) {
  fs.readdirSync(modelPath).forEach(function (file) {
    var filePath = path.join(modelPath, '/' + file)
    var stat = fs.statSync(filePath)
    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        require(filePath)
      }
    }
    else if (stat.isDirectory()) {
      walk(filePath)
    }
  })
}
walk(models_path)

require('babel-register')
const Koa = require('koa')
const logger = require('koa-logger')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
var cors = require('koa2-cors');
const app = new Koa()

app.keys = ['zhangivon']
app.use(logger())
app.use(session(app))
app.use(bodyParser())

app.use(function* (next) {
  console.log('请求的完整地址', this.href)
  console.log('请求过来的方法', this.method)
  yield next
})

/*使用路由转发请求*/
const router = require('./config/router')()

app.use(cors({
  origin: function (ctx) {
    if (ctx.header.origin == 'http://127.0.0.1:4000' || ctx.header.origin == 'http://infinite.czero.cn') {
      console.log('处理跨域请求成功')
      return "*"; // 允许来自所有域名请求
    }
    console.log('进入请求aaa', ctx.header.origin)
    // return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了z
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'application/json;'],
}))


router.post('/', async function (ctx) {
  ctx.body = ''
});

app.use(router.routes())
  .use(router.allowedMethods())





app.listen(3000)
console.log('app started at http://localhost:3000');