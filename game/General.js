DBZCCG.General = {};

DBZCCG.General['Final Physical Attack'] = DBZCCG.Card.create({
    style: DBZCCG.Card.Style.Freestyle,
    description: "Physical attack. Discard a card from your hand in order to perform this attack.",
    name: "Final Physical Attack",
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    damage: function() {
        return DBZCCG.Combat.attack(true, null, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        DBZCCG.attackingPlayer.onlyPass = true;
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
});