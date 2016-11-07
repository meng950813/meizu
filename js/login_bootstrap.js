var validate = document.getElementById('validate');
var vali_box = document.getElementById("vali-box");

// 设置 验证码 canvas 的宽度
function setCanvasWidth(){
	// 获取input 宽度
	var input_width = getComputedStyle(vali_box).width;
	var input_height = getComputedStyle(vali_box).height;
	
	// 去掉 最后的 px ,转为整型
	input_width = parseInt(input_width.slice(0, input_width.length-2));
	input_height = parseInt(input_height.slice(0, input_height.length-2));

	if (validate.width != input_width) {
		// 设置 canvas 宽高与input宽高相同
		validate.width = input_width;
		validate.height = input_height;
		return true;
	}
	return false;
}
setCanvasWidth();

window.onresize = function(){
	if(setCanvasWidth()){
		drawValidate.init(validate);
	}
	drawBg.setWidth();
}
// 绘制验证码
drawValidate.init(validate);

/* 提交 */
$("#sub").on("click",function(event) {
	event.preventDefault();
	
	// 用户名为空   
	if ($("#username").val() == '') {
		showTips($("#username","用户名不能为空"));
		return;
	}
	// 用户名中有 特殊字符
	else if( preventSql( $("#username").val() ) ){
		showTips($("#username","用户名不能包含特殊字符"));
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
		url: '/path/to/file',
		type: 'post',
		data: loginInfo,
		success:function(result){
			if ($result) {
				// TODO
				/* 设置七天内免登录 */
			}
			else{
				showTips($("#username"),"用户名/密码错误");
			}
		},
		error:function() {
			showTips($("#username","服务器异常,请稍后重试"));			
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