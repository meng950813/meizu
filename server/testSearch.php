<?php
	include 'linkDB.php';
	header("Context-Type:application/json");

	$conn = linkDB();

	// 获取搜索内容
	$key = $_GET['s_key'];
	$order = $_GET['order'];

	// 去空格，分割字符串
	@$parme = split("[\s \t\r]+", $key);
	
	// 拼接 sql 语句
	$size = count($parme);

	$sql = "select * from table where";
	
	for ($i=0; $i < $size-1; $i++) {
		$context = $parme[$i];
		$sql .= " title like %$context% or";
	}

	$context = $parme[$size-1];
	$sql .= " title like %$context%";
	// echo $sql;
	// 按评论数排序
	if ($order == 1) {
		$sql .= " order by(comment_num desc)";
	}
	// 按查看数排序
	elseif($order == 2){
		$sql .= " order by(view_num desc)";
	}
	// 默认：按发布时间排序
	else{
		$sql .= " order by(publish_time desc)";
	}
	
	$output['nowPage'] = $_GET['nowPage'];
	$output['totalPage'] = 20;
	$output['pageCount'] = 20;
	$output['data'] = array("sql"=>$sql);

	echo json_encode($output);
?>