<template>
   <div class="reg-box">
   	    <index-banner></index-banner>
   	    <div class="reg-title">
			<span>会员注册</span>
		</div>
		<div class="H20"></div>
        <div class="reg-list">
            <div class="form-group">
            	<label for="" class="form-label W400"><span>帐号：</span></label>
            	<div class="form-item">
            		<input type="text" class="form-input W300" />
            	</div>
            </div>
            <div class="form-group">
            	<label for="" class="form-label W400"><span>密码：</span></label>
            	<div class="form-item">
            		<input type="text" class="form-input W300" />
            	</div>
            </div>
            <div class="form-group">
            	<label for="" class="form-label W400"><span>确认密码：</span></label>
            	<div class="form-item">
            		<input type="text" class="form-input W300" />
            	</div>
            </div>
            <div class="form-group">
            	<label for="" class="form-label W400"><span>邮箱：</span></label>
            	<div class="form-item">
            		<input type="text" class="form-input W300" />
            	</div>
            </div>
            <div class="form-group">
            	<label for="" class="form-label W400"><span>电话：</span></label>
            	<div class="form-item">
            		<input type="text" class="form-input W300" />
            	</div>
            </div>
            <div class="form-group">
            	<label for="" class="form-label W400"><span>留言：</span></label>
            	<div class="form-item">
            		<textarea name="" id=""  class="form-textarea W300" ></textarea>
            	</div>
            </div>
            <div class="form-group">
            	<label for="" class="form-label W400"><span></span></label>
            	<div class="form-item">
            		<button type="submit" class="form-btn">提交</button>
            	</div>
            </div>
            <div class="H10"></div>
        </div>
        <n-footer></n-footer>
   </div>
</template>
<script>
    import {bus} from '../assets/bus.js'
    import indexBanner from '../components/indexBanner.vue';
    import nFooter from '../components/pageFooter.vue';
    export default {
      data () {
        return {
        }
      },
      methods:{
         show:function() {
            console.log("domain");
         }
      },
      components:{
          indexBanner,nFooter
      },
      mounted:function(){
       
      }
   }
</script>
