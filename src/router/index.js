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
import feedback from '@/components/Interview/feedback' //面试反馈
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
      component: login
    },
    {
      path: '/contract',
      name: 'contract',
      component: contract,
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: authentication
    },
    {
      path: '/Invalid',
      name: 'Invalid',
      component: Invalid
    },
    {
      path: '/leaderTest/:reportId/:id',
      name: 'leaderTest',
      component: leaderTest
    },
    {
      path: '/signature',
      name: 'signature',
      component: signature
    },
    {
      path: '/Agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/checkIn',
      name: 'checkIn',
      component: checkIn
    },
    {
      path: '/candidate',
      name: 'candidate',
      component: candidate
    },
		{
			path: '/feedback',
			name: 'feedback',
			component: feedback
		},
		{
			path: '/registration',
			name: 'registration',
			component: registration
		},
		{
			path: '/registration2',
			name: 'registration2',
			component: registration2
		},
		{
			path: '/registration3',
			name: 'registration3',
			component: registration3
		},
		{
			path: '/I_success',
			name: 'I_success',
			component: I_success
		},
		{
			path: '/wm',
			name: 'wm',
			component: wm
		},
  ]
})

