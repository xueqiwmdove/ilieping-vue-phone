import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import contract from '@/components/contract'
import authentication from '@/components/authentication'
import Invalid from '@/components/Invalid'
import leaderTest from '@/components/leaderTest'
import signature from '@/components/signature' //手动签名
import Agreement from '@/components/Agreement' //移动原型手机用户协议

import checkIn from '@/components/Interview/checkIn' //面试签到
import candidate from '@/components/Interview/candidate' //候选人信息
import feedback from '@/components/Interview/feedback' //面试官反馈
import Hfeedback from '@/components/Interview/Hfeedback' //候选人反馈
import registration from '@/components/Interview/registration' //面试登录表1
import registration2 from '@/components/Interview/registration2' //面试登录表2
import registration3 from '@/components/Interview/registration3' //面试登录表3
import I_success from '@/components/Interview/I_success' //成功
import wm from '@/components/Interview/wm' //失败

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
			meta:{
				title: '爱猎评合同签署'
			}
    },
    {
      path: '/contract',
      name: 'contract',
      component: contract,
			meta:{
				title: '爱猎评合同签署'
			}
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: authentication,
			meta:{
				title: '爱猎评填写信息'
			}
    },
    {
      path: '/Invalid',
      name: 'Invalid',
      component: Invalid,
			meta:{
				title: '爱猎评'
			}
    },
    {
      path: '/leaderTest/:reportId/:id',
      name: 'leaderTest',
      component: leaderTest,
			meta:{
				title: '爱猎评'
			}
    },
    {
      path: '/signature',
      name: 'signature',
      component: signature,
			meta:{
				title: '爱猎评手动签名'
			}
    },
    {
      path: '/Agreement',
      name: 'Agreement',
      component: Agreement,
			meta:{
				title: '爱猎评用户协议'
			}
    },
    {
      path: '/checkIn',
      name: 'checkIn',
      component: checkIn,
			meta:{
				title: '面试签到'
			}
    },
    {
      path: '/candidate',
      name: 'candidate',
      component: candidate,
			meta:{
				title: '候选人信息'
			}
    },
		{
			path: '/feedback',
			name: 'feedback',
			component: feedback,
			meta:{
				title: '面试反馈'
			}
		},
		{
			path: '/Hfeedback',
			name: 'Hfeedback',
			component: Hfeedback,
			meta:{
				title: '候选人信息'
			}
		},
		{
			path: '/registration',
			name: 'registration',
			component: registration,
			meta:{
				title: '面试登记表'
			}
		},
		{
			path: '/registration2',
			name: 'registration2',
			component: registration2,
			meta:{
				title: '面试登记表'
			}
		},
		{
			path: '/registration3',
			name: 'registration3',
			component: registration3,
			meta:{
				title: '面试登记表'
			}
		},
		{
			path: '/I_success',
			name: 'I_success',
			component: I_success,
			meta:{
				title: '成功'
			}
		},
		{
			path: '/wm',
			name: 'wm',
			component: wm,
			meta:{
				title: '失败'
			}
		},
  ]
});
