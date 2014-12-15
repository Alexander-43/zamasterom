<div id="login-form" class="easyui-layout" data-options="fit:true">
		<div data-options="region:'center'" style="text-align:center;padding:10px;">
			<div style="margin-bottom:10px">
				<input id="username" name="username" type="text">
			</div>
			<div>
				<input id="password" name="password" type="password">
			</div>
		</div>
		<div data-options="region:'south',border:false" style="text-align:center;padding:5px 0 5px;">
			<a class="easyui-linkbutton" data-options="iconCls:'icon-ok'" href="javascript:void(0)" onclick="javascript:alert('ok')" style="width:80px">Ок</a>
			<a class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" href="javascript:void(0)" onclick="javascript:loginObject.close()" style="width:80px">Отмена</a>
		</div>
</div>
<script>
	$('#login-form').ready(
		function (){
			$('#username').textbox({
			    iconCls:'icon-man',
			    width:250,
			    height:30,
			    prompt:'Имя пользователя'
			});
			$('#password').textbox({
			    iconCls:'icon-lock',
			    width:250,
			    height:30,
			    prompt:'Пароль'
			});
		}
	);
</script>