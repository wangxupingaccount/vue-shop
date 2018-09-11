<template>
    <div class="header">
      <div class="head">
          <div class="container">
              <div class="logo">Electronics</div>
              <div class="head-info">
              	<!--<span class="reg" @click="menuClick(0)" :class="{active:0==nowIndex}">
              		<router-link to="/reg">注册</router-link>
              	</span>
              	<em> | </em>
              	<span class="login">登录</span>
              	<em> | </em>-->
              	<span class="login" @click="menuClick(0)" :class="{active:0==nowIndex}">
              		<router-link to="/Cart">购物车</router-link>
              	</span>
              	<em> | </em>
              	<span class="login" @click="menuClick(0)" :class="{active:0==nowIndex}">
              		<router-link to="/orderList">我的订单</router-link>
              	</span>
              	<!--<em> | </em>
              	<span class="login" @click="menuClick(0)" :class="{active:0==nowIndex}">
              		<router-link to="/orderDetail">订单详情</router-link>
              	</span>-->
              </div>
          </div>
      </div>
      <div class="menu">
          <div class="container">
              <ul>
              	<li v-for="(item,index) in menus" @click="menuClick(index)" :class="{active:index==nowIndex}">
              		<router-link :to="item.linkUrl">{{item.name}}</router-link>
              	</li>
              </ul>
          </div>
      </div>
    </div>
</template>
<script>
    import * as func from '../store/function';
    export default {
        data () {
            return {
              textName:"123456",
              menus:[
                 {name:"首页",linkUrl:"/"},
                 {name:"摄影摄像",linkUrl:"/Product"},
                 {name:"数码资讯",linkUrl:"/News"}
              ],
              nowIndex:0, 
            }
        },
        methods: {
        	menuClick:function(index){
        		this.nowIndex = index;
			    func.goodsId.clear();
			    func.newsId.clear();
        	}
//          abc:function(){
//             this.$emit("send",this.textName);
//          }
        }
    }
</script>
