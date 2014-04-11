var Games = [],
	express = require('express'),
	app = express().use(express.static('public')),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server, {
		log: false
	});

server.listen(process.argv[2] || 80);

app.get('/');

//socket.io
io.sockets.on('connection', function(socket) {});

//functions

function initialsRegExp(initials){
	var pattern = '';
	for(i in initials){
		pattern += (i==0)? '^\s*':'\w*\s+'; 
		'(' + intials[i] + ')'
	}
	pattern += '\w*\s*'; 
	return new RegExp(pattern);
}

//class Game
var Game = function(){
	this.id = id++;
}

Game.prototype.start = function(){

}

Game.prototype.nextRound = function(){
	this.initials = newInitials(this.round);
	this.initialismRegExp = initialsRegExp(this.initials);
	this.send({intials: this.intials, regExp: this.initialsRegExp})
}

Game.prototype.generateInitials = function newInitials(round){
	var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		initials = '';
	for(i=0;i<round;i++){
		initials += alphabet[parseInt(Math.random() * 26)];
	}
	return initials;
}

Game.prototype.setInitialism = function(socket, initialism){
	if(this.initialismRegExp.match(initialism)){
		var that = this;
		socket.set('initialism', intitialism, function(){
			that.send('ready', socket.id);
		});
		return true;
	} else {
		return false;
	}
}

Game.prototype.emit = function(eventName, data){
	io.sockets.in(this.id).emit(eventName, data);
}

Game.prototype.players = function(){
	return io.clients(this.id);
}

Game.prototype.join = function(socket){
	socket.join(this.id);
}

/*

new game
wait for joiners
when all ready
 start
  //rount start
  gen initials
  send initials
   timer start
   when all submitted || timer = 0
     voting start
       when all voted || timer = 0
         count votes for all players, add to their score
        go to round start unless round = round max
    end
     sort player scores, display winners
  new game(thisgames.id)

*/