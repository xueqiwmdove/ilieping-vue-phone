<template>
  <div class="login">
   <div class="login_div" v-show="Is_login">
			<div class="header_div">
				<img src="../assets/img/logo@2x.svg" />
			</div>
			<form>
				<div class="form_div">
				  <img class="icon_img" src="../assets/img/ic_phone.svg" />
				  <input type="tel" class="input_txt" autocomplete="off" v-model="dataPhone" placeholder="请输入手机号码" readonly="readonly" id="input_phone" maxlength="11" minlength='11' />
				</div>
				<div class="form_div">
					<div class="f_l" style="width:55%;">
						<img class="icon_img" src="../assets/img/ic_password.svg" />
						<input type="tel" style="width:70%;" autocomplete="off" v-model="txt_code" maxlength="6" minlength='6' class="input_txt" id="input_code" placeholder="请输入短信验证码" />
					</div>
					<div class="f_r btn_sms" @click="get_code" v-if="codeState" :disabled="button_phone_dis">获取验证码</div>
          <div class="f_r btn_sms click_btn" disabled="true" v-if="codeState2">{{timeNum}}s后重发</div>
				</div>
			</form>
			<div class="btn_div">
				<button class="btn" id="login_btn" @click="btnsubmit" :class="click_button_code" :disabled="login_codeDisabled">查看合同</button>
			</div>
		</div>
		<div class="Invalid_div" v-show="Is_Invalid">
			<img src="../assets/img/Invalid/Invalid_img.png" />
    <div>
    	<div class="invalid_title">合同链接失效</div>
    	<div class="invalid_title2">失效原因：合同已签署/合同已截止签约</div>
    </div>
		</div>
  </div>
</template>

<script>
	import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
	import { Indicator } from 'mint-ui';
	
export default {
  name: 'login',
  data () {
    return {
      urlcode:this.$route.query.code,
      dataPhone:'',
      txt_code:'',
	    codeState:true,
	    codeState2:false,
	    timeNum: 60,
	    Is_login:true,
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
  			url:api.getlogin,
  			headers:headers(),
  			data:{
  				agreementId:that.urlcode,
  				mobile:that.dataPhone,
  				smsCode:that.txt_code,
  			},//"mobile="+that.dataPhone+"&smsCode="+that.txt_code,
		    xhrFields: {
		        withCredentials: true // 携带跨域cookie
		    },
  			cache:false
  			}).then(function(res){
  				console.log(res);
  				Indicator.close();
					if(res.data.code===10000){
           that.$router.push({path:'/contract',query:{code:that.urlcode,mobile:that.dataPhone}});
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
  			url:api.getcode+'/'+that.dataPhone+'/44',
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
					}
				}).catch(error => {
				 
			});
  	},
  	getPhone(){//合同是否过期，获取手机号
  		let that=this;
      if(!that.urlcode){
      	that.$toast("合同编号不能为空");
      	return false;
      }else{
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
	      that.axios({
	  			method:'get',
	  			url:api.contractStatus+that.urlcode,
	  			headers:headers("application/json;charset=utf-8"),
	  			cache:false
	  			}).then(function(res){
	  				console.log(res);
	  				Indicator.close();
						if(res.data.code === 10000) {
	           that.dataPhone=res.data.data;
						} else {
							that.Is_login=false;
							that.Is_Invalid=true;
						 that.$toast(res.data.msg);
						}
					}).catch(error => {
					 
				});
      }
  		
		},
		
  },
  mounted(){
  	let that=this;
  	that.getPhone();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
