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
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });
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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.RaiseAnger]
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
        this.success = true;
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
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.RaiseAnger]

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
        this.success = true;
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
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.RaiseAnger]
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
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.RaiseAnger]
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
        this.success = true;
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
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.RaiseAnger]
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
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.RaiseAnger]
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
        this.success = true;
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
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.RaiseAnger]
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
        this.success = true;
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
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.RaiseAnger]
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
        this.success = true;
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
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.RaiseAnger]
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
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.RaiseAnger]
};

DBZCCG.Saiyan['011'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Blue,
    description: "Physical attack doing +4 power stages of damage. Lower your opponent's anger 1 level. If successful, stops an energy attack performed in your opponent's next attack phase.",
    name: "Blue Forward Foot Sweep",
    number: '011',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/011.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.changeAnger(-1);
        });

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 4;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        var card = this;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.addDefenderCallback({f: function(attackingCard) {
                    if (attackingCard.effectType instanceof Array && attackingCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1) {
                        attackingCard.success = false;
                        DBZCCG.Combat.flashCard(card);
                        return {skipDefense: true};
                    }
                    // destroy floating effect created
                }, priority: 100000, life: false});
            //createFloatingEffect to stop next energy attack in his next attack phase
        });

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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.Floating, DBZCCG.Combat.Effect.LowerAnger]
};

DBZCCG.Saiyan['012'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Blue,
    description: "Physical attack doing +2 power stages of damage. Lower your opponent's anger 1 level. Stops a physical attack performed in your opponent's next attack phase.",
    name: "Blue Hip Spring Throw",
    number: '012',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/012.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        var card = this;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.changeAnger(-1);
        });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.addDefenderCallback({f: function(attackingCard) {
                    if (attackingCard.effectType instanceof Array && attackingCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1) {
                        attackingCard.success = false;
                        DBZCCG.Combat.flashCard(card);
                        return {skipDefense: true};
                    }
                    // destroy floating effect created
                }, priority: 100000,
                life: false});
            //createFloatingEffect to stop next energy attack in his next attack phase
        });

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 2;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.Floating, DBZCCG.Combat.Effect.LowerAnger]
};

DBZCCG.Saiyan['013'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Blue,
    description: "Physical attack doing +5 power stages of damage or stops an energy attack. Lower your opponent's anger 1 level.",
    name: "Blue Round Throw",
    number: '013',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/013.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.multipleActivation,
    activators: [function(player, card) {
            var ret = false;
            if (DBZCCG.Combat.defaultAttackerCheck(player, card)) {
                ret = true;
                card.attack = true;
            } else {
                card.attack = false;
            }
            return ret;
        }, function(player, card) {
            var ret = false;
            if (DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array
                    && DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1
                    && DBZCCG.Combat.defaultDefenderCheck(player, card)) {
                ret = true;
                card.defense = true;
            } else {
                card.defense = false;
            }
            return ret;
        }
    ],
    effect: function() {
        if (this.attack) {
            this.success = true;
            this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.defendingPlayer.mainPersonality.changeAnger(-1);
            });

        } else {
            this.targetCard.success = false;
            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.attackingPlayer.mainPersonality.changeAnger(-1);
                DBZCCG.performingTurn = false;
            });
        }
    },
    damage: function() {
        if (this.attack) {
            return DBZCCG.Combat.attack(true, function(damage) {
                damage.stages += 5;
                return damage;
            }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
        }
    },
    successfulEffect: function(defendingPlayer) {
        if (this.attack) {
            var damage = this.damage();

            DBZCCG.listActions.splice(0, 0, function() {
                defendingPlayer.takeDamage(damage);
            });
        }
    },
    postEffect: function(card) {
        var player;
        if (this.attack) {
            player = DBZCCG.attackingPlayer;
        } else {
            player = DBZCCG.defendingPlayer;
        }

        var cardIdx = player.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            player.transferCards("inPlay", [cardIdx], "discardPile");
        });

    },
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Effect.LowerAnger]
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
        this.success = true;
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
    successfulEffect: function(defendingPlayer) {
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

DBZCCG.Saiyan['015'] = {
    type: DBZCCG.Card.Type['Dragonball'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Power up to full. Draw a card.",
    limit: 1,
    name: "Earth Dragon Ball 1",
    number: '015',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/015.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    dbCode: DBZCCG.Dragonball['Earth Dragonball 1'],
    playable: DBZCCG.Combat.defaultDragonballCheck,
    effect: function() {
        var control = this.control;
        DBZCCG.listActions.splice(0, 0, function() {
            control.mainPersonality.moveZScouter("max");
        });

        DBZCCG.listActions.splice(0, 0, function() {
            control.drawTopCards(1, 'lifeDeck');
        });
    },
    effectType: [DBZCCG.Combat.Effect.StageUp, DBZCCG.Combat.Effect.DrawCard]
};

DBZCCG.Saiyan['016'] = {
    type: DBZCCG.Card.Type['Dragonball'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Set all opponent's personalities to 2 power stages above 0.",
    limit: 1,
    name: "Earth Dragon Ball 2",
    number: '016',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/016.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    dbCode: DBZCCG.Dragonball['Earth Dragonball 2'],
    playable: DBZCCG.Combat.defaultDragonballCheck,
    effect: function() {
        var control = this.control;
        DBZCCG.listActions.splice(0, 0, function() {
            var players = DBZCCG.table.players;
            for (var i = 0; i < players.length; i++) {
                if (players[i] !== control) {
                    players[i].mainPersonality.moveZScouter(2);
                    // TODO: set allies power stages
                }
            }
        });
    },
    effectType: [DBZCCG.Combat.Effect.StageSet, DBZCCG.Combat.Target.Enemy, DBZCCG.Combat.Target.Multiple]
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
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.moveZScouter("max");
        });

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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.StageUp]
};

DBZCCG.Saiyan['018'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Saiyan Heritage Only. Physical attack. Name a personality. Your opponent cannot perform physical attacks with that personality on his next attack phase.",
    name: "Saiyan Arm Throw",
    number: '018',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/018.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.Combat.defaultAttackerCheck(player, this) && DBZCCG.Personality.checkHeritage(player.activePersonality.personality().personality, 'saiyan');
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        if (DBZCCG.attackingPlayer === DBZCCG.mainPlayer) {
            DBZCCG.performingTurn = true;
            DBZCCG.waitingMainPlayerMouseCommand = true;

            DBZCCG.confirmDialog('Saiyan Arm Throw',
                    'Name a personality that will not be able to perform a physical attack in your opponent\'s next attack phase.' +
                    DBZCCG.searchFormHTML,
                    null, {'OK': function() {
                    var personality = DBZCCG.Personality.Personalities[$('#search-form').val()];
                    DBZCCG.defendingPlayer.addActivationCallback({
                        f: function(card) {
                            var ret = true;

                            if (this.phase < DBZCCG.phaseCounter || $('#turnCounterNumber').html() !== this.turn) {
                                this.life = false;
                                ret = true;
                            } else if (ClassHelper.checkValue(DBZCCG.attackingPlayer.getPersonalityInControl().personality, personality) &&
                                    ClassHelper.checkValue(card.effectType, DBZCCG.Combat.Attack.Physical) &&
                                    !ClassHelper.checkValue(card.effectType, DBZCCG.Combat.Attack.Energy)) {
                                ret = false;
                            }

                            return ret;
                        },
                        phase: DBZCCG.phaseCounter + 1,
                        turn: $('#turnCounterNumber').html(),
                        life: true,
                        priority: 50}
                    );

                    $(this).dialog('close');
                    DBZCCG.performingTurn =
                            DBZCCG.waitingMainPlayerMouseCommand =
                            DBZCCG.Combat.effectHappening = false;
                }}, window.innerWidth * 0.35,
                    window.innerHeight * 0.35
                    );

            DBZCCG.searchFormContent('#confirmDialog', function(elem) {
                for (var key in DBZCCG.Personality.Personalities) {
                    if (key === elem.toUpperCase()) {
                        return true;
                    }
                }
            }, function(request, response) {
                var props = [];
                for (var key in DBZCCG.Personality.Personalities) {
                    if (key.search(request.term.toUpperCase()) !== -1) {
                        props.push(key);
                    }
                }
                props.sort();
                response(props);
            }, function(personality) {
                $('#search-result').html("<img src='images/icons/" + personality.toLowerCase() + "-icon.png' title='" + personality + "'/>");
            });

            // effect still happening
            return true;
        } else /* AI */ {
            var personality = DBZCCG.defendingPlayer.getPersonalityInControl().personality;
            DBZCCG.defendingPlayer.addActivationCallback({
                f: function(card) {
                    var ret = true;

                    if (this.phase < DBZCCG.phaseCounter || $('#turnCounterNumber').html() !== this.turn) {
                        this.life = false;
                        ret = true;
                    } else if (ClassHelper.checkValue(DBZCCG.attackingPlayer.getPersonalityInControl().personality, personality) &&
                            ClassHelper.checkValue(card.effectType, DBZCCG.Combat.Attack.Physical) &&
                            !ClassHelper.checkValue(card.effectType, DBZCCG.Combat.Attack.Energy)) {
                        ret = false;
                    }

                    return ret;
                },
                phase: DBZCCG.phaseCounter + 1,
                turn: $('#turnCounterNumber').html(),
                life: true,
                priority: 50}
            );
        }
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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['019'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Saiyan Heritage Only. Physical attack. Name a personality. Your opponent cannot perform energy attacks with that personality on his next attack phase.",
    name: "Saiyan Full Spin Kick",
    number: '019',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/019.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.Combat.defaultAttackerCheck(player, this) && DBZCCG.Personality.checkHeritage(player.activePersonality.personality().personality, 'saiyan');
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        if (DBZCCG.attackingPlayer === DBZCCG.mainPlayer) {
            DBZCCG.performingTurn = true;
            DBZCCG.waitingMainPlayerMouseCommand = true;

            DBZCCG.confirmDialog('Saiyan Arm Throw',
                    'Name a personality that will not be able to perform an energy attack in your opponent\'s next attack phase.' +
                    DBZCCG.searchFormHTML,
                    null, {'OK': function() {
                    var personality = DBZCCG.Personality.Personalities[$('#search-form').val()];
                    DBZCCG.defendingPlayer.addActivationCallback({
                        f: function(card) {
                            var ret = true;

                            if (this.phase < DBZCCG.phaseCounter || $('#turnCounterNumber').html() !== this.turn) {
                                this.life = false;
                                ret = true;
                            } else if (ClassHelper.checkValue(DBZCCG.attackingPlayer.getPersonalityInControl().personality, personality) &&
                                    !ClassHelper.checkValue(card.effectType, DBZCCG.Combat.Attack.Physical) &&
                                    ClassHelper.checkValue(card.effectType, DBZCCG.Combat.Attack.Energy)) {
                                ret = false;
                            }

                            return ret;
                        },
                        phase: DBZCCG.phaseCounter + 1,
                        turn: $('#turnCounterNumber').html(),
                        life: true,
                        priority: 50}
                    );

                    $(this).dialog('close');
                    DBZCCG.performingTurn =
                            DBZCCG.waitingMainPlayerMouseCommand =
                            DBZCCG.Combat.effectHappening = false;
                }}, window.innerWidth * 0.35,
                    window.innerHeight * 0.35
                    );

            DBZCCG.searchFormContent('#confirmDialog', function(elem) {
                for (var key in DBZCCG.Personality.Personalities) {
                    if (key === elem.toUpperCase()) {
                        return true;
                    }
                }
            }, function(request, response) {
                var props = [];
                for (var key in DBZCCG.Personality.Personalities) {
                    if (key.search(request.term.toUpperCase()) !== -1) {
                        props.push(key);
                    }
                }
                props.sort();
                response(props);
            }, function(personality) {
                $('#search-result').html("<img src='images/icons/" + personality.toLowerCase() + "-icon.png' title='" + personality + "'/>");
            });

            // effect still happening
            return true;
        } else /* AI */ {
            var personality = DBZCCG.defendingPlayer.getPersonalityInControl().personality;
            DBZCCG.defendingPlayer.addActivationCallback({
                f: function(card) {
                    var ret = true;

                    if (this.phase < DBZCCG.phaseCounter || $('#turnCounterNumber').html() !== this.turn) {
                        this.life = false;
                        ret = true;
                    } else if (ClassHelper.checkValue(DBZCCG.attackingPlayer.getPersonalityInControl().personality, personality) &&
                            !ClassHelper.checkValue(card.effectType, DBZCCG.Combat.Attack.Physical) &&
                            ClassHelper.checkValue(card.effectType, DBZCCG.Combat.Attack.Energy)) {
                        ret = false;
                    }

                    return ret;
                },
                phase: DBZCCG.phaseCounter + 1,
                turn: $('#turnCounterNumber').html(),
                life: true,
                priority: 50}
            );
        }
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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};


DBZCCG.Saiyan['020'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Saiyan Heritage Only. Physical attack doing +3 power stage of damage.",
    name: "Saiyan Pressure Punch",
    number: '020',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/020.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.Combat.defaultAttackerCheck(player, this) && DBZCCG.Personality.checkHeritage(player.activePersonality.personality().personality, 'saiyan');
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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

DBZCCG.Saiyan['021'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Saiyan Heritage Only. Physical attack. Name a personality. Your opponent cannot perform physical attacks with that personality on his next attack phase. Costs 2 power stages to perform.",
    name: "Saiyan Neck Hold",
    number: '021',
    cost: function() {
        return {powerStage: 2};
    },
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/021.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.Combat.defaultAttackerCheck(player, this) && DBZCCG.Personality.checkHeritage(player.activePersonality.personality().personality, 'saiyan');
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        if (DBZCCG.attackingPlayer === DBZCCG.mainPlayer) {
            DBZCCG.performingTurn = true;
            DBZCCG.waitingMainPlayerMouseCommand = true;

            DBZCCG.confirmDialog('Saiyan Arm Throw',
                    'Name a personality that will not be able to perform a physical attack in your opponent\'s next attack phase.' +
                    DBZCCG.searchFormHTML,
                    null, {'OK': function() {
                    var personality = DBZCCG.Personality.Personalities[$('#search-form').val()];
                    DBZCCG.defendingPlayer.addActivationCallback({
                        f: function(card) {
                            var ret = true;

                            if (this.phase < DBZCCG.phaseCounter || $('#turnCounterNumber').html() !== this.turn) {
                                this.life = false;
                                ret = true;
                            } else if (ClassHelper.checkValue(DBZCCG.attackingPlayer.getPersonalityInControl().personality, personality) &&
                                    ClassHelper.checkValue(card.effectType, DBZCCG.Combat.Attack.Physical) &&
                                    !ClassHelper.checkValue(card.effectType, DBZCCG.Combat.Attack.Energy)) {
                                ret = false;
                            }

                            return ret;
                        },
                        phase: DBZCCG.phaseCounter + 1,
                        turn: $('#turnCounterNumber').html(),
                        life: true,
                        priority: 50}
                    );

                    $(this).dialog('close');
                    DBZCCG.performingTurn =
                            DBZCCG.waitingMainPlayerMouseCommand =
                            DBZCCG.Combat.effectHappening = false;
                }}, window.innerWidth * 0.35,
                    window.innerHeight * 0.35
                    );

            DBZCCG.searchFormContent('#confirmDialog', function(elem) {
                for (var key in DBZCCG.Personality.Personalities) {
                    if (key === elem.toUpperCase()) {
                        return true;
                    }
                }
            }, function(request, response) {
                var props = [];
                for (var key in DBZCCG.Personality.Personalities) {
                    if (key.search(request.term.toUpperCase()) !== -1) {
                        props.push(key);
                    }
                }
                props.sort();
                response(props);
            }, function(personality) {
                $('#search-result').html("<img src='images/icons/" + personality.toLowerCase() + "-icon.png' title='" + personality + "'/>");
            });

            // effect still happening
            return true;
        } else /* AI */ {
            var personality = DBZCCG.defendingPlayer.getPersonalityInControl().personality;
            DBZCCG.defendingPlayer.addActivationCallback({
                f: function(card) {
                    var ret = true;

                    if (this.phase < DBZCCG.phaseCounter || $('#turnCounterNumber').html() !== this.turn) {
                        this.life = false;
                        ret = true;
                    } else if (ClassHelper.checkValue(DBZCCG.attackingPlayer.getPersonalityInControl().personality, personality) &&
                            ClassHelper.checkValue(card.effectType, DBZCCG.Combat.Attack.Physical) &&
                            !ClassHelper.checkValue(card.effectType, DBZCCG.Combat.Attack.Energy)) {
                        ret = false;
                    }

                    return ret;
                },
                phase: DBZCCG.phaseCounter + 1,
                turn: $('#turnCounterNumber').html(),
                life: true,
                priority: 50}
            );
        }
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
        this.success = true;

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
        this.success = true;

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
    personality: DBZCCG.Personality.Personalities.GOKU,
    description: "Physical attack doing 5 power stages of damage.",
    name: "Goku's Surprise Attack",
    number: '024',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/024.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.stages = 5;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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

DBZCCG.Saiyan['025'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.GOKU,
    description: "Physical attack. If successful, draw the bottom card of your discard pile into your hand. If used by Goku this card stays on the table to be used one more time this combat. Remove from the game after use. Limit 2 per deck.",
    name: "Goku's Physical Attack",
    number: '025',
    limit: 2,
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/025.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    numberOfUses: 0,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        var card = this;

        DBZCCG.attackingPlayer.addCombatLeavingCallback({
            priority: 1,
            player: DBZCCG.attackingPlayer,
            card: card,
            f: function() {
                if (this.player.inPlay.getCardIdx(this.card.display) !== -1) {
                    var cardIdx = this.player.inPlay.getCardIdx(this.card.display);
                    this.player.transferCards("inPlay", [cardIdx], "removedFromTheGame");
                }
            },
            life: false
        });

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, null, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        var card = this;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction = defendingPlayer;
        });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction = DBZCCG.attackingPlayer;
            DBZCCG.Combat.flashCard(card);
            if (DBZCCG.attackingPlayer.discardPile.cards.length > 0) {
                DBZCCG.listActions.splice(0, 0, function() {
                    DBZCCG.performingAnimation = true;
                    var card = DBZCCG.attackingPlayer.hand.cards[DBZCCG.attackingPlayer.hand.cards.length - 1];
                    var cardRotation = card.display.rotation.y;
                    var animation = new TWEEN.Tween(new THREE.Vector3(0, cardRotation, 0)).to(new THREE.Vector3(0, cardRotation - Math.PI, 0), 300);
                    animation.onUpdate(function() {
                        card.display.rotation.y = this.y;
                    });

                    var secondAnimation = new TWEEN.Tween(new THREE.Vector3(0, cardRotation - Math.PI, 0)).to(new THREE.Vector3(0, cardRotation, 0), 300);
                    secondAnimation.delay(200);

                    animation.chain(secondAnimation);
                    secondAnimation.onUpdate(function() {
                        card.display.rotation.y = this.y;
                    });

                    secondAnimation.onComplete(function() {
                        DBZCCG.performingAnimation = false;
                    });

                    animation.start();
                });

                DBZCCG.attackingPlayer.transferCards('discardPile', [0], 'hand');
            }
        });

        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        this.numberOfUses++;
        if ((this.numberOfUses === 2 && ClassHelper.checkValue(DBZCCG.attackingPlayer.getPersonalityInControl().personality, DBZCCG.Personality.Personalities.GOKU)) ||
                !ClassHelper.checkValue(DBZCCG.attackingPlayer.getPersonalityInControl().personality, DBZCCG.Personality.Personalities.GOKU)) {
            this.numberOfUses = 0;
            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
            });
        }
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['026'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Physical attack. Raise your anger 1 level. The performing personality gains 5 power stages.",
    name: "Gohan's Physical Attack",
    number: '026',
    personality: DBZCCG.Personality.Personalities.GOHAN,
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/026.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.raiseZScouter(5);
        });

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
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.StageUp, DBZCCG.Combat.Effect.RaiseAnger]
};

DBZCCG.Saiyan['027'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.TIEN,
    description: "Physical attack doing 5 life cards of damage.",
    name: "Tien's Physical Attack",
    number: '027',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/027.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 5;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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

DBZCCG.Saiyan['028'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.VEGETA,
    limit: 1,
    description: "Stops a physical attack. For the remainder of combat stops all your opponent's physical attacks. Remove from the game after use. Limit 1 per deck.",
    name: "Vegeta's Physical Stance",
    number: '028',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/028.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array
                && DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
        var card = this;
        DBZCCG.defendingPlayer.addDefenderCallback({f: function(attackingCard) {
                if ($('#turnCounterNumber').html() !== this.turn) {
                    this.life = false;
                    return;
                } else if (attackingCard.effectType instanceof Array && attackingCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1) {
                    attackingCard.success = false;
                    DBZCCG.Combat.flashCard(card);
                    return {skipDefense: true};
                }
                // destroy floating effect created
            }, priority: 100000, life: true, turn: $('#turnCounterNumber').html()});
        DBZCCG.performingTurn = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical]
};


DBZCCG.Saiyan['029'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.YAJIROBE,
    description: "Physical attack doing 2 life cards of damage. Remove from the game after use.",
    name: "Yajirobe's Physical Attack",
    number: '029',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/029.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();


    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 2;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Physical]
};

DBZCCG.Saiyan['030'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Defense Shield: Stops the first unstopped physical attack made against you. Remove from the game after use.",
    name: "Fall 7 Times, Get up 8 times.",
    number: '030',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/030.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    defenseShield: function(player) {
        return DBZCCG.openCard && DBZCCG.openCard.effectType instanceof Array
                && DBZCCG.openCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        DBZCCG.openCard.success = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("nonCombats", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Defense.DefenseShield]
};

DBZCCG.Saiyan['031'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Defense Shield: Stops the first unstopped energy attack made against you. Remove from the game after use.",
    name: "Fortify Your Spirit",
    number: '031',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/031.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    defenseShield: function(player) {
        return DBZCCG.openCard && DBZCCG.openCard.effectType instanceof Array
                && DBZCCG.openCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        DBZCCG.openCard.success = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("nonCombats", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Defense.DefenseShield]
};

DBZCCG.Saiyan['033'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Prevents 1 life card of damage. Remove from the game after use.",
    name: "It's the Little Things That Matter",
    number: '033',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/033.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array
                && (DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 ||
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1)
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        DBZCCG.defendingPlayer.addBeforeDamageCallback({
            priority: 50,
            f: function(powerStages, lifeCards) {
                var ret = {
                    powerStages: powerStages,
                    lifeCards: lifeCards > 0 ? lifeCards - 1 : lifeCards
                };
                return ret;
            },
            life: false
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("nonCombats", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Defense.Prevention]
};

DBZCCG.Saiyan['034'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Physical attack doing 1 life card of damage. Costs 3 power stages to perform. Limit 1 per deck.",
    name: "Straining Off-Balancing Move",
    limit: 1,
    number: '034',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/034.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    cost: function() {
        return {powerStage: 3};
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.StrainingMove]
};

DBZCCG.Saiyan['035'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Physical attack doing 3 life card of damage. Costs 3 power stages to perform. Limit 1 per deck.",
    name: "Straining, Penetrating Attack Move",
    limit: 1,
    number: '035',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/035.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    cost: function() {
        return {powerStage: 3};
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.StrainingMove]
};

DBZCCG.Saiyan['036'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Prevents 3 life card of damage from an energy attack. Costs 4 power stages to use.",
    name: "Straining Fake Left Move",
    number: '036',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/036.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array
                && DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        DBZCCG.defendingPlayer.addBeforeDamageCallback({
            priority: 50,
            f: function(powerStages, lifeCards) {
                var ret = {
                    powerStages: powerStages,
                    lifeCards: lifeCards >= 3 ? lifeCards - 3 : lifeCards
                };
                return ret;
            },
            life: false
        });
    },
    cost: function() {
        return {powerStage: 4};
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Defense.Prevention]
};

DBZCCG.Saiyan['037'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Physical attack doing 4 power stages of damage. Costs 2 life cards to perform. Limit 1 per deck.",
    name: "Straining Trippling Move",
    limit: 1,
    number: '037',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/037.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    cost: function() {
        return {lifeCard: 2};
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.stages = 4;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.StrainingMove]
};

DBZCCG.Saiyan['038'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Physical attack doing 1 life card of damage. You cannot perform any more attacks this combat.",
    name: "Straining Arm Drag Move",
    number: '038',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/038.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.attackingPlayer.onlyDefend = true;
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.StrainingMove]
};

DBZCCG.Saiyan['039'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Use immediately after your opponent attacks you (this can be a physical or energy attack) and pays any costs for that attack. Lower your opponent's Main Personality 4 power stages immediately when played.",
    name: "Straining Ankle Smash Move",
    number: '039',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/039.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                (DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1 ||
                        DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1) &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        DBZCCG.attackingPlayer.takeDamage({stages: 4, cards: 0});
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Effect.StrainingMove]
};

DBZCCG.Saiyan['040'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops an energy attack. You have to discard another card from your hand in order to use this card.",
    name: "Straining Energy Defense Move",
    number: '040',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/040.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    cost: function() {
        return {handCard: 1};
    },
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1 &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Effect.StrainingMove]
};

DBZCCG.Saiyan['041'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops a physical attack. You have to discard another card from your hand in order to use this card.",
    name: "Straining Head Lock Move",
    number: '041',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/041.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    cost: function() {
        return {handCard: 1};
    },
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Effect.StrainingMove]
};

DBZCCG.Saiyan['042'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops an energy attack. You cannot attack for the remainder of combat.",
    name: "Straining Rolling Escape Move",
    number: '042',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/042.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1 &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
        DBZCCG.performingAction.onlyDefend = true;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Effect.StrainingMove]
};

DBZCCG.Saiyan['043'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "When you place this card in play, immediately raise your Main Personality to its highest power stage. Remove from the game after use.",
    name: "Senzu Bean",
    number: '043',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/043.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: true,
    effect: function() {
        DBZCCG.performingAction.mainPersonality.moveZScouter('max');
    },
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    postEffect: function() {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(this.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.StageUp]
};

DBZCCG.Saiyan['044'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.GOKU,
    description: "Physical attack doing 1 life card of damage.",
    name: "Goku's Body Throw",
    number: '044',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/044.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();


    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 1;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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

DBZCCG.Saiyan['045'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Villains only. Skip your next Combat step. Place the top 2 cards from your discard pile on the bottom of your Life Deck. Remove from the game after use.",
    name: "Saiyan City Destruction",
    number: '045',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/045.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: function(player) {
        return DBZCCG.performingAction.getPersonalityInControl() && ClassHelper.checkValue(DBZCCG.Personality.Villain,
                DBZCCG.performingAction.getPersonalityInControl().personality) && DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
    effect: function() {
        this.success = true;
        var card = this;
        DBZCCG.performingAction.addTurnCallback({
            priority: 50,
            f: function() {
                var player = this.player;
                DBZCCG.listActions.push(function() {
                    DBZCCG.Combat.flashCard(card);
                    player.declarePhaseEnabled = false;

                    DBZCCG.performingAction.addTurnCallback({
                        turn: $('#turnCounterNumber').html(),
                        f: function() {
                            if ($('#turnCounterNumber').html() !== this.turn) {
                                DBZCCG.performingAction.declarePhaseEnabled = true;
                                this.life = false;
                            }
                        },
                        life: true,
                        priority: 100
                    });
                });
            },
            life: false
        });

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
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.Regenerate]
};

DBZCCG.Saiyan['046'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.GOKU,
    description: "Physical attack doing double physical attack table damage.",
    name: "Goku's Anger Attack",
    number: '046',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/046.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();


    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages *= 2;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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

DBZCCG.Saiyan['047'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops a physical attack. Costs 1 power stage.",
    name: "Raditz Total Defense",
    number: '047',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/047.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    cost: function() {
        return {powerStage: 1};
    },
    effect: function() {
        this.targetCard.success = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical]
};

DBZCCG.Saiyan['048'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Use after you perform a successful physical attack to capture an opponent's Dragon Ball. Remove from the game after use.",
    name: "Goku's Touch",
    personality: DBZCCG.Personality.Personalities.GOKU,
    number: '048',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/048.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: function(player) {
        return DBZCCG.Log.checkEventThisPhase(DBZCCG.Log.Type.sufferedDamage, {player: DBZCCG.defendingPlayer, typeDamage: DBZCCG.Combat.Attack.Physical, turn: $('#turnCounterNumber').html()}) &&
                DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
    effect: function() {
        this.success = true;
        DBZCCG.defendingPlayer.captureDragonballs(false, false, true, "Due to the effects of <b>Goku's Touch</b> it is not possible to capture a dragonball.");
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.CaptureDragonball]
};

DBZCCG.Saiyan['049'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Orange,
    description: "Stops a physical attack. Raise your anger 1 level.",
    name: "Orange Wrist Flex Takedown",
    number: '049',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/049.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.changeAnger(1);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical]
};

DBZCCG.Saiyan['050'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Orange,
    description: "Stops a physical attack. Raise your anger 1 level.",
    name: "Orange Shoulder Throw",
    number: '050',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/050.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.changeAnger(1);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical]
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
        this.success = true;
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
    successfulEffect: function(defendingPlayer) {
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

DBZCCG.Saiyan['052'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Orange,
    description: "Stops an energy attack. Lower your opponent's anger 1 level.",
    name: "Orange Neck Restraints",
    number: '052',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/052.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1 &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(-1);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Energy]
};

DBZCCG.Saiyan['053'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Orange,
    description: "Stops a physical attack. Lower your opponent's anger 1 level.",
    name: "Orange Holding After Takedown",
    number: '053',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/053.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(-1);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Effect.LowerAnger]
};

DBZCCG.Saiyan['054'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Red,
    description: "Stops a physical attack. Raise your anger 1 level.",
    name: "Red Knee Strike",
    number: '054',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/054.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.changeAnger(1);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Effect.RaiseAnger]
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
        this.success = true;
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
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.RaiseAnger]
};

DBZCCG.Saiyan['056'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Red,
    description: "Stops an energy attack.",
    name: "Red Side Kick",
    number: '056',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/056.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1 &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Energy]
};

DBZCCG.Saiyan['057'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack doing +3 power stages of damage. Lower your opponent's anger 1 level.",
    name: "Red Round Kick",
    number: '057',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/057.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.changeAnger(-1);
        });

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.LowerAnger]
};

DBZCCG.Saiyan['058'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Red,
    description: "Physical attack doing +3 power stages of damage. If successful, stops all energy attack this combat. Lower your opponent's anger 1 level.",
    name: "Red Back Kick",
    number: '058',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/058.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.changeAnger(-1);
        });

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages += 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
        var damage = this.damage();
        DBZCCG.defendingPlayer.addDefenderCallback({f: function(attackingCard) {
                if ($('#turnCounterNumber').html() !== this.turn) {
                    this.life = false;
                    return;
                } else if (attackingCard.effectType instanceof Array && attackingCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1) {
                    attackingCard.success = false;
                    DBZCCG.Combat.flashCard(card);
                    return {skipDefense: true};
                }
                // destroy floating effect created
            }, priority: 100000, life: true, turn: $('#turnCounterNumber').html()});

        DBZCCG.attackingPlayer.addDefenderCallback({f: function(attackingCard) {
                if ($('#turnCounterNumber').html() !== this.turn) {
                    this.life = false;
                    return;
                } else if (attackingCard.effectType instanceof Array && attackingCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1) {
                    attackingCard.success = false;
                    DBZCCG.Combat.flashCard(card);
                    return {skipDefense: true};
                }
                // destroy floating effect created
            }, priority: 100000, life: true, turn: $('#turnCounterNumber').html()});

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
    effectType: [DBZCCG.Combat.Attack.Physical, DBZCCG.Combat.Effect.LowerAnger]
};

DBZCCG.Saiyan['059'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Blue,
    description: "Stops a physical attack. Raise your anger 1 level.",
    name: "Blue Big Outside Drop",
    number: '059',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/059.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.changeAnger(1);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Effect.RaiseAnger]
};

DBZCCG.Saiyan['060'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Blue,
    description: "Stops a physical attack. Lower your opponent's anger 1 level.",
    name: "Blue One-Arm Shoulder Throw",
    number: '060',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/060.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array &&
                DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(-1);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Effect.LowerAnger]
};

DBZCCG.Saiyan['074'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Black,
    description: "Energy attack. Raise your anger 1 level.",
    rarity: DBZCCG.Card.Rarity.Uncommon,
    name: "Black Jump Turn Kick",
    number: '074',
    texturePath: "images/DBZCCG/saiyan/074.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    cost: function() {
        return {powerStage: 2};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 4;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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
    effectType: [DBZCCG.Combat.Attack.Energy, DBZCCG.Combat.Effect.RaiseAnger]
};


DBZCCG.Saiyan['099'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
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
        this.success = true;

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
    name: "Goku",
    highTech: false,
    number: 158,
    texturePath: "images/DBZCCG/saiyan/158.jpg",
    personality: DBZCCG.Personality.Personalities.GOKU,
    saga: DBZCCG.Card.Saga.Saiyan,
    powerStages: [0, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400],
    activable: DBZCCG.Combat.personalityPowerDefaultAttackCheck,
    cost: function() {
        return {powerStage: 1};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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
    name: "Goku",
    highTech: false,
    number: 159,
    texturePath: "images/DBZCCG/saiyan/159.jpg",
    personality: DBZCCG.Personality.Personalities.GOKU,
    saga: DBZCCG.Card.Saga.Saiyan,
    powerStages: [0, 3200, 3700, 4200, 4700, 5200, 5700, 6200, 6700, 7200, 7700],
    activable: DBZCCG.Combat.personalityPowerDefaultAttackCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.stages = 4;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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
    name: "Goku",
    highTech: false,
    number: 160,
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array
                && DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1
                && DBZCCG.Combat.personalityPowerDefaultDefenseCheck(player, this);
    },
    effect: function() {
        DBZCCG.defendingPlayer.addBeforeDamageCallback({
            priority: 50,
            f: function(powerStages, lifeCards) {
                var ret = {
                    powerStages: powerStages,
                    lifeCards: lifeCards > 1 ? lifeCards - 2 : 0
                };
                return ret;
            },
            life: false
        });
    },
    postEffect: function(card) {
        this.turn = parseInt($('#turnCounterNumber')[0].innerHTML);
    },
    texturePath: "images/DBZCCG/saiyan/160.jpg",
    personality: DBZCCG.Personality.Personalities.GOKU,
    saga: DBZCCG.Card.Saga.Saiyan,
    powerStages: [0, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500],
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Defense.Prevention]
};

DBZCCG.Saiyan['173'] = {
    type: DBZCCG.Card.Type.Personality,
    style: DBZCCG.Card.Style.Freestyle,
    PUR: 2,
    rarity: DBZCCG.Card.Rarity.Fixed,
    alignment: DBZCCG.Personality.alignment.Rogue,
    description: "Power: Once per combat, reduces the damage of an energy attack by 2 life cards.",
    level: 1,
    name: "Vegeta",
    activable: function(player) {
        return DBZCCG.currentCard && DBZCCG.currentCard.effectType instanceof Array
                && DBZCCG.currentCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1
                && DBZCCG.Combat.personalityPowerDefaultDefenseCheck(player, this);
    },
    effect: function() {
        DBZCCG.defendingPlayer.addBeforeDamageCallback({
            priority: 50,
            f: function(powerStages, lifeCards) {
                var ret = {
                    powerStages: powerStages,
                    lifeCards: lifeCards > 1 ? lifeCards - 2 : 0
                };
                return ret;
            },
            life: false
        });
    },
    postEffect: function(card) {
        this.turn = parseInt($('#turnCounterNumber')[0].innerHTML);
    },
    highTech: false,
    number: 173,
    texturePath: "images/DBZCCG/saiyan/173.jpg",
    personality: DBZCCG.Personality.Personalities.VEGETA,
    saga: DBZCCG.Card.Saga.Saiyan,
    powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800],
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Defense.Prevention]
};

DBZCCG.Saiyan['174'] = {
    type: DBZCCG.Card.Type.Personality,
    style: DBZCCG.Card.Style.Freestyle,
    PUR: 4,
    alignment: DBZCCG.Personality.alignment.Rogue,
    description: "Power: Energy attack doing 3 life cards of damage. Costs 1 power stage.",
    level: 2,
    rarity: DBZCCG.Card.Rarity.Fixed,
    name: "Vegeta",
    highTech: false,
    number: 174,
    texturePath: "images/DBZCCG/saiyan/174.jpg",
    personality: DBZCCG.Personality.Personalities.VEGETA,
    saga: DBZCCG.Card.Saga.Saiyan,
    powerStages: [0, 4200, 4700, 5200, 5700, 6200, 6700, 7200, 7700, 8200, 8700],
    activable: DBZCCG.Combat.personalityPowerDefaultAttackCheck,
    cost: function() {
        return {powerStage: 1};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 3;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
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
    name: "Vegeta",
    highTech: false,
    number: 175,
    texturePath: "images/DBZCCG/saiyan/175.jpg",
    personality: DBZCCG.Personality.Personalities.VEGETA,
    saga: DBZCCG.Card.Saga.Saiyan,
    powerStages: [0, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000],
    postEffect: function(card) {
        this.used = true;
    },
    activable: function(player) {
        return !this.used && DBZCCG.Log.checkEventThisPhase(DBZCCG.Log.Type.sufferedDamage, {player: DBZCCG.defendingPlayer, typeDamage: DBZCCG.Combat.Attack.Energy, turn: $('#turnCounterNumber').html()}) &&
                DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
    effect: function() {
        this.success = true;
        DBZCCG.defendingPlayer.captureDragonballs(false, false, true, "Due to the effects of <b>Vegeta</b> it is not possible to capture a dragonball.");
        DBZCCG.listActions.splice(0,0,function () {
            DBZCCG.combat = false;
        });
    },
    effectType: [DBZCCG.Combat.Effect.CaptureDragonball, DBZCCG.Combat.Effect.EndCombat]
};