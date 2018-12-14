<template>
  <div class="signature">
    <div class="model_div_none" id="model_img" v-if="smscode_secc">
		<div class="model_bg_none"></div>
		<div class="model_div" id="model_div">
		  <img src="../assets/img/ic-customer1@2x.png" /> 
		  <div class="model_bg_f txt_c">
            签署成功
		  </div>
		 <div class="delete_div" @click="close_model">
		   <img src="../assets/img/ic_delete.svg" />
		 </div>
		</div>
	  </div>
        <!--
        	作者：yaobo324413@163.com
        	时间：2018-09-22
        	描述：弹出框 end
        -->
<!--touchstart,touchmove,touchend,touchcancel 这-->
    <canvas id="canvas" height="500">Canvas画板</canvas>
    <!--<img v-bind:src="url" alt="">-->
    <div class="btn_footer">
		  <button class="btn_clear" type="" v-on:click="clear">清除重签</button>
		  <button class="btn_save" v-on:click="save">确认签署</button>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
	import { Indicator } from 'mint-ui';
	
var draw;
var preHandler = function(e){e.preventDefault();}
class Draw {
    constructor(el) {
        this.el = el
        this.canvas = document.getElementById(this.el)
        this.cxt = this.canvas.getContext('2d')
        this.stage_info = canvas.getBoundingClientRect()
        this.path = {
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
        }
    }
    init(btn) {
        var that = this; 
        
        this.canvas.addEventListener('touchstart', function(event) {
            document.addEventListener('touchstart', preHandler, false); 
            that.drawBegin(event)
        })
        this.canvas.addEventListener('touchend', function(event) { 
            document.addEventListener('touchend', preHandler, false); 
            that.drawEnd()
            
        })
        this.clear(btn)
    }
    drawBegin(e) {
        var that = this;
        window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
        this.cxt.strokeStyle = "#000"
        this.cxt.beginPath()
        this.cxt.moveTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top
        canvas.addEventListener("touchmove",function(){
            that.drawing(event)
        })
    }
    drawing(e) {
        this.cxt.lineTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.endX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.endY = e.changedTouches[0].clientY - this.stage_info.top
        this.cxt.stroke()
    }
    drawEnd() {
        document.removeEventListener('touchstart', preHandler, false); 
        document.removeEventListener('touchend', preHandler, false);
        document.removeEventListener('touchmove', preHandler, false);
        //canvas.ontouchmove = canvas.ontouchend = null
    }
    clear(btn) {
      this.cxt.clearRect(0, 0, 300, 500)
    }
    save(){
       return canvas.toDataURL("image/png")
    }
}

export default {
  data () {
    return {
      val:true,
      url:"",
      code:this.$route.query.code,//合同编号
      dataPhone:this.$route.query.mobile,//合同手机号
      smscode_secc:false,
    }
  },
  mounted() {
      draw=new Draw('canvas');
      draw.init();
  },
  methods:{
  	close_model(){//关闭弹框
			let that=this;
			that.smscode_secc=false;
		},
    clear:function(){
        draw.clear();
    },
    save:function(){
        var imgdata=draw.save();
        //this.url = data;
        console.log(imgdata);
      let that=this;
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
       that.axios({
				method:'post',
				url:api.imgContract,
				headers:headers(),
				data:{
			    "imageBase64":imgdata,
			    "agreementId":that.code,
			    "employeePhone":that.dataPhone
				},
				cache:false
				}).then(function(res){
				Indicator.close();
				 if(res.data.code === 10000) {
				   that.smscode_secc=true;
					} else {
					 that.$toast(res.data.msg);
					}
				}).catch(error => {
					 
			});
    },
　　　mutate(word) {
      this.$emit("input", word);
   },
  }
}
</script> 

<style scoped> 
	h1, h2 { font-weight: normal; } 
	ul { list-style-type: none; padding: 0; } 
	li { display: inline-block; margin: 0 10px; } 
	a { color: #42b983; } 
	#canvas {width: 90%; background:url(../assets/img/s.png) left top no-repeat #F9F9F9; cursor: default; border: 1px dashed #ddd; border-radius: 0.1rem;margin:0.2rem 4%; } 
	#keyword-box { margin: 10px 0; } 
	.btn_footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1rem;
    background: #fff;
		font-size: 16px;
		color: #FFFFFF;
		letter-spacing: 0.19px;
		text-align: center;
	}
	.btn_footer button{
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    outline: 0;
	}
	.btn_clear{
		width: 180px;
		height: 40px;
		border: 0;
		background: #9B9B9B;
		border-radius: 100px;
	}
	.btn_save{
	  width: 180px;
		height: 40px;
		border: 0;
		background-image: linear-gradient(-138deg, #FD902D 0%, #F95714 100%);
		border-radius: 100px;
	}
</style>