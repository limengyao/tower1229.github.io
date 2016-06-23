<?php
header("Content-type:text/html");

if( isset($_REQUEST['test']) ){
	$return = $_REQUEST['test'];
}else{
	$return = "<p style='padding:20px'>Hello Ajax!</p>";
}
echo $return;


?>