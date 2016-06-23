<?php
header("Content-type:application/json");

if( isset($_REQUEST['paramArray']) ){
	$return = '{"combo1":{"data":"返回数据1"},"combo2":{"data":"返回数据2"},"combo3":{"data":"返回数据3"},"combo4":{"data":"返回数据4"}}';
}
if( isset($_REQUEST['sleep']) ){
	$sleep = $_REQUEST['sleep'];
	sleep($sleep);
}
echo $return;

?>