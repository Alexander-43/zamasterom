function loadTree (treeId){
	$('#'+treeId).ready(function(){
		$('#'+treeId).tree({
		    url:'/configs/initialTree.json'
		});
		$('#'+treeId).tree({
			onBeforeExpand : function(node){
				alert(node.text);
			}
		});
	});
}