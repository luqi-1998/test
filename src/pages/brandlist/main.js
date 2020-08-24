import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default{
    // 小程序打开下拉刷新
    config:{
        enablePullDownRefresh:true
    }
}