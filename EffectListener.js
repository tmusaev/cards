// Generated from Effect.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by EffectParser.
function EffectListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

EffectListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
EffectListener.prototype.constructor = EffectListener;

// Enter a parse tree produced by EffectParser#effect.
EffectListener.prototype.enterEffect = function(ctx) {
};

// Exit a parse tree produced by EffectParser#effect.
EffectListener.prototype.exitEffect = function(ctx) {
};


// Enter a parse tree produced by EffectParser#action.
EffectListener.prototype.enterAction = function(ctx) {
};

// Exit a parse tree produced by EffectParser#action.
EffectListener.prototype.exitAction = function(ctx) {
};


// Enter a parse tree produced by EffectParser#recipient.
EffectListener.prototype.enterRecipient = function(ctx) {
};

// Exit a parse tree produced by EffectParser#recipient.
EffectListener.prototype.exitRecipient = function(ctx) {
};


// Enter a parse tree produced by EffectParser#filter.
EffectListener.prototype.enterFilter = function(ctx) {
};

// Exit a parse tree produced by EffectParser#filter.
EffectListener.prototype.exitFilter = function(ctx) {
};



exports.EffectListener = EffectListener;