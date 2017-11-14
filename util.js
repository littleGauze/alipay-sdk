/**
 * Created on 2017/11/14.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const Ali = require('./core');
const crypto = require('./cryptoUtil');
const moment = require('moment');
const parameter = require('parameter');

Ali.util = {
    abort: {},
    each: function each(object, iterFunction) {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                let ret = iterFunction.call(this, key, object[key]);
                if (ret === Ali.util.abort) break;
            }
        }
    },
    update: function update(obj1, obj2) {
        Ali.util.each(obj2, function iterator(key, item) {
            obj1[key] = item;
        });
        return obj1;
    },

    /**
     * @api private
     */
    inherit: function inherit(klass, features) {
        let newObject = null;
        if (features === undefined) {
            features = klass;
            klass = Object;
            newObject = {};
        } else {
            /*jshint newcap:false */
            /*jshint camelcase:false */
            let ctor = function __ctor_wrapper__() {};
            ctor.prototype = klass.prototype;
            newObject = new ctor();
        }

        // constructor not supplied, create pass-through ctor
        if (features.constructor === Object) {
            features.constructor = function() {
                if (klass !== Object) {
                    return klass.apply(this, arguments);
                }
            };
        }

        features.constructor.prototype = newObject;
        Ali.util.update(features.constructor.prototype, features);
        features.constructor.__super__ = klass;
        return features.constructor;
    },

    /**
     * 将对象属性按ascii码递增排序
     * @param params
     * @returns {{}}
     */
    sort: function sort (params = {}) {
        let obj = {};
        Object.keys(params).sort().forEach(key => {
            obj[key] = params[key];
        });

        return obj;
    },

    validate: new parameter().validate,
    crypto,
    moment
};

module.exports = Ali.util;