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
  }
  OnEnter(game, player, opp, c, index)
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
  OnBlock(game, id)
  {
    this.tapped = true;
  }
}

class PyroTrooper extends Card
{
  constructor()
  {
    super();
    this.name = "Pyro Trooper";
    this.type = "Creature";
    this.color = "Red";
    this.cost = 4;
    this.power = 3000;
    this.race = "Drakon";
    this.text = "Power Attack +2000";
  }
  OnDeclareAttack(game, player, opp, c, index)
  {
    super.OnDeclareAttack(game, player, opp, c, index);
    this.power += 2000;
  }
  OnEndAttack(game, player, opp, c, index)
  {
    super.OnEndAttack(game, player, opp, c, index);
    this.power -= 2000;
  }
}

class GatlingSkyterror extends Card
{
  constructor()
  {
    super();
    this.name = "Gatling Skyterror";
    this.type = "Creature";
    this.color = "Red";
    this.cost = 3;
    this.power = 3000;
    this.race = "Attack Raptor";
  }
}

class LittleHissy extends Card
{
  constructor()
  {
    super();
    this.name = "Little Hissy";
    this.type = "Creature";
    this.color = "Red";
    this.cost = 3;
    this.power = 2000;
    this.race = "Dune Gecko";
    this.text = "Can attack untapped creatures.";
    this.atkuntapped = true;
  }
}

class SimianTrooperGrash extends Card
{
  constructor()
  {
    super();
    this.name = "Simian Trooper Grash";
    this.type = "Creature";
    this.color = "Red";
    this.cost = 4;
    this.power = 4000;
    this.race = "Stomper";
  }
}

class Flametropus extends Card
{
  constructor()
  {
    super();
    this.name = "Flametropus";
    this.type = "Creature";
    this.color = "Red";
    this.cost = 5;
    this.power = 4000;
    this.race = "Rock Brute";
    this.text = "If Alone: Power Attack +4000";
    this.buffed = false;
  }
  OnDeclareAttack(game, player, opp, c, index)
  {
    super.OnDeclareAttack(game, player, opp, c, index);
    if (player.field.length == 1)
    {
      this.power += 4000;
      this.buffed = true;
    }
  }
  OnEndAttack(game, player, opp, c, index)
  {
    super.OnEndAttack(game, player, opp, c, index);
    if (this.buffed)
    {
      this.power -= 4000;
      this.buffed = false;
    }
  }
}

class KingPontias extends Card
{
  constructor()
  {
    super();
    this.name = "King Pontias";
    this.type = "Creature";
    this.color = "Blue";
    this.cost = 6;
    this.power = 4000;
    this.race = "Leviathan";
    this.text = "Unblockable";
    this.unblockable = true;
  }
}

class BlazeBelcher extends Card
{
  constructor()
  {
    super();
    this.name = "Blaze Belcher";
    this.type = "Creature";
    this.color = "Red";
    this.cost = 1;
    this.power = 24000;
    this.race = "Burn Belly";
    this.text = "Must attack each turn if able.";
    this.mustattack = true;
  }
}

class Draglide extends Card
{
  constructor()
  {
    super();
    this.name = "Draglide the Swiftest";
    this.type = "Creature";
    this.color = "Red";
    this.cost = 4;
    this.power = 2000;
    this.race = "Attack Raptor";
    this.text = "Fast Attack";
    this.canattack = true;
  }
}

class Frogzooka extends Card
{
  constructor()
  {
    super();
    this.name = "Frogzooka";
    this.type = "Creature";
    this.color = "Blue";
    this.cost = 4;
    this.power = 5000;
    this.race = "Trench Hunter";
    this.text = "Blocker, Guard";
    this.blocker = true;
    this.guard = true;
  }
}

class Tatsurion extends Card
{
  constructor()
  {
    super();
    this.name = "Tatsurion";
    this.type = "Creature";
    this.color = "Red";
    this.cost = 6;
    this.power = 6000;
    this.race = "Armored Dragon/Beast Kin";
    this.text = "Fast Skirmisher";
    this.fastSkirmish = true;
  }
}

class ReefEye extends Card
{
  constructor()
  {
    super();
    this.name = "Reef-Eye";
    this.type = "Creature";
    this.color = "Blue";
    this.cost = 1;
    this.power = 3000;
    this.race = "Trench Hunter";
    this.text = "Blocker, Guard";
    this.blocker = true;
    this.guard = true;
  }
}

class HydrobotCrab extends Card
{
  constructor()
  {
    super();
    this.name = "Hydrobot Crab";
    this.type = "Creature";
    this.color = "Blue";
    this.cost = 5;
    this.power = 4000;
    this.race = "Undertow Engine";
    this.text = "";
  }
}

class HydroSpy extends Card
{
  constructor()
  {
    super();
    this.name = "Hydro Spy";
    this.type = "Creature";
    this.color = "Blue";
    this.cost = 1;
    this.power = 1000;
    this.race = "Cyber Lord";
    this.text = "On Enter: Draw 1 card.";
  }
  
  OnEnter(game, player, opp, c, index)
  {
    game.pushStack(c, player, opp);
  }
  
  Resolve(game, player, opp, c, index)
  {
    game.drawCard(player);
    game.emitState();
  }
}

class AquaSeneschal extends Card
{
  constructor()
  {
    super();
    this.name = "Aqua Seneschal";
    this.type = "Creature";
    this.color = "Blue";
    this.cost = 1;
    this.power = 2000;
    this.race = "Cyber Lord";
    this.text = "On Attack: Draw 1 card.";
  }
  
  OnAttack(game, player, opp, c, index)
  {
    game.pushStack(c, player, opp);
  }
  
  Resolve(game, player, opp, c, index)
  {
    game.drawCard(player);
  }
}

class KingNautilus extends Card
{
  constructor()
  {
    super();
    this.name = "King Nautilus";
    this.type = "Creature";
    this.color = "Blue";
    this.cost = 1;
    this.power = 5000;
    this.race = "Leviathan";
    this.text = "On Attack: Draw 2 cards.";
  }
  
  OnAttack(game, player, opp, c, index)
  {
    game.pushStack(c, player, opp);
  }
  
  Resolve(game, player, opp, c, index)
  {
    game.drawCard(player);
    game.drawCard(player);
  }
}

class Razorkinder extends Card
{
  constructor()
  {
    super();
    this.name = "Razorkinder";
    this.type = "Creature";
    this.color = "Purple";
    this.cost = 1;
    this.power = 4000;
    this.race = "Evil Toy";
    this.text = "On Enter: Banish target untapped enemy creature."
  }
  
  TargetReturned(game, player, opp, index)
  {
    game.destroyCreature(opp, index);
    game.emitState();
  }
  
  OnEnter(game, player, opp, card, index)
  {
    game.pushStack(card, player, opp);
  }
  
  Resolve(game, player, opp, card, index)
  {
    var targets = [];
    for (var i = 0; i < opp.field.length; i++)
    {
      if (!opp.field[i].tapped)
      {
        targets.push(i);
      }
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
      game.waitForTargets = true;
      game.waitForTargetsSrc = this;
    }
  }
}

class TerrorPit extends Card
{
  constructor()
  {
    super();
    this.name = "Terror Pit";
    this.type = "Spell";
    this.color = "Purple";
    this.cost = 1;
    this.text = "Shield Blast: Destroy target enemy creature."
    this.shieldblast = true;
  }
  
  TargetReturned(game, player, opp, index)
  {
    game.destroyCreature(opp, index);
    game.emitState();
  }
  
  Resolve(game, player, opp, card, index)
  {
    var targets = [];
    for (var i = 0; i < opp.field.length; i++)
    {
      targets.push(i);
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
      game.waitForTargets = true;
      game.waitForTargetsSrc = this;
    }
  }
}

class SpyMission extends Card
{
  constructor()
  {
    super();
    this.name = "Spy Mission";
    this.type = "Spell";
    this.color = "Blue";
    this.cost = 1;
    this.text = "Shield Blast: Draw 2 cards."
    this.shieldblast = true;
  }
  
  Resolve(game, player, opp, card, index)
  {
    game.drawCard(player);
    game.drawCard(player);
  }
}


module.exports = {
  Card : Card,
  HydroSpy : HydroSpy,
  Razorkinder : Razorkinder,
  AquaSeneschal : AquaSeneschal,
  KingNautilus : KingNautilus,
  Frogzooka : Frogzooka,
  ReefEye : ReefEye,
  HydrobotCrab : HydrobotCrab,
  KingPontias : KingPontias,
  Draglide : Draglide,
  Tatsurion : Tatsurion,
  BlazeBelcher : BlazeBelcher,
  Flametropus : Flametropus,
  PyroTrooper : PyroTrooper,
  GatlingSkyterror : GatlingSkyterror,
  SimianTrooperGrash : SimianTrooperGrash,
  LittleHissy : LittleHissy,
  TerrorPit : TerrorPit,
  SpyMission : SpyMission
}