var Cards = require('./cards.js');

const phases = {
    MANA: 1,
    MAIN: 2,
    BATTLE: 3
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

class StackObj
{
  constructor(card, player, opp)
  {
    this.card = card;
    this.player = player;
    this.opp = opp;
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
    this.requiredAttackers = 0;
  }
}

class Game
{
  constructor(io, player1_id, player2_id)
  {
    this.winner = 0;
    this.loser = 0;
    this.io = io;
    this.player1 = new Player(player1_id);
    this.player2 = new Player(player2_id);
    var r = Math.floor((Math.random() * 2) + 1);
    if (r == 1)
    {
      this.turnPlayer = this.player1;
    }  
    else
    {
      this.turnPlayer = this.player2;
    }
    //this.turnPlayer = this.player2;
    this.phase = 1;
    this.waitingOnBlock = false;
    this.attackingPlayer = null;
    this.attackerIndex = 0;
    this.defaultBlockerIndex = -1;
    this.waitForTargets = false;
    this.waitForTargetsSrc = null;
    this.stack = [];
  }
  
  IsWaiting()
  {
    if (this.waitingOnBlock || this.waitForTargets)
    {
      return true;
    }
    return false;
  }
  
  resolveStack()
  {
    //var stackObj = this.stack.pop();
    if (this.stack.length == 0)
    {
      return;
    }
    this.emitStateStack();
    var stackObj = this.stack[this.stack.length-1];
    var c = stackObj.card;
    c.Resolve(this, stackObj.player, stackObj.opp, c, -1);
    if (!this.waitForTargets && this.stack.length > 0)
    {
      this.stack.pop();
      this.emitStateStack();
      this.resolveStack();
    }
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
        if (c.type == "Creature")
        {
          player.field.push(player.hand.splice(index, 1)[0]);
          player.mana.available -= c.cost;
          this.emitState();
          c.OnEnter(this, player, opp, c, player.field.length-1);
          //this.emitState();
          this.resolveStack();
        }
        else if (c.type == "Spell")
        {
          player.hand.splice(index, 1)[0];
          player.mana.available -= c.cost;
          this.stack.push(new StackObj(c, player, opp));
          this.emitState();
          this.resolveStack();
          //c.OnEnter(this, player, opp, c, -1);
        }
      }
    }
  }
  
  requestTargets(player, opp, targets, num, card, index)
  {
    this.emitStateRequestTargets(player, targets, num, card, index);
    //this.emitStateOppRequestTargets(opp, card);
  }
  
  targetSelected(player, opp, index)
  {
    this.stack.pop();
    this.waitForTargetsSrc.TargetReturned(this, player, opp, index);
    this.waitForTargets = false;
    this.waitForTargetsSrc = null;
    if (this.stack.length > 0)
    {
      this.resolveStack();
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
  
  pushStack(c, player, opp)
  {
    this.stack.push(new StackObj(c, player, opp));
  }
  
  breakShield(player, opp)
  {
    var c = player.shields.pop();
    if (typeof(c) != "undefined")
    {
      if (c.shieldblast == true)
      {
        this.stack.push(new StackObj(c, player, opp));
      }
      else
      {
        player.hand.push(c);
      }
    }
  }
  
  breakShields(player, c, opp)
  {
    if (player.shields.length > 0)
    {
      if (c.power >= 24000)
      {
        this.breakShield(player, opp);
        this.breakShield(player, opp);
        this.breakShield(player, opp);
        this.breakShield(player, opp);
        this.breakShield(player, opp);
      }
      else if (c.power >= 18000)
      {
        this.breakShield(player, opp);
        this.breakShield(player, opp);
        this.breakShield(player, opp);
        this.breakShield(player, opp);
      }
      else if (c.power >= 12000)
      {
        this.breakShield(player, opp);
        this.breakShield(player, opp);
        this.breakShield(player, opp);
      }
      else if (c.power >= 6000)
      {
        this.breakShield(player, opp);
        this.breakShield(player, opp);
      }
      else
      {
        this.breakShield(player, opp);
      }
      this.emitState();
      if (this.stack.length > 0)
      {
        this.resolveStack();
      }
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
  
  getBlockers(card, opp, index)
  {
    var blockers = [];
    if (card.unblockable)
    {
      return blockers;
    }
    for (var i = 0; i < opp.field.length; i++)
    {
      if (opp.field[i].blocker && !opp.field[i].tapped && i != index)
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
      this.breakShields(player, opp.field[this.attackerIndex], opp);
      opp.field[this.attackerIndex].OnEndAttack(this, player, opp, opp.field[this.attackerIndex], this.attackerIndex);
      //this.emitState();
    }
    this.waitingOnBlock = false;
    this.attackingPlayer = null;
    this.attackerIndex = 0;
    this.defaultBlockerIndex = -1;
  }
  
  attackPlayer(player, opp, index)
  {
    if (player.id == this.turnPlayer.id && this.phase == phases.BATTLE)
    {
      var c = player.field[index];
      if (c.canattack)
      {
        c.OnDeclareAttack(this, player, opp, c, index);
        var blockers = this.getBlockers(c, opp, -1);
        this.emitStateMyCreatureDeclareAtkPlayer(player, player.field[index], index);
        this.emitStateOppCreatureDeclareAtkPlayer(opp, player.field[index], index);
        c.OnAttack(this, player, opp, c, index);
        //this.emitState();
        this.resolveStack();
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
          this.breakShields(opp, c, player);
          c.OnEndAttack(this, player, opp, c, index);
          //this.emitState();
        }
      }
    }
  }
  
  attackCreature(player, opp, from, to)
  {
    if (player.id == this.turnPlayer.id && this.phase == phases.BATTLE)
    {
      var c = player.field[from];
      var d = opp.field[to];
      if ((c.canattack || c.fastSkirmish) && (d.tapped || c.atkuntapped))
      {
        c.OnDeclareAttack(this, player, opp, c, from);
        var blockers = this.getBlockers(c, opp, to);
        this.emitStateMyCreatureDeclareAtkToCreature(player, c, from, to);
        this.emitStateOppCreatureDeclareAtkToCreature(opp, c, from, to);
        c.OnAttack(this, player, opp, c, from);
        //this.emitState();
        this.resolveStack();
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
      c.OnEndAttack(this, player, opp, c, from);
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
      if (!player.field[i].guard)
      {
        player.field[i].canattack = true;
      }
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
    if (player.id == this.turnPlayer.id)
    {
      if (this.phase + 1 > 3)
      {
        for (var i = 0; i < player.field.length; i++)
        {
          if (player.field[i].mustattack && player.field[i].canattack && !player.field[i].tapped)
          {
            return;
          }
        }
      }
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
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateDestroyOppCreature(player, index)
  {
    var data = {};
    data['DestroyOppCreature'] = index;
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateIDrawCard(player, c)
  {
    var data = {};
    data['IDrawCard'] = c;
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateOppDrawCard(player)
  {
    var data = {};
    data['OppDrawCard'] = 1;
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateRequestTargets(player, targets, num, card, index)
  {
    var data = {};
    data['RequestTargets'] = [targets, num, index, card];
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateOppRequestTargets(player, card)
  {
    var data = {};
    data['OppRequestTargets'] = card;
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateMyCreatureDeclareAtkToCreature(player, creature, from, to)
  {
    var data = {};
    data['MyCreatureDeclareAtkToCreature'] = [creature, from, to];
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateOppCreatureDeclareAtkToCreature(player, creature, from, to)
  {
    var data = {};
    data['OppCreatureDeclareAtkToCreature'] = [creature, from, to];
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateMyCreatureDeclareAtkPlayer(player, creature, index)
  {
    var data = {};
    data['MyCreatureDeclareAtkPlayer'] = [creature, index];
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateOppCreatureDeclareAtkPlayer(player, creature, index)
  {
    var data = {};
    data['OppCreatureDeclareAtkPlayer'] = [creature, index];
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateChooseBlockers(player, blockers)
  {
    var data = {};
    data['ChooseBlockers'] = blockers;
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateMyCreatureBattleOpp(player, index)
  {
    var data = {};
    data['MyCreatureBattleOpp'] = index;
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateOppCreatureBattleMe(player, index)
  {
    var data = {};
    data['OppCreatureBattleMe'] = index;
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateMyCreatureBattleOppCreature(player, from, to)
  {
    var data = {};
    data['MyCreatureBattleOppCreature'] = [from, to];
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateOppCreatureBattleMyCreature(player, from, to)
  {
    var data = {};
    data['OppCreatureBattleMyCreature'] = [from, to];
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateStack()
  {
    var p1_data = {};
    var p2_data = {};
    var s = [];
    for (var i = 0; i < this.stack.length; i++)
    {
      s.push(this.stack[i].card);
    }
    p1_data['stack'] = s;
    p2_data['stack'] = s;
    this.io.to(this.player1.id).emit('gamestate', p1_data);
    this.io.to(this.player2.id).emit('gamestate', p2_data);
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
    var s = [];
    for (var i = 0; i < this.stack.length; i++)
    {
      s.push(this.stack[i].card);
    }
    p1_data['stack'] = s;
    this.io.to(this.player1.id).emit('gamestate', p1_data);
    
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
    p2_data['stack'] = s;
    this.io.to(this.player2.id).emit('gamestate', p2_data);
  }
  
  setUp()
  {
//     this.player1.deck.push(new Cards.HydroSpy());
//     this.player1.deck.push(new Cards.HydroSpy());
//     this.player1.deck.push(new Cards.AquaSeneschal());
//     this.player1.deck.push(new Cards.AquaSeneschal());
//     this.player1.deck.push(new Cards.KingNautilus());
//     this.player1.deck.push(new Cards.KingNautilus());
//     this.player1.deck.push(new Cards.Frogzooka());
//     this.player1.deck.push(new Cards.Frogzooka());
//     this.player1.deck.push(new Cards.ReefEye());
//     this.player1.deck.push(new Cards.ReefEye());
//     this.player1.deck.push(new Cards.HydrobotCrab());
//     this.player1.deck.push(new Cards.HydrobotCrab());
//     this.player1.deck.push(new Cards.KingPontias());
//     this.player1.deck.push(new Cards.KingPontias());
//     this.player1.deck.push(new Cards.Draglide());
//     this.player1.deck.push(new Cards.Draglide());
//     this.player1.deck.push(new Cards.Tatsurion());
//     this.player1.deck.push(new Cards.Tatsurion());
//     this.player1.deck.push(new Cards.BlazeBelcher());
//     this.player1.deck.push(new Cards.BlazeBelcher());
//     this.player1.deck.push(new Cards.Flametropus());
//     this.player1.deck.push(new Cards.Flametropus());
//     this.player1.deck.push(new Cards.PyroTrooper());
//     this.player1.deck.push(new Cards.PyroTrooper());
//     this.player1.deck.push(new Cards.GatlingSkyterror());
//     this.player1.deck.push(new Cards.GatlingSkyterror());
//     this.player1.deck.push(new Cards.SimianTrooperGrash());
//     this.player1.deck.push(new Cards.SimianTrooperGrash());
//     this.player1.deck.push(new Cards.LittleHissy());
//     this.player1.deck.push(new Cards.LittleHissy());
    
//     this.player2.deck.push(new Cards.HydroSpy());
//     this.player2.deck.push(new Cards.HydroSpy());
//     this.player2.deck.push(new Cards.AquaSeneschal());
//     this.player2.deck.push(new Cards.AquaSeneschal());
//     this.player2.deck.push(new Cards.KingNautilus());
//     this.player2.deck.push(new Cards.KingNautilus());
//     this.player2.deck.push(new Cards.Frogzooka());
//     this.player2.deck.push(new Cards.Frogzooka());
//     this.player2.deck.push(new Cards.ReefEye());
//     this.player2.deck.push(new Cards.ReefEye());
//     this.player2.deck.push(new Cards.HydrobotCrab());
//     this.player2.deck.push(new Cards.HydrobotCrab());
//     this.player2.deck.push(new Cards.KingPontias());
//     this.player2.deck.push(new Cards.KingPontias());
//     this.player2.deck.push(new Cards.Draglide());
//     this.player2.deck.push(new Cards.Draglide());
//     this.player2.deck.push(new Cards.Tatsurion());
//     this.player2.deck.push(new Cards.Tatsurion());
//     this.player2.deck.push(new Cards.BlazeBelcher());
//     this.player2.deck.push(new Cards.BlazeBelcher());
//     this.player2.deck.push(new Cards.Flametropus());
//     this.player2.deck.push(new Cards.Flametropus());
//     this.player2.deck.push(new Cards.PyroTrooper());
//     this.player2.deck.push(new Cards.PyroTrooper());
//     this.player2.deck.push(new Cards.GatlingSkyterror());
//     this.player2.deck.push(new Cards.GatlingSkyterror());
//     this.player2.deck.push(new Cards.SimianTrooperGrash());
//     this.player2.deck.push(new Cards.SimianTrooperGrash());
//     this.player2.deck.push(new Cards.LittleHissy());
//     this.player2.deck.push(new Cards.LittleHissy());
    var i;
    for (i = 0; i < 20; i++)
    {
      this.player1.deck.push(new Cards.Razorkinder());
      this.player2.deck.push(new Cards.Razorkinder());
    }
    for (i = 0; i < 20; i++)
    {
      this.player1.deck.push(new Cards.HydroSpy());
      this.player2.deck.push(new Cards.HydroSpy());
    }
    shuffle(this.player1.deck);
    shuffle(this.player2.deck);
    
    for (var i = 0; i < 5; i++)
    {
      this.player1.shields.push(new Cards.TerrorPit());
      this.player2.shields.push(new Cards.TerrorPit());
      //this.player1.shields.push(this.player1.deck.pop());
      //this.player2.shields.push(this.player2.deck.pop());
    }
    
    for (var i = 0; i < 5; i++)
    {
      this.player1.hand.push(this.player1.deck.pop());
      this.player2.hand.push(this.player2.deck.pop());
    }

    this.emitState();
  }
  
}

module.exports = {
  Game : Game
}
