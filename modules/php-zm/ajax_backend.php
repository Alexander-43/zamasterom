<?php 
	include_once 'helpers/getjsontree_helper.inc';
	
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
	
	function Ajax_getSimpleTableData($params){
		$templ = "select * from %s";
		$limit = "  LIMIT %s,%s";
		$query = sprintf($templ, $params['table']);
		if (isset($params['page']) && isset($params['rows'])){
			$start = ($params['page'] - 1) * $params['rows'];
			$query = $query.sprintf($limit, $start, $params['rows']);
		}
		$mysql = Utils::getMysqlObject(Array("fileName"=>iniFileConfig, "sectName"=>"db-config"), 1);
		$res = $mysql->Execquery($query);
		if ($res != null){
			printASJson($res);
		}
	}
	
	function Ajax_postDictItem($params){
		$mysql = Utils::getMysqlObject(Array("fileName"=>iniFileConfig, "sectName"=>"db-config"), 1);
		$mysqlObj = new MysqlDBObject($params['table'], null, null, $mysql);
		switch ($params['action']){
			case "create" : $res = $mysqlObj->create($params['data'], $params['key']);
				break;
			case "update" : $res = $mysqlObj->update2($params['data'], $params['key']);
		}
		printASJson($res);
	}
?>