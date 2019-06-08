class Deside{
	constructor(options){
		this.sub = options.sub;
		this.tel = options.tel;
		this.yzm = options.yzm;
		this.telyzm = options.telyzm;
		this.pass = options.pass;
		this.pass2 = options.pass2;
		this.check = options.check;
		this.addEvent()
		this.init()
	}
	init(){
		
		var that = this;
		var tel=false;
		this.tel.blur(function(){
			var str1 = that.tel.val();
			var telreg = /1[3-9]\d{9}/;
			if(telreg.test(str1)){
				that.tel.next("em").html("符合")
				tel = true;
			}else{
				that.tel.next("em").html("请输入正确的手机号并验证")
				tel = false;
			}
		})
		var telyzm=false;
		this.telyzm.blur(function(){
			var str2 = that.telyzm.val()
			var telyzmreg = /^1[3-9]\d{9}$/
			if(telyzmreg.test(str2)){
				that.telyzm.siblings("em").html("符合")
				telyzm = true;
			}else{
				that.telyzm.siblings("em").html("请输入正确的手机号并验证")
				telyzm = false;
			}
		})
		var pass=false;
		this.pass.blur(function(){
			var str3 = that.pass.val()
			var passreg = /^.{6,16}$/
			if(passreg.test(str3)){
				that.pass.siblings("em").html("密码长度符合")
				pass = true;
			}else{
				that.pass.siblings("em").html("密码长度应为6-16个字符")
				pass = false;
			}
		})
		var pass2=false;
		this.pass2.blur(function(){
			if(that.pass.val() == that.pass2.val()){
				that.pass2.siblings("em").html("密码一致")
				pass2 = true;
			}else{
				that.pass2.siblings("em").html("密码不一致")
				pass2 = false;
			}
		})
		var check=false;
		this.check.click(function(){
			if(that.check[0].checked == true){
				check = true;
			}else{
				check = false;
			}
		})
		this.sub.click(function(){
			if(tel&telyzm&pass&pass2&check == true){
				that.getCookie()
			}else{
				alert("请填写正确信息")
			}
		})
	}
	getCookie(){
		this.user = localStorage.getItem("user")
		this.setCookie()
	}
	setCookie(){
		if(this.user == null){
			this.user = [{
				u:this.tel.val(),
				p:this.pass.val(),
				onoff:0
			}]
		}else{
			this.user = JSON.parse(localStorage.getItem("user"))
			for(var i=0;i<this.user.length;i++){
				if(this.user[i].u == this.tel.val()){
					alert("账户名重复")
					return;
				}
			}
			this.user.push({
				u:this.tel.val(),
				p:this.pass.val(),
				onoff:0
			})
		}
		localStorage.setItem("user",JSON.stringify(this.user))
		alert("注册成功，确认移动到登陆界面...")
		setInterval(()=>{
			location.href = "user.html"
		},300)
	}
	addEvent(){
		
	}
}



new Deside({
	sub:$(".nav-b").children(".l").children("li").children(".sub"),
	tel:$(".nav-b").children(".l").children("li").children(".txt1"),
	yzm:$(".nav-b").children(".l").children("li").children(".txt2"),
	telyzm:$(".nav-b").children(".l").children("li").children(".txt3"),
	pass:$(".nav-b").children(".l").children("li").children(".txt4"),
	pass2:$(".nav-b").children(".l").children("li").children(".txt5"),
	check:$(".nav-b").children(".l").children("li").children(".txt6"),
})


