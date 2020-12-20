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
    this.atkindex = -9;
    this.validblocker = false;
    this.skirmisher = false;
    this.id = "";
    this.filters = [];
    this.onAttackAbilities = [];
    this.onEnterAbilities = [];
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
    this.atkindex = index;
  }
  OnAttack(game, player, opp, c, index)
  {
    //default to do nothing 
  }
  OnEndAttack(game, player, opp, c, index)
  {
    this.attacking = false;
    this.atkindex = -9;
    game.emitState();
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
  ValidBlocker(c)
  {
    return true;
  }
  OnEndAttrib(game, player, opp)
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
    
    for (var i = 0; i < 10/*9results.length*/; i++) {
      var c = new Card();
      c.name = results[i].getAttribute("name");
      console.log(c.name);
      c.id = results[i].getAttribute("id");

      var properties = results[i].getElementsByTagName("property");
      for (var j = 0; j < properties.length; j++) {
        switch(properties[j].getAttribute("name")) {
          case "Level":
            c.cost = parseInt(properties[j].getAttribute("value"));
            break;
          case "Civilization":
            c.color = properties[j].getAttribute("value");
            break;
          case "Type":
            c.type = properties[j].getAttribute("value");
            break;
          case "Race":
            c.race = properties[j].getAttribute("value");
            break;
          case "Power":
            c.power = parseInt(properties[j].getAttribute("value"));
            break;
          case "Rules":
            var rules = properties[j].getAttribute("value");
            //c.text = rules;
            console.log(rules);
            ParseRules(c, rules);
            break;
        }
      }
      //console.log(c);
      this.cardMap[c.name] = c;
    }
    // var i = 1;
    // while (results.data[i] != null)
    // {
    //   var c = new Card();
    //   c.name = results.data[i][0];
    //   c.type = results.data[i][1];
    //   c.color = results.data[i][2];
    //   c.race = results.data[i][3];
    //   c.cost = parseInt(results.data[i][4]);
    //   c.power = parseInt(results.data[i][5]);
    //   c.rarity = results.data[i][6];
    //   c.text = results.data[i][7];
    //   ParseRules(c, results.data[i][7]);
    //   this.cardMap[c.name] = c;
    //   i++;
    // } 
  };
  
  this.GetCard = function(name) {
    if (name == 'collection')
    {
      return this.cardMap;
    }
    else if (name in this.cardMap) {
      return Object.assign(Object.create(Card.prototype), this.cardMap[name]);
    }
    else
    {
      console.log("Unable to find: "+name);
      return null;
    }
  };
   
}
