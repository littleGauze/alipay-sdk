/**
 * Created on 2017/11/14.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const Ali = {};
module.exports = Ali;
require('./util');

const RequestBase = require('./requestBase');
const requests = require('./requests');

Ali.Client = Ali.util.inherit({
    constructor: function Client(config) {
        this.reqBase = new RequestBase(config);
        this.services = {};
        this.initServices();
    },

    initServices () {
        let that = this;
        Object.keys(requests).forEach(method => {
            let klass = requests[method];

            that.services[method] = params => {
                let instance = new klass(params);
                Object.setPrototypeOf(instance, that.reqBase);

                return instance.doRequest();
            }
        });
    }
});
