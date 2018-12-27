<template>
 <div class="registration">
   <div>	 
	 <ul class="steps">
		<li>个人信息</li>
		<li>个人经历</li>
		<li class="active">其他信息</li>
    </ul>
   </div>
   <div class="infor">
	   <div class="inforImg"></div>
	   <div class="inforTxt">其他信息</div>
   </div>
   <div class="infor_form">
		 <div class="textarea_div">
			 <div class="text_title">您的性格爱好及特长</div>
			 <textarea placeholder="请在些输入内容(限1000字)" v-model="otherData.hobby" maxlength="1000"></textarea>	   
		 </div>
		 <div class="textarea_div">
		 	<div class="text_title">您的英语水平</div>
		 	<textarea placeholder="请在些输入内容(限1000字)" v-model="otherData.englishLevel" maxlength="1000"></textarea>	   
		 </div>
		 <div class="textarea_div">
		 	<div class="text_title">您的计算机水平</div>
		 	<textarea placeholder="请在些输入内容(限1000字)" v-model="otherData.computersLevel" maxlength="1000"></textarea>	   
		 </div>
		 <div class="textarea_div">
		 	<div class="text_title">您获得的证书</div>
		 	<textarea placeholder="请在些输入内容(限1000字)" v-model="otherData.certificate" maxlength="1000"></textarea>	   
		 </div>
		 <div class="textarea_div">
		 	<div class="text_title">公司内部有无亲戚朋友</div>
			<div style="height: 1.2rem;line-height: 1.2rem;border-bottom: 1px solid #ddd;" @click="haveClick">
				<div class="form_input">
				<input type="text" autocomplete="off" v-model="otherData.isRelation" class="input_txt"  placeholder="请选择" />
				</div>
				<div class="icon_r"></div>
			</div>
		 </div>
		 <div class="infor_form">
		 <div class="form_div">
		 <div class="form_title">应聘途径</div> 
		 <div class="form_input" @click="applicationClick">
		 <input type="text" autocomplete="off" v-model="otherData.applyPath" class="input_txt" placeholder="请选择应聘途径" />
		 </div>
		 <div class="icon_r"></div>
		 </div>
		 </div>
		 
   </div>
	 <div class="Tips">
		 <div class="Tips_img"></div>
		 <div class="Tips_txt">本人已准确理解、并接受上述各项目内容及要求，保证所填内容属实，并同意公司进行核实，如有不实之处，本人无条件接受公司辞退处分，并承担相应责任。</div>
	 </div>
   <div class="btn_div">
   	<button class="btn" id="login_btn" @click="thirdClick">提交</button>
   </div>
	 <!-- 弹出框 start -->
	 <!-- 公司内部有无亲戚朋友  -->
	 <van-popup v-model="show" :overlay="true" position="bottom" :close-on-click-overlay="true">
	 <van-picker :show-toolbar="true" :columns="columns" cancel-button-text="取消" @cancel="onCancel" confirm-button-text="完成" @confirm="onConfirm" />
	 </van-popup>
	 <!-- 应聘途径  -->
	 <van-popup v-model="showApplication" :overlay="true" position="bottom" :close-on-click-overlay="true">
	 <van-picker :show-toolbar="true" :columns="columnsApplication" cancel-button-text="取消" @cancel="onCancelApplication" confirm-button-text="完成" @confirm="onConfirmApplication" />
	 </van-popup>
 </div>
</template>

<script>
	import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
	import { Indicator} from 'mint-ui';

export default {
  name: 'registration3',
  data () {
    return {
			interviewFormTemplate:this.$route.query.interviewFormTemplate,
			interviewId:this.$route.query.interviewId,
		otherData:{
			hobby:'',//您的性格爱好及特长
			englishLevel:'',//您的英语水平
			computersLevel:'',//您的计算机水平
			certificate:'',//您获得的证书
			isRelation:'',//公司内部有无亲戚朋友
			applyPath:'',//应聘途径
		},
    	show:false,
    	columns:['有','无'],
    	showApplication:false,
    	columnsApplication:['内部推荐','社招官网','拉钩','猎聘','BOSS直聘'],
    }
  },
  watch:{
	  
  },
  computed:{
	 
  },
  methods:{
   haveClick(){//公司内部有无亲戚朋友
			this.show=true;
		},
		onConfirm(value, index) {//公司内部有无亲戚朋友完成
			this.otherData.isRelation=value;
			this.show=false;
		},
		onCancel(){//公司内部有无亲戚朋友取消
			this.show=false;
		},
	 applicationClick(){//公司内部有无亲戚朋友
	 	this.showApplication=true;
	 },
	 onConfirmApplication(value, index) {//公司内部有无亲戚朋友完成
	 	this.otherData.applyPath=value;
	 	this.showApplication=false;
	 },
	 onCancelApplication(){//公司内部有无亲戚朋友取消
	 	this.showApplication=false;
	 },
	 thirdClick(){
		 let that=this;

		Indicator.open({
			text: '加载中...',
			spinnerType: 'fading-circle'
		});
		that.axios({
			method:'post',
			url:api.registration+'/'+that.interviewId+'/1',
			headers:headers(),
			data:{
				"hobby":that.otherData.hobby, //您的性格爱好及特长
				"englishLevel":that.otherData.englishLevel,//您的英语水平
				"computersLevel":that.otherData.computersLevel,//您的计算机水平
				"certificate":that.otherData.certificate,//您获得的证书
				"isRelation":that.otherData.isRelation,//公司内部有无亲戚朋友
				"applyPath":that.otherData.applyPath,//应聘途径
			},
			cache:false
			}).then(function(res){
				console.log(res);
				Indicator.close();
				if(res.data.code===10000){
					that.$router.push({path:'/I_success'});
				}else{
					that.$router.push({path:'/wm'});
				    // that.$toast(res.data.msg);
				}
			}).catch(error => {
			
		});
		
	 },
	 getData(){
	 	let that=this;
	 	Indicator.open({
	 		text: '加载中...',
	 		spinnerType: 'fading-circle'
	 	});
	 	that.axios({
	 		method:'get',
	 		url:api.getregistration+'/'+that.interviewFormTemplate,
	 		headers:headers(),
	 		cache:false
	 		}).then(function(res){
	 			console.log(res);
	 			Indicator.close();
	 			if(res.data.code===10000){
	 				that.otherData=res.data.data;
	 			}else{
	 			that.$toast(res.data.msg);
	 			}
	 		}).catch(error => {
	 		
	 	});
	 	
	 }
		
  },
  mounted(){
  	let that=this;
  	if(that.interviewFormTemplate!=null){
  		that.getData();
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.steps {
  position: relative;
  counter-reset: step;  /*创建步骤数字计数器*/
  height: 2rem;
  margin-top: 0.2rem;
}
/*步骤描述*/
.steps li {
  list-style-type: none;
  font-size: 12px;
  text-align: center;
  width: 33.33%;
  position: relative;
  float: left;
}
 
/*步骤数字*/
.steps li:before {
  display: block;
  content: counter(step); /*设定计数器内容*/
  counter-increment: step;  /*计数器值递增*/
  width: 26px;
  height: 26px;
  background-color: #F95714;
  line-height: 26px;
  border-radius: 26px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin: 0 auto 8px auto;
  box-shadow: 0 0 10px #F95714;
  
}
 
/*连接线*/
.steps li ~ li:after {
  content: '';
  width: 100%;
  height: 2px;
  background-color: #F95714;
  position: absolute;
  left: -50%;
  top: 15px;
  z-index: -1; /*放置在数字后面*/
}
 
/*将当前/完成步骤之前的数字及连接线变绿*/
.steps li.active:before,
.steps li.active:after {
  background-color: #F95714;
}
 
/*将当前/完成步骤之后的数字及连接线变灰*/
.steps li.active ~ li:before,
.steps li.active ~ li:after {
  background-color: #BCBCBC;
  box-shadow:none; 
}
.infor{height: 1rem;background: #F5F5F5;}
.infor .inforImg{width: 0.4rem; height: 0.4rem; background: url(../../assets/img/Interview/qita.png) no-repeat; display: inline-block; float: left; background-size: 100%;margin:0.3rem 0.2rem;}
.infor .inforTxt{float: left; display: inline-block;font-size: 0.3rem;color: #303030; line-height: 1rem;}

.infor_form{ padding:0 0.2rem;}
.infor_form .form_div{}
.infor_form .form_div .form_title{float: left;
    display: inline-block;
    width: 32%;
    font-size: 0.3rem;
	text-align: left;}
.infor_form .form_input{float: left;width:60%; display: inline-block;font-size: 0.3rem;}
.form_title i{margin: 0 0.1rem; color: #f95714;}
.icon_r{float: right; display: inline-block;width: 0.2rem; height: 0.3rem; background: url(../../assets/img/Interview/icon_right.png) no-repeat
; background-size: 100%;margin-top: 0.5rem;}
.btn_div{background: #F5F5F5; padding-bottom: 0.3rem;}
.btn_div .btn{width: 90%;}
.infor_form .form_div:last-child{border-bottom: none;}
.m-picker .m-picker-header span:last-of-type {
    color: #F95714 !important;
}
.textarea_div .text_title{
	font-size: 0.3rem;
  text-align: left;
  margin-top: 0.2rem;
}
.textarea_div textarea{
	  width: 94%;
    min-height: 2rem;
    font-size: 0.3rem;
    padding: 0.2rem;
    margin: 0.2rem 0;
    background: #FAFAFA;
    border: none;
    border-radius: 0.1rem;
		resize:none
}
.Tips{background: #F5F5F5;width: 100%;}
.Tips .Tips_img{display:inline-block;float: left;
	  width: 0.4rem;
    height: 0.4rem;
    background: url(../../assets/img/ic_round_cb.svg) no-repeat;
    background-size: 100%;
    margin: 0.3rem 0.2rem;}
.Tips .Tips_txt{display:inline-block;float: left;color: #ccc;
    font-size: 0.3rem;
    width: 88%;
    text-align: left;
    margin-top: 0.3rem;}
</style>
