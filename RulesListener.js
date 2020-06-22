// Generated from Rules.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by RulesParser.
function RulesListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

RulesListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
RulesListener.prototype.constructor = RulesListener;

// Enter a parse tree produced by RulesParser#rules.
RulesListener.prototype.enterRules = function(ctx) {
};

// Exit a parse tree produced by RulesParser#rules.
RulesListener.prototype.exitRules = function(ctx) {
};


// Enter a parse tree produced by RulesParser#keyword.
RulesListener.prototype.enterKeyword = function(ctx) {
};

// Exit a parse tree produced by RulesParser#keyword.
RulesListener.prototype.exitKeyword = function(ctx) {
};


// Enter a parse tree produced by RulesParser#ability.
RulesListener.prototype.enterAbility = function(ctx) {
};

// Exit a parse tree produced by RulesParser#ability.
RulesListener.prototype.exitAbility = function(ctx) {
};


// Enter a parse tree produced by RulesParser#triggeredAbility.
RulesListener.prototype.enterTriggeredAbility = function(ctx) {
};

// Exit a parse tree produced by RulesParser#triggeredAbility.
RulesListener.prototype.exitTriggeredAbility = function(ctx) {
};


// Enter a parse tree produced by RulesParser#trigger.
RulesListener.prototype.enterTrigger = function(ctx) {
};

// Exit a parse tree produced by RulesParser#trigger.
RulesListener.prototype.exitTrigger = function(ctx) {
};


// Enter a parse tree produced by RulesParser#attackTrigger.
RulesListener.prototype.enterAttackTrigger = function(ctx) {
};

// Exit a parse tree produced by RulesParser#attackTrigger.
RulesListener.prototype.exitAttackTrigger = function(ctx) {
};


// Enter a parse tree produced by RulesParser#action.
RulesListener.prototype.enterAction = function(ctx) {
};

// Exit a parse tree produced by RulesParser#action.
RulesListener.prototype.exitAction = function(ctx) {
};


// Enter a parse tree produced by RulesParser#drawOne.
RulesListener.prototype.enterDrawOne = function(ctx) {
};

// Exit a parse tree produced by RulesParser#drawOne.
RulesListener.prototype.exitDrawOne = function(ctx) {
};


// Enter a parse tree produced by RulesParser#drawTwo.
RulesListener.prototype.enterDrawTwo = function(ctx) {
};

// Exit a parse tree produced by RulesParser#drawTwo.
RulesListener.prototype.exitDrawTwo = function(ctx) {
};



exports.RulesListener = RulesListener;