<template>
  <div class="contract">
    <div class="model_div_none" v-if="Ismodel">
		<div class="model_bg_none"></div>
		<div class="model_div" id="model_div">
		  <div class="model_bg_f">
			<div class="model_title">提示</div>
			<div class="model_con">
				<div class="company_div">
					<span class="span_company">{{dataenterpriseName}}</span>
					<span>发起合同主体为：</span>
				</div>
				<div class="model_name">
					{{employeeName}}
				</div>
				<div class="model_img_div">
					<span>发件人要求您进行实名认证后签署</span>
				</div>
				<div class="model_btn_div">
					<div class="btn" @click="click_btn">认证并签署</div>
				</div>
				<div class="model_txt">以电子数据为载体的电子合同作为电子商务各方当事人的真实意思表示，具有与书面文件同等的法律效力</div>
			</div>
		 </div>
		 <div class="delete_div" @click="click_close">
		   <img src="../assets/img/ic_delete.svg" />
		 </div>
		</div>
	  </div>
	  <!--
      	作者：yaobo324413@163.com
      	时间：2018-10-18
      	描述：弹出框 end
      -->  
  	<div class="contract_div">
	    <ul>
	    	<li v-for="(item,index) in datacontract" :key="index">
	    		<img :src="item" />
	    	</li>
	    </ul>
    </div>
   	<div class="btn_div btn_div_f">
			<button class="btn" id="contract_btn" @click="clickcontract">签署</button>
		</div>
  </div>
</template>

<script>
	import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
	import { Indicator } from 'mint-ui';
export default {
  name: 'contract',
  data () {
    return {
      code:this.$route.query.code,
      dataPhone:this.$route.query.mobile,
      datacontract:[],
      Ismodel:false,
      dataenterpriseName:'',
      employeeName:'',
      employeeIdCard:''
    }
  },
  created() {
  	document.title = '劳动用工合同';
  },
  methods:{
  	click_close(){
  		let that=this;
  		that.Ismodel=false;
  	},
  	click_btn(){
  		let that=this;
  		that.$router.push({path:'/authentication',query:{code:that.code,mobile:that.dataPhone}});
  	},
  	clickcontract(){
  		let that=this;
  		that.Ismodel=true;
  	},
  	getContract(){
  	 let that=this;
     if(!that.code){
      	that.$toast("合同编号不能为空");
      	return false;
      }else{
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
	    that.axios({
				method:'post',
				url:api.contractData+that.code,
				headers:headers(),
				data:{
					mobile:that.dataPhone
				},//"mobile="+that.dataPhone,
				cache:false
				}).then(function(res){
				Indicator.close();
				if(res.data.code === 10000) {
				  that.datacontract=res.data.data.contractImage;
				  that.dataenterpriseName=res.data.data.enterpriseName;
				  that.employeeName=res.data.data.employeeName;
				  that.employeeIdCard=res.data.data.employeeIdCard;
	  	   localStorage.setItem('name',res.data.data.employeeName);
	  	   localStorage.setItem('employeeIdCard',res.data.data.employeeIdCard);
	  	   localStorage.setItem('enterpriseId',res.data.data.enterpriseId);
				} else {
				 that.$toast(res.data.msg);
				}
				}).catch(error => {
					 
			});
     }
  	}
  },
  mounted(){
  	let that=this;
  	that.getContract();
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contract{

}
</style>
