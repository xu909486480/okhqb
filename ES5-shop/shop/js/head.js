"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//图片懒加载
onscroll = function onscroll() {
	new Ljz({
		aimg: document.querySelectorAll("img"),
		clientH: document.documentElement.clientHeight,
		scrollT: document.documentElement.scrollTop
	});
};

var Ljz = function Ljz(options) {
	_classCallCheck(this, Ljz);

	this.aimg = options.aimg;
	this.clientH = options.clientH;
	this.scrollT = options.scrollT;
	for (var i = 0; i < this.aimg.length; i++) {
		if (this.aimg[i].src != "") continue;
		if (this.aimg[i].offsetTop < this.clientH + this.scrollT) {
			this.aimg[i].src = this.aimg[i].getAttribute("data-src");
		}
	}
};

var Cookie = function () {
	function Cookie(options) {
		_classCallCheck(this, Cookie);

		this.info1 = options.info1;
		this.info2 = options.info2;
		this.logout = options.loginout;
		this.init();
		this.addEvent();
	}

	_createClass(Cookie, [{
		key: "init",
		value: function init() {
			this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
			for (var i = 0; i < this.user.length; i++) {
				if (this.user[i].onoff == 1) {
					this.info1[0].style.display = "none";
					this.info2[0].style.display = "block";
					this.info2.innerHTML = this.user[i].u;
					this.name = this.user[i].u;
					return;
				}
			}
		}
	}, {
		key: "addEvent",
		value: function addEvent() {
			var _this = this;

			this.logout.click(function () {
				for (var i = 0; i < _this.user.length; i++) {
					if (_this.name == _this.user[i].u) {
						_this.user[i].onoff = 0;
						_this.info1[0].style.display = "block";
						_this.info2[0].style.display = "none";
						localStorage.setItem("user", JSON.stringify(_this.user));
						return;
					}
				}
			});
		}
	}]);

	return Cookie;
}();
//判断会员用户名


var Index = function () {
	function Index(options) {
		_classCallCheck(this, Index);

		this.ospan = options.ospan;
		this.oi = options.oi;
		this.ob = options.ob;
		this.oul = options.oul;
		this.init();
		this.addEvent();
	}

	_createClass(Index, [{
		key: "addEvent",
		value: function addEvent() {
			var that = this;
			this.oi.click(function () {
				for (var i = 0; i < that.user.length; i++) {
					if (that.name == that.user[i].u) {
						that.oul.css("display", "block");
						that.ob.css("display", "none");
						localStorage.setItem("user", JSON.stringify(that.user));
						return;
					}
				}
			});
		}
	}, {
		key: "init",
		value: function init() {
			this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
			this.check();
		}
	}, {
		key: "check",
		value: function check() {
			for (var i = 0; i < this.user.length; i++) {
				if (this.user[i].onoff == 1) {
					this.oul[0].display = "none";
					this.ob[0].display = "block";
					this.ospan[0].innerHTML = this.user[i].u;
					this.name = this.user[i].u;
					return;
				}
			}
		}
	}]);

	return Index;
}();

new Index({
	ospan: $(".top-c").children("span"),
	oi: $(".top-c").children("i"),
	ob: $(".top-c"),
	oul: $(".top-l")
});
//头部的JS------------------------------------------
new Cookie({
	info1: $(".top-l"),
	info2: $(".top-c"),
	loginout: $(".top-c").children("i")
});

var Head = function () {
	function Head(options) {
		_classCallCheck(this, Head);

		this.oa = options.oa;
		this.odd = options.odd;

		this.top();
		this.nav();
	}

	_createClass(Head, [{
		key: "top",
		value: function top() {
			this.oa.mouseover(function () {
				$(".top-r").children("ul").children("li").children("div").eq($(this).index()).css({ display: "block" });
			});
			this.oa.mouseout(function () {
				$(".top-r").children("ul").children("li").children("div").eq($(this).index()).css({ display: "none" });
			});
		}
	}, {
		key: "nav",
		value: function nav() {
			this.odd.mouseover(function () {
				$(this).children("div").css({ display: "block" });
			});
			this.odd.mouseout(function () {
				$(this).children("div").css({ display: "none" });
			});
		}
	}]);

	return Head;
}();

new Head({
	oa: $(".top-r").children("ul").children("li"),
	odd: $(".banner-l").children("dl").children("dd")
});

//商城搜索框------------------------------------------

var Search = function () {
	function Search(options) {
		_classCallCheck(this, Search);

		this.url = options.url;
		this.txt = options.txt;
		this.oul = options.oul;
		this.oli = options.oli;
		this.init();
	}

	_createClass(Search, [{
		key: "init",
		value: function init() {
			var that = this;
			this.txt[0].oninput = function () {
				that.value = this.value;
				that.search();
			};
			this.txt.click(function () {
				//			var e = eve || window.event;
				//			var code = e.keyCode || e.which;
				that.oul[0].style.display = "block";
			});

			this.txt.blur(function () {
				that.oul[0].style.display = "none";
			});
		}
	}, {
		key: "search",
		value: function search() {
			var that = this;
			$.ajax({
				url: this.url,
				data: {
					wd: this.value
				},
				success: function success(res) {
					that.res = res;
					that.display();
				},
				dataType: "jsonp",
				jsonp: "cb"
			});
		}
	}, {
		key: "display",
		value: function display() {
			//		console.log(this.res.s)
			var str = "";
			for (var i = 0; i < this.res.s.length; i++) {
				str += "<li><a href=\"#\">" + this.res.s[i] + "</a></li>";
			}
			this.oul[0].innerHTML = str;
		}
	}]);

	return Search;
}();

new Search({
	url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
	txt: $(".header-c2").children(".t").children(".txt1"),
	oul: $(".header-c2").children(".t").children(".list"),
	oli: $(".header-c2").children(".t").children(".list").children("li")
});

//banner图JS------------------------------------------

var Banner = function () {
	function Banner(options) {
		_classCallCheck(this, Banner);

		this.img = options.img;
		this.index = options.index || 0;
		this.left = options.left;
		this.right = options.right;
		this.iprev = this.img.length - 1;
		this.oli = options.oli;
		this.init();
		this.play();
		this.autoplay();
	}

	_createClass(Banner, [{
		key: "init",
		value: function init() {
			var that = this;
			this.left.click(function () {
				that.change("l");
			});
			this.right.click(function () {
				that.change("r");
			});
		}
	}, {
		key: "change",
		value: function change(type) {
			if (type == "l") {
				if (this.index == 0) {
					this.index = this.img.length - 1;
					this.iprev = 0;
				} else {
					this.index--;
					this.iprev = this.index + 1;
				}
				this.move(1);
			} else {
				if (this.index == this.img.length - 1) {
					this.index = 0;
					this.iprev = this.img.length - 1;
				} else {
					this.index++;
					this.iprev = this.index - 1;
				}
				this.move(-1);
			}
		}
		//点击左右剪头移动banner图------------------------------------------

	}, {
		key: "move",
		value: function move(type) {
			this.img.eq(this.iprev).css({ left: 0 }).stop().animate({ left: 1903 * type });
			this.img.eq(this.index).css({ left: -1903 * type }).stop().animate({ left: 0 });
		}
		//自动播放

	}, {
		key: "autoplay",
		value: function autoplay() {
			var _this2 = this;

			var that = this;
			var Timer = void 0;
			Timer = setInterval(function () {
				_this2.change("r");
			}, 2000);
			this.img.hover(function () {
				clearInterval(Timer);
			}, function () {
				Timer = setInterval(function () {
					that.change("r");
				}, 2000);
			});
		}
		//小圆点li------------------------------------------

	}, {
		key: "play",
		value: function play() {
			this.oli.click(function () {
				//			console.log($(this).index())
				if ($(this).index() > this.index) {
					move(1, this.index, $(this).index());
				}
				if ($(this).index() < this.index) {
					move(-1, this.index, $(this).index());
				}
				$(".small").children("li").eq(this.index).css({ background: "" }).end().eq($(this).index()).css({ background: "#fff" });
				this.index = $(this).index();
			});
		}

		//	let move = function(type,img,index){
		//              items.eq(img).css({
		//                  left:0
		//              }).stop().animate({
		//                  left:-items.eq(0).width() * type
		//              },moveTime).end().eq(index).css({
		//                  left:items.eq(0).width() * type
		//              }).stop().animate({
		//                  left:0
		//              },moveTime)
		//          }		
		//		var str = "";
		//		for(var i=0;i<this.img;i++){
		//			str += `<li>${i+1}<a href="#"></a></li>`
		//		}
		//      $(".banner-r").append($("<ul class='small'>").html(str));
		//		
		//		if($(this).index() > this.index){
		//          move(1,this.index,$(this).index())
		//     		}
		//      if($(this).index() < this.index){
		//          move(-1,this.index,$(this).index())
		//      	}
		//		this.oli.eq(this.index).css({background:""}).end().eq($(this).index()).css({background:"skyblue"})
		//              index = $(this).index();

	}]);

	return Banner;
}();

new Banner({
	img: $(".big").children("li"),
	left: $(".banner-c").children(".left"),
	right: $(".banner-c").children(".right"),
	index: 0,
	oli: $(".small").children("li")

});

//添加购物车------------------------------------------

var Shop = function () {
	function Shop(options) {
		_classCallCheck(this, Shop);

		this.url = options.url;
		this.url1 = options.url1;
		this.c3 = options.c3;
		this.main = options.main;
		this.addEvent();
		this.ajax();
	}

	_createClass(Shop, [{
		key: "ajax",
		value: function ajax() {
			var that = this;
			$.ajax({
				url: this.url,
				success: function success(res) {
					that.res = res;
					that.display();
				}
			});
			$.ajax({
				url: this.url1,
				success: function success(res) {
					that.res = res;
					that.display1();
				}
			});
		}
	}, {
		key: "display",
		value: function display() {
			//		console.log(this.res)
			var str = "";
			for (var i = 0; i < this.res.length; i++) {
				str += "<li index=\"" + this.res[i].goodsid + "\">\n\t\t\t\t\t\t<div class=\"img\">\n\t\t\t\t\t\t\t<a href=\"http://localhost/shop/car/car.html\"><img src=\"" + this.res[i].src + "\"></a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"msg\">\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<span>" + this.res[i].price + "</span>\n\t\t\t\t\t\t\t\t<s>" + this.res[i].xuni + "</s>\n\t\t\t\t\t\t\t\t<i class=\"set\">\u52A0\u5165\u8D2D\u7269\u8F66</i>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<a href=\"http://localhost/shop/car/car.html\">" + this.res[i].name + "</a>\n\t\t\t\t\t\t</div>\t\n\t\t\t\t\t</li>";
			}
			$(".main-t").children(".c3").children("ul").html(str);
		}
	}, {
		key: "display1",
		value: function display1() {
			var str = "";
			for (var i = 0; i < this.res.length; i++) {
				str += "<li index=\"" + this.res[i].goodsid + "\">\n\t\t\t\t\t\t<div class=\"t1\">\n\t\t\t\t\t\t\t<a href=\"#\"><img data-src=\"" + this.res[i].src + "\"></a>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<span>" + this.res[i].price + "</span>\n\t\t\t\t\t\t\t\t<s>" + this.res[i].xuni + "</s>\n\t\t\t\t\t\t\t\t<i class=\"set\">\u52A0\u5165\u8D2D\u7269\u8F66</i>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<b>" + this.res[i].name + "</b>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>";
			}
			this.main.html(str);
		}
	}, {
		key: "addEvent",
		value: function addEvent() {
			var that = this;
			this.c3.on("click", function (eve) {
				var e = eve || window.event;
				var target = e.target || e.srcElement;
				if (target.className == "set") {
					that.id = target.parentNode.parentNode.parentNode.getAttribute("index");
					that.setCookie();
				}
			});
		}
	}, {
		key: "setCookie",
		value: function setCookie() {
			this.goods = localStorage.getItem("shangpin");
			if (this.goods) {
				var onoff = true;
				this.goods = JSON.parse(localStorage.getItem("shangpin"));
				for (var i = 0; i < this.goods.length; i++) {
					if (this.goods[i].id == this.id) {
						this.goods[i].num++;
						onoff = false;
					}
				}
				if (onoff) {
					this.goods.push({
						id: this.id,
						num: 1
					});
				}
			} else {
				this.goods = [{
					id: this.id,
					num: 1
				}];
			}
			localStorage.setItem("shangpin", JSON.stringify(this.goods));
		}
	}]);

	return Shop;
}();

new Shop({
	url: "http://localhost/shop/public/one.json",
	url1: "http://localhost/shop/public/one1.json",
	c3: $(".main-t").children(".c3").children("ul"),
	main: $(".main-b-b").children("ul")
});

//回到顶部

var Back = function () {
	function Back(options) {
		_classCallCheck(this, Back);

		this.goback = options.goback;
		//		console.log(this.scrollT)
		this.init();
	}

	_createClass(Back, [{
		key: "init",
		value: function init() {
			this.goback.click(function () {
				$("html").stop().animate({
					scrollTop: 0
				});
			});
		}
	}]);

	return Back;
}();

new Back({
	goback: $(".side1").find(".r5")
});

//楼层移动效果

var Floor = function () {
	function Floor(options) {
		_classCallCheck(this, Floor);

		this.oli = options.oli;
		this.scrollT = options.scrollT;
		this.clientT = options.clientT;
		this.init();
	}

	_createClass(Floor, [{
		key: "init",
		value: function init() {
			var that = this;
			this.oli.click(function () {
				//			console.log($(this).index())
				switch ($(this).index()) {
					case 0:
						$("html").stop().animate({ scrollTop: 0 });
						$(this).css({ background: "#e10808" }).siblings().css({ background: "#fff" });
						$(this).children().css({ color: "#fff" }).parent().siblings().children().css({ color: "#666" });
						break;
					case 1:
						$("html").stop().animate({ scrollTop: 700 });
						$(this).css({ background: "#e10808" }).siblings().css({ background: "#fff" });
						$(this).children().css({ color: "#fff" }).parent().siblings().children().css({ color: "#666" });
						break;
					case 2:
						$("html").stop().animate({ scrollTop: 2044 });
						$(this).css({ background: "#e10808" }).siblings().css({ background: "#fff" });
						$(this).children().css({ color: "#fff" }).parent().siblings().children().css({ color: "#666" });
						break;
					case 4:
						$("html").stop().animate({ scrollTop: 0 });
					//					$("#link").find(".active").css({
					//						background:"#e10808"
					//					}).siblings().css({background:"#fff"})
					//					$("#link").find(".active").css({color:"#fff"})
					//					.parent().siblings().children().css({color:"#666"})
				}
			});
		}
	}]);

	return Floor;
}();

new Floor({
	oli: $("#link").children("ul").children("li"),
	scrollT: document.documentElement.scrollTop,
	clientT: document.documentElement.clientTop
});