var register = {
	canSeePwd: false, // 标志密码是否可见
	badName : false,	// 标志用户名是否符合标准
	badPwd : false,// 
	badPhone : false,// 
	badEmail : false,// 
	seePwd:null,
	init:function(){

		// 设置用户名，密码框的 focus 事件
		$("#pwd,#pwd-show,#username").focus(function(event) {
			if($(this).siblings('.tips').css('opacity') == 0){
				$(this).siblings('.tips-show').show();
			}
		})
		.blur(function(event) {
			$(this).siblings('.tips-show').hide();
		});

		// 设置查看密码的响应事件
		this.seePwd();

		// 设置提交按钮响应事件
		$("#sub").on('click',function(event) {
			event.preventDefault();
			// 检查用户名
			this.checkName();
			if (this.badName) {return;}
			// 检查密码是否符合标准
			this.checkPwd();
			if(this.badPwd){return;}
			// 检查手机号是否符合标准
			this.checkPhone();
			if (this.badPhone) {return;}
			// 检查邮箱是否符合标准
			this.checkEmail();
			if(this.badEmail){return;}

			// 没有问题，异步提交
			// TODO
			// 
		}.bind(this));
	},

	/* 检测用户名是否符合标准 */
	checkName : function(){
		var username = $("#username").val();
		// TODO　允许输入中文
		var name_reg = new RegExp("^[a-zA-Z0-9_]{4,16}$");
		if(name_reg.test(username)){
			// TODO  ajax 请求 。。。
			
			// 如果当前有红色警告
			if (this.badName) {
				this.hideTips($("#username"));
				this.badName = false;
			}
		}
		else{
			this.badName = true;
			this.showTips($("#username"),"用户名不符合标准");
		}
	},

	// 判断密码是否符合标准
	checkPwd : function(){
		var pwd_reg = new RegExp("^[a-zA-Z0-9_]{6,24}$");
		// 判断当前是否处于密码可见状态，以决定从哪里获取密码
		var input_pwd = this.canSeePwd?$("#pwd-show").val():$("#pwd").val();
		if (pwd_reg.test(input_pwd) ) {
			if (this.badPwd) {
				this.badPwd = false;
				this.hideTips($("#pwd"));				
			}
		}
		else{
			this.badPwd = true;
			this.showTips($("#pwd"),"密码不符合标准:6-24位字母,数字,下划线");
		}
	},

	// 判断手机格式
	checkPhone : function(){
		var phone_reg = new RegExp("^1[3578]\\d{9}$");
		if(phone_reg.test($("#phone").val())){
			if(this.badPhone){
				this.hideTips($("#phone"));
				this.badPhone = false;
			}
		}
		else{
			this.badPhone = true;
			this.showTips($("#phone"),"手机格式不正确");
		}
	},

	// 判断邮箱格式
	checkEmail : function(){
		var mail_reg = new RegExp("^.+@.+\..+$");
		if (mail_reg.test($("#email").val())) {
			if(this.badEmail){
				this.badEmail = false;
				this.hideTips($("#email"));
			}
		}
		else{
			this.badEmail = true;
			this.showTips($("#email"),"邮箱格式不正确");
		}
	},

	// 查看密码和隐藏密码
	seePwd : function(){
		$("#see-pwd-btn").on('click',function(event) {
			event.preventDefault();
			// 点击切换为 密码可见状态
			if($(this).attr('class').indexOf("see-pwd") == -1){
				$(this).addClass('see-pwd');

				this.canSeePwd = true;

				// 设置两个输入框间的内容
				$("#pwd-show").val($("#pwd").val()).removeClass('not-show').siblings('#pwd').addClass('not-show');
			}
			// 切换密码为不可见状态
			else{
				$(this).removeClass('see-pwd');
				
				this.canSeePwd = false;

				// 设置两个输入框间的内容
				$("#pwd").val($("#pwd-show").val()).removeClass('not-show').siblings('#pwd-show').addClass('not-show');
			}
		});
	},

	showTips : function($target,tip){
		$target.addClass('input-error').siblings('.tips').css({
			'opacity':'1',
			'animation':'show-tips 0.3s linear forwards'
		}).html(tip);
		setTimeout(function(){
			$target.siblings('.tips').css('animation','none');	
		},400);
	},

	hideTips : function($target){
		$target.removeClass('input-error').siblings('.tips').css('opacity', '0');
	}
};

register.init();

window.onresize = function(){
	drawBg.setWidth();
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

    if (this.particles.length>this.allNum){//只保留200个粒子
      this.particles.shift();
    }
	},

	Particle : function(xPos,yPos){
		this.xPos = xPos;
	  this.yPos = yPos; 
	  this.yVel = 5;
	  this.radius = 8;

	  this.render = function(c){
		  c.fillStyle = "#ddd";
		  c.font ="36px Microsoft Yahei";
		  var deg = Math.PI/3;
		  // c.beginPath();
		  // for(var i = 0; i< 3;i++){
		  // 	c.moveTo(this.xPos +(this.radius*Math.cos(i * deg)),this.yPos +(this.radius*Math.sin(i*deg)));
		  // 	c.lineTo(this.xPos +(this.radius*Math.cos(Math.PI+ i*deg )),this.yPos +(this.radius*Math.sin( Math.PI + i*deg ) ));	
		  // }
		  c.fillText("*",this.xPos,this.yPos);
		}

		// 重置位置
	  this.update = function(){
	    this.yPos += this.yVel; 
	  }
	}
};
drawBg.init();