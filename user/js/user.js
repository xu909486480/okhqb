class Login{
	constructor(options){
		this.use1 = options.user;
		this.pas1 = options.pass;
		this.check = options.check;
		this.sub = options.sub;
		this.btn = options.btn
		this.init()
//		this.updata()
	}
	init(){
		var that = this;
		this.sub.click(function(){
//			if(that.check[0].checked){
//				that.setCookie()	
//			}else{
//				that.removeCookie()
//			}
			that.getCookie()
		})
		this.btn.click(function(){
			location.href = "login.html"
		})
		
	}
	getCookie(){
		this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
		for(var i=0;i<this.user.length;i++){
			if(this.user[i].u == this.use1.val() && this.user[i].p == this.pas1.val()){
				this.user[i].onoff = 1;
				localStorage.setItem("user",JSON.stringify(this.user))
				location.href = "../shop.html"
				
				return;
			}
		}
		alert("账号密码不符")
	}
	setCookie(){
		this.user = {
			u:this.use1.val(),
			p:this.pas1.val(),
			onoff:0
		}
		localStorage.setItem("user",JSON.stringify(this.user))
	}
	
	removeCookie(){
		localStorage.removeItem("user")
	}
	updata(){
		this.user = JSON.parse(localStorage.getItem("user"))
		this.use1.val() = this.user.u;
		this.pas1.val() = this.user.p;
	}
}

new Login({
	user:$(".txt1"),
	pass:$(".pas1"),
	check:$(".check"),
	sub:$(".sub"),
	btn:$(".btn")
})
