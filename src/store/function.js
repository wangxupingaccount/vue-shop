const localEvent = function (item) {
    this.get = function () {
        return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : '';
    }
    this.set = function (obj) {
        localStorage.setItem(item, JSON.stringify(obj));
    }
    this.clear = function () {
        localStorage.removeItem(item);
    }
}
const sessionEvent = function (item) {
    this.get = function () {
        return sessionStorage.getItem(item) ? JSON.parse(sessionStorage.getItem(item)) : '';
    }
    this.set = function (obj) {
        sessionStorage.setItem(item, JSON.stringify(obj));
    }
    this.clear = function () {
        sessionStorage.removeItem(item);
    }
}
export const cartList = new localEvent('cartList');
export const cartGoodsList = new localEvent('cartGoodsList');
export const checkAllFlag = new localEvent('checkAllFlag');

export const checkLength = new localEvent('checkLength');
export const allTotal = new localEvent('allTotal');
export const allNumb = new localEvent('allNumb');

export const goodsId = new sessionEvent('goodsId');
export const newsId = new sessionEvent('newsId');
export const orderId = new sessionEvent('orderId');

export const orderSn = new sessionEvent('orderSn');
