<template>
	<div>
		<index-banner></index-banner>
		<div class="page-box">
			<div class="H10"></div>
			<div class="buy-now-title">
				<label for="">收货人信息</label>
			</div>
			<div class="buy-now-content">
				<div class="buy-now-address">
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
					<div class="delivery-mode-group">
						<label for="">
			    			<input type="radio" name="deliveryMode"/>
			    			<span>平邮</span>
			    		</label>
						<span class="cost PDL80">费用：￥5.00</span>
					</div>
					<div class="delivery-mode-group">
						<label for="">
			    			<input type="radio" name="deliveryMode"/>
			    			<span>快递</span>
			    		</label>
						<span class="cost PDL80">费用：￥10.00</span>
					</div>
					<div class="delivery-mode-group">
						<label for="">
			    			<input type="radio" name="deliveryMode"/>
			    			<span>EMS</span>
			    		</label>
						<span class="cost PDL80">费用：￥100.00</span>
					</div>
				</div>
			</div>
			<div class="buy-now-title">
				<label for="">支付方式</label>
			</div>
			<div class="buy-now-content">
				<div class="delivery-mode">
					<div class="delivery-mode-group">
						<label for="">
			    			<input type="radio" name="paymentMethod"/>
			    			<span>货到付款</span>
			    		</label>
						<span class="cost">您需要在收货时用现金等方式向送货员支付订单款项</span>
					</div>
					<div class="delivery-mode-group">
						<label for="">
			    			<input type="radio" name="paymentMethod"/>
			    			<span>银行转账</span>
			    		</label>
						<span class="cost">您汇款时请务必在电汇单的用途栏内注明订单号。</span>
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
						<tr>
							<td class="text-left">佳能（Canon） EOS 50D Mark 三单反套机</td>
							<td>￥32600.00</td>
							<td>1</td>
							<td>￥32600.00</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="buy-now-title">
				<label for="">给卖家留言</label>
			</div>
			<div class="buy-now-content">
				<div class="leaving-message">
					<input type="text" placeholder="选填：对本次交易的说明（建议填写和卖家达成一致的说明）"/>
			    	<p>(200字)</p>
				</div>
			</div>
			<div class="buy-now-total">
				<p><span>总计：</span><em>￥32600.00</em></p>
				<p><span>已节省：</span><em>￥0.00</em></p>
				<p><span class="color1"><b>订单总额：</b></span><em class="color2"><b>￥32605.00</b></em></p>
			</div>
			<div class="buy-now-btn">
				<button type="submit" class="submit-btn">提交订单</button>
			</div>
		</div>
		<div class="H20"></div>
		<n-footer></n-footer>
	</div>
</template>
<script>
	import indexBanner from '../components/indexBanner.vue';
	import nFooter from '../components/pageFooter.vue';
	export default {
		data() {
			return {}
		},
		methods: {

		},
		components: {
			indexBanner,
			nFooter
		},
		mounted: function() {

		}
	}
</script>