// Generated from Rules.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');
var RulesListener = require('./RulesListener').RulesListener;
var grammarFileName = "Rules.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u001eo\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0003\u0002\u0003\u0002\u0005\u0002%\n\u0002\u0007\u0002",
    "\'\n\u0002\f\u0002\u000e\u0002*\u000b\u0002\u0003\u0002\u0007\u0002",
    "-\n\u0002\f\u0002\u000e\u00020\u000b\u0002\u0003\u0003\u0003\u0003\u0003",
    "\u0004\u0005\u00045\n\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005",
    "\u0004:\n\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003",
    "\b\u0003\b\u0005\bH\n\b\u0003\t\u0003\t\u0005\tL\n\t\u0003\n\u0003\n",
    "\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0005\fU\n\f\u0003",
    "\r\u0003\r\u0007\rY\n\r\f\r\u000e\r\\\u000b\r\u0003\r\u0003\r\u0003",
    "\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0010\u0005\u0010h\n\u0010\u0003\u0011\u0003\u0011\u0003",
    "\u0011\u0005\u0011m\n\u0011\u0003\u0011\u0002\u0002\u0012\u0002\u0004",
    "\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e ",
    "\u0002\u0004\u0003\u0002\t\u000e\u0003\u0002\u0011\u0012\u0002m\u0002",
    "(\u0003\u0002\u0002\u0002\u00041\u0003\u0002\u0002\u0002\u00064\u0003",
    "\u0002\u0002\u0002\b=\u0003\u0002\u0002\u0002\nA\u0003\u0002\u0002\u0002",
    "\fC\u0003\u0002\u0002\u0002\u000eE\u0003\u0002\u0002\u0002\u0010K\u0003",
    "\u0002\u0002\u0002\u0012M\u0003\u0002\u0002\u0002\u0014O\u0003\u0002",
    "\u0002\u0002\u0016T\u0003\u0002\u0002\u0002\u0018V\u0003\u0002\u0002",
    "\u0002\u001a_\u0003\u0002\u0002\u0002\u001ca\u0003\u0002\u0002\u0002",
    "\u001eg\u0003\u0002\u0002\u0002 i\u0003\u0002\u0002\u0002\"$\u0005\u0004",
    "\u0003\u0002#%\u0007\u000f\u0002\u0002$#\u0003\u0002\u0002\u0002$%\u0003",
    "\u0002\u0002\u0002%\'\u0003\u0002\u0002\u0002&\"\u0003\u0002\u0002\u0002",
    "\'*\u0003\u0002\u0002\u0002(&\u0003\u0002\u0002\u0002()\u0003\u0002",
    "\u0002\u0002).\u0003\u0002\u0002\u0002*(\u0003\u0002\u0002\u0002+-\u0005",
    "\u0006\u0004\u0002,+\u0003\u0002\u0002\u0002-0\u0003\u0002\u0002\u0002",
    ".,\u0003\u0002\u0002\u0002./\u0003\u0002\u0002\u0002/\u0003\u0003\u0002",
    "\u0002\u00020.\u0003\u0002\u0002\u000212\t\u0002\u0002\u00022\u0005",
    "\u0003\u0002\u0002\u000235\u0007\u001c\u0002\u000243\u0003\u0002\u0002",
    "\u000245\u0003\u0002\u0002\u000259\u0003\u0002\u0002\u00026:\u0005\b",
    "\u0005\u00027:\u0005\n\u0006\u00028:\u0005\f\u0007\u000296\u0003\u0002",
    "\u0002\u000297\u0003\u0002\u0002\u000298\u0003\u0002\u0002\u0002:;\u0003",
    "\u0002\u0002\u0002;<\u0007\u001b\u0002\u0002<\u0007\u0003\u0002\u0002",
    "\u0002=>\u0005\u0010\t\u0002>?\u0007\u0010\u0002\u0002?@\u0005\u0016",
    "\f\u0002@\t\u0003\u0002\u0002\u0002AB\u0005\u0016\f\u0002B\u000b\u0003",
    "\u0002\u0002\u0002CD\u0005\u000e\b\u0002D\r\u0003\u0002\u0002\u0002",
    "EG\u0007\u0017\u0002\u0002FH\u0007\u0018\u0002\u0002GF\u0003\u0002\u0002",
    "\u0002GH\u0003\u0002\u0002\u0002H\u000f\u0003\u0002\u0002\u0002IL\u0005",
    "\u0012\n\u0002JL\u0005\u0014\u000b\u0002KI\u0003\u0002\u0002\u0002K",
    "J\u0003\u0002\u0002\u0002L\u0011\u0003\u0002\u0002\u0002MN\u0007\u0015",
    "\u0002\u0002N\u0013\u0003\u0002\u0002\u0002OP\u0007\u0016\u0002\u0002",
    "P\u0015\u0003\u0002\u0002\u0002QU\u0005\u001a\u000e\u0002RU\u0005\u001c",
    "\u000f\u0002SU\u0005\u0018\r\u0002TQ\u0003\u0002\u0002\u0002TR\u0003",
    "\u0002\u0002\u0002TS\u0003\u0002\u0002\u0002U\u0017\u0003\u0002\u0002",
    "\u0002VZ\u0007\u0019\u0002\u0002WY\u0005\u001e\u0010\u0002XW\u0003\u0002",
    "\u0002\u0002Y\\\u0003\u0002\u0002\u0002ZX\u0003\u0002\u0002\u0002Z[",
    "\u0003\u0002\u0002\u0002[]\u0003\u0002\u0002\u0002\\Z\u0003\u0002\u0002",
    "\u0002]^\u0007\u001a\u0002\u0002^\u0019\u0003\u0002\u0002\u0002_`\u0007",
    "\u0013\u0002\u0002`\u001b\u0003\u0002\u0002\u0002ab\u0007\u0014\u0002",
    "\u0002b\u001d\u0003\u0002\u0002\u0002ch\u0007\u0003\u0002\u0002dh\u0007",
    "\u0004\u0002\u0002eh\u0007\u0005\u0002\u0002fh\u0005 \u0011\u0002gc",
    "\u0003\u0002\u0002\u0002gd\u0003\u0002\u0002\u0002ge\u0003\u0002\u0002",
    "\u0002gf\u0003\u0002\u0002\u0002h\u001f\u0003\u0002\u0002\u0002ij\u0007",
    "\u0006\u0002\u0002jl\u0007\u001d\u0002\u0002km\t\u0003\u0002\u0002l",
    "k\u0003\u0002\u0002\u0002lm\u0003\u0002\u0002\u0002m!\u0003\u0002\u0002",
    "\u0002\r$(.49GKTZgl"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'creature'", "'enemy'", "'untapped'", "'that is level '", 
                     null, null, null, null, null, null, null, null, null, 
                     "'you may'", "' or less'", "' or more'", null, null, 
                     null, null, null, "'by creatures that have less power than it'", 
                     null, null, "'.'" ];

var symbolicNames = [ null, null, null, null, null, "DESTROY", "BANISH", 
                      "BLOCKER", "GUARD", "SLAYER", "FASTATTACK", "SHIELDBLAST", 
                      "DOUBLEBREAKER", "REMINDERTEXT", "OPTIONALTEXT", "ORLESS", 
                      "ORMORE", "DRAWONE", "DRAWTWO", "ONATTACK", "ONENTER", 
                      "UNBLOCKABLE", "LESSPOWER", "BOUNCEPRE", "BOUNCEPOST", 
                      "PERIOD", "FLAVORTEXT", "INTEGER", "WHITESPACE" ];

var ruleNames =  [ "rules", "keyword", "ability", "triggeredAbility", "oneShotAbility", 
                   "staticAbility", "unblockable", "trigger", "attackTrigger", 
                   "enterTrigger", "action", "bounceAction", "drawOne", 
                   "drawTwo", "filter", "levelFilter" ];

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
RulesParser.T__0 = 1;
RulesParser.T__1 = 2;
RulesParser.T__2 = 3;
RulesParser.T__3 = 4;
RulesParser.DESTROY = 5;
RulesParser.BANISH = 6;
RulesParser.BLOCKER = 7;
RulesParser.GUARD = 8;
RulesParser.SLAYER = 9;
RulesParser.FASTATTACK = 10;
RulesParser.SHIELDBLAST = 11;
RulesParser.DOUBLEBREAKER = 12;
RulesParser.REMINDERTEXT = 13;
RulesParser.OPTIONALTEXT = 14;
RulesParser.ORLESS = 15;
RulesParser.ORMORE = 16;
RulesParser.DRAWONE = 17;
RulesParser.DRAWTWO = 18;
RulesParser.ONATTACK = 19;
RulesParser.ONENTER = 20;
RulesParser.UNBLOCKABLE = 21;
RulesParser.LESSPOWER = 22;
RulesParser.BOUNCEPRE = 23;
RulesParser.BOUNCEPOST = 24;
RulesParser.PERIOD = 25;
RulesParser.FLAVORTEXT = 26;
RulesParser.INTEGER = 27;
RulesParser.WHITESPACE = 28;

RulesParser.RULE_rules = 0;
RulesParser.RULE_keyword = 1;
RulesParser.RULE_ability = 2;
RulesParser.RULE_triggeredAbility = 3;
RulesParser.RULE_oneShotAbility = 4;
RulesParser.RULE_staticAbility = 5;
RulesParser.RULE_unblockable = 6;
RulesParser.RULE_trigger = 7;
RulesParser.RULE_attackTrigger = 8;
RulesParser.RULE_enterTrigger = 9;
RulesParser.RULE_action = 10;
RulesParser.RULE_bounceAction = 11;
RulesParser.RULE_drawOne = 12;
RulesParser.RULE_drawTwo = 13;
RulesParser.RULE_filter = 14;
RulesParser.RULE_levelFilter = 15;


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
        this.state = 38;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RulesParser.BLOCKER) | (1 << RulesParser.GUARD) | (1 << RulesParser.SLAYER) | (1 << RulesParser.FASTATTACK) | (1 << RulesParser.SHIELDBLAST) | (1 << RulesParser.DOUBLEBREAKER))) !== 0)) {
            this.state = 32;
            this.keyword();
            this.state = 34;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===RulesParser.REMINDERTEXT) {
                this.state = 33;
                this.match(RulesParser.REMINDERTEXT);
            }

            this.state = 40;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 44;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RulesParser.DRAWONE) | (1 << RulesParser.DRAWTWO) | (1 << RulesParser.ONATTACK) | (1 << RulesParser.ONENTER) | (1 << RulesParser.UNBLOCKABLE) | (1 << RulesParser.BOUNCEPRE) | (1 << RulesParser.FLAVORTEXT))) !== 0)) {
            this.state = 41;
            this.ability();
            this.state = 46;
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
        this.state = 47;
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

AbilityContext.prototype.PERIOD = function() {
    return this.getToken(RulesParser.PERIOD, 0);
};

AbilityContext.prototype.triggeredAbility = function() {
    return this.getTypedRuleContext(TriggeredAbilityContext,0);
};

AbilityContext.prototype.oneShotAbility = function() {
    return this.getTypedRuleContext(OneShotAbilityContext,0);
};

AbilityContext.prototype.staticAbility = function() {
    return this.getTypedRuleContext(StaticAbilityContext,0);
};

AbilityContext.prototype.FLAVORTEXT = function() {
    return this.getToken(RulesParser.FLAVORTEXT, 0);
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
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 50;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===RulesParser.FLAVORTEXT) {
            this.state = 49;
            this.match(RulesParser.FLAVORTEXT);
        }

        this.state = 55;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RulesParser.ONATTACK:
        case RulesParser.ONENTER:
            this.state = 52;
            this.triggeredAbility();
            break;
        case RulesParser.DRAWONE:
        case RulesParser.DRAWTWO:
        case RulesParser.BOUNCEPRE:
            this.state = 53;
            this.oneShotAbility();
            break;
        case RulesParser.UNBLOCKABLE:
            this.state = 54;
            this.staticAbility();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this.state = 57;
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
        this.state = 59;
        this.trigger();
        this.state = 60;
        this.match(RulesParser.OPTIONALTEXT);
        this.state = 61;
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


function OneShotAbilityContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_oneShotAbility;
    return this;
}

OneShotAbilityContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OneShotAbilityContext.prototype.constructor = OneShotAbilityContext;

OneShotAbilityContext.prototype.action = function() {
    return this.getTypedRuleContext(ActionContext,0);
};

OneShotAbilityContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterOneShotAbility(this);
	}
};

OneShotAbilityContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitOneShotAbility(this);
	}
};




RulesParser.OneShotAbilityContext = OneShotAbilityContext;

RulesParser.prototype.oneShotAbility = function() {

    var localctx = new OneShotAbilityContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, RulesParser.RULE_oneShotAbility);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 63;
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


function StaticAbilityContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_staticAbility;
    return this;
}

StaticAbilityContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StaticAbilityContext.prototype.constructor = StaticAbilityContext;

StaticAbilityContext.prototype.unblockable = function() {
    return this.getTypedRuleContext(UnblockableContext,0);
};

StaticAbilityContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterStaticAbility(this);
	}
};

StaticAbilityContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitStaticAbility(this);
	}
};




RulesParser.StaticAbilityContext = StaticAbilityContext;

RulesParser.prototype.staticAbility = function() {

    var localctx = new StaticAbilityContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, RulesParser.RULE_staticAbility);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 65;
        this.unblockable();
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


function UnblockableContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_unblockable;
    return this;
}

UnblockableContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
UnblockableContext.prototype.constructor = UnblockableContext;

UnblockableContext.prototype.UNBLOCKABLE = function() {
    return this.getToken(RulesParser.UNBLOCKABLE, 0);
};

UnblockableContext.prototype.LESSPOWER = function() {
    return this.getToken(RulesParser.LESSPOWER, 0);
};

UnblockableContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterUnblockable(this);
	}
};

UnblockableContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitUnblockable(this);
	}
};




RulesParser.UnblockableContext = UnblockableContext;

RulesParser.prototype.unblockable = function() {

    var localctx = new UnblockableContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, RulesParser.RULE_unblockable);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 67;
        this.match(RulesParser.UNBLOCKABLE);
        this.state = 69;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===RulesParser.LESSPOWER) {
            this.state = 68;
            this.match(RulesParser.LESSPOWER);
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

TriggerContext.prototype.enterTrigger = function() {
    return this.getTypedRuleContext(EnterTriggerContext,0);
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
    this.enterRule(localctx, 14, RulesParser.RULE_trigger);
    try {
        this.state = 73;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RulesParser.ONATTACK:
            this.enterOuterAlt(localctx, 1);
            this.state = 71;
            this.attackTrigger();
            break;
        case RulesParser.ONENTER:
            this.enterOuterAlt(localctx, 2);
            this.state = 72;
            this.enterTrigger();
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
    this.enterRule(localctx, 16, RulesParser.RULE_attackTrigger);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 75;
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


function EnterTriggerContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_enterTrigger;
    return this;
}

EnterTriggerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EnterTriggerContext.prototype.constructor = EnterTriggerContext;

EnterTriggerContext.prototype.ONENTER = function() {
    return this.getToken(RulesParser.ONENTER, 0);
};

EnterTriggerContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterEnterTrigger(this);
	}
};

EnterTriggerContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitEnterTrigger(this);
	}
};




RulesParser.EnterTriggerContext = EnterTriggerContext;

RulesParser.prototype.enterTrigger = function() {

    var localctx = new EnterTriggerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, RulesParser.RULE_enterTrigger);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 77;
        this.match(RulesParser.ONENTER);
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

ActionContext.prototype.bounceAction = function() {
    return this.getTypedRuleContext(BounceActionContext,0);
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
    this.enterRule(localctx, 20, RulesParser.RULE_action);
    try {
        this.state = 82;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RulesParser.DRAWONE:
            this.enterOuterAlt(localctx, 1);
            this.state = 79;
            this.drawOne();
            break;
        case RulesParser.DRAWTWO:
            this.enterOuterAlt(localctx, 2);
            this.state = 80;
            this.drawTwo();
            break;
        case RulesParser.BOUNCEPRE:
            this.enterOuterAlt(localctx, 3);
            this.state = 81;
            this.bounceAction();
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


function BounceActionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_bounceAction;
    return this;
}

BounceActionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BounceActionContext.prototype.constructor = BounceActionContext;

BounceActionContext.prototype.BOUNCEPRE = function() {
    return this.getToken(RulesParser.BOUNCEPRE, 0);
};

BounceActionContext.prototype.BOUNCEPOST = function() {
    return this.getToken(RulesParser.BOUNCEPOST, 0);
};

BounceActionContext.prototype.filter = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FilterContext);
    } else {
        return this.getTypedRuleContext(FilterContext,i);
    }
};

BounceActionContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterBounceAction(this);
	}
};

BounceActionContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitBounceAction(this);
	}
};




RulesParser.BounceActionContext = BounceActionContext;

RulesParser.prototype.bounceAction = function() {

    var localctx = new BounceActionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, RulesParser.RULE_bounceAction);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 84;
        this.match(RulesParser.BOUNCEPRE);
        this.state = 88;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RulesParser.T__0) | (1 << RulesParser.T__1) | (1 << RulesParser.T__2) | (1 << RulesParser.T__3))) !== 0)) {
            this.state = 85;
            this.filter();
            this.state = 90;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 91;
        this.match(RulesParser.BOUNCEPOST);
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
    this.enterRule(localctx, 24, RulesParser.RULE_drawOne);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 93;
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
    this.enterRule(localctx, 26, RulesParser.RULE_drawTwo);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 95;
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


function FilterContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_filter;
    return this;
}

FilterContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FilterContext.prototype.constructor = FilterContext;

FilterContext.prototype.levelFilter = function() {
    return this.getTypedRuleContext(LevelFilterContext,0);
};

FilterContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterFilter(this);
	}
};

FilterContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitFilter(this);
	}
};




RulesParser.FilterContext = FilterContext;

RulesParser.prototype.filter = function() {

    var localctx = new FilterContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, RulesParser.RULE_filter);
    try {
        this.state = 101;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RulesParser.T__0:
            this.enterOuterAlt(localctx, 1);
            this.state = 97;
            this.match(RulesParser.T__0);
            break;
        case RulesParser.T__1:
            this.enterOuterAlt(localctx, 2);
            this.state = 98;
            this.match(RulesParser.T__1);
            break;
        case RulesParser.T__2:
            this.enterOuterAlt(localctx, 3);
            this.state = 99;
            this.match(RulesParser.T__2);
            break;
        case RulesParser.T__3:
            this.enterOuterAlt(localctx, 4);
            this.state = 100;
            this.levelFilter();
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


function LevelFilterContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RulesParser.RULE_levelFilter;
    return this;
}

LevelFilterContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LevelFilterContext.prototype.constructor = LevelFilterContext;

LevelFilterContext.prototype.INTEGER = function() {
    return this.getToken(RulesParser.INTEGER, 0);
};

LevelFilterContext.prototype.ORLESS = function() {
    return this.getToken(RulesParser.ORLESS, 0);
};

LevelFilterContext.prototype.ORMORE = function() {
    return this.getToken(RulesParser.ORMORE, 0);
};

LevelFilterContext.prototype.enterRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.enterLevelFilter(this);
	}
};

LevelFilterContext.prototype.exitRule = function(listener) {
    if(listener instanceof RulesListener ) {
        listener.exitLevelFilter(this);
	}
};




RulesParser.LevelFilterContext = LevelFilterContext;

RulesParser.prototype.levelFilter = function() {

    var localctx = new LevelFilterContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, RulesParser.RULE_levelFilter);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 103;
        this.match(RulesParser.T__3);
        this.state = 104;
        this.match(RulesParser.INTEGER);
        this.state = 106;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===RulesParser.ORLESS || _la===RulesParser.ORMORE) {
            this.state = 105;
            _la = this._input.LA(1);
            if(!(_la===RulesParser.ORLESS || _la===RulesParser.ORMORE)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
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


exports.RulesParser = RulesParser;
