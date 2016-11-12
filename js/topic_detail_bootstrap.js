/* 设置楼层 */
function getFloor(index){
	switch(index){
		case '1':
			return "沙发";
		case '1':
			return "板凳";
		case '2':
			return "凉席";
		case '3':
			return "地板";
		default:
			return (index+1)+"楼";
	}
}

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
$("#to-floor-btn").click(toFloor);
/* 键盘事件 */
$("#to-floor").keyup(function(event) {
	if(event.keyCode === 13){
		toFloor();
	}
});

var totalCommentNum = 123;
var nowPage = 1;
// 一页的评论数量
var pageCommentNum = 40; 
/* 楼层跳转 */
function toFloor(){
	var floor = parseInt($("#to-floor").val());

	// 输入框不为空、为数字 且 在规定范围 [1,max]
	// 每40条数据分为一页
	if( floor && !isNaN(floor) && floor > 0){

		// 超出楼层数量的跳转设为最后一楼
		( floor > totalCommentNum ) && ( floor = totalCommentNum );

		// 判断楼层跳转是否需要换页
		// 需要跳转 的楼层 不在本页内
		if( ((nowPage - 1)*pageCommentNum) > floor || floor < (nowPage * pageCommentNum) ){

			// 跳转楼层所在的页数
			var pageNum = Math.ceil(floor/pageCommentNum);
			setCommentInfo(pageNum);
		}
		
		window.location.href="#floor-"+floor;
	}
	$("#to-floor").val("");
}

/* 获取评论内容 并填充到页面上*/
function setCommentInfo(pageNum){

}

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
	var targetContent = "<span disabled='disabled'>回复 <a href='"+$target.attr('href')+"' class='user-name inline-block' title='"+$target.html()+"'>"+$target.html()+"&nbsp;</a>：</span>";
	$('#reply-topic-id').val($(this).parent().data('topic-id'));
	$('#reply-area').html(targetContent);
	window.location.href="#reply-area";
});

$(".reply-topic").on('click', function(event) {
	// event.preventDefault();
	$("#reply-topic-id").val($(this).data('topic-id')).siblings('#reply-area').html("");
});