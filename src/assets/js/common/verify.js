
//校验手机号
export function checkMobile(mobile){
  if (mobile.match(/^1[345678]\d{9}/)){
    return false;
  }else{
    return true;
  }
}
//校验中文
export function isChinaName(name) {
 var pattern = /^[a-zA-Z\u4e00-\u9fa5 ]{1,20}$/;
 return pattern.test(name);
}
//校验身份证
export function isCardNo(card) {
 var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
 return pattern.test(card);
}
//校验纯数字
export function isNumber(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}