### 服务端(Node-Koa2-Mongodb-Mongoose):
功能：

1. 分页加载
2. 模糊查询
3. 定制Restful API
4. 七牛云第三方对象存储对接
5. pm2部署到阿里云


项目目录:

    ├── app
    │   ├── controllers (逻辑处理目录)
    │   │   ├── admin
    │   │   ├── app.js
    │   │   ├── hot
    │   │   ├── recommend
    │   │   ├── upload
    │   │   └── user
    │   ├── dbhelper (操控数据表目录)
    │   │   ├── AdminHelper.js
    │   │   ├── hotHelper.js
    │   │   ├── recommendHelper.js
    │   │   └── userHelper.js
    │   └── models  (数据库模型目录)
    │       ├── admin.js    (管理员表)
    │       ├── hot.js      (热门发现数据表)
    │       ├── recommend.js    (首页推荐表)
    │       └── user.js (用户管理表--登录注册)
    ├── app.js (服务端启动入口文件  node app.js)
    ├── config  (配置目录)
    │   ├── config.js   (基础配置信息--七牛云配置,数据库配置)
    │   └── router.js   (路由配置)
    
## 源码
前端源码: [https://github.com/czero1995/Infinite-webDesign.git](https://github.com/czero1995/Infinite-webDesign.git)

服务端源码：[https://github.com/czero1995/Infinite-webServer.git](https://github.com/czero1995/Infinite-webServer.git)

后台管理源码: [https://github.com/czero1995/Infinite-webAdmin.git](https://github.com/czero1995/Infinite-webAdmin.git)

# 使用说明

	#克隆项目
	git clone https://github.com/czero1995/Infinite-webServer.git
	
	# 安装依赖
	npm install
	
	# 请求API 比如请求首页所以数据:http://127.0.0.1:4000/api/recommend/all
	node app.js