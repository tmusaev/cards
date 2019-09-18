// Generated from Effect.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');
var EffectListener = require('./EffectListener').EffectListener;
var grammarFileName = "Effect.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\b\u001b\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0007\u0004\u0012\n\u0004",
    "\f\u0004\u000e\u0004\u0015\u000b\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0002\u0002\u0006\u0002\u0004\u0006\b",
    "\u0002\u0003\u0003\u0002\u0005\u0006\u0002\u0017\u0002\n\u0003\u0002",
    "\u0002\u0002\u0004\r\u0003\u0002\u0002\u0002\u0006\u000f\u0003\u0002",
    "\u0002\u0002\b\u0018\u0003\u0002\u0002\u0002\n\u000b\u0005\u0004\u0003",
    "\u0002\u000b\f\u0005\u0006\u0004\u0002\f\u0003\u0003\u0002\u0002\u0002",
    "\r\u000e\u0007\u0007\u0002\u0002\u000e\u0005\u0003\u0002\u0002\u0002",
    "\u000f\u0013\u0007\u0003\u0002\u0002\u0010\u0012\u0005\b\u0005\u0002",
    "\u0011\u0010\u0003\u0002\u0002\u0002\u0012\u0015\u0003\u0002\u0002\u0002",
    "\u0013\u0011\u0003\u0002\u0002\u0002\u0013\u0014\u0003\u0002\u0002\u0002",
    "\u0014\u0016\u0003\u0002\u0002\u0002\u0015\u0013\u0003\u0002\u0002\u0002",
    "\u0016\u0017\u0007\u0004\u0002\u0002\u0017\u0007\u0003\u0002\u0002\u0002",
    "\u0018\u0019\t\u0002\u0002\u0002\u0019\t\u0003\u0002\u0002\u0002\u0003",
    "\u0013"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'target'", "'creature'", "'enemy'", "'untapped'" ];

var symbolicNames = [ null, null, null, null, null, "DESTROY", "WHITESPACE" ];

var ruleNames =  [ "effect", "action", "recipient", "filter" ];

function EffectParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

EffectParser.prototype = Object.create(antlr4.Parser.prototype);
EffectParser.prototype.constructor = EffectParser;

Object.defineProperty(EffectParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

EffectParser.EOF = antlr4.Token.EOF;
EffectParser.T__0 = 1;
EffectParser.T__1 = 2;
EffectParser.T__2 = 3;
EffectParser.T__3 = 4;
EffectParser.DESTROY = 5;
EffectParser.WHITESPACE = 6;

EffectParser.RULE_effect = 0;
EffectParser.RULE_action = 1;
EffectParser.RULE_recipient = 2;
EffectParser.RULE_filter = 3;


function EffectContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EffectParser.RULE_effect;
    return this;
}

EffectContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EffectContext.prototype.constructor = EffectContext;

EffectContext.prototype.action = function() {
    return this.getTypedRuleContext(ActionContext,0);
};

EffectContext.prototype.recipient = function() {
    return this.getTypedRuleContext(RecipientContext,0);
};

EffectContext.prototype.enterRule = function(listener) {
    if(listener instanceof EffectListener ) {
        listener.enterEffect(this);
	}
};

EffectContext.prototype.exitRule = function(listener) {
    if(listener instanceof EffectListener ) {
        listener.exitEffect(this);
	}
};




EffectParser.EffectContext = EffectContext;

EffectParser.prototype.effect = function() {

    var localctx = new EffectContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, EffectParser.RULE_effect);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 8;
        this.action();
        this.state = 9;
        this.recipient();
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
    this.ruleIndex = EffectParser.RULE_action;
    return this;
}

ActionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ActionContext.prototype.constructor = ActionContext;

ActionContext.prototype.DESTROY = function() {
    return this.getToken(EffectParser.DESTROY, 0);
};

ActionContext.prototype.enterRule = function(listener) {
    if(listener instanceof EffectListener ) {
        listener.enterAction(this);
	}
};

ActionContext.prototype.exitRule = function(listener) {
    if(listener instanceof EffectListener ) {
        listener.exitAction(this);
	}
};




EffectParser.ActionContext = ActionContext;

EffectParser.prototype.action = function() {

    var localctx = new ActionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, EffectParser.RULE_action);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 11;
        this.match(EffectParser.DESTROY);
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


function RecipientContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EffectParser.RULE_recipient;
    return this;
}

RecipientContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RecipientContext.prototype.constructor = RecipientContext;

RecipientContext.prototype.filter = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FilterContext);
    } else {
        return this.getTypedRuleContext(FilterContext,i);
    }
};

RecipientContext.prototype.enterRule = function(listener) {
    if(listener instanceof EffectListener ) {
        listener.enterRecipient(this);
	}
};

RecipientContext.prototype.exitRule = function(listener) {
    if(listener instanceof EffectListener ) {
        listener.exitRecipient(this);
	}
};




EffectParser.RecipientContext = RecipientContext;

EffectParser.prototype.recipient = function() {

    var localctx = new RecipientContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, EffectParser.RULE_recipient);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 13;
        this.match(EffectParser.T__0);
        this.state = 17;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===EffectParser.T__2 || _la===EffectParser.T__3) {
            this.state = 14;
            this.filter();
            this.state = 19;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 20;
        this.match(EffectParser.T__1);
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
    this.ruleIndex = EffectParser.RULE_filter;
    return this;
}

FilterContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FilterContext.prototype.constructor = FilterContext;


FilterContext.prototype.enterRule = function(listener) {
    if(listener instanceof EffectListener ) {
        listener.enterFilter(this);
	}
};

FilterContext.prototype.exitRule = function(listener) {
    if(listener instanceof EffectListener ) {
        listener.exitFilter(this);
	}
};




EffectParser.FilterContext = FilterContext;

EffectParser.prototype.filter = function() {

    var localctx = new FilterContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, EffectParser.RULE_filter);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 22;
        _la = this._input.LA(1);
        if(!(_la===EffectParser.T__2 || _la===EffectParser.T__3)) {
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


exports.EffectParser = EffectParser;
