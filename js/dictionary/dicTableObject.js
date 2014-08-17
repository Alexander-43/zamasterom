var dicTableObject = {
		editIndex : undefined,
		tableId : null,
		toolbarId : null,
		tableGrid : null,
		object : null,
		btns : {
			init : function (){
				dicTableObject.enDisBtns(['btn_remove', 'btn_edit','btn_save'], 'disable');
			},
			btn_add : function (){
				dicTableObject.enDisBtns(['btn_remove', 'btn_save'], 'enable');
	            dicTableObject.enDisBtns(['btn_edit','btn_add'], 'disable'); 
			},
			btn_remove : function (){
				if (dicTableObject.tableGrid.datagrid('getRows').length == 0){
	     			dicTableObject.enDisBtns(['btn_remove','btn_edit', 'btn_save'], 'disable');
	     		}
				if (!$('#btn_save').linkbutton('options')['disabled']){
					dicTableObject.enDisBtns(['btn_save'], 'disable');
				}
	     		dicTableObject.enDisBtns(['btn_add'], 'enable');
			},
			btn_edit : function (){
				dicTableObject.enDisBtns(['btn_edit', 'btn_add'], 'disable');
				dicTableObject.enDisBtns(['btn_save'], 'enable');
			},
			btn_save : function () {
				dicTableObject.enDisBtns(['btn_save'], 'disable');
				dicTableObject.enDisBtns(['btn_add', 'btn_remove', 'btn_edit'], 'enable');
			}
		},
		init : function (param){
			this.createTable(param.tableId, this.getColumnDefs());
			$('#'+param.tableId).datagrid({
				toolbar:'#'+param.toolbarId,
				onClickRow:this.onClickRow,
				idField : 'id',
				loadMsg : 'Загрузка ...',
				rownumbers : true,
				pagination : true,
				pagePosition : 'bottom',
				pageList : [10,50,100],
				url : 'ajax_request.php?fn=Ajax_getSimpleTableData&table='+param.node,
				method : 'get',
				ctrlSelect:true
			});
			this.tableId = param.tableId;
			this.toolbarId = param.toolbarId;
			this.tableGrid = $('#'+param.tableId);
			this.object = param.node;
		},
		appendRow : function appendRow(obj){
			this.tableGrid.datagrid('appendRow', {});
            dicTableObject.tableGrid.datagrid('clearSelections');
            this.editIndex = this.tableGrid.datagrid('getRows').length-1;
            this.tableGrid.datagrid('selectRow', this.editIndex)
                    .datagrid('beginEdit', this.editIndex);
            dicTableObject.btns[obj.id]();
	     },
	     deleteRow : function deleteRow(obj){
	    	 dicTableObject.tableGrid.datagrid('cancelEdit', this.editIndex)
             	.datagrid('deleteRow', this.editIndex);
	    	 dicTableObject.editIndex = undefined;
	    	 dicTableObject.btns[obj.id]();
	     },
	     saveRow : function saveRow(obj){
	    	 if (dicTableObject.editIndex !== undefined){
	    		 if (this.tableGrid.datagrid('validateRow', this.editIndex)){
	    			 this.tableGrid.datagrid('endEdit', this.editIndex);
	    			 dicTableObject.btns[obj.id]();
	    			 var key = this.tableGrid.datagrid('options')['idField'];
	    			 var data = this.tableGrid.datagrid('getRows')[this.editIndex]
	    			 var action = data[key] ? "update" : "create" ;
	    			 var me = this;
	    			 $.post("ajax_request.php", {
	    				 "data":data,
	    				 "table":me.object,
	    				 "action":action,
	    				 "key":key,
	    				 "fn":"Ajax_postDictItem"
	    				 }, function (data){
	    					 $.messager.show({
	    			                title:'Сообщение',
	    			                msg:data.message,
	    			                showType:'show'
	    			            });
	    					 me.tableGrid.datagrid('reload');
	    				 });
	    		 } else {
	    			 $.messager.alert('Внимание', 'Не все поля заполнены', 'warning');
	    		 }
	    	 }
	     },
	     editRow : function editRow(obj){
	    	 if (this.editIndex != undefined){
	    		 this.tableGrid.datagrid('selectRow', this.editIndex)
                 	.datagrid('beginEdit', this.editIndex);
	    	 }
	    	 dicTableObject.btns[obj.id]();
	     },
		 endEditing : function endEditing(){
	         if (this.editIndex == undefined){return true}
	         this.tableGrid.datagrid('endEdit', this.editIndex);
	         if (this.tableGrid.datagrid('validateRow', this.editIndex)){
	             this.editIndex = undefined;
	             return true;
	         } else {
	             return false;
	         }
	     },
		 onClickRow : function onClickRow(index, data){
			 if (!$('#btn_add').linkbutton('options')['disabled']){
				 dicTableObject.editIndex = index;
				 dicTableObject.enDisBtns(['btn_remove', 'btn_edit'], 'enable');
			 } else if (dicTableObject.editIndex != index){
				 dicTableObject.tableGrid.datagrid('clearSelections');
				 dicTableObject.tableGrid.datagrid('selectRow', dicTableObject.editIndex);
				 $.messager.alert('Внимание', 'В таблице есть не сохраненные данные.', 'warning');
			 }
	     },
	     getColumnDefs: function getColumnDefs(){
	    		var node = $('#west_tree_id').tree('getSelected');
	    		if (node){
	    			var columns = [];
	    			for (var i in node.attributes.tableColumns){
	    				var column = node.attributes.tableColumns;
	    				var col = {field:column[i].Field, title:column[i].Comment, resizable:true};
	    				if (column[i].Field != 'id'){
	    					col['editor'] = {type:'validatebox',
	    									options:{
	    										required:true, 
	    										validType:'minLength[1]',
	    										missingMessage:'Поле <b><i>'+col.title+'</i></b><br>не может быть пустым',
	    										tipPosition:'left'}
	    									};
	    					col['width'] = 50;
	    				} else {
	    					col['fixed'] = true;
	    					col['resizable'] = false;
	    					col['width'] = 30;
	    					col['hidden'] = true;
	    				}
	    				columns[columns.length] = col;
	    			}
	    			return columns;
	    		}
	    		return [];
	    	},
	     	createTable:function createTable(id, cols){
	    		var node = $('#west_tree_id').tree('getSelected');
	    		$('#'+id).datagrid({ 
	    		    title:node.text,
	    		    fit:true,
	    			fitColumns:true,
	    			border:false,
	    			columns:[cols]
	    		});
	    	},
	    	enDisBtns : function (btns, action){
	    		for(var i in btns){
	    			$('#'+btns[i]).linkbutton(action);
	    		}
	    	}
	    	
		 
}