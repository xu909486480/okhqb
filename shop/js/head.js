//图片懒加载
onscroll = function(){
	new Ljz({
		aimg:document.querySelectorAll("img"),
		clientH:document.documentElement.clientHeight,
		scrollT:document.documentElement.scrollTop
	})
}
class Ljz{
	constructor(options){
		this.aimg = options.aimg
		this.clientH = options.clientH
		this.scrollT = options.scrollT
		for(var i=0;i<this.aimg.length;i++){
			if(this.aimg[i].src != "") continue;
			if(this.aimg[i].offsetTop < this.clientH + this.scrollT){
				this.aimg[i].src = this.aimg[i].getAttribute("data-src")
			}
		}
	}
}
class Cookie{
	constructor(options){
		this.info1 = options.info1;
		this.info2 = options.info2;
		this.logout = options.loginout;
		this.init()
		this.addEvent()
	}
	init(){
		this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
		for(var i=0;i<this.user.length;i++){
			if(this.user[i].onoff == 1){
				this.info1[0].style.display = "none"
				this.info2[0].style.display = "block"
				this.info2.innerHTML = this.user[i].u
				this.name = this.user[i].u
				return;
			}
		}
	}
	addEvent(){
		this.logout.click(()=>{
			for(var i=0;i<this.user.length;i++){
				if(this.name == this.user[i].u){
					this.user[i].onoff = 0
					this.info1[0].style.display = "block";
					this.info2[0].style.display = "none";
					localStorage.setItem("user",JSON.stringify(this.user))
					return;
				}
			}
		})
	}
}

//头部的JS------------------------------------------
new Cookie({
	info1:$(".top-l"),
	info2:$(".top-c"),
	loginout:$(".top-c").children("i")
})

class Head{
		constructor(options){
			this.oa = options.oa;
			this.odd = options.odd;
			
			this.top()
			this.nav()
		}
		top(){
			this.oa.mouseover(function(){$(".top-r")
			.children("ul").children("li").children("div")
			.eq($(this).index()).css({display:"block"})})
			this.oa.mouseout(function(){$(".top-r").children("ul")
			.children("li").children("div").eq($(this).index())
			.css({display:"none"})})
		}
		nav(){
			this.odd.mouseover(function(){$(this).children("div").css({display:"block"})})
			this.odd.mouseout(function(){$(this).children("div").css({display:"none"})})
		}
	}
new Head({
		oa:$(".top-r").children("ul").children("li"),
		odd:$(".banner-l").children("dl").children("dd")
	})


//商城搜索框------------------------------------------
class Search{
	constructor(options){
		this.url = options.url;
		this.txt = options.txt;
		this.oul = options.oul;
		this.oli = options.oli;
		this.init()
	}
	init(){
		var that = this;
		this.txt[0].oninput = function(){
			that.value = this.value
			that.search()
			
		}
		this.txt.click(function(){
//			var e = eve || window.event;
//			var code = e.keyCode || e.which
//			console.log(code)
			that.oul[0].style.display = "block"
//			if(){
//				
//			}
		})
		this.txt.blur(function(){
			that.oul[0].style.display = "none"
		})
	}	
	search(){
		var that = this;
		$.ajax({
			url:this.url,
			data:{
				wd:this.value
			},
			success:function(res){
				that.res = res;
				that.display();
			},
			dataType:"jsonp",
			jsonp:"cb"
		});
	}
	display(){
//		console.log(this.res.s)
		var str = "";
		for(var i=0;i<this.res.s.length;i++){
			str += `<li><a href="#">${this.res.s[i]}</a></li>`
		}
		this.oul[0].innerHTML = str;
	}
	
}

new Search({
	url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
	txt:$(".header-c2").children(".t").children(".txt1"),
	oul:$(".header-c2").children(".t").children(".list"),
	oli:$(".header-c2").children(".t").children(".list").children("li")
})


//banner图JS------------------------------------------
class Banner{
	constructor(options){
		this.img = options.img;
		this.index = options.index || 0;
		this.left = options.left;
		this.right = options.right;
		this.iprev = this.img.length-1;
		this.oli = options.oli;
		this.init()
		this.play()
		this.autoplay()
	}
	init(){
		var that = this;
		this.left.click(function(){
			that.change("l")
		})
		this.right.click(function(){
			that.change("r")
		})
		
		
	}
	change(type){
		if(type == "l"){
			if(this.index == 0){
				this.index = this.img.length-1
				this.iprev = 0
			}else{
				this.index--
				this.iprev = this.index+1
			}
			this.move(1)
		}else{
			if(this.index == this.img.length-1){
				this.index = 0
				this.iprev = this.img.length-1
			}else{
				this.index++
				this.iprev = this.index-1
			}
			this.move(-1)
		}
	}
	//点击左右剪头移动banner图------------------------------------------
	move(type){
		this.img.eq(this.iprev).css({left:0})
		.stop().animate({left:1903*type})
		this.img.eq(this.index).css({left:-1903*type})
		.stop().animate({left:0})
	}
	//自动播放
	autoplay(){
		var that = this;
		let Timer;
		Timer = setInterval(()=>{
			this.change("r")
		},2000)
		this.img.hover(function(){
			clearInterval(Timer)
		},function(){
			Timer = setInterval(()=>{
				that.change("r")
			},2000)
		})
	}
	//小圆点li------------------------------------------
	play(){
		this.oli.click(function(){
//			console.log($(this).index())
		if($(this).index() > this.index){
            move(1,this.index,$(this).index())
       	}
        if($(this).index() < this.index){
            move(-1,this.index,$(this).index())
        	}
		$(".small").children("li").eq(this.index).css({background:""}).end().eq($(this).index()).css({background:"#fff"})
                this.index = $(this).index();
		})
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
	
}
	new Banner({
		img:$(".big").children("li"),
		left:$(".banner-c").children(".left"),
		right:$(".banner-c").children(".right"),
		index:0,
		oli:$(".small").children("li")
		
	})

//添加购物车------------------------------------------
class Shop{
	constructor(options){
		this.url = options.url;
		this.c3 = options.c3;
		this.addEvent()
		this.ajax()
	}
	ajax(){
		var that = this;
		$.ajax({
			url:this.url,
			success:function(res){
				that.res = res;
				that.display()
			}
		});
	}
	display(){
//		console.log(this.res)
		var str = "";
		for(var i=0;i<this.res.length;i++){
			str += `<li index="${this.res[i].goodsid}">
						<div class="img">
							<a href="http://localhost/shop/car/car.html"><img src="${this.res[i].src}"></a>
						</div>
						<div class="msg">
							<p>
								<span>${this.res[i].price}</span>
								<s>${this.res[i].xuni}</s>
								<i class="set">加入购物车</i>
							</p>
							<a href="http://localhost/shop/car/car.html">${this.res[i].name}</a>
						</div>	
					</li>`
		}
//		$(".main-t").children(".c3").append("<ul>")
		$(".main-t").children(".c3").children("ul").html(str)
	}
	addEvent(){
		var that = this;
		this.c3.on("click",function(eve){
			var e = eve || window.event;
			var target = e.target || e.srcElement;
			if(target.className == "set"){
				that.id = target.parentNode.parentNode.parentNode.getAttribute("index")
				that.setCookie()
			}
		})
	}
	setCookie(){
		this.goods = localStorage.getItem("shangpin");
		if(this.goods){
			var onoff = true;
			this.goods = JSON.parse(localStorage.getItem("shangpin"))
			for(var i=0;i<this.goods.length;i++){
				if(this.goods[i].id == this.id){
					this.goods[i].num++
					onoff = false;
				}
			}
			if(onoff){
				this.goods.push({
					id:this.id,
					num:1
				})
			}
		}else{
			this.goods = [{
				id:this.id,
				num:1
			}]
		}
		localStorage.setItem("shangpin",JSON.stringify(this.goods))
	}
}
new Shop({
	url:"http://localhost/shop/public/one.json",
	c3:$(".main-t").children(".c3").children("ul")
})
	
//回到顶部
class Back{
	constructor(options){
		this.goback = options.goback
//		console.log(this.scrollT)
		this.init()
	}
	init(){
		this.goback.click(function(){
			$("html").stop().animate({
				scrollTop:0
			})
		})
	}
}
new Back({
	goback:$(".side1").find(".r5"),
})

//楼层移动效果
class Floor{
	constructor(options){
		this.oli = options.oli;
		this.scrollT = options.scrollT
		this.clientT = options.clientT
//		console.log($("#link").find(".active"))
		this.init()
//		console.log(this.scrollT)
//		console.log(this.clientT)
	}
	init(){
		var that = this;
		this.oli.click(function(){
//			console.log($(this).index())
			switch($(this).index()){
				case 0 : $("html").stop().animate({scrollTop:0})
					$(this).css({background:"#e10808"})
					.siblings().css({background:"#fff"})
					$(this).children().css({color:"#fff"})
					.parent().siblings().children().css({color:"#666"})
				break;
				case 1 : $("html").stop().animate({scrollTop:700})
					$(this).css({background:"#e10808"})
					.siblings().css({background:"#fff"})
					$(this).children().css({color:"#fff"})
					.parent().siblings().children().css({color:"#666"})
				break;
				case 2 : $("html").stop().animate({scrollTop:2044})
					$(this).css({background:"#e10808"})
					.siblings().css({background:"#fff"})
					$(this).children().css({color:"#fff"})
					.parent().siblings().children().css({color:"#666"})
				break;
				case 4 : $("html").stop().animate({scrollTop:0})
//					$("#link").find(".active").css({
//						background:"#e10808"
//					}).siblings().css({background:"#fff"})
//					$("#link").find(".active").css({color:"#fff"})
//					.parent().siblings().children().css({color:"#666"})
			}
		})

	}
}

new Floor({
	oli:$("#link").children("ul").children("li"),
	scrollT:document.documentElement.scrollTop,
	clientT:document.documentElement.clientTop
})

