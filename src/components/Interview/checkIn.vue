<template>
  <div class="checkIn">
   <div class="checkIn_div">
		 <div class="checkIn_header">
			 <i class="home_img"></i>
			 <span>上海棋至文化有限公司</span>
		 </div>
		 <div class="checkCon">
			 <div class="checkCon_title">面试登记表</div>
			 <div class="checkCon_title2">Hi~我是上海哈哈哈网络科技有限公司的HR，欢迎您来参加面试。为了方便您快速进入面试流程，请您抽空填写面试登记表。</div>
		 <div class="checkCon_warning">
			 <i></i>
			 <span>为了确保您的信息安全，请进行面试签到</span>
		 </div>
			<form>
				<div class="form_div">
				  <img class="icon_img" src="../../assets/img/ic_phone.svg" />
				  <input type="tel" class="input_txt" autocomplete="off" v-model="dataPhone" placeholder="请输入手机号码" id="input_phone" maxlength="11" minlength='11' />
				</div>
				<div class="form_div">
					<div class="f_l" style="width:55%;">
						<img class="icon_img" src="../../assets/img/ic_password.svg" />
						<input type="tel" style="width:70%;" autocomplete="off" v-model="txt_code" maxlength="6" minlength='6' class="input_txt" id="input_code" placeholder="请输入短信验证码" />
					</div>
					<div class="f_r btn_sms" @click="get_code" v-if="codeState" :disabled="button_phone_dis">获取验证码</div>
          <div class="f_r btn_sms click_btn" disabled="true" v-if="codeState2">{{timeNum}}s后重发</div>
				</div>
			</form>
			<div class="btn_div">
				<button class="btn" id="login_btn" @click="btnsubmit" :class="click_button_code" :disabled="login_codeDisabled">提交</button>
			</div>
		</div>
		</div>
  </div>
</template>

<script>
	import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
	import { Indicator } from 'mint-ui';
	
export default {
  name: 'checkIn',
  data () {
    return {
      enterpriseId:this.$route.query.enterpriseId,
      dataPhone:'',
      txt_code:'',
	    codeState:true,
	    codeState2:false,
	    timeNum: 60,
	    Is_Invalid:false,
    }
  },
  watch:{
	  txt_code:function(){
	  	this.txt_code=this.txt_code.replace(/[^\d]/g,'');
	  }
  },
  computed:{
	  click_button_code: function(){ // 使用按钮样式(查看合同)
	   if ((this.txt_code != "" && this.txt_code.length == 6) && !this.isLoading) {
	      return {
	        click_btn: false
	      }
	    }
	    else {
	      return {
	        click_btn: true
	      }
	    }
	  },
	  login_codeDisabled: function () {
	    if ((this.txt_code == "" || this.txt_code.length != 6) || this.isLoading) {
	      return true
	    }
	    else {
	      return false
	    }
	  },
	  button_phone_dis: function () {
	    if ((this.dataPhone != "" && this.dataPhone.length == 11) && !this.isLoading) {
	      return false
	    }
	    else {
	      return true
	    }
	  },
  },
  methods:{
  	btnsubmit(){//查看合同
  	  let that=this;
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
      that.axios({
  			method:'post',
  			url:api.interviewLogin,
  			headers:headers(),
  			data:{
  				enterpriseId:that.enterpriseId,
  				candidatePhone:that.dataPhone,
  				phoneCode:that.txt_code,
  			},
  			cache:false
  			}).then(function(res){
  				console.log(res);
  				Indicator.close();
					if(res.data.code===10000){
						let dataId=res.data.data;
           that.$router.push({path:'/registration',query:{dataId:dataId}});
				  }else{
					 that.$toast(res.data.msg);
					}
				}).catch(error => {
				 
			});
  	},
	  timingCode() { //发送验证码倒计时
	  	let that=this;
	    let interval = setInterval(() => {
	      if (that.timeNum > 0 && this.timeNum < 61) {
	        that.codeState = false;
	        that.codeState2=true;
	        that.timeNum--;
	      }
	      else if (that.timeNum == 0) {
	        that.codeState = true;
	        that.codeState2=false;
	        clearInterval(interval);
	        that.timeNum = 60;
	      }
	    }, 1000)
	  },
  	get_code(){//获取验证码
  	  let that=this;
	    that.codeState = false;
	    that.codeState2=true;
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
      that.axios({
  			method:'post',
  			url:api.getcode+'/'+that.dataPhone+'/3',
  			headers:headers("application/x-www-form-urlencoded"),
//			data:"mobile="+that.dataPhone,
  			cache:false
  			}).then(function(res){
  				console.log(res);
  				Indicator.close();
					if(res.data.code===10000){
				   that.timingCode(); //倒计时
				  }else{
					 that.$toast(res.data.msg);
					 that.codeState=true;
					 that.codeState2=false;
					}
				}).catch(error => {
				 
			});
  	},
  },
  mounted(){
  	let that=this;
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.checkIn{background: #F5F5F5;font-family:PingFangSC-Semibold;}	
.checkIn .checkIn_div{}	
.checkIn .checkIn_div .checkIn_header{ height: 1rem;
font-size:0.3rem;
font-weight:600;
color:#303030;
}
.checkIn .checkIn_div .checkIn_header span{line-height: 1rem;}
.checkIn .checkIn_div .checkIn_header .home_img{
	height: 0.3rem;
	width: 0.36rem;
	display: inline-block;	margin: 0.3rem 0.2rem 0 0;
	background: url(../../assets/img/Interview/ic_compny.png) bottom no-repeat;
	background-size: 100%;
}
.checkCon{ background: #fff; padding:0 0.3rem;}
.checkCon .checkCon_title{height: 1rem; line-height: 1rem; font-size:0.3rem;font-weight:400;color:#303030;}
.checkCon .checkCon_title2{line-height: 0.4rem; text-align: left; font-size:0.28rem;font-weight:400;color:#666;}
.checkCon .checkCon_warning{height: 1rem; line-height: 1rem; text-align: left; font-size:0.26rem;font-weight:400;color:#F95714;}
.checkCon .checkCon_warning i{
	height: 0.24rem;
	width: 0.24rem;float: left;
	display: inline-block;
	margin: 0.38rem 0.1rem 0 0;
	background: url(../../assets/img/Interview/ic_tips.png) no-repeat;
	background-size: 100%;
}
.invalid_title{
	height: 0.6rem;
	font-size:0.34rem;
	color: #F95714;
	text-align: center;
}
.invalid_title2{
	font-size: 0.3rem;
	color: #666;
	text-align: center;
}
.invalid_img{
    position: relative;
    width: 100%;
}
.invalid_img2{
	position: absolute;
    left: 50%;
    top: 12%;
    width: 2.2rem;
    margin-left: -1.1rem;
}
</style>
