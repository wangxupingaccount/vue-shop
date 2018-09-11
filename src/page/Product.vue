<template>
	<div class="product-box">
		<div class="product-banner note" :style ="note"></div>
		<div class="page-title">
			<div class="container">
				<h1>热销产品</h1>
				<h2>———&nbsp;&nbsp;&nbsp;&nbsp;HOT-SALE&nbsp;&nbsp;&nbsp;&nbsp;———</h2>
			</div>
		</div>
		<div class="product-list">
			<div class="container">
				<ul>
					<li v-for="(item,index) in dataList">
						<div class="img" v-bind:id="item.goods_id">
							<router-link :to="{name:'productDetail',params:{detailId:item.goods_id}}" class="pic">
								<img v-bind:src="item.original_img" />
							</router-link>
						</div>
						<p class="btn">
							<span class="market_price">{{item.market_price | pruductPrice}}</span>
							<span class="sales_sum">{{item.sales_sum}}人付款</span>
						</p>
						<p class="text">
							<router-link :to="{name:'productDetail',params:{detailId:item.goods_id}}">
								{{item.goods_name}}
							</router-link>
						</p>
					</li>
				</ul>
			</div>
		</div>
		<!--<button v-on:click="addCart(index)" class="btn">加入购物车</button>-->
		

	
		<div class="H20"></div>
		<n-footer></n-footer>
	</div>
</template>
<script>
	import * as func from '../store/function';
	import { bus } from '../assets/bus.js'
	import Vue from 'vue'
	import nFooter from '../components/pageFooter.vue';
	export default {
		data() {
			return {
				httpAddress:"http://www.qianduan88.com/api/vueShopApi/v1/",
				//httpAddress:"http://192.168.0.103:8089/v1/",
				dataList: "",
				cartList: [],
				note: {
		            backgroundImage: "url(" + require("../images/productBanner.jpg") + ")",
		            backgroundRepeat: "no-repeat",
		            backgroundPosition:"center center",
		            backgroundSize: "cover"
	           },
	           nowIndex:0
			}
		},
		methods: {
			goodsView:function(){
				var _url = "";
				var data = "";
				var typeId = this.$route.params.typeId;
				if(typeof typeId == "undefined"){
					_url = this.httpAddress + "home/getGoodsList";
					data = {type: cat_id};
				}else{
					_url = this.httpAddress + "home/getGoodsTypeList";
					data = {typeId: typeId};
				}
				var that = this;
				var cat_id = 13;
				$.ajax({
					url: _url,
					type: 'POST',
					dataType: 'json',
					data: data,
				})
				.done(function(result) {
					if(result.data.length > 0) {
						that.dataList = result.data;
					}
				})
				.fail(function() {
					console.log("error");
				})
				var cartList = func.cartList.get();
				if(cartList == null || cartList == "") {
					this.cartList = [];
				} else {
					this.cartList = cartList;
				}
			}
		},
		components: {
			nFooter
		},
		mounted: function() {
			this.$nextTick(function() {
				this.goodsView();
			})
			var cartList = func.cartList.get();
			if(cartList == null || cartList == "") {
				this.cartList = [];
			} else {
				this.cartList = cartList;
			}
			bus.$emit('tip', func.cartList.get())
		},
		filters:{
			pruductPrice:function(value){
				return "￥"+value;
			}
		}
	}
</script>