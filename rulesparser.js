const antlr4 = require('antlr4/index');
var RulesLexer = require('./RulesLexer').RulesLexer
var RulesListener = require('./RulesListener').RulesListener
var RulesParser = require('./RulesParser').RulesParser

class Ability {
  
  constructor() {
    this.color = "";
    this.id = "";
    this.filters = [];
  }
  
  Resolve(game, player, opp, c, index) {
    
  }
  
  TargetReturned(game, player, opp, index) {

  };
  
}


var rulesListener = function(c) {
  this.c = c;
  this.currentAbilityTrigger = "";
//   this.keywords = [];
  
//   this.getKeywords = function() {
//     return this.keywords;
//   }
  
  RulesListener.call(this); //inherit default listener
  return this;
}

rulesListener.prototype = Object.create(RulesListener.prototype);
rulesListener.prototype.constructor = rulesListener;

// KeywordListener.prototype = Object.create(RulesListener.prototype);
// KeywordListener.prototype.constructor = rulesListener;

// AbilityListener.prototype = Object.create(RulesListener.prototype);
// AbilityListener.prototype.constructor = rulesListener;

// TriggeredAbilityListener.prototype = Object.create(RulesListener.prototype);
// TriggeredAbilityListener.prototype.constructor = rulesListener;

// // continue inheriting default listener
// EffListener.prototype = Object.create(EffectListener.prototype);
// EffListener.prototype.constructor = EffListener;

// ActionListener.prototype = Object.create(EffectListener.prototype);
// ActionListener.prototype.constructor = EffListener;

// RecipientListener.prototype = Object.create(EffectListener.prototype);
// RecipientListener.prototype.constructor = EffListener;

// FilterListener.prototype = Object.create(EffectListener.prototype);
// FilterListener.prototype.constructor = EffListener;

// EffListener.prototype.enterEffect = function(ctx) {
//   //console.log(ctx.getText());
//   var actionListener = new ActionListener();
//   var recipientListener = new RecipientListener();
//   ctx.action().enterRule(actionListener);
//   ctx.recipient().enterRule(recipientListener);
//   this.action = actionListener.getAction().toLowerCase();
//   this.filters = recipientListener.getFilters();
// };

rulesListener.prototype.enterRules = function(ctx) {
  //console.log(ctx.getText());
  //console.log(this.c);
  //var keywordListener = new rulesListener(this.c);
  //var abilityListener = new rulesListener(this.c);
  
  var i = 0;
  while (ctx.keyword(i) != null) {
    ctx.keyword(i).enterRule(this);
    i++;
  }
  
  i = 0;
  while (ctx.ability(i) != null) {
    ctx.ability(i).enterRule(this);
    i++;
  }
  
  //this.keywords = keywordListener.getKeywords();
}

rulesListener.prototype.enterAbility = function(ctx) {
  this.currentAbility = new Ability();
  this.currentAbility.color = this.c.color;
  this.currentAbility.id = this.c.id;

  if (ctx.triggeredAbility() != null) {
    ctx.triggeredAbility().enterRule(this);
  }
  if (ctx.oneShotAbility() != null) {
    ctx.oneShotAbility().enterRule(this);
  }
  if (ctx.staticAbility() != null) {
    ctx.staticAbility().enterRule(this);
  }
  
  if (this.currentAbilityTrigger == "attack") {
    //console.log("currentAbilityTrigger == attack");
    this.c.onAttackAbilities.push(this.currentAbility);
  }
  else if (this.currentAbilityTrigger == "enter") {
    //console.log("currentAbilityTrigger == enter");
    this.c.onEnterAbilities.push(this.currentAbility);
  }
  else { //Handle spells by defaulting to on enter abilities
    //console.log("currentAbilityTrigger == enter");
    this.c.onEnterAbilities.push(this.currentAbility);
  }
}

rulesListener.prototype.enterTriggeredAbility = function(ctx) {
  ctx.trigger().enterRule(this);
  ctx.action().enterRule(this);
}

rulesListener.prototype.enterOneShotAbility = function(ctx) {
  ctx.action().enterRule(this);
}

rulesListener.prototype.enterStaticAbility = function(ctx) {
  if (ctx.unblockable() != null) {
    ctx.unblockable().enterRule(this);
  }
}

rulesListener.prototype.enterUnblockable = function(ctx) {
  this.c.text += ctx.UNBLOCKABLE().getText() + '.';
  this.c.ValidBlocker = function(c)
  {
    return false;
  }
}

rulesListener.prototype.enterAction = function(ctx) {
  if (ctx.drawOne() != null) {
    ctx.drawOne().enterRule(this);
  }
  if (ctx.drawTwo() != null) {
    ctx.drawTwo().enterRule(this);
  }
  if (ctx.bounceAction() != null) {
    ctx.bounceAction().enterRule(this);
  }
}

rulesListener.prototype.enterBounceAction = function(ctx) {
  this.c.text += ctx.BOUNCEPRE().getText();
  var i = 0;
  while (ctx.filter(i) != null) {
    ctx.filter(i).enterRule(this);
    i++;
  }
  this.c.text += " "+ctx.BOUNCEPOST().getText();
  
  this.currentAbility.TargetReturned = function(game, player, opp, index){
    game.resolveAction(player, opp, index, 'bounce');
  };
  
  this.currentAbility.Resolve = function(game, player, opp, card, index){
    game.targettedEffect(player, opp, card, index, this.filters);
  };
  
}

rulesListener.prototype.enterFilter = function(ctx) {
  if (ctx.levelFilter() != null) {
    ctx.levelFilter().enterRule(this);
  }
  else {
    this.c.text += " "+ctx.getText();
    switch (ctx.getText()) {
      case 'untapped':
        this.currentAbility.filters.push(function(c, player, opp) {
          return !c.tapped;
        });
        break;
      case 'tapped':
        this.currentAbility.filters.push(function(c, player, opp) {
          return c.tapped;
        });
        break;
      case 'enemy':
        this.currentAbility.filters.push(function(c, player, opp) {
          return (opp.field.indexOf(c) != -1);
        });
        break;
    }
  }
}

rulesListener.prototype.enterLevelFilter = function(ctx) {
  this.c.text += " "+ctx.getText();
  var level = parseInt(ctx.INTEGER().getText());
  var orLess = (ctx.ORLESS() != null);
  var orMore = (ctx.ORMORE() != null);
  this.currentAbility.filters.push(function(c, player, opp) {
    if (orLess) {
      return c.cost <= level;
    }
    else if (orMore) {
      return c.cost >= level;
    }
    else {
      return c.cost == level;
    }
  });
}

rulesListener.prototype.enterDrawOne = function(ctx) {
  this.c.text += ctx.getText() + ".";
  this.currentAbility.Resolve = function(game, player, opp, c, index)
  {
    game.drawCard(player);
  }
}

rulesListener.prototype.enterDrawTwo = function(ctx) {
  this.c.text += ctx.getText() + ".";
  this.currentAbility.Resolve = function(game, player, opp, c, index)
  {
    game.drawCard(player);
    game.drawCard(player);
  }
}

rulesListener.prototype.enterTrigger = function(ctx) {
  if (ctx.attackTrigger() != null) {
    ctx.attackTrigger().enterRule(this);
  }
  if (ctx.enterTrigger() != null) {
    ctx.enterTrigger().enterRule(this);
  }
}

rulesListener.prototype.enterAttackTrigger = function(ctx) {
  //console.log("enterAttackTrigger");
  this.c.text += ctx.getText() + " ";
  this.currentAbilityTrigger = "attack";
  // this.c.OnAttack = function(game, player, opp, c, index)
  // {
  //   game.pushStack(c, player, opp);
  // }
}

rulesListener.prototype.enterEnterTrigger = function(ctx) {
  //console.log("enterEnterTrigger");
  this.c.text += ctx.getText() + " ";
  this.currentAbilityTrigger = "enter";
  // this.c.OnEnter = function(game, player, opp, c, index)
  // {
  //   game.pushStack(c, player, opp);
  // }
}

// RecipientListener.prototype.enterRecipient = function(ctx) {
//   var filterListener = new FilterListener();
//   var i = 0;
//   while (ctx.filter(i) != null)
//   {
//     ctx.filter(i).enterRule(filterListener);
//     i++;
//   }
//   this.filters = filterListener.getFilters();
// };

// ActionListener.prototype.enterAction = function(ctx) {
//     this.action = ctx.getText();
// };

// FilterListener.prototype.enterFilter = function(ctx) {
//   this.filters.push(ctx.getText());
// };

rulesListener.prototype.enterKeyword = function(ctx) {
  //this.keywords.push(ctx.getText());
  this.c.text += ctx.getText()+". ";
  switch (ctx.getText()) {
      case 'Blocker':
        this.c.blocker = true;
        break;
      case 'Guard':
        this.c.guard = true;
        break;
      case 'Shield Blast':
        this.c.shieldblast = true;
        break;
  }
}

module.exports = function ParseRules(c, rulesText)
{
  var chars = new antlr4.InputStream(rulesText)
  var lexer = new RulesLexer(chars);
  var tokens = new antlr4.CommonTokenStream(lexer);
  var parser = new RulesParser(tokens);
  var listener = new rulesListener(c);
  parser.rules().enterRule(listener);
  //console.log(c);
  // var effListener = new EffListener();
  // parser.effect().enterRule(effListener);
  // var action = effListener.getAction();
  // var filters = effListener.getFilters();
  // c.TargetReturned = function(game, player, opp, index){
  //   game.resolveAction(player, opp, index, action);
  // };
  // c.Resolve = function(game, player, opp, card, index){
  //   game.targettedEffect(player, opp, card, index, filters);
  // };
}