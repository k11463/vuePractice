import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home.vue';
import Login from '../components/member/Login.vue';
import Register from '../components/member/Register.vue';
import Get from '../components/test/Get.vue';
import MemberCenter from '../components/member/MemberCenter.vue';
import ChgMemberDataAlert from '../components/ChgMemberDataAlert.vue';

// baby pages
import ChangeMember from '../components/member/ChangeMember.vue';
import DeleteMember from '../components/member/DeleteMember.vue';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/chgMemberDataAlert',
      component: ChgMemberDataAlert
    },
    {
      path: '/memberCenter',
      component: MemberCenter,
      children: [
        {
          path: 'chgMember',
          component: ChangeMember
        },
        {
          path: 'delMember',
          component: DeleteMember
        }
      ]
    },
    {
      path: '/*',
      redirect: '/'
    }
  ],
  mode: "history"
})
