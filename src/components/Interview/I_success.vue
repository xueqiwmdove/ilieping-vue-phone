<template>
	<div class="Result">
		<img src="../../assets/img/Interview/pic_sign.png" />
		<div class="success_title">登记表提交成功</div>
		<div class="success_title2">HR已收到您的面试登记表，请耐心等待安排面试</div>
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
