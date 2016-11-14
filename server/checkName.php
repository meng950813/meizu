<?php
	include 'linkDB.php';

	$username = $_GET['username'];

	$conn = linkDB();
	$sql = "select uid from user where username = '$username'";

	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_assoc($result);
	// 返回值：如果有，返回0，没有返回 1；
	echo !$row;
?>