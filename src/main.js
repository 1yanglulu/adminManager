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
// Vue.config.productionTip = false;
//3.0.2导入组件对象
import layout from './components/layout.vue';
import login from './components/account/login.vue';
//商品相关的组件
import goodslist from './components/goods/goodslist.vue';
//引入新增商品组件
import goodsadd from './components/goods/goodsadd.vue';
//实例化对象并且定义一个路由规则
var router=new VueRouter({
     routes:[
        //默认跳转到的路由规则
        {name:'default',path:'/',redirect:'/admin'},
        {name:'layout',path:'/admin',component:layout,
        children:[
          //商品列表
          {name:'goodslist',path:'goodslist',component:goodslist},
          {name:'goodsadd',path:'goodsadd',component:goodsadd}
       ]},
        {name:'login',path:'/login',component:login,meta:{nologin:true}
      }]
})
//导入vue的一个组件库：element-ui
import elementUI from 'element-ui';
//导入默认样式（由于咱们自己修改了样式所以要替换默认样式）
import '../statics/theme_rms/index.css';
// 导入自己编写的全局样式
import '../statics/css/site.css';
//绑定到vue中
Vue.use(elementUI);

// 5.0 导入axios
import axios from 'axios';
// 5.0.1 设定axios的默认请求域名，将来在真正调用get,post方法的时候传入的url中就不需要带域名的
axios.defaults.baseURL = 'http://127.0.0.1:8899';
// / 5.0.2 配置axios在请求数据服务接口的时候，允许带cookie(凭证)
axios.defaults.withCredentials = true;
// 5.0.3 将axios对象绑定到Vue的原型属性 $ajax上，将来在任何组件中均可以通过this.$ajax中的get(),post() 就可以发出ajax请求了
Vue.prototype.$ajax = axios;
// 6 在vue-router对象上添加一个全局守卫，在任何组件渲染出来之前都需要先执行这个守卫函数
router.beforeEach((to,from,next)=>{
  // 通过axios请求 /admin/account/islogin 这个接口来判断当前浏览器是否有登录
  /*
      to和from的格式：{
          name:  代表的是当前路由规则对象的名字
          path:  代表的是当前路由规则对象的路径
          meta: 代表程序员在定义路由规则对象的时候，手动添加的  meta:{} 对象

      }
  */ 
  // console.log(to);
  // console.log(from);
  if(to.meta.nologin){
    next();
    // 阻断下面代码的继续运行
    return;
}
// 进入任何组件都会触发这个请求，进行登录判断
axios.get('/admin/account/islogin').then(res=>{       
  if(res.data.code =='nologin'){
      // 表示没有登录，则跳转到登录页面
    router.push({name:'login'});
  }else{
      // 登录成功
       // 调用next()继续渲染组件
      next();
  }
});
});
  // 判断如果进入的是登录页面，由于登录的路由规则上有一个  meta:{nologin:true} 而其他规则上没有
  // 所以可以判断 to.meta.nologin 的值如果是为true则跳过登录检查，否则进入登录检查
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
 // render:function(create){create(App)}
    // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
    render:create=>create(App)
})
