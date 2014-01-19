DBZCCG.SAIYAN = {};
DBZCCG.SAIYAN['001'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Orange,
    description: "Physical attack. Raise your anger 1 level.",
    name: "Orange Standing Fist Punch",
    number: '001',
    texturePath: "images/DBZCCG/saiyan/001.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, null, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['002'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Orange,
    description: "Physical attack doing +1 power stage of damage. Raise your anger 1 level.",
    name: "Orange One Knuckle Punch",
    number: '002',
    texturePath: "images/DBZCCG/saiyan/002.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect

};

DBZCCG.SAIYAN['003'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Orange,
    description: "Physical attack doing +1 power stage of damage. Raise your anger 1 level.",
    name: "Orange Two Knuckle Punch",
    number: '003',
    texturePath: "images/DBZCCG/saiyan/003.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['004'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Orange,
    description: "Physical attack. Raise your anger 1 level.",
    name: "Orange Leg Sweep",
    number: '004',
    texturePath: "images/DBZCCG/saiyan/004.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, null, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['005'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Orange,
    description: "Physical attack doing +3 power stages of damage. Raise your anger 1 level.",
    name: "Orange Arm Bar",
    number: '005',
    texturePath: "images/DBZCCG/saiyan/005.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['006'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack. Raise your anger 1 level.",
    name: "Red Lunge Punch",
    number: '006',
    texturePath: "images/DBZCCG/saiyan/006.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, null, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['007'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack doing +3 power stages of damage. Raise your anger 1 level.",
    name: "Red Reverse Punch",
    number: '007',
    texturePath: "images/DBZCCG/saiyan/007.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['008'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack doing +3 power stages of damage. Raise your anger 1 level.",
    name: "Red Knife Hand",
    number: '008',
    texturePath: "images/DBZCCG/saiyan/008.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['009'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack doing +3 power stages of damage. Raise your anger 1 level.",
    name: "Red Palm Heel Strike",
    number: '009',
    texturePath: "images/DBZCCG/saiyan/009.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['010'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack. Raise your anger 1 level.",
    name: "Red Elbow Strike",
    number: '010',
    texturePath: "images/DBZCCG/saiyan/010.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, null, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['014'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Blue,
    description: "Physical attack doing +1 power stage of damage. Raise your anger 1 level. Lower your opponent's anger 1 level.",
    name: "Blue Shoulder Wheel",
    number: '014',
    texturePath: "images/DBZCCG/saiyan/014.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
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
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['017'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Freestyle,
    description: "Physical attack. Power up to full.",
    name: "Hidden Power Level",
    number: '017',
    texturePath: "images/DBZCCG/saiyan/017.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.moveZScouter("max");
        });

    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, null, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['022'] = {
    type: DBZCCG.Card.Type.NonCombat,
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.GOKU,
    description: "Power up 5 power stages. Take the top card in your discard pile and place it at the bottom of your life deck.",
    name: "Power Up!",
    number: '022',
    texturePath: "images/DBZCCG/saiyan/022.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            var cardIdx = [];
            
            if(DBZCCG.attackingPlayer.discardPile.cards.length > 0) {
                cardIdx.push(DBZCCG.attackingPlayer.discardPile.cards.length - 1);
            }
            
            DBZCCG.attackingPlayer.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
        });
        
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.getCurrentPersonality().raiseZScouter(5);
        });
        
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("nonCombats", [cardIdx], "discardPile");
        });
    }
};

DBZCCG.SAIYAN['023'] = {
    type: DBZCCG.Card.Type.NonCombat,
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.GOKU,
    description: "Increase your anger by 2 levels. Take the bottom 2 cards of your discard pile and place them at the bottom of your life deck. Remove from the game after use.",
    name: "Burning Rage",
    number: '023',
    texturePath: "images/DBZCCG/saiyan/023.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            var cardIdx = [];
            
            if(DBZCCG.attackingPlayer.discardPile.cards.length > 0) {
                cardIdx.push(0);
            }
            
            if(DBZCCG.attackingPlayer.discardPile.cards.length > 1) {
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

DBZCCG.SAIYAN['024'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.GOKU,
    description: "Physical attack doing 5 power stages of damage.",
    name: "Goku's Surprise Attack",
    number: '024',
    texturePath: "images/DBZCCG/saiyan/024.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(false, function(damage) {
            damage.stages = 5;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['027'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.TIEN,
    description: "Physical attack doing 5 life cards of damage.",
    name: "Tien's Physical Attack",
    number: '027',
    texturePath: "images/DBZCCG/saiyan/027.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 5;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['044'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.GOKU,
    description: "Physical attack doing 1 life card of damage.",
    name: "Goku's Body Throw",
    number: '044',
    texturePath: "images/DBZCCG/saiyan/044.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();


    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['046'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.GOKU,
    description: "Physical attack doing double physical attack table damage.",
    name: "Goku's Anger Attack",
    number: '046',
    texturePath: "images/DBZCCG/saiyan/046.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();


    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, function(damage) {
            damage.stages *= 2;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['051'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Orange,
    description: "Physical attack doing +2 power stages of damage. Raise your anger 1 level.",
    name: "Orange Hip Throw",
    number: '051',
    texturePath: "images/DBZCCG/saiyan/051.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 2;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['055'] = {
    type: DBZCCG.Card.Type.PhysicalCombat,
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack doing +1 power stage of damage. Raise your anger 1 level.",
    name: "Red Front Kick",
    number: '055',
    texturePath: "images/DBZCCG/saiyan/055.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

    },
    sucessfulEffect: function(defendingPlayer) {
        var damage = DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
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
    effectType: DBZCCG.Combat.AttackerEffect
};

DBZCCG.SAIYAN['099'] = {
    type: DBZCCG.Card.Type.NonCombat,
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.GOKU,
    description: "Increase your anger by 2 levels. Take the top 2 cards of your discard pile and place them at the bottom of your life deck. Limit 1 per deck.",
    name: "Blazing Anger!",
    number: '099',
    limit: 1,
    texturePath: "images/DBZCCG/saiyan/099.jpg",
    saga: DBZCCG.Card.Saga.SAIYAN,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            var cardIdx = [];
            
            if(DBZCCG.attackingPlayer.discardPile.cards.length > 0) {
                cardIdx.push(DBZCCG.attackingPlayer.discardPile.cards.length - 1);
            }
            
            if(DBZCCG.attackingPlayer.discardPile.cards.length > 1) {
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
