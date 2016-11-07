/* 设置显示搜索框 */
$(".search-btn").click(function(event) {
	$(".search-form-box").fadeIn('fast');
	$(this).fadeOut(400);
});
$(".search-form-box .close").click(function(event) {
	$(".search-form-box").fadeOut('fast');
	$(".search-btn").fadeIn(400);
});


/* 测试数据 */
var testSearchData = {
	"topicResult":[
		{
			"topicId":1,"topicTitle":"搜索结果标题",
			"topicContext":"具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容",
			"viewNum":120,
			"commentNum":12
		},
		{
			"topicId":2,"topicTitle":"搜索结果标题搜索结果标题",
			"topicContext":"具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容",
			"viewNum":120,
			"commentNum":12
		},
		{
			"topicId":3,"topicTitle":"搜索结果标题搜索结果标题搜索结果标题",
			"topicContext":"具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容",
			"viewNum":120,
			"commentNum":12
		},
		{
			"topicId":3,"topicTitle":"搜索结果标题搜索结果标题搜索结果标题搜索结果标题",
			"topicContext":"具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容",
			"viewNum":120,
			"commentNum":12
		}
	],
	"userResult":[
		{
			"userId":1,"userName":"测试用户名","persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
			"userIcon":"imgs/user_icon_1.jpg"
		},
		{
			"userId":2,"userName":"测试数据","persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
			"userIcon":"imgs/user_icon_2.jpg"
		},
		{
			"userId":3,"userName":"测试用户名测试用户名测试用户名测试用户名测试用户名","persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
			"userIcon":"imgs/user_icon_1.jpg"
		},
		{
			"userId":4,"userName":"测试用户名","persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
			"userIcon":"imgs/user_icon_2.jpg"
		}
	]
};
/* 获取搜索结果 */
function setSearchResult(searchContext){
	// 此处需要通过 ajax 获取值
	// 假设此处返回值为 testSearchData
	testSearchData = JSON.parse(JSON.stringify(testSearchData));

	var showResult = "";
	for(var i in testSearchData.topicResult){
		var topicList = testSearchData.topicResult[i];
		showResult += `
			<div class="search-result-list">
				<a href="#" class="search-result-topic">${topicList.topicTitle}</a>
				<p class="discription">&nbsp;${topicList.topicContext}</p>
				<div class="pull-left">
					<span class="view-num"><i></i>${topicList.viewNum}</span>
					<span class="comment-num"><i></i>${topicList.commentNum}</span>
				</div>
			</div>`;
	}
	for(var i in testSearchData.userResult){
		var userList = testSearchData.userResult[i];
		showResult += `
			<div class="search-result-list">
				<div class="user-icon">
					<a href="#" >
						<img src="${userList.userIcon}" alt="">
					</a>
				</div>
				<div class="user-discription">
					<a href="#" class="search-result-topic">${userList.userName}</a>
					<p class="discription">${userList.persign}</p>
				</div>
			</div>`;
	}

	$("#search-result").html(showResult);
}
setSearchResult();


// 设置分页内容，参数依次为：当前页号，总页数，一行显示几页
// 例如 pageCount = 5 => 显示：1 2 3 4 ...600  五个
window.setTopicPage = function(newPage,totalPage,pageCount){

	// 如果只有一页,将上一页和下一页的按钮置为不可用状态
	if(totalPage == 1){
		$("#page-list span").addClass('page-disable');
	}
	// 否则将按钮全部置为可用状态
	else{
		$("#page-list span").removeClass('page-disable');
	}

	// 填充分页列表内容
	var pageContext = "";
	var i = 1; // 计数用,表示已添加的页数：默认已将当前页算入其中
	// 当前页之前 能显示的页数
	var preCount = Math.ceil(pageCount/2);
	

	// 第一页和最后一页的状态较为特殊，所以需要专门添加 ==> 循环结束条件：
	// 	要添加的 页号 为 1 或者 只能再添加 1 个 
	while((newPage - i)>1 && (preCount > 1)){
		pageContext = "<li data-page-num='"+(newPage-i)+"'>"+ (newPage-i) +"</li>"+ pageContext;
		i++; preCount--;
	}

	// 如果被选中页是第一页
	if(newPage == 1){
		pageContext = "<li data-page-num='"+newPage+"' class='page-active'>"+newPage+"</li>" + pageContext;	
		$("#page-list>.pre-page").addClass('page-disable');
	}
	else{
		// 表示被选中页到第一页之间的页可以全部显示
		if( (newPage - i) == 1){
			pageContext = "<li data-page-num='1'>1</li>" + pageContext;
		}
		else{
			pageContext = "<li data-page-num='1' class='page-ignore'>1 ...</li>" + pageContext;
		}
		if(newPage != totalPage){
			pageContext += "<li data-page-num='"+newPage+"' class='page-active'>"+newPage+"</li>";
		}
	}

	// 重置计数器
	i = 1;
	// 当前页之后能显示的页数
	var nextCount = Math.floor(pageCount/2) + preCount;
	while(totalPage > (newPage+i) && nextCount > 1 ){
		pageContext += "<li data-page-num='"+(newPage+i)+"'>"+ (newPage+i) +"</li>";
		i++;
		nextCount--;
	}
	if(newPage == totalPage){
		pageContext += "<li data-page-num='"+totalPage+"' class='page-active'>"+totalPage+"</li>";
		$("#page-list>.next-page").addClass('page-disable');		
	}
	else{
		if( (newPage + i) == totalPage ){
			pageContext += "<li data-page-num='"+totalPage+"'>"+totalPage+"</li>";
		}
		else{
			pageContext += "<li data-page-num='"+totalPage+"' class='page-ignore'>... "+totalPage+"</li>";
		}
	}
	return pageContext;
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
			this.ctx.font = this.getRN(18,48)+"px Arial";
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
			this.ctx.closePath();
			this.ctx.stroke();
		}
	},
	getValidate : function(){
		return  this.result;
	}
}