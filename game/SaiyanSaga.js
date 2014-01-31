DBZCCG.Saiyan = {};
DBZCCG.Saiyan['001'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Orange,
    description: "Physical attack. Raise your anger 1 level.",
    name: "Orange Standing Fist Punch",
    number: '001',
    texturePath: "images/DBZCCG/saiyan/001.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    rarity: DBZCCG.Card.Rarity.Common,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });
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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['002'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Orange,
    description: "Physical attack doing +1 power stage of damage. Raise your anger 1 level.",
    name: "Orange One Knuckle Punch",
    number: '002',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/002.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });
    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]

};

DBZCCG.Saiyan['003'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Orange,
    description: "Physical attack doing +1 power stage of damage. Raise your anger 1 level.",
    name: "Orange Two Knuckle Punch",
    number: '003',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/003.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();

        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['004'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Orange,
    description: "Physical attack. Raise your anger 1 level.",
    name: "Orange Leg Sweep",
    number: '004',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/004.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['005'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Orange,
    description: "Physical attack doing +3 power stages of damage. Raise your anger 1 level.",
    name: "Orange Arm Bar",
    number: '005',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/005.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['006'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack. Raise your anger 1 level.",
    name: "Red Lunge Punch",
    number: '006',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/006.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['007'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack doing +3 power stages of damage. Raise your anger 1 level.",
    name: "Red Reverse Punch",
    number: '007',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/007.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['008'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack doing +3 power stages of damage. Raise your anger 1 level.",
    name: "Red Knife Hand",
    number: '008',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/008.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['009'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack doing +3 power stages of damage. Raise your anger 1 level.",
    name: "Red Palm Heel Strike",
    number: '009',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/009.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['010'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack. Raise your anger 1 level.",
    name: "Red Elbow Strike",
    number: '010',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/010.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['014'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Blue,
    description: "Physical attack doing +1 power stage of damage. Raise your anger 1 level. Lower your opponent's anger 1 level.",
    name: "Blue Shoulder Wheel",
    number: '014',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/014.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.changeAnger(-1);
        });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });


    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['017'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Physical attack. Power up to full.",
    name: "Hidden Power Level",
    number: '017',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/017.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.moveZScouter("max");
        });

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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['022'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Power up 5 power stages. Take the top card in your discard pile and place it at the bottom of your life deck.",
    name: "Power Up!",
    number: '022',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/022.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            var cardIdx = [];

            if (DBZCCG.attackingPlayer.discardPile.cards.length > 0) {
                cardIdx.push(DBZCCG.attackingPlayer.discardPile.cards.length - 1);
            }

            DBZCCG.attackingPlayer.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
        });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.getPersonalityInControl().raiseZScouter(5);
        });

    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("nonCombats", [cardIdx], "discardPile");
        });
    }
};

DBZCCG.Saiyan['023'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Increase your anger by 2 levels. Take the bottom 2 cards of your discard pile and place them at the bottom of your life deck. Remove from the game after use.",
    name: "Burning Rage",
    number: '023',
    texturePath: "images/DBZCCG/saiyan/023.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    rarity: DBZCCG.Card.Rarity.Common,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            var cardIdx = [];

            if (DBZCCG.attackingPlayer.discardPile.cards.length > 0) {
                cardIdx.push(0);
            }

            if (DBZCCG.attackingPlayer.discardPile.cards.length > 1) {
                cardIdx.push(1);
            }

            DBZCCG.attackingPlayer.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
        });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(2);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("nonCombats", [cardIdx], "removedFromTheGame");
        });
    }
};

DBZCCG.Saiyan['024'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.GOKU,
    description: "Physical attack doing 5 power stages of damage.",
    name: "Goku's Surprise Attack",
    number: '024',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/024.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.stages = 5;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['027'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.TIEN,
    description: "Physical attack doing 5 life cards of damage.",
    name: "Tien's Physical Attack",
    number: '027',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/027.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 5;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['044'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.GOKU,
    description: "Physical attack doing 1 life card of damage.",
    name: "Goku's Body Throw",
    number: '044',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/044.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();


    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['046'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.GOKU,
    description: "Physical attack doing double physical attack table damage.",
    name: "Goku's Anger Attack",
    number: '046',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/046.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();


    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages *= 2;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['051'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Orange,
    description: "Physical attack doing +2 power stages of damage. Raise your anger 1 level.",
    name: "Orange Hip Throw",
    number: '051',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/051.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 2;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['055'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack doing +1 power stage of damage. Raise your anger 1 level.",
    name: "Red Front Kick",
    number: '055',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/055.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['099'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.GOKU,
    description: "Increase your anger by 2 levels. Take the top 2 cards of your discard pile and place them at the bottom of your life deck. Limit 1 per deck.",
    name: "Blazing Anger!",
    number: '099',
    limit: 1,
    texturePath: "images/DBZCCG/saiyan/099.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    rarity: DBZCCG.Card.Rarity.Uncommon,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            var cardIdx = [];

            if (DBZCCG.attackingPlayer.discardPile.cards.length > 0) {
                cardIdx.push(DBZCCG.attackingPlayer.discardPile.cards.length - 1);
            }

            if (DBZCCG.attackingPlayer.discardPile.cards.length > 1) {
                cardIdx.push(DBZCCG.attackingPlayer.discardPile.cards.length - 2);
            }

            DBZCCG.attackingPlayer.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
        });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(2);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("nonCombats", [cardIdx], "discardPile");
        });
    }
};

DBZCCG.Saiyan['158'] = {
    type: DBZCCG.Card.Type.Personality,
    style: DBZCCG.Card.Style.Freestyle,
    PUR: 1,
    alignment: DBZCCG.Personality.alignment.Hero,
    description: "Power: Energy attack doing 3 life cards of damage. Costs 1 power stage.",
    level: 1,
    rarity: DBZCCG.Card.Rarity.Fixed,
    name: "GOKU",
    highTech: false,
    number: 158,
    texturePath: "images/DBZCCG/saiyan/158.jpg",
    personality: DBZCCG.Personality.GOKU,
    saga: DBZCCG.Card.Saga.Saiyan,
    powerStages: [0, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400],
    activable: DBZCCG.Combat.personalityPowerDefaultAttackCheck,
    cost: function() {
        return {powerStage: 1};
    },
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        this.turn = parseInt($('#turnCounterNumber')[0].innerHTML);
    },
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['159'] = {
    type: DBZCCG.Card.Type.Personality,
    style: DBZCCG.Card.Style.Freestyle,
    PUR: 2,
    alignment: DBZCCG.Personality.alignment.Hero,
    description: "Power: Physical attack doing 4 power stages of damage.",
    level: 2,
    rarity: DBZCCG.Card.Rarity.Fixed,
    name: "GOKU",
    highTech: false,
    number: 159,
    texturePath: "images/DBZCCG/saiyan/159.jpg",
    personality: DBZCCG.Personality.GOKU,
    saga: DBZCCG.Card.Saga.Saiyan,
    powerStages: [0, 3200, 3700, 4200, 4700, 5200, 5700, 6200, 6700, 7200, 7700],
    activable: DBZCCG.Combat.personalityPowerDefaultAttackCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.stages = 4;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        this.turn = parseInt($('#turnCounterNumber')[0].innerHTML);
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['160'] = {
    type: DBZCCG.Card.Type.Personality,
    style: DBZCCG.Card.Style.Freestyle,
    PUR: 3,
    alignment: DBZCCG.Personality.alignment.Hero,
    description: "Power: Once per combat, reduces the damage of an energy attack by 2 life cards.",
    level: 3,
    rarity: DBZCCG.Card.Rarity.Fixed,
    name: "GOKU",
    highTech: false,
    number: 160,
    texturePath: "images/DBZCCG/saiyan/160.jpg",
    personality: DBZCCG.Personality.GOKU,
    saga: DBZCCG.Card.Saga.Saiyan,
    powerStages: [0, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500]
};

DBZCCG.Saiyan['173'] = {
    type: DBZCCG.Card.Type.Personality,
    style: DBZCCG.Card.Style.Freestyle,
    PUR: 2,
    rarity: DBZCCG.Card.Rarity.Fixed,
    alignment: DBZCCG.Personality.alignment.Rogue,
    description: "Power: Once per combat, reduces the damage of an energy attack by 2 life cards.",
    level: 1,
    name: "VEGETA",
    highTech: false,
    number: 173,
    texturePath: "images/DBZCCG/saiyan/173.jpg",
    personality: DBZCCG.Personality.VEGETA,
    saga: DBZCCG.Card.Saga.Saiyan,
    powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]
};

DBZCCG.Saiyan['174'] = {
    type: DBZCCG.Card.Type.Personality,
    style: DBZCCG.Card.Style.Freestyle,
    PUR: 4,
    alignment: DBZCCG.Personality.alignment.Rogue,
    description: "Power: Energy attack doing 3 life cards of damage. Costs 1 power stage.",
    level: 2,
    rarity: DBZCCG.Card.Rarity.Fixed,
    name: "VEGETA",
    highTech: false,
    number: 174,
    texturePath: "images/DBZCCG/saiyan/174.jpg",
    personality: DBZCCG.Personality.VEGETA,
    saga: DBZCCG.Card.Saga.Saiyan,
    powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800],
    activable: DBZCCG.Combat.personalityPowerDefaultAttackCheck,
    cost: function() {
        return {powerStage: 1};
    },
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        this.turn = parseInt($('#turnCounterNumber')[0].innerHTML);
    },
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['175'] = {
    type: DBZCCG.Card.Type.Personality,
    style: DBZCCG.Card.Style.Freestyle,
    PUR: 4,
    alignment: DBZCCG.Personality.alignment.Rogue,
    description: "Power: Once per game, after performing a successful energy attack, steal a Dragon Ball. After this effect, the combat ends.",
    level: 3,
    rarity: DBZCCG.Card.Rarity.Fixed,
    name: "VEGETA",
    highTech: false,
    number: 175,
    texturePath: "images/DBZCCG/saiyan/175.jpg",
    personality: DBZCCG.Personality.VEGETA,
    saga: DBZCCG.Card.Saga.Saiyan,
    powerStages: [0, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000]
};