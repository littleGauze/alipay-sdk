## 支付宝SDK
----

### 安装
`npm install ali-node-sdk`

### 使用
```js
const AliClient = require('ali-node-sdk');

const client = new AliClient({
    appId: 'xxxx',
    privateKey: '商户私钥',
    aliPublicKey: '支付宝公钥',
    sandbox: true //可选，设置为 true将会切换为沙箱的网关
});

//根据auth_code获取access_token
client.alipaySystemOauthToken({
     grant_type: 'authorization_code',  //值为authorization_code时，代表用code换取；值为refresh_token时，代表用refresh_token换取
     code: 'xxxxx',  //支付宝回传的auth_code 
     refresh_token: 'xxxx', //如果是刷新access_token则传入该参数
}).then(res => {
    console.log(res);
})

```
### 注意
- 具体参数可参考支付宝[Api文档](https://docs.open.alipay.com/api)
- 目前增加了两个接口 `alipay.system.oauth.token` `alipay.user.info.share`，如果想使用其他接口可自行进行扩展
- 方法名同支付宝method（使用驼峰命名） 如： `alipay.system.oauth.token` => `client.alipaySystemOauthToken`

### 增加接口
1. 在 `./requests` 目录下增加以接口名命名的request文件
2. 在 `./requests/index.js` 文件中注册接口

#### 示例
> `./requests/alipaySystemOauthToken.js`
```js
/**
 * Created on 2017/11/14.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const Ali = require('../core');

module.exports = class AlipaySystemOauthToken {
    constructor (params) {
        this.method = 'GET';    // http 请求接口方式
        this._method = 'alipay.system.oauth.token'; //接口名 请参考支付宝api文档
        const rules = {     //参数验证规则，使用parameter包进行参数验证
            grant_type: 'string',
            code: 'string',
            refresh_token: {type: 'string', required: false}
        };

        //检查参数
        Ali.util.validate(rules, params); //引用的parameter包的 validate方法
        this.params = params;
    }
};
```

> `./requests/index.js`
```js
/**
 * Created on 2017/11/14.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const alipaySystemOauthToken = require('./alipaySystemOauthToken'); //引入接口
const alipayUserInfoShare = require('./alipayUserInfoShare');

module.exports = {
    alipaySystemOauthToken, //导出并注册接口
    alipayUserInfoShare
};
```
