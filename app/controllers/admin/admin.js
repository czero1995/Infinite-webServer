var xss = require('xss')
var mongoose = require('mongoose')
var Admin = mongoose.model('Admin')
var uuid = require('uuid')
import adminHelper from '../../dbhelper/userHelper'

// 注册新用户
exports.user = async(ctx, next) => {
	var phoneNumber = xss(ctx.request.body.phoneNumber)
	var passwd = xss(ctx.request.body.passwd)
	var admin = await Admin.findOne({
		phoneNumber: phoneNumber,
		passwd:passwd
	}).exec()
	console.log('admin',admin)
	if(!admin) {
		ctx.body = {
			success: false,
			data: '用户不存在'
		}
	}else{
		ctx.body = {
			success: true,
			data: '成功'
		}
	}

}