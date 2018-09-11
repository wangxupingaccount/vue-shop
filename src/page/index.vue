<template>
	<div>
		<index-banner></index-banner>
		<div class="danfan-box">
			<div class="container">
				<ul>
					<li v-for="(item,index) in goodsTypeList">
						<img v-bind:src="item.typeImageUrl" />
						<div class="shad">
							<router-link :to="{name:'Product',params:{typeId:item.id}}">
								<div class="list">
									<p>{{item.typeName}}</p>
								</div>
							</router-link>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="page-title">
			<div class="container">
				<h1>热销产品</h1>
				<h2>—  HOT-SALE —</h2>
			</div>
		</div>
		<div class="product-list">
			<div class="container">
				<ul>
					<li v-for="(item,index) in hotGoodsList">
						<div class="img" v-bind:id="item.goods_id">
							<router-link :to="{name:'productDetail',params:{detailId:item.goods_id}}" class="pic">
								<img v-bind:src="item.original_img" />
							</router-link>
						</div>
						<!--<p class="text">
							 <router-link :to="{name:'productDetail',params:{detailId:item.goods_id}}">
								{{item.goods_name}}
							</router-link>
						</p>-->
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
		<n-footer></n-footer>

	</div>
</template>
<script>
	import indexBanner from '../components/indexBanner.vue';
	import nFooter from '../components/Footer.vue';
	export default {
		data() {
			return {
				httpAddress:"http://www.qianduan88.com/api/vueShopApi/v1/",
				//httpAddress:"http://192.168.0.103:8089/v1/",
				goodsTypeList: "",
				hotGoodsList: ""
			}
		},
		components: {
			indexBanner,
			nFooter
		},
		mounted: function() {
			this.$nextTick(function(){
				this.GoodsClassView();
				this.HotGoodsView();
			})
		},
		methods:{
			HotGoodsView:function(){
				var _url = this.httpAddress + "home/getHotGoodsList";
				var that = this;
				var cat_id = 103;
				var isHot = 1;
				$.ajax({
					url: _url,
					type: 'POST',
					dataType: 'json',
					data: {
						type: cat_id,
						isHot: isHot
					},
				})
				.done(function(result) {
					if(result.data.length > 0) {
						that.hotGoodsList = result.data;
					}
				})
				.fail(function() {
					console.log("error");
				})
			},
			GoodsClassView:function(){
				console.log("sss")
				var _url = this.httpAddress + "home/getGoodsClassList";
				var that = this;
				$.ajax({
					url: _url,
					type: 'POST',
					dataType: 'json',
					data: {},
				})
				.done(function(result) {
					if(result.data.length > 0) {
						that.goodsTypeList = result.data;
					}
				})
				.fail(function() {
					console.log("error");
				})
			}
		}
	}
</script>