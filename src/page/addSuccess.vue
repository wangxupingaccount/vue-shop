<template>
	<div>
		<div class="page-box">
			<div class="H20"></div>
            <div class="addSuccess-box">
                <div class="addSuccess-left"><img v-bind:src="addSuccessList.imgSrc" alt="" /></div>
                <div class="addSuccess-center">
                	<p class="title">{{addSuccessList.title}}</p>
                </div>
                <div class="addSuccess-right">
                	<div class="tip"><span></span><em>已成功加入购物车</em></div>
                	<div class="total">小计：¥{{addSuccessList.subtotal}}</div>
                    <div class="btn">
                    	<span class="addCart-btn" @click="returnDetail">返回商品详情</span>
                    	<router-link class="mallBuy-btn" to="/Cart">去购物车结算</router-link>
                    </div>
                </div>
            </div>

			
		</div>
		<div class="H20"></div>
		<n-footer></n-footer>
	</div>
</template>
<script>
	import * as func from '../store/function';
	import indexBanner from '../components/indexBanner.vue';
	import nFooter from '../components/pageFooter.vue';
	export default {
		data() {
			return {
				httpAddress:"http://www.qianduan88.com/api/vueShopApi/v1/",
				//httpAddress:"http://192.168.0.103:8089/v1/",
				addSuccessList:""
			}
		},
		methods: {
			defaultView: function() {
				var that = this;
				var cartList = func.cartList.get();
                var goods_id = func.goodsId.get();
                cartList.forEach(function(item,index){
                	if(item.id == goods_id){
                		that.addSuccessList = item;
                	}
                })
                console.log(that.addSuccessList.imgSrc)
                console.log(JSON.stringify(that.addSuccessList))
			},
			returnDetail:function(){
				this.$router.push({path:'/Product/detailId'})
			}
		},
		components: {
			indexBanner,
			nFooter
		},
		mounted: function() {
			this.$nextTick(function() {
				this.defaultView();
			})
		},
		computed: {
			filterAddress: function() {
				
			}
		},
		filters: {
			
		}
	}
</script>