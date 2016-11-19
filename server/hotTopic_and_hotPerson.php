<?php
	include 'linkDB.php';
	header("Context-Type:application.json");
	$conn = linkDB();

	// 批次，用于换一批,一批显示的数量，可传参设置，默认5，
	@$step = $_GET['step']?$_GET['step']:5;
	
	// 可显示数据的总数,默认为null
	@$totalData = $_GET['totalData'];

	@$batch = $_GET['batch'];

	$start = ($batch-1) * $step;

	// 默认搜索社区热帖
	if(empty($_GET['hotPerson'])){
		// 先判断有没有传入总数参数
		if($totalData == null){
			// 最多 40
			$totalData = getTotal($conn,"topic",$step);
		}
		$batch %= $totalData;
		
		$sql = "SELECT topic_id,title from topic order by publish_time desc,read_count desc limit $start,$step";		
	}
	// 如果传入参数 hotPerson ==> 搜索社区达人
	else{
		if($totalData == null){
			$totalData = getTotal($conn,"user",$step);
		}
		$batch %= $totalData;
		
		$sql = "SELECT uid,user_icon,username,persign from user order by topic_num desc,listener_num desc limit $start,$step";
	}

	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_all($result,MYSQLI_ASSOC);

	$output['nowBatch'] = ++$batch;
	$output['totalData'] = $totalData;
	$output['data'] = $row;

	echo json_encode($output);

	// 获取数据的表，最多数据量，一批数据有多少条数据
	// return 共有几批数据
	function getTotal($conn,$table,$step){
		$sql = "SELECT count(*) as totalData from $table";
		$result = mysqli_query($conn,$sql);
		$totalData = intval(mysqli_fetch_assoc($result)['totalData']);
		($totalData > 40) && ($totalData = 40);
		return ceil($totalData/$step);
	}
?>