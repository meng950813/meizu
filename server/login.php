<?php
	include 'linkDB.php';
	header("Context-Type:application/json");

	$username = $_POST['username'];
	$pwd = $_POST['password'];

	$conn = linkDB();
	$sql = "select uid,password from user where username = '$username'";

	$result = mysqli_query($conn,$sql);

	$row = mysqli_fetch_assoc($result);
	// 查询成功，比较结果
	if($row){
		// 正确匹配，成功登录
		if(md5($pwd) == $row['password']){
			$output ['status'] = "ok" ;
			$output ['uid'] = $row['uid'];
			$output ['username'] = $username;
			echo json_encode($output);
			return;
		}
	}
	$output['status'] = "error";
	echo json_encode($output);
?>