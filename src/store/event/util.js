export default {
	install(Vue, options) {
		Vue.prototype.getData = function() {
			console.log('我是插件中的方法');
		}
		Vue.prototype.toDecimal2 = function(x) {
			var f = parseFloat(x);
			if(isNaN(f)) {
				return false;
			}
			var f = Math.round(x * 100) / 100;
			var s = f.toString();
			var rs = s.indexOf('.');
			if(rs < 0) {
				rs = s.length;
				s += '.';
			}
			while(s.length <= rs + 2) {
				s += '0';
			}
			return s;
		}
	}
}