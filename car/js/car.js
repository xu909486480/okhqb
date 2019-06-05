class Fangda{
	constructor(options){
		this.xiao = options.xiao;
		this.da = options.da;
		this.ospan = options.ospan;
		this.sbox = options.sbox;
		this.bbox = options.bbox;
		this.main = options.main
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
//		this.xiao.hover(function(){
//			that.show()
//		},function(){
//			that.hide()
//		})
		this.sbox.mousemove(function(eve){
			var e = eve || window.event;
			that.move(e)
		})
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
		var l = e.offsetX - this.sbox[0].offsetLeft - this.ospan[0].offsetWidth/2
		var t = e.offsetY - this.sbox[0].offsetTop - this.ospan[0].offsetHeight/2
		
		this.ospan[0].style.left = l + "px"
		this.ospan[0].style.top = t + "px"
	}
	
}
new Fangda({
	xiao:$(".main-l-1").children(".sbox").children("img"),
	da:$(".main-l-1").children(".bbox").children("img"),
	ospan:$(".main-l-1").children(".sbox").children("span"),
	sbox:$(".main-l-1").children(".sbox"),
	bbox:$(".main-l-1").children(".bbox"),
	msg:$(".main-l-1")
})
