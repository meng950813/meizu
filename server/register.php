<?php
	include 'linkDB.php';
	header("Context-Type:application/json");

	$username = $_POST['username'];
	$pwd = md5($_POST['pwd']);
	$phone = $_POST['phone'];
	$email = $_POST['email'];

	$conn = linkDB();

	$sql = "insert into user(username,pwd,phone,email) values('$username','$pwd','$phone','$email')";

	$result = mysqli_query($conn,$sql);

	if($result){
		$output['status'] = "ok";
		$output['uid'] = mysql_insert_id($result);
		$output['username'] = $username;
	}
	else{
		$output['status'] = "error";
	}
	echo json_encode($output);
?>