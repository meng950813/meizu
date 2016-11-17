<?php
	include 'linkDB.php';
	
	header("Context-Type:application/json");

	$conn = linkDB();

	@$topic_id = $_GET['topic_id']?$_GET['topic_id']:5;
	@$nowPage = $_GET['nowPage'];
	// echo($nowPage);

	$topicContext = array();
	if ($nowPage == 1) {
		$sql = "SELECT uid,username,persign,user_icon,topic_num,focus_num,listener_num,topic_id,title,context,publish_time,read_count,praise_count,oppose_count from topic,user where topic_id = $topic_id and author_id = uid";

		$result = mysqli_query($conn,$sql);
		$topicContext = mysqli_fetch_assoc($result);
	}
	else{
		$topicContext = null;
	}

	$sql = "SELECT * from reply where topic_id = $topic_id order by parent_reply,sort";

	$result = mysqli_query($conn,$sql);

	$row = mysqli_fetch_all($result,MYSQLI_ASSOC);

	$i = 0;
	// var_dump($row);
	
	$comment = array();
	$size = count($row);
	
	// 分页信息
	$comment['page'] = array(
										// 总评论数
											'totalNum'			=>	$size,
											// 当前页数
											'nowPage'				=>	$nowPage,
											// 每页多少条数据
											'commentCount'	=> 40,
											// 共多少页
											'totalPage'			=>	ceil($size/40)
										);
	
	// 评论信息
	foreach ($row as $key => $value) {
		if($value['parent_reply'] == 0){
			$comment[$value['reply_id']] = $value;
			$i++;
		}
		else{
			break;
		}
	}
	// 子评论
	for (; $i < $size; $i++) {
		$comment[$row[$i]['parent_reply']]['subComment'][] = $row[$i];
	}

	$output['topicContext'] = $topicContext;
	$output['comment'] = $comment;
// var_dump($output);
	echo json_encode($output);
?>