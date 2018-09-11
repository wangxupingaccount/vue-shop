<template>
	<div>
		<index-banner></index-banner>
		<div class="H10"></div>
   	    <div class="reg-title">
			<span>购物车</span>
		</div>
		<div class="cart-box">
			<div v-show="cartShow">
				<table class="cart-table">
					<colgroup>
						<col style="width:6%">
						<col style="width:12%">
						<col style="width:30%">
						<col style="width:15%">
						<col style="width:15%">
						<col style="width:15%">
						<col style="width:12%">
					</colgroup>
					<tr>
						<th></th>
						<th colspan="2" style="text-align: left;text-indent: 35px;">商品名称</th>
						<th>单价</th>
						<th>商品数量</th>
						<th>小计</th>
						<th>操作</th>
					</tr>
					<tr v-for="(item,index) in cartList" class="tr">
						<td style="text-align: center;">
	                         <span class="check-btn" v-bind:class="{'check':item.checked}" @click="selectProduct(item)"></span>
						</td>
						<td style="text-align: center;">
							<img class="cart-table-img" v-bind:src="item.imgSrc">
						</td>
						<td class="text-left">{{item.title}}</td>
						<td>{{item.price}}元</td>
						<td>
							<div class="deta-number">
								<span class="deta-number-click" @click="changeMoney(item,-1)">-</span>
								<input type="text" class="deta-number-input number" v-model="item.number">
								<span class="deta-number-click" @click="changeMoney(item,1)">+</span>
							</div>
						</td>
						<td>
							<div class="cart-table-total subtotal">{{item.number * item.price | changePrice}}元</div>
						</td>
						<td>
							<span style="display: inline-block;padding:0 10px;cursor: pointer; color:blue" @click="dele(item)">删除</span>
						</td>
					</tr>
				</table>
				<div class="cart-total">
					<div class="cart-total-left">
						<label>
				           <span class="check-btn" v-bind:class="{'check':checkAllFlag}" @click="checkAll()"></span>全选
		              </label>
					</div>
					<div class="cart-total-right">
						<p>
							已选择 <span class="allNumb">{{allNumb}}</span> 件商品 总价（不含运费）：￥ <span class="allTotal">{{allTotal | changePrice}}</span> 元
						</p>
		              	<span class="cart-total-btn" >
		              		<router-link to="/order">结算订单</router-link>
		              	</span>
					</div>
				</div>
		    </div>
		    <div v-show="cartHide">
		    	<div class="cart-no-login">
		    		<div class="message">
		    			 <ul>
		    			 	<li>购物车空空的哦~，去看看心仪的商品吧~</li>
		    			 	<li><router-link to="/Product">去购物></router-link></li>
		    			 </ul>
		    		</div>
		    	</div>
		    </div>
		</div>
		<n-footer></n-footer>
		<div class="H10"></div>
		<div class="md-modal modal-msg md-modal-transition" id="showModal" v-bind:class="{'md-show':delFlag}">
        <!-- 通过delFlag控制弹窗和遮罩层的显示 -->
          <div class="md-modal-inner">
            <div class="md-top">
            <!-- 绑定关闭弹窗的事件 -->
              <button class="md-close" @click="delFlag=false">关闭</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <p id="cusLanInfo">你确认删除此订单信息吗?</p>
              </div>
              <div class="btn-wrap col-2">
                <!-- 绑定删除商品的事件 -->
                <button class="mdbtn btn--m" id="btnModalConfirm" @click="deleShop()">Yes</button>
                <!-- 绑定关闭弹窗的事件 -->
                <button class="mdbtn btn--m btn--red" id="btnModalCancel" @click="delFlag=false">No</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 绑定关闭弹窗的事件，在遮罩层绑定即可以在弹窗后点击遮罩层同样实现关闭弹窗 -->
        <div class="md-overlay" v-if="delFlag" @click="delFlag=false"></div>
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
				cartList: [],// 购物车数据
				allTotal: 0,// 总金额
				allNumb: 0,// 购买数量
				checkLength:0,// 判断是否商品选中的个数
				checkAllFlag: false,// 全选的控制
				delFlag:false,// 弹窗的控制
				delIndex:null,// 删除的索引
				currentIndex:null,//当前的索引
				cartShow:false,
				cartHide:false
			}
		},
		filters:{
			changePrice:function(value){
				return "￥"+value;
			}
		},
		components: {
			indexBanner,nFooter
		},
		mounted:function(){
			this.$nextTick(function(){
				this.cartView();
				this.isCart();
			})
		},
		methods: {
			cartView:function(){
				var cartList = func.cartList.get();
				var checkAllFlag = func.checkAllFlag.get();
				var allTotal = func.allTotal.get();
				var allNumb = func.allNumb.get();
				var checkLength = func.checkLength.get();
				if(cartList == null || cartList == "") {
					this.cartList = [];
				} else {
					this.cartList = cartList;
					this.checkAllFlag = checkAllFlag;
					this.allTotal = allTotal;
					this.allNumb = allNumb;
					this.checkLength = checkLength;
				}
			},
			isCart:function(){
				var cartList = func.cartList.get();
				if(cartList.length){
					this.cartShow = true;
					this.cartHide = false;
				}else{
					this.cartShow = false;
					this.cartHide = true;
				}
			},
			changeMoney:function(item,way){
				if(way>0){
					item.number++
				}else{
					item.number--
					if(item.number<1){
						item.number = 1;
					}
				}
				this.calcTotalPrice();
				//console.log(this.cartList)
				var currentIndex = this.cartList.indexOf(item);
				console.log(this.cartList[currentIndex].number)
				this.cartList[currentIndex].number = item.number;
				this.cartList[currentIndex].subtotal =this.toDecimal2(item.number*item.price);
				func.cartList.set(this.cartList)
			},
			selectProduct:function(item){
				var that = this;
				console.log(item.id)
				if(typeof item.checked == "undefined"){
					that.$set(item,"checked",true);
				}else{
					item.checked = !item.checked;
				}
				func.cartList.set(this.cartList);
				that.calcTotalPrice();
			},
			checkAll:function(){
				this.checkAllFlag = !this.checkAllFlag;
				var that = this;
				this.cartList.forEach(function(item,index){
					item.checked = that.checkAllFlag;
					if(typeof item.checked == "undefined"){
						that.$set(item,"checked",that.checkAllFlag)
					}else{
						item.checked = that.checkAllFlag;
					}
					func.cartList.set(that.cartList)
				})
				func.checkAllFlag.set(this.checkAllFlag);
				that.calcTotalPrice();
			},
			calcTotalPrice:function(){
				var that = this;
				that.allTotal = 0;
				that.allNumb = 0;
				that.checkLength = 0;
				this.cartList.forEach(function(item,index){
					if(item.checked){
						that.allTotal += item.price*item.number;
						that.allNumb =  parseInt(that.allNumb + item.number);
						that.checkLength += 1 
					}
				})
				func.allTotal.set(that.allTotal);
				func.allNumb.set(that.allNumb);
				func.checkLength.set(that.checkLength);
			},
			dele:function(item){
				this.delIndex = this.cartList.indexOf(item);
				this.delFlag = true;
			},
			deleShop:function(){
				console.log(this.delIndex);
				this.$delete(this.cartList,this.delIndex);
				this.delFlag = false;
				func.cartList.set(this.cartList);
				this.calcTotalPrice();
				this.isCart();
			},
			orderFn:function(){
				var checkLength = func.checkLength.get();
				if(checkLength<1){
					return;
				}
			}
		},
		watch: {
			'checkLength': {
				handler: function(val, oldVal) {
					if(this.checkLength === this.cartList.length) {
						this.checkAllFlag = true;
						func.checkAllFlag.set(this.checkAllFlag)
					} else {
						this.checkAllFlag= false;
						func.checkAllFlag.set(this.checkAllFlag)
					}
				},
				deep: true
			}
		}
	}
</script>