const mongoose = require('mongoose')
const Recommend = mongoose.model('Recommend')


// 通过ID来查询
exports.findOneItem = async ({
    id
}) => {
    var query = Recommend.find({
        id
    })
    var res = null
    await query.exec(function (err, item) {
        if (err) {
            res = {}
        } else {
            res = item
        }
    })
    return res
}

// 查找所有
exports.findAllItem = async (pagenum, pagesize) => {
    // var query = Recommend.find({});
    console.log(pagenum)
    console.log(pagesize)
    console.log('乘以', pagenum * pagesize)
    var query = Recommend.find({}).skip(pagenum * pagesize).limit(pagesize).sort({
        '_id': -1
    });
    var res = []
    await query.exec(function (err, item) {
        if (err) {
            res = []
        } else {
            res = item
        }
    })
    return res
}
// 搜索内容
exports.filterItem = async (text) => {
    console.log('text',text)
    var reg = new RegExp(text,'i');
    var query = Recommend.find({
        'title': {$regex : reg}
    })
    var res = []
    await query.exec(function (err, item) {
        if (err) {
            res = []
        } else {
            res = item
        }
    })
    return res
}

//添加内容
exports.addItem = async (item) => {
    item = await item.save()
    return item
}

// 删除内容
exports.deleteItem = async ({
    id
}) => {
    console.log('recommendHelper', id)
    var flag = false
    await Recommend.remove({
        _id: id
    }, function (err) {
        if (err) {
            console.log(error)
            flag = false
        } else {
            flag = true
        }
    })
    return flag
}
// 查询详情
exports.findDetail = async ({
    id
}) => {

    var content = await Recommend.findOne({
        _id: id
    }).exec()
    console.log('查询详情', content)
    return content
}