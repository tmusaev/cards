var CardFactory = require('./cards.js');
var fs = require('fs');

const TURN_LENGTH = 90; //seconds
const BLOCK_LENGTH = 30; //seconds
const TARG_LENGTH = 30; //seconds

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

function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        clearTimeout(timerId);
        remaining -= Date.now() - start;
    };

    this.resume = function() {
        start = Date.now();
        clearTimeout(timerId);
        timerId = setTimeout(callback, remaining);
    };
  
    this.getTimeLeft = function() {
        return remaining;
    }

    this.resume();
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
  constructor(id, username)
  {
    this.id = id;
    this.name = username;
    this.deck = [];
    this.hand = [];
    this.field = [];
    this.shields = [];
    this.mana = new ManaZone();
    this.requiredAttackers = 0;
    this.attribList = [];
  }
}

class Game
{
  constructor(io, player1_id, player2_id, p1_name, p2_name, p1_deck, p2_deck, cardFactory, EndGame)
  {
    this.winner = 0;
    this.loser = 0;
    this.io = io;
    this.cardFactory = cardFactory;
    this.EndGame = EndGame;
    //this.player1 = new Player(player1_id, p1_name);
    //this.player2 = new Player(player2_id, p2_name);
    this.p1ready = false;
    this.p2ready = false;
    this.timeLeft = 0;
    var r = Math.floor((Math.random() * 2) + 1);
    this.player1 = new Player(player1_id, p1_name);
    this.player2 = new Player(player2_id, p2_name);
    this.p1_deck = p1_deck;
    this.p2_deck = p2_deck;
    if (r == 1)
    {
      // this.player1 = new Player(player1_id, p1_name);
      // this.player2 = new Player(player2_id, p2_name);
      this.turnPlayer = this.player1;
    }  
    else
    {
      // this.player2 = new Player(player1_id, p1_name);
      // this.player1 = new Player(player2_id, p2_name);
      this.turnPlayer = this.player2;
    }
    this.timer = new Timer(() => {
      this.endTurn(this.turnPlayer, (this.turnPlayer.id == this.player1.id) ? this.player2 : this.player1);
      this.emitState();
    }, TURN_LENGTH*1000);
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
  
  recalculateAttributes()
  {
    for (var i = 0; i < this.player1.field.length; i++)
    {
      this.player1.field[i].attributes = [];
      for (var j = 0; j < this.player1.attribList.length; j++)
      {
        this.player1.attribList[j].ApplyAttribute(this, this.player1, this.player2, this.player1.field[i]);
      }
      for (var j = 0; j < this.player2.attribList.length; j++)
      {
        this.player2.attribList[j].ApplyAttribute(this, this.player2, this.player1, this.player1.field[i]);
      }
    }
    for (var i = 0; i < this.player2.field.length; i++)
    {
      this.player2.field[i].attributes = [];
      for (var j = 0; j < this.player1.attribList.length; j++)
      {
        this.player1.attribList[j].ApplyAttribute(this, this.player1, this.player2, this.player2.field[i]);
      }
      for (var j = 0; j < this.player2.attribList.length; j++)
      {
        this.player2.attribList[j].ApplyAttribute(this, this.player2, this.player1, this.player2.field[i]);
      }
    }
    this.emitState();
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
          //this.emitState();
          for (var i = 0; i < player.attribList.length; i++)
          {
            player.attribList[i].ApplyAttribute(this, player, opp, c);
          }
          for (var i = 0; i < opp.attribList.length; i++)
          {
            opp.attribList[i].ApplyAttribute(this, opp, player, c);
          }
          this.emitState();
          c.OnEnter(this, player, opp, c, player.field.length-1);
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
    this.waitForTargets = true;
    this.waitForTargetsSrc = card;
    this.timer.pause();
    this.timeLeft = this.timer.getTimeLeft();
    this.timer = new Timer(() => {
      this.emitStateTimeOut(player);
      var ran_idx = Math.floor(Math.random() * targets.length);
      this.targetSelected(player, opp, targets[ran_idx]);
    }, TARG_LENGTH*1000);
    this.emitStateTimerSet(player, TARG_LENGTH);
    this.emitStateTimerSet(opp, TARG_LENGTH);
    this.emitStateRequestTargets(player, targets, num, card, index);
    //this.emitStateOppRequestTargets(opp, card);
  }
  
  requestTargetsInHand(player, opp, num, card)
  {
    this.waitForTargets = true;
    this.waitForTargetsSrc = card;
    this.timer.pause();
    this.timeLeft = this.timer.getTimeLeft();
    this.timer = new Timer(() => {
      this.emitStateTimeOut(player);
      var ran_idx = Math.floor(Math.random() * player.hand.length);
      this.targetSelected(player, opp, [1,ran_idx]);
    }, TARG_LENGTH*1000);
    this.emitStateTimerSet(player, TARG_LENGTH);
    this.emitStateTimerSet(opp, TARG_LENGTH);
    this.emitStateRequestTargetsInHand(player, num, card);
  }
  
  targetSelected(player, opp, index)
  {
    this.timer.pause();
    this.timer = new Timer(() => {
      this.endTurn(this.turnPlayer, (this.turnPlayer.id == this.player1.id) ? this.player2 : this.player1);
      this.emitState();
    }, this.timeLeft);
    this.emitStateTimerSet(player, Math.floor(this.timeLeft/1000));
    this.emitStateTimerSet(opp, Math.floor(this.timeLeft/1000));
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
      this.emitStateChargeMana(player, opp, c.color);
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
    var power = c.ComputePower();
    if (player.shields.length > 0)
    {
      if (power >= 24000)
      {
        this.breakShield(player, opp);
        this.breakShield(player, opp);
        this.breakShield(player, opp);
        this.breakShield(player, opp);
        this.breakShield(player, opp);
      }
      else if (power >= 18000)
      {
        this.breakShield(player, opp);
        this.breakShield(player, opp);
        this.breakShield(player, opp);
        this.breakShield(player, opp);
      }
      else if (power >= 12000)
      {
        this.breakShield(player, opp);
        this.breakShield(player, opp);
        this.breakShield(player, opp);
      }
      else if (power >= 6000)
      {
        this.breakShield(player, opp);
        this.breakShield(player, opp);
      }
      else
      {
        this.breakShield(player, opp);
      }
      this.emitState();
      c.OnEndAttack(this, opp, player, c, opp.field.indexOf(c));
      if (this.stack.length > 0)
      {
        this.resolveStack();
      }
    }
    else
    {
      c.OnEndAttack(this, opp, player, c, opp.field.indexOf(c));
      if (this.stack.length > 0)
      {
        this.resolveStack();
      }
      this.loser = player.id;
      if (this.player1.id == this.loser)
      {
        this.winner = this.player2.id;
      }
      else if (this.player2.id == this.loser)
      {
        this.winner = this.player1.id;
      }
      this.timer.pause();
      this.EndGame(this);
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
      if (opp.field[i].blocker && !opp.field[i].tapped && i != index && card.ValidBlocker(opp.field[i]))
      {
        opp.field[i].validblocker = true;
        blockers.push(i);
      }
    }
    return blockers;
  }
  
  blockerChosen(player, opp, blockerIndex)
  {
    this.timer.pause();
    this.timer = new Timer(() => {
      this.endTurn(opp, player);
      this.emitState();
    }, this.timeLeft);
    this.emitStateTimerSet(player, Math.floor(this.timeLeft/1000));
    this.emitStateTimerSet(opp, Math.floor(this.timeLeft/1000));
    
    for (var i = 0; i < player.field.length; i++)
    {
        player.field[i].validblocker = false;
    }
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
      //opp.field[this.attackerIndex].OnEndAttack(this, opp, player, opp.field[this.attackerIndex], this.attackerIndex);
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
      if (c.canattack && !c.skirmisher)
      {
        c.OnDeclareAttack(this, player, opp, c, -1);
        this.emitStateMyCreatureDeclareAtkPlayer(player, c, player.field.indexOf(c));
        this.emitStateOppCreatureDeclareAtkPlayer(opp, c, player.field.indexOf(c));
        c.OnAttack(this, player, opp, c, index);
        this.resolveStack();
        var blockers = this.getBlockers(c, opp, -1);
        this.emitState();
        if (blockers.length > 0)
        {
          this.waitingOnBlock = true;
          this.attackerIndex = index;
          this.defaultBlockerIndex = -1;
          this.attackingPlayer = player;
          this.timer.pause();
          this.timeLeft = this.timer.getTimeLeft();
          this.timer = new Timer(() => {
            this.emitStateTimeOut(opp);
            this.blockerChosen(opp, player, this.defaultBlockerIndex);
          }, BLOCK_LENGTH*1000);
          this.emitStateTimerSet(player, BLOCK_LENGTH);
          this.emitStateTimerSet(opp, BLOCK_LENGTH);
          this.emitStateChooseBlockers(opp, blockers);
        }
        else
        {
          this.emitStateMyCreatureBattleOpp(player, player.field.indexOf(c));
          this.emitStateOppCreatureBattleMe(opp, player.field.indexOf(c));
          this.breakShields(opp, c, player);
          //c.OnEndAttack(this, player, opp, c, index);
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
      var atkuntp = c.atkuntapped;
      for (var i = 0; i < c.attributes.length; i++)
      {
        if (c.attributes[i].attribute == "atkuntapped")
        {
          atkuntp = true;
        }
      }
      if ((c.canattack || c.fastSkirmish) && (d.tapped || atkuntp))
      {
        c.OnDeclareAttack(this, player, opp, c, to);
        this.emitStateMyCreatureDeclareAtkToCreature(player, c, from, to);
        this.emitStateOppCreatureDeclareAtkToCreature(opp, c, from, to);
        c.OnAttack(this, player, opp, c, from);
        this.resolveStack();
        var blockers = this.getBlockers(c, opp, to);
        this.emitState();
        if (blockers.length > 0)
        {
          this.waitingOnBlock = true;
          this.attackerIndex = from;
          this.defaultBlockerIndex = to;
          this.attackingPlayer = player;
          this.timer.pause();
          this.timeLeft = this.timer.getTimeLeft();
          this.timer = new Timer(() => {
            this.emitStateTimeOut(opp);
            this.blockerChosen(opp, player, this.defaultBlockerIndex);
          }, BLOCK_LENGTH*1000);
          this.emitStateTimerSet(player, BLOCK_LENGTH);
          this.emitStateTimerSet(opp, BLOCK_LENGTH);
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
      var c_dmg = c.ComputePower() - d.ComputePower();
      var d_dmg = d.ComputePower() - c.ComputePower();
      if (c_dmg <= 0)
      {
        this.destroyCreature(player, opp, player.field.indexOf(c));
        if (d_dmg > 0 && c.slayer)
        {
          this.destroyCreature(opp, player, opp.field.indexOf(d));
        }
      }
      if (d_dmg <= 0)
      {
        this.destroyCreature(opp, player, opp.field.indexOf(d));
        if (c_dmg > 0 && d.slayer)
        {
          this.destroyCreature(player, opp, player.field.indexOf(c));
        }
      }
      if (c_dmg > 0)
      {
        c.OnWinBattle(this, player, opp, c);
        c.OnEndAttack(this, player, opp, c, player.field.indexOf(c));
      }
      if (d_dmg > 0)
      {
        d.OnWinBattle(this, opp, player, d);
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
  
  destroy(player, opp, index)
  {
    if (index[0] == 0)
    {
      this.destroyCreature(player, opp, index[1]);
    }
    else if (index[0] == 1)
    {
      this.destroyCreature(opp, player, index[1]);
    }
    this.emitState();
  }
  
  trap(player, opp, index)
  {
    if (index[0] == 0)
    {
      this.trapCreature(player, opp, index[1]);
    }
    else if (index[0] == 1)
    {
      this.trapCreature(opp, player, index[1]);
    }
    //this.emitState();
  }
  
  targettedEffect(player, opp, card, index, filters)
  {
    var targets = [];
    if (!filters.includes("enemy"))
    {
      for (var i = 0; i < player.field.length; i++)
      {
        if (filters.includes("untapped"))
        {
          if (!opp.field[i].tapped)
          {
            targets.push([1,i]);
          }
        }
      }
    }
    if (!filters.includes("friendly"))
    {
      for (var i = 0; i < opp.field.length; i++)
      {
        if (filters.includes("untapped"))
        {
          if (!opp.field[i].tapped)
          {
            targets.push([1,i]);
          }
        }
      }
    }
    if (targets.length > 0)
    {
      this.requestTargets(player, opp, targets, 1, card, index);
    }
  }
  
  resolveAction(player, opp, index, action)
  {
    if (action == 'destroy')
    {
      this.destroy(player, opp, index);
    }
  }
  
  destroyCreature(player, opp, index)
  {
    if (index < 0 || index >= player.field.length)
    {
      return;
    }
    console.log("destroy index: "+index);
    var c = player.field.splice(index, 1)[0];
    this.emitStateDestroyMyCreature(player, index);
    this.emitStateDestroyOppCreature(opp, index);
    c.OnExit(this, player, opp, c);
  }
  
  trapCreature(player, opp, index)
  {
    if (index < 0 || index >= player.field.length)
    {
      return;
    }
    console.log("trap index: "+index);
    var c = player.field.splice(index, 1)[0];
    player.mana.contents.push(c);
    player.mana.colors.add(c.color);
    player.mana.total = player.mana.total+1;
    player.mana.available = player.mana.available+1;
    this.emitState();
    this.emitStateChargeMana(player, opp, c.color);
    //this.emitStateDestroyMyCreature(player, index);
    //this.emitStateDestroyOppCreature(opp, index);
    c.OnExit(this, player, opp, c);
  }
  
  bounceCreature(player, opp, index)
  {
    if (index < 0 || index >= player.field.length)
    {
      return;
    }
    console.log("bounce index: "+index);
    var c = player.field.splice(index, 1)[0];
    //player.hand.push(CardFactory(c.name));
    player.hand.push(this.cardFactory.GetCard(c.name));
    c.OnExit(this, player, opp, c);
  }
  
  discardCard(player, opp, index)
  {
    if (index < 0 || index >= player.hand.length)
    {
      return;
    }
    console.log("discard index: "+index);
    player.hand.splice(index, 1)[0];
  }
  
  chargeCard(player, opp)
  {
    var c = player.deck.pop();
    player.mana.contents.push(c);
    player.mana.colors.add(c.color);
    player.mana.total = player.mana.total+1;
    player.mana.available = player.mana.available+1;
    this.emitState();
    this.emitStateChargeMana(player, opp, c.color);
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
        this.endTurn(player, opp);
        // this.turnPlayer = opp;
        // this.resetMana(opp);
        // this.untapAll(opp);
        // this.drawCard(opp);
        // this.phase = phases.MANA;
      }
      this.emitState();
    }
  }
  
  endTurn(turnPlayer, nextPlayer)
  {
    this.timer.pause();
    for (var i = 0; i < turnPlayer.attribList.length; i++)
    {
      turnPlayer.attribList[i].OnEndAttrib(this, turnPlayer, nextPlayer);
    }
    this.turnPlayer = nextPlayer;
    this.resetMana(nextPlayer);
    this.untapAll(nextPlayer);
    this.drawCard(nextPlayer);
    this.phase = phases.MANA;
    this.timer = new Timer(() => {
      this.endTurn(nextPlayer, turnPlayer);
      this.emitState();
    }, TURN_LENGTH*1000);
    this.emitStateTimerSet(nextPlayer, TURN_LENGTH);
    this.emitStateTimerSet(turnPlayer, TURN_LENGTH);
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
  
  emitStateChargeMana(player, opp, color)
  {
    var p1_data = {};
    var p2_data = {};
    p1_data['ChargeMana'] = color;
    p2_data['OppChargeMana'] = color;
    this.io.to(player.id).emit('gamestate', p1_data);
    this.io.to(opp.id).emit('gamestate', p2_data);
  }
  
  emitStateMyAreaOfEffect(player, opp, color)
  {
    var data = {};
    var data2 = {};
    data['MyAreaOfEffect'] = color;
    data2['OppAreaOfEffect'] = color;
    this.io.to(player.id).emit('gamestate', data);
    this.io.to(opp.id).emit('gamestate', data2);
  }
  
  emitStateTimeOut(player)
  {
    this.io.to(player.id).emit('timeOut');
  }
  
  emitStateTimerSet(player, value)
  {
    var data = {};
    data['setTimer'] = value;
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateRequestTargets(player, targets, num, card, index)
  {
    var data = {};
    data['RequestTargets'] = [targets, num, index, card];
    this.io.to(player.id).emit('gamestate', data);
  }
  
  emitStateRequestTargetsInHand(player, num, card)
  {
    var data = {};
    data['RequestTargetsInHand'] = num;
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
  
  emitStatePopStack()
  {
    var p1_data = {};
    var p2_data = {};
    p1_data['popstack'] = 1;
    p2_data['popstack'] = 1;
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
    p1_data['username'] = this.player1.name;
    p1_data['oppUsername'] = this.player2.name;
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
    p2_data['username'] = this.player2.name;
    p2_data['oppUsername'] = this.player1.name;
    this.io.to(this.player2.id).emit('gamestate', p2_data);
  }
  
  setUp()
  {    
    //console.log(this.p1_deck);
    //console.log(this.p2_deck);
    
    //Prod
    // for (var i = 0; i < this.p1_deck.length; i++)
    // {
    //   this.player1.deck.push(this.cardFactory.GetCard(this.p1_deck[i].name));
    // }
    // for (var i = 0; i < this.p2_deck.length; i++)
    // {
    //   this.player2.deck.push(this.cardFactory.GetCard(this.p2_deck[i].name));
    // }
    //Prod
    
//     var fn_deck = [];
//     var wd_deck = [];
    
//     var text = fs.readFileSync("./firenature.txt").toString('utf-8');
//     var textByLine = text.split("\n")
//     for (var i = 0; i < textByLine.length; i++)
//     {
//       var line = textByLine[i];
//       var quantity = parseInt(line.slice(0,1));
//       var name = line.slice(2);
//       for (var j = 0; j < quantity; j++)
//       {
//         var c = CardFactory(name);
//         if (c != null && c != 'undefined')
//         {
//           //this.player1.deck.push(CardFactory(name));
//           fn_deck.push(CardFactory(name));
//         }
//       }
//     }
//     var text = fs.readFileSync("./waterdark.txt").toString('utf-8');
//     var textByLine = text.split("\n")
//     for (var i = 0; i < textByLine.length; i++)
//     {
//       var line = textByLine[i];
//       var quantity = parseInt(line.slice(0,1));
//       var name = line.slice(2);
//       for (var j = 0; j < quantity; j++)
//       {
//         var c = CardFactory(name);
//         if (c != null && c != 'undefined')
//         {
//           //this.player2.deck.push(CardFactory(name));
//           wd_deck.push(CardFactory(name));
//         }
//       }
//     }
    // var r = Math.floor((Math.random() * 2) + 1);
    // if (r == 1)
    // {
    //   this.player1.deck = fn_deck;
    // }  
    // else
    // {
    //   this.player1.deck = wd_deck;
    // }
    // r = Math.floor((Math.random() * 2) + 1);
    // if (r == 1)
    // {
    //   this.player2.deck = fn_deck;
    // }  
    // else
    // {
    //   this.player2.deck = wd_deck;
    // }
    var i;
    for (i = 0; i < 20; i++)
    {
      this.player1.deck.push(this.cardFactory.GetCard("Aqua Seneschal"));
      this.player1.deck.push(this.cardFactory.GetCard("Frogzooka"));
     }
    for (i = 0; i < 20; i++)
    {
      this.player2.deck.push(this.cardFactory.GetCard("Aqua Seneschal"));
      this.player2.deck.push(this.cardFactory.GetCard("Frogzooka"));
    }
    shuffle(this.player1.deck);
    shuffle(this.player2.deck);
    
    console.log(this.player1.deck.length);
    console.log(this.player2.deck.length);
    
    for (var i = 0; i < 5; i++)
    {
      //this.player1.shields.push(CardFactory("Ice Blade"));
      //this.player2.shields.push(CardFactory("Ice Blade"));
      this.player1.shields.push(this.player1.deck.pop());
      this.player2.shields.push(this.player2.deck.pop());
    }
    
    for (var i = 0; i < 5; i++)
    {
      this.player1.hand.push(this.player1.deck.pop());
      this.player2.hand.push(this.player2.deck.pop());
    }

    this.emitState();
    this.emitStateTimerSet(this.player1, TURN_LENGTH);
    this.emitStateTimerSet(this.player2, TURN_LENGTH);
  }
  
}

module.exports = {
  Game : Game
}
