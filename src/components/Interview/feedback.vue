<template>
  <div class="checkIn">
   <div class="checkIn_div">
		 <div class="checkIn_header">
			 <i class="people"></i>
			{{dataInfo.candidateName}}
		 </div>
		 <div class="checkCon">
			 <div class="subheading">
				 <div class="f_l">面试信息</div>
				 <div class="f_r"><a :href="dataInfo.resumeUrl" target="_blank">预览简历</a></div>
			 </div>
			<div class="title_div">
				<div class="title_l">面试时间：</div>
				<div class="title_r">{{dataInfo.interviewDate}}</div>
			</div> 
			<div class="title_div">
				<div class="title_l">面试岗位：</div>
				<div class="title_r">{{dataInfo.positionName}}</div>
			</div>
			<div class="title_div">
				<div class="title_l">候选人负责人：</div>
				<div class="title_r">{{dataInfo.interviewerName}}</div>
			</div>
			<div class="subheading">
				<div class="f_l">面试登记表</div>
				<div class="f_r" v-if="dataInfo.interviewFormTemplate!=null" @click="previewClick(dataInfo.interviewFormTemplate)">预览表格</div>
			  <div class="f_r" v-else>暂无登记表</div>
			</div>
			<div class="title_div">
				<div class="title_l">面试登记表：</div>
				<div class="title_r">
					<span v-if="dataInfo.interviewFormTemplate==null">未填写</span>
					<span v-else>已填写</span>
				</div>
			</div>
			<div class="subheading">
				<div class="f_l">面试反馈</div>
			</div>
			<div class="tabs_div">
				<div class="tabs_l" :class="{'IsActive': isA}" @click="tabsA">很满意</div>
				<div class="tabs_2" :class="{'IsActive2': isA2}" @click="tabsA2">满意</div>
				<div class="tabs_3" :class="{'IsActive3': isA3}" @click="tabsA3">一般</div>
				<div class="tabs_r" :class="{'IsActiveB': isB}" @click="tabsB">不满意</div>
			</div>
			<div class="textarea_div">
				<textarea v-model="interviewFeedback" placeholder="例：如同意则填写您方便面试的时间让HR好安 排面试，如不同意则填写拒绝原因"></textarea> 
			</div>
		 </div>
		<div class="btn_div">
			<button class="btn" @click="subminClick" :class="click_button" :disabled="subDisabled">提交评价反馈</button>
		</div>
		</div>
  </div>
</template>

<script>
	import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
	import { Indicator } from 'mint-ui';
	
export default {
  name: 'feedback',
  data () {
    return {
     isA: true,  //当isA改变时，将更新class
		 isA2: false,
		 isA3: false,
     isB: false,
		 dataId:this.$route.query.dataId,
		 dataInfo:{},
		 feedId:'',
		 interviewSatisfaction:4,//1 不满意 2 一般 3 较满意  4 很满意
		 interviewFeedback:'',
    }
  },
  watch:{
	  
  },
  computed:{
	click_button: function(){ // 使用按钮样式(查看合同)
	if (this.interviewFeedback != "" && !this.isLoading) {
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
	 subDisabled: function () {
	 	if (this.interviewFeedback == "" || this.isLoading) {
	 		return true
	 	}
	 	else {
	 		return false
	 	}
	 },
  },
  methods:{
		tabsA(){
			let that=this;
			that.isA=true;
			that.isA2=false;
			that.isA3=false;
			that.isB=false;
			that.interviewSatisfaction=4;
		},
		tabsA2(){
		let that=this;
		that.isA=false;
		that.isA2=true;
		that.isA3=false;
		that.isB=false;	
		that.interviewSatisfaction=3;
		},
		tabsA3(){
		let that=this;
		that.isA=false;
		that.isA2=false;
		that.isA3=true;
		that.isB=false;	
		that.interviewSatisfaction=2;
		},
		tabsB(){
			let that=this;
			that.isA=false;
			that.isA2=false;
			that.isA3=false;
			that.isB=true;
			that.interviewSatisfaction=1;
		},
		getinfo(){
			let that=this;
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
			that.axios({
				method:'get',
				url:api.getdetailinfo+'/'+that.dataId,
				headers:headers(),
				cache:false
				}).then(function(res){
					console.log(res);
					Indicator.close();
					if(res.data.code===10000){
						that.dataInfo=res.data.data;
						that.feedId=res.data.data.id;
					}else{
					that.$toast(res.data.msg);
					}
				}).catch(error => {
				
			});
		},
		previewClick(tableId){
			let that=this;
			that.$router.push({path:'/preview',query:{tableId:tableId}});
		},
		subminClick(){
			let that=this;
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
			that.axios({
				method:'post',
				url:api.feedback,
				headers:headers(),
				data:{
					"id":that.feedId,
					"interviewFeedback":that.interviewFeedback,
					"interviewSatisfaction":that.interviewSatisfaction
				},
				cache:false
				}).then(function(res){
					console.log(res);
					Indicator.close();
					if(res.data.code===10000){
						that.$toast("提交成功");
						that.$router.push({path:'/success'});
					}else{
					that.$toast(res.data.msg);
					}
				}).catch(error => {
				
			});
			
		}
  },
  mounted(){
    let that=this;
  	that.getinfo();
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.checkIn{background: #F5F5F5;font-family:PingFangSC-Semibold;}	
.checkIn .checkIn_div{}	
.checkIn .checkIn_div .checkIn_header{ height: 1rem; line-height: 1rem; text-align: center; padding-left: 0.2rem;font-size:0.3rem;font-weight:600;color:#303030;}
.checkIn .checkIn_div .checkIn_header .f_r,.checkCon .subheading .f_r{font-size: 14px;font-weight: 400;color: rgba(249,87,20,1);width: 1.6rem;text-align: center;border: 1px solid #F95714;margin: 0.2rem 0.2rem 0 0;background-color: #fff; height: 0.5rem;line-height: 0.5rem;border-radius: 0.25rem;cursor: pointer;}
.checkCon .subheading{height: 1rem; line-height: 1rem; text-align: left; padding-left: 0.2rem;font-size:0.28rem;font-weight:600;color:#303030;}

.checkIn .checkIn_div .checkCon{background: #fff; padding: 0 0.3rem;}
.checkCon .title_div{width: 100%; height: 0.8rem; line-height: 0.8rem;font-size: 0.28rem; text-align: left;}
.checkCon .title_div .title_l{ float: left; display: inline-block; width: 30%; color: #666;}
.checkCon .title_div .title_r{ float: left; display: inline-block; width: 70%; color: #000;}
.tabs_div{width: 100%; height: 0.6rem; line-height: 0.6rem;font-size: 0.3rem; border-radius:0.3rem;margin: 0.2rem 0; cursor: pointer; border:1px solid rgba(229,229,229,1);}
.tabs_div .tabs_l{width: 25%; float: left; display: inline-block;}
.tabs_div .tabs_2{width: 25%; float: left; display: inline-block;}
.tabs_div .tabs_3{width: 25%; float: left; display: inline-block;}
.tabs_div .tabs_r{width: 25%;float: left; display: inline-block;}

.textarea_div{width: 100%; font-size: 0.28rem;}
.textarea_div textarea{width: 90%;resize:none;height: 3rem; padding: 0.2rem; border-radius: 0.1rem; margin-bottom: 0.2rem;border:1px solid rgba(229,229,229,1);}
.IsActive{background: #F95714; color: #fff; background-color: #F95714; border-radius: 0.3rem 0 0 0.3rem;}
.IsActive2{background: #F95714; color: #fff; background-color: #F95714;}
.IsActive3{background: #F95714; color: #fff; background-color: #F95714;}
.IsActiveB{background: #F95714;color: #fff;background-color: #F95714; border-radius: 0 0.3rem 0.3rem 0;}
.btn_div{background: #f5f5f5; padding: 0.1rem 0.3rem;width: auto; margin: 0;}

.people{width: 0.3rem; height: 0.3rem; display: inline-block; background: url(../../assets/img/Interview/ic_people.png) no-repeat; background-size: 100%;}

</style>
