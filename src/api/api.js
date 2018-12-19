// let urlPrefix="http://101.132.66.158:8899/jersey/";//2018-12-3 上线打包地址
//let urlPrefix="http://192.168.6.209:8899/jersey/"; //潘树钱本地地址
//let urlPrefix="http://192.168.6.208:8899/jersey/"; //郭峰本地地址
let urlPrefix="http://192.168.2.166:8899/jersey/";//测试ip
// let urlPrefix="http://192.168.6.6:8899/jersey/";//薛瑶ip
// let urlPrefix="http://192.168.6.195:8899/jersey/";//李博凯

const api = {
  contractStatus:urlPrefix+'sign/employee/contractStatus/',//验证合同
  getcode:urlPrefix+'send/validate/sms',//发送验证码
  getlogin:urlPrefix+'sign/employee/login/',//查看合同
  contractData:urlPrefix+'sign/employee/contractData/',
  contractinfo:urlPrefix+'sign/employee/contract',//提交信息
  lookforTest:urlPrefix+'dimission/leader/questions/',//上级查看评测
  submitTest:urlPrefix+'dimission/leader/insert/question',//上级填写评测
  authentication:urlPrefix+'sign/employee/contract/authentication',//提交表单信息
  imgContract:urlPrefix+'sign/employee/contract',//手签
	
	interviewLogin:urlPrefix+'interview/h5/login',//候选人登录
};
export default api;


