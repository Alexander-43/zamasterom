function getColumnDefs(){
	var node = $('#west_tree_id').tree('getSelected');
	if (node){
		var columns = [];
		for (var i in node.attributes.tableColumns){
			var column = node.attributes.tableColumns;
			columns[columns.length] = {field:column[i].Field, title:column[i].Comment};
		}
		return columns;
	}
	return [];
}

function createTable(id, cols){
	$('#'+id).datagrid({ 
	    columns:[cols]
	});
}