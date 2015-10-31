<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<link rel="stylesheet" type="text/css" href="js/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="js/themes/icon.css">
		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="js/jquery.cookie.min.js"></script>
		<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/plugins/jquery.layout.js"></script>
		<script type="text/javascript" src="js/plugins/jquery.panel.js"></script>
		<script type="text/javascript" src="js/plugins/jquery.tree.js"></script>
		<script type="text/javascript" src="js/plugins/jquery.window.js"></script>
		<script type="text/javascript" src="js/plugins/jquery.textbox.js"></script>
		<script type="text/javascript" src="js/west-tree-loader.js"></script>
		<script type="text/javascript" src="js/center-loader.js"></script>
		<script type="text/javascript" src="js/login.js"></script>
		<script type="text/javascript" src="js/dictionary/dicTableObject.js"></script>
	</head>
	<body>
		<div id="main_page_layout" class="easyui-layout" data-options="fit:true">			
			<div data-options="region:'center'" style="padding:5px;background:#eee;"></div>
		</div>
		<div id="west-tools">
			<a id="loginIcon" href="#" class="icon-login" onclick="javascript:loginObject.login()" title="Войти"></a>
			<a id="logoutIcon" href="#" class="icon-logout" onclick="javascript:loginObject.logout()" title="Выйти"></a>
		</div>
		<script>
			$('#main_page_layout').layout();
			$('#main_page_layout').layout('add',{
				region: 'west',
				width: 180,
				title: 'Список объектов',
				split: true,
				href:'west.php',
				tools: '#west-tools'
			});
			//$('#cc').layout('panel','west').panel('setTitle','dgdfgd');
		</script>
	</body>
</html>