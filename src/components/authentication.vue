<template>
  <div class="authentication">
    <div class="model_div_none" id="model_img" v-if="smscode_secc">
		<div class="model_bg_none"></div>
		<div class="model_div" id="model_div">
		  <img src="../assets/img/ic-customer1@2x.png" /> 
		  <div class="model_bg_f txt_c">
            签署成功
		  </div>
		 <div class="delete_div" @click="close_model">
		   <img src="../assets/img/ic_delete.svg" />
		 </div>
		</div>
	  </div>
        <!--
        	作者：yaobo324413@163.com
        	时间：2018-09-22
        	描述：弹出框 end
        -->
  	<div class="model_div_none" id="model_form" v-if="smscode_div">
		<div class="model_bg_none"></div>
		<div class="model_div" id="model_div">
		  <div class="model_bg_f">
			<form>
				<div class="form_div">
				  <img class="icon_img" src="../assets/img/ic_phone.svg" />
				  <input type="tel" class="input_txt" v-model="dataPhone" autocomplete="off" readonly="readonly" placeholder="请输入手机号码" id="input_phone" maxlength="11" minlength='11' />
				</div>
				<div class="form_div">
					<div class="f_l" style="width: 56%;">
						<img class="icon_img" src="../assets/img/ic_password.svg" />
						<input style="width: 76%;" type="tel" autocomplete="off" v-model="smsCode" maxlength="6" minlength class="input_txt" id="input_code" placeholder="请输入验证码" />
					</div>
					<div class="f_r btn_sms" @click="get_code" v-if="codeState">获取验证码</div>
          <div class="f_r btn_sms click_btn" disabled="true" v-if="codeState2">{{timeNum}}s后重发</div>
				</div>
			</form>
      <div class="model_btn" @click="click_codeSubmit" :class="click_button_code" :disabled="codeDisabled">确定</div>
		  </div>
		 <div class="delete_div" @click="close_model">
		   <img src="../assets/img/ic_delete.svg" />
		 </div>
		</div>
	  </div>
    <!--
    	作者：yaobo324413@163.com
    	时间：2018-09-25
    	描述：弹出框 form end
    -->
  	
    <div class="authentication_div">
			<div class="err_div" v-if="err_div">
				<img src="../assets/img/ic_remind@2x.svg" />
				<span id="err_span">{{err_info}}</span>
			</div>
			<form>
				<div class="form_div_a">
				  <div class="form_lable">姓名<span>*</span></div>
				  <div class="form_input">
				   <input type="text" autocomplete="off" v-model="nameAuth" class="input_txt" placeholder="请输入姓名" readonly="readonly" name="name" maxlength="5" id="input_name" />
				  </div>
				</div>
				<div class="form_div_a">
				  <div class="form_lable">身份证号<span>*</span></div>
				  <div class="form_input">
				   <input type="text" maxlength="18" minlength="18" autocomplete="off" v-model="cardAuth" readonly="readonly" class="input_txt" placeholder="请输入身份证号" id="input_card" />
				  </div>	
				</div>
				<div class="arr_txt">
				   <div class="arr_txt_img"><img src="../assets/img/ic_remind@2x.svg" /></div>
				   <div class="arr_txt_span">请书上传身份证正、反两面照片；图片权限jpeg、jpg、png格式且大小不超过10M</div>
				</div>
				<div class="form_div_a" style="border-bottom: none;">
				 	<div class="form_lable">上传身份证<span>*</span></div>
				</div>
			 	<div class="file_div">
			 		<ul class="file_ul">
			 			<li class="file_li">
              <div class="file_input">
              	<div class="uploadFile">
								 <img :src="iconUrl" id="img-preview"/>
								 <input type="file" id='file' accept="image/bmp,image/jpg,image/png,image/jpeg" action=""/>
								</div>
              </div>
			 			  <div class="file_txt">身份证正面</div>
			 			</li>
			 			<li class="file_li">
	          <div class="file_input">
	          	<!--<img src="../assets/img/ic_upload@2x.svg" />-->
              	<div class="uploadFile">
								 <img :src="iconUrl" id="img-previewBack"/>
								 <input type="file" id='fileBack' accept="image/bmp,image/jpg,image/png,image/jpeg" action=""/>
								</div>
	          </div>
	          <div class="file_txt">身份证反面</div>
			 			</li>
			 		</ul>
			 	</div>
				<div class="arr_txt">
					<div class="arr_txt_img"><img src="../assets/img/ic_remind@2x.svg" /></div>
					<div class="arr_txt_span">点击确认签署实名认证成功后即完成签约</div>
				</div>
			</form>
			<div class="btn_div">
				<button class="btn" id="btnSubmit" :class="click_button_auth" :disabled="auth_Disabled" @click="click_btnSubmit">确认签署</button>
			</div>
		</div>
  </div>
</template>

<script>
	import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
	import upLoad from '@/components/common/upLoad';
	import { Indicator } from 'mint-ui';

export default {
  name: 'authentication',
  data () {
    return {
    	err_div:false,
      code:this.$route.query.code,
      dataPhone:this.$route.query.mobile,
      nameAuth:localStorage.getItem('name'),
      cardAuth:localStorage.getItem('employeeIdCard'),
      iconUrl:'',
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg',
      },
      err_info:'',
      smscode_div:false,
      smsCode:'',
	    codeState:true,
	    codeState2:false,
	    timeNum: 60,
      smscode_secc:false,
    }
  },
  watch:{
	  smsCode:function(){
	  	this.smsCode=this.smsCode.replace(/[^\d]/g,'');
	  },
	  cardAuth:function(){
	  	this.cardAuth=this.cardAuth.replace(/[\W]/g,'');
	  }
  },
  computed:{
	  click_button_auth: function(){ // 使用按钮样式(查看合同)
	   if ((this.nameAuth!="" && this.cardAuth != "" && this.cardAuth.length == 18) && !this.isLoading) {
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
	  auth_Disabled: function () {
	    if ((this.nameAuth=="" && this.cardAuth == "" || this.cardAuth.length != 18) || this.isLoading) {
	      return true
	    }
	    else {
	      return false
	    }
	  },
	  click_button_code: function(){ // 使用按钮样式(查看合同)
	   if ((this.smsCode != "" && this.smsCode.length == 6) && !this.isLoading) {
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
	  codeDisabled: function () {
	    if ((this.smsCode == "" || this.smsCode.length != 6) || this.isLoading) {
	      return true
	    }
	    else {
	      return false
	    }
	  },
	},
	methods:{
		close_model(){//关闭弹框
			let that=this;
			that.smscode_div=false;
			that.smscode_secc=false;
			that.smsCode="";
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
  			url:api.getcode+'/'+that.dataPhone+'/45',
  			headers:headers("application/x-www-form-urlencoded"),
//			data:"mobile="+that.dataPhone,
  			cache:false
  			}).then(function(res){
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
		click_codeSubmit(){
      Indicator.open({
        text: '加载中...'
      });
			let that=this;
			if(that.smsCode==''){
				that.$toast("请输入验证码");
				return false;
			}else{
        let x = document.getElementById('file').files[0];
	      let xBack = document.getElementById('fileBack').files[0];
        let params = new FormData() ; //创建一个form对象
	      params.append('employeePhone',that.dataPhone);//员工手机号(页面不显示)
	      params.append('employeeName',that.nameAuth);//员工姓名
	      params.append('employeeIdCard',that.cardAuth);//员工身份证
	      params.append('front',x,x.name);  //append 向form表单添加数据    身份证正面照
	      params.append('back',xBack,xBack.name);  //append 向form表单添加数据  	身份证反面照
	      params.append('agreementId',that.code);//合同编号
	      params.append('smsCode',that.smsCode);//	短信验证码
	      params.append('enterpriseId',localStorage.getItem('enterpriseId'));
	      //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
				Indicator.open({
					text: '加载中...',
					spinnerType: 'fading-circle'
				});
           that.axios({
  	        method:'post',
		  			url:api.contractinfo,
		  			headers:headers("multipart/form-data"),
				    xhrFields: {
				        withCredentials: true // 携带跨域cookie
				    },
		  			data:params,
		  			cache:false
		  		}).then(function(res){
	          console.log(res);
	          Indicator.close();
	          if(res.data.code==10000){
	          	that.smscode_div=false;
              that.smscode_secc=true;
	          }else{
							that.smscode_div=false;
							that.smsCode="";
	          	that.$toast(res.data.msg);
	          }
	      })
		  				
			}
		},
		click_btnSubmit(){//确认签署
        let that=this;
	      let x = document.getElementById('file').files[0];
	      let xBack = document.getElementById('fileBack').files[0];
	      let pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	      console.log(x+"*");
	      console.log(xBack+"*2");
	      if(that.nameAuth==''){
      		that.err_div=true;
      		that.err_info='请填写姓名';
      		return false;
	      }else if(that.cardAuth==''){
      		that.err_div=true;
      		that.err_info='请填写身份证号';
      		return false;
	      }else if(!pattern.test(that.cardAuth) || that.cardAuth.length != 18){
      		that.err_div=true;
      		that.err_info='请填写正确的身份证号码';
      		return false;
	      }else if(x =='' || x==undefined){
      		that.err_div=true;
      		that.err_info='请选择要上传的身份证正面';
      		return false;
	      }else if(xBack =='' || xBack==undefined){
      		that.err_div=true;
      		that.err_info='请选择要上传的身份证反面';
      		return false;
	      }else{
	        let x = document.getElementById('file').files[0];
		      let xBack = document.getElementById('fileBack').files[0];
	        let params = new FormData() ; //创建一个form对象
		      params.append('employeePhone',that.dataPhone);//员工手机号(页面不显示)
		      params.append('employeeName',that.nameAuth);//员工姓名
		      params.append('employeeIdCard',that.cardAuth);//员工身份证
		      params.append('front',x,x.name);  //append 向form表单添加数据    身份证正面照
		      params.append('back',xBack,xBack.name);  //append 向form表单添加数据  	身份证反面照
		      params.append('agreementId',that.code);//合同编号
//		      params.append('smsCode',that.smsCode);//	短信验证码
		      params.append('enterpriseId',localStorage.getItem('enterpriseId'));
		      //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
					Indicator.open({
						text: '加载中...',
						spinnerType: 'fading-circle'
					});
	           that.axios({
	  	        method:'post',
			  			url:api.authentication,
			  			headers:headers("multipart/form-data"),
					    xhrFields: {
					        withCredentials: true // 携带跨域cookie
					    },
			  			data:params,
			  			cache:false
			  		}).then(function(res){
		          console.log(res);
		          Indicator.close();
		          if(res.data.code==10000){
		          	if(res.data.data=true){
                  that.$router.push({path:'/signature',query:{code:that.code,mobile:that.dataPhone}});
		          	}else{
		          		that.$toast(res.data.msg);
		          	}
		          }else{
		          	that.$toast(res.data.msg);
		          }
		      })
	      	
	      }
		},
     //实时显示该图片在页面
		great(){
      document.getElementById('file').onchange = function () {
      console.log(this.files[0]);
      var files_size=this.files[0].size;
      var isLt5M= files_size / 1024 / 1024 < 5;
      console.log(isLt5M);
	    if (!isLt5M) {
	     this.$message.error('图片选择失败，每张图片大小不能超过 5MB,请重新选择!');
	     return false;
	    } else {
	      var imgFile = this.files[0];
	      var fr = new FileReader();
	      fr.onload = function () {
	        document.getElementById('img-preview').style.display='block';
	        document.getElementById('img-preview').src = fr.result;
	      };
	      fr.readAsDataURL(imgFile);
	    } 
     }
    },
    greatBack(){
      document.getElementById('fileBack').onchange = function () {
      console.log(this.files[0]);
      var files_size=this.files[0].size;
      var isLt5M= files_size / 1024 / 1024 < 5;
      console.log(isLt5M);
	    if (!isLt5M) {
	     this.$message.error('图片选择失败，每张图片大小不能超过 5MB,请重新选择!');
	     return false;
	    } else {
	      var imgFile = this.files[0];
	      var fr = new FileReader();
	      fr.onload = function () {
	        document.getElementById('img-previewBack').style.display='block';
	        document.getElementById('img-previewBack').src = fr.result;
	      };
	      fr.readAsDataURL(imgFile);
	    } 
     }
    }
	},
	mounted(){
   this.great();
   this.greatBack();
   document.getElementById('img-preview').style.display='none';
   document.getElementById('img-previewBack').style.display='none';
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .uploadFile{
 	display: inline-block;
	background: url(../assets/img/ic_upload@2x.svg) no-repeat;
	position: absolute;
	cursor: pointer;
	width:3.2rem;
	height:2rem;
	background-size: 100%;
  margin: 0.1rem;
  padding: 0.1rem;
 }
.uploadFile input{
 	  opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
 }
.uploadFile #img-preview,.uploadFile #img-previewBack{
 	    width: 100%;
    height: 100%;
    position: absolute;
        margin-top: -0.1rem;
    margin-left: -0.1rem;
 }
.authentication{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
.authentication .authentication_div{
	margin-top: 0.2rem;
	background: #fff;
}
.authentication_div .form_div_a{
	margin: 0 0.26rem;
	width: auto;
}
.authentication_div .arr_txt{
	background: #F5F5F5;
	padding: 0.2rem;
	width: auto;
}
.authentication_div .btn_div{
	width: auto;
	margin: 0 0.26rem;
}
.authentication_div .file_div .file_ul{
	width: 100%;
	height: 3rem;
	overflow: hidden;
}
.authentication_div .file_div .file_ul .file_li{
  width: 50%;
  overflow: hidden;
}
.authentication_div .file_div .file_ul .file_li .file_input{
    text-align: center;
    display: inline-block;
    width: 100%;
    position: relative;
}
.authentication_div .file_div .file_ul .file_li:first-child .uploadFile{
	right: 0;
}
.authentication_div .file_div .file_ul .file_li:nth-child(2) .uploadFile{
	left: 0;
}
</style>
