// Generated from Rules.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');
var RulesListener = require('./RulesListener').RulesListener;
var grammarFileName = "Rules.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u0012:\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0003\u0002\u0003\u0002\u0005\u0002\u0017",
    "\n\u0002\u0007\u0002\u0019\n\u0002\f\u0002\u000e\u0002\u001c\u000b\u0002",
    "\u0003\u0002\u0007\u0002\u001f\n\u0002\f\u0002\u000e\u0002\"\u000b\u0002",
    "\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0005\b4\n\b\u0003\t\u0003",
    "\t\u0003\n\u0003\n\u0003\n\u0002\u0002\u000b\u0002\u0004\u0006\b\n\f",
    "\u000e\u0010\u0012\u0002\u0003\u0003\u0002\u0005\n\u00024\u0002\u001a",
    "\u0003\u0002\u0002\u0002\u0004#\u0003\u0002\u0002\u0002\u0006%\u0003",
    "\u0002\u0002\u0002\b)\u0003\u0002\u0002\u0002\n-\u0003\u0002\u0002\u0002",
    "\f/\u0003\u0002\u0002\u0002\u000e3\u0003\u0002\u0002\u0002\u00105\u0003",
    "\u0002\u0002\u0002\u00127\u0003\u0002\u0002\u0002\u0014\u0016\u0005",
    "\u0004\u0003\u0002\u0015\u0017\u0007\u000b\u0002\u0002\u0016\u0015\u0003",
    "\u0002\u0002\u0002\u0016\u0017\u0003\u0002\u0002\u0002\u0017\u0019\u0003",
    "\u0002\u0002\u0002\u0018\u0014\u0003\u0002\u0002\u0002\u0019\u001c\u0003",
    "\u0002\u0002\u0002\u001a\u0018\u0003\u0002\u0002\u0002\u001a\u001b\u0003",
    "\u0002\u0002\u0002\u001b \u0003\u0002\u0002\u0002\u001c\u001a\u0003",
    "\u0002\u0002\u0002\u001d\u001f\u0005\u0006\u0004\u0002\u001e\u001d\u0003",
    "\u0002\u0002\u0002\u001f\"\u0003\u0002\u0002\u0002 \u001e\u0003\u0002",
    "\u0002\u0002 !\u0003\u0002\u0002\u0002!\u0003\u0003\u0002\u0002\u0002",
    "\" \u0003\u0002\u0002\u0002#$\t\u0002\u0002\u0002$\u0005\u0003\u0002",
    "\u0002\u0002%&\u0007\u0011\u0002\u0002&\'\u0005\b\u0005\u0002\'(\u0007",
    "\u0010\u0002\u0002(\u0007\u0003\u0002\u0002\u0002)*\u0005\n\u0006\u0002",
    "*+\u0007\f\u0002\u0002+,\u0005\u000e\b\u0002,\t\u0003\u0002\u0002\u0002",
    "-.\u0005\f\u0007\u0002.\u000b\u0003\u0002\u0002\u0002/0\u0007\u000f",
    "\u0002\u00020\r\u0003\u0002\u0002\u000214\u0005\u0010\t\u000224\u0005",
    "\u0012\n\u000231\u0003\u0002\u0002\u000232\u0003\u0002\u0002\u00024",
    "\u000f\u0003\u0002\u0002\u000256\u0007\r\u0002\u00026\u0011\u0003\u0002",
    "\u0002\u000278\u0007\u000e\u0002\u00028\u0013\u0003\u0002\u0002\u0002",
    "\u0006\u0016\u001a 3"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, null, null, null, null, null, null, null, 
                     null, "'you may'", null, null, null, "'.'" ];

var symbolicNames = [ null, "DESTROY", "BANISH", "BLOCKER", "GUARD", "SLAYER", 
                      "FASTATTACK", "SHIELDBLAST", "DOUBLEBREAKER", "REMINDERTEXT", 
                      "OPTIONALTEXT", "DRAWONE", "DRAWTWO", "ONATTACK", 
                      "PERIOD", "FLAVORTEXT", "WHITESPACE" ];

var ruleNames =  [ "rules", "keyword", "ability", "triggeredAbility", "trigger", 
                   "attackTrigger", "action", "drawOne", "drawTwo" ];

function RulesParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

RulesParser.prototype = Object.create(antlr4.Parser.prototype);
RulesParser.prototype.constructor = RulesParser;

Object.defineProperty(RulesParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

RulesParser.EOF = antlr4.Token.EOF;
RulesParser.DESTROY = 1;
RulesParser.BANISH = 2;
RulesParser.BLOCKER = 3;
RulesParser.GUARD = 4;
RulesParser.SLAYER = 5;
RulesParser.FASTATTACK = 6;
RulesParser.SHIELDBLAST = 7;
RulesParser.DOUBLEBREAKER = 8;
RulesParser.REMINDERTEXT = 9;
RulesParser.OPTIONALTEXT = 10;
RulesParser.DRAWONE = 11;
RulesParser.DRAWTWO = 12;
RulesParser.ONATTACK = 13;
RulesParser.PERIOD = 14;
RulesParser.FLAVORTEXT = 15;
RulesParser.WHITESPACE = 16;

RulesParser.RULE_rules = 0;
RulesParser.RULE_keyword = 1;
RulesParser.RULE_ability = 2;
RulesParser.RULE_triggeredAbility = 3;
RulesParser.RULE_trigger = 4;
RulesParser.RULE_attackTrigger = 5;
RulesParser.RULE_action = 6;
RulesParser.RULE_drawOne = 7;
RulesParser.RULE_drawTwo = 8;


function RulesContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_rules;
    return this;
}

RulesContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RulesContext.prototype.constructor = RulesContext;

RulesContext.prototype.keyword = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(KeywordContext);
    } else {
        return this.getTypedRuleContext(KeywordContext,i);
    }
};

RulesContext.prototype.ability = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(AbilityContext);
    } else {
        return this.getTypedRuleContext(AbilityContext,i);
    }
};

RulesContext.prototype.REMINDERTEXT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RulesParser.REMINDERTEXT);
    } else {
        return this.getToken(RulesParser.REMINDERTEXT, i);
    }
};


RulesContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterRules(this);
	}
};

RulesContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitRules(this);
	}
};




RulesParser.RulesContext = RulesContext;

RulesParser.prototype.rules = function() {

    var localctx = new RulesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, RulesParser.RULE_rules);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 24;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RulesParser.BLOCKER) | (1 << RulesParser.GUARD) | (1 << RulesParser.SLAYER) | (1 << RulesParser.FASTATTACK) | (1 << RulesParser.SHIELDBLAST) | (1 << RulesParser.DOUBLEBREAKER))) !== 0)) {
            this.state = 18;
            this.keyword();
            this.state = 20;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===RulesParser.REMINDERTEXT) {
                this.state = 19;
                this.match(RulesParser.REMINDERTEXT);
            }

            this.state = 26;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 30;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RulesParser.FLAVORTEXT) {
            this.state = 27;
            this.ability();
            this.state = 32;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function KeywordContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_keyword;
    return this;
}

KeywordContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
KeywordContext.prototype.constructor = KeywordContext;

KeywordContext.prototype.BLOCKER = function() {
    return this.getToken(RulesParser.BLOCKER, 0);
};

KeywordContext.prototype.GUARD = function() {
    return this.getToken(RulesParser.GUARD, 0);
};

KeywordContext.prototype.SLAYER = function() {
    return this.getToken(RulesParser.SLAYER, 0);
};

KeywordContext.prototype.FASTATTACK = function() {
    return this.getToken(RulesParser.FASTATTACK, 0);
};

KeywordContext.prototype.SHIELDBLAST = function() {
    return this.getToken(RulesParser.SHIELDBLAST, 0);
};

KeywordContext.prototype.DOUBLEBREAKER = function() {
    return this.getToken(RulesParser.DOUBLEBREAKER, 0);
};

KeywordContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterKeyword(this);
	}
};

KeywordContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitKeyword(this);
	}
};




RulesParser.KeywordContext = KeywordContext;

RulesParser.prototype.keyword = function() {

    var localctx = new KeywordContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, RulesParser.RULE_keyword);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 33;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RulesParser.BLOCKER) | (1 << RulesParser.GUARD) | (1 << RulesParser.SLAYER) | (1 << RulesParser.FASTATTACK) | (1 << RulesParser.SHIELDBLAST) | (1 << RulesParser.DOUBLEBREAKER))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function AbilityContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_ability;
    return this;
}

AbilityContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AbilityContext.prototype.constructor = AbilityContext;

AbilityContext.prototype.FLAVORTEXT = function() {
    return this.getToken(RulesParser.FLAVORTEXT, 0);
};

AbilityContext.prototype.triggeredAbility = function() {
    return this.getTypedRuleContext(TriggeredAbilityContext,0);
};

AbilityContext.prototype.PERIOD = function() {
    return this.getToken(RulesParser.PERIOD, 0);
};

AbilityContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterAbility(this);
	}
};

AbilityContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitAbility(this);
	}
};




RulesParser.AbilityContext = AbilityContext;

RulesParser.prototype.ability = function() {

    var localctx = new AbilityContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, RulesParser.RULE_ability);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 35;
        this.match(RulesParser.FLAVORTEXT);
        this.state = 36;
        this.triggeredAbility();
        this.state = 37;
        this.match(RulesParser.PERIOD);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function TriggeredAbilityContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_triggeredAbility;
    return this;
}

TriggeredAbilityContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TriggeredAbilityContext.prototype.constructor = TriggeredAbilityContext;

TriggeredAbilityContext.prototype.trigger = function() {
    return this.getTypedRuleContext(TriggerContext,0);
};

TriggeredAbilityContext.prototype.OPTIONALTEXT = function() {
    return this.getToken(RulesParser.OPTIONALTEXT, 0);
};

TriggeredAbilityContext.prototype.action = function() {
    return this.getTypedRuleContext(ActionContext,0);
};

TriggeredAbilityContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterTriggeredAbility(this);
	}
};

TriggeredAbilityContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitTriggeredAbility(this);
	}
};




RulesParser.TriggeredAbilityContext = TriggeredAbilityContext;

RulesParser.prototype.triggeredAbility = function() {

    var localctx = new TriggeredAbilityContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, RulesParser.RULE_triggeredAbility);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 39;
        this.trigger();
        this.state = 40;
        this.match(RulesParser.OPTIONALTEXT);
        this.state = 41;
        this.action();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function TriggerContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_trigger;
    return this;
}

TriggerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TriggerContext.prototype.constructor = TriggerContext;

TriggerContext.prototype.attackTrigger = function() {
    return this.getTypedRuleContext(AttackTriggerContext,0);
};

TriggerContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterTrigger(this);
	}
};

TriggerContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitTrigger(this);
	}
};




RulesParser.TriggerContext = TriggerContext;

RulesParser.prototype.trigger = function() {

    var localctx = new TriggerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, RulesParser.RULE_trigger);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 43;
        this.attackTrigger();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function AttackTriggerContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_attackTrigger;
    return this;
}

AttackTriggerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AttackTriggerContext.prototype.constructor = AttackTriggerContext;

AttackTriggerContext.prototype.ONATTACK = function() {
    return this.getToken(RulesParser.ONATTACK, 0);
};

AttackTriggerContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterAttackTrigger(this);
	}
};

AttackTriggerContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitAttackTrigger(this);
	}
};




RulesParser.AttackTriggerContext = AttackTriggerContext;

RulesParser.prototype.attackTrigger = function() {

    var localctx = new AttackTriggerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, RulesParser.RULE_attackTrigger);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 45;
        this.match(RulesParser.ONATTACK);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ActionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_action;
    return this;
}

ActionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ActionContext.prototype.constructor = ActionContext;

ActionContext.prototype.drawOne = function() {
    return this.getTypedRuleContext(DrawOneContext,0);
};

ActionContext.prototype.drawTwo = function() {
    return this.getTypedRuleContext(DrawTwoContext,0);
};

ActionContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterAction(this);
	}
};

ActionContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitAction(this);
	}
};




RulesParser.ActionContext = ActionContext;

RulesParser.prototype.action = function() {

    var localctx = new ActionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, RulesParser.RULE_action);
    try {
        this.state = 49;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RulesParser.DRAWONE:
            this.enterOuterAlt(localctx, 1);
            this.state = 47;
            this.drawOne();
            break;
        case RulesParser.DRAWTWO:
            this.enterOuterAlt(localctx, 2);
            this.state = 48;
            this.drawTwo();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function DrawOneContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_drawOne;
    return this;
}

DrawOneContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DrawOneContext.prototype.constructor = DrawOneContext;

DrawOneContext.prototype.DRAWONE = function() {
    return this.getToken(RulesParser.DRAWONE, 0);
};

DrawOneContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterDrawOne(this);
	}
};

DrawOneContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitDrawOne(this);
	}
};




RulesParser.DrawOneContext = DrawOneContext;

RulesParser.prototype.drawOne = function() {

    var localctx = new DrawOneContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, RulesParser.RULE_drawOne);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 51;
        this.match(RulesParser.DRAWONE);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function DrawTwoContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_drawTwo;
    return this;
}

DrawTwoContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DrawTwoContext.prototype.constructor = DrawTwoContext;

DrawTwoContext.prototype.DRAWTWO = function() {
    return this.getToken(RulesParser.DRAWTWO, 0);
};

DrawTwoContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterDrawTwo(this);
	}
};

DrawTwoContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitDrawTwo(this);
	}
};




RulesParser.DrawTwoContext = DrawTwoContext;

RulesParser.prototype.drawTwo = function() {

    var localctx = new DrawTwoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, RulesParser.RULE_drawTwo);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 53;
        this.match(RulesParser.DRAWTWO);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.RulesParser = RulesParser;
