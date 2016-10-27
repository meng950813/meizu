var slider = {
	imgs :null, //存储轮播图片数组
	interval : 3000,//自动轮播间隔时间
	timer : null,
	animation:null, // 动画播放 的定时器

	banner_box : null, // 轮播图的外容器
	banner_footer_small : null, // 轮播图下的小图
	banner_footer_title : null, // 轮播图的介绍
	imgWidth : 686,//一张图片的宽度，也为一次移动的距离
	step:0, // 一次移动的长度
	moved:0,// 已移动的次数
	allStep: 60,// 相对于运动时间，保证60/s 

	init:function(imgs){
		this.imgs = imgs;
		this.banner_box = $(".banner-img-box");
		this.banner_footer_small = $("#banner-footer-small");
		this.banner_footer_title = $("#banner-footer-title");
		
		// 填充轮播图
		this.updateView();
		// 填充轮播图下的小图，用作指示按钮
		this.setIndex();

		// 设置响应事件
		// 上一个：左移一格
		$("#banner-left-row").onclick = function(){this.move(-1);}.bind(this);
		// 下一个：右移一格
		$("#banner-right-row").onclick = function(){this.move(1);}.bind(this);

		// 换图事件
		this.banner_footer_small.addEventListener("click",function(e){
			// 点击的图不是当前正在显示的图
			console.log(e.target.nodeName);
			if(e.target.nodeName == "IMG"){
				var target = e.target.parentNode;
				if (target.className.indexOf("active") == -1) {
					console.log(123);
					var nowIndex = parseInt(target.parentNode.querySelector(".active").getAttribute("data-index"));
					var toIndex = parseInt(target.getAttribute("data-index"));
					
					this.move(toIndex);
				}
			}
			
		}.bind(this));

		// 开始轮播
 		this.autoMove();
	},
	autoMove:function(){
		this.timer = setInterval(function(){
			this.move(1);
		}.bind(this),
		this.interval);
	},
	move : function(n){
		// 停止动画
		clearInterval(this.timer);
		this.timer = null;


		// 正常方向移动 ；向左
		if(n>0){
			this.step = this.imgWidth * n / this.allStep;
			this.animation = setInterval(this.animate.bind(this,-1,n),0);
			// this.banner_box.style.left = -this.imgWidth * n+"px";
			// console.log(this.banner_box);
			// $(".banner-img-box").style.left = -this.imgWidth * n+"px";
			// 调整数组位置
			// this.imgs = this.imgs.concat(this.imgs.splice(0, n));
			// this.updateView();
		}
		else{
			this.imgs = this.imgs.splice(this.imgs.length + n, -n).concat(this.imgs);
			// this.updateView();
			this.step = this.imgWidth * n / this.allStep;
			this.animation = setInterval(this.animate.bind(this,1,n),0);
			// this.banner_box.style.left = -this.imgWidth * n +"px";
		}

		// this.autoMove();
	},

	animate:function(dir,n){
		var style = getComputedStyle(this.banner_box);
		this.banner_box.style.left = parseFloat(style.left) + dir*this.step+"px";
		this.moved++;

		if (this.moved >= this.allStep) {
			clearInterval(this.animation);
			this.animation = null;
			this.moved = 0;
			if(n>0){
				this.imgs = this.imgs.concat(this.imgs.splice(0, n));
			}
				this.updateView();
			this.banner_box.style.left = 0;
			this.autoMove();
		}
	},

	updateView : function(){
		var banner = "",small = "";
		for(var i  in this.imgs){
			var img = this.imgs[i];
			banner += "<li><a href='"+img.href+"'><img src='"+img.src+"' alt='"+img.title+"'/></a></li>";
		}
		this.banner_box.innerHTML = banner;

		// 为当前显示的图对应的小图添加样式
		var children = this.banner_footer_small.children;
		for(var i = 0,length = children.length;i<length;i++){
			var child = children[i];
			if (child.getAttribute("data-index") == this.imgs[0].index) {
				child.className = "active";
				this.banner_footer_title.innerHTML = this.imgs[0].title;
			}
			else{
				child.className = "";
			}
		}
	},

	setIndex:function(){
		var content = "";
		for(var i in this.imgs){
			var img = this.imgs[i];
			if(i == 0){
				content += "<a href='javascript:void(0)' data-index='"+img.index+"' class='active'><img src='"+img.src+"' alt='"+img.title+"'></a>";
			}else{
				content += "<a href='javascript:void(0)' data-index='"+img.index+"'><img src='"+img.src+"' alt='"+img.title+"'></a>";
			}
		}
		// 填充小图标
		this.banner_footer_small.innerHTML = content;
		// 设置第一个小图所附带的内容
		this.banner_footer_title.innerHTML = this.imgs[0].title;
	}
};


var imgs = [
	{"index":2,"href":"#","src":"imgs/banner_2.jpg","title":"11月11日  魅蓝系列限量开售"},
	{"index":1,"href":"#","src":"imgs/banner_1.jpg","title":"10月24日 周一品牌日 魅蓝系列限量开售"},
	{"index":3,"href":"#","src":"imgs/banner_3.jpg","title":"12月12日 周一品牌日 "}
];

slider.init(imgs);

// 设置星期
document.getElementById('today-week').innerHTML = getWeek();
function getWeek(){
	var now = new Date();
	switch(now.getDay()){
		case 1:
			return "星期一";
		case 2:
			return "星期二";
		case 3:
			return "星期三";
		case 4:
			return "星期四";
		case 5:
			return "星期五";
		case 6:
			return "星期六";
		default:
			return "星期日"
	}
}
