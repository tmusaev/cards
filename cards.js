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
    game.emitState();
  }
}

class AlcadeusWingedJustice extends Card
{
  constructor()
  {
    super();
    this.name = "Alcadeus, Winged Justice";
    this.type = "Creature";
    this.color = "Yellow";
    this.cost = 7;
    this.power = 6000;
    this.race = "Skyforce Champion";
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

class BrainSquirmer extends Card
{
  constructor()
  {
    super();
    this.name = "Brain Squirmer";
    this.type = "Creature";
    this.color = "Purple";
    this.cost = 2;
    this.power = 2000;
    this.race = "Rot Worm";
  }
}

class AmbushScorpion extends Card
{
  constructor()
  {
    super();
    this.name = "Ambush Scorpion";
    this.type = "Creature";
    this.color = "Green";
    this.cost = 2;
    this.power = 2000;
    this.race = "Megabug";
  }
}

class RumblingTerrasaur extends Card
{
  constructor()
  {
    super();
    this.name = "Rumbling Terrasaur";
    this.type = "Creature";
    this.color = "Green";
    this.cost = 5;
    this.power = 5000;
    this.race = "Tusker";
  }
}

class BraveGiant extends Card
{
  constructor()
  {
    super();
    this.name = "Brave Giant";
    this.type = "Creature";
    this.color = "Green";
    this.cost = 7;
    this.power = 7000;
    this.race = "Colossus";
  }
}

class RoamingBloodmane extends Card
{
  constructor()
  {
    super();
    this.name = "Roaming Bloodmane";
    this.type = "Creature";
    this.color = "Green";
    this.cost = 7;
    this.power = 6000;
    this.race = "Beast Kin";
    this.text = "This creature can't be blocked by creatures that have less power than it.";
  }
  
  ValidBlocker(c)
  {
    if (c.ComputePower() >= this.ComputePower())
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}

class Gigargon extends Card
{
  constructor()
  {
    super();
    this.name = "Gigargon";
    this.type = "Creature";
    this.color = "Purple";
    this.cost = 8;
    this.power = 9000;
    this.race = "Chimera";
  }
}

class GraveWormHatchling extends Card
{
  constructor()
  {
    super();
    this.name = "Grave Worm Hatchling";
    this.type = "Creature";
    this.color = "Purple";
    this.cost = 4;
    this.power = 3000;
    this.race = "Rot Worm";
  }
}

class HorridStinger extends Card
{
  constructor()
  {
    super();
    this.name = "Horrid Stinger";
    this.type = "Creature";
    this.color = "Purple";
    this.cost = 5;
    this.power = 3000;
    this.race = "Rot Worm";
    this.text = "Your other Rot Worms get +2000 power."
  }
  
  OnEnter(game, player, opp, c, index)
  {
    player.attribList.push(this);
    game.recalculateAttributes();
  }
  
  OnExit(game, player, opp, c)
  {
    player.attribList.splice(player.attribList.indexOf(this), 1)[0];
    game.recalculateAttributes();
  }
  
  ApplyAttribute(game, player, opp, c)
  {
    if (c.race == "Rot Worm" && c != this && player.field.indexOf(c) >= 0)
    {
      c.attributes.push(new Attribute("power", 2000));
    }
  }
}

class RagingGoliant extends Card
{
  constructor()
  {
    super();
    this.name = "Raging Goliant";
    this.type = "Creature";
    this.color = "Green";
    this.cost = 5;
    this.power = 4000;
    this.race = "Beast Kin";
    this.text = "Your other Beast Kin get +2000 power."
  }
  
  OnEnter(game, player, opp, c, index)
  {
    player.attribList.push(this);
    game.recalculateAttributes();
  }
  
  OnExit(game, player, opp, c)
  {
    player.attribList.splice(player.attribList.indexOf(this), 1)[0];
    game.recalculateAttributes();
  }
  
  ApplyAttribute(game, player, opp, c)
  {
    if (c.race == "Beast Kin" && c != this && player.field.indexOf(c) >= 0)
    {
      c.attributes.push(new Attribute("power", 2000));
    }
  }
}

class EssenceElf extends Card
{
  constructor()
  {
    super();
    this.name = "Essence Elf";
    this.type = "Creature";
    this.color = "Green";
    this.cost = 2;
    this.power = 1000;
    this.race = "Tree Kin";
    this.text = "Your other creatures get +1000 power.";
  }
  
  OnEnter(game, player, opp, c, index)
  {
    player.attribList.push(this);
    game.recalculateAttributes();
  }
  
  OnExit(game, player, opp, c)
  {
    player.attribList.splice(player.attribList.indexOf(this), 1)[0];
    game.recalculateAttributes();
  }
  
  ApplyAttribute(game, player, opp, c)
  {
    if (c != this && player.field.indexOf(c) >= 0)
    {
      c.attributes.push(new Attribute("power", 1000));
    }
  }
}


class SkullCutter extends Card
{
  constructor()
  {
    super();
    this.name = "Skull Cutter";
    this.type = "Creature";
    this.color = "Purple";
    this.cost = 3;
    this.power = 1000;
    this.race = "Dread Mask";
    this.slayer = true;
    this.text = "Slayer";
  }
}

class ZagaanTheBoneKnight extends Card
{
  constructor()
  {
    super();
    this.name = "Zagaan, the Bone Knight";
    this.type = "Creature";
    this.color = "Purple";
    this.cost = 6;
    this.power = 7000;
    this.race = "Shadow Champion";
  }
}

class DreamPirate extends Card
{
  constructor()
  {
    super();
    this.name = "Dream Pirate";
    this.type = "Creature";
    this.color = "Purple";
    this.cost = 3;
    this.power = 3000;
    this.race = "Specter";
    this.blocker = true;
    this.text = "Blocker. When this creature attacks, destroy it at the end of the attack.";
  }
  
  OnEndAttack(game, player, opp, c, index)
  {
    super.OnEndAttack(game, player, opp, c, index);
    game.destroyCreature(player, opp, player.field.indexOf(c));
  }
}

class SkeeterSwarmer extends Card
{
  constructor()
  {
    super();
    this.name = "Skeeter Swarmer";
    this.type = "Creature";
    this.color = "Purple";
    this.cost = 2;
    this.power = 4000;
    this.race = "Brain Jacker";
    this.blocker = true;
    this.guard = true;
    this.text = "Blocker, Guard. When this creature wins a battle, destroy it.";
  }
  
  OnWinBattle(game, player, opp, c)
  {
    game.destroyCreature(player, opp, player.field.indexOf(c));
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
    this.text = "This creature can attack untapped creatures.";
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
    this.text = "While you have no other creatures in the battle zone, this creature has Power Attack +4000.";
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
      game.emitState();
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
    this.power = 1000;
    this.race = "Burn Belly";
    //this.text = "Must attack each turn if able.";
    //this.mustattack = true;
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
    this.text = "This creature can attack tapped creatures on the turn it enters the battle zone.";
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
    this.cost = 2;
    this.power = 3000;
    this.race = "Trench Hunter";
    this.text = "Blocker, Guard";
    this.blocker = true;
    this.guard = true;
  }
}

class SunStalkSeed extends Card
{
  constructor()
  {
    super();
    this.name = "Sun-Stalk Seed";
    this.type = "Creature";
    this.color = "Yellow";
    this.cost = 2;
    this.power = 3000;
    this.race = "Star Sentinel";
    this.text = "Blocker, Skirmisher";
    this.blocker = true;
    this.skirmisher = true;
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
    this.cost = 4;
    this.power = 1000;
    this.race = "Cyber Lord";
    this.text = "When this creature enters the battle zone, draw a card.";
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

class BronzeArmTribe extends Card
{
  constructor()
  {
    super();
    this.name = "Bronze-Arm Tribe";
    this.type = "Creature";
    this.color = "Green";
    this.cost = 4;
    this.power = 1000;
    this.race = "Beast Kin";
    this.text = "When this creature enters the battle zone, gain 1 mana.";
  }
  
  OnEnter(game, player, opp, c, index)
  {
    game.pushStack(c, player, opp);
  }
  
  Resolve(game, player, opp, c, index)
  {
    game.chargeCard(player, opp);
    //game.emitState();
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
    this.cost = 3;
    this.power = 2000;
    this.race = "Cyber Lord";
    this.text = "Whenever this creature attacks, draw a card.";
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
    this.cost = 7;
    this.power = 5000;
    this.race = "Leviathan";
    this.text = "Whenever this creature attacks, draw 2 cards.";
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

class Fumes extends Card
{
  constructor()
  {
    super();
    this.name = "Fumes";
    this.type = "Creature";
    this.color = "Purple";
    this.cost = 4;
    this.power = 2000;
    this.race = "Tarborg";
    this.text = "When this creature enters the battle zone, your opponent chooses and discards a card."
  }
  
  TargetReturned(game, player, opp, index)
  {
    console.log("targ returned: "+index);
    game.discardCard(player, opp, index[1]);
    game.emitState();
  }
  
  OnEnter(game, player, opp, card, index)
  {
    game.pushStack(card, player, opp);
  }
  
  Resolve(game, player, opp, card, index)
  {
    if (opp.hand.length > 0)
    {
      game.requestTargetsInHand(opp, player, 1, card);
      //game.waitForTargets = true;
      //game.waitForTargetsSrc = this;
    }
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
    this.cost = 7;
    this.power = 4000;
    this.race = "Evil Toy";
    this.text = "When this creature enters the battle zone, destroy target untapped enemy creature."
  }
  
  TargetReturned(game, player, opp, index)
  {    
    game.destroy(player, opp, index);
    // if (index[0] == 0)
    // {
    //   game.destroyCreature(player, opp, index[1]);
    // }
    // else if (index[0] == 1)
    // {
    //   game.destroyCreature(opp, player, index[1]);
    // }
    // //game.destroyCreature(opp, player, index);
    // game.emitState();
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
        targets.push([1,i]);
      }
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
      //game.waitForTargets = true;
      //game.waitForTargetsSrc = this;
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
    this.cost = 7;
    this.text = "Shield Blast: Destroy target enemy creature."
    this.shieldblast = true;
  }
  
  TargetReturned(game, player, opp, index)
  {
    game.destroy(player, opp, index);
    // if (index[0] == 0)
    // {
    //   game.destroyCreature(player, opp, index[1]);
    // }
    // else if (index[0] == 1)
    // {
    //   game.destroyCreature(opp, player, index[1]);
    // }
    // game.emitState();
  }
  
  Resolve(game, player, opp, card, index)
  {
    var targets = [];
    for (var i = 0; i < opp.field.length; i++)
    {
      targets.push([1,i]);
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
      //game.waitForTargets = true;
      //game.waitForTargetsSrc = this;
    }
  }
}

class RootTrap extends Card
{
  constructor()
  {
    super();
    this.name = "Root Trap";
    this.type = "Spell";
    this.color = "Green";
    this.cost = 7;
    this.text = "Shield Blast: Trap target enemy creature."
    this.shieldblast = true;
  }
  
  TargetReturned(game, player, opp, index)
  {
    game.trap(player, opp, index);
  }
  
  Resolve(game, player, opp, card, index)
  {
    var targets = [];
    for (var i = 0; i < opp.field.length; i++)
    {
      targets.push([1,i]);
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
    }
  }
}


class BoneBlades extends Card
{
  constructor()
  {
    super();
    this.name = "Bone Blades";
    this.type = "Spell";
    this.color = "Purple";
    this.cost = 4;
    this.text = "Shield Blast: Destroy target enemy creature with cost 4 or less."
    this.shieldblast = true;
  }
  
  TargetReturned(game, player, opp, index)
  {
    game.destroy(player, opp, index);
  }
  
  Resolve(game, player, opp, card, index)
  {
    var targets = [];
    for (var i = 0; i < opp.field.length; i++)
    {
      if (opp.field[i].cost <= 4)
      {
        targets.push([1,i]);
      }
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
    }
  }
}

class ReturnToTheSoil extends Card
{
  constructor()
  {
    super();
    this.name = "Return to the Soil";
    this.type = "Spell";
    this.color = "Green";
    this.cost = 4;
    this.text = "Shield Blast: Trap target enemy creature with cost 4 or less."
    this.shieldblast = true;
  }
  
  TargetReturned(game, player, opp, index)
  {
    game.trap(player, opp, index);
  }
  
  Resolve(game, player, opp, card, index)
  {
    var targets = [];
    for (var i = 0; i < opp.field.length; i++)
    {
      if (opp.field[i].cost <= 4)
      {
        targets.push([1,i]);
      }
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
    }
  }
}

class CometMissile extends Card
{
  constructor()
  {
    super();
    this.name = "Comet Missile";
    this.type = "Spell";
    this.color = "Red";
    this.cost = 2;
    this.text = "Shield Blast: Destroy target enemy creature with Blocker."
    this.shieldblast = true;
  }
  
  TargetReturned(game, player, opp, index)
  {
    game.destroy(player, opp, index);
  }
  
  Resolve(game, player, opp, card, index)
  {
    var targets = [];
    for (var i = 0; i < opp.field.length; i++)
    {
      if (opp.field[i].blocker)
      {
        targets.push([1,i]);
      }
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
    }
  }
}

class TornadoFlame extends Card
{
  constructor()
  {
    super();
    this.name = "Tornado Flame";
    this.type = "Spell";
    this.color = "Red";
    this.cost = 5;
    this.text = "Shield Blast: Destroy target enemy creature with power 5000 or less."
    this.shieldblast = true;
  }
  
  TargetReturned(game, player, opp, index)
  {
    game.destroy(player, opp, index);
  }
  
  Resolve(game, player, opp, card, index)
  {
    var targets = [];
    for (var i = 0; i < opp.field.length; i++)
    {
      if (opp.field[i].ComputePower() <= 5000)
      {
        targets.push([1,i]);
      }
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
    }
  }
}

class RockBite extends Card
{
  constructor()
  {
    super();
    this.name = "Rock Bite";
    this.type = "Spell";
    this.color = "Red";
    this.cost = 4;
    this.text = "Shield Blast: Destroy target enemy creature with power 3000 or less."
    this.shieldblast = true;
  }
  
  TargetReturned(game, player, opp, index)
  {
    game.destroy(player, opp, index);
  }
  
  Resolve(game, player, opp, card, index)
  {
    var targets = [];
    for (var i = 0; i < opp.field.length; i++)
    {
      if (opp.field[i].ComputePower() <= 3000)
      {
        targets.push([1,i]);
      }
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
    }
  }
}

class IceBlade extends Card
{
  constructor()
  {
    super();
    this.name = "Ice Blade";
    this.type = "Spell";
    this.color = "Blue";
    this.cost = 2;
    this.text = "Shield Blast: Bounce target creature with cost 4 or less."
    this.shieldblast = true;
  }
  
  TargetReturned(game, player, opp, index)
  {
    if (index[0] == 0)
    {
      game.bounceCreature(player, opp, index[1]);
    }
    else if (index[0] == 1)
    {
      game.bounceCreature(opp, player, index[1]);
    }
    game.emitState();
  }
  
  Resolve(game, player, opp, card, index)
  {
    var targets = [];
    for (var i = 0; i < player.field.length; i++)
    {
      if (player.field[i].cost <= 4)
      {
        targets.push([0,i]);
      }
    }
    for (var i = 0; i < opp.field.length; i++)
    {
      if (opp.field[i].cost <= 4)
      {
        targets.push([1,i]);
      }
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
      //game.waitForTargets = true;
      //game.waitForTargetsSrc = this;
    }
  }
}

class Teleport extends Card
{
  constructor()
  {
    super();
    this.name = "Teleport";
    this.type = "Spell";
    this.color = "Blue";
    this.cost = 5;
    this.text = "Bounce target creature. Draw a card."
  }
  
  TargetReturned(game, player, opp, index)
  {
    if (index[0] == 0)
    {
      game.bounceCreature(player, opp, index[1]);
    }
    else if (index[0] == 1)
    {
      game.bounceCreature(opp, player, index[1]);
    }
    game.emitState();
    game.drawCard(player);
  }
  
  Resolve(game, player, opp, card, index)
  {
    var targets = [];
    for (var i = 0; i < player.field.length; i++)
    {
      targets.push([0,i]);
    }
    for (var i = 0; i < opp.field.length; i++)
    {
      targets.push([1,i]);
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
      //game.waitForTargets = true;
      //game.waitForTargetsSrc = this;
    }
    else
    {
      game.drawCard(player);
    }
  }
}

class DeathSmoke extends Card
{
  constructor()
  {
    super();
    this.name = "Death Smoke";
    this.type = "Spell";
    this.color = "Purple";
    this.cost = 5;
    this.text = "Destroy target untapped enemy creature."
  }
  
  TargetReturned(game, player, opp, index)
  {
    game.destroy(player, opp, index);
  }
  
  Resolve(game, player, opp, card, index)
  {
    var targets = [];
    for (var i = 0; i < opp.field.length; i++)
    {
      if (!opp.field[i].tapped)
      {
        targets.push([1,i]);
      }
    }
    if (targets.length > 0)
    {
      game.requestTargets(player, opp, targets, 1, card, index);
    }
  }
}

class Overcharge extends Card
{
  constructor()
  {
    super();
    this.name = "Overcharge";
    this.type = "Spell";
    this.color = "Red";
    this.cost = 4;
    this.text = "Your creatures get +1000 power and can attack untapped creatures until end of turn."
  }
  
  Resolve(game, player, opp, card, index)
  {
    game.emitStateMyAreaOfEffect(player, opp, this.color);
    player.attribList.push(this);
    game.recalculateAttributes();
  }
  
  OnEndAttrib(game, player, opp)
  {
    player.attribList.splice(player.attribList.indexOf(this), 1)[0];
    game.recalculateAttributes();
  }
  
  ApplyAttribute(game, player, opp, c)
  {
    if (player.field.indexOf(c) >= 0)
    {
      c.attributes.push(new Attribute("power", 1000));
      c.attributes.push(new Attribute("atkuntapped", true));
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
    this.cost = 4;
    this.text = "Shield Blast: Draw 2 cards."
    this.shieldblast = true;
  }
  
  Resolve(game, player, opp, card, index)
  {
    game.drawCard(player);
    game.drawCard(player);
  }
}

class Sprout extends Card
{
  constructor()
  {
    super();
    this.name = "Sprout";
    this.type = "Spell";
    this.color = "Green";
    this.cost = 2;
    this.text = "Shield Blast: Gain 1 mana."
    this.shieldblast = true;
  }
  
  Resolve(game, player, opp, card, index)
  {
    game.chargeCard(player, opp);
  }
}

const cardMap = {
  "Hydro Spy" : HydroSpy,
  "Razorkinder" : Razorkinder,
  "Aqua Seneschal" : AquaSeneschal,
  "King Nautilus" : KingNautilus,
  "Frogzooka" : Frogzooka,
  "Reef-Eye" : ReefEye,
  "Hydrobot Crab" : HydrobotCrab,
  "King Pontias" : KingPontias,
  "Draglide the Swiftest" : Draglide,
  "Tatsurion" : Tatsurion,
  "Blaze Belcher" : BlazeBelcher,
  "Flametropus" : Flametropus,
  "Pyro Trooper" : PyroTrooper,
  "Gatling Skyterror" : GatlingSkyterror,
  "Simian Trooper Grash" : SimianTrooperGrash,
  "Little Hissy" : LittleHissy,
  "Terror Pit" : TerrorPit,
  "Spy Mission" : SpyMission,
  "Bone Blades" : BoneBlades,
  "Brain Squirmer" : BrainSquirmer,
  "Death Smoke" : DeathSmoke,
  "Dream Pirate" : DreamPirate,
  "Gigargon" : Gigargon,
  "Grave Worm Hatchling" : GraveWormHatchling,
  "Zagaan, the Bone Knight" : ZagaanTheBoneKnight,
  "Skull Cutter" : SkullCutter,
  "Horrid Stinger" : HorridStinger,
  "Skeeter Swarmer" : SkeeterSwarmer,
  "Fumes" : Fumes,
  "Ice Blade" : IceBlade,
  "Teleport" : Teleport,
  "Comet Missile" : CometMissile,
  "Tornado Flame" : TornadoFlame,
  "Rock Bite" : RockBite,
  "Ambush Scorpion" : AmbushScorpion,
  "Rumbling Terrasaur" : RumblingTerrasaur,
  "Brave Giant" : BraveGiant,
  "Raging Goliant" : RagingGoliant,
  "Essence Elf" : EssenceElf,
  "Root Trap" : RootTrap,
  "Return to the Soil" : ReturnToTheSoil,
  "Sprout" : Sprout,
  "Bronze-Arm Tribe" : BronzeArmTribe,
  "Roaming Bloodmane" : RoamingBloodmane,
  "Overcharge" : Overcharge
};


module.exports = function CardFactory(name, idDict)
{
  if (name == 'collection')
  {
    return cardMap;
  }
  else if (name in cardMap)
  {
    return new cardMap[name]();
  }
  else
  {
    console.log("Unable to find: "+name);
    return null;
  }
}