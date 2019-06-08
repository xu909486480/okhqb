"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Car = function () {
	function Car(options) {
		_classCallCheck(this, Car);

		this.url = options.url;
		this.url1 = options.url1;
		this.tbody = options.tbody;
		this.os = options.os;
		this.init();
		this.addEvent();
	}

	_createClass(Car, [{
		key: "init",
		value: function init() {
			var that = this;
			$.ajax({
				url: this.url,
				success: function success(res) {
					that.res = res;
					that.getCookie();
					that.display();
					that.addset();
				}
			});
		}
	}, {
		key: "getCookie",
		value: function getCookie() {
			this.goods = localStorage.getItem("shangpin") ? JSON.parse(localStorage.getItem("shangpin")) : [];
			//		this.goods = JSON.parse(localStorage.getItem("shangpin"))
		}
	}, {
		key: "display",
		value: function display() {
			var str = "";
			for (var i = 0; i < this.res.length; i++) {
				for (var j = 0; j < this.goods.length; j++) {
					if (this.res[i].goodsid == this.goods[j].id) {
						str += "<tr index=\"" + this.res[i].goodsid + "\">\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"l\">\n\t\t\t\t\t\t\t<input type=\"checkbox\">\n\t\t\t\t\t\t\t<a href=\"#\"><img data-src=\"" + this.res[i].src + "\"></a>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<a href=\"#\">" + this.res[i].name + "</a>\n\t\t\t\t\t\t\t\t<span>32G \u91D1\u8272</span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"c1\">\n\t\t\t\t\t\t\t<p>" + this.res[i].price + "</p>\n\t\t\t\t\t\t\t<a href=\"#\">\u7279\u4EF7</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"c2\">\n\t\t\t\t\t\t\t<input type=\"number\" value=\"" + this.goods[j].num + "\" min=\"1\"/>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"c3\">\n\t\t\t\t\t\t\t<span>" + this.res[i].price + "</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"r\">\n\t\t\t\t\t\t\t<img src=\"images/icon4.png\" class=\"delete\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>";
					}
				}
			}
			this.tbody.html(str);
		}
	}, {
		key: "display",
		value: function display() {
			var str = "";
			for (var i = 0; i < this.res.length; i++) {
				for (var j = 0; j < this.goods.length; j++) {
					if (this.res[i].goodsid == this.goods[j].id) {
						str += "<tr index=\"" + this.res[i].goodsid + "\">\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"l\">\n\t\t\t\t\t\t\t<input type=\"checkbox\">\n\t\t\t\t\t\t\t<a href=\"#\"><img src=\"" + this.res[i].src + "\"></a>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<a href=\"#\">" + this.res[i].name + "</a>\n\t\t\t\t\t\t\t\t<span>32G \u91D1\u8272</span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"c1\">\n\t\t\t\t\t\t\t<p>" + this.res[i].price + "</p>\n\t\t\t\t\t\t\t<a href=\"#\">\u7279\u4EF7</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"c2\">\n\t\t\t\t\t\t\t<input type=\"number\" value=\"" + this.goods[j].num + "\" min=\"1\"/>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"c3\">\n\t\t\t\t\t\t\t<span>" + this.res[i].price + "</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"r\">\n\t\t\t\t\t\t\t<img src=\"images/icon4.png\" class=\"delete\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>";
					}
				}
			}
			this.tbody.html(str);
		}
	}, {
		key: "addEvent",
		value: function addEvent() {
			var that = this;
			this.tbody.on("click", ".delete", function (event) {
				var target = event.target;
				if (target.className == "delete") {
					that.id = target.parentNode.parentNode.parentNode.getAttribute("index");
					target.parentNode.parentNode.parentNode.remove();
					that.removeCookie();
				}
			});
			this.tbody.on("input", function (event) {
				var target = event.target;
				if (target.type == "number") {
					that.id = target.parentNode.parentNode.parentNode.getAttribute("index");
					that.num = target.value;
					that.insertCookie();
				}
			});
		}
	}, {
		key: "insertCookie",
		value: function insertCookie() {
			for (var i = 0; i < this.goods.length; i++) {
				if (this.goods[i].id == this.id) {
					this.goods[i].num = this.num;
					break;
				}
			}
			localStorage.setItem("shangpin", JSON.stringify(this.goods));
		}
	}, {
		key: "removeCookie",
		value: function removeCookie() {
			for (var i = 0; i < this.goods.length; i++) {
				if (this.goods[i].id == this.id) {
					this.goods.splice(i, 1);
					break;
				}
			}
			localStorage.setItem("shangpin", JSON.stringify(this.goods));
		}
	}, {
		key: "addset",
		value: function addset() {
			var num = 0;
			for (var i = 0; i < this.goods.length; i++) {
				num += parseInt(this.goods[i].num);
			}
			this.os[0].innerHTML = num;
		}
	}]);

	return Car;
}();

new Car({
	url: "http://localhost/shop/public/one.json",
	url1: "http://localhost/shop/public/one1.json",
	tbody: $(".tab").children("tbody"),
	os: $(".main-c2").children("span").children("s")
});