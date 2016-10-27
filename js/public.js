// 封装 $
;window.$$ = HTMLElement.prototype.$$ = function(selector){
	var ele = document.querySelectorAll(selector);
	return (ele.length == 0)?null:(ele.length == 1)?ele[0]:ele;
}

// 获取 xhr
function getXhr(){
	return (window.XMLHttpRequest)?new XMLHttpRequest():new  ActiveXObject("microsoft XML");
}


/* 设置响应导航栏的鼠标移入移出事件 */
top_nav.addEventListener("mouseover",function(e){
	var id = e.target.id;
	if(id =="meizu" || id == "meilan" || id == "peijian"){
		var list = $$("#"+id+'_list');
		// 获取所有同级节点，隐藏同级列表
		var child = list.parentNode.children;
		for (var i  in child) {
			child[i].className = "nav_pro_list";
		}	
		// 显示对应的列表
		showProList(list);
	}
},true);
top_nav.addEventListener("mouseout",function(e){
	var id = e.target.id;
	console.log("leave a");
	if(id == "meizu" || id == "meilan" || id == "peijian"){
		// 获取所有同级节点，隐藏同级列表
		var list = $$("#"+id+'_list').parentNode.children;
		for (var i  in list) {
			list[i].className = "nav_pro_list";
		}
	}
},true);

// 封装变量 hasOneShow,标志当前是否有nav_pro_list显示
// 减少 nav_list mouseover 的 DOM 操作
var setOneShow,getOneShow;
(function(){
	var hasOneShow = false;
	setOneShow = function(bool){
		hasOneShow = bool;
	}
	getOneShow = function(){
		return hasOneShow;
	}
})();
var nav_list = $$('.nav_list');
nav_list.addEventListener("mouseover",function(e){
	if(!getOneShow()){
		var target = e.target;
		switch(target.nodeName){
			case "I":
				showProList(target.parentNode.parentNode.parentNode);
				break;
			case "A":
				showProList(target.parentNode.parentNode);
				break;
			case "LI":
				showProList(target.parentNode);
				break;
			default: // ul
				showProList(target);
				break;
		}
		setOneShow(true);
	}
	// false 阻止向下捕获
},false);
nav_list.onmouseleave = function(e){
	var child = this.children;
	for(var i in child){
		child[i].className = "nav_pro_list";
	}
	setOneShow(false);
}

// 测试数据
var meizu_pro = [
	{"name":"MX6","href":"#","url":"imgs/nav_list_1.png"},
	{"name":"MX61","href":"#","url":"imgs/nav_list_2.png"},
	{"name":"MX21","href":"#","url":"imgs/nav_list_3.png"},
	{"name":"MX31","href":"#","url":"imgs/nav_list_4.png"},
	{"name":"MX41","href":"#","url":"imgs/nav_list_1.png"},
	{"name":"MX51","href":"#","url":"imgs/nav_list_2.png"}
];
var meilan_pro = [
	{"name":"MX32","href":"#","url":"imgs/nav_list_4.png"},
	{"name":"MX62","href":"#","url":"imgs/nav_list_1.png"},
	{"name":"MX62","href":"#","url":"imgs/nav_list_2.png"},
	{"name":"MX42","href":"#","url":"imgs/nav_list_1.png"},
	{"name":"MX32","href":"#","url":"imgs/nav_list_4.png"},
	{"name":"MX22","href":"#","url":"imgs/nav_list_3.png"},
	{"name":"MX42","href":"#","url":"imgs/nav_list_1.png"},
	{"name":"MX52","href":"#","url":"imgs/nav_list_2.png"}
];
var peijian_pro = [
	{"name":"MX6","href":"#","url":"imgs/nav_list_1.png"},
	{"name":"MX23","href":"#","url":"imgs/nav_list_3.png"},
	{"name":"MX33","href":"#","url":"imgs/nav_list_4.png"},
	{"name":"MX53","href":"#","url":"imgs/nav_list_2.png"}
];

setProList(meizu_list,meizu_pro);
setProList(meilan_list,meilan_pro);
setProList(peijian_list,peijian_pro);

// 填充顶部商品隐藏列表内容
function setProList(target,list){
	var content = "";
	// 导航栏 ul 宽度 :780px;
	var nav_ul_width = 780;
	// ul.pro_list 宽度 ：1080px, 其中 padding：0 20px
	var list_ul_width = 1040;
	// pro_list > li 宽度 ：125px
	var list_li_width = 125;
	
	//目的： 尽量保证产品列表在导航栏正下方
	// 如果内容长度 < 导航栏长度
	var all_li_width = list.length * list_li_width;
	var padding_left = 0;
	if (all_li_width < nav_ul_width) {
		padding_left = list_ul_width - nav_ul_width + (nav_ul_width - all_li_width)/2;
	}
	else{
		padding_left = list_ul_width - all_li_width;
	}

	target.style.paddingLeft = padding_left+"px";
	for(var i in list){
		var tagI = "<i style='background-image:url("+list[i]['url']+")'></i>";
		content += "<li><a href='"+list[i]['href']+"'>"+tagI+list[i]['name']+"</a></li>";
	}
	target.innerHTML = content;
}

function showProList(target){
	target.className = "nav_pro_list nav_pro_list_show_animation nav_pro_list_animation";
}