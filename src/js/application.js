var socket = io.connect((window.location.hostname == 'localhost')? '127.0.0.1:' + window.location.port : window.location.host), //fix for socket.io connecting to wrong ip when you use 'localhost'
	liHeight = 20;

var initiallous = angular.module('initiallous', [
	'ngRoute'
	'initiallousCtrls']);

var initiallousCtrls = initiallous.module('initiallousCtrls', [])

initiallousCtrls.controller('initiallousCtrl', ['$scope'], function($scope){
	$scope.chatLog = [];
	$scope.logLength = 1000;
	$scope.players = [];
	//watches for chat change, when it changes if you're at the bottom, move scroll down to emulate chat programs
	$scope.$watchCollection('chatLog', function() {
		var Chat = $('#Chat')[0];
		if(Chat.scrollTop + Chat.clientHeight === Chat.scrollHeight){
			setTimeout(function(){
				Chat.scrollTop += Chat.clientHeight;
			}, 20);
		} 
	});
}

//jQuery
$(ready);

function ready() {

}

//socket.io


//functions
function updateScope(data) {
	angular.element('body').scope().$apply(function(scope) {
		$.extend(scope, data);
	});
}

function bsAlert(type, message){
	var $alert = $('<div class="alert alert-' + type + '">'+ message +'</div>');
	$('body').append($alert);
	setTimeout(function(){
		$alert.fadeOut(400, function(){$alert.remove();});
	}, 1000);
}
