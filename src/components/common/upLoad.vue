<template>
  <div>
   <!--文件上传-->
  <el-upload
    ref="imgBroadcastUpload"
    :auto-upload="false"
    :file-list="diaLogForm.imgBroadcastList"
    list-type="picture-card"
    :on-change="imgBroadcastChange"
    :on-remove="imgBroadcastRemove"
    accept="image/jpg,image/png,image/jpeg" action="">
    <i class="el-icon-plus"></i>
  </el-upload>
  
  </div>
</template>

<script>
	import { uploadImgToBase64 } from '@/assets/js/common/utils.js' // 导入本地图片转base64的方法
	
export default {
  name: 'upLoad',
   data() {
      return {
      diaLogForm: {
      goodsName:'', // 商品名称字段
      imgBroadcastList:[], // 储存选中的图片列表
      imgsStr:'',   // 后端需要的多张图base64字符串 , 分割
      }
    };
   },
    methods: {
   // 图片选择后 保存在 diaLogForm.imgBroadcastList 对象中
   imgBroadcastChange (file, fileList) {
    const isLt5M = file.size / 1024 / 1024 < 5 // 上传头像图片大小不能超过 5MB
    if (!isLt5M) {
     this.diaLogForm.imgBroadcastList = fileList.filter(v => v.uid !== file.uid)
     this.$message.error('图片选择失败，每张图片大小不能超过 5MB,请重新选择!')
    } else {
     this.diaLogForm.imgBroadcastList.push(file)
    }
   },
   // 有图片移除后 触发
   imgBroadcastRemove (file, fileList) {
    this.diaLogForm.imgBroadcastList = fileList
   },
   // 提交弹窗数据
   async submitDialogData () {
    const imgBroadcastListBase64 = []
    console.log('图片转base64开始...')
    // 并发 转码轮播图片list => base64
    const filePromises = this.diaLogForm.imgBroadcastList.map(async file => {
     const response = await uploadImgToBase64(file.raw)
     return response.result.replace(/.*;base64,/, '') // 去掉data:image/jpeg;base64,
    })
    // 按次序输出 base64图片
    for (const textPromise of filePromises) {
     imgBroadcastListBase64.push(await textPromise)
    }
    console.log('图片转base64结束..., ', imgBroadcastListBase64)
    this.diaLogForm.imgsStr = imgBroadcastListBase64.join()
    console.log(this.diaLogForm)
    const res = await addCommodity(this.diaLogForm)       // 发请求提交表单
    if (res.status) {
     this.$message.success('添加商品成功')
     // 一般提交成功后后端会处理，在需要展示商品地方会返回一个图片路径 
    }
   },
     
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-icon-plus{
	color: #FC8E00;
}
</style>
