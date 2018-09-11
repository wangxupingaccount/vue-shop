<template>
	<div>
		<div class="news-banner note" :style ="note"></div>
		<div class="page-title">
			<h1>数码资讯</h1>
			<h2>———&nbsp;&nbsp;&nbsp;&nbsp;Digital information&nbsp;&nbsp;&nbsp;&nbsp;———</h2>
		</div>
		<div class="news-list" id="news_list">
			<ul>
				<li v-for="(item,index) in dataList">

					<div class="time">
						<p>{{item.time | formatDate}}</p>
					</div>
					<div class="info">
						<router-link :to="{name:'newsDetail',params:{newsDetailId:item.id}}">{{item.title}}</router-link>
						<p class="text" v-html="item.describe2"></p>
					</div>
				</li>
			</ul>
		</div>
		<n-footer></n-footer>
	</div>
</template>
<script>
	import Vue from 'vue'
	import { bus } from '../assets/bus.js'
	import { formatDate } from '../js/date.js'
	import nFooter from '../components/pageFooter.vue';
	export default {
		data() {
			return {
				httpAddress:"http://www.qianduan88.com/api/vueShopApi/v1/",
				//httpAddress:"http://192.168.0.103:8089/v1/",
				msg: '新闻中心',
				dataList: "",
				_index: 1,
				note: {
		            backgroundImage: "url(" + require("../images/newsBanner.jpg") + ")",
		            backgroundRepeat: "no-repeat",
		            backgroundPosition:"center center",
		            backgroundSize: "cover"
	            }
			}
		},
		methods: {
			show: function() {
				console.log("domain");
			},
			newsView:function(){
				var _url = this.httpAddress + "home/getNewsList";
				var that = this;
				$.ajax({
					url: _url,
					type: 'POST',
					dataType: 'json',
					data: {
						page: 1,
						pageSize: 10
					},
				})
				.done(function(result) {
					if(result.code == 0) {
						that.dataList = result.data.dataList;
					}
				})
				.fail(function() {
					console.log("error");
				})
			}
		},
		components: {
			nFooter
		},
		mounted: function() {
			this.$nextTick(function(){
				this.newsView();
			})
//			bus.$off('tip')
//			bus.$on('tip', function(text) {
//				console.log(text)
//			})
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy/MM dd');
			}
		}
	}
</script>