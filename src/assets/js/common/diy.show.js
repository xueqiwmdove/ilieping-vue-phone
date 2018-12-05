
const diyShow = {
		city:[
				'北京市','上海市','天津市','重庆市','河北省','山西省','内蒙古','辽宁省','吉林省','黑龙江省','江苏省','浙江省','广西','安徽省',
				'福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','海南省','四川省','贵州省','云南省','西藏','陕西省','甘肃省','青海省',
				'宁夏','新疆','台湾','香港','澳门'
			  ],
		company:[
				'上海棋**文化有限公司','深圳隆**有限公司','上海盛**科技有限公司','北京互**技术有限公司','广东荣**询有限公司','华**团有限公司'
				],
		name:['赵','钱','孙','李','周','吴','郑','王',
			  '冯','陈','褚','卫','蒋','沈','韩','杨',
			  '朱','秦','尤','许','何','吕','施','张',
			  '孔','曹','严','华','金','魏','陶','姜',
			  '戚','谢','邹','喻','柏','水','窦','章',
			  '云','苏','潘','葛','奚','范','彭','郎',
			  '鲁','韦','昌','马','苗','凤','花','方',
			  '俞','任','袁','柳','酆','鲍','史','唐',
			  '费','廉','岑','薛','雷','贺','倪','汤'
			 ],
		remark:['学历造假','技能造假、伪造证书','有学术造假行为','伪造获奖经历','伪造荣誉证书','工作时间造假，将一些短的工作经历拼凑成一段工作经历',
				'岗位描述造假，描述的工作内容与实际不符','薪资造假，报高了上段工作经历的实际薪资','业绩造假，虚夸了过往工作业绩表现','过往项目经验造假','在职期间，工作业绩造假',
				'伪造财务票据','假冒上级领导签字','私刻公司公章','伪造加班记录','打卡后不进公司，伪造上班记录','伪造病假单','未经公司允许擅自修改考勤记录','弄虚作假，骗请假期',
				'?伪造地铁延误单','未经授权，借他人名义报销费用','工作时间做与本职无关的工作','挂职多家公司','在外经营与公司相同的业务','业务飞单','对业务关联单位进行参股',
				'向竞争对手泄露公司经营计划','非对外泄露公司核心技术文档','私自拷贝涉密信息','擅自向他家公司转让专利技术','侵吞业务收入',
				'挪用公司资金','隐匿保管之物，谎称已被盗窃、遗失、损','侵吞部门奖金','虚开业务招待费','虚报差旅费','偷窃公司办公用品'
				],
		create:function(){
			return {
				company:this.company[Math.floor((Math.random()*this.company.length))],
				name:this.name[Math.floor((Math.random()*this.name.length))]+(Math.floor(Math.random()*10)<5?'*':'**'),
				age:Math.floor(Math.random()*32)+18,
        sex:Math.floor(Math.random()*10)%2,
				city:this.city[Math.floor((Math.random()*this.city.length))],
				remark:this.remark[Math.floor((Math.random()*this.remark.length))],
				phone:'(***'+(Math.floor(Math.random()*9000))+')'
			}
		},
	  randomList: function (count) {
			if(!count){
				count=20;
			}
			var result =[];
			 for(var i =0;i<=count;i++){
			   result.push(this.create());
		   }
		   return result;
		},
		randomMassage:function(count){
      if(!count){
        count=20;
      }
      var result =[];
      for(var i =0;i<=count;i++){
        result.push(this.massageCreate());
      }
      return result;
		},
    massageCreate:function(){
		  return {
        company:this.company[Math.floor((Math.random()*this.company.length))],
        name:this.name[Math.floor((Math.random()*this.name.length))]+(Math.floor(Math.random()*10)<5?'*':'**'),
        phone:(Math.floor(Math.random()*9000))
      }
    }
};

export default diyShow;
