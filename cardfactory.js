var ParseRules = require('./rulesparser.js')

class Attribute
{
  constructor(attribute, modification)
  {
    this.attribute = attribute;
    this.modification = modification;
  }
}

class Card 
{
  constructor()
  {
    this.name = "";
    this.type = "";
    this.color = "";
    this.cost = 0;
    this.power = 0;
    this.race = "";
    this.canattack = false;
    this.tapped = false;
    this.attacking = false;
    this.text = "";
    this.fastSkirmish = false;
    this.blocker = false;
    this.guard = false;
    this.unblockable = false;
    this.mustattack = false;
    this.atkuntapped = false;
    this.shieldblast = false;
    this.slayer = false;
    this.attributes = [];
  }
  OnEnter(game, player, opp, c, index)
  {
    //default to do nothing
  }
  OnExit(game, player, opp, c)
  {
    //default to do nothing
  }
  OnDeclareAttack(game, player, opp, c, index)
  {
    this.tapped = true;
    this.attacking = true; 
  }
  OnAttack(game, player, opp, c, index)
  {
    //default to do nothing 
  }
  OnEndAttack(game, player, opp, c, index)
  {
    this.attacking = false;
  }
  OnWinBattle(game, player, opp, c)
  {
    //default to do nothing
  }
  OnBlock(game, id)
  {
    this.tapped = true;
  }
  ApplyAttribute(game, player, opp, c)
  {
    //default to do nothing
  }
  ComputePower()
  {
    var pow = this.power;
    for (var i = 0; i < this.attributes.length; i++)
    {
      if (this.attributes[i].attribute == "power")
      {
        pow += this.attributes[i].modification;
      }
    }
    return pow;
  }
}

module.exports = function CardFactory()
{
  this.cardMap = {};  

  this.Create = function(results) {
    var i = 1;
    while (results.data[i] != null)
    {
      var c = new Card();
      c.name = results.data[i][0];
      c.type = results.data[i][1];
      c.color = results.data[i][2];
      c.race = results.data[i][3];
      c.cost = parseInt(results.data[i][4]);
      c.power = parseInt(results.data[i][5]);
      c.rarity = results.data[i][6];
      c.text = results.data[i][7];
      ParseRules(c, results.data[i][7]);
      this.cardMap[c.name] = c;
      i++;
    } 
  };
  
  this.GetCard = function(name) {
    return this.cardMap[name];
  };
   
}
