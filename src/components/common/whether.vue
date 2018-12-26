<template>
  <div>
		<div class="form_input" @click="FullTimeClick">
		<input type="text" autocomplete="off" v-model="value" class="input_txt" placeholder="请选择是否全日制" />
		</div>
	 <!-- 是否全日制  -->
	 <van-popup v-model="show" :overlay="true" position="bottom" :close-on-click-overlay="true">
	 	<van-picker :show-toolbar="true" :columns="columns" cancel-button-text="取消" @cancel="onCancel" confirm-button-text="完成" @confirm="onConfirm" />
	 </van-popup>
  </div>
</template>

<script>
	
export default {
  name: 'whether',
	props:['whetherProps'],
   data() {
      return {
			 show:false,
			 columns:['是','否'],
			 value:''
    };
   },
    methods: {
			FullTimeClick(){//是否是全日制
				this.show=true;
			},
     onCancel(){//是否是全日制取消
     	this.show=false;
     },
		 onConfirm(value, index) {//是否是全日制完成
		  // console.log(value);
			this.$emit('getchild',value)
      this.value=value;
		 	this.show=false;
		 },
    },
		mounted(){
			let that=this;
			
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-icon-plus{
	color: #FC8E00;
}
</style>
