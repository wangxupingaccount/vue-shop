import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import News from '@/page/News'
import newsDetail from '@/page/newsDetail'
import productDetail from '@/page/productDetail'
import Product from '@/page/Product'
import Cart from '@/page/Cart'
import reg from '@/page/reg'
import orderDetail from '@/page/orderDetail'
import buyNow from '@/page/buyNow'
import order from '@/page/order'
import orderSuccess from '@/page/orderSuccess'
import orderList from '@/page/orderList'
import addSuccess from '@/page/addSuccess'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/News',
      name: 'News',
      component: News
    },
    {
      path: '/News/detailId',
      name: 'newsDetail',
      component: newsDetail
    },
    {
      path: '/Product',
      name: 'Product',
      component: Product
    },
    {
      path: '/Product/detailId',
      name: 'productDetail',
      component: productDetail
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/buyNow',
      name: 'buyNow',
      component: buyNow
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    },
    {
    	path:'/addSuccess',
    	name:'addSuccess',
    	component:addSuccess
    }
  ]
})
