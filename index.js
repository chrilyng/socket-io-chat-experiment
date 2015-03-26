var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  // give the new connection a username
  ++users;
  var nick = 'user'+users;

  io.emit('chat message', '** '+nick+' connected **');

  socket.on('disconnect', function(){
    io.emit('chat message', '** '+nick+' disconnected **');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', nick+': '+msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
