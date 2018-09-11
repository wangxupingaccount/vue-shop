<template>
	<div>
		<index-banner></index-banner>
		<div class="page-box">
			<div class="H10"></div>
			<div class="order-number"><span>订单号：</span><em>20170926102</em></div>
			<div class="buy-now-title">
				<label for="">收货人信息</label>
			</div>
			<div class="buy-now-content">
				<div class="order-delivery-address">
					<div class="address-item" v-for="(item,index) in filterAddress" v-bind:class="{'check':index==currentIndex}" @click="currentIndex=index" :id="item.address_id">
						<div class="address-title">
							<span class="name">{{item.consignee}}</span>
							<span class="default" v-if="(item.is_default==1)?true:false">默认地址</span>
							<span class="setDefault" v-if="(item.is_default==0)?true:false" @click="setDefault(item.address_id)">设为默认</span>
						</div>
						<div class="address-content">
							<p class="p1">
								<span class="phone">{{item.mobile}}</span>
								<span class="code">{{item.zipcode}}</span>
							</p>
							<p class="p2">{{item.province}}{{item.city}}{{item.district}}{{item.twon}}{{item.address}}</p>
						</div>
					</div>
					<div class="address-add-btn">
						<p><span>+ 收货人信息</span></p>
					</div>
				</div>
				<div class="order-addressMore">
					<span @click="loadMore">more</span>
				</div>
				<div class="buy-now-address" v-show="addressFlag">
					<div class="address-group">
						<label for="">姓名 ：</label>
						<div class="item">
							<input type="text" class="input W175" />
							<span class="xh">*</span>
						</div>
					</div>
					<div class="address-group">
						<label for="">邮箱 ：</label>
						<div class="item">
							<input type="text" class="input W175" />
							<span class="xh">*</span>
						</div>
					</div>
					<div class="address-group">
						<label for="">电话 ：</label>
						<div class="item">
							<input type="text" class="input W175" />
							<span class="xh">*</span>
						</div>
					</div>
					<div class="address-group">
						<label for="">邮政编码 ：</label>
						<div class="item">
							<input type="text" class="input W175" />
							<span class="xh">*</span>
						</div>
					</div>
					<div class="address-group">
						<label for="">地区 ：</label>
						<div class="item">
							<select>
								<option value="北京">北京</option>
								<option value="上海">上海</option>
							</select>
							<input type="text" class="input W300" />
							<span class="xh">*</span>
						</div>
					</div>
					<div class="address-group">
						<label for="">街道地址：</label>
						<div class="item">
							<input type="text" class="input W820" />
							<span class="xh">*</span>
						</div>
					</div>
				</div>
			</div>
			<div class="buy-now-title">
				<label for="">配送方式</label>
			</div>
			<div class="buy-now-content">
				<div class="delivery-mode">
					<div class="delivery-mode-group" v-for="(item,index) in deliveryList">
						<span class="name" @click="deliveryFun(item)" v-bind:class="{'check':item.checked}"></span>
						<span class="text">{{item.name}}</span>
						<span class="cost PDL80">费用：￥{{item.price}}</span>
					</div>
				</div>
			</div>

			<div class="buy-now-title">
				<label for="">支付方式</label>
			</div>
			<div class="buy-now-content">
				<div class="delivery-mode">
					<div class="delivery-mode-group" v-for="(item,index) in paymentMethodList">
						<span class="name" @click="paymentMethodFun(item)" v-bind:class="{'check':item.checked}"></span>
						<span class="text">{{item.name}}</span>
						<span class="cost PDL80">{{item.tip}}</span>
					</div>
				</div>
			</div>
			<div class="buy-now-title">
				<label for="">购物清单</label>
			</div>
			<div class="buy-now-content">
				<div class="shopping-list">
					<table class="shopping-list-table">
						<colgroup>
							<col style="width:55%">
							<col style="width:15%">
							<col style="width:15%">
							<col style="width:15%">
						</colgroup>
						<tr>
							<th style="text-align: left;">商品名称</th>
							<th>单价</th>
							<th>数量</th>
							<th>小计</th>
						</tr>
						<tr v-for="(item,index) in cartList">
							<td class="text-left">{{item.title}}</td>
							<td>{{item.price | changePrice}}</td>
							<td>{{item.number}}</td>
							<td>{{item.subtotal | changePrice}}</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="buy-now-title">
				<label for="">给卖家留言</label>
			</div>
			<div class="buy-now-content">
				<div class="leaving-message">
					<input type="text" placeholder="选填：对本次交易的说明（建议填写和卖家达成一致的说明）" v-model="message" />
					<p>(200字)</p>
				</div>
			</div>
			<div class="buy-now-total">
				<p><span>总计：</span><em>{{total1 | changeTotal}}</em></p>
				<p><span>已节省：</span><em>￥0.00</em></p>
				<p><span class="color1"><b>订单总额：</b></span><em class="color2"><b>{{total2 | changeTotal}}</b></em></p>
			</div>
			<div class="buy-now-btn">
				<span class="submit-btn" @click="orderSubmitFun()">提交订单</span>
				<!--<span class="submit-btn" v-on:orderSubmit="orderSubmitFun">提交订单</span>-->
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
				cartList: [], // 购物车数据
				cartGoodsList:[],
				addressFlag: false,
				addressList: "", //地址列表数据
				limitNum: 3, //地址列表默认显示3条数据
				currentIndex: 0, //地址当前索引
				is_default: 1, //是否是默认地址
				deliveryList: [
				   {
						name: "平邮",
						price: 5.00,
						check: true
					},
					{
						name: "快递",
						price: 10.00,
						check: false
					},
					{
						name: "EMS",
						price: 100.00,
						check: false
					}
				],
				delivery: '', //配送方式
				paymentMethodList:[
				    {
						name: "货到付款",
						tip: "您需要在收货时用现金等方式向送货员支付订单款项",
						check: true
					},
					{
						name: "银行转账",
						tip: "您汇款时请务必在电汇单的用途栏内注明订单号。",
						check: false
					}
				],
				paymentMethod: '', //支付方式
				message: '', //留言
				currentAddressId: '', //当前选中的地址id
				total1: '', //订单总计
				total2: '' //订单总额
			}
		},
		methods: {
			defaultView: function() {
				var that = this;
				this.cartList = func.cartList.get();
				this.total1 = this.toDecimal2(func.allTotal.get());
				this.total2 = this.toDecimal2(func.allTotal.get());
				that.deliveryList.forEach(function(item, index) {
					if(index == 0) {
						that.$set(item, "checked", true);
						that.delivery = item.price
						that.total1 = that.toDecimal2(func.allTotal.get() + (that.delivery - 0));
						that.total2 = that.toDecimal2(func.allTotal.get() + (that.delivery - 0));
					}
				})
				that.paymentMethodList.forEach(function(item, index) {
					if(index == 0) {
						that.$set(item, "checked", true);
						that.paymentMethod = item.name
					}
				})
			},
			addressView: function() {
				var _url = this.httpAddress + "home/getShippingAddressList";
				var that = this;
				$.ajax({
					url: _url,
					type: 'POST',
					dataType: 'json',
					data: {},
				})
				.done(function(result) {
					if(result.data.length > 0) {
						that.addressList = result.data;
						that.addressList.forEach(function(item, index) {
							if(index == 0) {
								that.currentAddressId = item.address_id;
							}
						})
					}
				})
				.fail(function() {
					console.log("error");
				})
			},
			loadMore: function() {
				this.limitNum = this.addressList.length
			},
			setDefault: function(addressId) {
				var _this = this;
				this.addressList.forEach(function(address, index) {
					if(address.address_id == addressId) {
						address.is_default = 1;
						_this.currentAddressId = addressId;
					} else {
						address.is_default = 0
					}
				})
			},
			deliveryFun: function(item) {
				var that = this;
				that.deliveryList.forEach(function(item, index) {
					that.$set(item, "checked", false);
				})
				that.$set(item, "checked", true);
				that.delivery = item.price
				this.total1 = this.toDecimal2(func.allTotal.get() + (that.delivery - 0));
				this.total2 = this.toDecimal2(func.allTotal.get() + (that.delivery - 0));
			},
			paymentMethodFun: function(item) {
				var that = this;
				that.paymentMethodList.forEach(function(item, index) {
					that.$set(item, "checked", false);
				})
				that.$set(item, "checked", true);
				that.paymentMethod = item.name
			},
			orderSubmitFun: function() {
				var _this = this;
				var _cartData = [];
                var _url = this.httpAddress + "home/addOrder";
				this.cartList.forEach(function(item, index) {
					var itemData = {
						goods_id: item.id,
						original_img: item.imgSrc,
						goods_name: item.title,
						market_price: item.price,
						number: item.number,
						subtotal: item.subtotal
					}
					_cartData.push(itemData);
				})
//              console.log("_cartData="+_cartData)
//              console.log("_this.currentAddressId="+_this.currentAddressId)
//              console.log("_this.delivery="+_this.delivery)
//              console.log("_this.paymentMethod="+_this.paymentMethod)
//              console.log("_this._cartData="+JSON.stringify(_cartData))
//              console.log("_this.message="+_this.message)
//              console.log("_this.total1="+_this.total1)
//              console.log("_this.total2="+_this.total2)
				$.ajax({
					url: _url,
					type: 'POST',
					dataType: 'json',
					data: {
						currentAddressId: _this.currentAddressId,
						delivery: _this.delivery,
						paymentMethod: _this.paymentMethod,
						cartData: _cartData,
						message: _this.message,
						total1: _this.total1,
						total2: _this.total2
					}
				})
				.done(function(result) {
					console.log(result)
					if(result.code == 0) {
						_this.cartGoodsList = func.cartList.get();	
						func.cartGoodsList.set(_this.cartGoodsList)
						func.goodsId.clear();
						func.cartList.clear();
						func.checkAllFlag.clear();
						func.checkLength.clear();
						func.allTotal.clear();
						func.allNumb.clear();   
                        func.orderSn.set(result.data);
						_this.$router.push('/orderSuccess')
					}
				})
				.fail(function() {
					console.log("error");
				})
			}
		},
		components: {
			indexBanner,
			nFooter
		},
		mounted: function() {
			this.$nextTick(function() {
				this.addressView();
				this.defaultView();
			})
		},
		computed: {
			filterAddress: function() {
				return this.addressList.slice(0, this.limitNum)
			}
		},
		filters: {
			changePrice: function(value) {
				return "￥" + value;
			},
			changeTotal: function(value) {
				return "￥" + value + "元";
			}
		},
	}
</script>