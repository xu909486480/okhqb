class Car{
	constructor(options){
		this.url = options.url;
		this.tbody = options.tbody;
		this.init()
		this.addEvent()
	}
	init(){
		var that = this;
		$.ajax({
			url:this.url,
			success:function(res){
				that.res = res
				that.getCookie()
//				console.log(that.res)
				that.display()
			}
		});
	}
	getCookie(){
		this.goods = JSON.parse(localStorage.getItem("shangpin"))
//		console.log(this.goods)
	}
	display(){
//		console.log(this.res)
		var str = "";
		for(var i=0;i<this.res.length;i++){
			for(var j=0;j<this.goods.length;j++){
				if(this.res[i].goodsid == this.goods[j].id){
		str += `<tr index="${this.res[i].goodsid}">
					<td>
						<div class="l">
							<input type="checkbox">
							<a href="#"><img src="${this.res[i].src}"></a>
							<p>
								<a href="#">${this.res[i].name}</a>
								<span>32G 金色</span>
							</p>
						</div>
					</td>
					<td>
						<div class="c1">
							<p>${this.res[i].price}</p>
							<a href="#">特价</a>
						</div>
					</td>
					<td>
						<div class="c2">
							<input type="number" value="${this.goods[j].num}" min="1"/>
						</div>
					</td>
					<td>
						<div class="c3">
							<span>${this.res[i].price}</span>
						</div>
					</td>
					<td>
						<div class="r">
							<img src="images/icon4.png" class="delete">
						</div>
					</td>
				</tr>`
				}
			}
		}
		this.tbody.html(str)
	}
	addEvent(){
		var that = this;
		this.tbody.on("click",".delete",function(event){
			var target = event.target
			if(target.className == "delete"){
				that.id = target.parentNode.parentNode.parentNode.getAttribute("index")
				target.parentNode.parentNode.parentNode.remove()
				that.removeCookie()
			}
		})
		this.tbody.on("input",function(event){
			var target = event.target;
			if(target.type == "number"){
				that.id = target.parentNode.parentNode.parentNode.getAttribute("index")
				that.num = target.value
				that.insertCookie()
			}
		})
	}
	insertCookie(){
		for(var i=0;i<this.goods.length;i++){
			if(this.goods[i].id == this.id){
				this.goods[i].num = this.num
				break;
			}
		}
		localStorage.setItem("shangpin",JSON.stringify(this.goods))
	}
	removeCookie(){
		for(var i=0;i<this.goods.length;i++){
			if(this.goods[i].id == this.id){
				this.goods.splice(i,1)
				break;
			}
		}
		localStorage.setItem("shangpin",JSON.stringify(this.goods))
	}
}
new Car({
	url:"http://localhost/shop/public/one.json",
	tbody:$(".tab").children("tbody")
})
