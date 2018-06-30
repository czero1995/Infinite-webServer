const mongoose = require('mongoose')
const Hot = mongoose.model('Hot')


// 通过ID来查询
exports.findOneItem = async ({ id }) => {
    var query = Hot.find({ id })
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
exports.findAllItem = async () => {
    var query = Hot.find({}).skip(3)
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
    console.log('text', text)
    var reg = new RegExp(text, 'i');
    var query = Hot.find({
        'title': { $regex: reg }
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

// banner
exports.bannerItem = async () => {
    var query = Hot.find({}).limit(3)
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
exports.deleteItem = async ({ id }) => {
    console.log('HotHelper', id)
    var flag = false
    await Hot.remove({ _id: id }, function (err) {
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
exports.findDetail = async ({ id }) => {

    var content = await Hot.findOne({
        _id: id
    }).exec()
    console.log('查询详情', content)
    return content
}
