// Generated from Rules.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u001e\u0233\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013",
    "\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017",
    "\t\u0017\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a",
    "\u0004\u001b\t\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e",
    "\t\u001e\u0004\u001f\t\u001f\u0004 \t \u0004!\t!\u0004\"\t\"\u0004#",
    "\t#\u0004$\t$\u0004%\t%\u0004&\t&\u0004\'\t\'\u0004(\t(\u0004)\t)\u0004",
    "*\t*\u0004+\t+\u0004,\t,\u0004-\t-\u0004.\t.\u0004/\t/\u00040\t0\u0004",
    "1\t1\u00042\t2\u00043\t3\u00044\t4\u00045\t5\u00046\t6\u00047\t7\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003",
    "\u0007\u0003\b\u0003\b\u0003\t\u0003\t\u0003\n\u0003\n\u0003\u000b\u0003",
    "\u000b\u0003\f\u0003\f\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003",
    "\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003",
    "\u0012\u0003\u0012\u0003\u0013\u0003\u0013\u0003\u0014\u0003\u0014\u0003",
    "\u0015\u0003\u0015\u0003\u0016\u0003\u0016\u0003\u0017\u0003\u0017\u0003",
    "\u0018\u0003\u0018\u0003\u0019\u0003\u0019\u0003\u001a\u0003\u001a\u0003",
    "\u001b\u0003\u001b\u0003\u001c\u0003\u001c\u0003\u001d\u0003\u001d\u0003",
    "\u001e\u0003\u001e\u0003\u001f\u0003\u001f\u0003 \u0003 \u0003 \u0003",
    " \u0003 \u0003 \u0003 \u0003 \u0003!\u0003!\u0003!\u0003!\u0003!\u0003",
    "!\u0003!\u0003\"\u0003\"\u0003\"\u0003\"\u0003\"\u0003\"\u0003\"\u0003",
    "\"\u0003#\u0003#\u0003#\u0003#\u0003#\u0003#\u0003$\u0003$\u0003$\u0003",
    "$\u0003$\u0003$\u0003$\u0003%\u0003%\u0003%\u0003%\u0003%\u0003%\u0003",
    "%\u0003%\u0003%\u0003%\u0003%\u0003%\u0003&\u0003&\u0003&\u0003&\u0003",
    "&\u0003&\u0003&\u0003&\u0003&\u0003&\u0003&\u0003&\u0003&\u0003&\u0003",
    "\'\u0003\'\u0003\'\u0003\'\u0003\'\u0003\'\u0003\'\u0003\'\u0003\'\u0003",
    "\'\u0003\'\u0003\'\u0003\'\u0003\'\u0003\'\u0003(\u0003(\u0007(\u011a",
    "\n(\f(\u000e(\u011d\u000b(\u0003(\u0003(\u0003)\u0003)\u0003)\u0003",
    ")\u0003)\u0003)\u0003)\u0003)\u0003*\u0003*\u0003*\u0003*\u0003*\u0003",
    "*\u0003*\u0003*\u0003*\u0003+\u0003+\u0003+\u0003+\u0003+\u0003+\u0003",
    "+\u0003+\u0003+\u0003,\u0003,\u0003,\u0003,\u0003,\u0003,\u0003,\u0003",
    ",\u0003,\u0003,\u0003,\u0003,\u0003-\u0003-\u0003-\u0003-\u0003-\u0003",
    "-\u0003-\u0003-\u0003-\u0003-\u0003-\u0003-\u0003-\u0003.\u0003.\u0003",
    ".\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003",
    ".\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003",
    ".\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003",
    "/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003",
    "/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003",
    "/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003",
    "/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003/\u0003",
    "/\u0003/\u0003/\u00030\u00030\u00030\u00030\u00030\u00030\u00030\u0003",
    "0\u00030\u00030\u00030\u00030\u00030\u00030\u00030\u00030\u00030\u0003",
    "0\u00030\u00030\u00030\u00030\u00030\u00030\u00030\u00030\u00030\u0003",
    "0\u00030\u00030\u00030\u00031\u00031\u00031\u00031\u00031\u00031\u0003",
    "1\u00031\u00031\u00031\u00031\u00031\u00031\u00031\u00031\u00031\u0003",
    "1\u00031\u00031\u00031\u00031\u00031\u00031\u00031\u00031\u00031\u0003",
    "1\u00031\u00031\u00031\u00031\u00031\u00031\u00031\u00031\u00031\u0003",
    "1\u00031\u00031\u00031\u00031\u00031\u00032\u00032\u00032\u00032\u0003",
    "2\u00032\u00032\u00032\u00032\u00032\u00032\u00032\u00032\u00032\u0003",
    "3\u00033\u00033\u00033\u00033\u00033\u00033\u00033\u00033\u00033\u0003",
    "3\u00033\u00033\u00033\u00033\u00033\u00033\u00033\u00033\u00033\u0003",
    "3\u00033\u00033\u00033\u00033\u00033\u00033\u00033\u00033\u00033\u0003",
    "3\u00033\u00033\u00033\u00033\u00033\u00033\u00033\u00033\u00033\u0003",
    "3\u00034\u00034\u00035\u00065\u0222\n5\r5\u000e5\u0223\u00035\u0003",
    "5\u00036\u00066\u0229\n6\r6\u000e6\u022a\u00037\u00067\u022e\n7\r7\u000e",
    "7\u022f\u00037\u00037\u0004\u011b\u0223\u00028\u0003\u0003\u0005\u0004",
    "\u0007\u0005\t\u0006\u000b\u0002\r\u0002\u000f\u0002\u0011\u0002\u0013",
    "\u0002\u0015\u0002\u0017\u0002\u0019\u0002\u001b\u0002\u001d\u0002\u001f",
    "\u0002!\u0002#\u0002%\u0002\'\u0002)\u0002+\u0002-\u0002/\u00021\u0002",
    "3\u00025\u00027\u00029\u0002;\u0002=\u0002?\u0007A\bC\tE\nG\u000bI\f",
    "K\rM\u000eO\u000fQ\u0010S\u0011U\u0012W\u0013Y\u0014[\u0015]\u0016_",
    "\u0017a\u0018c\u0019e\u001ag\u001bi\u001ck\u001dm\u001e\u0003\u0002",
    "\u001e\u0004\u0002CCcc\u0004\u0002DDdd\u0004\u0002EEee\u0004\u0002F",
    "Fff\u0004\u0002GGgg\u0004\u0002HHhh\u0004\u0002IIii\u0004\u0002JJjj",
    "\u0004\u0002KKkk\u0004\u0002LLll\u0004\u0002MMmm\u0004\u0002NNnn\u0004",
    "\u0002OOoo\u0004\u0002PPpp\u0004\u0002QQqq\u0004\u0002RRrr\u0004\u0002",
    "SSss\u0004\u0002TTtt\u0004\u0002UUuu\u0004\u0002VVvv\u0004\u0002WWw",
    "w\u0004\u0002XXxx\u0004\u0002YYyy\u0004\u0002ZZzz\u0004\u0002[[{{\u0004",
    "\u0002\\\\||\u0003\u00022;\u0005\u0002\u000b\f\u000e\u000f\"\"\u0002",
    "\u021c\u0002\u0003\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002",
    "\u0002\u0002\u0007\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002",
    "\u0002\u0002?\u0003\u0002\u0002\u0002\u0002A\u0003\u0002\u0002\u0002",
    "\u0002C\u0003\u0002\u0002\u0002\u0002E\u0003\u0002\u0002\u0002\u0002",
    "G\u0003\u0002\u0002\u0002\u0002I\u0003\u0002\u0002\u0002\u0002K\u0003",
    "\u0002\u0002\u0002\u0002M\u0003\u0002\u0002\u0002\u0002O\u0003\u0002",
    "\u0002\u0002\u0002Q\u0003\u0002\u0002\u0002\u0002S\u0003\u0002\u0002",
    "\u0002\u0002U\u0003\u0002\u0002\u0002\u0002W\u0003\u0002\u0002\u0002",
    "\u0002Y\u0003\u0002\u0002\u0002\u0002[\u0003\u0002\u0002\u0002\u0002",
    "]\u0003\u0002\u0002\u0002\u0002_\u0003\u0002\u0002\u0002\u0002a\u0003",
    "\u0002\u0002\u0002\u0002c\u0003\u0002\u0002\u0002\u0002e\u0003\u0002",
    "\u0002\u0002\u0002g\u0003\u0002\u0002\u0002\u0002i\u0003\u0002\u0002",
    "\u0002\u0002k\u0003\u0002\u0002\u0002\u0002m\u0003\u0002\u0002\u0002",
    "\u0003o\u0003\u0002\u0002\u0002\u0005x\u0003\u0002\u0002\u0002\u0007",
    "~\u0003\u0002\u0002\u0002\t\u0087\u0003\u0002\u0002\u0002\u000b\u0096",
    "\u0003\u0002\u0002\u0002\r\u0098\u0003\u0002\u0002\u0002\u000f\u009a",
    "\u0003\u0002\u0002\u0002\u0011\u009c\u0003\u0002\u0002\u0002\u0013\u009e",
    "\u0003\u0002\u0002\u0002\u0015\u00a0\u0003\u0002\u0002\u0002\u0017\u00a2",
    "\u0003\u0002\u0002\u0002\u0019\u00a4\u0003\u0002\u0002\u0002\u001b\u00a6",
    "\u0003\u0002\u0002\u0002\u001d\u00a8\u0003\u0002\u0002\u0002\u001f\u00aa",
    "\u0003\u0002\u0002\u0002!\u00ac\u0003\u0002\u0002\u0002#\u00ae\u0003",
    "\u0002\u0002\u0002%\u00b0\u0003\u0002\u0002\u0002\'\u00b2\u0003\u0002",
    "\u0002\u0002)\u00b4\u0003\u0002\u0002\u0002+\u00b6\u0003\u0002\u0002",
    "\u0002-\u00b8\u0003\u0002\u0002\u0002/\u00ba\u0003\u0002\u0002\u0002",
    "1\u00bc\u0003\u0002\u0002\u00023\u00be\u0003\u0002\u0002\u00025\u00c0",
    "\u0003\u0002\u0002\u00027\u00c2\u0003\u0002\u0002\u00029\u00c4\u0003",
    "\u0002\u0002\u0002;\u00c6\u0003\u0002\u0002\u0002=\u00c8\u0003\u0002",
    "\u0002\u0002?\u00ca\u0003\u0002\u0002\u0002A\u00d2\u0003\u0002\u0002",
    "\u0002C\u00d9\u0003\u0002\u0002\u0002E\u00e1\u0003\u0002\u0002\u0002",
    "G\u00e7\u0003\u0002\u0002\u0002I\u00ee\u0003\u0002\u0002\u0002K\u00fa",
    "\u0003\u0002\u0002\u0002M\u0108\u0003\u0002\u0002\u0002O\u0117\u0003",
    "\u0002\u0002\u0002Q\u0120\u0003\u0002\u0002\u0002S\u0128\u0003\u0002",
    "\u0002\u0002U\u0131\u0003\u0002\u0002\u0002W\u013a\u0003\u0002\u0002",
    "\u0002Y\u0146\u0003\u0002\u0002\u0002[\u0153\u0003\u0002\u0002\u0002",
    "]\u0173\u0003\u0002\u0002\u0002_\u019e\u0003\u0002\u0002\u0002a\u01bd",
    "\u0003\u0002\u0002\u0002c\u01e7\u0003\u0002\u0002\u0002e\u01f5\u0003",
    "\u0002\u0002\u0002g\u021e\u0003\u0002\u0002\u0002i\u0221\u0003\u0002",
    "\u0002\u0002k\u0228\u0003\u0002\u0002\u0002m\u022d\u0003\u0002\u0002",
    "\u0002op\u0007e\u0002\u0002pq\u0007t\u0002\u0002qr\u0007g\u0002\u0002",
    "rs\u0007c\u0002\u0002st\u0007v\u0002\u0002tu\u0007w\u0002\u0002uv\u0007",
    "t\u0002\u0002vw\u0007g\u0002\u0002w\u0004\u0003\u0002\u0002\u0002xy",
    "\u0007g\u0002\u0002yz\u0007p\u0002\u0002z{\u0007g\u0002\u0002{|\u0007",
    "o\u0002\u0002|}\u0007{\u0002\u0002}\u0006\u0003\u0002\u0002\u0002~\u007f",
    "\u0007w\u0002\u0002\u007f\u0080\u0007p\u0002\u0002\u0080\u0081\u0007",
    "v\u0002\u0002\u0081\u0082\u0007c\u0002\u0002\u0082\u0083\u0007r\u0002",
    "\u0002\u0083\u0084\u0007r\u0002\u0002\u0084\u0085\u0007g\u0002\u0002",
    "\u0085\u0086\u0007f\u0002\u0002\u0086\b\u0003\u0002\u0002\u0002\u0087",
    "\u0088\u0007v\u0002\u0002\u0088\u0089\u0007j\u0002\u0002\u0089\u008a",
    "\u0007c\u0002\u0002\u008a\u008b\u0007v\u0002\u0002\u008b\u008c\u0007",
    "\"\u0002\u0002\u008c\u008d\u0007k\u0002\u0002\u008d\u008e\u0007u\u0002",
    "\u0002\u008e\u008f\u0007\"\u0002\u0002\u008f\u0090\u0007n\u0002\u0002",
    "\u0090\u0091\u0007g\u0002\u0002\u0091\u0092\u0007x\u0002\u0002\u0092",
    "\u0093\u0007g\u0002\u0002\u0093\u0094\u0007n\u0002\u0002\u0094\u0095",
    "\u0007\"\u0002\u0002\u0095\n\u0003\u0002\u0002\u0002\u0096\u0097\t\u0002",
    "\u0002\u0002\u0097\f\u0003\u0002\u0002\u0002\u0098\u0099\t\u0003\u0002",
    "\u0002\u0099\u000e\u0003\u0002\u0002\u0002\u009a\u009b\t\u0004\u0002",
    "\u0002\u009b\u0010\u0003\u0002\u0002\u0002\u009c\u009d\t\u0005\u0002",
    "\u0002\u009d\u0012\u0003\u0002\u0002\u0002\u009e\u009f\t\u0006\u0002",
    "\u0002\u009f\u0014\u0003\u0002\u0002\u0002\u00a0\u00a1\t\u0007\u0002",
    "\u0002\u00a1\u0016\u0003\u0002\u0002\u0002\u00a2\u00a3\t\b\u0002\u0002",
    "\u00a3\u0018\u0003\u0002\u0002\u0002\u00a4\u00a5\t\t\u0002\u0002\u00a5",
    "\u001a\u0003\u0002\u0002\u0002\u00a6\u00a7\t\n\u0002\u0002\u00a7\u001c",
    "\u0003\u0002\u0002\u0002\u00a8\u00a9\t\u000b\u0002\u0002\u00a9\u001e",
    "\u0003\u0002\u0002\u0002\u00aa\u00ab\t\f\u0002\u0002\u00ab \u0003\u0002",
    "\u0002\u0002\u00ac\u00ad\t\r\u0002\u0002\u00ad\"\u0003\u0002\u0002\u0002",
    "\u00ae\u00af\t\u000e\u0002\u0002\u00af$\u0003\u0002\u0002\u0002\u00b0",
    "\u00b1\t\u000f\u0002\u0002\u00b1&\u0003\u0002\u0002\u0002\u00b2\u00b3",
    "\t\u0010\u0002\u0002\u00b3(\u0003\u0002\u0002\u0002\u00b4\u00b5\t\u0011",
    "\u0002\u0002\u00b5*\u0003\u0002\u0002\u0002\u00b6\u00b7\t\u0012\u0002",
    "\u0002\u00b7,\u0003\u0002\u0002\u0002\u00b8\u00b9\t\u0013\u0002\u0002",
    "\u00b9.\u0003\u0002\u0002\u0002\u00ba\u00bb\t\u0014\u0002\u0002\u00bb",
    "0\u0003\u0002\u0002\u0002\u00bc\u00bd\t\u0015\u0002\u0002\u00bd2\u0003",
    "\u0002\u0002\u0002\u00be\u00bf\t\u0016\u0002\u0002\u00bf4\u0003\u0002",
    "\u0002\u0002\u00c0\u00c1\t\u0017\u0002\u0002\u00c16\u0003\u0002\u0002",
    "\u0002\u00c2\u00c3\t\u0018\u0002\u0002\u00c38\u0003\u0002\u0002\u0002",
    "\u00c4\u00c5\t\u0019\u0002\u0002\u00c5:\u0003\u0002\u0002\u0002\u00c6",
    "\u00c7\t\u001a\u0002\u0002\u00c7<\u0003\u0002\u0002\u0002\u00c8\u00c9",
    "\t\u001b\u0002\u0002\u00c9>\u0003\u0002\u0002\u0002\u00ca\u00cb\u0005",
    "\u0011\t\u0002\u00cb\u00cc\u0007g\u0002\u0002\u00cc\u00cd\u0007u\u0002",
    "\u0002\u00cd\u00ce\u0007v\u0002\u0002\u00ce\u00cf\u0007t\u0002\u0002",
    "\u00cf\u00d0\u0007q\u0002\u0002\u00d0\u00d1\u0007{\u0002\u0002\u00d1",
    "@\u0003\u0002\u0002\u0002\u00d2\u00d3\u0005\r\u0007\u0002\u00d3\u00d4",
    "\u0007c\u0002\u0002\u00d4\u00d5\u0007p\u0002\u0002\u00d5\u00d6\u0007",
    "k\u0002\u0002\u00d6\u00d7\u0007u\u0002\u0002\u00d7\u00d8\u0007j\u0002",
    "\u0002\u00d8B\u0003\u0002\u0002\u0002\u00d9\u00da\u0005\r\u0007\u0002",
    "\u00da\u00db\u0007n\u0002\u0002\u00db\u00dc\u0007q\u0002\u0002\u00dc",
    "\u00dd\u0007e\u0002\u0002\u00dd\u00de\u0007m\u0002\u0002\u00de\u00df",
    "\u0007g\u0002\u0002\u00df\u00e0\u0007t\u0002\u0002\u00e0D\u0003\u0002",
    "\u0002\u0002\u00e1\u00e2\u0005\u0017\f\u0002\u00e2\u00e3\u0007w\u0002",
    "\u0002\u00e3\u00e4\u0007c\u0002\u0002\u00e4\u00e5\u0007t\u0002\u0002",
    "\u00e5\u00e6\u0007f\u0002\u0002\u00e6F\u0003\u0002\u0002\u0002\u00e7",
    "\u00e8\u0005/\u0018\u0002\u00e8\u00e9\u0007n\u0002\u0002\u00e9\u00ea",
    "\u0007c\u0002\u0002\u00ea\u00eb\u0007{\u0002\u0002\u00eb\u00ec\u0007",
    "g\u0002\u0002\u00ec\u00ed\u0007t\u0002\u0002\u00edH\u0003\u0002\u0002",
    "\u0002\u00ee\u00ef\u0005\u0015\u000b\u0002\u00ef\u00f0\u0007c\u0002",
    "\u0002\u00f0\u00f1\u0007u\u0002\u0002\u00f1\u00f2\u0007v\u0002\u0002",
    "\u00f2\u00f3\u0003\u0002\u0002\u0002\u00f3\u00f4\u0005\u000b\u0006\u0002",
    "\u00f4\u00f5\u0007v\u0002\u0002\u00f5\u00f6\u0007v\u0002\u0002\u00f6",
    "\u00f7\u0007c\u0002\u0002\u00f7\u00f8\u0007e\u0002\u0002\u00f8\u00f9",
    "\u0007m\u0002\u0002\u00f9J\u0003\u0002\u0002\u0002\u00fa\u00fb\u0005",
    "/\u0018\u0002\u00fb\u00fc\u0007j\u0002\u0002\u00fc\u00fd\u0007k\u0002",
    "\u0002\u00fd\u00fe\u0007g\u0002\u0002\u00fe\u00ff\u0007n\u0002\u0002",
    "\u00ff\u0100\u0007f\u0002\u0002\u0100\u0101\u0003\u0002\u0002\u0002",
    "\u0101\u0102\u0007\"\u0002\u0002\u0102\u0103\u0005\r\u0007\u0002\u0103",
    "\u0104\u0007n\u0002\u0002\u0104\u0105\u0007c\u0002\u0002\u0105\u0106",
    "\u0007u\u0002\u0002\u0106\u0107\u0007v\u0002\u0002\u0107L\u0003\u0002",
    "\u0002\u0002\u0108\u0109\u0005\u0011\t\u0002\u0109\u010a\u0007q\u0002",
    "\u0002\u010a\u010b\u0007w\u0002\u0002\u010b\u010c\u0007d\u0002\u0002",
    "\u010c\u010d\u0007n\u0002\u0002\u010d\u010e\u0007g\u0002\u0002\u010e",
    "\u010f\u0003\u0002\u0002\u0002\u010f\u0110\u0005\r\u0007\u0002\u0110",
    "\u0111\u0007t\u0002\u0002\u0111\u0112\u0007g\u0002\u0002\u0112\u0113",
    "\u0007c\u0002\u0002\u0113\u0114\u0007m\u0002\u0002\u0114\u0115\u0007",
    "g\u0002\u0002\u0115\u0116\u0007t\u0002\u0002\u0116N\u0003\u0002\u0002",
    "\u0002\u0117\u011b\u0007*\u0002\u0002\u0118\u011a\u000b\u0002\u0002",
    "\u0002\u0119\u0118\u0003\u0002\u0002\u0002\u011a\u011d\u0003\u0002\u0002",
    "\u0002\u011b\u011c\u0003\u0002\u0002\u0002\u011b\u0119\u0003\u0002\u0002",
    "\u0002\u011c\u011e\u0003\u0002\u0002\u0002\u011d\u011b\u0003\u0002\u0002",
    "\u0002\u011e\u011f\u0007+\u0002\u0002\u011fP\u0003\u0002\u0002\u0002",
    "\u0120\u0121\u0007{\u0002\u0002\u0121\u0122\u0007q\u0002\u0002\u0122",
    "\u0123\u0007w\u0002\u0002\u0123\u0124\u0007\"\u0002\u0002\u0124\u0125",
    "\u0007o\u0002\u0002\u0125\u0126\u0007c\u0002\u0002\u0126\u0127\u0007",
    "{\u0002\u0002\u0127R\u0003\u0002\u0002\u0002\u0128\u0129\u0007\"\u0002",
    "\u0002\u0129\u012a\u0007q\u0002\u0002\u012a\u012b\u0007t\u0002\u0002",
    "\u012b\u012c\u0007\"\u0002\u0002\u012c\u012d\u0007n\u0002\u0002\u012d",
    "\u012e\u0007g\u0002\u0002\u012e\u012f\u0007u\u0002\u0002\u012f\u0130",
    "\u0007u\u0002\u0002\u0130T\u0003\u0002\u0002\u0002\u0131\u0132\u0007",
    "\"\u0002\u0002\u0132\u0133\u0007q\u0002\u0002\u0133\u0134\u0007t\u0002",
    "\u0002\u0134\u0135\u0007\"\u0002\u0002\u0135\u0136\u0007o\u0002\u0002",
    "\u0136\u0137\u0007q\u0002\u0002\u0137\u0138\u0007t\u0002\u0002\u0138",
    "\u0139\u0007g\u0002\u0002\u0139V\u0003\u0002\u0002\u0002\u013a\u013b",
    "\u0005\u0011\t\u0002\u013b\u013c\u0007t\u0002\u0002\u013c\u013d\u0007",
    "c\u0002\u0002\u013d\u013e\u0007y\u0002\u0002\u013e\u013f\u0007\"\u0002",
    "\u0002\u013f\u0140\u0007c\u0002\u0002\u0140\u0141\u0007\"\u0002\u0002",
    "\u0141\u0142\u0007e\u0002\u0002\u0142\u0143\u0007c\u0002\u0002\u0143",
    "\u0144\u0007t\u0002\u0002\u0144\u0145\u0007f\u0002\u0002\u0145X\u0003",
    "\u0002\u0002\u0002\u0146\u0147\u0005\u0011\t\u0002\u0147\u0148\u0007",
    "t\u0002\u0002\u0148\u0149\u0007c\u0002\u0002\u0149\u014a\u0007y\u0002",
    "\u0002\u014a\u014b\u0007\"\u0002\u0002\u014b\u014c\u00074\u0002\u0002",
    "\u014c\u014d\u0007\"\u0002\u0002\u014d\u014e\u0007e\u0002\u0002\u014e",
    "\u014f\u0007c\u0002\u0002\u014f\u0150\u0007t\u0002\u0002\u0150\u0151",
    "\u0007f\u0002\u0002\u0151\u0152\u0007u\u0002\u0002\u0152Z\u0003\u0002",
    "\u0002\u0002\u0153\u0154\u00057\u001c\u0002\u0154\u0155\u0007j\u0002",
    "\u0002\u0155\u0156\u0007g\u0002\u0002\u0156\u0157\u0007p\u0002\u0002",
    "\u0157\u0158\u0007g\u0002\u0002\u0158\u0159\u0007x\u0002\u0002\u0159",
    "\u015a\u0007g\u0002\u0002\u015a\u015b\u0007t\u0002\u0002\u015b\u015c",
    "\u0007\"\u0002\u0002\u015c\u015d\u0007v\u0002\u0002\u015d\u015e\u0007",
    "j\u0002\u0002\u015e\u015f\u0007k\u0002\u0002\u015f\u0160\u0007u\u0002",
    "\u0002\u0160\u0161\u0007\"\u0002\u0002\u0161\u0162\u0007e\u0002\u0002",
    "\u0162\u0163\u0007t\u0002\u0002\u0163\u0164\u0007g\u0002\u0002\u0164",
    "\u0165\u0007c\u0002\u0002\u0165\u0166\u0007v\u0002\u0002\u0166\u0167",
    "\u0007w\u0002\u0002\u0167\u0168\u0007t\u0002\u0002\u0168\u0169\u0007",
    "g\u0002\u0002\u0169\u016a\u0007\"\u0002\u0002\u016a\u016b\u0007c\u0002",
    "\u0002\u016b\u016c\u0007v\u0002\u0002\u016c\u016d\u0007v\u0002\u0002",
    "\u016d\u016e\u0007c\u0002\u0002\u016e\u016f\u0007e\u0002\u0002\u016f",
    "\u0170\u0007m\u0002\u0002\u0170\u0171\u0007u\u0002\u0002\u0171\u0172",
    "\u0007.\u0002\u0002\u0172\\\u0003\u0002\u0002\u0002\u0173\u0174\u0005",
    "7\u001c\u0002\u0174\u0175\u0007j\u0002\u0002\u0175\u0176\u0007g\u0002",
    "\u0002\u0176\u0177\u0007p\u0002\u0002\u0177\u0178\u0007\"\u0002\u0002",
    "\u0178\u0179\u0007v\u0002\u0002\u0179\u017a\u0007j\u0002\u0002\u017a",
    "\u017b\u0007k\u0002\u0002\u017b\u017c\u0007u\u0002\u0002\u017c\u017d",
    "\u0007\"\u0002\u0002\u017d\u017e\u0007e\u0002\u0002\u017e\u017f\u0007",
    "t\u0002\u0002\u017f\u0180\u0007g\u0002\u0002\u0180\u0181\u0007c\u0002",
    "\u0002\u0181\u0182\u0007v\u0002\u0002\u0182\u0183\u0007w\u0002\u0002",
    "\u0183\u0184\u0007t\u0002\u0002\u0184\u0185\u0007g\u0002\u0002\u0185",
    "\u0186\u0007\"\u0002\u0002\u0186\u0187\u0007g\u0002\u0002\u0187\u0188",
    "\u0007p\u0002\u0002\u0188\u0189\u0007v\u0002\u0002\u0189\u018a\u0007",
    "g\u0002\u0002\u018a\u018b\u0007t\u0002\u0002\u018b\u018c\u0007u\u0002",
    "\u0002\u018c\u018d\u0007\"\u0002\u0002\u018d\u018e\u0007v\u0002\u0002",
    "\u018e\u018f\u0007j\u0002\u0002\u018f\u0190\u0007g\u0002\u0002\u0190",
    "\u0191\u0007\"\u0002\u0002\u0191\u0192\u0007d\u0002\u0002\u0192\u0193",
    "\u0007c\u0002\u0002\u0193\u0194\u0007v\u0002\u0002\u0194\u0195\u0007",
    "v\u0002\u0002\u0195\u0196\u0007n\u0002\u0002\u0196\u0197\u0007g\u0002",
    "\u0002\u0197\u0198\u0007\"\u0002\u0002\u0198\u0199\u0007|\u0002\u0002",
    "\u0199\u019a\u0007q\u0002\u0002\u019a\u019b\u0007p\u0002\u0002\u019b",
    "\u019c\u0007g\u0002\u0002\u019c\u019d\u0007.\u0002\u0002\u019d^\u0003",
    "\u0002\u0002\u0002\u019e\u019f\u00051\u0019\u0002\u019f\u01a0\u0007",
    "j\u0002\u0002\u01a0\u01a1\u0007k\u0002\u0002\u01a1\u01a2\u0007u\u0002",
    "\u0002\u01a2\u01a3\u0007\"\u0002\u0002\u01a3\u01a4\u0007e\u0002\u0002",
    "\u01a4\u01a5\u0007t\u0002\u0002\u01a5\u01a6\u0007g\u0002\u0002\u01a6",
    "\u01a7\u0007c\u0002\u0002\u01a7\u01a8\u0007v\u0002\u0002\u01a8\u01a9",
    "\u0007w\u0002\u0002\u01a9\u01aa\u0007t\u0002\u0002\u01aa\u01ab\u0007",
    "g\u0002\u0002\u01ab\u01ac\u0007\"\u0002\u0002\u01ac\u01ad\u0007e\u0002",
    "\u0002\u01ad\u01ae\u0007c\u0002\u0002\u01ae\u01af\u0007p\u0002\u0002",
    "\u01af\u01b0\u0007)\u0002\u0002\u01b0\u01b1\u0007v\u0002\u0002\u01b1",
    "\u01b2\u0007\"\u0002\u0002\u01b2\u01b3\u0007d\u0002\u0002\u01b3\u01b4",
    "\u0007g\u0002\u0002\u01b4\u01b5\u0007\"\u0002\u0002\u01b5\u01b6\u0007",
    "d\u0002\u0002\u01b6\u01b7\u0007n\u0002\u0002\u01b7\u01b8\u0007q\u0002",
    "\u0002\u01b8\u01b9\u0007e\u0002\u0002\u01b9\u01ba\u0007m\u0002\u0002",
    "\u01ba\u01bb\u0007g\u0002\u0002\u01bb\u01bc\u0007f\u0002\u0002\u01bc",
    "`\u0003\u0002\u0002\u0002\u01bd\u01be\u0007d\u0002\u0002\u01be\u01bf",
    "\u0007{\u0002\u0002\u01bf\u01c0\u0007\"\u0002\u0002\u01c0\u01c1\u0007",
    "e\u0002\u0002\u01c1\u01c2\u0007t\u0002\u0002\u01c2\u01c3\u0007g\u0002",
    "\u0002\u01c3\u01c4\u0007c\u0002\u0002\u01c4\u01c5\u0007v\u0002\u0002",
    "\u01c5\u01c6\u0007w\u0002\u0002\u01c6\u01c7\u0007t\u0002\u0002\u01c7",
    "\u01c8\u0007g\u0002\u0002\u01c8\u01c9\u0007u\u0002\u0002\u01c9\u01ca",
    "\u0007\"\u0002\u0002\u01ca\u01cb\u0007v\u0002\u0002\u01cb\u01cc\u0007",
    "j\u0002\u0002\u01cc\u01cd\u0007c\u0002\u0002\u01cd\u01ce\u0007v\u0002",
    "\u0002\u01ce\u01cf\u0007\"\u0002\u0002\u01cf\u01d0\u0007j\u0002\u0002",
    "\u01d0\u01d1\u0007c\u0002\u0002\u01d1\u01d2\u0007x\u0002\u0002\u01d2",
    "\u01d3\u0007g\u0002\u0002\u01d3\u01d4\u0007\"\u0002\u0002\u01d4\u01d5",
    "\u0007n\u0002\u0002\u01d5\u01d6\u0007g\u0002\u0002\u01d6\u01d7\u0007",
    "u\u0002\u0002\u01d7\u01d8\u0007u\u0002\u0002\u01d8\u01d9\u0007\"\u0002",
    "\u0002\u01d9\u01da\u0007r\u0002\u0002\u01da\u01db\u0007q\u0002\u0002",
    "\u01db\u01dc\u0007y\u0002\u0002\u01dc\u01dd\u0007g\u0002\u0002\u01dd",
    "\u01de\u0007t\u0002\u0002\u01de\u01df\u0007\"\u0002\u0002\u01df\u01e0",
    "\u0007v\u0002\u0002\u01e0\u01e1\u0007j\u0002\u0002\u01e1\u01e2\u0007",
    "c\u0002\u0002\u01e2\u01e3\u0007p\u0002\u0002\u01e3\u01e4\u0007\"\u0002",
    "\u0002\u01e4\u01e5\u0007k\u0002\u0002\u01e5\u01e6\u0007v\u0002\u0002",
    "\u01e6b\u0003\u0002\u0002\u0002\u01e7\u01e8\u0005-\u0017\u0002\u01e8",
    "\u01e9\u0007g\u0002\u0002\u01e9\u01ea\u0007v\u0002\u0002\u01ea\u01eb",
    "\u0007w\u0002\u0002\u01eb\u01ec\u0007t\u0002\u0002\u01ec\u01ed\u0007",
    "p\u0002\u0002\u01ed\u01ee\u0007\"\u0002\u0002\u01ee\u01ef\u0007v\u0002",
    "\u0002\u01ef\u01f0\u0007c\u0002\u0002\u01f0\u01f1\u0007t\u0002\u0002",
    "\u01f1\u01f2\u0007i\u0002\u0002\u01f2\u01f3\u0007g\u0002\u0002\u01f3",
    "\u01f4\u0007v\u0002\u0002\u01f4d\u0003\u0002\u0002\u0002\u01f5\u01f6",
    "\u0005\u0015\u000b\u0002\u01f6\u01f7\u0007t\u0002\u0002\u01f7\u01f8",
    "\u0007q\u0002\u0002\u01f8\u01f9\u0007o\u0002\u0002\u01f9\u01fa\u0007",
    "\"\u0002\u0002\u01fa\u01fb\u0007v\u0002\u0002\u01fb\u01fc\u0007j\u0002",
    "\u0002\u01fc\u01fd\u0007g\u0002\u0002\u01fd\u01fe\u0007\"\u0002\u0002",
    "\u01fe\u01ff\u0007d\u0002\u0002\u01ff\u0200\u0007c\u0002\u0002\u0200",
    "\u0201\u0007v\u0002\u0002\u0201\u0202\u0007v\u0002\u0002\u0202\u0203",
    "\u0007n\u0002\u0002\u0203\u0204\u0007g\u0002\u0002\u0204\u0205\u0007",
    "\"\u0002\u0002\u0205\u0206\u0007|\u0002\u0002\u0206\u0207\u0007q\u0002",
    "\u0002\u0207\u0208\u0007p\u0002\u0002\u0208\u0209\u0007g\u0002\u0002",
    "\u0209\u020a\u0007\"\u0002\u0002\u020a\u020b\u0007v\u0002\u0002\u020b",
    "\u020c\u0007q\u0002\u0002\u020c\u020d\u0007\"\u0002\u0002\u020d\u020e",
    "\u0007k\u0002\u0002\u020e\u020f\u0007v\u0002\u0002\u020f\u0210\u0007",
    "u\u0002\u0002\u0210\u0211\u0007\"\u0002\u0002\u0211\u0212\u0007q\u0002",
    "\u0002\u0212\u0213\u0007y\u0002\u0002\u0213\u0214\u0007p\u0002\u0002",
    "\u0214\u0215\u0007g\u0002\u0002\u0215\u0216\u0007t\u0002\u0002\u0216",
    "\u0217\u0007)\u0002\u0002\u0217\u0218\u0007u\u0002\u0002\u0218\u0219",
    "\u0007\"\u0002\u0002\u0219\u021a\u0007j\u0002\u0002\u021a\u021b\u0007",
    "c\u0002\u0002\u021b\u021c\u0007p\u0002\u0002\u021c\u021d\u0007f\u0002",
    "\u0002\u021df\u0003\u0002\u0002\u0002\u021e\u021f\u00070\u0002\u0002",
    "\u021fh\u0003\u0002\u0002\u0002\u0220\u0222\u000b\u0002\u0002\u0002",
    "\u0221\u0220\u0003\u0002\u0002\u0002\u0222\u0223\u0003\u0002\u0002\u0002",
    "\u0223\u0224\u0003\u0002\u0002\u0002\u0223\u0221\u0003\u0002\u0002\u0002",
    "\u0224\u0225\u0003\u0002\u0002\u0002\u0225\u0226\u0007\u2016\u0002\u0002",
    "\u0226j\u0003\u0002\u0002\u0002\u0227\u0229\t\u001c\u0002\u0002\u0228",
    "\u0227\u0003\u0002\u0002\u0002\u0229\u022a\u0003\u0002\u0002\u0002\u022a",
    "\u0228\u0003\u0002\u0002\u0002\u022a\u022b\u0003\u0002\u0002\u0002\u022b",
    "l\u0003\u0002\u0002\u0002\u022c\u022e\t\u001d\u0002\u0002\u022d\u022c",
    "\u0003\u0002\u0002\u0002\u022e\u022f\u0003\u0002\u0002\u0002\u022f\u022d",
    "\u0003\u0002\u0002\u0002\u022f\u0230\u0003\u0002\u0002\u0002\u0230\u0231",
    "\u0003\u0002\u0002\u0002\u0231\u0232\b7\u0002\u0002\u0232n\u0003\u0002",
    "\u0002\u0002\u0007\u0002\u011b\u0223\u022a\u022f\u0003\b\u0002\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function RulesLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

RulesLexer.prototype = Object.create(antlr4.Lexer.prototype);
RulesLexer.prototype.constructor = RulesLexer;

Object.defineProperty(RulesLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

RulesLexer.EOF = antlr4.Token.EOF;
RulesLexer.T__0 = 1;
RulesLexer.T__1 = 2;
RulesLexer.T__2 = 3;
RulesLexer.T__3 = 4;
RulesLexer.DESTROY = 5;
RulesLexer.BANISH = 6;
RulesLexer.BLOCKER = 7;
RulesLexer.GUARD = 8;
RulesLexer.SLAYER = 9;
RulesLexer.FASTATTACK = 10;
RulesLexer.SHIELDBLAST = 11;
RulesLexer.DOUBLEBREAKER = 12;
RulesLexer.REMINDERTEXT = 13;
RulesLexer.OPTIONALTEXT = 14;
RulesLexer.ORLESS = 15;
RulesLexer.ORMORE = 16;
RulesLexer.DRAWONE = 17;
RulesLexer.DRAWTWO = 18;
RulesLexer.ONATTACK = 19;
RulesLexer.ONENTER = 20;
RulesLexer.UNBLOCKABLE = 21;
RulesLexer.LESSPOWER = 22;
RulesLexer.BOUNCEPRE = 23;
RulesLexer.BOUNCEPOST = 24;
RulesLexer.PERIOD = 25;
RulesLexer.FLAVORTEXT = 26;
RulesLexer.INTEGER = 27;
RulesLexer.WHITESPACE = 28;

RulesLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

RulesLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

RulesLexer.prototype.literalNames = [ null, "'creature'", "'enemy'", "'untapped'", 
                                      "'that is level '", null, null, null, 
                                      null, null, null, null, null, null, 
                                      "'you may'", "' or less'", "' or more'", 
                                      null, null, null, null, null, "'by creatures that have less power than it'", 
                                      null, null, "'.'" ];

RulesLexer.prototype.symbolicNames = [ null, null, null, null, null, "DESTROY", 
                                       "BANISH", "BLOCKER", "GUARD", "SLAYER", 
                                       "FASTATTACK", "SHIELDBLAST", "DOUBLEBREAKER", 
                                       "REMINDERTEXT", "OPTIONALTEXT", "ORLESS", 
                                       "ORMORE", "DRAWONE", "DRAWTWO", "ONATTACK", 
                                       "ONENTER", "UNBLOCKABLE", "LESSPOWER", 
                                       "BOUNCEPRE", "BOUNCEPOST", "PERIOD", 
                                       "FLAVORTEXT", "INTEGER", "WHITESPACE" ];

RulesLexer.prototype.ruleNames = [ "T__0", "T__1", "T__2", "T__3", "A", 
                                   "B", "C", "D", "E", "F", "G", "H", "I", 
                                   "J", "K", "L", "M", "N", "O", "P", "Q", 
                                   "R", "S", "T", "U", "V", "W", "X", "Y", 
                                   "Z", "DESTROY", "BANISH", "BLOCKER", 
                                   "GUARD", "SLAYER", "FASTATTACK", "SHIELDBLAST", 
                                   "DOUBLEBREAKER", "REMINDERTEXT", "OPTIONALTEXT", 
                                   "ORLESS", "ORMORE", "DRAWONE", "DRAWTWO", 
                                   "ONATTACK", "ONENTER", "UNBLOCKABLE", 
                                   "LESSPOWER", "BOUNCEPRE", "BOUNCEPOST", 
                                   "PERIOD", "FLAVORTEXT", "INTEGER", "WHITESPACE" ];

RulesLexer.prototype.grammarFileName = "Rules.g4";



exports.RulesLexer = RulesLexer;

