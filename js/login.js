var loginObject = {
	id : 'wnd-login',
	init : function(nameSelector, passSelector){
		$(nameSelector).textbox({
		    iconCls:'icon-man',
		    width:250,
		    height:30,
		    prompt:'Имя пользователя'
		});
		$(passSelector).textbox({
		    iconCls:'icon-lock',
		    width:250,
		    height:30,
		    prompt:'Пароль'
		});
	},
	login : function(){
		if ($('#'+this.id).length == 0){
			$('body').append('<div id="'+this.id+'"></div>');
		}
		$('#'+this.id).window({
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
		$.cookie('ticket', l+'_'+p, {path:'/', expires: 700});
		$('#'+this.id).window('close');
		this.refresh();
	},
	logout : function(){
		alert('Выход');
		$.cookie('ticket', null,  {path: '/', expires:-1 });
		this.refresh();
	},
	close : function(){
		$('#'+this.id).window('close');
	},
	open : function(){
		$('#'+this.id).window('refresh', 'modules/page_login.php');
	},
	refresh : function(){
		if (!$.cookie('ticket')){
			$('#logoutIcon').css('display', 'none');
			$('#loginIcon').css('display', '');
		} else {
			$('#logoutIcon').css('display', '');
			$('#loginIcon').css('display', 'none');
		}
	}
}

$('#logoutIcon').ready(function(){
	loginObject.refresh();
});

$('#loginIcon').ready(function(){
	loginObject.refresh();
});