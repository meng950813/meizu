var imgs = [
	{"index":2,"href":"#","src":"imgs/banner_2.jpg","title":"11月11日  魅蓝系列限量开售"},
	{"index":1,"href":"#","src":"imgs/banner_1.jpg","title":"10月24日 周一品牌日 魅蓝系列限量开售"},
	{"index":3,"href":"#","src":"imgs/banner_3.jpg","title":"12月12日 周一品牌日 "}
];

function insertBanner(img){
	var content = "";
	for(var i in img){
		if (i>0) {
			content += "<div class='item'><img src='"+img[i].src+"' alt='"+img[i].title+"'><div class='carousel-caption'><span>"+img[i].title+"</span></div></div>";
		}else{
			content += "<div class='item active'><img src='"+img[i].src+"' alt='"+img[i].title+"'><div class='carousel-caption'><span>"+img[i].title+"</span></div></div>";
		}
	}
	$(".carousel-inner").html(content);
}
insertBanner(imgs);
