setCanvasWidth.init();

window.onresize = function(){
	if(setCanvasWidth.setWidth()){
		drawValidate.init(validate);
	}
	drawBg.setWidth();
}
// 绘制验证码
drawValidate.init(validate);

/* 如果上次是记住密码，设置当前页面默认选中记住密码 */
if(localStorage.getItem("loginTime")){
	$("#remember").prop('checked', true);
}

/* 提交 */
$("#sub").on("click",function(event) {
	event.preventDefault();
	
	// 用户名为空   
	if ($("#username").val() == '') {
		showTips($("#username"),"用户名不能为空");
		return;
	}
	// 用户名中有 特殊字符
	else if( preventSql( $("#username").val() ) ){
		showTips($("#username"),"用户名不能包含特殊字符");
		return;
	}
	else{
		hideTips($("#username"));
	}
	// 密码为空
	if($("#pwd").val() == ''){
		showTips($("#pwd"));
		return;
	}
	else{
		hideTips($("#pwd"));
	}
	// 判断验证码
	if($("#vali-box").val().toLowerCase() == drawValidate.getValidate().toLowerCase()){
		hideTips($("#vali-box"));
		$("vali-box").html("");
	}
	// 验证码错误
	else{
		showTips($("#vali-box"));
		return;
	}

	// TODO 异步提交表单
	var loginInfo = $("#login-form").serialize();
	$.ajax({
		url: 'server/login.php',
		type: 'post',
		dataType: "json",
		data: loginInfo,
		success:function(result){
			// 登录成功
			if (result.status == "ok") {
				// 选中记住密码
				if($("#remember").prop('checked')){
					localStorage.setItem("userName",result.username);
					localStorage.setItem("uid",result.uid);
					localStorage.setItem("loginTime",new Date().getTime());
				}
				// 没有选中记住密码，销毁 localStorage 中的 loginTime
				else{
					if(localStorage.getItem("loginTime")){
						localStorage.removeItem("loginTime");
					}
				}
				sessionStorage.setItem("userName",result.username);
				sessionStorage.setItem("uid",result.uid);
				
				window.location.href = "index.html";
			}
			else{
				showTips($("#username"),"用户名/密码错误");
			}
		},
		error:function() {
			showTips($("#username"),"服务器异常,请稍后重试");			
		}
	});

});

function showTips($target,tip){
	$target.addClass('input-error').siblings('.tips').css({
		'opacity':'1',
		'animation':'show-tips 0.3s linear forwards'
	}).html(tip);
	setTimeout(function(){
		$target.siblings('.tips').css('animation','none');	
	},400);
}
function hideTips($target){
	$target.removeClass('input-error').siblings('.tips').css('opacity', '0');
}

/* 设置背景 canvas */
var login_bg = document.getElementById("login-bg");

var drawBg = {
	ctx: null, // canvas 画布
	width : 0, // 画布宽度
	height : 0,
	particles : [], // 用于保存点的数组
  allNum : 0, // 粒子总数量
  interval : 0, // 动画执行间隔
  timer : null,

	init : function(){
		clearInterval(this.timer);
		this.timer;

		this.setWidth();

		this.ctx = login_bg.getContext('2d');

		this.allNum = 200;
		if(this.width <= 720 ){
			this.interval = 1000/8;
		}
		else{
			this.interval = 1000/10;
		}

		for(var i = 0;i<this.allNum;i++){
			this.loop();
		}
		this.timer = setInterval(this.loop.bind(this),this.interval);
	},
	
	/* 设置背景宽高 */
	setWidth : function(){
		login_bg.width = document.body.clientWidth;
		login_bg.height = document.body.clientHeight;
		this.width = login_bg.width;
		this.height = login_bg.height;
	},

	loop:function(){
		this.ctx.fillStyle = "#f8f8ff";
		this.ctx.fillRect(0,0,this.width,this.height);
		
		var particle = new this.Particle(Math.random()*this.width, 10);
   	this.particles.push(particle); 

    for (i=0; i<this.particles.length; i++) {
      var particle = this.particles[i]; 
      particle.render(this.ctx); // 绘制数组中的每一个粒子
      // 更新数组中的每一个粒子的位置
      particle.update(); 
    }

    if (this.particles.length>this.allNum){//只保留500个粒子
      this.particles.shift();
    }
	},

	Particle : function(xPos,yPos){
		this.xPos = xPos;
	  this.yPos = yPos; 
	  this.yVel = 5;
	  this.radius = 8;

	  this.render = function(c){
		  c.strokeStyle = "#ddd";
		  var deg = Math.PI/3;
		  c.beginPath();
		  for(var i = 0; i< 3;i++){
		  	c.moveTo(this.xPos +(this.radius*Math.cos(i * deg)),this.yPos +(this.radius*Math.sin(i*deg)));
		  	c.lineTo(this.xPos +(this.radius*Math.cos(Math.PI+ i*deg )),this.yPos +(this.radius*Math.sin( Math.PI + i*deg ) ));	
		  }
		  c.stroke();
		}

		// 重置位置
	  this.update = function(){
	    this.yPos += this.yVel; 
	  }
	}
};
drawBg.init();