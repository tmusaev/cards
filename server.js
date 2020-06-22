var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// listen for requests :)
var listener = http.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

var uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PT+'/'+process.env.DB;

var Cards = require('./cards.js');
var Game = require('./game.js');
var CardFactory = require('./cardfactory.js')
var fs = require('fs');
var Papa = require('papaparse');
var DOMParser = require('xmldom').DOMParser;

var XMLParser = new DOMParser();
var tvrFile = fs.readFileSync('./sets/tvr.xml', 'utf8');
var tvrDoc = XMLParser.parseFromString(tvrFile, 'text/xml');
var allcards = tvrDoc.getElementsByTagName("card");

var idDict = {};

for (var i = 0; i < allcards.length; i++) {
  var name = allcards[i].getAttribute("name");
  var id = allcards[i].getAttribute("id");
  idDict[name] = id;
  var properties = allcards[i].getElementsByTagName("property");
  for (var j = 0; j < properties.length; j++) {
    switch(properties[j].getAttribute("name")) {
      case "Rules":
        //console.log(properties[j].getAttribute("value"));
        break;
    }
  }
}

//const file = fs.createReadStream('./tvr.txt');

var cardFactory = new CardFactory();

cardFactory.Create(allcards);

// var aqua = cardFactory.GetCard("Aqua Seneschal");
// console.log(aqua.OnEnter);

// Papa.parse(file, {
//   complete: function(results) {
//     cardFactory.Create(results);
//   }
// });

var games = {};
var players = {};
var queue = null;
var queueDeck = null;

function EndGame(game)
{
  if (game.winner != 0)
  {
    console.log("Winner: "+game.winner);
    console.log("Loser: "+game.loser);
    
    var win_data = {};
    win_data['win'] = 1;
    io.to(game.winner).emit('gamestate', win_data);
    
    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) throw err;
      var users = db.collection('users');
      users.find({username: players[game.winner]}).toArray(function(err, docs) {
        if(err) throw err;
        var numWins = docs[0].wins;
        users.update({username: players[game.winner]}, {$set: {wins: numWins+1}}, function(err, result) {
         if(err) throw err;
        });
      });
    });
    
    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) throw err;
      var users = db.collection('users');
      users.find({username: players[game.loser]}).toArray(function(err, docs) {
        if(err) throw err;
        var numLosses = docs[0].losses;
        users.update({username: players[game.loser]}, {$set: {losses: numLosses+1}}, function(err, result) {
         if(err) throw err;
        });
      });
    });
    
    var loss_data = {};
    loss_data['loss'] = 1;
    io.to(game.loser).emit('gamestate', loss_data);
    
    delete games[game.winner];
    delete games[game.loser];
  }
}

io.on('connection', function(socket){
  console.log('User connected: '+socket.id);
  
  socket.on('cancelPlay', function(){
    console.log(players[socket.id]+' left queue: '+socket.id);
    if (queue == socket.id)
    {
      queue = null;
    }
  });
  
  socket.on('play', function(req){
    console.log(players[socket.id]+' joined queue: '+socket.id);
    if (queue == null)
    {
      queue = socket.id;
      mongodb.MongoClient.connect(uri, function(err, db) {
        if(err) throw err;
        var users = db.collection('users');
        users.find({username: players[socket.id]}).toArray(function(err, docs) {
          if(err) throw err;
          var deckz = docs[0].decks;
          queueDeck = deckz[req.deck];
        });
      });
    }
    else
    {
      var deck = null;
      mongodb.MongoClient.connect(uri, function(err, db) {
        if(err) throw err;
        var users = db.collection('users');
        users.find({username: players[socket.id]}).toArray(function(err, docs) {
          if(err) throw err;
          var deckz = docs[0].decks;
          deck = deckz[req.deck];
          //console.log(deck);
          var newgame = new Game.Game(io, queue, socket.id, players[queue], players[socket.id], queueDeck, deck, cardFactory, EndGame);
          //newgame.setUp();
          console.log('Creating game');
          games[queue] = newgame;
          games[socket.id] = newgame;
          io.to(queue).emit('gamecreated');
          io.to(socket.id).emit('gamecreated');
          queue = null;
        });
      });
      // console.log(deck);
      // var newgame = new Game.Game(io, queue, socket.id, players[queue], players[socket.id], queueDeck, deck, cardFactory, EndGame);
      // //newgame.setUp();
      // console.log('Creating game');
      // games[queue] = newgame;
      // games[socket.id] = newgame;
      // io.to(queue).emit('gamecreated');
      // io.to(socket.id).emit('gamecreated');
      // queue = null;
      //newgame.setUp();
    }
  });
  
  socket.on('connection', function() {
    var game = games[socket.id];
    if (game != null)
    {
      //game.emitState();
      if (game.player1.id == socket.id)
      {
        game.p1ready = true;
      }
      else if (game.player2.id == socket.id)
      {
        game.p2ready = true;
      }
      if (game.p1ready && game.p2ready)
      {
        game.setUp();
      }
    }
  });
  
  socket.on('reconnection', function(req) {
    console.log('Reconnect: orig id: '+req.id+' new id: '+socket.id);
    var player = players[req.id];
    if (player != null)
    {
      delete players[req.id];
      players[socket.id] = player;
    }
    var game = games[req.id];
    if (game != null)
    {
      console.log("game found");
      if (req.id == game.player1.id)
      {
        game.player1.id = socket.id;
      }
      else if (req.id == game.player2.id)
      {
        game.player2.id = socket.id;
      }
      delete games[req.id];
      games[socket.id] = game;
      game.emitState();
    }
  });
  
  socket.on('connect', function() {
    console.log('conect fired: '+socket.id);
  });
  
  socket.on('disconnect', function(reason) {
    console.log(players[socket.id]+' disconnected: '+socket.id+' because '+reason);
    if (queue == socket.id)
    {
      queue = null;
    }
  });
  
  socket.on('reconnect', function() {
    console.log('User reconnected: '+socket.id);
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
      // if (game.winner != 0)
      // {
      //   console.log("Winner: "+game.winner);
      //   console.log("Loser: "+game.loser);
      //   var win_data = {};
      //   win_data['win'] = 1;
      //   io.to(game.winner).emit('gamestate', win_data);
      //   var loss_data = {};
      //   loss_data['loss'] = 1;
      //   io.to(game.loser).emit('gamestate', loss_data);
      //   delete games[game.winner];
      //   delete games[game.loser];
      // }
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
        game.targetSelected(game.player1, game.player2, [req.player, req.index]);
      }
      else if (socket.id == game.player2.id)
      {
        game.targetSelected(game.player2, game.player1, [req.player, req.index]);
      }
    }
  });
  
  socket.on('blocker', function(req) {
    var game = games[socket.id];
    if (game != null)
    {
      if (!game.waitingOnBlock)
      {
        console.log("game not waiting on blocks");
        return;
      }
      if (socket.id == game.player1.id)
      {
        game.blockerChosen(game.player1, game.player2, req.index);
      }
      else if (socket.id == game.player2.id)
      {
        game.blockerChosen(game.player2, game.player1, req.index);
      }
      // if (game.winner != 0)
      // {
      //   console.log("Winner: "+game.winner);
      //   console.log("Loser: "+game.loser);
      //   var win_data = {};
      //   win_data['win'] = 1;
      //   io.to(game.winner).emit('gamestate', win_data);
      //   var loss_data = {};
      //   loss_data['loss'] = 1;
      //   io.to(game.loser).emit('gamestate', loss_data);
      //   delete games[game.winner];
      //   delete games[game.loser];
      // }
    }
  });
  
  socket.on('createAccReq', function(req) {
    console.log('Create Acc Request: '+socket.id);
    mongodb.MongoClient.connect(uri, function(err, db) {
      if (err)
      {
        io.to(socket.id).emit('dbError');
        return;
      }
      var users = db.collection('users');
      users.find({username: req.username}).toArray(function(err, docs) {
        if(err) throw err;
        if(docs.length == 0) {
          bcrypt.hash(req.password, saltRounds, function(err, hash) {
            var newUser = {username: req.username, password: hash, wins: 0, losses: 0, gold: 0, decks: {}};
            console.log("New Acc Created: "+socket.id);
            console.log(newUser);
            users.insert(newUser, function(err, result) {
              if(err) throw err;
              io.to(socket.id).emit('createAccSuccess');
            });
          });
        }
        else {
          io.to(socket.id).emit('accExists');
        }
      });
    });
  });
  
  socket.on('loginReq', function(req) {
    console.log('Login Req: '+socket.id);
    mongodb.MongoClient.connect(uri, function(err, db) {
      if (err)
      {
        io.to(socket.id).emit('dbError');
        return;
      }
      var users = db.collection('users');
      users.find({username: req.username}).toArray(function(err, docs) {
        if(err) throw err;
        if(docs.length == 0) {
          io.to(socket.id).emit('loginFail');
        }
        else {
          var user = docs[0];
          bcrypt.compare(req.password, user['password'], function(err, res) {
            if (res == true) {
              players[socket.id] = req.username;
              io.to(socket.id).emit('loginSuccess');  
            }
            else {
              io.to(socket.id).emit('loginFail');
            }
          });
        }
      });
    });
  });
  
  socket.on('EnterCollection', function() {
    console.log(players[socket.id]+' entered collection: '+socket.id);
    var collection = [];
    //var map = Cards('collection');
    var map = cardFactory.GetCard('collection');
    for (var key in map)
    {
      //var card = new map[key];
      //card.id = idDict[card.name];
      //collection.push(new map[key]());
      //console.log(card.id);
      //collection.push(new map[key]());
      collection.push(map[key]);
    }
    collection.sort(function(x, y) {
      var colorMap = {};
      colorMap['Yellow'] = 1;
      colorMap['Blue'] = 2;
      colorMap['Purple'] = 3;
      colorMap['Red'] = 4;
      colorMap['Green'] = 5;
      if (colorMap[x.color] < colorMap[y.color])
      {
        return -1;
      }
      if (colorMap[x.color] > colorMap[y.color])
      {
        return 1;
      }
      if (x.cost < y.cost)
      {
        return -1;
      }
      if (x.cost > y.cost)
      {
        return 1;
      }
      if (x.name < y.name)
      {
        return -1;
      }
      if (x.name > y.name)
      {
        return 1;
      }
      return 0;
    });
    console.log(collection);
    io.to(socket.id).emit('collection', collection);
  });
  
  socket.on('saveDeck', function(req) {
    console.log(players[socket.id]+' saved deck: '+socket.id);
    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) throw err;
      var users = db.collection('users');
      users.find({username: players[socket.id]}).toArray(function(err, docs) {
        if(err) throw err;
        var deckz = docs[0].decks;
        //console.log(deckz);
        //console.log(req.deck);
        deckz[req.deckName] = req.deck;
        users.update({username: players[socket.id]}, {$set: {decks: deckz}}, function(err, result) {
         if(err) throw err;
        });
      });
    });
  });
  
  socket.on('loadDecks', function(req) {
    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) throw err;
      var users = db.collection('users');
      users.find({username: players[socket.id]}).toArray(function(err, docs) {
        if(err) throw err;
        var deckz = docs[0].decks;
        for (var key in deckz)
        {
          var deck = deckz[key];
          for (var i = 0; i < deck.length; i++)
          {
            deckz[key][i] = Cards(deck[i].name);
          }
          //console.log(deckz);
        }
        io.to(socket.id).emit('loadDecks', deckz);
      });
    });
  });
  
  socket.on('EnterHome', function(req) {
    console.log(players[socket.id]+' entered home: '+socket.id);
    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) throw err;
      var users = db.collection('users');
      users.find({username: players[socket.id]}).toArray(function(err, docs) {
        if(err) throw err;
        if(docs.length != 0) {
          var user = docs[0];
          var data = {};
          data['username'] = user['username'];
          data['wins'] = user['wins'];
          data['losses'] = user['losses'];
          data['gold'] = user['gold'];
          var decks = {};
          for (var key in user['decks']) {
            var deck = user['decks'][key];
            if (deck.length >= 40) {
              decks[key] = deck;
            }
          }
          data['decks'] = decks;
          io.to(socket.id).emit('stats', data);
        }
      });
    });
  });
  
});

