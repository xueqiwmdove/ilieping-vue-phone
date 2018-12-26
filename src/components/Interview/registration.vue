<template>
 <div class="registration">
   <div>	 
	 <ul class="steps">
		<li class="active">个人信息</li>
		<li >个人经历</li>
		<li>其他信息</li>
    </ul>
   </div>
   <div class="infor">
	   <div class="inforImg"></div>
	   <div class="inforTxt">个人信息</div>
   </div>
   <div class="infor_form">
	   <div class="form_div">
		  <div class="form_title"><i>*</i>姓名</div> 
		  <div class="form_input">
			  <input type="text" autocomplete="off" class="input_txt" placeholder="请输入您的姓名" v-model="user.name" />
		  </div>
	   </div>
	   <div class="form_div">
	   <div class="form_title"><i>*</i>姓别</div> 
	   <div class="form_input">
			 <el-radio v-model="user.sex" label="1">男</el-radio>
       <el-radio v-model="user.sex" label="2">女</el-radio>
	   </div>
	   </div>
	   <div class="form_div">
	   <div class="form_title"><i>*</i>出生日期</div> 
	   <div class="form_input" @click="setDate">
	   	<input type="number" class="input_txt" v-model="user.dateOfBirth" onfocus="this.blur();" :placeholder="user.dateOfBirth?user.dateOfBirth:'请选择您的出生日期'" />
		 </div>
	   <div class="icon_r"></div>
	   </div>
	   <div class="form_div">
	   <div class="form_title"><i>*</i>邮箱</div> 
	   <div class="form_input">
	   	<input type="text" autocomplete="off" v-model="user.email" class="input_txt" placeholder="请输入您的邮箱地址" />
	   </div>
	   </div>
	   <div class="form_div">
	   <div class="form_title"><i>*</i>手机号码</div> 
	   <div class="form_input">
	   	<input type="number" autocomplete="off" maxlength="11" minlength='11' v-model="user.mobile" class="input_txt" placeholder="请输入您的手机号码" />
	   </div>
	   </div>
	   <div class="form_div">
	   <div class="form_title"><i>*</i>应聘岗位</div> 
	   <div class="form_input">
	   	<input type="text" autocomplete="off" class="input_txt" v-model="user.post" placeholder="请输入您的应聘的岗位名称" />
	   </div>
	   </div>
	   <div class="form_div">
	   <div class="form_title">所在行业</div> 
	   <div class="form_input" onfocus="this.blur();" @click="IndustryClick">
	    <input type="text" autocomplete="off" class="input_txt" v-model="user.industry" placeholder="请选择所在行业" />
	   </div>
	   <div class="icon_r"></div>
	   </div>
	   <div class="form_div">
	   <div class="form_title">期望行业</div> 
	   <div class="form_input" onfocus="this.blur();" @click="ExpectClick">
	   <input type="text" autocomplete="off" class="input_txt" v-model="user.desiredIndustry" placeholder="请选择期望行业" />
	   </div>
	   <div class="icon_r"></div>
	   </div>
	   <div class="form_div">
	   <div class="form_title">工作城市</div> 
	   <div class="form_input" onfocus="this.blur();" @click="cityClick">
	   <input type="text" autocomplete="off" v-model="user.workCity" class="input_txt" placeholder="请选择工作城市" />
	   </div>
	   <div class="icon_r"></div>
	   </div>
		 <div class="form_div">
		 <div class="form_title">具体地址</div> 
		 <div class="form_input">
		 <input type="text" autocomplete="off" v-model="user.address" class="input_txt" placeholder="请输入您的具体地址" />
		 </div>
		 </div>
	   <div class="form_div">
	   <div class="form_title">当前薪酬</div> 
	   <div class="form_input">
	   <input type="number" autocomplete="off" v-model="user.nowSalary" class="input_txt" placeholder="请输入您的当前薪酬" />
	   </div>
	   </div>
	   <div class="form_div">
	   <div class="form_title">期望薪酬</div> 
	   <div class="form_input">
	   <input type="number" autocomplete="off" v-model="user.expectSalary" class="input_txt" placeholder="请输入您的期望薪酬" />
	   </div>
	   </div>
	   <div class="form_div">
	   <div class="form_title">目前工作状态</div> 
	   <div class="form_input" @click="workStatusClick">
	   <input type="text" autocomplete="off" v-model="user.wordStatus" lass="input_txt" placeholder="请选择目前工作状态" />
	   </div>
	   <div class="icon_r"></div>
	   </div>
	   <div class="form_div">
	   <div class="form_title">最快到岗时间</div> 
	   <div class="form_input">
	   <input type="text" autocomplete="off" v-model="user.arrivalTime" class="input_txt" placeholder="请输入您的最快到岗时间" />
	   </div>
	   </div>
		 <div class="form_div">
		 <div class="form_title">技能标签</div> 
		 <div class="form_input">
		 <input type="text" autocomplete="off" v-model="user.skillLabel" maxlength="12" class="input_txt" placeholder="请输入您的技能标签,最多12字" />
		 </div>
		 </div>
	   <div class="form_div">
	   <div class="form_title">政治面貌</div> 
	   <div class="form_input" @click="politicalOutlookClick">
	   <input type="text" autocomplete="off" v-model="user.politics" class="input_txt" placeholder="请选择您的政治面貌" />
	   </div>
	   <div class="icon_r"></div>
	   </div>
	   <div class="form_div">
	   <div class="form_title">籍贯</div> 
	   <div class="form_input">
	   <input type="text" autocomplete="off" v-model="user.nativePlace" class="input_txt" placeholder="请输入您的户籍地址" />
	   </div>
	   </div>
	   <div class="form_div">
	   <div class="form_title">婚姻状况</div> 
	   <div class="form_input" @click="marriageStatusClick">
	   <input type="text" autocomplete="off" v-model="user.marital" class="input_txt" placeholder="请选择您的婚姻状况" />
	   </div>
	   <div class="icon_r"></div>
	   </div>
	   <div class="form_div">
	   <div class="form_title">生育状况</div> 
	   <div class="form_input" onfocus="this.blur();" @click="fertilityClick">
	    <input type="text" autocomplete="off" class="input_txt" :placeholder="user.fertility?user.fertility:'请输入您的生育状况'"/>
		 </div>
	   <div class="icon_r"></div>
	   </div>
	   <div class="form_div">
	   <div class="form_title">身份证号码</div> 
	   <div class="form_input">
	   <input type="text" autocomplete="off" maxlength="18" minlength='18' v-model="user.idCard" class="input_txt" placeholder="请输入您的身份证号码" />
	   </div>
	   </div>
		 
   </div>

   <div class="btn_div">
   	<button class="btn" id="login_btn" @click="firstClick">下一步</button>
   </div>
	 
	 <!-- 弹出框 start -->
	 <!-- 生育状况  -->
	 <van-popup v-model="show" :overlay="true" position="bottom" :close-on-click-overlay="true">
		 <van-picker :show-toolbar="true" :columns="columns" cancel-button-text="取消" @cancel="onCancel" confirm-button-text="完成" @confirm="onConfirm" />
	 </van-popup>
	 <!-- 所在行业  -->
	 <van-popup v-model="showIndustry" :overlay="true" position="bottom" :close-on-click-overlay="true">
	 	<van-picker :show-toolbar="true" :columns="columnsIndustry" cancel-button-text="取消" @cancel="onCancelIndustry" confirm-button-text="完成" @confirm="onConfirmIndustry"/>
	 </van-popup>
	 <!-- 期望行业  -->
	 <van-popup v-model="showExpect" :overlay="true" position="bottom" :close-on-click-overlay="true">
	 <van-picker :show-toolbar="true" :columns="columnsIndustry" cancel-button-text="取消" @cancel="onCancelExpect" confirm-button-text="完成" @confirm="onConfirmExpect"/>
	 </van-popup>
	 <!-- 城市  -->
	<van-popup v-model="showCity" :overlay="true" position="bottom" :close-on-click-overlay="true">
		<van-area :area-list="areaList" :columns-num="3" title="选择城市" value="310110" @cancel="onCancelArea" @confirm="onConfirmArea"/>
	</van-popup>
	<!-- 目前工作状态  -->
	<van-popup v-model="showWorkStatus" :overlay="true" position="bottom" :close-on-click-overlay="true">
		<van-picker :show-toolbar="true" :columns="columnsWorkStatus" cancel-button-text="取消" @cancel="onCancelWorkStatus" confirm-button-text="完成" @confirm="onConfirmWorkStatus"/>
	</van-popup>
	<!-- 政治面貌  -->
	<van-popup v-model="showPoliticalOutlook" :overlay="true" position="bottom" :close-on-click-overlay="true">
		<van-picker :show-toolbar="true" :columns="columnsPoliticalOutlook" cancel-button-text="取消" @cancel="onCancelPoliticalOutlook" confirm-button-text="完成" @confirm="onConfirmPoliticalOutlook"/>
	</van-popup>
	<!-- 婚姻状况  -->
	<van-popup v-model="showMarriageStatus" :overlay="true" position="bottom" :close-on-click-overlay="true">
		<van-picker :show-toolbar="true" :columns="columnsMarriageStatus" cancel-button-text="取消" @cancel="onCancelMarriageStatus" confirm-button-text="完成" @confirm="onConfirmMarriageStatus"/>
	</van-popup>
	 <!-- 弹出框 end -->
 </div>
</template>

<script>
	import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
	import {Indicator} from 'mint-ui';
	import areaList from '@/assets/js/area.js';

export default {
	
  name: 'registration',
  data () {
    return {
			tableId:this.$route.query.tableId || 1,
			interviewId:this.$route.query.interviewId,
			user:{
				name:'',//姓名
				sex: '1',//性别 1 男 2女
				dateOfBirth:'',//出生日期
				fertility: '',//生育状况	
				email:'',//邮箱
				mobile:'',//手机号码
				post:'',//应聘岗位
				industry:'',//行业
				desiredIndustry:'',//期望行业
				workCity:'',//城市
				address:'',//具体地址
				nowSalary:'',//当前薪酬
				expectSalary:'',//期望薪酬
				wordStatus:'',//目前工作状态
				arrivalTime:'',//最快到岗时间
				skillLabel:'',//技能标签
				politics:'',//政治面貌
				nativePlace:'',//籍贯
				marital:'',//婚姻状况
				idCard:'',//身份证号码
			},
			show: false,//生育状况 弹框是否显示
			columns: ['已生育', '未生育', '其他'],//生育状况 选项
			showIndustry: false,//生育状况 弹框是否显示
			columnsIndustry: ['互联网/IT/电子/通信', '广告/传媒/文化/体育', '金融','教育培训','制药/医疗','交通/物流/贸易/零售','专业服务','房地产/建筑','汽车','机械/制造','消费品','服务业','能源/化工/环保','政府/非盈利机构/其他'],//生育状况 选项
      showCity:false,
      areaList:areaList,
			showExpect:false,
			showWorkStatus:false,
			columnsWorkStatus:['离职-随时到岗','在职-月内到岗','在职-考虑机会'],
			showPoliticalOutlook:false,
			columnsPoliticalOutlook:['中共党员','共青团员','群众'],
			showMarriageStatus:false,
			columnsMarriageStatus:['未婚','已婚','丧偶','离婚'],
		}
  },
	
  watch:{
	  mobile:function(){
	  	this.user.mobile=this.user.mobile.replace(/[^\d]/g,'');
	  }
  },
  computed:{
	 
  },
  methods:{
		setDate(){
			this.$picker.show({
				type:'datePicker',
				date:'1990-01-01',
				endTime:'2018-01-01',//截至时间
				startTime:'1930-01-01',//开始时间
				onOk:(date)=>{
					this.user.dateOfBirth=date;
				}
			})
		},
		fertilityClick(){//生育状况弹框显示
			this.show=true;
		},
		onConfirm(value, index) {//生育状况完成
      this.user.fertility=value;
			this.show=false;
    },
		onCancel(){//生育状况取消
			this.show=false;
		},
		IndustryClick(){//行业弹框显示
			this.showIndustry=true;
		},
		onConfirmIndustry(value, index) {//行业完成
			this.user.industry=value;
			this.showIndustry=false;
		},
		onCancelIndustry(){//行业取消
			this.showIndustry=false;
		},
		ExpectClick(){//期望行业
		 this.showExpect=true;	
		},
		onCancelExpect(){
			this.showExpect=false;	
		},
		onConfirmExpect(value, index){
			this.user.desiredIndustry =value;
			this.showExpect=false;	
		},
		cityClick(){//城市
			this.showCity=true;
		},
		onCancelArea(){//城市取消
			this.showCity=false;
		},
		onConfirmArea(value, index){//城市确认
			console.log(JSON.stringify(value));
			let columns=value;
			let arr=[];
			for(let i=0;i<columns.length;i++){
				arr.push(columns[i].name);
			}
			let a=new Array(arr);
      let ss = a.join("-");
			this.user.workCity =ss.replace(/\,/g,"-");
			this.showCity=false;
		},
		workStatusClick(){//目前工作状态
			this.showWorkStatus=true;
		},
		onCancelWorkStatus(){
			this.showWorkStatus=false;
		},
		onConfirmWorkStatus(value, index){
			this.user.wordStatus=value;
			this.showWorkStatus=false;
		},
		politicalOutlookClick(){//政治面貌
			this.showPoliticalOutlook=true;
		},
		onCancelPoliticalOutlook(){
			this.showPoliticalOutlook=false;
		},
		onConfirmPoliticalOutlook(value, index){
			this.user.politicalOutlook=value;
			this.showPoliticalOutlook=false;
		},
		marriageStatusClick(){//婚姻状况
			this.showMarriageStatus=true;
		},
		onCancelMarriageStatus(){
			this.showMarriageStatus=false;
		},
		onConfirmMarriageStatus(value, index){
			this.user.marital=value;
			this.showMarriageStatus=false;
		},
		firstClick(){//下一步提交
		let that=this;
			if(that.user.name==""){
				that.$toast("请输入您的姓名");
				return false;
			}else if(that.user.dateOfBirth==""){
				that.$toast("请选择您的出生日期");
				return false;
			}else if(that.user.email==""){
				that.$toast("请输入您的邮箱地址");
				return false;
			}else if(that.user.mobile==""){
				that.$toast("请输入您的手机号码");
				return false;
			}else if(that.user.post==""){
				that.$toast("请输入您的应聘岗位");
				return false;
			}else{
        Indicator.open({
        	text: '加载中...',
        	spinnerType: 'fading-circle'
        });
				that.axios({
					method:'post',
					url:api.registration+'/'+that.interviewId+'/'+that.tableId,
					headers:headers(),
					data:{
						"name":that.user.name,//姓名
						"sex":that.user.sex,//性别 1 男 2女
						"dateOfBirth":that.user.dateOfBirth,//出生日期
						"fertility":that.user.fertility,//生育状况	
						"email":that.user.email,//邮箱
						"mobile":that.user.mobile,//手机号码
						"post":that.user.post,//应聘岗位
						"industry":that.user.industry,//行业
						"desiredIndustry":that.user.desiredIndustry,//期望行业
						"workCity":that.user.workCity,//城市
						"address":that.user.address,//具体地址
						"nowSalary":that.user.nowSalary,//当前薪酬
						"expectSalary":that.user.expectSalary,//期望薪酬
						"wordStatus":that.user.wordStatus,//目前工作状态
						"arrivalTime":that.user.arrivalTime,//最快到岗时间
						"skillLabel":that.user.skillLabel,//技能标签
						"politics":that.user.politics,//政治面貌 
						"nativePlace":that.user.nativePlace,//籍贯
						"marital":that.user.marital,//婚姻状况
						"idCard":that.user.idCard,//身份证号码
					},
					cache:false
					}).then(function(res){
						console.log(res);
						Indicator.close();
						if(res.data.code===10000){
						  that.$router.push({path:'/registrationlist',query:{interviewId:that.interviewId}});
						}else{
						 that.$toast(res.data.msg);
						}
					}).catch(error => {
					 
				});
			}
		},
		getData(){
			let that=this;
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
			that.axios({
				method:'get',
				url:api.getregistration+'/'+that.tableId,
				headers:headers(),
				cache:false
				}).then(function(res){
					console.log(res);
					Indicator.close();
					if(res.data.code===10000){
						that.user=res.data.data;
					}else{
					that.$toast(res.data.msg);
					}
				}).catch(error => {
				
			});
			
		}
		
  },
  mounted(){
  	let that=this;
		if(that.tableId!=""){
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
.infor .inforImg{width: 0.4rem; height: 0.4rem; background: url(../../assets/img/Interview/jibenxinxi.png) no-repeat; display: inline-block; float: left; background-size: 100%;margin:0.3rem 0.2rem;}
.infor .inforTxt{float: left; display: inline-block;font-size: 0.3rem;color: #303030; line-height: 1rem;}

.infor_form{ padding:0 0.2rem;}
.infor_form .form_div{}
.infor_form .form_div .form_title{float: left;
    display: inline-block;
    width: 30%;
    font-size: 0.3rem;
	text-align: left;}
.infor_form .form_input{float: left;width:60%; display: inline-block;font-size: 0.3rem; text-align: left;}
.form_title i{margin: 0 0.1rem; color: #f95714;}
.icon_r{float: right; display: inline-block;width: 0.2rem; height: 0.3rem; background: url(../../assets/img/Interview/icon_right.png) no-repeat
; background-size: 100%;margin-top: 0.5rem;}
.btn_div{background: #F5F5F5; padding-bottom: 0.3rem;}
.btn_div .btn{width: 90%;}
.infor_form .form_div:last-child{border-bottom: none;}
.m-picker .m-picker-header span:last-of-type {
    color: #F95714 !important;
}
</style>
