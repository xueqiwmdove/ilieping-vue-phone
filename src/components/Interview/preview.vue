<template>
  <div class="preview">
	<div class="personalInfo"> 
	 <div class="p_infor">
	  <div class="p_left">
		<p class="left_div">  
		<span class="nameSpan">{{registrationData.name}}</span>  
		<span class="textspan" v-if="registrationData.sex==1">女</span>
		<span class="textspan" v-if="registrationData.sex==2">男</span>
		<span class="textspan">{{registrationData.nativePlace}}</span>  
		</p>
		<p>
			<span class="textspan">{{registrationData.politics}}</span>
			<span class="textspan">{{registrationData.marital}} - {{registrationData.fertility}}</span>
		</p>	
	  </div>
	  <div class="right_infor">{{registrationData.wordStatus}}</div>
      </div>
	  <div class="infor_div">
		 <i class="leftIconMobile"></i>
		 <div class="inforTxt"><span>{{registrationData.mobile}}</span></div>
	  </div>
	  <div class="infor_div">
	  <i class="ic_preview_mail"></i>
	  <div class="inforTxt"><span>{{registrationData.email}}</span></div>
	  </div>
	  <div class="infor_div">
	  <i class="ic_preview_address"></i>
	  <div class="inforTxt"><span>{{registrationData.workCity}}</span></div>
	  </div>
	  <div class="infor_div">
	  <i class="ic_preview_IDcard"></i>
	  <div class="inforTxt"><span>{{registrationData.idCard}}</span></div>
	  </div>
	  <div class="address">
		  <div class="addressLeft">现住地址:</div>
		  <div class="addressCon">{{registrationData.address}}</div>
	  </div>
	  
	  </div> 
	  
	  <div class="expect_div">
		<div class="expectTitle"><i></i><div class="txt">求职期望</div></div> 
		<div class="expectdiv">
			<div class="expectleft">{{registrationData.post}}</div>
			<div class="expectright">{{registrationData.expectSalary}}</div>
		</div> 
		<div class="expectdiv">{{registrationData.desiredIndustry}}</div>
		<div class="expectdiv">{{registrationData.wordStatus}}</div>
	  </div>
	  <div class="wrokdiv">
		<div class="wrokTitle"><i></i><div class="txt">工作经历</div></div>  
		<div v-for="(items,index) in registrationData.workExperienceDTOList" :key="index">
			<div class="companyDiv">
				<div class="companyName">{{items.postName}}</div>
				<div class="companyTime" v-if="items.startTime!=null && items.endTime!=null ">{{items.startTime}}~{{items.endTime}}</div>
			</div>
			<div class="companySalary">{{items.salary}}</div>
		</div>
	  </div>
	  
	  <div class="educationdiv">
	  <div class="educationTitle"><i></i><div class="txt">教育经历</div></div>  
	  <div v-for="(items,index) in registrationData.educationDTOList" :key="index" class="for_bor">
	  	<div class="schoolDiv">
	  		<div class="schoolName">{{items.school}}</div>
	  		<div class="schoolTime" v-if="items.startTime!=null && items.endTime!=null ">{{items.startTime}}~{{items.endTime}}</div>
	  	</div>
	  	<div class="schoolpro">{{items.education}}-{{items.professional}}</div>
	  </div>
	  </div> 
	  
	  <div class="other_div">
		<div class="otherTitle"><i></i><div class="txt">其他经历</div></div>
		<div class="condiv">
		  <div class="conTitle">性格爱好特长：</div>	
		  <div class="conData">{{registrationData.hobby}}</div>
		</div>
		<div class="condiv">
		<div class="conTitle">英语水平：</div>	
		<div class="conData">{{registrationData.englishLevel}}</div>
		</div>
		<div class="condiv">
		<div class="conTitle">计算机水平：</div>	
		<div class="conData">{{registrationData.computersLevel}}</div>
		</div>
		<div class="condiv">
		<div class="conTitle">获得证书：</div>	
		<div class="conData">{{registrationData.certificate}}</div>
		</div>
		<div class="condiv">
		<div class="conTitle">是否有内部亲友：</div>	
		<div class="conData">{{registrationData.isRelation}}</div>
		</div>
		<div class="condiv">
		<div class="conTitle">应聘途径：</div>	
		<div class="conData">{{registrationData.applyPath}}</div>
		</div>	
	  </div>
  </div>
</template>

<script>
	import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
	import {Indicator} from 'mint-ui';
	export default {
		name: 'preview',
		data() {
			return {
				tableId:this.$route.query.tableId,
				registrationData:[],
			};
		},
		methods:{
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
						that.registrationData=res.data.data;
					}else{
					that.$toast(res.data.msg);
					}
				}).catch(error => {
				
			});
			
		}
        },
		mounted(){
			let that=this;
			if(that.tableId!=null){
				that.getData();
			}
		}
	}
</script>

<style scoped="scoped">
.preview{background: #F5F5F5; margin-bottom: 0.2rem;}
.preview .personalInfo{ background: #fff; padding: 0.2rem; margin-bottom: 0.2rem;}
.preview .infor_div{ height: 0.6rem;line-height: 0.6rem; width: 100%;clear: both;}
.preview .infor_div .leftIcon{width: 0.3rem; height: 0.3rem;display: inline-block; float: left;}
.preview .infor_div .inforTxt{font-size: 0.3rem;display: inline-block; float: left;}
.leftIconMobile{width: 0.3rem; height: 0.3rem; display:inline-block;float: left; background: url(../../assets/img/Interview/ic_preview_phone.png) no-repeat; background-size: 100%;margin: 0.1rem;}
.ic_preview_mail{width: 0.3rem; height: 0.3rem; display:inline-block;float: left; background: url(../../assets/img/Interview/ic_preview_mail.png) no-repeat; background-size: 100%;margin: 0.1rem;}
.ic_preview_address{width: 0.3rem; height: 0.3rem; display:inline-block;float: left; background: url(../../assets/img/Interview/ic_preview_address.png) no-repeat; background-size: 100%;margin: 0.1rem;}
.ic_preview_IDcard{width: 0.3rem; height: 0.3rem; display:inline-block;float: left; background: url(../../assets/img/Interview/ic_preview_IDcard.png) no-repeat; background-size: 100%;margin: 0.1rem;}
.address{ border-top: 1px solid #eee;padding: 0.2rem; min-height: 0.6rem;}
.address .addressLeft{width: 30%;float: left;display: inline-block; font-size: 0.32rem;color: #303030;text-align: right;}
.address .addressCon{width: 60%;float: left;display: inline-block; font-size: 0.32rem;color: #999;text-align: left;padding-left: 0.1rem;}
.p_infor{width: 100%; height: 1.4rem;}
.p_infor .p_left{float: left; display: inline-block;width: 70%; text-align: left;height: 1.4rem;}
.p_infor .right_infor{width: 30%;float: left; display: inline-block; line-height:1.4rem; font-size: 0.32rem;color: #F95714;text-align: right;}
.p_infor .p_left p{ height: 0.5rem; line-height: 0.4rem;}
.p_infor .p_left .nameSpan{ font-size: 0.4rem; font-weight: 700;line-height: 0.4rem;}
.p_infor .p_left .textspan{font-size: 0.3rem;}
.expect_div{ background: #fff;padding: 0.2rem; margin-bottom: 0.2rem;}
.expect_div .expectTitle{height: 0.6rem; line-height: 0.6rem;text-align: left;width: 100%; clear: both;}
.expect_div .expectTitle i{width: 0.3rem; height: 0.3rem; display:inline-block;float: left; background: url(../../assets/img/Interview/ic_preview_expect.png) no-repeat; background-size: 100%;margin: 0.1rem;}
.expect_div .expectTitle .txt{font-size: 0.36rem; color:#303030; float: left; display: inline-block;}
.expectdiv{ height: 0.4rem; line-height: 0.4rem; padding: 0.2rem;font-size: 0.32rem; text-align: left;}
.expectdiv .expectleft{ display: inline-block; float: left; color: #303030; font-size: 0.32rem;}
.expectdiv .expectright{ display: inline-block; float: right; color: #F95714; font-size: 0.3rem;}

.wrokdiv{ background: #fff;padding: 0.2rem; margin-bottom: 0.2rem;}
.wrokdiv .wrokTitle{height: 0.6rem; line-height: 0.6rem;text-align: left;width: 100%; clear: both;}
.wrokdiv .wrokTitle i{width: 0.3rem; height: 0.3rem; display:inline-block;float: left; background: url(../../assets/img/Interview/ic_preview_work.png) no-repeat; background-size: 100%;margin: 0.1rem;}
.wrokdiv .wrokTitle .txt{font-size: 0.36rem; color:#303030; float: left; display: inline-block;}

.companyDiv{ height: 0.6rem; line-height: 0.6rem;}
.companyDiv .companyName{font-size: 0.36rem; color:#303030; float: left; display: inline-block;}
.companyDiv .companyTime{font-size: 0.36rem; color:#999; float: right; display: inline-block;}

.companySalary{font-size: 0.36rem; color:#303030;}

.educationdiv{ background: #fff;padding: 0.2rem; margin-bottom: 0.2rem;}
.educationdiv .educationTitle{height: 0.6rem; line-height: 0.6rem;text-align: left;width: 100%; clear: both;}
.educationdiv .educationTitle i{width: 0.3rem; height: 0.3rem; display:inline-block;float: left; background: url(../../assets/img/Interview/ic_preview_school.png) no-repeat; background-size: 100%;margin: 0.1rem;}
.educationdiv .educationTitle .txt{font-size: 0.36rem; color:#303030; float: left; display: inline-block;}
.for_bor{ border-bottom: 1px solid #eee;}
.schoolDiv{font-size: 0.36rem; height: 0.6rem; line-height: 0.6rem;}
.schoolDiv .schoolName{font-weight: 700; color: #303030; float: left; display: inline-block;}
.schoolDiv .schoolTime{color: #999; float: right; display: inline-block; text-align: right;}
.schoolpro{font-size: 0.34rem; height: 0.8rem; line-height: 0.8rem; text-align: left;}

.other_div{background: #fff;padding: 0.2rem; margin-bottom: 0.2rem;}
.other_div .otherTitle{height: 0.6rem; line-height: 0.6rem;text-align: left;width: 100%; clear: both;}
.other_div .otherTitle i{width: 0.3rem; height: 0.3rem; display:inline-block;float: left; background: url(../../assets/img/Interview/ic_preview_others.png) no-repeat; background-size: 100%;margin: 0.1rem;}
.other_div .otherTitle .txt{font-size: 0.36rem; color:#303030; float: left; display: inline-block;}

.condiv{border-bottom: 1px solid #eee; padding: 0.2rem 0;}
.condiv .conTitle{font-size: 0.34rem; color: #303030; text-align: left; line-height: 0.8rem;}
.condiv .conData{font-size: 0.34rem; color: #999; text-align: left;}
</style>
