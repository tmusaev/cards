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

const phases = {
    MANA: 1,
    MAIN: 2,
    BATTLE: 3
}

class Game
{
  constructor(player1, player2)
  {
    this.winner = 0;
    this.loser = 0;
    this.player1 = player1;
    this.player2 = player2;
    /*var r = Math.floor((Math.random() * 2) + 1);
    if (r == 1)
    {
      this.turnPlayer = player1;
    }  
    else
    {
      this.turnPlayer = player2;
    }*/
    this.turnPlayer = player2;
    this.phase = 1;
    this.waitingOnBlock = false;
    this.attackingPlayer = null;
    this.attackerIndex = 0;
    this.defaultBlockerIndex = -1;
  }
  
  playCard(player, opp, index)
  {
    if (player.id == this.turnPlayer.id && this.phase == phases.MAIN)
    {
      var c = player.hand[index];
      if (typeof(c) == "undefined")
      {
        return;
      }
      if (player.mana.available >= c.cost && player.mana.colors.has(c.color))
      {
        player.field.push(player.hand.splice(index, 1)[0]);
        player.mana.available -= c.cost;
        this.emitState();
        c.OnEnter(this, player.id);
      }
    }
  }
  
  playMana(player, opp, index)
  {
    if (player.id == this.turnPlayer.id && this.phase == phases.MANA && !player.mana.charged)
    {
      var c = player.hand.splice(index, 1)[0];
      if (typeof(c) == "undefined")
      {
        return;
      }
      player.mana.contents.push(c);
      player.mana.colors.add(c.color);
      player.mana.total = player.mana.total+1;
      player.mana.available = player.mana.available+1;
      player.mana.charged = true;
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
  
  getBlockers(card, opp)
  {
    var blockers = [];
    for (var i = 0; i < opp.field.length; i++)
    {
      if (opp.field[i].blocker && !opp.field[i].tapped)
      {
        blockers.push(i);
      }
    }
    return blockers;
  }
  
  blockerChosen(player, opp, blockerIndex)
  {
    if (blockerIndex >= 0 && blockerIndex < player.field.length)
    {
      player.field[blockerIndex].OnBlock(this, player.id);
      this.emitStateMyCreatureBattleOppCreature(opp, this.attackerIndex, blockerIndex);
      this.emitStateOppCreatureBattleMyCreature(player, this.attackerIndex, blockerIndex);
      this.creatureBattle(opp, player, this.attackerIndex, blockerIndex);
    }
    else if (this.defaultBlockerIndex >= 0 && this.defaultBlockerIndex < player.field.length)
    {
      this.emitStateMyCreatureBattleOppCreature(opp, this.attackerIndex, this.defaultBlockerIndex);
      this.emitStateOppCreatureBattleMyCreature(player, this.attackerIndex, this.defaultBlockerIndex);
      this.creatureBattle(opp, player, this.attackerIndex, this.defaultBlockerIndex);
    }
    else
    {
      this.emitStateMyCreatureBattleOpp(opp, this.attackerIndex);
      this.emitStateOppCreatureBattleMe(player, this.attackerIndex);
      this.breakShield(player);
      opp.field[this.attackerIndex].OnEndAttack(this, opp.id);
      this.emitState();
    }
    this.waitingOnBlock = false;
    this.attackingPlayer = null;
    this.attackerIndex = 0;
    this.defaultBlockerIndex = -1;
  }
  
  attackPlayer(player, opp, index)
  {
    if (player.id == this.turnPlayer.id && this.phase == phases.BATTLE && !this.waitingOnBlock)
    {
      var c = player.field[index];
      if (c.canattack)
      {
        c.OnAttack(this, player.id);
        var blockers = this.getBlockers(c, opp);
        this.emitStateMyCreatureDeclareAtkPlayer(player, player.field[index], index);
        this.emitStateOppCreatureDeclareAtkPlayer(opp, player.field[index], index);
        if (blockers.length > 0)
        {
          this.waitingOnBlock = true;
          this.attackerIndex = index;
          this.defaultBlockerIndex = -1;
          this.attackingPlayer = player;
          this.emitStateChooseBlockers(opp, blockers);
        }
        else
        {
          this.emitStateMyCreatureBattleOpp(player, index);
          this.emitStateOppCreatureBattleMe(opp, index);
          this.breakShield(opp);
          c.OnEndAttack(this, player.id);
          this.emitState();
        }
      }
    }
  }
  
  attackCreature(player, opp, from, to)
  {
    if (player.id == this.turnPlayer.id && this.phase == phases.BATTLE && !this.waitingOnBlock)
    {
      var c = player.field[from];
      var d = opp.field[to];
      if (c.canattack && d.tapped)
      {
        c.OnAttack(this, player.id);
        var blockers = this.getBlockers(c, opp);
        this.emitStateMyCreatureDeclareAtkToCreature(player, c, from, to);
        this.emitStateOppCreatureDeclareAtkToCreature(opp, c, from, to);
        if (blockers.length > 0)
        {
          this.waitingOnBlock = true;
          this.attackerIndex = from;
          this.defaultBlockerIndex = to;
          this.attackingPlayer = player;
          this.emitStateChooseBlockers(opp, blockers);
        }
        else
        {
          this.emitStateMyCreatureBattleOppCreature(player, from, to);
          this.emitStateOppCreatureBattleMyCreature(opp, from, to);
          this.creatureBattle(player, opp, from, to);
        }
      }
    }
  }
  
  creatureBattle(player, opp, from, to)
  {
      var c = player.field[from];
      var d = opp.field[to];
      var c_dmg = c.power - d.power;
      var d_dmg = d.power - c.power;
      c.OnEndAttack(this, player.id);
      if (c_dmg <= 0)
      {
        this.destroyCreature(player, from);
      }
      if (d_dmg <= 0)
      {
        this.destroyCreature(opp, to);
      }
      this.emitState();
  }
  
  untapAll(player)
  {
    for (var i = 0; i < player.field.length; i++)
    {
      player.field[i].canattack = true;
      player.field[i].tapped = false;
    }
  }
  
  destroyCreature(player, index)
  {
    player.field.splice(index, 1)[0];
    if (this.player1.id == player.id)
    {
      this.emitStateDestroyMyCreature(player, index);
      this.emitStateDestroyOppCreature(this.player2, index);
    }
    else if(this.player2.id == player.id)
    {
      this.emitStateDestroyMyCreature(player, index);
      this.emitStateDestroyOppCreature(this.player1, index);
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
  
  nextPhase(player, opp)
  {
    if (player.id == this.turnPlayer.id && !this.waitingOnBlock)
    {
      this.phase = this.phase + 1;
      if (this.phase > 3)
      {
        this.turnPlayer = opp;
        this.resetMana(opp);
        this.untapAll(opp);
        this.drawCard(opp);
        this.phase = phases.MANA;
      }
      this.emitState();
    }
  }
  
  emitStateDestroyMyCreature(player, index)
  {
    var data = {};
    data['DestroyMyCreature'] = index;
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStateDestroyOppCreature(player, index)
  {
    var data = {};
    data['DestroyOppCreature'] = index;
    io.to(player.id).emit('gamestate', data);
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
  
  emitStateMyCreatureDeclareAtkToCreature(player, creature, from, to)
  {
    var data = {};
    data['MyCreatureDeclareAtkToCreature'] = [creature, from, to];
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStateOppCreatureDeclareAtkToCreature(player, creature, from, to)
  {
    var data = {};
    data['OppCreatureDeclareAtkToCreature'] = [creature, from, to];
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStateMyCreatureDeclareAtkPlayer(player, creature, index)
  {
    var data = {};
    data['MyCreatureDeclareAtkPlayer'] = [creature, index];
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStateOppCreatureDeclareAtkPlayer(player, creature, index)
  {
    var data = {};
    data['OppCreatureDeclareAtkPlayer'] = [creature, index];
    io.to(player.id).emit('gamestate', data);
  }
  
  emitStateChooseBlockers(player, blockers)
  {
    var data = {};
    data['ChooseBlockers'] = blockers;
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
    for (i = 0; i < 20; i++)
    {
      this.player1.deck.push(new AquaHulcus());
      this.player2.deck.push(new AquaHulcus());
      // var r1 = Math.floor((Math.random() * 3) + 1);
      // if (r1 == 1)
      // {
      //   this.player1.deck.push(new MightyShouter());
      //   this.player2.deck.push(new MightyShouter());
      // }
      // if (r1 == 2)
      // {
      //   this.player1.deck.push(new AquaHulcus());
      //   this.player2.deck.push(new AquaHulcus());
      // }
      // if (r1 == 3)
      // {
      //   this.player1.deck.push(new DeadlyFighterBraidClaw());
      //   this.player2.deck.push(new DeadlyFighterBraidClaw());
      // }
    }
    for (i = 0; i < 20; i++)
    {
      this.player1.deck.push(new MightyShouter());
      this.player2.deck.push(new MightyShouter());
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
    this.blocker = false;
  }
  OnEnter(game, id)
  {
    //default to do nothing
  }
  OnAttack(game, id)
  {
    this.tapped = true;
    this.attacking = true; 
  }
  OnEndAttack(game, id)
  {
    this.attacking = false;
  }
  OnBlock(game, id)
  {
    this.tapped = true;
  }
}

class MightyShouter extends Card
{
  constructor()
  {
    super();
    this.name = "Mighty Shouter";
    this.type = "Creature";
    this.color = "Green";
    this.cost = 1;
    this.power = 1000;
    this.race = "Beast Folk";
    this.text = "Power Attack +2000";
  }
  OnAttack(game, id)
  {
    super.OnAttack(game, id);
    this.power += 2000;
  }
  OnEndAttack(game, id)
  {
    super.OnEndAttack(game, id);
    this.power -= 2000;
  }
}

class AquaHulcus extends Card
{
  constructor()
  {
    super();
    this.name = "Aqua Hulcus";
    this.type = "Creature";
    this.color = "Blue";
    this.cost = 1;
    this.power = 2000;
    this.race = "Liquid People";
    //this.text = "OnEnter: Draw 1 card.";
    this.blocker = true;
    this.text = "Blocker";
  }
  
  // OnEnter(game, id)
  // {
  //   if (game.player1.id == id)
  //   {
  //     game.drawCard(game.player1);
  //   }
  //   else if (game.player2.id == id)
  //   {
  //     game.drawCard(game.player2);
  //   }
  //   game.emitState();
  // }
}

class DeadlyFighterBraidClaw extends Card
{
  constructor()
  {
    super();
    this.name = "Deadly Fighter Braid Claw";
    this.type = "Creature";
    this.color = "Red";
    this.cost = 1;
    this.power = 1000;
    this.race = "Dragonoid";
  }
}

class AstrocometDragon extends Card
{
  constructor()
  {
    super();
    this.name = "Astrocomet Dragon";
    this.type = "Creature";
    this.color = "Red";
    this.cost = 1;
    this.power = 6000;
    this.race = "Armored Dragon";
    this.text = "Power attack +4000";
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
    //var r1 = Math.floor((Math.random() * 2) + 1);
    this.cost = 2;
    this.power = 1000;
    this.race = "Trench Hunter";
    this.text = "OnEnter: Draw 1 card.";
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

class Rusalka2 extends Card
{
  constructor()
  {
    super();
    this.name = "Rusalka";
    this.type = "Creature";
    this.color = "Water";
    //var r1 = Math.floor((Math.random() * 2) + 1);
    this.cost = 3;
    this.power = 1000;
    this.race = "Trench Hunter";
    this.text = "OnEnter: Destroy 1 random enemy creature.";
  }

  OnEnter(game, id)
  {
    if (game.player1.id == id)
    {
      var len = game.player2.field.length;
      if (len > 0)
      {
        var r = Math.floor((Math.random() * len));
        game.destroyCreature(game.player2, r);
      }
    }
    else if (game.player2.id == id)
    {
      var len = game.player1.field.length;
      if (len > 0)
      {
        var r = Math.floor((Math.random() * len));
        game.destroyCreature(game.player1, r);
      }
    }
    game.emitState();
  }
}

class Rusalka3 extends Card
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
    }
  });
  
});

