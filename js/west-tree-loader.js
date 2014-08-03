/**
 * comme
 * @param treeId
 */
function loadTree (treeId){
	$('#'+treeId).ready(function(){
		$('#'+treeId).tree({
		    url:'ajax_request.php?fn=Ajax_getJSONTree&rootNodes[]=root'
		});
		$('#'+treeId).tree({
			onBeforeExpand : onBeforeExpand,
			loadFilter : loadFilter,
			onClick:function onClick(node){
				if (node.attributes.url){
					var params = "";
					for(var i in node.attributes){
						if(typeof node.attributes[i] == 'string'){
							params+= (params.length > 0 ? '&'+i+'='+node.attributes[i]:i+'='+node.attributes[i]);
						}
					}
					if (node.attributes.url.indexOf('?')!=-1){
						params = node.attributes.url+'&'+params;
					} else {
						params = node.attributes.url+'?'+params;
					}
					var panel = $('#main_page_layout').layout('panel', 'center').panel('refresh',params);
					return;
				}
				var parent = $('#'+treeId).tree('getParent', node.target);
				if (parent && parent.attributes.childLoader){
					var panel = $('#main_page_layout').layout('panel', 'center').panel('refresh',parent.attributes.childLoader+"?id="+node.id);
				}
			}
		});
	});
}

function onBeforeExpand(node){
	//alert(node.text);
}

function loadFilter(data, parent){
	for (var i in data){
		if (data[i].id == 'userName'){
			data[i].text = 'Test User';
		}
		if (data[i].children && data[i].children.length > 0){
			loadFilter(data[i].children, null);
		}
	}
	return data;
}