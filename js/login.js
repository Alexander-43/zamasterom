var loginObject = {
	id : 'wnd-login',
	login : function(){
		if ($('#'+this.id).length == 0){
			$('body').append('<div id="'+this.id+'"></div>');
		}
		$('#wnd-login').window({
				width:300,
		    	height:165,
		    	iconCls:'icon-login',
		    	modal:true,
		    	resizable:false,
		    	maximizable:false,
		    	minimizable:false,
		    	collapsible:false,
		    	draggable:false,
		    	title:' Войти'
			});
		this.open();
	},
	doLogin : function(login, password){
		var l = $(login) ? $(login).val():null;
		var p = $(password) ? $(password).val():null;
		
	},
	logout : function(){
		alert('Выход');
	},
	close : function(){
		$('#'+this.id).window('close');
	},
	open : function(){
		$('#'+this.id).window('refresh', 'modules/page_login.php');
	}
}