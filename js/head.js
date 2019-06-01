class Head{
		constructor(options){
			this.oa = options.oa;
			this.odd = options.odd;
			
			this.top()
			this.nav()
		}
		top(){
			this.oa.mouseover(function(){$(".top-r").children("ul").children("li").children("div").eq($(this).index()).css({display:"block"})})
			this.oa.mouseout(function(){$(".top-r").children("ul").children("li").children("div").eq($(this).index()).css({display:"none"})})
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
//头部的JS
//banner图JS
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
	play(){
		this.oli.click(function(){
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
//		let move = function(direct,iPrev,iNow){
//              items.eq(iPrev).css({
//                  left:0
//              }).stop().animate({
//                  left:-items.eq(0).width() * direct
//              },moveTime).end().eq(iNow).css({
//                  left:items.eq(0).width() * direct
//              }).stop().animate({
//                  left:0
//              },moveTime)
//          }
//		var str = "";
//		for(var i=0;i<this.img;i++){
//			str += `<li>${i+1}<a href="#"></a></li>`
//		}
//      $(".banner-r").append($("<ul class='small'>").html(str));
		
	move(type){
		this.img.eq(this.iprev).css({left:0})
		.stop().animate({left:1903*type})
		this.img.eq(this.index).css({left:-1903*type})
		.stop().animate({left:0})
	}
//		if($(this).index() > this.index){
//          move(1,this.index,$(this).index())
//     		}
//      if($(this).index() < this.index){
//          move(-1,this.index,$(this).index())
//      	}
//		this.oli.eq(this.index).css({background:""}).end().eq($(this).index()).css({background:"skyblue"})

                // L7.点击移动之后，将点击的设置成下一次的当前
//              index = $(this).index();
	
}
	
	new Banner({
		img:$(".big").children("li"),
		left:$(".banner-c").children(".left"),
		right:$(".banner-c").children(".right"),
		index:0,
		oli:$(".small").children("li")
		
	})
	
class Shop{
	constructor(options){
		this.url = options.url;
		
		
		
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
		var str = "";
		for(var i=0;i<this.res.length;i++){
			str += `<li>
						<div class="img">
							<a href="#"><img src="${this.res[i].src}"></a>
						</div>
						<div class="msg">
							<p>
								<span>${this.res[i].price}</span>
								<s>${this.res[i].xuni}</s>
							</p>
							<a href="#">${this.res[i].name}</a>
						</div>	
					</li>`
		}
		$(".main-t").children(".c3").append("<ul>")
		$(".main-t").children(".c3").children("ul").html(str)
	}
	
	
	
	
}
new Shop({
	url:"http://localhost/shop/php/one.json",
	
})
	
	

