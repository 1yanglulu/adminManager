// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// var vue  = require('vue');  //查找node_modules中的vue这个包
import Vue from 'vue';
  //当前目录下面查找app.vue这个组件
import App from './App.vue';
// 3.0 导入vue-router这个路由模块进行整个系统的路由控制
//去node-modules下面找文件一定不能带./,因为输入文件名，系统自动回去node-modules下面去找这个文件，而当前文件下面是没有该文件的
// 3.0.1 导入vue-router这个包
import VueRouter from 'vue-router';
// 3.0.0 将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);
// Vue.config.productionTip = false
//3.0.2导入组件对象
import layout from './components/layout.vue';
import login from './components/account/login.vue';
//商品相关的组件
import goodslist from './components/goods/goodslist.vue';

//实例化对象并且定义一个路由规则
var router=new VueRouter({
     routes:[
        //默认跳转到的路由规则
        {name:'default',path:'/',redirect:'/admin'},
        {name:'layout',path:'/admin',component:layout},
        {name:'login',path:'/login',component:login,
      children:[
         //商品列表
         {name:'goodslist',path:'goodslist',component:goodslist}
      ]}
     ]
})
//导入vue的一个组件库：element-ui
import elementUI from 'element-ui';
//导入默认样式（由于咱们自己修改了样式所以要替换默认样式）
import '../statics/theme_rms/index.css';
// 导入自己编写的全局样式
import '../statics/css/site.css';
//绑定到vue中
Vue.use(elementUI);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
 // render:function(create){create(App)}
    // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
    render:create=>create(App)
})
