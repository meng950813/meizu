<?php
	include 'linkDB.php';
	
	header("Context-Type:application/json");

	$conn = linkDB();

	// 分页信息
	$page = array(
							// 总评论数
							'totalNum'			=>	null,
							// 当前页数
							'nowPage'				=>	1,
							// 每页多少条数据
							'commentCount'	=> 2,
							// 共多少页
							'totalPage'			=>	null
							);

	@$topic_id = $_GET['topic_id']?$_GET['topic_id']:5;
	@$nowPage = $_GET['nowPage']?$_GET['nowPage']:1;

	$page["nowPage"] = $nowPage;

	/* 当访问第一页时，查询帖子信息和回帖数量 */
	if ($nowPage == 1) {
		$sql = "SELECT user.*,topic.*,count(reply_id) as totalNum from topic,user,reply where topic.topic_id = $topic_id and author_id = uid and reply.topic_id = $topic_id";

		$result = mysqli_query($conn,$sql);
		$topicContext = mysqli_fetch_assoc($result);
		$page['totalNum'] = $topicContext['totalNum'];
	}
	else{
		$topicContext = null;
		@$page['totalNum'] = $_GET['totalNum'];
	}


	$start = ($nowPage - 1)*$page['commentCount'];
	$end = ($nowPage)*$page['commentCount'];

	$sql = "SELECT user.*,content,reply_id,publish_time from reply,user where topic_id = $topic_id and parent_reply = 0 and from_user = uid order by sort limit $start,$end";

	$result = mysqli_query($conn,$sql);

	$row = mysqli_fetch_all($result,MYSQLI_ASSOC);
	
	$page['totalPage'] = ceil($page['totalNum']/$page['commentCount']);
	$comment = array();
	// 将一级评论转存为 hash 数组
	foreach ($row as $key => $value) {
		$comment[$value['reply_id']] = $value;
		$reply_id[] = intval($value['reply_id']);
	}
	$reply_id = '('.implode(',',$reply_id ).")";

	// 子评论
	$sql = "SELECT from_user,from_user_name,content,to_user,to_user_name,publish_time,parent_reply from reply where topic_id = $topic_id and parent_reply in $reply_id order by parent_reply";

	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_all($result,MYSQLI_ASSOC);

	/* 将二级评论放入hash数组的子数组中 */
	foreach ($result as $key => $value) {
		$comment[$value['parent_reply']]['subComment'][] = $value;
	}
	$comment['page'] = $page;
	$output['topicContext'] = $topicContext;
	$output['comment'] = $comment;

	// var_dump($output);
	echo json_encode($output);
?>