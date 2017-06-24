/**
 * 缓动框架
 * @param {Object} ele
 * @param {JSON} json
 * @param {Function} fn
 */
function animate(ele, json, fn) {
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		var bool = true;
		for(var k in json) {
			if(k === "z-index") {
				ele.style.zIndex = json[k];
			} else if(k === "opacity") {
				if(getStyle(ele, k) * 10 === 0) {
					var leader = 0;
				} else {
					var leader = parseInt(getStyle(ele, k) * 10) || 10;
				}
				var step = (parseInt(json[k] * 10) - leader) / 20;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				leader = leader + step;
				ele.style[k] = leader / 10;
				ele.style.filter = "alpha(opacity=" + leader * 10 + ")";
				if(parseInt(json[k] * 10) !== leader) {
					bool = false;
				}
			} else {
				var leader = parseInt(getStyle(ele, k)) || 0;
				var step = (json[k] - leader) / 10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				leader = leader + step;
				ele.style[k] = leader + "px";
				if (Math.abs(json[k] - leader) <= Math.abs(step)) {
					ele.style[k] = json[k] + 'px';
				}
				if(json[k] !== leader) {
					bool = false;
				}
			}
		}
		if(bool) {
			clearInterval(ele.timer);
			if(fn) {
				fn();
			}
		}
	}, 20);
}

//封装一个方法
function getStyle(ele,attr){
    //判断:浏览器支持哪个方法或者属性;支持哪个调用哪个;
    if(window.getComputedStyle !== undefined){
        return window.getComputedStyle(ele,null)[attr];
    }else{
        return ele.currentStyle[attr];
    }
}

//封装的获取页面被卷去的部分;
function scroll(){
    return {
        top: window.pageYOffset || document.documentElement.scrollTop,
        left: window.pageXOffset || document.documentElement.scrollLeft
    }
}