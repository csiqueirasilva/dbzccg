DBZCCG.General = {};

DBZCCG.General['Final Physical Attack'] = DBZCCG.Card.create({
    style: DBZCCG.Card.Style.Freestyle,
    description: "Physical attack.",
    name: "Final Physical Attack",
//    texturePath: "images/DBZCCG/saiyan/250.jpg",
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    damage: function() {
        return DBZCCG.Combat.attack(true, null, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        DBZCCG.attackingPlayer.onlyDefend = true;
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
});