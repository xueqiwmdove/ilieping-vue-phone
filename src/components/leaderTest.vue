<template>
    <!--胜任力模型评测（能力评价）-->
    <div class="competency-report">
      <p class="title">胜任能力模型评价报告</p>
      <p class="notice-info">
        <img src="../assets/img/info.svg">
        胜任力模型(competence model)就是针对特定职位表现优异要求组合起来的胜任力结构，
        是一系列人力资源管理与开发实践(如工作分析、招聘、选拔、培训与开发、绩效管理等)的重要基础。
      </p>
      <div class="required">
        <p class="required-title">必填能力项 <i>*</i></p>
        <div class="subject" v-for="(item,index) in needData" :index="index"><!-- ng-init="$outerIndex = $index"-->
          <div class="subject-title" >{{index+1}}、{{item.questionTitle}}({{item.questionTitleDesc}})</div>
          <div class="subject-answer" v-for="x in item.answer">
            <label class="subject-radio">
              <input type="radio" class="radio requiredRadio" :id="x.id" :value="x.id"  :name="'required'+index" @change="getRadioId" :disabled="isAbled" ><!--v-model="radioChecked" name="required-{{$outerIndex}}" id="{{x.id}}"-->
              <em></em>
              <span class="subject-content">{{x.optionValue}}</span>
              <span class="subject-score">{{x.score}}分</span>
            </label>

          </div>
        </div>
      </div>
      <div class="optional">
        <p class="optional-title">
          选填能力项
          <a class="pull-right" @click="showToggle" v-text="btnText"></a>
        </p>
        <div  id="content1" v-show="isShow">
          <div class="subject" v-for="(item,index) in optionalData"><!-- ng-init="$outerIndex=$index-->
            <p class="subject-title">{{index+1}}、{{item.questionTitle}}({{item.questionTitleDesc}})</p>
            <div class="subject-answer" v-for ="x in item.answer">
              <label class="subject-radio">
                <input type="radio" class="radio" :id="x.id" :value="x.id" :name="'optional'+index"  :disabled="isAbled"  >
                <em></em>
                <span class="subject-content">{{x.optionValue}}</span>
                <span class="subject-score">{{x.score}}分</span>
              </label>

            </div>
          </div>
        </div>

      </div>
      <div class="competency-submit  text-center">
        <input type="button" class="submit" value="保存" @click="submitTest" :class="btn_abled" :disabled="btn_disabled">
      </div>
    </div>
</template>

<script>
    import api from '@/api/api.js';
    import {headers} from '@/assets/js/common/lp.js'
    import { Indicator } from 'mint-ui';

    export default {
      name: "leaderTest",
      components:{
      },
      data(){
        return{
          url:window.location.hash,
          reportId:this.$route.params.reportId,
          id:this.$route.params.id,
          needData:'',
          optionalData:'',
          dismissionArr:[],//选中题id
          btn_abled:'active',//样式
          btn_disabled:false,//true禁用
          Arr:[],
         // flag:this.$route.params.flag,
          isAbled:false,
         // userName: localStorage.getItem("userName"),//从离职报告获取的用户名
          isShow:false,
          btnText:'展开'
        }
      },
      watch:{

      },
      methods:{
        //  获取试题
        getTest(){
          let that = this;
					Indicator.open({
						text: '加载中...',
						spinnerType: 'fading-circle'
					});
            that.axios({
              method: "get",
              url: api.lookforTest + that.reportId,
              headers: headers(),
            }).then(function (res) {
              console.log(res);
							Indicator.close();
              let result = res.data;
              if (result.code == 10000 && result.data != "") {
                that.needData = result.data.mandatoryQuestionList;
                that.optionalData = result.data.nonCompulsoryList;
              } else {
                that.$toast(res.data.msg);
              }
            })
        },

        //
        showToggle:function(){
          this.isShow = !this.isShow;
          if(this.isShow){
            this.btnText = "收起"
          }else{
            this.btnText = "展开"
          }
        },

        //选中radio事件
        getRadioId(){
          //TODO 获取checked input 的个数做比较
          let that=this;
          let requiredRadios=document.getElementsByClassName("requiredRadio");

          for(let i=0;i<requiredRadios.length;i++){
            for( let j=0;j<i;j++){
              if(requiredRadios[i].name==requiredRadios[j].name){
                if(requiredRadios[j].checked==true){
                  that.Arr.push(requiredRadios[j].id);
                }
              }
            }
          }
          //TODO 数组去重
          that.Arr=Array.from(new Set(that.Arr));
          if( that.Arr.length>=9){
            that.btn_abled='abled';
            that.btn_disabled=false;
          }else{
            that.btn_abled='';
            that.btn_disabled=true;//禁用
          }



        },
        //提交选项
        submitTest(){
          let that=this;
          let inputs=document.getElementsByClassName("radio");
          for(let i=0;i<inputs.length;i++){
            for( let j=0;j<i;j++){
              if(inputs[i].name==inputs[j].name){
                if(inputs[j].checked==true){
                  that.dismissionArr.push(inputs[j].id);
                }
              }
              /* if(inputs[i].checked==true){
                 that.dismissionArr.push(inputs[i].id)
               }*/
            }
          }
          //数组去重
          that.dismissionArr=Array.from(new Set(that.dismissionArr));

          console.log(that.dismissionArr);

					Indicator.open({
						text: '加载中...',
						spinnerType: 'fading-circle'
					});
          that.axios({
            method: "post",
            url:api.submitTest,
            data: {
              reportId: that.reportId,
              id:that.id,//短信id
              evaluationType: 2,//leader,
              questionsPoolAnswer:that. dismissionArr.join(",")
            },
            headers:headers()
          }).then(function (res) {
						Indicator.close();
            let result = res.data;
            if(result.code==10000){
              that.$toast(res.data.msg);
              // window.close();
            }else{
              that.$toast(res.data.msg);
            }
          })
        },

      },
      computed: {


      },
      mounted(){
        let that = this;
        that.getTest();
        // console.log(that.reportId)
       // that.$route.params.reportId
       // localStorage.getItem("userName")

      }
    }
</script>

<style scoped>
  .competency-report .competency-submit .submit.active{
    background: #F95714;
  }
  .pull-right{
    float: right;
    width: 1rem;
    cursor: pointer;
    color: #F95714;
  }
  .competency-report {
    padding: 26px 20px;
    text-align: left;
  }
  .competency-report .title {
    font-size: 0.48rem;
    text-align: center;
  }
  .competency-report .notice-info {
    font-size: 0.32rem;
    color: #748093;
    letter-spacing: 0;
    line-height: 24px;
    margin: 16px 0 28px;
  }
  .competency-report .notice-info img {
    width: 0.32rem;
    height: 0.32rem;
    /*margin-right: 8.7px;*/
    vertical-align: middle;
  }
  .competency-report .optional {
    margin-top: 30px;
    border: none;
  }
  .competency-report .required {
    border-bottom: 1px solid #E5E5E5;
  }
  .competency-report .required .required-title,
  .competency-report .optional .required-title,
  .competency-report .required .optional-title,
  .competency-report .optional .optional-title {
    font-size: 0.4rem;
    border-left: 4px solid #F95714;
    padding-left: 10px;
    /*font-size: 16px;*/
    margin-bottom: 22px;
  }
  .competency-report .required .required-title i,
  .competency-report .optional .required-title i,
  .competency-report .required .optional-title i,
  .competency-report .optional .optional-title i {
    color: #F95714;
  }
  .competency-report .required .subject,
  .competency-report .optional .subject {
    color: #394A66;
    margin: 15px 0 30px 10px;
  }
  .competency-report .required .subject .subject-title,
  .competency-report .optional .subject .subject-title {
    font-size: 0.32rem;
    color: #394A66;
    margin-bottom: 14px;
    line-height: 24px;
  }
  .competency-report .required .subject .subject-answer.checked,
  .competency-report .optional .subject .subject-answer.checked {
    color: #F95714;
  }
  .competency-report .required .subject .subject-answer,
  .competency-report .optional .subject .subject-answer {
    line-height: 19px;
    /*margin: 0 0 15px 24px;*/
    margin: 0 0 0.2rem 0.24rem;
    color: #748093;
    display: flex;
    align-items: center;
  }
  .competency-report .required .subject .subject-answer .subject-radio,
  .competency-report .optional .subject .subject-answer .subject-radio {
    width: 14px;
    /*height: 14px;*/
    font-size: 0.32rem;
    /*margin-right: 8px;*/
    position: relative;
  }
  .competency-report .required .subject .subject-answer .subject-radio input,
  .competency-report .optional .subject .subject-answer .subject-radio input {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    margin: 0;
    z-index: 9;
  }
  .competency-report .required .subject .subject-answer .subject-radio input + em,
  .competency-report .optional .subject .subject-answer .subject-radio input + em {
    display: inline-block;
    width: 14px;
    height: 14px;
    position: absolute;
    left: 0;
    top: 0;
    background: url("../assets/img/ic_round.svg") no-repeat;
  }
  .competency-report .required .subject .subject-answer .subject-radio input:checked + em,
  .competency-report .optional .subject .subject-answer .subject-radio input:checked + em {
    background: url("../assets/img/ic_round_cb.svg") no-repeat;
  }
  .competency-report .required .subject .subject-answer .subject-score,
  .competency-report .optional .subject .subject-answer .subject-score {
    float: right;
    margin-left: 14px;
    /*width: 31px;*/
    width: 1.5rem;
  }
  .competency-report .competency-submit {
    margin-top: 55px;
  }
  .competency-report .competency-submit .submit {
    width: 5rem;
    font-size: 0.48rem;
    height: 1rem;
    line-height: 44px;
    margin: 0 auto;
    text-align: center;
    color: #fff;
    background: #97A2B3;
    border-radius: 4px;
    border: none;
  }
  .competency-report .competency-submit .submit.abled {
    background: #F95714;
  }

/*  .competency-report{
    text-align: left;
  }
  .title{
    font-size: 0.48rem;
    color: #394A66;
    letter-spacing: 0;
    text-align: center;
  }
  .notice-info{
      font-size:0.24rem;
  }
  .notice-info img{
    width: 0.3rem;
    height: 0.3rem;
  }
  .required-title,.optional-title{
    font-size: 0.32rem;
    font-weight: bold;
    margin: 0.2rem;
  }*/
  .text-center{
    text-align: center;
  }
  .el-collapse, .el-collapse .el-collapse-item .el-collapse-item__header{
    border: none!important;
  }
  .competency-report .required .subject .subject-answer .subject-radio,
  .competency-report .optional .subject .subject-answer .subject-radio{
    display: flex;
    display: -ms-flexbox;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
  }
  .subject-content{
    text-indent:22px;
  }

</style>
