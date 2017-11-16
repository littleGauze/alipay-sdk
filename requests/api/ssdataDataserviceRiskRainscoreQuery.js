/**
 * Created on 2017/11/14.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const Ali = require('../../core');

module.exports = class SsdataDataserviceRiskRainscoreQuery {
    constructor (params) {
        this.method = 'GET';
        this._method = 'ssdata.dataservice.risk.rainscore.query';
        const rules = {
            biz_content: {
                type: 'object',
                rule: {
                    account_type: 'string',
                    account: 'string',
                    version: {type: 'string', required: false}
                }
            }
        };

        //检查参数
        Ali.util.validate(rules, params);

        //将biz_content序列化
        if (!params.biz_content.version) {
            params.biz_content.version = '2.0';
        }
        params.biz_content = JSON.stringify(params.biz_content);

        this.params = params;
    }
};