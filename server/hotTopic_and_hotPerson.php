<?php
	include 'linkDB.php';
	header("Context-Type:application.json");
	$conn = linkDB();

	// 批次，用于换一批,一批显示的数量，可传参设置，默认5，
	// 暂时设置3个批次
	@$num = $_GET['num']?$_GET['num']:5;
	$all = 3;
	@$batch = $_GET['batch'] % 3;

	$start = ($batch-1) * $num;

	// 默认搜索社区热帖
	$sql = "SELECT topic_id,title from topic order by publish_time desc,read_count desc limit $start,$num";

	// 如果传入参数 hotPerson ==> 搜索社区达人
	if(!empty($_GET['hotPerson'])){
		$sql = "SELECT uid,user_icon,username,persign from user order by topic_num desc,listener_num desc limit $start,$num";
	}

	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_all($result,MYSQLI_ASSOC);

	$output['nowBatch'] = ++$batch;
	$output['data'] = $row;

	echo json_encode($output);
?>