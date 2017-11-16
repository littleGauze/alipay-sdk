/**
 * Created on 2017/11/14.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const Ali = require('../core');

module.exports = class AlipayUserInfoShare {
    constructor (params) {
        this.method = 'GET';
        this._method = 'alipay.user.info.share';
        const rules = {
            auth_token: 'string'
        };

        //检查参数
        Ali.util.validate(rules, params);
        this.params = params;
    }
};