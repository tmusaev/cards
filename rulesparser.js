const antlr4 = require('antlr4/index');
var RulesLexer = require('./RulesLexer').RulesLexer
var RulesListener = require('./RulesListener').RulesListener
var RulesParser = require('./RulesParser').RulesParser

var rulesListener = function(c) {
  this.c = c;
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
  if (ctx.triggeredAbility() != null) {
    ctx.triggeredAbility().enterRule(this);
  }
}

rulesListener.prototype.enterTriggeredAbility = function(ctx) {
  ctx.trigger().enterRule(this);
  ctx.action().enterRule(this);
}

rulesListener.prototype.enterAction = function(ctx) {
  this.c.Resolve = function(game, player, opp, c, index)
  {
    game.drawCard(player);
  }
}

rulesListener.prototype.enterTrigger = function(ctx) {
  if (ctx.attackTrigger() != null) {
    ctx.attackTrigger().enterRule(this);
  }
}

rulesListener.prototype.enterAttackTrigger = function(ctx) {
  this.c.OnAttack = function(game, player, opp, c, index)
  {
    game.pushStack(c, player, opp);
  }
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
  switch (ctx.getText()) {
      case 'Blocker':
        this.c.blocker = true;
        break;
      case 'Guard':
        this.c.guard = true;
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