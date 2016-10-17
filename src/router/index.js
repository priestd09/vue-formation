import Vue from 'vue'
import Router from 'vue-router'
import ExampleBootstrap from '../components/examples/ExampleBootstrap'
import ExampleFoundation from '../components/examples/ExampleFoundation'
import ExampleMaterialize from '../components/examples/ExampleMaterialize'
import ExampleSemanticUI from '../components/examples/ExampleSemanticui'

Vue.use(Router)

// import Home from '../components/Home'

export default new Router({
  routes: [
    { path: '/', component: ExampleBootstrap },
    { path: '/bootstrap', component: ExampleBootstrap },
    { path: '/foundation', component: ExampleFoundation },
    { path: '/materialize', component: ExampleMaterialize },
    { path: '/semanticui', component: ExampleSemanticUI },
    { path: '*', redirect: '/bootstrap' }
  ]
})
