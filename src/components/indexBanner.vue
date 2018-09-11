
<template>
	<div class="carousel-wrap" id="carousel">
		<transition-group tag="ul" class='slide-ul' name="list">
			<li v-for="(list,index) in slideList" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="go">
				<a :href="list.clickUrl" >
					<img :src="list.image"> 
					<!--:style="{ backgroundImage: 'url(' + list.image + ')' }"-->
				 </a>
			</li>
		</transition-group>
		<div class="carousel-items">
			<span v-for="(item,index) in slideList.length" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				slideList: [{
						clickUrl: "#",
						image: require("../images/banner2.jpg")
					},
					{
						clickUrl: "#",
						image: require("../images/banner1.jpg")
					}
				],
				currentIndex: 0,
				timer: ''
			}
		},
		props: [],
		mounted() {
            this.$nextTick(function(){
				this.autoPlay()
			})
		},
		methods: {
			go:function() {
				this.timer = setInterval(() => {
					this.autoPlay()
				}, 4000)
			},
			stop:function() {
				clearInterval(this.timer) 
				this.timer = null
			},
			change:function(index) {
				this.currentIndex = index
			},
			autoPlay:function() {
				this.currentIndex++
				if(this.currentIndex > this.slideList.length - 1) {
					this.currentIndex = 0
				}
			}
		}
	}
</script>