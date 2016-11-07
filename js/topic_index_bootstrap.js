// 测试数据
var test_json = {
	// 总页数
	"totalPageNum":30,
	// 当前页数
	"newPage":10,
	"topicList":[
		{
			"topicId":1,
			"topicContext":"魅族商城 M 码系统升级公告魅族商城 M 码系统升级公告",
			"publishTime":"2016/09/08",
			// 查看数
			"viewNum":201,
			// 评论数
			"commentNum":123,
			"userInfo":{
				"uid":1,
				"userName":"啦啦啦德玛西亚",
				"persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
				// 用户头像
				"userIcon":"imgs/user_icon_1.jpg",
				// 发帖数
				"topicNum":123,
				// 关注数
				"focusNum":234,
				"listenerNum":120
			}
		},
		{
			"topicId":2,
			"topicContext":"魅族商城 M 码系统升级公告魅族商城 M 码系统升级公告",
			"publishTime":"2016/10/08",
			"viewNum":201,
			"commentNum":123,
			"userInfo":{
				"uid":2,
				"userName":"啦啦啦德玛西亚",
				"persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
				"userIcon":"imgs/user_icon_2.jpg",
				"topicNum":123,
				"focusNum":234,
				"listenerNum":120
			}
		},
		{
			"topicId":5,
			"topicContext":"魅族商城 M 码系统升级公告魅族商城 M 码系统升级公告",
			"publishTime":"2015/05/08",
			"viewNum":2011,
			"commentNum":123,
			"userInfo":{
				"uid":3,
				"userName":"啦啦啦德玛西亚啦啦啦德玛西亚",
				"persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
				"userIcon":"imgs/user_icon_1.jpg",
				"topicNum":123,
				"focusNum":234,
				"listenerNum":120
			}
		},
		{
			"topicId":7,
			"topicContext":"魅族商城 M 码系统升级公告魅族商城 M 码系统升级公告",
			"publishTime":"2016/10/31 23:32:01",
			"viewNum":201,
			"commentNum":123,
			"userInfo":{
				"uid":4,
				"userName":"啦啦啦",
				"persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
				"userIcon":"imgs/user_icon_2.jpg",
				"topicNum":123,
				"focusNum":234,
				"listenerNum":120
			}
		}
	]
};

var testData = JSON.parse(JSON.stringify(test_json));

// orderBy 指排序方式，取值 1~6，默认5,表示最新回复
// 设置默认排序方式
if (!sessionStorage.orderBy) {
	sessionStorage['orderBy'] = 5;
}

/* 获取并填充数据 */
function setTopicInfo(orderBy,newPage){
	/* 此处应用 ajax 获取数据 */	
	// console.dir(testData);
	var topicContext = "";
	for(var index in testData.topicList){
		var topic = testData.topicList[index];
		// console.log(topic);
		var publishTime = formatTime(topic.publishTime);
		topicContext += `
			<div class='col-xs-12 col'>
				<div class='row'>
					<div class='user-avatar'>
						<a href='#'>
							<img src='${topic.userInfo.userIcon}' alt='${topic.userInfo.userName}'>
						</a>
					</div>
					<div class='user-info'>
						<img src='${topic.userInfo.userIcon}' alt='${topic.userInfo.userName}'>
						<div class='info'>
							<a href='#'>${topic.userInfo.userName}</a>
							<p>${topic.userInfo.persign}</p>
							<p>
								帖子：<span class='topic-num'>${topic.userInfo.topicNum}</span>
								收听：<span class='listen-num'>${topic.userInfo.focusNum}</span>
								听众：<span class='listener-num'>${topic.userInfo.listenerNum}</span>
							</p>
							<button class='listen-he'>收听他</button>
						</div>
					</div>
					<div class='col-xs-10 col-sm-11'>
						<a href='topic_detail_bootstrap.html' class='color-black'>${topic.topicContext}</a>
					</div>
					<div class='pull-right publish-info'>
						<span class='view-num'><i></i>${topic.viewNum}</span>
						<span class='comment-num'><i></i>${topic.commentNum}</span>
						<a href='#' class='username'>${topic.userInfo.userName}</a>
						<span class='publish-time'>${publishTime}</span>
					</div>

				</div>
			</div>`;
	}

	$("#topic-list").html(topicContext);

	$("#page-list>.page-num").html(setTopicPage(newPage,testData.totalPageNum,5));
}
setTopicInfo(sessionStorage.orderBy,1);


/* 设置换页点击事件: 点击数字换页 */
$("#page-list").on('click', '.page-num > li', function(event) {
	if($(this).attr('class') != "page-active"){
		$(this).addClass('page-active').siblings('.page-active').removeClass('page-active');
		var pageNum = $(this).data('page-num');
		console.log(pageNum);
		setTopicInfo(sessionStorage.orderBy,pageNum);
	}
});

/* 设置换页点击事件: 点击左右换页 */
$("#page-list").on('click', '.pre-page,.next-page', function(event) {
	// 表示允许点击
	if($(this).attr('class').indexOf("page-disable") == -1){
		// 防止手动修改 类点击的情况
		var activePage = $(this).siblings('.page-num').children('.page-active').data("page-num");
		var totalPage = $(this).siblings('.page-num').children().last().data('page-num');

		// 前一页
		if($(this).attr('class') == "pre-page" && activePage > 1){
			setTopicInfo(sessionStorage.orderBy,--activePage);
		}
		else if($(this).attr('class') == "next-page" && activePage < totalPage){
			setTopicInfo(sessionStorage.orderBy,++activePage);
		}
	}
});
