import md5 from 'js-md5';
//前端自定义md5签名算法
export function sign(token, current_timestamp, nonce_str, key) {
    let waitSignStr = token + current_timestamp.substr(0, 10) + nonce_str.substr(0, 16) + key;
    return md5(waitSignStr);
}

//设置请求消息头
export function headers(contentType,token){
	let headers={};
	headers['Content-Type'] = contentType ? contentType : 'application/json;charset=utf-8';
	token = token ? token : '';
	
	let key = 'jmjbGEWO4EyItpA4';
	let current_timestamp = new Date().getTime() + '';
	let nonce_str = getNonceStr(32);
	
	let lp_sign = sign(token, current_timestamp, nonce_str, key);
	headers['token'] = token;
	headers['current-timestamp'] = current_timestamp;
	headers['nonce-str'] = nonce_str;
	headers['lp-sign'] = lp_sign;
	return headers;
}
//生成随机字符串
export function getNonceStr(len) {
    len = len || 32;
    let chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let maxPos = chars.length;
    let s = '';
    for (let i = 0; i < len; i++) {
        s += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return s;
}