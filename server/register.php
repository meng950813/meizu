<?php
	include 'linkDB.php';
	header("Context-Type:application/json");

	$username = $_POST['username'];
	$pwd = md5($_POST['pwd']);
	$phone = $_POST['phone'];
	$email = $_POST['email'];

	$conn = linkDB();
	if (!empty($username)) {
		$sql = "insert into user(uid,username,password,phone,email) values(NULL,'$username','$pwd','$phone','$email')";

		$result = mysqli_query($conn,$sql);

		if($result){
			$output['status'] = "ok";
			$output['uid'] = mysqli_insert_id($conn);
			$output['username'] = $username;
		}
		else{
			$output['status'] = "error";
		}
		echo json_encode($output);
	}
?>