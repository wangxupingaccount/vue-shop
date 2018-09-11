<template>
	<div>
		<div class="news-banner"></div>
		<div class="news-detail-box">
			<div class="news-detail-title" v-html="newsTitle"></div>
			<div class="news-infoWrap"></div>
			<div class="news-detail-content" v-html="newsContent"></div>
		</div>
		<n-footer></n-footer>
	</div>
</template>
<script>
	import * as func from '../store/function';
	import nFooter from '../components/pageFooter.vue';
	export default {
		data() {
			return {
				httpAddress:"http://www.qianduan88.com/api/vueShopApi/v1/",
				//httpAddress:"http://192.168.0.103:8089/v1/",
				newsTitle: "",
				newsContent: "",
				news_id:''
			}
		},
		props: [],
		methods: {
			newsDetailView: function() {
				var newsDetailId = this.$route.params.newsDetailId;
        		var newsId = func.newsId.get();
        		if(newsId==null || newsId==""){
        			func.newsId.set(newsDetailId);
        			this.news_id = func.newsId.get();
        		}else{
        			this.news_id = func.newsId.get();
        		}
				var _url = this.httpAddress + "home/getNewsDetailsData";
				var that = this;
				$.ajax({
					url: _url,
					type: 'POST',
					dataType: 'json',
					data: {
						id:this.news_id
					},
				})
				.done(function(result) {
					if(result.data.length > 0) {
						that.newsTitle = result.data[0].title;
						that.newsContent = result.data[0].describe;
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
			this.$nextTick(function() {
				this.newsDetailView();
			})
		}
	}
</script>