class Xq{
	constructor(options){
		this.url = options.url;
		this.init()
		
	}
	init(){
		let that = this;
		$.ajax({
			url:this.url,
			success:function(res){
				that.res = res
				that.getCookie()
				that.display()
			}
		});
		
	}
	getCookie(){
		this.goods = JSON.parse(localStorage.getItem("shangpin"))
	}
	display(){
		var str = ""
//		for(){
//			
//		}
	}
}

//new Xq({
//	url:"http://localhost/shop/public/one.json",
//
//})

class Fangda{
	constructor(options){
		this.xiao = options.xiao;
		this.da = options.da;
		this.ospan = options.ospan;
		this.sbox = options.sbox;
		this.bbox = options.bbox;
		this.main = options.main;
		this.oul = options.oul;
		this.init()
	}
	init(){
		var that = this;
		this.sbox.mouseover(function(){
			that.show()
		})
		this.sbox.mouseout(function(){
			that.hide()
		})
		this.sbox.mousemove(function(eve){
			var e = eve || window.event;
			that.move(e)
		})
		this.oul.on("click","li",function(event){
			var target = event.target
			that.id = target.parentNode.getAttribute("index")
			that.index(that.id)
		})
	}
	index(i){
		switch(i){
			case "0": 
					this.xiao[0].src = "http://img16.hqbcdn.com/product/1c/47/1c470fff82183af026bed571d122ecd7.340.png"
					this.da[0].src = "http://img16.hqbcdn.com/product/1c/47/1c470fff82183af026bed571d122ecd7.340.png"
			break;
			case "1": 
					this.xiao[0].src = "http://img5.hqbcdn.com/product/77/0e/770e886f3fcfe0d77a6368d2137ccb0d.340.png"
					this.da[0].src = "http://img5.hqbcdn.com/product/77/0e/770e886f3fcfe0d77a6368d2137ccb0d.340.png"
			break;
			case "2": 
					this.xiao[0].src = "http://img1.hqbcdn.com/product/8d/eb/8deb7250e28ac0dcbcd83c234c9f2f64.340.png"
					this.da[0].src = "http://img1.hqbcdn.com/product/8d/eb/8deb7250e28ac0dcbcd83c234c9f2f64.340.png"
			break;
			case "3": 
					this.xiao[0].src = "http://img8.hqbcdn.com/product/ca/20/ca20ffa494e451ccd9f9b01c6b17c486.340.png"
					this.da[0].src = "http://img8.hqbcdn.com/product/ca/20/ca20ffa494e451ccd9f9b01c6b17c486.340.png"
			break;
		}
	}
	show(){
		this.bbox[0].style.display = "block";
		this.ospan[0].style.display = "block";
	}
	hide(){
		this.bbox[0].style.display = "none";
		this.ospan[0].style.display = "none";
	}
	move(e){
//		console.log(e.pageX - this.main[0].offsetLeft)
		var l = e.pageX - this.main[0].offsetLeft - this.sbox[0].offsetLeft - this.ospan[0].offsetWidth/2;
		var t = e.pageY - this.main[0].offsetTop - this.sbox[0].offsetTop - this.ospan[0].offsetHeight/2;
		if(l<0) l=0
		if(t<0) t=0
		if(l>this.sbox[0].offsetWidth - this.ospan[0].offsetWidth){
			l = this.sbox[0].offsetWidth - this.ospan[0].offsetWidth
		}
		if(t>this.sbox[0].offsetHeight - this.ospan[0].offsetHeight){
			t=this.sbox[0].offsetHeight - this.ospan[0].offsetHeight
		}
		this.ospan[0].style.left = l + "px"
		this.ospan[0].style.top = t + "px"
		var x = l/(this.sbox[0].offsetWidth - this.ospan[0].offsetWidth);
		var y = t/(this.sbox[0].offsetHeight - this.ospan[0].offsetHeight)
		this.da[0].style.left = x*(this.bbox[0].offsetWidth - this.da[0].offsetWidth) + "px"
		this.da[0].style.top = y*(this.bbox[0].offsetHeight - this.da[0].offsetHeight) + "px"
	}
	
}
new Fangda({
	xiao:$(".main-l-1").children(".sbox").children("img"),
	da:$(".main-l-1").children(".bbox").children("img"),
	ospan:$(".main-l-1").children(".sbox").children("span"),
	sbox:$(".main-l-1").children(".sbox"),
	bbox:$(".main-l-1").children(".bbox"),
	main:$(".main-l-1"),
	oul:$(".main-l-1").children(".c").children("ul")
})
