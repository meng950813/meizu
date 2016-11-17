<?php
	include 'linkDB.php';
	header("Context-Type:application/json");
	$conn = linkDB();

	@$topic_id = $_GET['topic_id'];

	$sql = "SELECT title,topic_id,uid,username from topic,user where author_id = (SELECT author_id from topic where topic_id = $topic_id) and author_id = uid order by sort desc limit 5";

	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_all($result,MYSQLI_ASSOC);
	echo json_encode($row);
?>