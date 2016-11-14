<?php

	function linkDB(){
		$conn = mysqli_connect("localhost","root",'','forum',3306);
		
		$sql = "set names utf8";

		mysqli_query($conn,$sql);

		return $conn;
	}

?>