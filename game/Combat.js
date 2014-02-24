DBZCCG.Combat = {};

DBZCCG.Combat.effectHappening = false;
DBZCCG.Combat.selectionArrow = null;

// Effect types
DBZCCG.Combat.Attack = {};
DBZCCG.Combat.Attack.Physical = 0;
DBZCCG.Combat.Attack.Energy = 1;

DBZCCG.Combat.Defense = {};
DBZCCG.Combat.Defense.Physical = 2;
DBZCCG.Combat.Defense.Energy = 3;

DBZCCG.Combat.Effect = {};
DBZCCG.Combat.Effect.Floating = 4;
DBZCCG.Combat.Effect.LowerAnger = 5;
DBZCCG.Combat.Effect.RaiseAnger = 6;
DBZCCG.Combat.Effect.StageUp = 7;
DBZCCG.Combat.Effect.StageDown = 8;
DBZCCG.Combat.Effect.DrawCard = 9;
DBZCCG.Combat.Effect.DiscardCard = 10;

DBZCCG.Combat.Target = {};
DBZCCG.Combat.Target.Self = 11;
DBZCCG.Combat.Target.Enemy = 12;

DBZCCG.Combat.Effect.StageSet = 13;

DBZCCG.Combat.Target.Multiple = 14;
DBZCCG.Combat.Target.Single = 15;

DBZCCG.Combat.Defense.DefenseShield = 16;
DBZCCG.Combat.Defense.Prevention = 17;

DBZCCG.Combat.Effect.StrainingMove = 18;

DBZCCG.Combat.Effect.Regenerate = 19;

DBZCCG.Combat.Effect.CaptureDragonball = 20;

DBZCCG.Combat.Effect.EndCombat = 21;

// End of effect types

DBZCCG.Combat.inUsePAT = DBZCCG.Card.Saga.Saiyan;

DBZCCG.Combat.flashCard = function(card) {
    if (card.display.children[0].material.materials[5].map && card.display.children[0].material.materials[5].map.sourceFile) {
        var content = '<img src ="' + card.display.children[0].material.materials[5].map.sourceFile + '" />';
        DBZCCG.Combat.flashContent(content, 'flash-card');
    }
};

DBZCCG.Combat.checkCosts = function(card) {
    var ret = true;
    if (card.cost instanceof Function) {
        var cost = card.cost();
        if (cost.powerStage && DBZCCG.performingAction.getPersonalityInControl().currentPowerStageAboveZero < cost.powerStage) {
            ret = false;
        }

        if (cost.lifeCard && DBZCCG.performingAction.lifeDeck.cards.length < cost.lifeCard) {
            ret = false;
        }

        if (cost.handCard) {
            var inHand = 0;
            if (DBZCCG.performingAction.hand.getCardIdx(card.display) !== -1) {
                inHand = 1;
            }

            if (DBZCCG.performingAction.hand.cards.length < (cost.handCard + inHand)) {
                ret = false;
            }
        }
    }
    return ret;
};

DBZCCG.Combat.payCosts = function(card) {
    if (card.cost instanceof Function /* || globalCostModifier */) {
        var cost = card.cost();
        DBZCCG.listActions.splice(0, 0, function() {
            if (cost.powerStage) {
                DBZCCG.performingAction.getPersonalityInControl().raiseZScouter(-cost.powerStage, true, true);
            }

            if (cost.lifeCard) {
                DBZCCG.Combat.hoverText('-' + cost.lifeCard, DBZCCG.performingAction.lifeDeck.display, 0xFF0000);

                var cardIdx = [];
                for (var i = DBZCCG.performingAction.lifeDeck.cards.length - 1, j = 0; i >= 0 && j < cost.lifeCard; i--, j++) {
                    cardIdx.push(i);
                }

                DBZCCG.performingAction.transferCards('lifeDeck', cardIdx, 'discardPile');
            }

            if (cost.handCard) {
                if (DBZCCG.mainPlayer === DBZCCG.performingAction) {
                    var discardCounter = 0;
                    DBZCCG.performingTurn = true;
                    DBZCCG.waitingMainPlayerMouseCommand = true;
                    DBZCCG.confirmDialog(
                            card.name,
                            'Discard ' + cost.handCard + ' card' + (cost.handCard > 1 ? 's' : '') + ' from your hand in order to perform the action.',
                            null,
                            {
                                "OK": function() {
                                    $(this).dialog('close');
                                    DBZCCG.Combat.effectHappening = true;
                                    var player = DBZCCG.performingAction;
                                    var discardCallback = {
                                        priority: Infinity,
                                        life: false,
                                        f: function() {
                                            DBZCCG.toolTip.idxHand = player.hand.getCardIdx(DBZCCG.toolTip.parent);

                                            $('#hud').qtip('hide');

                                            discardCounter++;

                                            player.transferCards("hand", [DBZCCG.toolTip.idxHand], "discardPile");

                                            DBZCCG.toolTip.parent.removeCallback(discardCallback);

                                            DBZCCG.clearMouseOver();

                                            if (discardCounter === cost.handCard) {
                                                DBZCCG.waitingMainPlayerMouseCommand = false;

                                                for (var i = 0; i < player.hand.cards.length; i++) {
                                                    player.hand.cards[i].display.removeCallback(discardCallback);
                                                }

                                                DBZCCG.Combat.effectHappening = false;
                                                DBZCCG.performingTurn = false;
                                            }
                                        }
                                    };

                                    for (var i = 0; i < player.hand.cards.length; i++) {
                                        DBZCCG.Combat.addSelectionParticle(player.hand.cards[i].display, 0.3);
                                        player.hand.cards[i].display.addCallback(discardCallback);
                                    }
                                }
                            });

                } else /* AI */ {
                    var cardIdx = [];
                    for (var i = DBZCCG.performingAction.hand.cards.length - 1, j = 0; i >= 0 && j < cost.handCard; i--, j++) {
                        cardIdx.push(i);
                    }
                    DBZCCG.performingAction.transferCards("hand", cardIdx, "discardPile");
                }
            }
        });
    }
};

DBZCCG.Combat.personalityPowerDefaultAttackCheck = function(player, card) {
    var turn = parseInt($('#turnCounterNumber')[0].innerHTML);
    var ret = false;
    var effectCard = card || this;
    if (effectCard.turn !== turn) {
        ret = DBZCCG.Combat.defaultAttackerCheck(player, effectCard);
    }
    return ret;
};

DBZCCG.Combat.personalityPowerDefaultDefenseCheck = function(player, card) {
    var turn = parseInt($('#turnCounterNumber')[0].innerHTML);
    var ret = false;
    var effectCard = card || this;
    if (effectCard.turn !== turn) {
        ret = DBZCCG.Combat.defaultDefenderCheck(player, effectCard);
    }
    return ret;
};

DBZCCG.Combat.defaultDragonballCheck = function(player) {
    var db = this;
    var result = DBZCCG.Combat.defaultNonCombatCheck(player);
    if (result) {
        result = !DBZCCG.Dragonball.checkInPlay(db);
    }
    return result;
};

DBZCCG.Combat.defaultNonCombatCheck = function(player) {
    var result = false;

    if (player === DBZCCG.performingAction && !DBZCCG.Combat.effectHappening &&
            $('.selectedTurn')[0].id === 'noncombat-phase' && DBZCCG.Combat.checkCosts(this)
            && player.nonCombats.getCardIdx(this.display) === -1) {
        result = true;
        $(DBZCCG.toolTip.content).children('#tooltipEffect').show();
    }
    return result;
};

DBZCCG.Combat.checkInPlay = function(player, card) {
    var ret = true;
    if (card.type === DBZCCG.Card.Type['Non-Combat']) {
        ret = player.nonCombats.getCardIdx(card.display) === -1 ? false : true;
    }
    return ret;
};

DBZCCG.Combat.multipleActivation = function(player, card) {
    var checkCard = card || this;
    var result = false;
    for (var i = 0; i < checkCard.activators.length && !result; i++) {
        result = checkCard.activators[i](player, checkCard);
    }
    return result;
};

DBZCCG.Combat.defaultAttackerCheck = function(player, card) {
    var result = false;
    var checkCard = card || this;
    if (player.checkActivation(checkCard) && DBZCCG.combat && player === DBZCCG.performingAction && player === DBZCCG.attackingPlayer && !DBZCCG.Combat.effectHappening &&
            !DBZCCG.displayingText && DBZCCG.Combat.checkCosts(checkCard) && DBZCCG.Combat.checkInPlay(player, checkCard)) {
        result = true;
        $(DBZCCG.toolTip.content).children('#tooltipEffect').show();
    }
    return result;
};

DBZCCG.Combat.defaultDefenderCheck = function(player, card) {
    var result = false;
    var checkCard = card || this;
    if (player.checkActivation(checkCard) && DBZCCG.combat && player === DBZCCG.performingAction && player === DBZCCG.defendingPlayer && !DBZCCG.Combat.effectHappening &&
            !DBZCCG.displayingText && DBZCCG.Combat.checkCosts(checkCard) && DBZCCG.Combat.checkInPlay(player, checkCard)) {
        result = true;
        $(DBZCCG.toolTip.content).children('#tooltipEffect').show();
    }
    return result;
};

DBZCCG.Combat.PAT = {};

DBZCCG.Combat.PAT[DBZCCG.Card.Saga.Saiyan] = {
    cardImage: 'images/DBZCCG/saiyan_pat.jpg',
    calcDamage: function(sourcePowerLevel, destinationPowerLevel) {
        function getDamage(power) {
            var ret;

            power = parseInt(power);
            if (power === 0) {
                ret = 1;
            } else if (power > 0 && power <= 500) {
                ret = 2;
            } else if (power > 500 && power <= 900) {
                ret = 3;
            } else if (power > 900 && power <= 2900) {
                ret = 4;
            } else if (power > 2900 && power <= 9900) {
                ret = 5;
            } else if (power > 9900 && power <= 14900) {
                ret = 6;
            } else if (power > 14900 && power <= 24900) {
                ret = 7;
            } else {
                ret = 8;
            }

            return ret;
        }

        var result = getDamage(sourcePowerLevel) - getDamage(destinationPowerLevel) + 1;

        return result < 0 ? 0 : result;
    }
};

DBZCCG.Combat.attack = function(table, tableModifier, sourcePowerLevel, destinationPowerLevel) {
    var totalDamage = {cards: 0, stages: 0};
    if (table) {
        totalDamage.stages = DBZCCG.Combat.PAT[DBZCCG.Combat.inUsePAT].calcDamage(sourcePowerLevel, destinationPowerLevel);
    }

    if (tableModifier instanceof Function) {
        totalDamage = tableModifier(totalDamage);
    }

    return totalDamage;
};

DBZCCG.Combat.targetGroup = function(card) {
    switch (card.type) {
        case DBZCCG.Card.Type['Non-Combat']:
            return 'nonCombats';
        case DBZCCG.Card.Type['Dragonball']:
            return 'dragonballs';
    }
};

DBZCCG.Combat.setCardSource = function(display) {
    // Need to check where the card is
    var idxHand = DBZCCG.performingAction.hand.getCardIdx(display);
    if (idxHand === -1) {
        var idxNonCombat = DBZCCG.performingAction.nonCombats.getCardIdx(display);
        if (idxNonCombat === -1) {
            var idxDrills = DBZCCG.performingAction.drills.getCardIdx(display);
            if (idxDrills === -1) {
                var idxDragonballs = DBZCCG.performingAction.dragonballs.getCardIdx(display);
                if (idxDragonballs === -1) {
                    var idxInPlay = DBZCCG.performingAction.inPlay.getCardIdx(display);
                    if (idxInPlay === -1) {
                        var idxSetAside = DBZCCG.performingAction.setAside.getCardIdx(display);
                        if (idxSetAside === -1) {
                            var idxField = DBZCCG.performingAction.fieldCards.getCardIdx(display);
                            if (idxField !== -1) {
                                DBZCCG.toolTip.idxCard = idxField;
                                DBZCCG.toolTip.cardSource = 'fieldCards';
                            } else {
                                var idxFloatingEffect = DBZCCG.performingAction.floatingEffects.getCardIdx(display);
                                if (idxFloatingEffect === -1) {
                                    DBZCCG.toolTip.idxCard = undefined;
                                    DBZCCG.toolTip.cardSource = undefined;
                                } else {
                                    DBZCCG.toolTip.idxCard = idxFloatingEffect;
                                    DBZCCG.toolTip.cardSource = 'floatingEffects';
                                }
                            }
                        } else {
                            DBZCCG.toolTip.idxCard = idxSetAside;
                            DBZCCG.toolTip.cardSource = 'setAside';
                        }
                    } else {
                        DBZCCG.toolTip.idxCard = idxInPlay;
                        DBZCCG.toolTip.cardSource = 'inPlay';
                    }
                } else {
                    DBZCCG.toolTip.idxCard = idxDragonballs;
                    DBZCCG.toolTip.cardSource = 'dragonballs';
                }
            } else {
                DBZCCG.toolTip.idxCard = idxDrills;
                DBZCCG.toolTip.cardSource = 'drills';
            }
        } else {
            DBZCCG.toolTip.idxCard = idxNonCombat;
            DBZCCG.toolTip.cardSource = 'nonCombats';
        }
    } else {
        DBZCCG.toolTip.idxCard = idxHand;
        DBZCCG.toolTip.cardSource = 'hand';
    }
};

DBZCCG.Combat.checkDragonballControl = function(player) {
    var players = DBZCCG.table.players;
    var dragonballs = [];

    for (var j = 0; j < players.length; j++) {
        for (var i = 0; i < players[j].dragonballs.cards.length; i++) {
            if (players[j].dragonballs.cards[i].control === player) {
                dragonballs.push(players[j].dragonballs.cards[i]);
            }
        }
    }

    return dragonballs;
};

(function() {

    function createEffectPlayedCard(clicked, AI) {
        DBZCCG.Combat.removeSelectionParticles();

        DBZCCG.performingAction.transferCards(
                DBZCCG.toolTip.cardSource,
                [DBZCCG.toolTip.idxCard],
                DBZCCG.Combat.targetGroup(clicked),
                null,
                null,
                true);

        if ((((clicked.type instanceof Array && clicked.type.indexOf(DBZCCG.Card.Type.Dragonball) !== -1) ||
                clicked.type === DBZCCG.Card.Type.Dragonball) && !(clicked.activable instanceof Function)) ||
                clicked.activable === true) {
            var performingTurn = DBZCCG.performingTurn;
            var mouseCommand = DBZCCG.waitingMainPlayerMouseCommand;

            if (mouseCommand === true) {
                DBZCCG.waitingMainPlayerMouseCommand = false;
            }

            var passVisible = $('#pass-btn').is(':visible');

            if (passVisible) {
                $('#pass-btn').hide();
            }

            DBZCCG.effectHappening = true;

            DBZCCG.listActions.splice(0, 0, function() {

                DBZCCG.listActions.splice(0, 0, function() {
                    DBZCCG.performingTurn = performingTurn;
                    DBZCCG.effectHappening = false;
                    DBZCCG.waitingMainPlayerMouseCommand = mouseCommand;

                    if (passVisible) {
                        $('#pass-btn').show();
                    }

                    if (DBZCCG.mainPlayer === DBZCCG.performingAction && DBZCCG.mainPlayer.usableCards.length === 0) {
                        window.setTimeout(function() {
                            DBZCCG.performingAction.passDialog();
                        }, 250);
                    }
                });

                if (DBZCCG.performingAction === DBZCCG.mainPlayer) {
                    DBZCCG.listActions.splice(0, 0, function() {
                        DBZCCG.performingAction.clearUsableCards();
                        DBZCCG.performingAction.checkUsableCards();
                        for (var i = 0; i < DBZCCG.performingAction.usableCards.length; i++) {
                            DBZCCG.Combat.addSelectionParticle(DBZCCG.performingAction.usableCards[i], 0.3);
                        }
                    });
                }

                if (clicked.activable === true && clicked.postEffect instanceof Function) {
                    DBZCCG.listActions.splice(0, 0, function() {
                        clicked.postEffect();
                    });
                }

                if (((clicked.type instanceof Array && clicked.type.indexOf(DBZCCG.Card.Type.Dragonball) !== -1) ||
                        clicked.type === DBZCCG.Card.Type.Dragonball) && !(clicked.activable instanceof Function)) {
                    clicked.control = DBZCCG.performingAction;
                }

                clicked.effect();
            });

            DBZCCG.performingTurn = false;

        } else {
            clicked.display.addCallback(DBZCCG.Combat.activateEffectCallback);
            DBZCCG.performingAction.clearUsableCards();
            DBZCCG.performingAction.checkUsableCards();
            if (DBZCCG.performingAction === DBZCCG.mainPlayer) {
                for (var i = 0; i < DBZCCG.performingAction.usableCards.length; i++) {
                    DBZCCG.Combat.addSelectionParticle(DBZCCG.performingAction.usableCards[i], 0.3);
                }
            }

            if (DBZCCG.mainPlayer === DBZCCG.performingAction && DBZCCG.mainPlayer.usableCards.length === 0) {
                window.setTimeout(function() {
                    DBZCCG.performingAction.passDialog();
                }, 250);
            }
        }
    }

    DBZCCG.Combat.placeCardInField = {
        f: function() {
            var clicked = DBZCCG.toolTip.parent.parentCard;

            if (clicked.playable(DBZCCG.performingAction)) {
                DBZCCG.currentCard = clicked;
                DBZCCG.Combat.setCardSource(clicked.display);

                $('#hud').qtip('hide');

                createEffectPlayedCard(clicked);

                return DBZCCG.cancelAction;
            }

        }, priority: 500000
    };

    function executeEffect(clicked) {
        DBZCCG.Combat.removeSelectionParticles();

        DBZCCG.Combat.effectHappening = true;

        if (!DBZCCG.currentCard) {
            DBZCCG.openCard = DBZCCG.currentCard = clicked;
        } else {
            clicked.targetCard = DBZCCG.currentCard;
            DBZCCG.currentCard = clicked;
        }

        var performerPlayer = DBZCCG.performingAction;

        // Finish the action
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction = performerPlayer;

            if (clicked.postEffect instanceof Function) {
                clicked.postEffect(clicked);
            }

            // clear particles
            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.Combat.removeAllSelectionArrows();
                DBZCCG.Combat.removeSelectionParticles();
            });
        });

        // Invoke defender's turn, if possible
        if (DBZCCG.performingAction === DBZCCG.attackingPlayer &&
                (ClassHelper.checkValue(clicked.effectType, DBZCCG.Combat.Attack.Physical) ||
                        ClassHelper.checkValue(clicked.effectType, DBZCCG.Combat.Attack.Energy))) {
            DBZCCG.Combat.setDefenderTurn(DBZCCG.defendingPlayer);
        }

        // Card effect
        DBZCCG.listActions.splice(0, 0, function() {
            var effectHappening = clicked.effect() || false;

            if (clicked.targetCard && clicked.targetCard.display === DBZCCG.defendingPlayer.getPersonalityInControl().display) {
                DBZCCG.Combat.selectionArrow(DBZCCG.attackingPlayer.getPersonalityInControl().display,
                        DBZCCG.defendingPlayer.getPersonalityInControl().display);
            }

            DBZCCG.Combat.effectHappening = effectHappening;
        });

        DBZCCG.Combat.payCosts(clicked);

        // Display the card image
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.Combat.flashCard(clicked);
        });

        // Play the card
        DBZCCG.listActions.splice(0, 0, function() {

            DBZCCG.Combat.addSelectionParticle(clicked.display);

            if (DBZCCG.toolTip.idxCard !== undefined && DBZCCG.performingAction !== undefined) {

                if (DBZCCG.toolTip.cardSource === 'hand') {
                    DBZCCG.performingAction.transferCards("hand", [DBZCCG.toolTip.idxCard], "inPlay", null, null, true);
                }

                DBZCCG.toolTip.idxCard = undefined;
            }

        });

        DBZCCG.performingTurn = false;
    }

    DBZCCG.Combat.activateEffectAI = function(display) {
        var clicked = display.parentCard;

        if (clicked.playable instanceof Function && clicked.playable(DBZCCG.performingAction)) {
            DBZCCG.currentCard = clicked;

            DBZCCG.Combat.setCardSource(clicked.display);

            createEffectPlayedCard(clicked, true);

        } else if (clicked.activable instanceof Function && clicked.activable(DBZCCG.performingAction)) {
            DBZCCG.Combat.setCardSource(clicked.display);

            executeEffect(clicked);
        }
    };

    DBZCCG.Combat.activateEffectCallback = {f: function() {
            var clicked = DBZCCG.toolTip.parent.parentCard;

            if (clicked.activable instanceof Function && clicked.activable(DBZCCG.performingAction)) {

                DBZCCG.Combat.setCardSource(clicked.display);

                if (DBZCCG.combat) {
                    DBZCCG.waitingMainPlayerMouseCommand = false;
                    if (DBZCCG.performingAction === DBZCCG.attackingPlayer) {
                        DBZCCG.performingAction.passed = false;
                    }
                }

                DBZCCG.hideCombatIcons();
                DBZCCG.clearMouseOver();

                executeEffect(clicked);
            }
        },
        priority: 50000
    };

}());

DBZCCG.Combat.setDefenderTurn = function(player) {
    DBZCCG.listActions.splice(0, 0, function() {
        DBZCCG.performingTurn = true;

        var attackCard = DBZCCG.currentCard;

        // run post attack callbacks
        var damage = {};

        var argsFunction = function(callback) {
            return callback.f(damage);
        };

        var solveFunction = function(ret) {
        };

        DBZCCG.listActions.splice(0, 0, function() {
            if (attackCard.success && attackCard.successfulEffect instanceof Function) {
                attackCard.successfulEffect(player);
            }
        });

        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.attackingPlayer.solvePostAttackCallback(argsFunction, solveFunction);
            DBZCCG.defendingPlayer.solvePostDefenseCallback(argsFunction, solveFunction);
        });

        player.defenderDefends(attackCard);

        DBZCCG.performingTurn = false;
    });
};

(function selectionParticles() {
    var geo = new THREE.Geometry();

    //old circular selection particles
//    for (var z = -DBZCCG.Card.cardWidth / 2; z < DBZCCG.Card.cardWidth / 2; z = z + 0.01) {
//        var x = Math.pow(Math.pow(DBZCCG.Card.cardWidth / 2, 2) - Math.pow(z, 2), 0.5);
//        var particle = new THREE.Vector3(x, 0.6, z);
//        particle.basePos = particle.clone();
//        geo.vertices.push(particle);
//        particle = new THREE.Vector3(-x, 0.6, z);
//        particle.basePos = particle.clone();
//        geo.vertices.push(particle);
//    }

    // new square selection particles
    var y = DBZCCG.Card.cardHeight / 2;
    var x = DBZCCG.Card.cardWidth / 2;

    var particleIncrement = 0.12;

    for (var i = -y; i < y; i = i + particleIncrement) {
        var particle = new THREE.Vector3(-x, 0, i);
        geo.vertices.push(particle);
    }

    for (var j = -x; j < x; j = j + particleIncrement) {
        var particle = new THREE.Vector3(j, 0, y);
        geo.vertices.push(particle);
    }

    for (var i = y - 0.1; i >= -y; i = i - particleIncrement) {
        var particle = new THREE.Vector3(x, 0, i);
        geo.vertices.push(particle);
    }

    for (var j = x - 0.1; j >= -x; j = j - particleIncrement) {
        var particle = new THREE.Vector3(j, 0, -y);
        geo.vertices.push(particle);
    }

    var colors = [];
    var particleCount = geo.vertices.length;
    for (var i = 0; i < particleCount; i++) {
        colors[i] = new THREE.Color();
        colors[i].setHSL((-i * 2 / 4000) + 0.62, 1.0, 0.5);
    }

    geo.colors = colors;

    // Later: Add custom shaders
    function selectionParticles() {
        this.element = new THREE.ParticleSystem(geo, new THREE.ParticleSystemMaterial({
            size: 1,
            map: THREE.ImageUtils.loadTexture("images/gfx/particles/particleTexture.png"),
            depthTest: false,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            sortParticles: true
        }));

        this.element.rotation.x = -Math.PI / 2;
        this.element.position.z = -0.3;
        this.baseColor = 0.62;
        this.element.scale.multiplyScalar(0.95);
        this.element.scale.x = 0.9;
        this.icr = 1;
    }

    selectionParticles.prototype.update = function() {
        var pCount = geo.vertices.length;

        this.element.material.size = 1 + Math.sin(DBZCCG.clock.elapsedTime * 4) / 4;
        var total = pCount;
        var position;

        while (pCount--) {
            position = (pCount + this.icr) % total;
            // get the particle
            var particle = geo.vertices[pCount];

            geo.colors[position].setHSL((-pCount * 2 / 4000) + this.baseColor, 1.0, 0.35 + Math.sin(DBZCCG.clock.elapsedTime) / 8);

            //var icrVector = new THREE.Vector3(Math.cos(pCount) * 0.2, 0.6 + Math.sin(DBZCCG.clock.elapsedTime) * 0.15, Math.cos(pCount) * 0.2);
            //particle.copy(particle.basePos.clone().multiplyScalar(Math.abs(Math.cos(DBZCCG.clock.elapsedTime)) * 1.5 + 0.5).add(icrVector));

            //particle.y += Math.sin(Math.random());
        }

        this.icr = (this.icr + 2) % total;
        geo.colorsNeedUpdate = true;
        geo.__dirtyVertices = true;
    };

    DBZCCG.Combat.selectionParticles = selectionParticles;

    DBZCCG.Combat.selectionParticles.update = function() {
        for (var i = 0; i < selections.length; i++) {
            selections[i].update();
        }
    };

    var selections = [];

    DBZCCG.Combat.addSelectionParticle = function(display, baseColor) {
        var selection = new DBZCCG.Combat.selectionParticles();
        selection.baseColor = baseColor || 0.62;
        selections.push(selection);
        display.add(selection.element);
    };

    DBZCCG.Combat.removeSelectionParticles = function() {
        for (var i = 0; i < selections.length; i++) {
            selections[i].element.parent.remove(selections[i].element);
            delete selections[i];
        }
        delete selections;
        selections = [];
    };

})();

(function loadArrow() {

    var selectionArrows = [];

    DBZCCG.Combat.updateSelectionArrows = function() {
        for (var i = 0; i < selectionArrows.length; i++) {
            selectionArrows[i].update();
        }
    };

    DBZCCG.Combat.removeAllSelectionArrows = function() {
        for (var i = 0; i < selectionArrows.length; i++) {
            DBZCCG.mainScene.remove(selectionArrows[i]);
            delete selectionArrows[i];
        }
        delete selectionArrows;
        selectionArrows = [];
    };

    DBZCCG.Combat.selectionArrow = function(sourceObj, targetObj) {
        var geo = new THREE.Geometry();
        var source, target;

        if (sourceObj.parent instanceof THREE.Object3D) {
            source = sourceObj.parent.localToWorld(sourceObj.position.clone());
        } else {
            source = sourceObj.position;
        }

        if (targetObj.parent instanceof THREE.Object3D) {
            target = targetObj.parent.localToWorld(targetObj.position.clone());
        } else {
            target = targetObj.position;
        }


        var diffVector = new THREE.Vector3().addVectors(target.clone(), source.clone().multiplyScalar(-1));

        var totalVertices = Math.floor(Math.abs(diffVector.z) + Math.abs(diffVector.x)) * 5;

        var height = 30;
        var itZ = diffVector.z / totalVertices;
        var itX = diffVector.x / totalVertices;
        var itY = height / totalVertices;

        for (var i = 0; i <= totalVertices; i++) {
            var z = source.z + itZ * i;
            var x = source.x + itX * i;

            var y = i < totalVertices / 2 ? Math.pow(itY * i * 2, 0.5) : Math.pow((height - itY * i) * 2, 0.5);

            var particle = new THREE.Vector3(x, 2 + y, z);
            geo.vertices.push(particle);
        }

        var colors = [];
        var particleCount = geo.vertices.length;
        for (var i = 0; i < particleCount; i++) {
            colors[i] = new THREE.Color();
            colors[i].setHSL((i + 200) / 1000, 1.0, 0.5);
        }

        geo.colors = colors;

        // Later: Add custom shaders
        var selectionArrow = new THREE.ParticleSystem(geo, new THREE.ParticleSystemMaterial({
            size: 2,
            vertexColors: true,
            map: THREE.ImageUtils.loadTexture("images/gfx/particles/particleTexture.png"),
            blending: THREE.AdditiveBlending,
            transparent: true
        }));

        selectionArrow.sortParticles = true;

        var idxArrow = 0;
        selectionArrow.update = function() {
            var icr = Math.abs(Math.sin(DBZCCG.clock.elapsedTime)) * 0.4;
            var hue = (100 / 1000) * icr;
            for (var j = 0; j < geo.colors.length; j++) {
                if (idxArrow !== j) {
                    geo.colors[j].setHSL(hue, 1.0, 0.5);
                } else {
                    geo.colors[j].setHSL(1.0, 1.0, 1.0);
                }
            }

            geo.colorsNeedUpdate = true;
            idxArrow = (idxArrow + 2) % geo.colors.length;
        };

        selectionArrows.push(selectionArrow);

        DBZCCG.mainScene.add(selectionArrow);
    };
})();

DBZCCG.Combat.flashContent = function(content, type) {
    DBZCCG.displayingText = true;
    DBZCCG.performingAnimation = true;

    var id = document.createElement('div');
    document.getElementById('renderer-wrapper').appendChild(id);
    id.id = type || 'flash-content';
    id.innerHTML = content;

    DBZCCG.flash = id;

    $(id).fadeIn(500);

    window.setTimeout(function() {
        $(id).fadeOut(500, function() {
            $(id).remove();
            DBZCCG.performingAnimation = false;
            DBZCCG.displayingText = false;
            DBZCCG.flash = null;
        });
    }, 1000);
};

DBZCCG.Combat.speechBubble = function(text, display) {
    DBZCCG.listActions.splice(0, 0, function() {
        DBZCCG.displayingText = true;
        DBZCCG.typingSpeech = true;
        var p = document.createElement('p');
        document.getElementById('renderer-wrapper').appendChild(p);
        p.id = 'card-speech';

        var vector = DBZCCG.Screen.getWindowCoords(display);
        p.style.left = (((vector.x - p.offsetWidth * 0.2) / window.innerWidth) * 100) + '%';
        p.style.top = (((vector.y - p.offsetHeight * 1.5) / window.innerHeight) * 100) + '%';

        var i = 0;
        $(p).fadeIn(500, function() {

            var intervalText = window.setInterval(function() {
                if (i === text.length) {
                    window.clearInterval(intervalText);
                    window.setTimeout(function() {
                        $(p).fadeOut(500, function() {
                            $(p).remove();
                            DBZCCG.displayingText = false;
                        });
                    }, 1500);
                    DBZCCG.typingSpeech = false;
                } else {
                    p.innerHTML += text.charAt(i);
                    i++;
                }

            }, 15);
        });
    });
};

DBZCCG.Combat.setMouseOverCallback = function(display) {
    display.mouseOver = function() {
        if (!$('.qtip').is(':visible')) {
            DBZCCG.toolTip.customContent = this.displayHoverText();

            $('#hud').qtip('option', {'position.adjust.y': -30});
            $('#hud').qtip('option', {'position.adjust.mouse': true});

            if (display.parentCard) {
                if (display.children[0].material.materials[5].map && display.children[0].material.materials[5].map.sourceFile) {
                    var cardImage = '<img src ="' + display.children[0].material.materials[5].map.sourceFile + '" style="float:left; width: 14vmax;" />';
                }

                var wrapper = document.createElement('div');
                wrapper.id = 'description-right';
                wrapper.innerHTML = DBZCCG.toolTip.customContent;
                wrapper.style.width = ($('#descriptionBoxContent')
                        .parent()
                        .parent()
                        .parent()[0].style.width.replace('px', '') * 0.4) + 'px';

                DBZCCG.toolTip.customContent = cardImage + wrapper.outerHTML + "<div style='clear:both;' />";
            }

            $('#hud').qtip('show');

            //fix for personality cards display
            // power stages
            $('.qtip-content').children().children().children('.personality-content').children().css({'font-size': '0.95em'});
            // level
            $('.qtip-content').children().children().children('.personality-card-content').children('.property-description-box').children('.level-label').css({'margin-top': '0em', 'font-size': '2em', 'margin-left': '-0.8em'});
            // pur
            $('.qtip-content').children().children().children('.personality-card-content').children('.property-description-box').children('.card-label-pur').children('div').css({'font-size': '1.9vmax', 'margin-left': '0.6vmax', 'margin-top': '0.75vmax'});
        }
    };

    display.click = display.mouseOut = function() {
        if (DBZCCG.toolTip.customContent) {
            $('#hud').qtip('option', {'position.adjust.y': 0});
            $('#hud').qtip('option', {'position.adjust.mouse': false});
            $('#hud').qtip('hide');
            $(DBZCCG.toolTip.customContent).remove();
            DBZCCG.toolTip.customContent = undefined;
        }
        return true;
    };
};

DBZCCG.Combat.mouseHoverTooltip = function(event) {
    var element = document.createElement('div');
    element.id = 'hover-tooltip';
    element.style.display = 'none';
    document.body.appendChild(element);
    element.style['z-index'] = 850;
    element.style.position = 'absolute';
    element.style["-moz-border-radius"] = '10px';
    element.style["-webkit-border-radius"] = '10px';
    element.style["border-radius"] = '10px';
    element.style["border"] = '8px solid #666';
    element.style["padding"] = '10px';
    element.style["background-color"] = '#FFF';
    element.style["color"] = '#000';
    var top = event.clientY - element.offsetHeight - 25;
    var left = event.clientX - element.offsetWidth / 2;
    element.style.top = top + 'px';
    element.style.left = left + 'px';
    $(element).fadeIn(250);
    return element;
};

DBZCCG.Combat.labelText = function(text, position, color, zindex, size) {

    if (color !== undefined) {
        color = color.toString(16);
        for (var i = color.length; i < 6; i++) {
            color = '0' + color;
        }
        color = '#' + color;
    } else {
        color = '#FFFFFF';
    }

    var span = document.createElement('span');
    span.style.position = 'absolute';
    span.style['z-index'] = zindex || 900;
    span.style.color = color;
    span.innerHTML = text;
    span.className = 'hover-label-text';
    document.getElementById('renderer-wrapper').appendChild(span);
    $(span).css('font-size', (size || 2) + 'em');
    span.style.left = (((position.x - span.offsetWidth / 2) / window.innerWidth) * 100) + '%';
    span.style.top = (((position.y - span.offsetHeight / 2) / window.innerHeight) * 100) + '%';
    return span;
};

DBZCCG.Combat.hoverText = function(text, display, color) {
    if (text) {
        DBZCCG.displayingText = true;

        var vector = DBZCCG.Screen.getWindowCoords(display);

        var span = DBZCCG.Combat.labelText(text, vector, color);

        var i = 0;
        var top = parseInt((span.style.top.replace('%', '')));
        var dcr = top * 0.0009;
        var intervalRise = window.setInterval(function() {
            span.style.top = (top - dcr * i) + '%';
            i++;
        }, 1);

        $(span).fadeIn(500, function() {
            window.setTimeout(function() {
                $(span).fadeOut(500, function() {
                    window.clearInterval(intervalRise);
                    $(span).remove();
                    DBZCCG.displayingText = false;
                });
            }, 1000);
        });
    }
};