<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'center'" style="text-align:center;padding:10px;">
			<input id="username" style="width:250px">
		</div>
		<div data-options="region:'south',border:false" style="text-align:center;padding:5px 0 0;">
			<a class="easyui-linkbutton" data-options="iconCls:'icon-ok'" href="javascript:void(0)" onclick="javascript:alert('ok')" style="width:80px">Ок</a>
			<a class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" href="javascript:void(0)" onclick="javascript:alert('cancel')" style="width:80px">Отмена</a>
		</div>
</div>
<script>
	$('#username').textbox({
			buttonText:'Имя пользователя',
		    iconCls:'icon-man',
		    iconAlign:'right',
		    prompt'Имя пользователя'
		});
</script>