<script>
	dicTableObject.init({tableId:'center_<?php print $_GET['id'];?>_table', toolbarId:'center_<?php print $_GET['id'];?>_toolbar', node:'<?php print $_GET['id'];?>'});
</script>
<table id="center_<?php print $_GET['id'];?>_table"></table>
<div id="center_<?php print $_GET['id'];?>_toolbar" style="height:auto">
	<a id="btn_add" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="dicTableObject.appendRow(this)">Добавить</a>
	<a id="btn_remove" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true,disabled:true" onclick="dicTableObject.deleteRow(this)">Удалить</a>
	<a id="btn_edit" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:true,disabled:true" onclick="dicTableObject.editRow(this)">Изменить</a>
	<a id="btn_save" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true,disabled:true" onclick="dicTableObject.saveRow(this)">Сохранить</a>
</div>