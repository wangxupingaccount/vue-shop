<template>
	<div>
		<index-banner></index-banner>
		<div class="H10"></div>
		<div class="reg-title">
			<span>我的订单</span>
		</div>
		<div class="cart-box">
			<table class="cart-table">
				<colgroup>
					<col style="width:14%">
					<col style="width:12%">
					<col style="width:12%">
					<col style="width:12%">
					<col style="width:12%">
					<col style="width:12%">
					<col style="width:12%">
					<col style="width:14%">
				</colgroup>
				<tr>
					<th>订单编号</th>
					<th>订单状态</th>
					<th>发货状态</th>
					<th>支付状态</th>
					<th>收货人</th>
					<th>支付方式名称</th>
					<th>订单总价</th>
					<th>操作</th>
				</tr>
				<tr v-for="(item,index) in orderList">
					<td>
						{{item.order_sn}}
					</td>
					<td>
						{{item.order_status}}
					</td>
					<td>{{item.shipping_status}}</td>
					<td>{{item.pay_status}}</td>
					<td>
						{{item.consignee}}元
					</td>
					<td>
						{{item.pay_name}}
					</td>
					<td>
						{{item.total_amount}}
					</td>
					<td>
						<router-link :to="{name:'orderDetail',params:{orderDetailId:item.order_id}}">查看详情</router-link>
					</td>
				</tr>
			</table>
		</div>
		<n-footer></n-footer>
		<div class="H10"></div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import * as func from '../store/function';
	import indexBanner from '../components/indexBanner.vue';
	import nFooter from '../components/pageFooter.vue';
	export default {
		data() {
			return {
				httpAddress:"http://www.qianduan88.com/api/vueShopApi/v1/",
				//httpAddress:"http://192.168.0.103:8089/v1/",
				orderList: [] // 购物车数据
			}
		},
		components: {
			indexBanner,
			nFooter
		},
		mounted: function() {
			this.$nextTick(function() {
				this.orderView();
			})
		},
		methods: {
			orderView: function() {
                var _url = this.httpAddress + "home/getOrderList";
				var that = this;
				$.ajax({
					url: _url,
					type: 'POST',
					dataType: 'json',
					data: {},
				})
				.done(function(result) {
					if(result.code == 0) {
						that.orderList = result.data;
					}
				})
				.fail(function() {
					console.log("error");
				})
			}
		}
	}
</script>