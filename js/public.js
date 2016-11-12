/* 判断是否已登录，设置显示相应内容 */
if(sessionStorage.getItem('userName')){
	$("#header .not-signin").hide().siblings('.sign-in').css('display', 'inline-block');
}
else{
	$("#header .sign-in").hide().siblings('.not-signin').css('display', 'inline-block');
}

/* 设置头部搜索栏响应事件 */
$("#header-search-form").submit(function(event) {
	event.preventDefault();
	var key = $(this).serialize();
	window.open("search_result.html?"+key);
});

var setPage = {
	nowPage: 1, // 保存当前页号
	totalPage: 1,// 保存总页数
	pageCount: 7,// 一次显示的页数

	init : function(nowPage,totalPage){
		this.nowPage = nowPage;
		this.totalPage = totalPage;

		this.fillPage();
	},

	// 填充分页数据
	fillPage : function(){
		// 只有一页，设置左右按钮不可用
		if (this.totalPage == 1) {
			$('#page-list span').addClass('page-disable').attr('disabled', true);
		}

		// 用于保存分页数据
		var pageContext = "";
		var i = 1;
		// 当前页之前 能显示的页数
		var canAdd = Math.ceil(this.pageCount/2);

		// 第一页和最后一页的状态较为特殊，所以需要专门添加 
		// ==> 循环结束条件：
		// 	要添加的 页号 为 1 或者 只能再添加 1 个 
		while((this.nowPage - i)>1 && (canAdd > 1)){
			pageContext = "<li data-page-num='"+(this.nowPage-i)+"'>"+ (this.nowPage-i) +"</li>"+ pageContext;
			i++; canAdd--;
		}

		// 如果被选中页是第一页
		if(this.nowPage == 1){
			pageContext = "<li data-page-num='"+this.nowPage+"' class='page-active'>"+this.nowPage+"</li>" + pageContext;	
			$("#page-list>.pre-page").addClass('page-disable').attr('disabled', true);
		}
		else{
			// 表示被选中页到第一页之间的页可以全部显示
			if( (this.nowPage - i) == 1){
				pageContext = "<li data-page-num='1'>1</li>" + pageContext;
			}
			else{
				pageContext = "<li data-page-num='1' class='page-ignore'>1 ...</li>" + pageContext;
			}
			// 防止出现当前页也是最后一页，重复设置
			if(this.nowPage != this.totalPage){
				pageContext += "<li data-page-num='"+this.nowPage+"' class='page-active'>"+this.nowPage+"</li>";
				canAdd--;
			}
			$("#page-list>.pre-page").removeClass('page-disable').attr('disabled', false);
		}
		canAdd--;

		// 重置计数器
		i = 1;
		// 当前页之后能显示的页数
		canAdd += Math.floor(this.pageCount/2);
		while(this.totalPage > (this.nowPage+i) && canAdd > 1 ){
			pageContext += "<li data-page-num='"+(this.nowPage+i)+"'>"+ (this.nowPage+i) +"</li>";
			i++;
			canAdd--;
		}
		if(this.nowPage == this.totalPage){
			pageContext += "<li data-page-num='"+this.totalPage+"' class='page-active'>"+this.totalPage+"</li>";
			$("#page-list>.next-page").addClass('page-disable').attr('disabled', true);		
		}
		else{
			if( (this.nowPage + i) == this.totalPage ){
				pageContext += "<li data-page-num='"+this.totalPage+"'>"+this.totalPage+"</li>";
			}
			else{
				pageContext += "<li data-page-num='"+this.totalPage+"' class='page-ignore'>... "+this.totalPage+"</li>";
			}
			$("#page-list>.next-page").removeClass('page-disable').attr('disabled', false);		
		}

		$("#page-list .page-num").html(pageContext);
	},
	getTotalPage : function(){
		return this.totalPage;
	},
	getNowPage : function(){
		return this.nowPage;
	}
}


window.formatTime = function(time){
	var p_time = new Date(time);
	// console.log(p_time,p_time.getTime());
	var now = new Date().getTime();
	// 获取差值，秒
	var differ = Math.floor((now - p_time)/1000);

	if(differ < 60 ){
		return differ+"秒前";
	}
	else if(differ<3600){
		return Math.floor(differ/60)+"分钟前";
	}
	else if(differ < (60*60*24) ){
		return Math.floor(differ / 3600)+"小时前";
	}
	else if(differ < (60*60*24*30) ){
		return Math.floor(differ / (60*60*24))+"天前";
	}
	else if(differ < (60*60*24*30*12) ){
		return Math.floor(differ / (60*60*24*30))+"月前";
	}
	else{
		return p_time.getFullYear()+"年"+(p_time.getMonth()+1)+"月"+(p_time.getDate())+"日";
	}
}


/* 设置今天星期 */
;(function(){
	var today = new Date();
	var week = "星期";
	switch(today.getDay()){
		case 1:
			week += "一";
			break;
		case 2:
			week += "二";
			break;
		case 3:
			week += "三";
			break;
		case 4:
			week += "四";
			break;
		case 5:
			week += "五";
			break;
		case 6:
			week += "六";
			break;
		default:
			week += "日";
			break;
	}
	$("#today-week").html(week);

	if(localStorage.has_signined){
		$("#has-signined").html("已签到");
	}
})();

/* 签到 */
$("#signin-expand").on('click', function(event) {
	event.preventDefault();
	// 未签到
	if(!localStorage.has_signined){
		localStorage.setItem("has_signined",true);
		$("#has-signined").html("已签到");
	}
	else{
		localStorage.removeItem('has_signined');
		$("#has-signined").html("签到");
	}
});

/* 点击换一批 */
$(".change-recommend").on('click', function(event) {
	event.preventDefault();
	$(this).children('.glyphicon-refresh').css({
			'transition-duration': '2s',
			'transform': 'rotate(720deg)'
		});
	setTimeout(function(){
		$(this).children('.glyphicon-refresh').css({
			'transition-duration': '0s',
			'transform': 'rotate(0deg)'
		});
	}.bind(this),2000);
});

/* 判断 文本内容，防止 sql 注入 */
window.preventSql = function(context){
	var reg = /^.*["',\\/*].*$/ig;
	return  reg.test(context);
}

/* 绘制 canvas 验证码 */
var drawValidate = {
	ctx:null, // canvas 画布
	width: 0, // canvas 宽度
	height: 0, // canvas 高度
	// 数据池，用于生成随机字符
	dataPool:"0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
	inteval:0, // 字符间距
	// 生成验证码位数
	count : 4,
	// 最后生成结果
	result : "",

	init : function(canvasId){
		this.width = canvasId.width;
		this.height = canvasId.height;
		this.ctx = canvasId.getContext("2d");

		this.inteval = this.width/(this.count+1);

		this.draw();

		$(canvasId).on('click', function(event) {
			event.preventDefault();
			this.draw();
		}.bind(this));

		/* 设置 */
	},

	// 生成随机数
	getRN : function(min,max){
		return Math.floor(Math.random()*(max - min) + min);
	},

	// 生成随机颜色
	getRC : function(min,max){
		return "rgb("+this.getRN(min,max)+","+this.getRN(min,max)+","+this.getRN(min,max)+")";
	},

	// 绘制验证码
	draw : function(){

		this.ctx.clearRect(0,0,this.width-20,this.height-10);
		this.result = "";
		// 设置背景
		this.ctx.fillStyle = this.getRC(180,230);
		this.ctx.fillRect(0,0,this.width,this.height);

		// 设置文本基线
		this.ctx.textBaseline = "bottom";

		for(var i = 0; i < this.count ; i++){
			// 设置字体及大小
			this.ctx.font = this.getRN(this.height/3,this.height)+"px Arial";
			var char = this.dataPool[this.getRN(0,this.dataPool.length)];
			this.result += char;

			// 设置文本坐标
			var x = i* this.inteval + 20;
			var y = this.height;
			
			// 生成文本随机颜色,填充文字
			this.ctx.fillStyle = this.getRC(30,100);
			this.ctx.fillText(char,x,y);

			// 生成干扰线
			this.ctx.beginPath();
			this.ctx.strokeStyle = this.getRC(90,200);
			this.ctx.moveTo(this.getRN(0,this.width),this.getRN(0,this.height));
			this.ctx.lineTo(this.getRN(0,this.width),this.getRN(0,this.height));
			
			this.ctx.moveTo(this.getRN(0,this.width),this.getRN(0,this.height));
			this.ctx.lineTo(this.getRN(0,this.width),this.getRN(0,this.height));
			
			this.ctx.closePath();
			this.ctx.stroke();
		}
	},
	getValidate : function(){
		return  this.result;
	}
}

/*设置 验证码 canvas 的宽度*/
var setCanvasWidth = {
	validate : null, // canvasId
	vali_box : null, // 验证码输入框 id

	input_height : 0,
	input_width : 0,

	init : function(){
		this.validate = document.getElementById("validate");
		this.vali_box = document.getElementById("vali-box");
		
		this.setWidth();
		
	},
	setWidth : function(){
		// 获取input 宽度
		this.input_width = getComputedStyle(this.vali_box).width;
		this.input_height = getComputedStyle(this.vali_box).height;
		
		// 去掉 最后的 px ,转为整型
		this.input_width = parseInt(this.input_width.slice(0, this.input_width.length-2));
		this.input_height = parseInt(this.input_height.slice(0, this.input_height.length-2));
		
		if (this.validate.width != this.input_width || this.input_height != this.validate.height) {
			// 设置 canvas 宽高与input宽高相同
			this.validate.width = this.input_width;
			this.validate.height = this.input_height;
			return true;
		}
		return false;
	}
}

/* 设置富文本编辑器对象 */
var setEditor = {
	editor : null, // 编辑器对象

	init : function(){
		// 创建编辑器对象
		this.editor = new wangEditor("reply-area");

		// 配置编辑器
		this.editorConfig();
		// 启动编辑器
		this.editor.create();

		// 设置编辑器是否可用
		this.setStatus();
	},

	// 配置编辑器
	editorConfig : function(){
		// 配置上传路径
    this.editor.config.uploadImgUrl = 'server/uploadImg.php';
    // 配置编码方式
    this.editor.config.uploadHeaders = {'Accept' : 'text/x-json'};
		// 配置上传图片名
		this.editor.config.uploadImgFileName = 'uploadImg';

		// 配置编辑器功能
		// 小屏功能
		var sreenWidth = document.body.clientWidth;
		if( sreenWidth < 500 ){
			this.editor.config.menus = ['quote','link','unlink','undo','redo'];
		}
		else if( sreenWidth < 768 ){
			this.editor.config.menus = ['quote','link','unlink','emotion','img','insertcode','undo','redo'];
		}
		// pc 机大屏功能
		else{
			this.editor.config.menus = ['source','bold','forecolor','bgcolor','quote','fontfamily','fontsize','unorderlist','orderlist','link','unlink','table','emotion','img','insertcode','undo','redo'];
		}
	},

	// 设置编辑器是否可用
	setStatus : function(){
		// 已登录，编辑器可用
		if(sessionStorage.getItem("userName")){
			this.editor.enable();
			$("#reply-area-box>.login-tip").hide();
			$("#sub-reply").attr('disabled', false);
		}
		else{
			this.editor.disable();
			$("#reply-area-box .login-tip").show();
			$("#sub-reply").attr('disabled', true);
		}
	},

	// 返回编辑器对象
	getEditor : function(){
		return this.editor;
	}
}