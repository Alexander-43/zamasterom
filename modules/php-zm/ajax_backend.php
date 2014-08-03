<?php 
	function printASJson($obj, $options = 0)
	{
		header('Content-type: application/json');
		print json_encode($obj, $options);
	}	
	/**
	 * Возвращает информацию о таблицах с именем like $params['name']
	 * @param Array $params
	 */
	function getTablesByName($params){
		$mysql = Utils::getMysqlObject(Array("fileName"=>iniFileConfig, "sectName"=>"db-config"), 1);
		$tableInfo = new GetTablesInfo(null, null, null, $mysql);
		$info = $tableInfo->getByPattern($params["name"]);
		return $info;
	}
	/**
	 * Получение элементов дерева Ajax`ом
	 * @param Array $params
	 * 						- массив параметров
	 * $params["rootNodes"] - список корневых узлов дерева
	 */
	function Ajax_getJSONTree($params){
		$config = Utils::getIniConfigObject(configsFolder.slash."tree.ini");
		if ($config != null){
			$ini = $config->getAll();
			$tree = Array();
			foreach ($params["rootNodes"] as $roots){
				if ($ini[$roots] != null){
					$tree[] = getChild(Array(), $roots, $ini);
				}
			}
			printASJson($tree);
		}
	}
	
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