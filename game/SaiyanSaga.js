DBZCCG.Saiyan = {};

DBZCCG.Saiyan.Foil = {};

DBZCCG.Saiyan.Foil.Default = (function() {
    var ext = 'jpg';
    var urlPrefix = "images/bg/saiyan-saga-foil2/";
    var urls = [urlPrefix + "posx." + ext, urlPrefix + "negx." + ext,
        urlPrefix + "posy." + ext, urlPrefix + "negy." + ext,
        urlPrefix + "posz." + ext, urlPrefix + "negz." + ext];
    var textureCube = THREE.ImageUtils.loadTextureCube(urls, undefined, function() {
        DBZCCG.Load.foilSaiyanDefault = true;
        console.log('Saiyan Saga Default Foil effect loaded');
    },
            function() {
                DBZCCG.Load.error = true;
                console.log('Error while loading Saiyan Saga Foil effect');
            });
    return {texture: textureCube, reflectivity: 5};
}());

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;


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

        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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

        DBZCCG.Card.FloatingEffect.create(
                {card: DBZCCG.Saiyan['011'],
                    player: DBZCCG.attackingPlayer,
                    turn: $('#turnCounterNumber').html,
                    phase: DBZCCG.phaseCounter + 1,
                    scene: DBZCCG.mainScene,
                    combat: true
                });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.addDefenderCallback({f: function(attackingCard) {
                    if (attackingCard.success && this.phase === DBZCCG.phaseCounter && this.turn === $('#turnCounterNumber').html &&
                            DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy) {
                        attackingCard.success = false;
                        DBZCCG.Combat.flashCard(card);
                        return {skipDefense: true};
                    }
                    // destroy floating effect created
                }, priority: 100000, life: false, turn: $('#turnCounterNumber').html, phase: DBZCCG.phaseCounter + 1});
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

        DBZCCG.Card.FloatingEffect.create(
                {card: DBZCCG.Saiyan['012'],
                    player: DBZCCG.attackingPlayer,
                    turn: $('#turnCounterNumber').html,
                    phase: DBZCCG.phaseCounter + 1,
                    scene: DBZCCG.mainScene,
                    combat: true
                });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.addDefenderCallback({f: function(attackingCard) {
                    if (attackingCard.success &&
                            this.phase === DBZCCG.phaseCounter && this.turn === $('#turnCounterNumber').html &&
                            DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical) {
                        attackingCard.success = false;
                        DBZCCG.Combat.flashCard(card);
                        return {skipDefense: true};
                    }
                    // destroy floating effect created
                }, priority: 100000,
                life: false, turn: $('#turnCounterNumber').html, phase: DBZCCG.phaseCounter + 1});
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
    activable: function(player) {
        var ret = false;

        if (!DBZCCG.Combat.actionATM) {

            if (DBZCCG.Combat.defaultAttackerCheck(player, this)) {
                ret = true;
                this.attack = true;
            } else {
                this.attack = false;
            }

            if (!ret && DBZCCG.openCard && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy
                    && DBZCCG.Combat.defaultDefenderCheck(player, this)) {
                ret = true;
                this.defense = true;
            } else {
                this.defense = false;
            }

        }

        return ret;
    },
    effect: function() {
        if (this.attack) {
            this.success = true;
            this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
            DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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

                            return {success: ret};
                        },
                        phase: DBZCCG.phaseCounter + 1,
                        turn: $('#turnCounterNumber').html(),
                        life: true,
                        priority: 50}
                    );

                    DBZCCG.Card.FloatingEffect.create(
                            {card: DBZCCG.Saiyan['018'],
                                player: DBZCCG.performingAction,
                                turn: $('#turnCounterNumber').html,
                                phase: DBZCCG.phaseCounter + 1,
                                scene: DBZCCG.mainScene,
                                combat: true,
                                appendText: "Chosen personality: " + $('#search-form').val()
                            });

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

            DBZCCG.Card.FloatingEffect.create(
                    {card: DBZCCG.Saiyan['018'],
                        player: DBZCCG.performingAction,
                        turn: $('#turnCounterNumber').html,
                        phase: DBZCCG.phaseCounter + 1,
                        scene: DBZCCG.mainScene,
                        combat: true,
                        appendText: "Chosen personality: " + ClassHelper.getKeyByValue(DBZCCG.Personality.Personalities, personality)
                    });

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

                    return {success: ret};
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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

                            return {success: ret};
                        },
                        phase: DBZCCG.phaseCounter + 1,
                        turn: $('#turnCounterNumber').html(),
                        life: true,
                        priority: 50}
                    );

                    DBZCCG.Card.FloatingEffect.create(
                            {card: DBZCCG.Saiyan['019'],
                                player: DBZCCG.performingAction,
                                turn: $('#turnCounterNumber').html,
                                phase: DBZCCG.phaseCounter + 1,
                                scene: DBZCCG.mainScene,
                                combat: true,
                                appendText: "Chosen personality: " + $('#search-form').val()
                            });

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

            DBZCCG.Card.FloatingEffect.create(
                    {card: DBZCCG.Saiyan['019'],
                        player: DBZCCG.performingAction,
                        turn: $('#turnCounterNumber').html,
                        phase: DBZCCG.phaseCounter + 1,
                        scene: DBZCCG.mainScene,
                        combat: true,
                        appendText: "Chosen personality: " + ClassHelper.getKeyByValue(DBZCCG.Personality.Personalities, personality)
                    });

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

                    return {success: ret};
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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

                            return {success: ret};
                        },
                        phase: DBZCCG.phaseCounter + 1,
                        turn: $('#turnCounterNumber').html(),
                        life: true,
                        priority: 50}
                    );

                    DBZCCG.Card.FloatingEffect.create(
                            {card: DBZCCG.Saiyan['021'],
                                player: DBZCCG.performingAction,
                                turn: $('#turnCounterNumber').html,
                                phase: DBZCCG.phaseCounter + 1,
                                scene: DBZCCG.mainScene,
                                combat: true,
                                appendText: "Chosen personality: " + $('#search-form').val()
                            });

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

            DBZCCG.Card.FloatingEffect.create(
                    {card: DBZCCG.Saiyan['021'],
                        player: DBZCCG.performingAction,
                        turn: $('#turnCounterNumber').html,
                        phase: DBZCCG.phaseCounter + 1,
                        scene: DBZCCG.mainScene,
                        combat: true,
                        appendText: "Chosen personality: " + ClassHelper.getKeyByValue(DBZCCG.Personality.Personalities, personality)
                    });

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

                    return {success: ret};
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
    },
    effectType: [DBZCCG.Combat.Effect.StageUp, DBZCCG.Combat.Effect.Regenerate]
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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

        DBZCCG.attackingPlayer.drawEffectCard(card);

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.Combat.flashCard(card);
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;
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
        return DBZCCG.currentCard && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
        var card = this;

        DBZCCG.Card.FloatingEffect.create(
                {card: DBZCCG.Saiyan['028'],
                    player: DBZCCG.performingAction,
                    scene: DBZCCG.mainScene,
                    combat: true
                });

        DBZCCG.defendingPlayer.addDefenderCallback({f: function(attackingCard) {
                if ($('#turnCounterNumber').html() !== this.turn) {
                    this.life = false;
                    return;
                } else if (attackingCard.success && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical) {
                    attackingCard.success = false;
                    DBZCCG.Combat.flashCard(card);
                    return {skipDefense: true};
                }
            }, priority: 100000, life: true, turn: $('#turnCounterNumber').html()});
        DBZCCG.performingTurn = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Defense.Floating, DBZCCG.Combat.Defense.All]
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        return DBZCCG.openCard && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical
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
        return DBZCCG.openCard && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy && DBZCCG.Combat.defaultDefenderCheck(player, this);
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
        return DBZCCG.currentCard && (DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical ||
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy)
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        DBZCCG.defendingPlayer.addBeforeDamageCallback({
            priority: 50,
            f: function(powerStages, lifeCards) {
                var ret;
                if (DBZCCG.phaseCounter === this.phase && $('#turnCounterNumber').html() === this.turn) {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: lifeCards > 0 ? lifeCards - 1 : lifeCards
                    };
                } else {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: lifeCards
                    };
                }

                return ret;
            },
            life: false,
            turn: $('#turnCounterNumber').html(),
            phase: DBZCCG.phaseCounter
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;
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
        return DBZCCG.currentCard && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        DBZCCG.defendingPlayer.addBeforeDamageCallback({
            priority: 50,
            f: function(powerStages, lifeCards) {
                var ret;
                if (this.phase === DBZCCG.phaseCounter && $('#turnCounterNumber').html() === this.turn) {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: lifeCards >= 3 ? lifeCards - 3 : lifeCards
                    };
                } else {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: lifeCards
                    };
                }
                return ret;
            },
            turn: $('#turnCounterNumber').html(),
            life: false,
            phase: DBZCCG.phaseCounter
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;
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
        return DBZCCG.currentCard && (DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy ||
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical) &&
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
        return DBZCCG.currentCard && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
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
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
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
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;
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
        return DBZCCG.performingAction.getPersonalityInControl() && ClassHelper.checkValue(DBZCCG.performingAction.mainPersonality.alignment,
                DBZCCG.Personality.alignment.Villain) && DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
    effect: function() {
        this.success = true;
        var card = this;

        DBZCCG.Card.FloatingEffect.create(
                {card: DBZCCG.Saiyan['045'],
                    player: DBZCCG.performingAction,
                    nextTurn: true,
                    scene: DBZCCG.mainScene,
                    appendText: "Will skip the next declare phase"
                });

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
    effectType: [DBZCCG.Combat.Effect.Regenerate, DBZCCG.Combat.Effect.EndCombat, DBZCCG.Combat.Effect.VillainOnly]
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;
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
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
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
        return DBZCCG.combat && DBZCCG.defendingPlayer &&
                !DBZCCG.defendingPlayer.onlyDefend &&
                !DBZCCG.defendingPlayer.onlyPass &&
                player === DBZCCG.defendingPlayer &&
                DBZCCG.Combat.actionATM === DBZCCG.Combat.Events['Combat Chain finished'] &&
                DBZCCG.Combat.checkDragonballControl(DBZCCG.attackingPlayer).length > 0 &&
                DBZCCG.Log.checkEventThisPhase(DBZCCG.Log.Type.sufferedAttack,
                {player: DBZCCG.attackingPlayer, typeAttack: DBZCCG.Combat.Attack.Physical,
                    phaseId: DBZCCG.phaseCounter - 1, turn: $('#turnCounterNumber').html()}) &&
                player.checkActivation(this) && player.checkOwnership(this.display) && player.nonCombats.getCardIdx(this.display) !== -1;
    },
    effect: function() {
        this.success = true;
        DBZCCG.attackingPlayer.captureDragonballs(false, false, true,
                "Due to the effects of <b>Goku's Touch</b> it is now possible to capture a dragonball.",
                DBZCCG.defendingPlayer);

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.Combat.effectHappening = false;
        });

        // effect still happening
        return true;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats", [cardIdx], "removedFromTheGame");

            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.Combat.checkUseWhenNeeded(DBZCCG.Combat.actionATM);
            });

            DBZCCG.performingTurn = false;
            DBZCCG.waitingMainPlayerMouseCommand = false;
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
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
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
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
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
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
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
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        var card = this;
        var damage = this.damage();

        DBZCCG.Card.FloatingEffect.create(
                {card: DBZCCG.Saiyan['058'],
                    player: DBZCCG.defendingPlayer,
                    combat: true,
                    scene: DBZCCG.mainScene
                });

        DBZCCG.Card.FloatingEffect.create(
                {card: DBZCCG.Saiyan['058'],
                    player: DBZCCG.attackingPlayer,
                    combat: true,
                    scene: DBZCCG.mainScene
                });

        DBZCCG.defendingPlayer.addDefenderCallback({f: function(attackingCard) {
                if ($('#turnCounterNumber').html() !== this.turn) {
                    this.life = false;
                    return;
                } else if (attackingCard.success && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy) {
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
                } else if (attackingCard.success && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy) {
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
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
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
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
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

DBZCCG.Saiyan['061'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Blue,
    description: "Stops a physical attack. Lower your opponent's anger 1 level.",
    name: "Blue Body Drop Throw",
    number: '061',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/061.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
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

DBZCCG.Saiyan['062'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Blue,
    description: "Stops a physical attack. Lower your opponent's anger 1 level.",
    name: "Blue Inner Leg Throw",
    number: '062',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/062.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
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

DBZCCG.Saiyan['063'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Blue,
    description: "Stops an energy attack. Lower your opponent's anger 1 level.",
    name: "Blue Big Whirl Throw",
    number: '063',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/063.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
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
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Effect.LowerAnger]
};

DBZCCG.Saiyan['064'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Blue,
    description: "Stops a physical attack. Lower your opponent's anger 1 level.",
    name: "Blue Ground Holding",
    number: '064',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/064.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
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

DBZCCG.Saiyan['065'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Black,
    description: "Energy attack doing 6 life cards. If successful, your opponent's lose 3 power stages to a minimum of 0.",
    rarity: DBZCCG.Card.Rarity.Uncommon,
    name: "Black Fore Fist Punch",
    number: '065',
    texturePath: "images/DBZCCG/saiyan/065.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    cost: function() {
        return {powerStage: 2};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 6;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
        var damage = this.damage();

        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.getPersonalityInControl().raiseZScouter(-3);
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
    effectType: [DBZCCG.Combat.Attack.Energy, DBZCCG.Combat.Effect.StageDown]
};

DBZCCG.Saiyan['066'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Black,
    description: "Energy attack or stops an energy attack.",
    name: "Black Knife Hand Strike",
    number: '066',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/066.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        var ret = false;

        if (!DBZCCG.Combat.actionATM) {

            if (DBZCCG.Combat.defaultAttackerCheck(player, this)) {
                ret = true;
                this.attack = true;
            } else {
                this.attack = false;
            }

            if (!ret && DBZCCG.openCard && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy
                    && DBZCCG.Combat.defaultDefenderCheck(player, this)) {
                ret = true;
                this.defense = true;
            } else {
                this.defense = false;
            }

        }

        return ret;
    },
    cost: function() {
        return {powerStage: this.defense ? 0 : 2};
    },
    effect: function() {
        if (this.attack) {
            this.success = true;
            this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
            DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;
        } else {
            this.targetCard.success = false;
            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.performingTurn = false;
            });
        }
    },
    damage: function() {
        if (this.attack) {
            return DBZCCG.Combat.attack(false, function(damage) {
                damage.cards = 4;
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
    effectType: [DBZCCG.Combat.Attack.Energy, DBZCCG.Combat.Defense.Energy]
};

DBZCCG.Saiyan['067'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Black,
    description: "Stops a physical attack. Raise your anger 1 level.",
    name: "Black Elbow Strike",
    number: '067',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/067.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
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

DBZCCG.Saiyan['068'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Black,
    description: "Energy attack doing 5 life cards. Costs 4 power stages. Raise your anger 2 levels.",
    rarity: DBZCCG.Card.Rarity.Uncommon,
    name: "Black Front Kick",
    number: '068',
    texturePath: "images/DBZCCG/saiyan/068.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    cost: function() {
        return {powerStage: 4};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(2);
        });
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
    effectType: [DBZCCG.Combat.Attack.Energy, DBZCCG.Combat.Effect.RaiseAnger]
};

DBZCCG.Saiyan['069'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Black,
    description: "Stops a physical attack. Raise your anger 2 levels.",
    name: "Black Side Kick",
    number: '069',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/069.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.changeAnger(2);
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

DBZCCG.Saiyan['070'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Black,
    description: "Energy attack doing 5 life cards of damage or stops a physical attack. Raise your anger 1 level.",
    name: "Black Turning Kick",
    number: '070',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/070.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        var ret = false;

        if (!DBZCCG.Combat.actionATM) {

            if (DBZCCG.Combat.defaultAttackerCheck(player, this)) {
                ret = true;
                this.attack = true;
            } else {
                this.attack = false;
            }

            if (!ret && DBZCCG.openCard && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical
                    && DBZCCG.Combat.defaultDefenderCheck(player, this)) {
                ret = true;
                this.defense = true;
            } else {
                this.defense = false;
            }

        }

        return ret;
    },
    cost: function() {
        return {powerStage: this.defense ? 0 : 2};
    },
    effect: function() {
        if (this.attack) {
            this.success = true;
            this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
            DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;
        } else {
            this.targetCard.success = false;
            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.performingTurn = false;
            });
        }

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.mainPersonality.changeAnger(1);
        });

    },
    damage: function() {
        if (this.attack) {
            return DBZCCG.Combat.attack(false, function(damage) {
                damage.cards = 5;
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
    effectType: [DBZCCG.Combat.Attack.Energy, DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Effect.RaiseAnger]
};


DBZCCG.Saiyan['071'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Black,
    description: "Energy attack doing 6 life cards. Costs 5 power stages. Raise your anger 1 level.",
    rarity: DBZCCG.Card.Rarity.Uncommon,
    name: "Black Back Kick",
    number: '071',
    texturePath: "images/DBZCCG/saiyan/071.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    cost: function() {
        return {powerStage: 5};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.mainPersonality.changeAnger(1);
        });
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 6;
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

DBZCCG.Saiyan['072'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Black,
    description: "Stops an energy attack. Raise your anger 1 level.",
    name: "Black Axe Heel Kick",
    number: '072',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/072.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
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
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Effect.RaiseAnger]
};

DBZCCG.Saiyan['073'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Black,
    description: "Stops an energy attack. Raise your anger 1 level.",
    name: "Black Rear Spin Kick",
    number: '073',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/073.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
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
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Effect.RaiseAnger]
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;

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

DBZCCG.Saiyan['075'] = {
    type: DBZCCG.Card.Type['Dragonball'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Draw 3 cards if you wish. Place the top card in your discard pile at the bottom of your life deck.",
    limit: 1,
    name: "Earth Dragon Ball 3",
    number: '075',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/075.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    dbCode: DBZCCG.Dragonball['Earth Dragonball 3'],
    playable: DBZCCG.Combat.defaultDragonballCheck,
    effect: function() {
        var control = this.control;

        DBZCCG.listActions.splice(0, 0, function() {
            var cardIdx = [];

            if (control.discardPile.cards.length > 0) {
                cardIdx.push(control.discardPile.cards.length - 1);
            }

            control.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
        });

        DBZCCG.listActions.splice(0, 0, function() {
            if (control === DBZCCG.mainPlayer) {
                DBZCCG.performingTurn = true;
                DBZCCG.waitingMainPlayerMouseCommand = true;

                DBZCCG.confirmDialog('Earth Dragon Ball 3', 'Draw 3 cards?', null, {'Yes': function() {
                        DBZCCG.listActions.splice(0, 0, function() {
                            control.drawTopCards(3, 'lifeDeck');
                        });

                        DBZCCG.performingTurn = false;
                        DBZCCG.waitingMainPlayerMouseCommand = false;
                        DBZCCG.Combat.effectHappening = false;
                        $(this).dialog('close');
                    }, 'No': function() {
                        DBZCCG.performingTurn = false;
                        DBZCCG.waitingMainPlayerMouseCommand = false;
                        DBZCCG.Combat.effectHappening = false;
                        $(this).dialog('close');
                    }});

                DBZCCG.Interface.hideDialogClose('#confirmDialog');
            } else /* AI */ {
                DBZCCG.listActions.splice(0, 0, function() {
                    control.drawTopCards(3, 'lifeDeck');
                });
            }
        });

        if (control === DBZCCG.mainPlayer) {
            // effect still happening
            return true;
        }
    },
    effectType: [DBZCCG.Combat.Effect.Regenerate, DBZCCG.Combat.Effect.DrawCard]
};

DBZCCG.Saiyan['076'] = {
    type: DBZCCG.Card.Type['Dragonball'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "End the next combat you are forced into. Raise your anger 2 levels.",
    limit: 1,
    name: "Earth Dragon Ball 4",
    number: '076',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/076.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    dbCode: DBZCCG.Dragonball['Earth Dragonball 4'],
    playable: DBZCCG.Combat.defaultDragonballCheck,
    effect: function() {
        var control = this.control;

        this.floatingEffect = DBZCCG.Card.FloatingEffect.create(
                {
                    player: control,
                    card: DBZCCG.Saiyan['076'],
                    scene: DBZCCG.mainScene,
                    appendText: 'If this player still controls this Dragon Ball, end the first combat declared against him before entering it.'
                });

        // If it is captured, kill the current floating effect
        this.killFloatingEffect = true;

        control.addCombatEnteringCallback({
            life: true,
            priority: 50000,
            f: function() {
                if (this.player === DBZCCG.defendingPlayer) {
                    if (this.player === this.db.control) {
                        DBZCCG.combat = false;
                        DBZCCG.Combat.flashCard(this.db);
                        DBZCCG.Log.logEntry('Combat ended due to the effects of Earth Dragon Ball 4', this.db);
                        this.db.floatingEffect.kill = true;
                        this.db.floatingEffect = null;
                    }
                    this.life = false;
                }
            },
            db: this
        });

        DBZCCG.listActions.splice(0, 0, function() {
            control.mainPersonality.changeAnger(2);
        });
    },
    effectType: [DBZCCG.Combat.Effect.EndCombat, DBZCCG.Combat.Effect.RaiseAnger]
};

DBZCCG.Saiyan['077'] = {
    type: DBZCCG.Card.Type['Dragonball'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Power up to full. Raise your anger 2 levels. Draw 2 cards if you wish. Place the two top cards in your discard pile at the bottom of your life deck.",
    limit: 1,
    name: "Earth Dragon Ball 5",
    number: '077',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/077.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    dbCode: DBZCCG.Dragonball['Earth Dragonball 5'],
    playable: DBZCCG.Combat.defaultDragonballCheck,
    effect: function() {
        var control = this.control;

        DBZCCG.listActions.splice(0, 0, function() {
            var cardIdx = [];

            if (control.discardPile.cards.length > 0) {
                cardIdx.push(control.discardPile.cards.length - 1);
                if (control.discardPile.cards.length > 1) {
                    cardIdx.push(control.discardPile.cards.length - 2);
                }
            }

            control.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
        });

        DBZCCG.listActions.splice(0, 0, function() {
            if (control === DBZCCG.mainPlayer) {
                DBZCCG.performingTurn = true;
                DBZCCG.waitingMainPlayerMouseCommand = true;

                DBZCCG.confirmDialog('Earth Dragon Ball 5', 'Draw 2 cards?', null, {'Yes': function() {
                        DBZCCG.listActions.splice(0, 0, function() {
                            control.drawTopCards(2, 'lifeDeck');
                        });

                        DBZCCG.performingTurn = false;
                        DBZCCG.waitingMainPlayerMouseCommand = false;
                        DBZCCG.Combat.effectHappening = false;
                        $(this).dialog('close');
                    }, 'No': function() {
                        DBZCCG.performingTurn = false;
                        DBZCCG.waitingMainPlayerMouseCommand = false;
                        DBZCCG.Combat.effectHappening = false;
                        $(this).dialog('close');
                    }});

                DBZCCG.Interface.hideDialogClose('#confirmDialog');
            } else /* AI */ {
                DBZCCG.listActions.splice(0, 0, function() {
                    control.drawTopCards(2, 'lifeDeck');
                });
            }
        });

        DBZCCG.listActions.splice(0, 0, function() {
            control.mainPersonality.changeAnger(2);
        });

        DBZCCG.listActions.splice(0, 0, function() {
            control.mainPersonality.moveZScouter("max");
        });

        if (control === DBZCCG.mainPlayer) {
            // effect still happening
            return true;
        }
    },
    effectType: [DBZCCG.Combat.Effect.Regenerate, DBZCCG.Combat.Effect.StageUp, DBZCCG.Combat.Effect.RaiseAnger, DBZCCG.Combat.Effect.DrawCard]
};

DBZCCG.Saiyan['078'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Heroes only. Place the top 3 cards from your discard pile on the bottom of your Life Deck.",
    name: "Roshi Training",
    number: '078',
    personality: DBZCCG.Personality.Personalities.ROSHI,
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/078.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: function(player) {
        return DBZCCG.performingAction.getPersonalityInControl() && ClassHelper.checkValue(DBZCCG.performingAction.mainPersonality.alignment,
                DBZCCG.Personality.alignment.Hero) && DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
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

            if (DBZCCG.attackingPlayer.discardPile.cards.length > 2) {
                cardIdx.push(DBZCCG.attackingPlayer.discardPile.cards.length - 3);
            }

            DBZCCG.attackingPlayer.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Effect.Regenerate, DBZCCG.Combat.Effect.HeroOnly]
};

DBZCCG.Saiyan['079'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Heroes only. Choose up to 2 cards from your discard pile and place them at the bottom of your Life Deck.",
    name: "King Kai Training",
    number: '079',
    personality: DBZCCG.Personality.Personalities['KING KAI'],
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/079.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: function(player) {
        return DBZCCG.performingAction.getPersonalityInControl() && ClassHelper.checkValue(DBZCCG.performingAction.mainPersonality.alignment,
                DBZCCG.Personality.alignment.Hero) && DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
    effect: function() {
        this.success = true;
        var card = this;

        if (DBZCCG.performingAction !== DBZCCG.mainPlayer) /* CPU */ {
            for (var k = 0; k < 2; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var cardIdx = [];

                    if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                        cardIdx.push(Math.floor(Math.random() * (DBZCCG.performingAction.discardPile.cards.length - 1)));
                    }

                    DBZCCG.performingAction.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
                });
            }
        } else /* mainPlayer */ {

            for (var k = 0; k < 2; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var card = DBZCCG.Interface.lastSelectedCards.shift();
                    if (card) {
                        DBZCCG.performingAction.transferCards('discardPile', [DBZCCG.performingAction.discardPile.cards.indexOf(card)], 'lifeDeck', 0);
                    }
                });
            }

            DBZCCG.listActions.splice(0, 0, function() {
                if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                    DBZCCG.waitingMainPlayerMouseCommand = DBZCCG.performingTurn = true;
                    DBZCCG.Interface.browseCardList(DBZCCG.performingAction.discardPile.cards, card.name + ': Pick 2 cards to place at the bottom of your life deck.', DBZCCG.performingAction.discardPile.cards.length > 1 ? 2 : 1);
                }
            });

            // effect happening
            return true;
        }
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Effect.Regenerate, DBZCCG.Combat.Effect.HeroOnly]
};

DBZCCG.Saiyan['080'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Villains and Goku only. Choose up to 2 cards from your discard pile and place them at the bottom of your Life Deck.",
    name: "Saiyan Training",
    number: '080',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/080.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: function(player) {
        return DBZCCG.performingAction.getPersonalityInControl() && (ClassHelper.checkValue(DBZCCG.performingAction.getPersonalityInControl().personality, DBZCCG.Personality.Personalities.GOKU) || ClassHelper.checkValue(DBZCCG.performingAction.mainPersonality.alignment,
                DBZCCG.Personality.alignment.Villain)) && DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
    effect: function() {
        this.success = true;
        var card = this;

        if (DBZCCG.performingAction !== DBZCCG.mainPlayer) /* CPU */ {
            for (var k = 0; k < 2; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var cardIdx = [];

                    if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                        cardIdx.push(Math.floor(Math.random() * (DBZCCG.performingAction.discardPile.cards.length - 1)));
                    }

                    DBZCCG.performingAction.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
                });
            }
        } else /* mainPlayer */ {

            for (var k = 0; k < 2; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var card = DBZCCG.Interface.lastSelectedCards.shift();
                    if (card) {
                        DBZCCG.performingAction.transferCards('discardPile', [DBZCCG.performingAction.discardPile.cards.indexOf(card)], 'lifeDeck', 0);
                    }
                });
            }

            DBZCCG.listActions.splice(0, 0, function() {
                if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                    DBZCCG.waitingMainPlayerMouseCommand = DBZCCG.performingTurn = true;
                    DBZCCG.Interface.browseCardList(DBZCCG.performingAction.discardPile.cards, card.name + ': Pick 2 cards to place at the bottom of your life deck.', DBZCCG.performingAction.discardPile.cards.length > 1 ? 2 : 1);
                }
            });

            // effect happening
            return true;
        }
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats",
                    [cardIdx],
                    "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Effect.Regenerate, DBZCCG.Combat.Effect.VillainOnly]
};

DBZCCG.Saiyan['089'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Heroes only. Choose up to 2 cards from your discard pile and place them at the bottom of your Life Deck. Remove from the game after use.",
    name: "Dream Chamber Training",
    number: '089',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/089.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: function(player) {
        return DBZCCG.performingAction.getPersonalityInControl() && ClassHelper.checkValue(DBZCCG.performingAction.mainPersonality.alignment,
                DBZCCG.Personality.alignment.Hero) && DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
    effect: function() {
        this.success = true;
        var card = this;

        if (DBZCCG.performingAction !== DBZCCG.mainPlayer) /* CPU */ {
            for (var k = 0; k < 2; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var cardIdx = [];

                    if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                        cardIdx.push(Math.floor(Math.random() * (DBZCCG.performingAction.discardPile.cards.length - 1)));
                    }

                    DBZCCG.performingAction.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
                });
            }
        } else /* mainPlayer */ {

            for (var k = 0; k < 2; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var card = DBZCCG.Interface.lastSelectedCards.shift();
                    if (card) {
                        DBZCCG.performingAction.transferCards('discardPile', [DBZCCG.performingAction.discardPile.cards.indexOf(card)], 'lifeDeck', 0);
                    }
                });
            }

            DBZCCG.listActions.splice(0, 0, function() {
                if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                    DBZCCG.waitingMainPlayerMouseCommand = DBZCCG.performingTurn = true;
                    DBZCCG.Interface.browseCardList(DBZCCG.performingAction.discardPile.cards, card.name + ': Pick 2 cards to place at the bottom of your life deck.', DBZCCG.performingAction.discardPile.cards.length > 1 ? 2 : 1);
                }
            });

            // effect happening
            return true;
        }
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.Regenerate, DBZCCG.Combat.Effect.HeroOnly]
};

DBZCCG.Saiyan['090'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops a physical or energy attack. Remove from the game after use.",
    name: "Mother's Touch",
    number: '090',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/090.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                (DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy ||
                        DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical) &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Omni, DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Defense.Energy]
};

DBZCCG.Saiyan['091'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Saiyan Heritage Only. Energy attack doing 7 power life cards of damage. Costs 4 power stages to perform. Remove from the game after use.",
    rarity: DBZCCG.Card.Rarity.Uncommon,
    name: "Saiyan Energy Throw",
    number: '091',
    texturePath: "images/DBZCCG/saiyan/091.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.Combat.defaultAttackerCheck(player, this) && DBZCCG.Personality.checkHeritage(player.activePersonality.personality().personality, 'saiyan');
    },
    cost: function() {
        return {powerStage: 4};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 7;
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
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['092'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Saiyan Heritage Only. Stops an energy attack.",
    name: "Saiyan Energy Defense",
    number: '092',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/092.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
                DBZCCG.Personality.checkHeritage(player.activePersonality.personality().personality, 'saiyan') &&
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

DBZCCG.Saiyan['093'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Saiyan Heritage Only. Energy attack doing 6 power life cards of damage.",
    rarity: DBZCCG.Card.Rarity.Uncommon,
    name: "Saiyan Mental Energy Attack",
    number: '093',
    texturePath: "images/DBZCCG/saiyan/093.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.Combat.defaultAttackerCheck(player, this) && DBZCCG.Personality.checkHeritage(player.activePersonality.personality().personality, 'saiyan');
    },
    cost: function() {
        return {powerStage: 2};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 6;
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
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['094'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Saiyan Heritage Only. Energy attack. Name a personality. Your opponent cannot perform physical attacks with that personality on his next attack phase. Costs 3 power stages to perform.",
    name: "Saiyan Energy Blast",
    number: '094',
    cost: function() {
        return {powerStage: 3};
    },
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/094.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.Combat.defaultAttackerCheck(player, this) && DBZCCG.Personality.checkHeritage(player.activePersonality.personality().personality, 'saiyan');
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;

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

                            return {success: ret};
                        },
                        phase: DBZCCG.phaseCounter + 1,
                        turn: $('#turnCounterNumber').html(),
                        life: true,
                        priority: 50}
                    );

                    DBZCCG.Card.FloatingEffect.create(
                            {card: DBZCCG.Saiyan['094'],
                                player: DBZCCG.performingAction,
                                turn: $('#turnCounterNumber').html,
                                phase: DBZCCG.phaseCounter + 1,
                                scene: DBZCCG.mainScene,
                                combat: true,
                                appendText: "Chosen personality: " + $('#search-form').val()
                            });

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

            DBZCCG.Card.FloatingEffect.create(
                    {card: DBZCCG.Saiyan['094'],
                        player: DBZCCG.performingAction,
                        turn: $('#turnCounterNumber').html,
                        phase: DBZCCG.phaseCounter + 1,
                        scene: DBZCCG.mainScene,
                        combat: true,
                        appendText: "Chosen personality: " + ClassHelper.getKeyByValue(DBZCCG.Personality.Personalities, personality)
                    });

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

                    return {success: ret};
                },
                phase: DBZCCG.phaseCounter + 1,
                turn: $('#turnCounterNumber').html(),
                life: true,
                priority: 50}
            );
        }
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
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['095'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Saiyan Heritage Only. Stops an energy attack. Stops an energy attack in your next defense phase.",
    name: "Saiyan Energy Aura",
    number: '095',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/095.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
                DBZCCG.Personality.checkHeritage(player.activePersonality.personality().personality, 'saiyan') &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        var card = this;
        this.targetCard.success = false;

        DBZCCG.Card.FloatingEffect.create(
                {card: DBZCCG.Saiyan['095'],
                    player: DBZCCG.defendingPlayer,
                    turn: $('#turnCounterNumber').html,
                    phase: DBZCCG.phaseCounter + 2,
                    scene: DBZCCG.mainScene,
                    combat: true
                });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.addDefenderCallback({f: function(attackingCard) {
                    if (attackingCard.success &&
                            this.phase === DBZCCG.phaseCounter && this.turn === $('#turnCounterNumber').html &&
                            DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy) {
                        attackingCard.success = false;
                        DBZCCG.Combat.flashCard(card);
                        return {skipDefense: true};
                    }
                    // destroy floating effect created
                }, priority: 100000,
                life: false, turn: $('#turnCounterNumber').html, phase: DBZCCG.phaseCounter + 2});
            //createFloatingEffect to stop next energy attack in his next attack phase
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Effect.Floating]
};

DBZCCG.Saiyan['096'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Saiyan Heritage Only. Stops a physical attack. Stops a physical attack in your next defense phase.",
    name: "Saiyan Sweeping Defense",
    number: '096',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/096.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
                DBZCCG.Personality.checkHeritage(player.activePersonality.personality().personality, 'saiyan') &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        var card = this;
        this.targetCard.success = false;

        DBZCCG.Card.FloatingEffect.create(
                {card: DBZCCG.Saiyan['096'],
                    player: DBZCCG.defendingPlayer,
                    turn: $('#turnCounterNumber').html,
                    phase: DBZCCG.phaseCounter + 2,
                    scene: DBZCCG.mainScene,
                    combat: true
                });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.addDefenderCallback({f: function(attackingCard) {
                    if (attackingCard.success &&
                            this.phase === DBZCCG.phaseCounter && this.turn === $('#turnCounterNumber').html &&
                            attackingCard.effectType instanceof Array &&
                            attackingCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1) {
                        attackingCard.success = false;
                        DBZCCG.Combat.flashCard(card);
                        return {skipDefense: true};
                    }
                    // destroy floating effect created
                }, priority: 100000,
                life: false, turn: $('#turnCounterNumber').html, phase: DBZCCG.phaseCounter + 2});
            //createFloatingEffect to stop next energy attack in his next attack phase
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Effect.Floating]
};

DBZCCG.Saiyan['097'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Power up 6 power stages.",
    name: "Power Up More!",
    number: '097',
    rarity: DBZCCG.Card.Rarity.Common,
    texturePath: "images/DBZCCG/saiyan/097.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.getPersonalityInControl().raiseZScouter(6);
        });

    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("nonCombats", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Effect.StageUp]
};

DBZCCG.Saiyan['099'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Increase your anger by 2 levels. Take the top 2 cards of your discard pile and place them at the bottom of your life deck. Limit 1 per deck.",
    name: "Blazing Anger!",
    number: '099',
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

DBZCCG.Saiyan['100'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops a physical or energy attack. Remove from the game after use.",
    name: "Vegeta's Surprise Defense",
    number: '100',
    personality: DBZCCG.Personality.Personalities.VEGETA,
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/100.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                (DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy ||
                        DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical) &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Omni, DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Defense.Energy]
};

DBZCCG.Saiyan['098'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Power up to full. Choose up to 2 cards from your discard pile and place them at the bottom of your Life Deck.",
    name: "Power Up the Most!",
    number: '098',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/098.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        var card = this;

        if (DBZCCG.performingAction !== DBZCCG.mainPlayer) /* CPU */ {
            for (var k = 0; k < 2; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var cardIdx = [];

                    if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                        cardIdx.push(Math.floor(Math.random() * (DBZCCG.performingAction.discardPile.cards.length - 1)));
                    }

                    DBZCCG.performingAction.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
                });
            }
        } else /* mainPlayer */ {

            for (var k = 0; k < 2; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var card = DBZCCG.Interface.lastSelectedCards.shift();
                    if (card) {
                        DBZCCG.performingAction.transferCards('discardPile', [DBZCCG.performingAction.discardPile.cards.indexOf(card)], 'lifeDeck', 0);
                    }
                });
            }

            DBZCCG.listActions.splice(0, 0, function() {
                if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                    DBZCCG.waitingMainPlayerMouseCommand = DBZCCG.performingTurn = true;
                    DBZCCG.Interface.browseCardList(DBZCCG.performingAction.discardPile.cards, card.name + ': Pick 2 cards to place at the bottom of your life deck.', DBZCCG.performingAction.discardPile.cards.length > 1 ? 2 : 1);
                }
            });
        }

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.getPersonalityInControl().moveZScouter("max");
        });

        if (DBZCCG.performingAction === DBZCCG.mainPlayer) {
            // effect happening
            return true;
        }
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Effect.Regenerate, DBZCCG.Combat.Effect.StageUp]
};

DBZCCG.Saiyan['108'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Prevents 3 life card of damage from an energy attack. If used by Goku, this card stays on the table to be used one more time this combat.",
    name: "Goku's Energy Defense",
    number: '108',
    personality: DBZCCG.Personality.Personalities.GOKU,
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/108.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    numberOfUses: 0,
    activable: function(player) {
        return DBZCCG.currentCard
                && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        var card = this;
        DBZCCG.defendingPlayer.addBeforeDamageCallback({
            priority: 50,
            f: function(powerStages, lifeCards) {
                var ret;
                if (this.phase === DBZCCG.phaseCounter && $('#turnCounterNumber').html() === this.turn) {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: lifeCards >= 3 ? lifeCards - 3 : lifeCards
                    };
                } else {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: lifeCards
                    };
                }
                return ret;
            },
            turn: $('#turnCounterNumber').html(),
            life: false,
            phase: DBZCCG.phaseCounter
        });

        DBZCCG.defendingPlayer.addCombatLeavingCallback({
            priority: 1,
            player: DBZCCG.defendingPlayer,
            card: card,
            f: function() {
                if (this.player.inPlay.getCardIdx(this.card.display) !== -1) {
                    var cardIdx = this.player.inPlay.getCardIdx(this.card.display);
                    this.player.transferCards("inPlay", [cardIdx], "discardPile");
                }
            },
            life: false
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        this.numberOfUses++;
        if ((this.numberOfUses === 2 && ClassHelper.checkValue(DBZCCG.defendingPlayer.getPersonalityInControl().personality, DBZCCG.Personality.Personalities.GOKU)) ||
                !ClassHelper.checkValue(DBZCCG.defendingPlayer.getPersonalityInControl().personality, DBZCCG.Personality.Personalities.GOKU)) {
            this.numberOfUses = 0;
            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
            });
        }
    },
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Defense.Prevention]
};

DBZCCG.Saiyan['109'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Energy attack doing 6 power life cards of damage. Costs 5 power stages to perform.",
    rarity: DBZCCG.Card.Rarity.Uncommon,
    personality: DBZCCG.Personality.Personalities.PICCOLO,
    name: "Piccolo's Energy Attack",
    number: '109',
    texturePath: "images/DBZCCG/saiyan/109.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    cost: function() {
        return {powerStage: 5};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;
    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 6;
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
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['110'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops a physical attack. Power up 4 stages.",
    name: "Piccolo's Physical Defense",
    number: '110',
    personality: DBZCCG.Personality.Personalities.PICCOLO,
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/110.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.getPersonalityInControl().raiseZScouter(4);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Effect.StageUp, DBZCCG.Combat.Defense.Physical]
};

DBZCCG.Saiyan['111'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops an energy attack. Raise your anger 1 level.",
    name: "Gohan's Energy Defense",
    personality: DBZCCG.Personality.Personalities.GOHAN,
    number: '111',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/111.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
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
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Effect.RaiseAnger]
};

DBZCCG.Saiyan['112'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Play this card as a defense. If your opponent's attack does life cards of damage to you, you may take the first life card of damage from that attack and place it in your hand instead of discarding it. If used by Krillin, this card stays in play to be used on more time this Combat.",
    name: "Krillin's Physical Defense",
    number: '112',
    personality: DBZCCG.Personality.Personalities.KRILLIN,
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/112.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    numberOfUses: 0,
    activable: function(player) {
        return DBZCCG.currentCard
                && (DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy ||
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical)
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        var card = this;
        DBZCCG.defendingPlayer.discardPile.addAddCallback({
            priority: Infinity,
            f: function(cardIdx, increaseIndex, cards, card, owner) {
                if (DBZCCG.combat && DBZCCG.defendingPlayer && DBZCCG.defendingPlayer.sufferedAttack) {
                    if (!this.run && this.phase === DBZCCG.phaseCounter
                            && $('#turnCounterNumber').html() === this.turn) {
                        this.run = true;
                        DBZCCG.defendingPlayer.transferCards("discardPile", [cardIdx], "hand");
                        return {increaseIndex: 0};
                    }
                    this.life = false;
                }
            },
            turn: $('#turnCounterNumber').html(),
            life: true,
            run: false,
            phase: DBZCCG.phaseCounter
        });

        DBZCCG.defendingPlayer.addCombatLeavingCallback({
            priority: 1,
            player: DBZCCG.defendingPlayer,
            card: card,
            f: function() {
                if (this.player.inPlay.getCardIdx(this.card.display) !== -1) {
                    var cardIdx = this.player.inPlay.getCardIdx(this.card.display);
                    this.player.transferCards("inPlay", [cardIdx], "discardPile");
                }
            },
            life: false
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        this.numberOfUses++;
        if ((this.numberOfUses === 2 && ClassHelper.checkValue(DBZCCG.defendingPlayer.getPersonalityInControl().personality, DBZCCG.Personality.Personalities.KRILLIN)) ||
                !ClassHelper.checkValue(DBZCCG.defendingPlayer.getPersonalityInControl().personality, DBZCCG.Personality.Personalities.KRILLIN)) {
            this.numberOfUses = 0;
            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
            });
        }
    },
    effectType: [DBZCCG.Combat.Effect.DrawCard]
};

DBZCCG.Saiyan['113'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.KRILLIN,
    description: "Energy attack doing 2 life cards of damage. If used by Krillin this card stays on the table to be used one more time this combat.",
    name: "Krillin's Energy Attack",
    number: '113',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/113.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    numberOfUses: 0,
    cost: function() {
        return {powerStage: 2};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();

        var card = this;

        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;

        DBZCCG.attackingPlayer.addCombatLeavingCallback({
            priority: 1,
            player: DBZCCG.attackingPlayer,
            card: card,
            f: function() {
                if (this.player.inPlay.getCardIdx(this.card.display) !== -1) {
                    var cardIdx = this.player.inPlay.getCardIdx(this.card.display);
                    this.player.transferCards("inPlay", [cardIdx], "discardPile");
                }
            },
            life: false
        });

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
        this.numberOfUses++;
        if ((this.numberOfUses === 2 && ClassHelper.checkValue(DBZCCG.attackingPlayer.getPersonalityInControl().personality, DBZCCG.Personality.Personalities.KRILLIN)) ||
                !ClassHelper.checkValue(DBZCCG.attackingPlayer.getPersonalityInControl().personality, DBZCCG.Personality.Personalities.KRILLIN)) {
            this.numberOfUses = 0;
            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
            });
        }
    },
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['114'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops an energy attack.",
    name: "Tien's Energy Defense",
    number: '114',
    personality: DBZCCG.Personality.Personalities.TIEN,
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/114.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
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

DBZCCG.Saiyan['115'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Energy attack doing 2 power life cards of damage. Costs 3 power stages to perform.",
    rarity: DBZCCG.Card.Rarity.Uncommon,
    personality: DBZCCG.Personality.Personalities.YAMCHA,
    name: "Yamcha's Energy Attack",
    number: '115',
    texturePath: "images/DBZCCG/saiyan/115.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    cost: function() {
        return {powerStage: 3};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;
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
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['116'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Prevents 3 life card of damage from a physical attack.",
    name: "Yamcha's Physical Defense",
    personality: DBZCCG.Personality.Personalities.YAMCHA,
    number: '116',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/116.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard
                && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        DBZCCG.defendingPlayer.addBeforeDamageCallback({
            priority: 50,
            f: function(powerStages, lifeCards) {
                var ret;
                if (this.phase === DBZCCG.phaseCounter && $('#turnCounterNumber').html() === this.turn) {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: lifeCards >= 3 ? lifeCards - 3 : lifeCards
                    };
                } else {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: lifeCards
                    };
                }
                return ret;
            },
            turn: $('#turnCounterNumber').html(),
            life: false,
            phase: DBZCCG.phaseCounter
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Defense.Prevention]
};

DBZCCG.Saiyan['117'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Forces a hero opponent to discard the top card of his life deck. Remove from the game after use.",
    name: "Raditz Energy Wall",
    number: '117',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    personality: DBZCCG.Personality.Personalities.RADITZ,
    texturePath: "images/DBZCCG/saiyan/117.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.defendingPlayer && ClassHelper.checkValue(DBZCCG.defendingPlayer.mainPersonality.alignment,
                DBZCCG.Personality.alignment.Hero) && DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
    effect: function() {
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("lifeDeck",
                    [DBZCCG.defendingPlayer.lifeDeck.cards.length - 1],
                    "discardPile");
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.DiscardCard]
};

DBZCCG.Saiyan['118'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Lower a hero opponent's anger 2 levels. Remove from the game after use.",
    name: "Raditz Physical Defense",
    number: '118',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    personality: DBZCCG.Personality.Personalities.RADITZ,
    texturePath: "images/DBZCCG/saiyan/118.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.defendingPlayer && ClassHelper.checkValue(DBZCCG.defendingPlayer.mainPersonality.alignment,
                DBZCCG.Personality.alignment.Hero) && DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
    effect: function() {
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.changeAnger(-2);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.LowerAnger]
};

DBZCCG.Saiyan['120'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.NAPPA,
    limit: 1,
    description: "Stops an energy attack. For the remainder of combat stops all your opponent's energy attacks. Remove from the game after use. Limit 1 per deck.",
    name: "Nappa's Energy Aura",
    number: '120',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/120.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard
                && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
        var card = this;

        DBZCCG.Card.FloatingEffect.create(
                {card: DBZCCG.Saiyan['120'],
                    player: DBZCCG.performingAction,
                    scene: DBZCCG.mainScene,
                    combat: true
                });

        DBZCCG.defendingPlayer.addDefenderCallback({f: function(attackingCard) {
                if ($('#turnCounterNumber').html() !== this.turn) {
                    this.life = false;
                    return;
                } else if (attackingCard.success && attackingCard.effectType instanceof Array
                        && attackingCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1) {
                    attackingCard.success = false;
                    DBZCCG.Combat.flashCard(card);
                    return {skipDefense: true};
                }
            }, priority: 100000, life: true, turn: $('#turnCounterNumber').html()});
        DBZCCG.performingTurn = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Defense.Floating, DBZCCG.Combat.Defense.All]
};

DBZCCG.Saiyan['121'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.NAPPA,
    limit: 1,
    description: "Stops a physical attack. For the remainder of combat stops all your opponent's physical attacks. Remove from the game after use. Limit 1 per deck.",
    name: "Nappa's Physical Resistance",
    number: '121',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/121.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard
                && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical
                && DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
        var card = this;

        DBZCCG.Card.FloatingEffect.create(
                {card: DBZCCG.Saiyan['121'],
                    player: DBZCCG.performingAction,
                    scene: DBZCCG.mainScene,
                    combat: true
                });

        DBZCCG.defendingPlayer.addDefenderCallback({f: function(attackingCard) {
                if ($('#turnCounterNumber').html() !== this.turn) {
                    this.life = false;
                    return;
                } else if (attackingCard.success && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical) {
                    attackingCard.success = false;
                    DBZCCG.Combat.flashCard(card);
                    return {skipDefense: true};
                }
            }, priority: 100000, life: true, turn: $('#turnCounterNumber').html()});
        DBZCCG.performingTurn = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Defense.Floating, DBZCCG.Combat.Defense.All]
};

DBZCCG.Saiyan['122'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.YAJIROBE,
    description: "Energy attack doing 1 life card of damage. Remove from the game after use.",
    name: "Yajirobe's Energy Attack",
    number: '122',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/122.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;
    },
    cost: function() {
        return {powerStage: 2};
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
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['123'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.CHIAOTZU,
    description: "Energy attack doing 3 life card of damage. Remove from the game after use.",
    name: "Chiaotzu's Energy Manipulation",
    limit: 1,
    number: '123',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/123.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;
    },
    cost: function() {
        return {powerStage: 2};
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
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['153'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops a physical attack. Remove from the game after use.",
    name: "Goku's Energy Blast!",
    number: '153',
    personality: DBZCCG.Personality.Personalities.GOKU,
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/153.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical]
};

DBZCCG.Saiyan['154'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops an energy attack. Remove from the game after use.",
    name: "Piccolo Sidestep!",
    number: '154',
    personality: DBZCCG.Personality.Personalities.PICCOLO,
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/154.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Energy]
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;

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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

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
        return DBZCCG.currentCard
                && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy
                && DBZCCG.Combat.personalityPowerDefaultDefenseCheck(player, this);
    },
    effect: function() {
        DBZCCG.defendingPlayer.addBeforeDamageCallback({
            priority: 50,
            f: function(powerStages, lifeCards) {
                var ret;
                if (this.phase === DBZCCG.phaseCounter && $('#turnCounterNumber').html() === this.turn) {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: lifeCards > 1 ? lifeCards - 2 : 0
                    };
                } else {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: lifeCards
                    };
                }
                return ret;
            },
            life: false,
            turn: $('#turnCounterNumber').html(),
            phase: DBZCCG.phaseCounter
        });
    },
    postEffect: function(card) {
        card.turn = parseInt($('#turnCounterNumber')[0].innerHTML);
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
    description: "Power: Once per combat, reduces the damage of an energy attack to 2 life cards.",
    level: 1,
    name: "Vegeta",
    activable: function(player) {
        return DBZCCG.currentCard
                && DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy
                && DBZCCG.Combat.personalityPowerDefaultDefenseCheck(player, this);
    },
    effect: function() {
        DBZCCG.defendingPlayer.addBeforeDamageCallback({
            priority: 50,
            f: function(powerStages, lifeCards) {
                var ret;
                if (DBZCCG.phaseCounter === this.phase && $('#turnCounterNumber').html() === this.turn) {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: 2
                    };
                } else {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: lifeCards
                    };
                }
                return ret;
            },
            life: false,
            turn: $('#turnCounterNumber').html(),
            phase: DBZCCG.phaseCounter
        });
    },
    postEffect: function(card) {
        card.turn = parseInt($('#turnCounterNumber')[0].innerHTML);
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
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;

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
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingTurn = false;
            DBZCCG.waitingMainPlayerMouseCommand = false;
        });
    },
    activable: function(player) {
        return !this.used &&
                DBZCCG.combat && DBZCCG.defendingPlayer &&
                player === DBZCCG.defendingPlayer &&
                !DBZCCG.defendingPlayer.onlyDefend && !DBZCCG.defendingPlayer.onlyPass
                && DBZCCG.Combat.actionATM === DBZCCG.Combat.Events['Combat Chain finished'] &&
                DBZCCG.Combat.checkDragonballControl(DBZCCG.attackingPlayer).length > 0 &&
                DBZCCG.Log.checkEventThisPhase(DBZCCG.Log.Type.sufferedAttack,
                {player: DBZCCG.attackingPlayer, typeAttack: DBZCCG.Combat.Attack.Energy,
                    phaseId: DBZCCG.phaseCounter - 1, turn: $('#turnCounterNumber').html()}) &&
                player.checkActivation(this) && player.checkOwnership(this.display) && (player.mainPersonality.currentPersonality() === this);
    },
    effect: function() {
        this.success = true;
        DBZCCG.attackingPlayer.captureDragonballs(false, false, true,
                "Due to the effects of <b>Vegeta</b> it is now possible to capture a dragonball.",
                DBZCCG.defendingPlayer);

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.combat = false;
            DBZCCG.Combat.effectHappening = false;
        });

        // effect still happening
        return true;
    },
    effectType: [DBZCCG.Combat.Effect.CaptureDragonball, DBZCCG.Combat.Effect.EndCombat]
};

DBZCCG.Saiyan['186'] = {
    type: DBZCCG.Card.Type['Dragonball'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "This card has an active power that reads \"End's a Combat. Power up to full.\"."
            + " When this card comes first into play, lower all your opponent's anger 2 levels.",
    limit: 1,
    name: "Earth Dragon Ball 6",
    number: '186',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/186.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    dbCode: DBZCCG.Dragonball['Earth Dragonball 6'],
    activable: function(player) {
        return DBZCCG.combat &&
                player === this.control && this.cameIntoPlay && this.charges > 0 && DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
    playable: DBZCCG.Combat.defaultDragonballCheck,
    effect: function() {
        var control = this.control;
        var firstUse = false;
        if (!this.cameIntoPlay) {
            DBZCCG.listActions.splice(0, 0, function() {
                for (var i = 0; i < DBZCCG.table.players.length; i++) {
                    if (DBZCCG.table.players[i] !== control) {
                        DBZCCG.table.players[i].mainPersonality.changeAnger(-2);
                    }
                }
            });
            this.cameIntoPlay = true;
            firstUse = true;
        }

        if (this.lastControl !== this.control) {
            this.charges = 1;
            firstUse = true;
        }
        this.lastControl = control;

        if (DBZCCG.combat && !firstUse && this.charges > 0) {
            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.combat = false;
            });

            DBZCCG.listActions.splice(0, 0, function() {
                control.getPersonalityInControl().moveZScouter("max");
            });

            this.charges--;
        }
    },
    effectType: [DBZCCG.Combat.Effect.EndCombat, DBZCCG.Combat.Effect.StageUp, DBZCCG.Combat.Effect.LowerAnger]
};

DBZCCG.Saiyan['187'] = {
    type: DBZCCG.Card.Type['Dragonball'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Play this card from your hand during combat to end it. Pick 3 cards from your discard pile and put them at the top of your Life Deck.\"."
            + " When this card comes first into play, lower all your opponent's anger 2 levels.",
    limit: 1,
    name: "Earth Dragon Ball 7",
    number: '187',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/187.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    dbCode: DBZCCG.Dragonball['Earth Dragonball 7'],
    playable: function(player) {
        return (DBZCCG.Combat.defaultNonCombatCheck(player) || DBZCCG.Combat.defaultAttackerCheck(player)) && !DBZCCG.Dragonball.checkInPlay(this);
    },
    effect: function() {
        var control = this.control;
        var card = this;

        if (DBZCCG.combat && DBZCCG.currentCard === this && DBZCCG.toolTip.cardSource === 'hand') {
            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.combat = false;
            });
        }

        if (!this.cameIntoPlay) {
            DBZCCG.listActions.splice(0, 0, function() {
                for (var i = 0; i < DBZCCG.table.players.length; i++) {
                    if (DBZCCG.table.players[i] !== control) {
                        DBZCCG.table.players[i].mainPersonality.changeAnger(-2);
                    }
                }
            });
            this.cameIntoPlay = true;
        }

        if (DBZCCG.performingAction !== DBZCCG.mainPlayer) /* CPU */ {
            for (var k = 0; k < 3; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var cardIdx = [];

                    if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                        cardIdx.push(Math.floor(Math.random() * (DBZCCG.performingAction.discardPile.cards.length - 1)));
                    }

                    DBZCCG.performingAction.transferCards('discardPile', cardIdx, 'lifeDeck');
                });
            }
        } else /* mainPlayer */ {
            for (var k = 0; k < 3; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var card = DBZCCG.Interface.lastSelectedCards.shift();
                    if (card) {
                        DBZCCG.performingAction.transferCards('discardPile', [DBZCCG.performingAction.discardPile.cards.indexOf(card)], 'lifeDeck');
                    }
                });
            }

            DBZCCG.listActions.splice(0, 0, function() {
                if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                    DBZCCG.waitingMainPlayerMouseCommand = DBZCCG.performingTurn = true;
                    DBZCCG.Interface.browseCardList(DBZCCG.performingAction.discardPile.cards, card.name + ': Pick 3 cards to place at the bottom of your life deck.',
                            DBZCCG.performingAction.discardPile.cards.length > 2 ? 3 : DBZCCG.performingAction.discardPile.cards.length > 1 ? 2 : 1);
                }
            });

            // effect still happening
            return true;
        }
    },
    effectType: [DBZCCG.Combat.Effect.EndCombat, DBZCCG.Combat.Effect.LowerAnger, DBZCCG.Combat.Effect.Regenerate]
};

DBZCCG.Saiyan['188'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Capture an opponent's Dragon Ball.",
    name: "Earth Dragon Ball Capture",
    number: '188',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/188.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.Combat.checkDragonballControl(DBZCCG.defendingPlayer).length > 0 &&
                DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
    effect: function() {
        this.success = true;
        DBZCCG.defendingPlayer.captureDragonballs(false, false, true, "Due to the effects of <b>" + this.name + "</b> it is now possible to capture a dragonball.");

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.Combat.effectHappening = false;
        });

        // effect still happening
        return true;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Effect.CaptureDragonball]
};

DBZCCG.Saiyan['189'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Energy attack. If successful, capture a Dragon Ball.",
    rarity: DBZCCG.Card.Rarity.Rare,
    name: "Earth Dragon Ball Combat",
    number: '189',
    texturePath: "images/DBZCCG/saiyan/189.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    cost: function() {
        return {powerStage: 2};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;

    },
    damage: function() {
        return DBZCCG.Combat.attack(false, function(damage) {
            damage.cards = 4;
            return damage;
        }, DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerLevel(), DBZCCG.defendingPlayer.getPersonalityInControl().currentPowerLevel());
    },
    successfulEffect: function(defendingPlayer) {
        var damage = this.damage();

        DBZCCG.defendingPlayer.captureDragonballs(false, false, true, "Due to the effects of <b>" + this.name + "</b> it is now possible to capture a dragonball.");

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.Combat.effectHappening = false;
        });

        DBZCCG.listActions.splice(0, 0, function() {
            defendingPlayer.takeDamage(damage);
        });

        // effect still happening
        return true;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Energy, DBZCCG.Combat.Effect.CaptureDragonball]
};

DBZCCG.Saiyan['190'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Increase your anger by 2 levels. Choose 2 cards of your discard pile and place them at the bottom of your life deck. Remove from the game after use.",
    name: "Enraged",
    number: '190',
    texturePath: "images/DBZCCG/saiyan/190.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    rarity: DBZCCG.Card.Rarity.Common,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        var card = this;
        this.success = true;

        if (DBZCCG.performingAction !== DBZCCG.mainPlayer) /* CPU */ {
            for (var k = 0; k < 2; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var cardIdx = [];

                    if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                        cardIdx.push(Math.floor(Math.random() * (DBZCCG.performingAction.discardPile.cards.length - 1)));
                    }

                    DBZCCG.performingAction.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
                });
            }

            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.performingAction.mainPersonality.changeAnger(2);
            });

        } else /* mainPlayer */ {
            
            DBZCCG.performingAction.mainPersonality.changeAnger(2);

            for (var k = 0; k < 2; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var card = DBZCCG.Interface.lastSelectedCards.shift();
                    if (card) {
                        DBZCCG.performingAction.transferCards('discardPile', [DBZCCG.performingAction.discardPile.cards.indexOf(card)], 'lifeDeck', 0);
                    }
                });
            }

            DBZCCG.listActions.splice(0, 0, function() {
                if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                    DBZCCG.waitingMainPlayerMouseCommand = DBZCCG.performingTurn = true;
                    DBZCCG.Interface.browseCardList(DBZCCG.performingAction.discardPile.cards, card.name + ': Pick 2 cards to place at the bottom of your life deck.',
                            DBZCCG.performingAction.discardPile.cards.length > 1 ? 2 : 1);
                }
            });

            // effect still happening
            return true;
        }
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("nonCombats", [cardIdx], "removedFromTheGame");
        });
    }
};

DBZCCG.Saiyan['192'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Use this card during your opponent's PUR Phase step. That opponent skip his next declare phase. Limit 2 per deck. Remove from the game after use.",
    name: "Teaching the Unteachable Forces Observation",
    number: '192',
    limit: 2,
    texturePath: "images/DBZCCG/saiyan/192.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    rarity: DBZCCG.Card.Rarity.Rare,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: function(player) {
        return player.checkOwnership(this.display) && player.checkActivation(this) &&
                DBZCCG.Combat.actionATM === DBZCCG.Combat.Events['Entering PUR Phase'] &&
                DBZCCG.turnOwner !== player &&
                player.nonCombats.getCardIdx(this.display) !== -1;
    },
    effect: function() {
        this.success = true;
        var card = this;
        var opponent = DBZCCG.turnOwner;

        DBZCCG.Card.FloatingEffect.create(
                {card: DBZCCG.Saiyan['192'],
                    player: DBZCCG.performingAction,
                    turn: $('#turnCounterNumber').html(),
                    scene: DBZCCG.mainScene,
                    appendText: "Opponent " + opponent.name + " will skip the next declare phase."
                });

        DBZCCG.turnOwner.declarePhaseEnabled = false;

        opponent.addTurnCallback({
            turn: $('#turnCounterNumber').html(),
            f: function() {
                if ($('#turnCounterNumber').html() !== this.turn) {
                    this.player.declarePhaseEnabled = true;
                }
            },
            life: false,
            priority: 100
        });

    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats", [cardIdx], "removedFromTheGame");

            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.Combat.checkUseWhenNeeded(DBZCCG.Combat.actionATM);
            });

            DBZCCG.performingTurn = false;
            DBZCCG.waitingMainPlayerMouseCommand = false;
        });
    }
};


DBZCCG.Saiyan['193'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Choose up to 2 cards from your discard pile and place them at the bottom of your Life Deck. Remove from the game after use.",
    name: "Respect the Spirit",
    number: '193',
    rarity: DBZCCG.Card.Rarity.Uncommon,
    texturePath: "images/DBZCCG/saiyan/193.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        var card = this;

        if (DBZCCG.performingAction !== DBZCCG.mainPlayer) /* CPU */ {
            for (var k = 0; k < 2; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var cardIdx = [];

                    if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                        cardIdx.push(Math.floor(Math.random() * (DBZCCG.performingAction.discardPile.cards.length - 1)));
                    }

                    DBZCCG.performingAction.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
                });
            }
        } else /* mainPlayer */ {

            for (var k = 0; k < 2; k++) {
                DBZCCG.listActions.splice(0, 0, function() {
                    var card = DBZCCG.Interface.lastSelectedCards.shift();
                    if (card) {
                        DBZCCG.performingAction.transferCards('discardPile', [DBZCCG.performingAction.discardPile.cards.indexOf(card)], 'lifeDeck', 0);
                    }
                });
            }

            DBZCCG.listActions.splice(0, 0, function() {
                if (DBZCCG.performingAction.discardPile.cards.length > 0) {
                    DBZCCG.waitingMainPlayerMouseCommand = DBZCCG.performingTurn = true;
                    DBZCCG.Interface.browseCardList(DBZCCG.performingAction.discardPile.cards, card.name + ': Pick 2 cards to place at the bottom of your life deck.', DBZCCG.performingAction.discardPile.cards.length > 1 ? 2 : 1);
                }
            });
        }

        if (DBZCCG.performingAction === DBZCCG.mainPlayer) {
            // effect happening
            return true;
        }
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.Regenerate]
};

DBZCCG.Saiyan['199'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Ends a combat. Place the bottom card from your discard pile at the bottom of your life deck. Remove from the game after use.",
    name: "Dream Fighting",
    number: '199',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/199.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {

        DBZCCG.listActions.splice(0, 0, function() {
            var cardIdx = [];

            if (DBZCCG.attackingPlayer.discardPile.cards.length > 0) {
                cardIdx.push(0);
            }

            DBZCCG.attackingPlayer.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
        });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.combat = false;
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.Regenerate, DBZCCG.Combat.Effect.EndCombat]
};


DBZCCG.Saiyan['200'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Set your opponent's anger to 0. Remove from the game after use.",
    name: "Cutting the Tail",
    number: '200',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/200.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.setAnger(0);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.LowerAnger]
};

DBZCCG.Saiyan['201'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Raise your active personality to it's highest power stage. Remove from the game after use.",
    name: "The Tail Grows Back",
    number: '201',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/201.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.getPersonalityInControl().moveZScouter("max");
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.StageUp]
};

DBZCCG.Saiyan['203'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Saiyan,
    description: "Ends a combat. Skip your discard phase until your next turn. Limit 1 per deck. Remove from the game after use.",
    name: "Saiyan Truce Card",
    limit: 1,
    number: '203',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/203.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        var card = this;

        DBZCCG.Card.FloatingEffect.create(
                {card: DBZCCG.Saiyan['203'],
                    player: DBZCCG.performingAction,
                    nextTurn: true,
                    scene: DBZCCG.mainScene,
                    appendText: "Will skip the discard phase until his next turn"
                });

        DBZCCG.performingAction.discardPhaseEnabled = false;

        DBZCCG.performingAction.addTurnCallback({
            priority: 50,
            f: function() {
                var player = this.player;
                DBZCCG.listActions.push(function() {
                    DBZCCG.Combat.flashCard(card);
                    player.discardPhaseEnabled = true;
                });
            },
            life: false
        });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.combat = false;
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.Regenerate, DBZCCG.Combat.Effect.EndCombat]
};

DBZCCG.Saiyan['204'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Your opponent main personality gains 5 power stages. Draw the top 2 cards of your discard pile. Limit 1 per deck. Remove from the game after use.",
    name: "Battle Pausing",
    limit: 1,
    number: '204',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/204.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {

        if (DBZCCG.attackingPlayer.discardPile.cards.length > 1) {
            DBZCCG.attackingPlayer.drawEffectCard(this, 'discardPile', DBZCCG.attackingPlayer.discardPile.cards.length - 2);
        }

        if (DBZCCG.attackingPlayer.discardPile.cards.length > 0) {
            DBZCCG.attackingPlayer.drawEffectCard(this, 'discardPile', DBZCCG.attackingPlayer.discardPile.cards.length - 1);
        }

        var card = this;
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.Combat.flashCard(card);
        });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.raiseZScouter(5);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.DrawCard, DBZCCG.Combat.Effect.RaiseStage]
};

DBZCCG.Saiyan['205'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Your opponent's main personality loses 4 stages to a minimum of 0. Remove from the game after use.",
    name: "Grabbing the Tail",
    number: '205',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/205.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.mainPersonality.raiseZScouter(-4);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.StageDown]
};

DBZCCG.Saiyan['206'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Ends a combat. Remove from the game after use.",
    name: "Nappa's Blinding Stare",
    number: '206',
    personality: DBZCCG.Personality.Personalities.NAPPA,
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/206.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.combat = false;
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.EndCombat]
};

DBZCCG.Saiyan['209'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Power up to full. Remove from the game after use.",
    name: "Broken Scouter",
    number: '209',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/209.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.getPersonalityInControl().moveZScouter("max");
        });

    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.attackingPlayer.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.transferCards("nonCombats", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Effect.StageUp]
};

DBZCCG.Saiyan['210'] = {
    type: DBZCCG.Card.Type['Physical Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.RADITZ,
    description: "Physical attack doing triple physical attack table damage.",
    name: "Raditz Flying Kick",
    number: '210',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/210.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Physical;

    },
    damage: function() {
        return DBZCCG.Combat.attack(true, function(damage) {
            damage.stages *= 3;
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

DBZCCG.Saiyan['212'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops a physical or energy attack.",
    name: "Piccolo's Flight",
    number: '212',
    personality: DBZCCG.Personality.Personalities.PICCOLO,
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/212.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: function(player) {
        return DBZCCG.currentCard &&
                (DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy ||
                        DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical) &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        this.targetCard.success = false;
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("nonCombats", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Omni, DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Defense.Energy]
};

DBZCCG.Saiyan['216'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.KRILLIN,
    description: "Energy attack. Costs 1 power stage to perform.",
    rarity: DBZCCG.Card.Rarity.Rare,
    name: "Krillin's Energy Disk",
    number: '216',
    texturePath: "images/DBZCCG/saiyan/216.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    cost: function() {
        return {powerStage: 1};
    },
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;

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
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['219'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.RADITZ,
    description: "Energy attack doing 2 life cards. Costs 0 power stages to perform.",
    rarity: DBZCCG.Card.Rarity.Rare,
    name: "Raditz Energy Burst",
    number: '219',
    texturePath: "images/DBZCCG/saiyan/219.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;
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
            DBZCCG.attackingPlayer.transferCards("inPlay", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['220'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Takes a maximum of 1 life card of damage from an energy attack. Remove from the game after use.",
    name: "Vegeta's Stance",
    personality: DBZCCG.Personality.Personalities.VEGETA,
    number: '220',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/220.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy &&
                DBZCCG.Combat.defaultDefenderCheck(player, this);
    },
    effect: function() {
        DBZCCG.defendingPlayer.addBeforeDamageCallback({
            priority: 50,
            f: function(powerStages, lifeCards) {
                var ret;
                if (DBZCCG.phaseCounter === this.phase && $('#turnCounterNumber').html() === this.turn) {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: 1
                    };
                } else {
                    ret = {
                        powerStages: powerStages,
                        lifeCards: lifeCards
                    };
                }
                return ret;
            },
            life: false,
            turn: $('#turnCounterNumber').html(),
            phase: DBZCCG.phaseCounter
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.defendingPlayer.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.defendingPlayer.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Defense.Prevention]
};

DBZCCG.Saiyan['226'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Defense Shield: Stops the first unstopped physical or energy attack made against you. Remove from the game after use.",
    name: "T-Rex Defense",
    number: '226',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/226.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    defenseShield: function(player) {
        return DBZCCG.openCard && DBZCCG.openCard.effectType instanceof Array
                && (DBZCCG.openCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 ||
                DBZCCG.openCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1)
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
    effectType: [DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Defense.Omni, DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Defense.DefenseShield]
};

DBZCCG.Saiyan['240'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Reveal the top cards on your opponent's Life Deck until you find a Dragon Ball. Set the Dragon Ball aside. Shuffle your opponent's Life Deck. Place the Dragon Ball at the bottom of your opponent's Life Deck. Limit 1 per deck.",
    name: "Vegeta's Trick",
    number: '240',
    rarity: DBZCCG.Card.Rarity.Rare,
    texturePath: "images/DBZCCG/saiyan/240.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {

        var opponent;

        for (var i = 0; i < DBZCCG.table.players.length && !opponent; i++) {
            if (DBZCCG.performingAction !== DBZCCG.table.players[i]) {
                opponent = DBZCCG.table.players[i];
            }
        }

        DBZCCG.listActions.splice(0, 0, function() {
            opponent.canLose = true;
        });

        var lifeDeckCards = [];
        var oLifeDeck = opponent.lifeDeck.cards;

        var j = 0;
        var idx = [];
        var dragonballFound = false;
        var dragonball = null;

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAnimation = true;
            opponent.lifeDeck.shuffle();
            if (dragonball) {
                DBZCCG.listActions.splice(0, 0, function() {
                    opponent.transferCards('setAside', [opponent.setAside.getCardIdx(dragonball.display)], 'lifeDeck', 0);
                });
            }
        });

        DBZCCG.listActions.splice(0, 0, function() {
            if (dragonballFound) {
                dragonball = lifeDeckCards.pop();
            }

            var idx;
            for (var i = lifeDeckCards.length - 1; i >= 0; i--) {
                idx = opponent.setAside.getCardIdx(lifeDeckCards[i].display);
                DBZCCG.listActions.splice(0, 0, function() {
                    DBZCCG.performingTurn = true;
                    opponent.transferCards('setAside', [idx], 'lifeDeck');
                    window.setTimeout(function() {
                        DBZCCG.performingTurn = false;
                    }, 175);
                });
            }
        });

        for (var i = oLifeDeck.length - 1; i >= 0 && !dragonballFound; i--) {
            if (ClassHelper.checkValue(oLifeDeck[i].type, DBZCCG.Card.Type.Dragonball)) {
                dragonballFound = true;
            }

            lifeDeckCards.push(oLifeDeck[i]);
            idx.push(i);

            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.Combat.flashCard(lifeDeckCards[j]);
                j++;
            });

            DBZCCG.listActions.splice(0, 0, function() {
                opponent.transferCards('lifeDeck', [idx[j]], 'setAside');
            });
        }

        DBZCCG.listActions.splice(0, 0, function() {
            opponent.canLose = false;
        });

    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Effect.ShufflePile]
};

DBZCCG.Saiyan['247'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops a physical or energy attack.",
    name: "Goku's Truce",
    number: '247',
    personality: DBZCCG.Personality.Personalities.GOKU,
    rarity: DBZCCG.Card.Rarity['Ultra Rare'],
    texturePath: "images/DBZCCG/saiyan/247.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: function(player) {
        return DBZCCG.currentCard &&
                (DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Energy ||
                        DBZCCG.Combat.attackType === DBZCCG.Combat.Attack.Physical) &&
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
    effectType: [DBZCCG.Combat.Defense.Omni, DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Defense.Energy]
};

DBZCCG.Saiyan['248'] = {
    type: DBZCCG.Card.Type['Energy Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    personality: DBZCCG.Personality.Personalities.RADITZ,
    description: "Energy attack doing 5 life cards. Costs 0 power stages to perform.",
    rarity: DBZCCG.Card.Rarity['Ultra Rare'],
    name: "Goku's Plan",
    number: '248',
    texturePath: "images/DBZCCG/saiyan/248.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        this.success = true;
        this.targetCard = DBZCCG.defendingPlayer.getPersonalityInControl();
        DBZCCG.Combat.attackType = DBZCCG.Combat.Attack.Energy;
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
    effectType: [DBZCCG.Combat.Attack.Energy]
};

DBZCCG.Saiyan['249'] = {
    type: DBZCCG.Card.Type['Non-Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Heroes only. Place the top 3 cards from your discard pile on the bottom of your Life Deck. Limit 1 per deck.",
    name: "Medic Kit",
    number: '249',
    rarity: DBZCCG.Card.Rarity['Ultra Rare'],
    texturePath: "images/DBZCCG/saiyan/249.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    playable: DBZCCG.Combat.defaultNonCombatCheck,
    activable: function(player) {
        return DBZCCG.performingAction.getPersonalityInControl() && ClassHelper.checkValue(DBZCCG.performingAction.mainPersonality.alignment,
                DBZCCG.Personality.alignment.Hero) && DBZCCG.Combat.defaultAttackerCheck(player, this);
    },
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

            if (DBZCCG.attackingPlayer.discardPile.cards.length > 2) {
                cardIdx.push(DBZCCG.attackingPlayer.discardPile.cards.length - 3);
            }

            DBZCCG.attackingPlayer.transferCards('discardPile', cardIdx, 'lifeDeck', 0);
        });
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.nonCombats.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("nonCombats", [cardIdx], "discardPile");
        });
    },
    effectType: [DBZCCG.Combat.Effect.Regenerate, DBZCCG.Combat.Effect.HeroOnly]
};

DBZCCG.Saiyan['250'] = {
    type: DBZCCG.Card.Type['Combat'],
    style: DBZCCG.Card.Style.Freestyle,
    description: "Stops all heroes from losing 1 life card of damage from every attack for the remainder of Combat. Remove from the game after use.",
    name: "Chiaotzu's Physical Defense",
    number: '250',
    rarity: DBZCCG.Card.Rarity['Ultra Rare'],
    texturePath: "images/DBZCCG/saiyan/250.jpg",
    saga: DBZCCG.Card.Saga.Saiyan,
    activable: DBZCCG.Combat.defaultAttackerCheck,
    effect: function() {
        for (var i = 0; i < DBZCCG.table.players.length; i++) {
            var player = DBZCCG.table.players[i];
            if (ClassHelper.checkValue(player.mainPersonality.alignment,
                    DBZCCG.Personality.alignment.Hero)) {

                DBZCCG.Card.FloatingEffect.create(
                        {card: DBZCCG.Saiyan['250'],
                            player: player,
                            scene: DBZCCG.mainScene,
                            combat: true,
                            appendText: "All damage is being reduced by 1 life card."
                        });

                player.addBeforeDamageCallback({
                    priority: 50,
                    f: function(powerStages, lifeCards) {
                        var ret;
                        if ($('#turnCounterNumber').html() === this.turn) {
                            ret = {
                                powerStages: powerStages,
                                lifeCards: lifeCards > 0 ? lifeCards - 1 : lifeCards
                            };
                        } else {
                            ret = {
                                powerStages: powerStages,
                                lifeCards: lifeCards
                            };
                            this.life = false;
                        }

                        return ret;
                    },
                    life: true,
                    turn: $('#turnCounterNumber').html()
                });
            }
        }
    },
    postEffect: function(card) {
        var cardIdx = DBZCCG.performingAction.inPlay.getCardIdx(card.display);
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction.transferCards("inPlay", [cardIdx], "removedFromTheGame");
        });
    },
    effectType: [DBZCCG.Combat.Defense.Physical, DBZCCG.Combat.Defense.Energy, DBZCCG.Combat.Defense.Prevention]
};