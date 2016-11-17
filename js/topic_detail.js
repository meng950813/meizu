/* 测试数据 */
/*var testComment = [
	"topicInfo":{
		"topicId":2,
		"title":"做个好版主还是坏版主？",
		"publishTime":"2016/11/2 16:23:56",
		"viewNum":321,
		"commentNum":123,
		"context":"	啦啦啦德玛西亚<br>&nbsp;啦啦啦德玛西亚<br>啦啦啦德玛西亚<br><img src='imgs/banner_1.jpg' alt=''>啦啦啦啦啦德玛西亚<br><img src='imgs/user_icon_1.jpg' alt='>啦啦啦啦啦德玛西亚<br><img src='imgs/banner_5.jpg' alt='>啦啦啦德玛西亚<br>"
	},
	"userInfo":{
		"userId":3,
		"userName":"啦啦啦德玛西亚",
		"userLevel":"吃瓜群众",
		"userIcon":"imgs/user_icon_1.jpg",
		"persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
		// 用户头像
		"userIcon":"imgs/user_icon_1.jpg",
		// 发帖数
		"topicNum":123,
		// 关注数
		"focusNum":234,
		"listenerNum":120
	}
];
var testSubComment = [{
	"totalCommentNum":456,
	"totalPageNum":45,
	"nowPage":1,
	"commentList":[{
		{
			"topicId":3,
			"context":"评论内容，评论内容",
			// ""
		},
	}]
}];*/

/* 楼层直达 的点击事件和键盘事件 */
// $("#to-floor-btn").click(topic_detail.toFloor);
// /* 键盘事件 */
// $("#to-floor").keyup(function(event) {
// 	if(event.keyCode === 13){
// 		topic_detail.toFloor();
// 	}
// });

// var totalCommentNum = 123;
// var nowPage = 1;
// // 一页的评论数量
// var pageCommentNum = 40; 
// /* 楼层跳转 */
// function toFloor(){
// 	var floor = parseInt($("#to-floor").val());

// 	// 输入框不为空、为数字 且 在规定范围 [1,max]
// 	// 每40条数据分为一页
// 	if( floor && !isNaN(floor) && floor > 0){

// 		// 超出楼层数量的跳转设为最后一楼
// 		( floor > totalCommentNum ) && ( floor = totalCommentNum );

// 		// 判断楼层跳转是否需要换页
// 		// 需要跳转 的楼层 不在本页内
// 		if( ((nowPage - 1)*pageCommentNum) > floor || floor < (nowPage * pageCommentNum) ){

// 			// 跳转楼层所在的页数
// 			var pageNum = Math.ceil(floor/pageCommentNum);
// 			setCommentInfo(pageNum);
// 		}
		
// 		window.location.href="#floor-"+floor;
// 	}
// 	$("#to-floor").val("");
// }


/* 初始化富文本编辑器 */
setEditor.init();

/* 发送编辑内容 */
var sendContext = {
	submitBtn : null,
	content : null , // 提交内容

	init : function(){
		this.submitBtn = $("#sub-reply");

		// 设置监听事件
		this.submitBtn.on('click', function(event) {
			event.preventDefault();

			var editor = setEditor.getEditor();
			// 获取编辑器中的内容
			this.content = editor.$txt.html();

			// 只有当页面内容中有文字或有图时才能提交
			if(this.content.trim().indexOf("<img") != -1 || editor.$txt.text().trim()!=""){
				// 格式化 sql 关键字
				this.checekContent();
				
				/* TODO 发送异步请求 */
				$.ajax({
					url: '/path/to/file',
					type: 'default GET (Other values: POST)',
					dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
					data: {param1: 'value1'},
				})
				.done(function(result) {
					console.log("success");
					/* 回帖后跳转到最后一页 */
					if($("#to-last-page").prop('checked')){
						// 判断当前页是否是最后一页
						
					}
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
				

				console.log(this.content);
			}
		}.bind(this));
	},

	// 刷新当前页
	flashPage : function(){

	},

	// 检查发布内容，处理其中出现的sql关键字，防止简单的sql注入
	checekContent : function(){
		console.log("checekContent");
		this.content = this.content.replace("/\"\b*(drop)\b/ig","&quot;drop&nbsp;").trim();
		this.content = this.content.replace("/\"\b*(select)\b/ig","&quot;select&nbsp;");
		this.content = this.content.replace("/\"\b*(delete)\b/ig","&quot;delete&nbsp;");
		this.content = this.content.replace("/\"\b*(update)\b/ig","&quot;update&nbsp;");
	}
}
sendContext.init();


/* 设置回复响应事件 */
$(".comment-list").on('click', ".option .reply-comment,.sub-comment .reply-sub-comment" ,function(event) {
	event.preventDefault();
	/* 回复一级评论 */
	var $target;
	if($(this).hasClass('reply-comment')){
		$target = $(this).parent().siblings('.comment-detail-head').children('.owner-info').children('.set-user-name');
	}
	/* 回复二级评论 */
	else if($(this).hasClass('reply-sub-comment')){
		$target = $(this).parent().siblings('.user-name:first');
	}
	var targetContent = "<span class='reply-block'>回复 <a href='"+$target.attr('href')+"' class='user-name inline-block' title='"+$target.html()+"'>"+$target.html()+"&nbsp;</a></span><span>:</span>";
	$('#reply-topic-id').val($(this).parent().data('topic-id'));
	$('#reply-area').html(targetContent);
	window.location.href="#reply-area";
});

$(".reply-topic").on('click', function(event) {
	// event.preventDefault();
	$("#reply-topic-id").val($(this).data('topic-id')).siblings('#reply-area').html("");
});




var topic_detail = {
	nowPage : 1, // 当前页号
	totalPage : 1, // 总页数
	listNum : 40, // 一页的数据量

	topic_id : 5, // 帖子 id 

	init : function(){
		console.log("detail init");
		// 获取帖子id
		var search = location.search;
		var start = search.indexOf("tp_id");
		var end = search.indexOf("&",start);
		// 只取值，tp_id=  占6字符
		this.topic_id = parseInt(search.slice(start+6, end));
		// console.log(this.topic_id);
		this.topic_id = 5;
		this.getData();
		this.newTopic();
	},

	// 获取数据
	getData : function(){
		// 发起异步请求，获取数据
		$.ajax({
			url: 'server/topic_detail.php',
			type: 'get',
			dataType: 'json',
			data: {'topic_id':5,'nowPage':this.nowPage},
		})
		.done(function(result) {
			// 填充数据
			this.fillData(result);
			// 设置分页
			setPage.init(this.nowPage,this.totalPage);
		}.bind(this))
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	},

	// 填充数据
	fillData : function(result){
		var totalNum = result.comment.page.totalNum;
		// 第一页，有帖子内容
		if(result.topicContext != null){

			var topicContext = result.topicContext;
			var topicInfo = `
				<div class='user-avatar'>
					<a href='#uid:${topicContext.uid}'>
						<img src='${topicContext.user_icon}' alt=''>
					</a>
				</div>

				${this.getUserInfo(topicContext)}

				<div class='topic-detail-head'>
					<h3><a href='#topic_id:${topicContext.topic_id}' class='color-black'>${topicContext.title}</a></h3>
					<div class='sub-title'>
						<div class='owner-info inline-block'>
							<a href='#uid:${topicContext.uid}' title='${topicContext.username}'><b>${topicContext.username}</b></a>
							<span class='color-999'><img src='imgs/mzvip3.jpg' alt=''> 魅友版主</span>
						</div>
						<div class='pull-right publish-info'>
							<span class='publish-time'>${topicContext.publish_time}</span>
							<span class='view-num'><i></i>${topicContext.read_count}</span>
							<span class='comment-num'><i></i>${totalNum}</span>
						</div>
					</div>
				</div>
			`;

			$('.header-user-info').html(topicInfo);
			$('.topic-detail-context').html(topicContext.context);
		}
		else{
			$(".topic-detail-context").hide();
		}

		// 设置总评论数
		$("#comment-area > .comment-list-head > .total-comment-num").html(totalNum);
		// 评论内容
		var commentList = result.comment;
		var commentInfo = "" ;
		// 如果有评论内容
		if(totalNum > 0){
			// 设置页数
			this.totalPage = commentList.page.totalPage;
			this.nowPage = commentList.page.nowPage;


			// 楼层
			var floorNum = 0;
			for(var i in commentList){
				floorNum++;
				if(i != "page"){
					var comment = commentList[i];
					// 如果有二级回复
					// if(comment.subComment){
						var subCommentInfo = "";
						for(var j in comment.subComment){
							var subComment = comment.subComment[j];

							subCommentInfo += `
								<div class="sub-comment">
									<a href="#sub-comment:${subComment.from_user}" class="user-name inline-block" title="${subComment.from_user_name}">${subComment.from_user_name}</a> 回复 
									<a href="#sub-comment:${subComment.to_user}" class="user-name inline-block" title="${subComment.to_user_name}">${subComment.to_user_name}</a>:
									${subComment.content}
									<div class="publish-time color-999 pull-right" data-topic-id="${subComment.reply_id}">
										<span>${subComment.publish_time}</span>									
										<a href="javascript:void(0)" class="color-999 reply-sub-comment">回复</a>
									</div>
								</div>
							`;
						}
						commentInfo += ` 
							<div class="comment-detail">
								<div class="user-avatar ">
									<a href="#comment-detail:${comment.from_user}" name="floor-${floorNum}">
										<!-- TODO -->
										<img src="imgs/user_icon_1.jpg" alt="">
									</a>
								</div>

								<!-- 评论人详细信息：默认隐藏，鼠标移到头像上显示 -->
								${this.getUserInfo(comment)}

								<div class="comment-detail-body">

									<!-- 评论人名称，评论时间等信息 -->
									<div class="comment-detail-head">
										<div class="owner-info">
											<a href="#" title="大大大大森" class="set-user-name">大大大大森</a>
											<span><img src="imgs/mzvip3.jpg" alt=""> 魅友版主</span>
											<span class="publish-time">${comment.publish_time}</span>
											<span class="pull-right color-999">${this.setFloor(floorNum)}</span>
										</div>							
									</div>

									<div class="comment-detail-context">
										<div class='comment-context'>${comment.content}</div>
										<!-- 子评论 -->
										${subCommentInfo}
									</div>
									<!-- 对于当前回复的操作 -->
									<div class="option pull-right" data-topic-id='${comment.reply_id}'>
										<a href="#" class="support">支持</a>
										<a href="#" class="oppose">反对</a>
										<a href="javascript:void(0)" class="reply reply-comment">回复</a>
									</div>
								</div>
							</div>
							`;
					// }
				}
					// console.log(comment);
			}
			$(".comment-list").html(commentInfo);		
		}
		else{
			// $("#comment-area").hide();
		}
	},

	setFloor : function(floorNum){
		switch(floorNum){
			case 1:
				return "沙发";
			case 2:
				return "板凳";
			case 3:
				return "凉席";
			case 4:
				return "地板";
			default:
				return floorNum+"楼";
		}
	},

	// 设置楼层跳转事件
	toFloor : function(){
		var floor = parseInt($("#to-floor").val());
		// 输入框不为空、为数字 且 在规定范围 [1,max]
		// 每40条数据分为一页
		if( !isNaN(floor)&& floor > 0 && floor != this.nowPage){

			// 超出楼层数量的跳转设为最后一楼
			( floor > this.totalPage ) && ( floor = this.totalPage );

			// 判断楼层跳转是否需要换页
			// 需要跳转 的楼层 不在本页内
			if( ((this.nowPage - 1)*this.listNum) > floor || floor < (this.nowPage * this.listNum) ){

				// 跳转楼层所在的页数
				var pageNum = Math.ceil(floor/this.listNum);
				setCommentInfo(pageNum);
			}
			
			window.location.href="#floor-"+floor;
		}
		$("#to-floor").val("");
	},

	getUserInfo : function(userInfo){
		return `
			<div class="user-info">
				<img src="${userInfo.user_icon}" alt="">
				<div class="info">
					<p>
						<a href="#user-info:${userInfo.uid}" class="inline-block set-hide-user-name" title="${userInfo.username}">${userInfo.username} </a>
						<em class="honor inline-block"><img src="imgs/mzvip3.jpg"> 魅族版主</em>
					</p>
					<p>${userInfo.persign}</p>
					<p>
						帖子：<span class="topic-num">${userInfo.topic_num}</span>
						收听：<span class="listen-num">${userInfo.focus_num}</span>
						听众：<span class="listener-num">${userInfo.listener_num}</span>
					</p>
					<a href="#uid:${userInfo.uid}" class="pull-right">更多信息&gt;&gt;</a>
				</div>
			</div>
		`;
	},

	// 最新帖子
	newTopic:function(){
		var topic_id = this.topic_id;
		$.ajax({
			url: 'server/newTopic.php',
			type: 'get',
			dataType: 'json',
			data: {"topic_id": topic_id},
		})
		.done(function(result) {
			console.log("success");
			$(".new-topic-head").html(`<a href='#Personal/${result[0].uid}' title='${result.username}'>${result[0].username}</a>的最新帖子`);
			var topicList = "";
			for(var i in result){
				var topic = result[i];
				topicList += `<li><a href="#topic_detail/${topic.topic_id}">${topic.title}</a></li>`;
			}
			$(".new-topic-list").html(topicList);
		})
		.fail(function(msg) {
			console.log("error");
			console.log(msg);
		})
		.always(function() {
			console.log("complete");
		});
		
	}
};

topic_detail.init();

/* 热门帖子和 论坛达人*/
hotTopic_and_hotPerson.init();