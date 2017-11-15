/**
 * Created on 2017/11/14.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const request = require('request-promise');
const handleErr = (err) => {
    console.log(err);
};

module.exports = {
    request (options = {}) {
        return request(options).catch(handleErr);
    },

    async requestSync (options = {}) {
        return await request(options).catch(handleErr);
    }
};