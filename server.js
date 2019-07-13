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
        c.OnEnter(this, id);
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
        c.OnEnter(this, id);
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
        this.emitStateMyCreatureBattleOpp(this.player1, index);
        this.emitStateOppCreatureBattleMe(this.player2, index);
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
        this.emitStateMyCreatureBattleOpp(this.player2, index);
        this.emitStateOppCreatureBattleMe(this.player1, index);
        this.breakShield(this.player1);
        this.emitState();
      }
    }
  }
  
  attackCreature(id, from, to)
  {
    if (id == this.player1.id && id == this.turnPlayer.id && this.phase == 3)
    {
      var c = this.player1.field[from];
      var d = this.player2.field[to];
      if (c.canattack && d.tapped)
      {
        this.player1.field[from].canattack = false;
        this.player1.field[from].tapped = true;
        var c_dmg = c.power - d.power;
        var d_dmg = d.power - c.power;
        if (c_dmg <= 0)
        {
          this.player1.field.splice(from, 1)[0];
        }
        if (d_dmg <= 0)
        {
          this.player2.field.splice(to, 1)[0];
        }
        this.emitStateMyCreatureBattleOppCreature(this.player1, from, to);
        this.emitStateOppCreatureBattleMyCreature(this.player2, from, to);
        this.emitState();
      }
    }
    else if (id == this.player2.id && id == this.turnPlayer.id && this.phase == 3)
    {
      var c = this.player2.field[from];
      var d = this.player1.field[to];
      if (c.canattack && d.tapped)
      {
        this.player2.field[from].canattack = false;
        this.player2.field[from].tapped = true;
        var c_dmg = c.power - d.power;
        var d_dmg = d.power - c.power;
        if (c_dmg <= 0)
        {
          this.player2.field.splice(from, 1)[0];
        }
        if (d_dmg <= 0)
        {
          this.player1.field.splice(to, 1)[0];
        }
        this.emitStateMyCreatureBattleOppCreature(this.player2, from, to);
        this.emitStateOppCreatureBattleMyCreature(this.player1, from, to);
        this.emitState();
      }
    }
  }
  
  untapAll(player)
  {
    for (var i = 0; i < player.field.length; i++)
    {
      player.field[i].canattack = true;
      player.field[i].tapped = false;
    }
  }
  
  drawCard(player)
  {
    var c = player.deck.pop();
    player.hand.push(c);
    if (this.player1.id == player.id)
    {
      this.emitStateIDrawCard(player, c);
      this.emitStateOppDrawCard(this.player2);
    }
    else if(this.player2.id == player.id)
    {
      this.emitStateIDrawCard(player, c);
      this.emitStateOppDrawCard(this.player1);
    }
  }
  
  resetMana(player)
  {
    player.mana.available = player.mana.total;
    player.mana.charged = false;
  }
  
  nextPhase(id)
  {
    if (id == this.player1.id && id == this.turnPlayer.id)
    {
      this.phase = this.phase + 1;
      if (this.phase > 3)
      {
        this.turnPlayer = this.player2;
        this.resetMana(this.player2);
        this.untapAll(this.player2);
        this.drawCard(this.player2);
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
        this.resetMana(this.player1);
        this.untapAll(this.player1);
        this.drawCard(this.player1);
        this.phase = 1;
      }
      this.emitState();
    }
  }
  
  emitStateBattle()
  {
    var p1_data = {};
    p1_data['inPlay'] = this.player1.field;
    p1_data['oppInPlay'] = this.player2.field;
    io.to(this.player1.id).emit('gamestate', p1_data);
    
    var p2_data = {};
    p2_data['inPlay'] = this.player2.field;
    p2_data['oppInPlay'] = this.player1.field;
    io.to(this.player2.id).emit('gamestate', p2_data);
  }
  
  emitStateIDrawCard(player, c)
  {
    var data = {};
    data['IDrawCard'] = c;
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStateOppDrawCard(player)
  {
    var data = {};
    data['OppDrawCard'] = 1;
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStateMyCreatureBattleOpp(player, index)
  {
    var data = {};
    data['MyCreatureBattleOpp'] = index;
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStateOppCreatureBattleMe(player, index)
  {
    var data = {};
    data['OppCreatureBattleMe'] = index;
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStateMyCreatureBattleOppCreature(player, from, to)
  {
    var data = {};
    data['MyCreatureBattleOppCreature'] = [from, to];
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStateOppCreatureBattleMyCreature(player, from, to)
  {
    var data = {};
    data['OppCreatureBattleMyCreature'] = [from, to];
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStateIPlayCard(player, index)
  {
    var data = {};
    data['IPlayCard'] = index;
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStateOppPlayCard(player, index)
  {
    var data = {};
    data['OppPlayCard'] = index;
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStatePhase()
  {
    var p1_data = {};
    p1_data['turnPlayer'] = (this.turnPlayer == this.player1);
    p1_data['phase'] = this.phase;
    io.to(this.player1.id).emit('gamestate', p1_data);
    
    var p2_data = {};
    p2_data['turnPlayer'] = (this.turnPlayer == this.player2)
    p2_data['phase'] = this.phase;
    io.to(this.player2.id).emit('gamestate', p2_data);
  }
  
  emitStateMana()
  {
    var p1_data = {};
    p1_data['mana'] = this.player1.mana;
    p1_data['oppMana'] = this.player2.mana;
    io.to(this.player1.id).emit('gamestate', p1_data);
    
    var p2_data = {};
    p2_data['mana'] = this.player2.mana;
    p2_data['oppMana'] = this.player1.mana;
    io.to(this.player2.id).emit('gamestate', p2_data);
  }
  
  emitStateHand()
  {
    var p1_data = {};
    p1_data['hand'] = this.player1.hand;
    p1_data['oppHand'] = this.player2.hand.length;
    io.to(this.player1.id).emit('gamestate', p1_data);
    
    var p2_data = {};
    p2_data['hand'] = this.player2.hand;
    p2_data['oppHand'] = this.player1.hand.length;
    io.to(this.player2.id).emit('gamestate', p2_data);
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
      this.player1.deck.push(new Rusalka());
      this.player2.deck.push(new Rusalka());
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

class Card 
{
  constructor()
  {
    this.name = "";
    this.type = "";
    this.color = "";
    this.cost = 0;
    this.power = 0;
    this.race = "";
    this.canattack = false;
    this.tapped = false;
    this.attacking = false;
    this.beingattacked = false;
    this.attackingplayer = false;
    this.text = "";
  }
  OnEnter(game, id)
  {
    //default to do nothing
  }
}

class Rusalka extends Card
{
  constructor()
  {
    super();
    this.name = "Rusalka";
    this.type = "Creature";
    this.color = "Water";
    var r1 = Math.floor((Math.random() * 2) + 1);
    this.cost = r1;
    this.power = r1*1000;
    this.race = "Trench Hunter";
    this.text = "OnEnter: Draw a card.";
  }

  OnEnter(game, id)
  {
    if (game.player1.id == id)
    {
      game.drawCard(game.player1);
    }
    else if (game.player2.id == id)
    {
      game.drawCard(game.player2);
    }
    game.emitState();
  }
}

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
      var newgame = new Game(new Player(queue), new Player(socket.id));
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
      game.playCard(socket.id, req.index);
    }
  });
  
  socket.on('attackcreature', function(req) {
    var game = games[socket.id];
    if (game != null)
    {
      game.attackCreature(socket.id, req.from, req.to);
    }
  });  

  socket.on('attackplayer', function(req) {
    var game = games[socket.id];
    if (game != null)
    {
      game.attackPlayer(socket.id, req.index);
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

