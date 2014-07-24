function loadTree (treeId){
	$('#'+treeId).ready(function(){
		$('#'+treeId).tree({
		    url:'/configs/initialTree.json'
		});
		$('#'+treeId).tree({
			onBeforeExpand : onBeforeExpand
		});
	});
}

function onBeforeExpand(node){
	alert(node.text);
}