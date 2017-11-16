/**
 * Created on 2017/11/14.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const querystring = require('querystring');
const Ali = require('./core');

module.exports = class RequestBase {
    constructor (config = {}) {
        this.gateway = 'https://openapi.alipay.com/gateway.do';
        if (config.sandbox) {
            this.gateway = 'https://openapi.alipaydev.com/gateway.do'
        }
        this.commonParams = {
            app_id: config.appId,
            format: 'JSON',
            charset: 'utf-8',
            sign_type: config.signType || 'RSA2',
            version: '1.0'
        };
        this.crypto = Ali.util.crypto(config);
    }

    getRequestParams () {
        let method = this._method;
        let timestamp = Ali.util.moment(new Date).format('YYYY-MM-DD HH:mm:ss');

        return Object.assign({
            method,
            timestamp
        }, this.params);
    }

    getBizContent () {
        let common = this.commonParams;
        let params = this.getRequestParams();

        //按ascii排序
        let paramsObj = Object.assign({}, common, params);
        params = Ali.util.sort(paramsObj);

        //格式化为querystring
        params = Ali.util.generateQueryString(params);

        //签名
        let sign = this.crypto.sign(params);
        paramsObj.sign = sign;

        return paramsObj;
    }

    doRequest () {
        let params = this.getBizContent();

        if (!this.method || this.method === 'GET') {
            params = querystring.stringify(params);

            return Ali.util.http.request({
                method: 'GET',
                json : true,
                url: `${this.gateway}?${params}`
            });
        } else if (this.method === 'POST') {
            return Ali.util.http.request({
                url: this.gateway,
                method: 'POST',
                json : true,
                body: params
            });
        }
    }
};