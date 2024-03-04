
/**
 * 
 * @param {String} name  存储key值
 * @param {*} data 
 * @param {Number} seconds  过期时间
 */
export function setStorage(name, data, seconds) {
	const object = {};
	object.data = data;
	object.setTime = +new Date();
	object.seconds = seconds ? seconds : 0;
	uni.setStorageSync(name, JSON.stringify(object));
}
export function getStorage(name) {
	const _now = +new Date();
	const object = uni.getStorageSync(name)
	if (!object) return null
	try {
		const parseData = JSON.parse(object);
		if (parseData.seconds == 0) return parseData.data
		if (_now > parseData.setTime + parseData.seconds * 1000) {
			// 过期了
			uni.removeStorageSync(name)
			return null
		}
		return parseData.data;
	} catch (error) {
		return null;
	}
}
export function getType(params) {

	const type = {
		'[object Function]': 'function',
		'[object Object]': 'object',
		'[object Array]': 'array',
		'[object String]': 'string',
		'[object Number]': 'number',
		'[object Boolean]': 'boolean',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null'
	}
	return type[Object.prototype.toString.call(params)]
}

export function dateFormat(timestamp, fmt) {
	var date = new Date(timestamp);
	var o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};

	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}

	return fmt;
}


export function throttle(func, delay) {
	var delay = delay || 1000;
	var previousDate = new Date();
	var previous = previousDate.getTime();

	return function () {
		var context = this;
		var nowDate = new Date();
		var now = nowDate.getTime();
		if (now - previous >= delay) {
			func.call(context, arguments);
			previous = now;
		}
	}
}


export function debounce(func, delay) {
	var delay = delay || 1000;
	var timer = null;
	return function () {
		var context = this;
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		const args = arguments;
		timer = setTimeout(function () {
			func.call(context, args);
		}, delay);
	}
}





