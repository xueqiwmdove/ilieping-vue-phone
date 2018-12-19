<template>
	<div class="Result">
		<img src="../../assets/img/Interview/wm.png" />
		<div class="success_title">很抱歉，签到失败</div>
		<div class="success_title2">未找到相关面试记录</div>
		<div class="success_title2">请填写投递简历中的电话号码</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped="scoped">
.Result img{width: 60%;
    margin-top: 20%;
    margin-bottom: 10%;}
.success_title{
	font-size: 0.4rem;
	font-weight: 700;
	color: #F95714;
}
.success_title2{
	margin-top: 0.4rem;
	font-size: 0.3rem;
	color: #ccc;
}
</style>
