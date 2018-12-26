<template>
 <div class="registration">
   <div>	 
	 <ul class="steps">
		<li>个人信息</li>
		<li class="active">个人经历</li>
		<li>其他信息</li>
    </ul>
   </div>
   <div class="infor">
		 <div class="f_l">
	   <div class="inforImg"></div>
	   <div class="inforTxt">工作经历(由近至远)</div>
		 </div>
		 <div class="f_r">
			 <div class="add_img"></div>
			 <div class="add_txt" @click="addDomainWork(count++)">添加</div>
		 </div>
   </div>
   <div class="infor_form" v-for="(item,index) in workExperienceDTOList" :key="item.index">
		 <div class="form_div">
		 <div class="form_title"><i>*</i>公司名称</div> 
		 <div class="form_input">
		 	<input type="text" autocomplete="off" v-model="item.companyName" class="input_txt" placeholder="请输入公司名称" />
		 </div>
		 </div>
		 <div class="form_div">
		 <div class="form_title"><i>*</i>任职开始时间</div> 
		 <div class="form_input" @click="setDateStart(index)">
		 <input type="number" class="input_txt" v-model="item.startTime" onfocus="this.blur();" :placeholder="item.startTime?item.startTime:'请选择时间'" />
		 </div>
		 <div class="icon_r"></div>
		 </div>
		 <div class="form_div">
		 <div class="form_title"><i>*</i>任职结束时间</div> 
		 <div class="form_input" @click="setDateEnd(index)">
		 <input type="number" class="input_txt" v-model="item.endTime" onfocus="this.blur();" :placeholder="item.endTime?item.endTime:'请选择时间'" />
		 </div>
		 <div class="icon_r"></div>
		 </div>
		 <div class="form_div">
		 <div class="form_title"><i>*</i>任职岗位</div> 
		 <div class="form_input">
		 <input type="text" autocomplete="off" class="input_txt" v-model="item.postName" placeholder="请输入任职岗位" />
		 </div>
		 </div>
		 <div class="form_div">
		 <div class="form_title">薪资</div> 
		 <div class="form_input">
		 <input type="number" autocomplete="off" v-model="item.salary" class="input_txt" placeholder="请输入薪资" />
		 </div>
		 </div>
		 <div class="form_div">
		 <div class="form_title">证明人</div> 
		 <div class="form_input">
		 <input type="text" autocomplete="off" v-model="item.certifier" class="input_txt" placeholder="请输入证明人姓名" />
		 </div>
		 </div>
		 <div class="form_div">
		 <div class="form_title">联系方式</div> 
		 <div class="form_input">
		 <input type="number" autocomplete="off" v-model="item.contact" class="input_txt"  placeholder="请输入证明人联系方式" />
		 </div>
		 </div>
		 <div class="textarea_div">
		 	<div class="text_title">离职原因</div>
		 	<textarea placeholder="请在些输入离职原因(限1000字)" v-model="item.dimissionReason" maxlength="1000"></textarea>	   
		 </div>
	 </div>  
	 
	 <div class="infor">
		 <div class="f_l">
		<div class="inforImgE"></div>
		<div class="inforTxt">教育经历</div>
		</div>
		<div class="f_r">
			<div class="add_img"></div>
			<div class="add_txt" @click="addDomainEducation(countEd++)">添加</div>
		</div>
	 </div>
	 <div class="infor_form" v-for="(item,index) in educationDTOList" :key="item.index">
    <div class="form_div">
	   <div class="form_title"><i>*</i>学校名称</div> 
	   <div class="form_input">
	   <input type="text" autocomplete="off" v-model="item.school" class="input_txt"  placeholder="请输入就读学校" />
	   </div>
	   </div>
	   <div class="form_div">
	   <div class="form_title"><i>*</i>就读开始时间</div> 
	   <div class="form_input" @click="attendstartClick(index)">
	   <input type="text" autocomplete="off" v-model="item.startTime" class="input_txt" placeholder="请选择就读开始时间" />
	   </div>
		 <div class="icon_r"></div>
	   </div>
	   <div class="form_div">
	   <div class="form_title"><i>*</i>就读结束时间</div> 
	   <div class="form_input" @click="attendendClick(index)">
	   <input type="text" autocomplete="off" v-model="item.endTime" class="input_txt" placeholder="请选择就读结束时间" />
	   </div>
		 <div class="icon_r"></div>
	   </div>
	   <div class="form_div">
	   <div class="form_title">就读专业</div> 
	   <div class="form_input">
	   <input type="text" autocomplete="off" v-model="item.professional" class="input_txt" placeholder="请输入就读专业" />
	   </div>
	   </div>
	   <div class="form_div">
	   <div class="form_title">学历</div> 
	   <div class="form_input" @click="educationClick">
	   <input type="text" autocomplete="off" v-model="item.education" class="input_txt" placeholder="请输入您的学历" />
	   </div>
		 <div class="icon_r"></div>
	   </div>
		 <div class="form_div">
		 <div class="form_title">学位</div> 
		 <div class="form_input">
		 <input type="text" autocomplete="off" v-model="item.degree" class="input_txt" placeholder="请输入您的学位" />
		 </div>
		 </div>
	   <div class="form_div">
	   <div class="form_title">是否全日制</div> 
	   <div class="form_input" @click="FullTimeClick">
	    <input type="text" autocomplete="off" v-model="item.isfullTime" class="input_txt" placeholder="请选择是否全日制" />
	   </div>
	   <div class="icon_r"></div>
	   </div>
		 <div class="textarea_div">
			 <div class="text_title">其他</div>
			 <textarea placeholder="请在些输入其他说明(限1000字)" v-model="item.other" maxlength="1000"></textarea>	   
		 </div>
	 </div>
		 
   <div class="btn_div">
   	<button class="btn" id="login_btn" @click="secondClick">下一步</button>
   </div>
	 <!-- 弹出框 start -->
	 
	 <!-- 是否全日制  -->
	 <van-popup v-model="show" :overlay="true" position="bottom" :close-on-click-overlay="true">
	 	<van-picker :show-toolbar="true" :columns="columns" cancel-button-text="取消" @cancel="onCancel" confirm-button-text="完成" @confirm="onConfirm" />
	 </van-popup>
	 <van-popup v-model="showEducation" :overlay="true" position="bottom" :close-on-click-overlay="true">
	 <van-picker :show-toolbar="true" :columns="columnsEducation" cancel-button-text="取消" @cancel="onCancelEducation" confirm-button-text="完成" @confirm="onConfirmEducation" />
	 </van-popup>
 </div>
</template>

<script>
	import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
	import { Indicator} from 'mint-ui';
	
	import whether from '@/components/common/whether';

export default {
  name: 'registrationList',
	components:{
		whether
	},
  data () {
    return {
			tableId:this.$route.query.tableId || 1,
		interviewId:this.$route.query.interviewId,
			show:false,
			columns:['是','否'],
			showEducation:false,
			columnsEducation:['研究生（博士及以上）','研究生（MBA）','研究生（硕士）','本科','大专','高中（中专）及以下学历'],
      workExperienceDTOList:[//工作经历
				{
				companyName:'',//公司名称
				startTime:'',//任职开始时间
				endTime:'',//任职结束时间
				postName:'',//任职岗位
				salary:'',//薪资
				certifier:'',//证明人
				contact:'',//证明人联系方式
				dimissionReason:'',//离职原因
				}
			],
			educationDTOList:[
				{
				school:'',//学校名称
				startTime:'',//就读开始时间
				endTime:'',//就读结束时间
				professional:'',//就读专业
				education:'',//学历
				degree:'',//学位
				isfullTime:'',//是否全日制
				other:'',//其他
				}
			],//教育经历
			count: 0,//工作经历
			countEd: 0,//教育经历
		}
  },
  watch:{
	  
  },
  computed:{
	 
  },
  methods:{
		gets(value){
			let that=this;
			that.show=true;
			console.log(value);
		},
		addDomainWork(count){//添加工作经历
		let that=this;
		  if(count==3){
				that.$toast("最多添加三条工作经历");
				return false;
			}else{
				that.workExperienceDTOList.push({
					companyName:'',//公司名称
					startTime:'',//任职开始时间
					endTime:'',//任职结束时间
					postName:'',//任职岗位
					salary:'',//薪资
					certifier:'',//证明人
					contact:'',//证明人联系方式
					dimissionReason:'',//离职原因
					key: Date.now()
				});
			}
		},
		addDomainEducation(count){//添加教育经历
		let that=this;
		 if(count==3){
		 	that.$toast("最多添加三条教育经历");
		 	return false;
		 }else{
			that.educationDTOList.push({
				school:'',//学校名称
				startTime:'',//就读开始时间
				endTime:'',//就读结束时间
				professional:'',//就读专业
				education:'',//学历
				degree:'',//学位
				isfullTime:'',//是否全日制
				other:'',//其他
				key: Date.now()
			});
			}
		},
		
		FullTimeClick(){//是否是全日制
			this.show=true;
		},
		onConfirm(value, index) {//是否是全日制完成
			this.educationDTOList[this.countEd].isfullTime=value;
			this.show=false;
		},
		onCancel(){//是否是全日制取消
			this.show=false;
		},
		
		setDateStart(index){//任职开始时间
			this.$picker.show({
				type:'datePicker',
				date:'1990-01-01',
				endTime:'2018-01-01',//截至时间
				startTime:'1930-01-01',//开始时间
				onOk:(date)=>{
					this.workExperienceDTOList[index].startTime=date;
				}
			})
		},
		setDateEnd(index){//任职结束时间
			this.$picker.show({
				type:'datePicker',
				date:'1990-01-01',
				endTime:'2018-01-01',//截至时间
				startTime:'1930-01-01',//开始时间
				onOk:(date)=>{
					this.workExperienceDTOList[index].endTime=date;
				}
			})
		},
		attendstartClick(index){//就读开始时间
		 this.$picker.show({
		 	type:'datePicker',
		 	date:'1990-01-01',
		 	endTime:'2018-01-01',//截至时间
		 	startTime:'1930-01-01',//开始时间
		 	onOk:(date)=>{
		 		this.educationDTOList[index].startTime=date;
		 	}
		 })	
		},
		attendendClick(index){//就读结束时间
		this.$picker.show({
			type:'datePicker',
			date:'1990-01-01',
			endTime:'2018-01-01',//截至时间
			startTime:'1930-01-01',//开始时间
			onOk:(date)=>{
				this.educationDTOList[index].endTime=date;
			}
		})	
		},
		educationClick(){//学历
			this.showEducation=true;
		},
		onConfirmEducation(value, index) {//学历完成
			this.educationDTOList[this.countEd].education=value;
			this.showEducation=false;
		},
		onCancelEducation(){//学历取消
			this.showEducation=false;
		},
		secondClick(){//下一步提交
		let that=this;
			if(that.workExperienceDTOList[that.count].companyName==""){
				that.$toast("请输入您的公司名称");
				return false;
			}else if(that.workExperienceDTOList[that.count].startTime==""){
				that.$toast("请选择您的任职开始时间");
				return false;
			}else if(that.workExperienceDTOList[that.count].endTime==""){
				that.$toast("请选择您的任职结束时间");
				return false;
			}else if(that.workExperienceDTOList[that.count].post==""){
				that.$toast("请输入您的任职岗位");
				return false;
			}else if(that.educationDTOList[that.countEd].schoolName==""){
				that.$toast("请输入您的学校名称");
				return false;
			}else if(that.educationDTOList[that.countEd].startTime==""){
				that.$toast("请选择您的就读开始时间");
				return false;
			}else if(that.educationDTOList[that.countEd].endTime==""){
				that.$toast("请选择您的就读开始时间");
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
						"educationDTOList":that.educationDTOList,
						"workExperienceDTOList":that.workExperienceDTOList,
					},
					cache:false
					}).then(function(res){
						console.log(res);
						Indicator.close();
						if(res.data.code===10000){
							that.$router.push({path:'/registration3',query:{interviewId:that.interviewId}});
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
						that.educationDTOList=res.data.data.educationDTOList;
						that.workExperienceDTOList=res.data.data.workExperienceDTOList;
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
.infor .inforImg{width: 0.4rem; height: 0.4rem; background: url(../../assets/img/Interview/gongzuojingli.png) no-repeat; display: inline-block; float: left; background-size: 100%;margin:0.3rem 0.2rem;}
.infor .inforImgE{width: 0.4rem; height: 0.4rem; background: url(../../assets/img/Interview/jiaoyujingli.png) no-repeat; display: inline-block; float: left; background-size: 100%;margin:0.3rem 0.2rem;}

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
.infor .f_r .add_img{width: 0.38rem; height: 0.38rem; background: url(../../assets/img/Interview/add_img.png) no-repeat; display: inline-block; float: left; background-size: 100%;margin:0.28rem 0.1rem;}
.infor .f_r .add_txt{    float: left;
    display: inline-block;
    font-size: 0.3rem;
    color: #303030;
    line-height: 1rem;margin-right: 0.2rem;}
</style>
