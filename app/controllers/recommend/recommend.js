const xss = require('xss')
const mongoose = require('mongoose')
const Recommend = mongoose.model('Recommend')
const uuid = require('uuid')
import recommendHelper from '../../dbhelper/recommendHelper'
import HotHelper from '../../dbhelper/hotHelper'

// 添加新内容
exports.addRecommendItem = async (ctx, next) => {
    console.log('打印数据', ctx.request.body)
    var title = xss(ctx.request.body.title)
    var subTitle = xss(ctx.request.body.subTitle)
    var content = xss(ctx.request.body.content)
    var post = xss(ctx.request.body.post)
    var tags = xss(ctx.request.body.tags)
    var recommendItem = await Recommend.findOne({
        title: title
    }).exec()
    if (!recommendItem) {
        var id = uuid.v4()
        recommendItem = new Recommend({
            title: xss(title),
            post: xss(post),
            subTitle: xss(subTitle),
            tags: xss(tags),
            content: xss(content)
        })

        try {
            recommendItem = await recommendItem.save()
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
exports.getAllRecommendItem = async (ctx, next) => {
    console.log('pagenum', ctx.request.body.pagenum)
    let pagenum = ctx.request.body.pagenum || 1
    let pagesize = ctx.request.body.pagesize || 10
    var data = await recommendHelper.findAllItem(pagenum - 1, pagesize)
    ctx.body = {
        success: true,
        data: data
    }
}
// 搜索内容
exports.filterRecommendItem = async (ctx, next) => {
    console.log('text', ctx.request.body.text)
    let text = ctx.request.body.text
    var dataRecommend = await recommendHelper.filterItem(text)
    var dataHot = await HotHelper.filterItem(text)
    var allData = [...dataRecommend, ...dataHot]
    console.log('搜素内容data', allData)
    ctx.body = {
        success: true,
        data: allData
    }
}

// 获取内容详情
exports.getRecommendDetail = async (ctx, next) => {
    var id = xss(ctx.query.id)
    console.log('controller', id)
    var data = await recommendHelper.findDetail({
        id
    })
    ctx.body = {
        success: true,
        data: data
    }
}

// 删除内容
exports.deleteRecommendItem = async (ctx, next) => {
    var id = xss(ctx.request.body.id)
    console.log(id)
    var data = await recommendHelper.deleteItem({
        id
    })
    ctx.body = {
        success: true,
        data: '删除成功'
    }
}

// 更新内容
exports.updateRecommendItem = async (ctx, next) => {
    var body = ctx.request.body
    var id = xss(body.id)
    console.log('id', id)
    // var user = yield User.findOne({
    var recommend = await Recommend.findOne({
        _id: id
    })
    var fields = 'title,post,content'.split(',')

    fields.forEach(function (field) {
        if (body[field]) {
            recommend[field] = xss(body[field])
        }
    })

    recommend = await recommend.save()

    ctx.body = {
        success: true,
        data: {
            title: recommend.title,
            post: recommend.post,
            content: recommend.content
        }
    }
}