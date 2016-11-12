/* 测试数据 */
var testSearchData = {
	"topicResult":[
		{
			"topicId":1,"topicTitle":"搜索结果标题",
			"topicContext":"具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容",
			"moduleId":123,
			"moduleName":"某某版块",
			"viewNum":120,
			"commentNum":12,
			"authorId":3,
			"authorName":"我发的",
			"publishTime":"2016-8-9 11:12:13"
		},
		{
			"topicId":2,"topicTitle":"搜索结果标题搜索结果标题",
			"topicContext":"具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容",
			"moduleId":123,
			"moduleName":"某某版块",
			"viewNum":120,
			"commentNum":12,
			"authorId":4,
			"authorName":"就是我",
			"publishTime":"2016-8-9 11:12:13"
		},
		{
			"topicId":3,"topicTitle":"搜索结果标题搜索结果标题搜索结果标题",
			"topicContext":"具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容",
			"moduleId":123,
			"moduleName":"某某版块",
			"viewNum":120,
			"commentNum":12,
			"authorId":3,
			"authorName":"又是我",
			"publishTime":"2016-8-9 11:12:13"
		},
		{
			"topicId":3,"topicTitle":"搜索结果标题搜索结果标题搜索结果标题搜索结果标题",
			"topicContext":"具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容",
			"moduleId":123,
			"moduleName":"某某版块",
			"viewNum":120,
			"commentNum":12,
			"authorId":3,
			"authorName":"还是我",
			"publishTime":"2016-8-9 11:12:13"
		}
	],
	"userResult":[
		{
			"userId":1,"userName":"测试用户名","persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
			"userIcon":"imgs/user_icon_1.jpg","userLevel":"老油条"
		},
		{
			"userId":2,"userName":"测试数据","persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
			"userIcon":"imgs/user_icon_2.jpg","userLevel":"小虾米"
		},
		{
			"userId":3,"userName":"测试用户名测试用户名测试用户名测试用户名测试用户名","persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
			"userIcon":"imgs/user_icon_1.jpg","userLevel":"新人小白"
		},
		{
			"userId":4,"userName":"测试用户名","persign":"黑夜给了你黑色的眼睛，你却用它翻白眼",
			"userIcon":"imgs/user_icon_2.jpg","userLevel":"新人小白"
		}
	]
};

var searchPage = {
	// 排序方式
	orderByTime: 0, // 按发布时间排序
	orderByComment: 1, // 按评论数排序
	orderBySupport: 2, // 按查看数排序

	// 搜索内容
	// searchTopic: 0, // 搜索帖子
	// searchUser: 1, // 搜素用户

	nowPage: 1, // 当前页
	totalPage: 1, // 全部页

	searchType: 0, // 搜索内容,默认搜索类型：帖子
	order: 0, // 排序方式,默认排序方式：发布时间

	s_key: null, // 搜索内容

	init : function(){
		// 获取地址栏中传过来的搜索内容
		var keyIndex = location.search.indexOf("=");
		if(keyIndex != -1){
			this.s_key = decodeURIComponent(location.search.slice(keyIndex+1).replace(/\++/g,' '));
			// 向表单输入框中填充数据
			$("#search-input").val(this.s_key);
			this.search();
		}

		// 设置响应事件
		this.setEvent();
	},

	// 异步请求，获取结果
	search : function(){
		$.get("server/testSearch.php",
			{"s_key":this.s_key,"order":this.order,"nowPage":this.nowPage},
			function(result){
				$(".search-result-box").show();
				$("#search-content").html(this.s_key).siblings('#result-num').html(result.length);
				// 填充数据
				this.fillData(result.data);

				// 设置分页
				this.nowPage = parseInt(result.nowPage);
				this.totalPage = parseInt(result.totalPage);
				setPage.init(this.nowPage,this.totalPage);
			}.bind(this),
			"json"
		);
	},

	// 设置响应事件
	setEvent : function(){
		// 设置修改排序方式事件
		$("#order-type").on('change', function(event) {
			event.preventDefault();
			switch($(event.target).children(':selected').val()){
				case '1':
					this.order = this.orderBySupport;
					break;
				case '2':
					this.order = this.orderByComment;
					break;
				default:
					this.order = this.orderByTime;
					break;
			}

			// 重新搜索
			this.search();
		}.bind(this));

		// 设置点击提交按钮事件
		$("#search-btn").on('click', function(event) {
			event.preventDefault();
			this.submitForm();			
		}.bind(this));

		// 设置热门 tag 点击事件
		$("#hot-search-tags").on('click', '.tag', function(event) {
			event.preventDefault();
			$target = $(event.target);
			var key = $target.data('key');
			if(key != this.s_key){
				this.s_key = key;
				$("#search-input").val(this.s_key);
				this.search();
			}
		}.bind(this));

		/* 设置换页点击事件: 点击数字换页 */
		$("#page-list").on('click', '.page-num > li', function(event) {
			var $target = $(event.target);
			console.log($target,$target.html());
			if( !$target.hasClass('page-active') ){
				$target.addClass('page-active').siblings('.page-active').removeClass('page-active');
				this.nowPage = $target.data('page-num');
				this.search();
			}
		}.bind(this));

		/* 设置换页点击事件: 点击左右换页 */
		$("#page-list").on('click', 'span>em', function(event) {
			var $target = $(event.target).parent("span");
			// 表示允许点击
			if(	!$target.hasClass("page-disable")){
				// 前一页
				if( $target.hasClass('pre-page') && this.nowPage > 1){
					this.nowPage--;
					this.search();
				}
				else if( $target.hasClass('next-page') && this.nowPage < this.totalPage){
					this.nowPage++;
					this.search();
				}
			}
		}.bind(this));
	},

	// 提交表单
	submitForm : function(){
		var key = $("#search-input").val();
		if( key != "" && this.s_key != key){
			this.s_key = key;
			this.search();
		}
	},

	// 填充数据
	fillData : function(result){
		var showResult = "";
		// for(var i in result.topicResult){
		// 	var topicList = result.topicResult[i];
		// 	showResult += `
		// 		<div class="list-row">
		// 			<a href="#${topicList.topicId}" class="topic-title" target="_blank">${topicList.topicTitle}</a>
		// 			<div class="discription">&nbsp;${topicList.topicContext}</div>
		// 			<div class="pull-left">
		// 				<span><a href="#${topicList.moduleId}" class="topic-module" target="_blank">${topicList.moduleName}</a></span>
		// 				<span><a href="#${topicList.authorId}" class="topic-author" target="_blank">${topicList.authorName}</a></span>
		// 				<span class="view-num"><i></i>${topicList.viewNum}</span>
		// 				<span class="comment-num"><i></i>${topicList.commentNum}</span>
		// 				<span class="publish-time">${topicList.publishTime}</span>
		// 			</div>
		// 		</div>`;
		// }
		// for(var i in result.userResult){
		// 	var userList = result.userResult[i];
		// 	showResult += `
		// 		<div class="list-row">
		// 			<div class="user-icon">
		// 				<a href="#" target="_blank">
		// 					<img src="${userList.userIcon}" alt="">
		// 				</a>
		// 			</div>
		// 			<div class="user-discription">
		// 				<a href="#" target="_blank" class="topic-title">${userList.userName}</a>
		// 				<span class="user-tag">${userList.userLevel}</span>
		// 				<p class="discription">&nbsp;${userList.persign}</p>
		// 			</div>
		// 		</div>`;
		// }

	// $(".search-result-list").html(showResult);

	}
}

searchPage.init();

