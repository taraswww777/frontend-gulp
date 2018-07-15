<?php
require dirname(__DIR__) . '/frontend-gulp/tools/FrontendGulp.php';
?>
<!DOCTYPE html>
<html lang="RU-ru">
<head>
	<meta charset="UTF-8">
	<title>Demo file</title>
	<link rel="stylesheet" type="text/css" href="<?=FrontendGulp::getInstance()->urlCss('index')?>">
</head>
<body>
<div class="block">Demo text</div>
<script src="<?=FrontendGulp::getInstance()->urlJs('index')?>" type="text/javascript"></script>
</body>
</html>