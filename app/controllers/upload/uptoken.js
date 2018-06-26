var qiniu = require('qiniu')
var util = require('util')
var fs = require('fs')
var config = require('../../../config/config')


var mac = new qiniu.auth.digest.Mac(config.qiniu.AccessKey, config.qiniu.SecretKey);
var config2 = new qiniu.conf.Config();
// 这里主要是为了用 node sdk 的 form 直传，结合 demo 中 form 方式来实现无刷新上传
config2.zone = qiniu.zone.Zone_z2;
var formUploader = new qiniu.form_up.FormUploader(config2);
var putExtra = new qiniu.form_up.PutExtra();
var options = {
  scope: config.qiniu.Bucket,
  deleteAfterDays: 7,
  returnBody:
    '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
};

var putPolicy = new qiniu.rs.PutPolicy(options);
var bucketManager = new qiniu.rs.BucketManager(mac, null);

/*获取七牛云上传token*/
exports.uptoken = async (ctx, res, next) => {
    var token = putPolicy.uploadToken(mac);
    console.log('进行了uptoken请求rick',token)
    ctx.body = {
        success: true,
        token:token,
        domain:config.qiniu.Domain
      }

}
