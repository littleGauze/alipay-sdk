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
- 具体参数可参考支付宝Api文档
- 目前增加了两个接口 `alipay.system.oauth.token` `alipay.user.info.share`，如果想使用其他接口可自行进行扩展
- 方法名同支付宝method（使用驼峰命名） 如： `alipay.system.oauth.token` => `client.alipaySystemOauthToken`

### 增加接口
