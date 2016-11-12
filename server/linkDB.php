<?php

	function linkDB(){
		$conn = mysqli_connect("localhost","root",'','jd');
		
		$sql = "set names utf8";

		mysqli_query($conn,$sql);

		return $conn;
	}

?>