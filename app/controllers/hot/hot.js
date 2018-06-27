const xss = require('xss')
const mongoose = require('mongoose')
const Hot = mongoose.model('Hot')
const uuid = require('uuid')
import HotHelper from '../../dbhelper/hotHelper'

// 添加新内容
exports.addHotItem = async (ctx, next) => {
    console.log('打印数据', ctx.request.body)
    var title = xss(ctx.request.body.title)
    var subTitle = xss(ctx.request.body.subTitle)
    var content = xss(ctx.request.body.content)
    var post = xss(ctx.request.body.post)
    var tags = xss(ctx.request.body.tags)
    var HotItem = await Hot.findOne({
        title: title
    }).exec()
    if (!HotItem) {
        var id = uuid.v4()
        HotItem = new Hot({
            title: xss(title),
            post: xss(post),
            subTitle: xss(subTitle),
            tags: xss(tags),
            content: xss(content)
        })

        try {
            HotItem = await HotItem.save()
            ctx.body = {
                success: true,
                data: '内容添加成功'
            }
        } catch (e) {
            ctx.body = {
                success: false
            }
            console.log(e)
            return next
        }
    } else {
        ctx.body = {
            success: false,
            data: '该标题内容已存在'
        }
    }
}

// 获取所有内容
exports.getAllHotItem = async (ctx, next) => {
    var data = await HotHelper.findAllItem()
    ctx.body = {
        success: true,
        data: data
    }
}

// 获取banner
exports.getBannerItem = async (ctx, next) => {
    var data = await HotHelper.bannerItem()
    ctx.body = {
        success: true,
        data: data
    }
}

// 获取内容详情
exports.getHotDetail = async (ctx, next) => {
    var id = xss(ctx.query.id)
    console.log('controller', id)
    var data = await HotHelper.findDetail({
        id
    })
    ctx.body = {
        success: true,
        data: data
    }
}

// 删除内容
exports.deleteHotItem = async (ctx, next) => {
    var id = xss(ctx.request.body.id)
    console.log(id)
    var data = await HotHelper.deleteItem({
        id
    })
    ctx.body = {
        success: true,
        data: '删除成功'
    }
}

// 更新内容
exports.updateHotItem = async (ctx, next) => {
    var body = ctx.request.body
    var id = xss(body.id)
    console.log('id', id)
    // var user = yield User.findOne({
    var Hot = await Hot.findOne({
        _id: id
    })
    var fields = 'title,post,content'.split(',')

    fields.forEach(function (field) {
        if (body[field]) {
            Hot[field] = xss(body[field])
        }
    })

    Hot = await Hot.save()

    ctx.body = {
        success: true,
        data: {
            title: Hot.title,
            post: Hot.post,
            content: Hot.content
        }
    }
}