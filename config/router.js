const Router = require('koa-router')
const Admin = require('../app/controllers/admin/admin')
const User = require('../app/controllers/user/user')
const App = require('../app/controllers/app')
const Uptoken = require('../app/controllers/upload/uptoken')
const Recommend = require('../app/controllers/recommend/recommend')
const Hot = require('../app/controllers/hot/hot')
module.exports = function () {
  var router = new Router({
    prefix: '/api'
  })
  // 管理员
  router.post('/admin/user', App.hasBody, Admin.user)
  // 用户
  router.post('/signup', App.hasBody, User.signup)
  router.post('/update', App.hasBody, User.update)
  router.get('/user/users', User.users)
  router.post('/user/delete', App.hasBody, User.deleteUser)
  router.post('/user/login', App.hasBody, User.login)
  router.post('/uptoken', Uptoken.uptoken)

  // 推荐数据
  router.post('/recommend/all', Recommend.getAllRecommendItem)
  router.get('/recommend/detail', Recommend.getRecommendDetail)
  router.post('/recommend/add', Recommend.addRecommendItem)
  router.post('/recommend/delete', App.hasBody, Recommend.deleteRecommendItem)
  router.post('/recommend/update', App.hasBody, Recommend.updateRecommendItem)
  router.post('/recommend/search', Recommend.filterRecommendItem)

  // 热门数据
  router.get('/hot/all', Hot.getAllHotItem)
  router.get('/hot/detail', Hot.getHotDetail)
  router.post('/hot/add', Hot.addHotItem)
  router.post('/hot/delete', App.hasBody, Hot.deleteHotItem)
  router.post('/hot/update', App.hasBody, Hot.updateHotItem)
  router.get('/hot/banner', Hot.getBannerItem)
  return router
}