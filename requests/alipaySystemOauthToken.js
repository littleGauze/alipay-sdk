/**
 * Created on 2017/11/14.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const Ali = require('../core');

module.exports = class AlipaySystemOauthToken {
    constructor (params) {
        this.method = 'POST';
        this._method = 'alipay.system.oauth.token';
        const rules = {
            grant_type: 'string',
            code: 'string',
            refresh_token: {type: 'string', required: false}
        };

        //检查参数
        Ali.util.validate(rules, params);
        this.params = params;
    }
};