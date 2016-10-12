import Vue from 'vue'
import Router from 'vue-router'
import ExampleBootstrap from '../components/ExampleBootstrap'
import ExampleMaterialize from '../components/ExampleMaterialize'

Vue.use(Router)

// import Home from '../components/Home'

export default new Router({
  routes: [
    { path: '/', component: ExampleBootstrap },
    { path: '/bootstrap', component: ExampleBootstrap },
    { path: '/materialize', component: ExampleMaterialize },
    { path: '*', redirect: '/bootstrap' }
  ]
})
