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

class Game
{
  constructor(player1, player2)
  {
    this.winner = 0;
    this.loser = 0;
    this.player1 = player1;
    this.player2 = player2;
    this.turnPlayer = player2;
    this.phase = 1;
  }
  
  playCard(id, index)
  {
    if (id == this.player1.id && id == this.turnPlayer.id && this.phase == 2)
    {
      var c = this.player1.hand[index];
      if (this.player1.mana.available >= c.cost && this.player1.mana.colors.has(c.color))
      {
        this.player1.field.push(this.player1.hand.splice(index, 1)[0]);
        this.player1.mana.available -= c.cost;
        this.emitState();
      }
    }
    else if(id == this.player2.id && id == this.turnPlayer.id && this.phase == 2)
    {
      var c = this.player2.hand[index];
      if (this.player2.mana.available >= c.cost && this.player2.mana.colors.has(c.color))
      {
        this.player2.field.push(this.player2.hand.splice(index, 1)[0]);
        this.player2.mana.available -= c.cost;
        this.emitState();
      }
          
    }
  }
  
  playMana(id, index)
  {
    if (id == this.player1.id && id == this.turnPlayer.id && this.phase == 1 && !this.player1.mana.charged)
    {
      var c = this.player1.hand.splice(index, 1)[0];
      this.player1.mana.contents.push(c);
      this.player1.mana.colors.add(c.color);
      this.player1.mana.total = this.player1.mana.total+1;
      this.player1.mana.available = this.player1.mana.available+1;
      this.player1.mana.charged = true;
      this.phase = 2;
      this.emitState();
    }
    else if(id == this.player2.id && id == this.turnPlayer.id && this.phase == 1 && !this.player2.mana.charged)
    {
      var c = this.player2.hand.splice(index, 1)[0];
      this.player2.mana.contents.push(c);
      this.player2.mana.colors.add(c.color);
      this.player2.mana.total = this.player2.mana.total+1;
      this.player2.mana.available = this.player2.mana.available+1;
      this.player2.mana.charged = true;
      this.phase = 2;
      this.emitState();
    }
  }
  
  breakShield(player)
  {
    if (player.shields.length > 0)
    {
      player.hand.push(player.shields.pop());
    }
    else
    {
      this.loser = player.id;
      if (this.player1.id == this.loser)
      {
        this.winner = this.player2.id;
      }
      else if (this.player2.id == this.loser)
      {
        this.winner = this.player1.id;
      }
    }
  }
  
  attackPlayer(id, index)
  {
    if (id == this.player1.id && id == this.turnPlayer.id && this.phase == 3)
    {
      var c = this.player1.field[index];
      if (c.canattack)
      {
        this.player1.field[index].canattack = false;
        this.player1.field[index].tapped = true;
        this.breakShield(this.player2);
        this.emitState();
      }
    }
    else if (id == this.player2.id && id == this.turnPlayer.id && this.phase == 3)
    {
      var c = this.player2.field[index];
      if (c.canattack)
      {
        this.player2.field[index].canattack = false;
        this.player2.field[index].tapped = true;
        this.breakShield(this.player1);
        this.emitState();
      }
    }
  }
  
  nextPhase(id)
  {
    if (id == this.player1.id && id == this.turnPlayer.id)
    {
      this.phase = this.phase + 1;
      if (this.phase > 3)
      {
        this.turnPlayer = this.player2;
        this.player2.mana.available = this.player2.mana.total;
        this.player2.hand.push(this.player2.deck.pop());
        this.player2.mana.charged = false;
        for (var i = 0; i < this.player2.field.length; i++)
        {
          this.player2.field[i].canattack = true;
          this.player2.field[i].tapped = false;
        }
        this.phase = 1;
      }
      this.emitState();
    }
    else if(id == this.player2.id && id == this.turnPlayer.id)
    {
      this.phase = this.phase + 1;
      if (this.phase > 3)
      {
        this.turnPlayer = this.player1;
        this.player1.hand.push(this.player1.deck.pop());
        this.player1.mana.available = this.player1.mana.total;
        this.player1.mana.charged = false;
        for (var i = 0; i < this.player1.field.length; i++)
        {
          this.player1.field[i].canattack = true;
          this.player1.field[i].tapped = false;
        }
        this.phase = 1;
      }
      this.emitState();
    }
  }
  
  emitState()
  {
    var p1_data = {};
    p1_data['hand'] = this.player1.hand;
    p1_data['oppHand'] = this.player2.hand.length;
    p1_data['inPlay'] = this.player1.field;
    p1_data['oppInPlay'] = this.player2.field;
    p1_data['turnPlayer'] = (this.turnPlayer == this.player1)
    p1_data['phase'] = this.phase;
    p1_data['mana'] = this.player1.mana;
    p1_data['oppMana'] = this.player2.mana;
    p1_data['shields'] = this.player1.shields.length;
    p1_data['oppShields'] = this.player2.shields.length;
    io.to(this.player1.id).emit('gamestate', p1_data);
    
    var p2_data = {};
    p2_data['hand'] = this.player2.hand;
    p2_data['oppHand'] = this.player1.hand.length;
    p2_data['inPlay'] = this.player2.field;
    p2_data['oppInPlay'] = this.player1.field;
    p2_data['turnPlayer'] = (this.turnPlayer == this.player2)
    p2_data['phase'] = this.phase;
    p2_data['mana'] = this.player2.mana;
    p2_data['oppMana'] = this.player1.mana;
    p2_data['shields'] = this.player2.shields.length;
    p2_data['oppShields'] = this.player1.shields.length;
    io.to(this.player2.id).emit('gamestate', p2_data);
  }
  
  setUp()
  {
    var i;
    for (i = 0; i < 40; i++)
    {
      var r1 = Math.floor((Math.random() * 9) + 1);
      this.player1.deck.push(new Card("Rusalka", "Creature", "Water", r1, r1*1000, "Trench Hunter"));
      var r2 = Math.floor((Math.random() * 1) + 1);
      this.player2.deck.push(new Card("Rusalka", "Creature", "Water", r2, r2*1000, "Trench Hunter"));
    }
    shuffle(this.player1.deck);
    shuffle(this.player2.deck);
    
    for (i = 0; i < 5; i++)
    {
      this.player1.shields.push(this.player1.deck.pop());
      this.player2.shields.push(this.player2.deck.pop());
    }
    
    for (i = 0; i < 5; i++)
    {
      this.player1.hand.push(this.player1.deck.pop());
      this.player2.hand.push(this.player2.deck.pop());
    }

    this.emitState();
  }
  
}

function shuffle(array) {
  var i = 0, j = 0, temp = null;
  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

class JSONSet extends Set {
    toJSON () {
        return [...this]
    }
}

class ManaZone
{
  constructor()
  {
    this.contents = [];
    this.colors = new JSONSet();
    this.total = 0;
    this.available = 0;
    this.charged = false;
  }
}

class Player 
{
  constructor(id)
  {
    this.id = id;
    this.deck = [];
    this.hand = [];
    this.field = [];
    this.shields = [];
    this.mana = new ManaZone();
  }
}

var Card = function(name, type, color, cost, power, race) {
  this.name = name;
  this.type = type;
  this.color = color;
  this.cost = cost;
  this.power = power;
  this.race = race;
  this.canattack = false;
  this.tapped = false;
};

var games = {};
var queue = null;

io.on('connection', function(socket){
  console.log('socket working');
  
  socket.on('connection', function() {
    console.log('a user connected');
    
    if (queue == null)
    {
      queue = socket.id;
    }
    else
    {
      var newgame = new Game(new Player(queue), new Player(socket.id));
      newgame.setUp();
      console.log(queue);
      console.log(socket.id);
      games[queue] = newgame;
      games[socket.id] = newgame;
      queue = null;
    }
    
  });
  
  socket.on('disconnect', function() {
    console.log('someone disconnected!');
  });
  
  socket.on('playcard', function(req) {
    var game = games[socket.id];
    if (game != null)
    {
      game.playCard(socket.id, req.index);
    }
  });
  
    socket.on('attackplayer', function(req) {
    var game = games[socket.id];
    if (game != null)
    {
      game.attackPlayer(socket.id, req.index);
      if (game.winner != 0)
      {
        console.log(game.winner);
        console.log(game.loser);
        io.to(game.winner).emit('win');
        io.to(game.loser).emit('loss');
        delete games[game.winner];
        delete games[game.loser];
      }
    }
  });
  
  socket.on('playmana', function(req) {
    var game = games[socket.id];
    if (game != null)
    {
      game.playMana(socket.id, req.index);
    }
  });
  
  socket.on('nextphase', function() {
    var game = games[socket.id];
    if (game != null)
    {
      game.nextPhase(socket.id);
    }
  });
  
});

