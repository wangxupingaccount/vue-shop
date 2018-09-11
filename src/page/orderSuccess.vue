<template>
	<div>
		<index-banner></index-banner>
		<div class="H10"></div>
		<div class="reg-title">
			<span>订单状态</span>
		</div>
		<div class="container">
			<div class="order-success-box">
				<p>订单提交成功，请尽快付款！订单号：{{order_Sn}}</p>
				<p>请您在<span class="color1">24小时</span>内完成支付，否则订单会被自动取消</p>
			</div>
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
				order_Sn:''
			}
		},
		components: {
			indexBanner,
			nFooter
		},
		mounted: function() {
			this.$nextTick(function() {
				this.orderSuccessView();
			})
		},
		methods: {
			orderSuccessView:function(){
				this.order_Sn = func.orderSn.get();
			}
		}
	}
</script>