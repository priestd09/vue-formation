import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import ExampleBootstrap from './components/examples/ExampleBootstrap'
import App from './App'

import 'bootstrap/dist/css/bootstrap-theme.min.css'
import 'bootswatch/paper/bootstrap.min.css'

/* eslint-disable no-new */
Vue.use(VueRouter)
let router = new VueRouter()
sync(store, router)
router.map({
  '/': {
    component: ExampleBootstrap
  }
})
router.start(App, 'app')
