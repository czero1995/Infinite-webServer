var mongoose =  require('mongoose')
var Admin = mongoose.model('Admin')

// 通过电话号码查询
exports.findByPhoneNumber = async ({phoneNumber}) => {
	var query = Admin.find({phoneNumber})
	var res = null
	await query.exec(function(err, user) {
		if(err) {
			res = {}
		}else {
			res = user
		}
	})
	return res;
}

