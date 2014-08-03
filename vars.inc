<?php 
	define(rootSite, dirname(__FILE__));
	if(strrpos(rootSite, "/") > 0){
		define("slash", "/");
	}else {
		define("slash", "\\");
	}
	define(configsFolder, rootSite.slash."configs");
	define(iniFileConfig, configsFolder.slash."config.ini");
?>