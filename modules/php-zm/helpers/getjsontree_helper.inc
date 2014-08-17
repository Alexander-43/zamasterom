<?php 	
	/**
	 * Вспомогательный метод для получения узлов дерева
	 * @param Array $item
	 * 						- в большинстве случаев new Array() 
	 * @param String $sect
	 * 						- имя секции в $ini
	 * @param Array $ini
	 * 						- распарсенный ini-файл
	 * @return Array
	 * 						- массив содержаий аттрибуты узла дерева
	 */
	function getChild($item, $sect, $ini){
		foreach ($ini[$sect] as $key=>$value){
			if ($key != "attributes" && $key != "children" && $key != "chMethodParam"){
				$item[$key] = $value;
			}
			if ($key == "attributes"){
				if ($ini[$value] != null){
					foreach($ini[$value] as $k=>$v){
						$item["attributes"][$k] = $v;
					}
				}
			}
			if ($key == "children"){
				foreach ($ini[$sect]["children"] as $child){
					if (function_exists($child)){
						$item["children"] = $child($ini[$sect]["chMethodParam"]);
					}else if ($ini[$child] != null) {
						$item["children"][] = getChild(Array(), $child, $ini);
					}
				}
			}
		}
		return $item;
	}

	/**
	 * Получение дочерних узлов для Справочники
	 * @param Array $params
	 */
	function getDictionaryChilds($params){
		$tables = getTablesByName(array("name"=>$params));
		$elements = array();
		for($i=0;$i<count($tables);++$i){
			$element = $tables[$i];
			$elements[] = array("id"=>$element['Name'], 
					"text"=>$element['Comment'], 
					"attributes"=>array("tableColumns"=>$element['columns']));
		}
		return $elements;
	}
?>