var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  ++users;
  nick = 'user'+users;
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  io.emit('new user', nick); 
  io.emit('chat message', '** connected **');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
