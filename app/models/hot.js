const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * 定义一个模型(相当于传统意义的表结构)
 * 每个模式映射mongoDB的一个集合
 * 它定义(只是定义，不是实现)这个集合里面文档的结构，就是定义这个文档有什么字段，字段类型是什么，字段默认值是什么等。
 * 
 */

 var HotSchema = new Schema({
    seq: { type: Number, default: 0 },
     title: String,
     subTitle: String,
     post:String,
     tags:Array,
     content:String,
     meta:{
         createAt:{
             type: Date,
             default: Date.now()
         },
         updateAt:{
             type:Date,
             default: Date.now()
         }
     }
 })

 /**
  * 定义模型Recommend
  * 模型用来实现我们定义的模式，调用mongoose.model来免疫Schema得到Model
  */

const Hot = mongoose.model('Hot',HotSchema)
module.exports = Hot