<template>
    <div>
    	<div class="H40"></div>
        <div class="product-detail-info">
        	<div class="product-carousel">
        		<div class="small-carousel">
        			<ul>
        				<li><span><img src="../images/product-detail-img001.jpg"/></span></li>
        				<li><span><img src="../images/product-detail-img002.jpg"/></span></li>
        			</ul>
        		</div>
        		<div class="large-carousel"><img src="../images/product-detail-img001.jpg"/></div>
        		<div class="clear"></div>
        	</div>
        	<div class="product-info">
        		<div class="info-title">
        			{{goods_name}}
        		</div>
        		<div class="info-prop bb">
        			<span class="propName">价格：</span>
        			<span class="newPrice">￥{{shop_price}}</span>
        			<span class="oldPrice">￥{{market_price}}</span>
        		</div>
        		<div class="info-prop bb">
        			<span class="propName">收藏：</span>
        			<span class="collection">0</span>
        		</div>
        		<div class="info-prop PD10">
        			<span class="propName">购买数量：</span>
        			<div class="propNumber">
        			    <input type="text" class="input" v-model="number"/>
        			    <span class="add" @click="changeMoney(1)">+</span>
        			    <span class="sub" @click="changeMoney(-1)">-</span>
        			</div>
        		</div>
        		<div class="info-btn">
        		    <!--<router-link class="mallBuy-btn" to="/buyNow">立即购买</router-link>-->
        		    <span class="addCart-btn" @click="addCart">加入购物车</span>
        		</div>
        	</div>
        	<div class="clear"></div>
        </div>
        <div class="H40"></div>
        <div class="product-detail-content">
            <div class="title">
               <span>产品详情</span>
            </div>
            <div class="content" v-html="goods_content"></div>
            <!--<ul>
            	<li v-for="(item,index) in demoList" @click="setPageIndex(index)" ref="menuItem">{{item.name}}</li>
            </ul>
            <div class="mainBox" id="mainBox" ref="mainBox">dddd</div>-->
        </div>
        <n-footer></n-footer>
    </div>
</template>
<script>
	import * as func from '../store/function';
	import Vue from 'vue';
    import nFooter from '../components/pageFooter.vue';
    export default{
        data(){
            return{
               httpAddress:"http://www.qianduan88.com/api/vueShopApi/v1/",
			   //httpAddress:"http://192.168.0.103:8089/v1/",
               nowIndex:-1,
               goods_id:'',
               goods_name:'',
               original_img:'',
               market_price:'',
               shop_price:'',
               goods_content:'',
               number:1,
               cartList: [],// 购物车数据,
               nowIndex:0,
               goods_id:'',
               demoList:[
                  {"id":1,"name":"111"},
                  {"id":2,"name":"222"},
                  {"id":3,"name":"333"},
               ]
            }
        },
        props:[],
        methods:{
        	setPageIndex:function(index){
//      		let getMenuText  = this.$refs.menuItem[index].innerText;
//      		console.log(getMenuText)
        	},
        	productView:function(){
        		var that = this;
        		var detailId = this.$route.params.detailId;
        		var goodsId = func.goodsId.get();
        		if(goodsId==null || goodsId==""){
        			func.goodsId.set(detailId);
        			this.goods_id = func.goodsId.get();
        		}else{
        			this.goods_id = func.goodsId.get();
        		}
	            var _url = this.httpAddress + "home/getGoods";
	            $.ajax({
	                  url: _url,
	                  type: 'POST',
	                  dataType: 'json',
	                  data:{goodsId:this.goods_id},
	            })
	            .done(function(result) {
	                that.goods_id = result.data.goods_id;
	                that.goods_name = result.data.goods_name;
	                that.market_price = result.data.market_price;
	                that.original_img = result.data.original_img;
	                that.shop_price = result.data.shop_price;
	                that.goods_content = result.data.goods_content;
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
				this.$refs.mainBox.style.color='red'
				console.log("mainBox="+this.$refs.mainBox)
        	},
        	changeMoney:function(way){
        		if(way>0){
					this.number++
				}else{
					this.number--
					if(this.number<1){
						this.number = 1;
					}
				}
        	},
        	addCart: function() {
				var _this = this;
				var obj = {};
				if(_this.cartList.length){
					if(JSON.stringify(_this.cartList).indexOf(_this.goods_id) < 0) {
						obj.id = _this.goods_id;
						obj.imgSrc = _this.original_img;
						obj.title = _this.goods_name;
						obj.price = _this.market_price;
						obj.number =  _this.number;
						obj.subtotal =  _this.toDecimal2(_this.number * _this.market_price);
						obj.checked =  false;
						this.cartList.push(obj);
					}else{
						_this.cartList.forEach(function(item,index){
							if(item.id == _this.goods_id){
								_this.nowIndex = index
							}
						})
						console.log(_this.nowIndex)
						console.log(_this.cartList[_this.nowIndex].number)
						_this.cartList[_this.nowIndex].number = _this.cartList[_this.nowIndex].number+_this.number
					}
				}else{
					obj.id = _this.goods_id;
					obj.imgSrc = _this.original_img;
					obj.title = _this.goods_name;
					obj.price = _this.market_price;
					obj.number =  _this.number;
					obj.subtotal =  _this.toDecimal2(_this.number * _this.market_price);
					obj.checked =  false;
					this.cartList.push(obj);
				}
				func.cartList.set(_this.cartList);
				_this.$router.push({name:'addSuccess',params:{goods_id:_this.goods_id}})
			},
			toDecimal2:function (x) {    
		        var f = parseFloat(x);    
		        if (isNaN(f)) {    
		            return false;    
		        }    
		        var f = Math.round(x*100)/100;    
		        var s = f.toString();    
		        var rs = s.indexOf('.');    
		        if (rs < 0) {    
		            rs = s.length;    
		            s += '.';    
		        }    
		        while (s.length <= rs + 2) {    
		            s += '0';    
		        }    
		        return s;    
		    }    
        },
        components:{
           nFooter
        },
        mounted:function(){
        	this.$nextTick(function(){
        		this.productView();
        	})
        },
        filters:{
        	unescape (html) {
			    return html
			      .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
			      .replace(/&lt;/g, "<")
			      .replace(/&gt;/g, ">")
			      .replace(/&quot;/g, "\"")
			      .replace(/&#39;/g, "\'");
			}
        }
    }
</script>
