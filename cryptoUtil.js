/**
 * Created on 2017/11/14.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const crypto = require('crypto');

module.exports = config => {
    const {
        privateKey,
        aliPublicKey,
        algorithm = 'SHA256WithRSA'
        } = config;

    return {
        sign (content) {
            let s = crypto.createSign(algorithm);
            s.update(content);

            return s.sign(privateKey, 'base64');
        }
    };
};