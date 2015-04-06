var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = 0;
var userCount = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  // give the new connection a username
  ++users;
  var nick = 'user'+users;

  d = new Date();

  
  io.emit('chat message', d.toLocaleTimeString()+' ** '+nick+' connected **');

//  r = { resultdate:d, userno:users };

  ++userCount;
  updateUserStatus();

  socket.emit('nick', nick);

  socket.on('disconnect', function(){
    d = new Date();
    io.emit('chat message', d.toLocaleTimeString()+' ** '+nick+' disconnected **');
    --userCount;
    updateUserStatus();
  });

  socket.on('chat message', function(msg){
    d = new Date();
    io.emit('chat message', d.toLocaleTimeString()+' '+nick+': '+msg);
  });
});

function updateUserStatus() {
  io.emit('user status', userCount);
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});
