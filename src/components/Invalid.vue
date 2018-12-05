<template>
  <div class="Invalid">
    <img src="../assets/img/Invalid/Invalid_img.png" />
    <div>
    	<div class="invalid_title">合同链接失效</div>
    	<div class="invalid_title2">失效原因：合同已签署/合同已截止签约</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Invalid',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.invalid_title{
	height: 0.6rem;
	font-size:0.34rem;
	color: #F95714;
	text-align: center;
}
.invalid_title2{
	font-size: 0.3rem;
	color: #666;
	text-align: center;
}
.invalid_img{
    position: relative;
    width: 100%;
}
.invalid_img2{
	position: absolute;
    left: 50%;
    top: 12%;
    width: 2.2rem;
    margin-left: -1.1rem;
}
</style>
