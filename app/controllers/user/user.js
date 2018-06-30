var xss = require('xss')
var mongoose =  require('mongoose')
var User = mongoose.model('User')
var uuid = require('uuid')
import userHelper from '../../dbhelper/userHelper'

// 注册新用户
exports.signup = async (ctx, next) => {
	var phoneNumber = xss(ctx.request.body.phoneNumber)
  var nickname = xss(ctx.request.body.nickname)
  var passwd = xss(ctx.request.body.passwd)
	var user = await User.findOne({
	  phoneNumber: phoneNumber
	}).exec()
  console.log(user)
	
	var verifyCode = Math.floor(Math.random()*10000+1)
  console.log(phoneNumber)
	if (!user) {
	  var accessToken = uuid.v4()

	  user = new User({
	    nickname: xss(nickname),
	    avatar: '',
	    phoneNumber: xss(phoneNumber),
      passwd: xss(passwd),
      accessToken: accessToken,
	  })

    try {
      user = await user.save()
      ctx.body = {
        success: true,
        data:'注册成功'
      }
    }
    catch (e) {
      ctx.body = {
        success: false
      }

      return next
    }
	}
	else {
	  user.verifyCode = verifyCode
    ctx.body = {
        success: false,
        data:'该号码已经注册过'
      }
	}



}

// 更新用户信息操作
exports.update = async (ctx, next) => {
  var body = ctx.request.body
  var user = await User.findOne({
    phoneNumber:xss(ctx.request.body.phoneNumber)
  }).exec()
  if (!user) {
    ctx.body = {
      success: false,
      data:'用户不存在'
    }
  }else{

    var fields = 'avatar,gender,age,nickname,breed,correct,passwd,'.split(',')
  
    fields.forEach(function(field) {
      if (body[field]) {
        user[field] = xss(body[field])
      }
    })
  
    user = await user.save()
  
    ctx.body = {
      success: true,
      data:'修改成功'
    }
  }
}



/*获取所有用户*/
exports.users = async (ctx, next) => {
  var data = await userHelper.findAllUsers()
  ctx.body = {
    success: true,
    data
  }
}

/*删除某个用户*/

exports.deleteUser = async (ctx, next) => {
  var phoneNumber = xss(ctx.request.body.phoneNumber)
  console.log(phoneNumber)
  var data  = await userHelper.deleteUser({phoneNumber})
  ctx.body = {
    success: true,
    data:'删除成功'
  }
}
/*用户登录*/

exports.login = async (ctx, next) => {
  var phoneNumber = xss(ctx.request.body.phoneNumber)
  var passwd = xss(ctx.request.body.passwd)
  var user = await User.findOne({
	  phoneNumber: phoneNumber
  }).exec()
  console.log('passwd',passwd)
  console.log('userpasswd',user.passwd)
  if (!user) {
    ctx.body = {
      success: false,
      data:'用户不存在'
    }
  }else{
    if(passwd == user.passwd){
      ctx.body = {
        success: true,
        data:user
      }
    }else{
      ctx.body = {
        success: false,
        data:'密码出错'
      }
    }
  }
}

