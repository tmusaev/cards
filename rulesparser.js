const antlr4 = require('antlr4/index');
var EffectLexer = require('./EffectLexer').EffectLexer
var EffectListener = require('./EffectListener').EffectListener
var EffectParser = require('./EffectParser').EffectParser

var EffListener = function() {
    var action;  
    this.filters = [];
  
    this.getAction = function() {
      return this.action;
    };
  
    this.getFilters = function() {
      return this.filters;
    };
  
    EffectListener.call(this); // inherit default listener
    return this;
};

var ActionListener = function() {
    var action;
  
    this.getAction = function() {
      return this.action;
    };
  
    EffectListener.call(this); // inherit default listener
    return this;
};

var RecipientListener = function() {
    this.filters = [];
  
    this.getFilters = function() {
      return this.filters;
    };
  
    EffectListener.call(this); // inherit default listener
    return this;
};

var FilterListener = function() {
    this.filters = [];
  
    this.getFilters = function() {
      return this.filters;
    };
  
    EffectListener.call(this); // inherit default listener
    return this;
};

// continue inheriting default listener
EffListener.prototype = Object.create(EffectListener.prototype);
EffListener.prototype.constructor = EffListener;

ActionListener.prototype = Object.create(EffectListener.prototype);
ActionListener.prototype.constructor = EffListener;

RecipientListener.prototype = Object.create(EffectListener.prototype);
RecipientListener.prototype.constructor = EffListener;

FilterListener.prototype = Object.create(EffectListener.prototype);
FilterListener.prototype.constructor = EffListener;

EffListener.prototype.enterEffect = function(ctx) {
  //console.log(ctx.getText());
  var actionListener = new ActionListener();
  var recipientListener = new RecipientListener();
  ctx.action().enterRule(actionListener);
  ctx.recipient().enterRule(recipientListener);
  this.action = actionListener.getAction().toLowerCase();
  this.filters = recipientListener.getFilters();
};

RecipientListener.prototype.enterRecipient = function(ctx) {
  var filterListener = new FilterListener();
  var i = 0;
  while (ctx.filter(i) != null)
  {
    ctx.filter(i).enterRule(filterListener);
    i++;
  }
  this.filters = filterListener.getFilters();
};

ActionListener.prototype.enterAction = function(ctx) {
    this.action = ctx.getText();
};

FilterListener.prototype.enterFilter = function(ctx) {
  this.filters.push(ctx.getText());
};

module.exports = function ParseRules(c, rulesText)
{
  var chars = new antlr4.InputStream(rulesText)
  var lexer = new EffectLexer(chars);
  var tokens = new antlr4.CommonTokenStream(lexer);
  var parser = new EffectParser(tokens);
  var effListener = new EffListener();
  parser.effect().enterRule(effListener);
  var action = effListener.getAction();
  var filters = effListener.getFilters();
  c.TargetReturned = function(game, player, opp, index){
    game.resolveAction(player, opp, index, action);
  };
  c.Resolve = function(game, player, opp, card, index){
    game.targettedEffect(player, opp, card, index, filters);
  };
}