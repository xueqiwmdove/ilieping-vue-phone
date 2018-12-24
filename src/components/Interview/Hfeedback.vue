<template>
  <div class="checkIn">
   <div class="checkIn_div">
		 <div class="checkIn_header">
			<div class="f_l">您好，{{dataInfo.candidateName}}</div>
		 </div>
		 <div class="checkCon">
			<div class="title_div">
				<div class="title_l">面试岗位：</div>
				<div class="title_r">{{dataInfo.positionName}}</div>
			</div> 
			<div class="title_div">
				<div class="title_l">候选人负责人：</div>
				<div class="title_r">{{dataInfo.interviewerName}}</div>
			</div>
			<div class="tabs_div">
				<div class="tabs_l" :class="{'IsActive': isA}" @click="tabsA">同意面试</div>
				<div class="tabs_r" :class="{'IsActiveB': isB}" @click="tabsB">不同意面试</div>
			</div>
			<div class="textarea_div">
				<textarea v-model="detailedReasons" placeholder="例：如同意则填写您方便面试的时间让HR好安 排面试，如不同意则填写拒绝原因"></textarea> 
			</div>
		 </div>
		<div class="btn_div">
			<button class="btn" @click="candidateclick">提交反馈</button>
		</div>
		</div>
  </div>
</template>

<script>
	import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
	import { Indicator } from 'mint-ui';
	
export default {
  name: 'Hfeedback',
  data () {
    return {
     isA: true,  //当isA改变时，将更新class
     isB: false,
		 dataId:this.$route.query.dataId,
		 dataInfo:{},
		 id:'',
		 interviewIntention:2,//1不同意2同意
		 detailedReasons:'',//
    }
  },
  watch:{
	  
  },
  computed:{
	 
  },
  methods:{
		tabsA(){
			let that=this;
			that.isA=true;
			that.isB=false;
			that.interviewIntention=2;
		},
		tabsB(){
			let that=this;
			that.isA=false;
			that.isB=true;
			that.interviewIntention=1;
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
						that.id=res.data.data.id;
					}else{
					that.$toast(res.data.msg);
					}
				}).catch(error => {
				
			});
		},
		candidateclick(){
			let that=this;
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
			that.axios({
				method:'post',
				url:api.agree,
				headers:headers(),
				data:{
					"id":that.id,
					"type":that.interviewIntention,
					"remark":that.detailedReasons
				},
				cache:false
				}).then(function(res){
					console.log(res);
					Indicator.close();
					if(res.data.code===10000){
						that.$toast("提交成功");
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
.checkIn .checkIn_div .checkIn_header{ height: 1rem; line-height: 1rem; text-align: left; padding-left: 0.2rem;font-size:0.3rem;font-weight:600;color:#303030;}
.checkIn .checkIn_div .checkIn_header .f_r{
    font-size: 14px;
    font-weight: 400;
    color: rgba(249,87,20,1);
    width: 1.6rem;
    text-align: center;
    border: 1px solid #F95714;
    margin: 0.2rem 0.2rem 0 0;
    background-color: #fff;
    height: 0.5rem;
    line-height: 0.5rem;
    border-radius: 0.25rem;
	cursor: pointer;
}
.checkIn .checkIn_div .checkIn_header .f_r a{color: #F95714;}
.checkIn .checkIn_div .checkCon{background: #fff; padding: 0 0.3rem;}
.checkCon .title_div{width: 100%; height: 0.8rem; line-height: 0.8rem;font-size: 0.28rem; text-align: left;}
.checkCon .title_div .title_l{ float: left; display: inline-block; width: 30%; color: #666;}
.checkCon .title_div .title_r{ float: left; display: inline-block; width: 70%; color: #000;}
.tabs_div{width: 100%; height: 0.6rem; line-height: 0.6rem;font-size: 0.3rem; border-radius:0.3rem;margin: 0.2rem 0; cursor: pointer; border:1px solid rgba(229,229,229,1);}
.tabs_div .tabs_l{width: 50%; float: left; display: inline-block;}
.tabs_div .tabs_r{width: 50%;float: left; display: inline-block;}
.textarea_div{width: 100%; font-size: 0.28rem;}
.textarea_div textarea{width: 90%;resize:none;height: 3rem; padding: 0.2rem; border-radius: 0.1rem; margin-bottom: 0.2rem;border:1px solid rgba(229,229,229,1);}
.IsActive{background: #F95714; color: #fff; background-color: #F95714; border-radius: 0.3rem 0 0 0.3rem;}
.IsActiveB{background: #F95714;color: #fff;background-color: #F95714; border-radius: 0 0.3rem 0.3rem 0;}
.btn_div{background: #f5f5f5; padding: 0.1rem 0.3rem;width: auto; margin: 0;}
</style>
