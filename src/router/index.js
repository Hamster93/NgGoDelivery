import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import CreateUser from '@/components/CreateUser'
import CreateUnit from '@/components/CreateUnit'
import CreateEmergency from '@/components/CreateEmergency'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/create-user',
      component: CreateUser
    },
    {
      path: '/create-unit',
      component: CreateUnit
    },
    {
      path: '/create-emergency',
      component: CreateEmergency
    },
    {
      path: '/edit-unit/:id',
      component: CreateUnit,
      props: true
    }
  ]
})
