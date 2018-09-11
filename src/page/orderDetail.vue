<template>
	<div>
		<index-banner></index-banner>
		<div class="reg-title">
			<span>订单详情</span>
		</div>
		<div class="order-detail-box">
			<div class="H10"></div>
			<div class="order-detail-title MB10">
				<label for="">订单编号：</label>
				<span class="text">{{order_sn}}</span>
			</div>
			<div class="order-detail-title MB10">
				<label for="">订单状态：</label>
				<span class="text">{{order_status}}</span>
			</div>
			<div class="order-detail-title">
				<label for="">支付方式：</label>
			</div>
			<div class="order-detail-pay">
				<p>{{pay_name}} 您需要在收货时用现金等方式向送货员支付订单款项。</p>
			</div>
			<div class="order-detail-title">
				<label for="">收货人信息：</label>
			</div>
			<div class="order-detail-pay">
				<p>姓名： {{consignee}}</p>
				<p>邮箱： {{email}}</p>
				<p>电话： {{mobile}}</p>
			</div>
			<div class="order-detail-title MB10">
				<label for="">给卖家留言：</label>
				<span class="text">{{message}}</span>
			</div>
			<div class="order-detail-table-title">
				购物清单
			</div>
			<table class="order-detail-table">
				<colgroup>
					<col style="width:10%">
					<col style="width:45%">
					<col style="width:15%">
					<col style="width:15%">
					<col style="width:15%">
				</colgroup>
				<tr>
					<th>商品图片</th>
					<th style="text-align: left;">商品名称</th>
					<th>单价</th>
					<th>数量</th>
					<th>小计</th>
				</tr>
				<tr v-for="(item,index) in cartList">
					<td><img class="cart-table-img" v-bind:src="item.imgSrc"></td>
					<td class="text-left">{{item.title}}</td>
					<td>{{item.price | changePrice}}</td>
					<td>{{item.number}}</td>
					<td>{{item.subtotal | changePrice}}</td>
				</tr>
			</table>
			<div class="order-detail-total">
				<p class="p1">总计：￥{{total_amount}}</p>
				<p class="p1">已节省：￥0.00</p>
				<p class="p2"><span class="color1">订单总额：</span><span class="color2">￥{{order_amount}}</span></p>
			</div>
		</div>
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
				order_sn: "",
				order_status: "",
				pay_name: "",
				consignee: "",
				email: "",
				mobile: "",
				message: "",
				total_amount: "",
				order_amount: "",
				order_id:'',
				cartList: [] // 购物车数据
			}
		},
		props: [],
		methods: {
			orderDetailView: function() {
				this.cartList = func.cartGoodsList.get();
				var orderDetailId = this.$route.params.orderDetailId;
        		var orderId = func.orderId.get();
        		if(orderId==null || orderId==""){
        			func.orderId.set(orderDetailId);
        			this.order_id = func.orderId.get();
        		}else{
        			this.order_id = func.orderId.get();
        		}
        		var _url = this.httpAddress + "home/getOrderDetailsData";
				var that = this;
				$.ajax({
					url: _url,
					type: 'POST',
					dataType: 'json',
					data: {
						id:this.order_id
					},
				})
				.done(function(result) {
					console.log(result.data[0].order_sn)
					if(result.data.length > 0) {
						that.order_sn = result.data[0].order_sn;
						that.order_status = result.data[0].order_status;
						that.pay_name = result.data[0].pay_name;
						that.consignee = result.data[0].consignee;
						that.email = result.data[0].email;
						that.mobile = result.data[0].mobile;
						that.message = result.data[0].message;
						that.total_amount = result.data[0].total_amount;
						that.order_amount = result.data[0].order_amount;
					}
				})
				.fail(function() {
					console.log("error");
				})
			}
		},
		components: {
			indexBanner,nFooter
		},
		mounted: function() {
			this.$nextTick(function() {
				this.orderDetailView();
			})
		},
		filters:{
			changePrice:function(value){
				return "￥"+value;
			}
		},
	}
</script>