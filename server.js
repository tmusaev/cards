var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongodb = require('mongodb');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// listen for requests :)
var listener = http.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

var uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PT+'/'+process.env.DB;

var Cards = require('./cards.js');
var Game = require('./game.js');

var games = {};
var queue = null;

io.on('connection', function(socket){
  
  socket.on('connection', function() {
    console.log('User connected: '+socket.id);
    
    if (queue == null)
    {
      queue = socket.id;
    }
    else
    {
      //var newgame = new Game(new Player(queue), new Player(socket.id));
      var newgame = new Game.Game(io, queue, socket.id);
      newgame.setUp();
      console.log('Creating game');
      games[queue] = newgame;
      games[socket.id] = newgame;
      queue = null;
    }
    
  });
  
  socket.on('disconnect', function() {
    console.log('User disconnected: '+socket.id);
  });
  
  socket.on('playcard', function(req) {
    var game = games[socket.id];
    if (game != null)
    {
      if (game.IsWaiting())
      {
        return;
      }
      if (socket.id == game.player1.id)
      {
        game.playCard(game.player1, game.player2, req.index);
      }
      else if (socket.id == game.player2.id)
      {
        game.playCard(game.player2, game.player1, req.index);
      }
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    }
  });
  
  socket.on('attackcreature', function(req) {
    var game = games[socket.id];
    if (game != null)
    {
      if (game.IsWaiting())
      {
        return;
      }
      if (socket.id == game.player1.id)
      {
        game.attackCreature(game.player1, game.player2, req.from, req.to);
      }
      else if (socket.id == game.player2.id)
      {
        game.attackCreature(game.player2, game.player1, req.from, req.to);
      }
    }
  });  

  socket.on('attackplayer', function(req) {
    var game = games[socket.id];
    if (game != null)
    {
      if (game.IsWaiting())
      {
        return;
      }
      if (socket.id == game.player1.id)
      {
        game.attackPlayer(game.player1, game.player2, req.index);
      }
      else if (socket.id == game.player2.id)
      {
        game.attackPlayer(game.player2, game.player1, req.index);
      }
      if (game.winner != 0)
      {
        console.log("Winner: "+game.winner);
        console.log("Loser: "+game.loser);
        var win_data = {};
        win_data['win'] = 1;
        io.to(game.winner).emit('gamestate', win_data);
        var loss_data = {};
        loss_data['loss'] = 1;
        io.to(game.loser).emit('gamestate', loss_data);
        delete games[game.winner];
        delete games[game.loser];
      }
    }
  });
  
  socket.on('playmana', function(req) {
    var game = games[socket.id];
    if (game != null)
    {
      if (game.IsWaiting())
      {
        return;
      }
      if (socket.id == game.player1.id)
      {
        game.playMana(game.player1, game.player2, req.index);
      }
      else if (socket.id == game.player2.id)
      {
        game.playMana(game.player2, game.player1, req.index);
      }
    }
  });
  
  socket.on('nextphase', function() {
    var game = games[socket.id];
    if (game != null)
    {
      if (game.IsWaiting())
      {
        return;
      }
      if (socket.id == game.player1.id)
      {
        game.nextPhase(game.player1, game.player2);
      }
      else if (socket.id == game.player2.id)
      {
        game.nextPhase(game.player2, game.player1);
      }
    }
  });
  
  socket.on('targetSelected', function(req) {
    var game = games[socket.id];
    if (game != null)
    {
      if (socket.id == game.player1.id)
      {
        game.targetSelected(game.player1, game.player2, req.index);
      }
      else if (socket.id == game.player2.id)
      {
        game.targetSelected(game.player2, game.player1, req.index);
      }
    }
  });
  
  socket.on('blocker', function(req) {
    var game = games[socket.id];
    if (game != null)
    {
      if (socket.id == game.player1.id)
      {
        game.blockerChosen(game.player1, game.player2, req.index);
      }
      else if (socket.id == game.player2.id)
      {
        game.blockerChosen(game.player2, game.player1, req.index);
      }
      if (game.winner != 0)
      {
        console.log("Winner: "+game.winner);
        console.log("Loser: "+game.loser);
        var win_data = {};
        win_data['win'] = 1;
        io.to(game.winner).emit('gamestate', win_data);
        var loss_data = {};
        loss_data['loss'] = 1;
        io.to(game.loser).emit('gamestate', loss_data);
        delete games[game.winner];
        delete games[game.loser];
      }
    }
  });
  
});

