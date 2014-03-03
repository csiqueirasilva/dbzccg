DBZCCG.Player = {};

DBZCCG.Player.Field = {};

DBZCCG.Player.Field.cornerWidth = 0.1;
DBZCCG.Player.Field.Height = 30;
DBZCCG.Player.Field.Width = 100;

DBZCCG.Player.discardCallback = {f: function() {
        var clicked = DBZCCG.toolTip.parent;
        var i = 0;
        for (; i < DBZCCG.performingAction.hand.cards.length && clicked !== DBZCCG.performingAction.hand.cards[i].display; i++)
            ;

        if (i !== DBZCCG.performingAction.hand.cards.length) {
            DBZCCG.toolTip.idxHand = i;
        }
        DBZCCG.performingAction.discardCard();
    },
    priority: 1};

DBZCCG.Player.AIPlay = function(player, pass) {
    if (player.usableCards.length === 0) {
        if (pass) {
            DBZCCG.Log.logEntry(DBZCCG.passLog);
            DBZCCG.Combat.speechBubble("I will not take action.", player.getPersonalityInControl().display);
            player.passed = true;
        }
    } else {
        DBZCCG.Combat.activateEffectAI(player.usableCards.shift());
        if (pass) {
            player.passed = false;
        }
    }
};

DBZCCG.Player.pass = function() {
    DBZCCG.hideCombatIcons();
    DBZCCG.Combat.removeSelectionParticles();

    if (DBZCCG.combat && DBZCCG.mainPlayer === DBZCCG.attackingPlayer) {
        DBZCCG.attackingPlayer.passed = true;
    }

    if (DBZCCG.passLog) {
        DBZCCG.Log.logEntry(DBZCCG.passLog);
    }

    DBZCCG.performingTurn = false;
    DBZCCG.waitingMainPlayerMouseCommand = false;
};

DBZCCG.Player.create = function(dataObject, vec) {

    function PlayerObject(dataObject, vec) {

        var pronome;

        this.dirVector = vec.clone().normalize();
        this.posVector = vec.clone();
        this.distanceFromCenter = vec.length();

        /* Game variables */
        this.handOnTable = false;
        this.cardDiscardPhaseLimit = 1;
        this.onlyDefend = false;
        this.onlyPass = false;
        this.sufferedAttack = false;
        this.canLose = true;

        this.drawPhaseEnabled = true;
        this.nonCombatPhaseEnabled = true;
        this.purPhaseEnabled = true;
        this.declarePhaseEnabled = true;
        this.combatPhaseEnabled = true;
        this.discardPhaseEnabled = true;
        this.rejuvenationPhaseEnabled = true;

        /* Game functions */

        var player = this;

        this.passDialog = function() {
            if (this === DBZCCG.mainPlayer) {
                var passOp = (DBZCCG.combat ? 'Pass' : 'Advance to PUR phase');
                var buttons = {};

                if (DBZCCG.combat && this.hand.cards.length > 0 &&
                        this.checkActivation(DBZCCG.General['Final Physical Attack']) &&
                        DBZCCG.attackingPlayer === this) {
                    buttons['Perform a Final Physical Attack'] = function() {
                        $(this).dialog('close');
                        window.setTimeout(function() {
                            $('#final-physical-btn').click();
                        }, 250);
                    };
                }

                buttons['Check table'] = function() {
                    $(this).dialog('close');
                };

                buttons[passOp] = function() {
                    $(this).dialog('close');
                    DBZCCG.Player.pass();
                };

                DBZCCG.confirmDialog('No action', 'You have no possible action.', null, buttons);
            }
        };

        this.checkActivation = function(card) {
            var rt = true;

            this.solveActivationCallback(function(cb) {
                return cb.f(card);
            }, function(ret) {
                rt = ret.success;
            });

            return rt;
        };

        this.activePersonality = {};

        this.activePersonality.toOriginalPosition = function() {
            var zScouter = this.zScouter;
            var personality = this.display;

            DBZCCG.performingAnimation = true;

            var globalPositionScouter = zScouter.parent.localToWorld(zScouter.position.clone());

            var globalPositionPersonality = personality
                    .parent
                    .localToWorld(personality
                    .position
                    .clone());

            var relativePositionScouter = zScouter
                    .position
                    .clone();

            var relativePositionPersonality = new THREE.Vector3(0, 0, 0);

            DBZCCG.mainScene.add(personality);
            personality.position = globalPositionPersonality;
            DBZCCG.mainScene.add(zScouter);
            zScouter.position = globalPositionScouter;

            if (this.source === 'mainPersonality') {
                var animation = new TWEEN.Tween(personality.position)
                        .to(player.mainPersonality.surroundingArea.localToWorld(relativePositionPersonality.clone()), 150);

                var secondAnimation = new TWEEN.Tween(zScouter.position)
                        .to(player.mainPersonality.surroundingArea.localToWorld(relativePositionScouter.clone()), 150);

                animation.chain(secondAnimation);

                secondAnimation.onComplete(function() {
                    zScouter.position = relativePositionScouter;
                    personality.position = relativePositionPersonality;

                    player.mainPersonality.surroundingArea.add(personality);
                    player.mainPersonality.surroundingArea.add(zScouter);

                    window.setTimeout(DBZCCG.resizeLabels, 20);
                    DBZCCG.performingAnimation = false;
                });

                animation.start();
            }
        };

        this.activePersonality.toActivePosition = function() {
            var zScouter = this.zScouter;
            var personality = this.display;

            DBZCCG.performingAnimation = true;

            var globalPositionScouter = zScouter.parent.localToWorld(zScouter.position.clone());

            var globalPositionPersonality = personality
                    .parent
                    .localToWorld(personality
                    .position
                    .clone());

            var relativePositionScouter = zScouter
                    .position
                    .clone();

            var relativePositionPersonality = personality
                    .position.clone();

            DBZCCG.mainScene.add(personality);
            personality.position = globalPositionPersonality;
            DBZCCG.mainScene.add(zScouter);
            zScouter.position = globalPositionScouter;

            var animation = new TWEEN.Tween(personality.position)
                    .to(player.activePersonalityArea.localToWorld(relativePositionPersonality.clone()), 150);

            var secondAnimation = new TWEEN.Tween(zScouter.position)
                    .to(player.activePersonalityArea.localToWorld(relativePositionScouter.clone()), 150);

            animation.chain(secondAnimation);

            secondAnimation.onComplete(function() {
                zScouter.position = relativePositionScouter;
                personality.position = relativePositionPersonality;

                player
                        .activePersonalityArea
                        .add(zScouter);

                player
                        .activePersonalityArea
                        .add(personality);

                window.setTimeout(DBZCCG.resizeLabels, 20);
                DBZCCG.performingAnimation = false;
            });

            animation.start();
        };

        this.activePersonality.set = function(personality, source) {
            this.source = source;
            if (source === 'mainPersonality') {
                this.personality = player.mainPersonality.currentPersonality;
                this.display = player.mainPersonality.display;
                this.zScouter = player.mainPersonality.currentPersonality().zScouter;
            }

            this.toActivePosition();
        };

        this.activePersonality.clear = function() {
            this.toOriginalPosition();
            this.display = this.personality = this.source = this.zScouter = null;
        };

        // check passive effects
        this.checkPassiveEffects = function() {
            // check nonCombats
            var passiveEffects = [];
            var checkField = ['nonCombats', 'drills', 'inPlay', 'dragonballs',
                'lifeDeck', 'discardPile', 'fieldCards'];

            for (var j = 0; j < checkField.length; j++) {
                for (var i = 0; i < this[checkField[j]].cards.length; i++) {
                    if (this[checkField[j]].cards[i].passiveEffect && this[checkField[j]].cards[i].passiveEffect.f instanceof Function) {
                        passiveEffects.push(this[checkField[j]].cards[i]);
                    }
                }
            }

            passiveEffects.sort(DBZCCG.Callbacks.CompareCallbacks);

            for (var i = 0; i < passiveEffects.length; i++) {
                passiveEffects[i].f();
            }
        };

        // Check if after an effect the player must discard a card to be in compliance to the rules
        this.checkRulesCompliance = function() {

        };

        this.usableCards = [];

        this.clearUsableCards = function() {
            this.usableCards = [];
        };

        this.removeUsableCard = function(card) {
            var idx = this.usableCards.indexOf(card);
            if (idx !== -1) {
                this.usableCards.splice(idx, 1);
            }
        };

        this.addUsableCard = function(card) {
            var idx = this.usableCards.indexOf(card);
            if (idx === -1) {
                card.player = this;
                this.usableCards.push(card);
            }
        };

        this.checkUsableCards = function() {
            // check main personality
            var currentPersonality = this.mainPersonality.currentPersonality();
            if (currentPersonality.activable instanceof Function) {
                if (currentPersonality.activable(this, currentPersonality)) {
                    this.addUsableCard(currentPersonality.display);
                } else {
                    this.removeUsableCard(currentPersonality.display);
                }
            }

            var cardGroups = ['hand', 'nonCombats', 'inPlay', 'floatingEffects', 'dragonballs'];

            // check cardgroups
            for (var j = 0; j < cardGroups.length; j++) {
                for (var i = 0; i < this[cardGroups[j]].cards.length; i++) {
                    if (this[cardGroups[j]].cards[i].activable instanceof Function || this[cardGroups[j]].cards[i].playable instanceof Function) {
                        if ((this[cardGroups[j]].cards[i].playable instanceof Function && this[cardGroups[j]].cards[i].playable(this, this[cardGroups[j]].cards[i])) ||
                                (this[cardGroups[j]].cards[i].activable instanceof Function && this[cardGroups[j]].cards[i].activable(this, this[cardGroups[j]].cards[i]))) {
                            this.addUsableCard(this[cardGroups[j]].cards[i].display);
                        } else {
                            this.removeUsableCard(this[cardGroups[j]].cards[i].display);
                        }
                    }
                }
            }

            // check opponents fields
            cardGroups = ['dragonballs'];
            for (var j = 0; j < cardGroups.length; j++) {
                for (var k = 0; k < DBZCCG.table.players.length; k++) {
                    var player = DBZCCG.table.players[k];
                    if (player !== this) {
                        for (var i = 0; i < player[cardGroups[j]].cards.length; i++) {
                            if (player[cardGroups[j]].cards[i].activable instanceof Function || player[cardGroups[j]].cards[i].playable instanceof Function) {
                                if ((player[cardGroups[j]].cards[i].playable instanceof Function && player[cardGroups[j]].cards[i].playable(this, player[cardGroups[j]].cards[i])) ||
                                        (player[cardGroups[j]].cards[i].activable instanceof Function && player[cardGroups[j]].cards[i].activable(this, player[cardGroups[j]].cards[i]))) {
                                    this.addUsableCard(player[cardGroups[j]].cards[i].display);
                                } else {
                                    this.removeUsableCard(player[cardGroups[j]].cards[i].display);
                                }
                            }
                        }
                    }
                }
            }
        };

        DBZCCG.Callbacks.create(this, 'beforeDamageCallback', function(callback) {
            callback.player = player;
        });

        this.captureDragonballs = function(notUsePower, notDontUsePower, notNotCapture, msg, player) {
            var dragonballs = DBZCCG.Combat.checkDragonballControl(this);
            var oldClickCallback = [];
            var capturingPlayer = player || DBZCCG.attackingPlayer;

            if (dragonballs.length > 0) {
                if (capturingPlayer === DBZCCG.mainPlayer) {
                    var doNotUseEffect = false;
                    DBZCCG.Combat.effectHappening = true;

                    function finishCaptureDialog() {
                        for (var k = 0; k < dragonballs.length; k++) {
                            dragonballs[k].display.click = oldClickCallback.shift();
                        }

                        $('#capture-btn').hide();
                        DBZCCG.waitingMainPlayerMouseCommand = false;
                        DBZCCG.performingTurn = false;
                        DBZCCG.Combat.effectHappening = false;
                        DBZCCG.Combat.removeSelectionParticles();
                    }

                    function beginCapture() {
                        for (var k = 0; k < dragonballs.length; k++) {
                            oldClickCallback.push(dragonballs[k].display.click);
                            dragonballs[k].display.click = capture;
                        }
                        $('#capture-btn')[0].onclick = showCaptureHelp;
                        window.setTimeout(showCaptureHelp, 200);
                    }

                    function capture() {
                        this.parentCard.capture(capturingPlayer, doNotUseEffect);
                        finishCaptureDialog();
                        return false;
                    }

                    function showCaptureHelp() {
                        DBZCCG.confirmDialog('Capture Dragonball',
                                'You choose to capture a dragonball and ' + (doNotUseEffect ? ' do not use ' : ' use ') +
                                ' its powers. Click in a dragonball to capture it.', null,
                                {'OK': function() {
                                        $(this).dialog('close');
                                    }
                                });
                    }

                    var buttons = {};

                    var msg = msg || ('You dealt ' +
                            this.lastDamageTaken.cards
                            + ' life cards of damage. It is possible to capture a dragonball that is currently in control by your opponent.');

                    if (!notUsePower) {
                        buttons['Capture and USE the effect'] = function() {
                            $(this).dialog('close');
                            beginCapture();
                        };
                    }

                    if (!notDontUsePower) {
                        buttons['Capture and DO NOT USE the effect'] = function() {
                            doNotUseEffect = true;
                            $(this).dialog('close');
                            beginCapture();
                        };
                    }

                    if (!notNotCapture) {
                        buttons['Do not capture a dragonball'] = function() {
                            finishCaptureDialog();
                            $(this).dialog('close');
                        };
                    }

                    function showCaptureDialog() {
                        DBZCCG.confirmDialog('Capture Dragonball',
                                msg, null,
                                buttons,
                                window.innerWidth * 0.5,
                                window.innerHeight * 0.5);
                    }

                    $('#capture-btn')[0].onclick = showCaptureDialog;

                    DBZCCG.listActions.splice(0, 0, function() {
                        DBZCCG.waitingMainPlayerMouseCommand = true;
                        DBZCCG.performingTurn = true;

                        for (var k = 0; k < dragonballs.length; k++) {
                            DBZCCG.Combat.addSelectionParticle(dragonballs[k].display);
                        }

                        showCaptureDialog();
                        $('#capture-btn').show();
                    });

                } else /* CPU */ {
                    var db = dragonballs.shift();
                    db.capture(capturingPlayer, notUsePower);
                }
            }
        };

        this.takeDamage = function(damage) {
            this.sufferedAttack = true;
            var powerStages = damage.stages;
            var lifeCards = damage.cards;

            var argsCallback = function(callback) {
                return callback.f(powerStages, lifeCards);
            };

            var solveCallback = function(ret) {
                powerStages = ret.powerStages;
                lifeCards = ret.lifeCards;
            };

            this.solveBeforeDamageCallback(argsCallback, solveCallback);

            if (powerStages > 0) {
                if (powerStages > this.getPersonalityInControl().currentPowerStageAboveZero) {
                    lifeCards += damage.stages - this.getPersonalityInControl().currentPowerStageAboveZero;
                    powerStages = this.getPersonalityInControl().currentPowerStageAboveZero;
                }
            }

            var cbIdx = [];
            if (lifeCards > 0) {
                var i;
                if (lifeCards > this.lifeDeck.cards.length) {
                    // trigger not enough cards
                    i = 0;
                } else {
                    i = this.lifeDeck.cards.length - lifeCards;
                }

                for (var j = this.lifeDeck.cards.length - 1; j >= i; j--) {
                    cbIdx.push(j);
                }
            }

            var player = this;

            DBZCCG.listActions.splice(0, 0, function() {
                if (player.lastDamageTaken && player.lastDamageTaken.cards >= 5) {
                    player.captureDragonballs();
                    if (player.lastDamageTaken.cards > 7 || player.lastDamageTaken.stages > 7) {
                        DBZCCG.Sound.wowDamage();
                    }
                }
            });

            DBZCCG.listActions.splice(0, 0, function() {
                player.sufferedAttack = false;
                var typeDamage = DBZCCG.Combat.attackType;

                var log = DBZCCG.Log.logEntry('Suffered ' + ClassHelper.getKeyByValue(DBZCCG.Combat.Attack, DBZCCG.Combat.attackType) + ' attack.', DBZCCG.openCard);
                log.type = DBZCCG.Log.Type.sufferedAttack;
                log.typeAttack = DBZCCG.Combat.attackType;

                var log = DBZCCG.Log.logEntry('Suffered damage' + (typeDamage ? (typeDamage === DBZCCG.Combat.Attack.Energy ?
                        ' from an energy attack' : ' from a physical attack') : '') + ': ' +
                        player.lastDamageTaken.stages + ' power stages and ' +
                        player.lastDamageTaken.cards + ' life cards', DBZCCG.openCard);
                log.typeDamage = typeDamage;
                log.type = DBZCCG.Log.Type.sufferedDamage;
                log.lifeCardDamageTaken = player.lastDamageTaken.cards;
                log.powerStageDamageTaken = player.lastDamageTaken.stages;
            });

            DBZCCG.listActions.splice(0, 0, function() {
                player.lastDamageTaken = {cards: lifeCards, stages: powerStages};
                if (cbIdx.length > 0) {
                    player.transferCards('lifeDeck', cbIdx, 'discardPile', player.discardPile.cards.length);
                }
                player.loadLabelText();
            });

            if (lifeCards >= 0) {
                DBZCCG.Combat.hoverText("-" + lifeCards, this.lifeDeck.display, 0xFF0000);
            }

            if (powerStages >= 0) {
                this.getPersonalityInControl().raiseZScouter(-powerStages);
            }
        };

        this.checkOwnership = function(display) {
            var ret = false;

            if (
                    this.mainPersonality.currentPersonality().display === display ||
                    this.hand.getCardIdx(display) !== -1 ||
                    this.nonCombats.getCardIdx(display) !== -1
                    ) {
                ret = true;
            }

            return ret;
        };

        this.attackerAttacks = function() {
            DBZCCG.performingTurn = true;

            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.openCard = DBZCCG.currentCard = null;
                DBZCCG.listActions.splice(0, 0, DBZCCG.swapPlayers);

                if (DBZCCG.combat) {
                    DBZCCG.performingTurn = true;
                    DBZCCG.performingAction = DBZCCG.attackingPlayer;

                    DBZCCG.performingAction.clearUsableCards();
                    DBZCCG.performingAction.checkUsableCards();

                    DBZCCG.passLog = DBZCCG.attackingPlayer.displayName() + " has passed the chance to perform an action.";

                    if (!DBZCCG.attackingPlayer.onlyDefend && !DBZCCG.attackingPlayer.onlyPass) {
                        // TODO: run floating effects
                        if (DBZCCG.attackingPlayer === DBZCCG.mainPlayer) {

                            for (var i = 0; i < player.usableCards.length; i++) {
                                DBZCCG.Combat.addSelectionParticle(player.usableCards[i], 0.3);
                            }

                            DBZCCG.waitingMainPlayerMouseCommand = true;
                            DBZCCG.passMessage = 'Pass the chance to perform an action?';
                            $('#pass-btn').show();
                            if (DBZCCG.attackingPlayer.hand.cards.length > 0 && player.checkActivation(DBZCCG.General['Final Physical Attack'])) {
                                $('#final-physical-btn').show();
                            }

                            if (player.usableCards.length === 0) {
                                player.passDialog();
                            }
                        } else {
                            DBZCCG.Player.AIPlay(DBZCCG.attackingPlayer, true);
                            DBZCCG.performingTurn = false;
                        }
                    } else {
                        DBZCCG.attackingPlayer.passed = true;
                        DBZCCG.performingTurn = false;
                    }
                }
            });

            if (DBZCCG.openCard) {
                DBZCCG.listActions.splice(0, 0, function() {
                    DBZCCG.Combat.checkUseWhenNeeded(DBZCCG.Combat.Events['Combat Chain finished']);
                });
            }

            DBZCCG.defendingPlayer.checkPassiveEffects();
            DBZCCG.defendingPlayer.checkRulesCompliance();
            DBZCCG.attackingPlayer.checkPassiveEffects();
            DBZCCG.attackingPlayer.checkRulesCompliance();

            DBZCCG.performingTurn = false;
        };

        this.defenderDefends = function(card) {

            DBZCCG.performingTurn = true;

            var cardPlayed = DBZCCG.currentCard;
            var player = this;

            var defenseChance = true;

            this.solveDefenderCallback(function(cb) {
                return cb.f(cardPlayed);
            },
                    function(ret) {
                        if (ret.skipDefense === true) {
                            defenseChance = false;
                        }
                    });

            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.performingTurn = true;
                DBZCCG.performingAction = DBZCCG.defendingPlayer;
                DBZCCG.performingAction.clearUsableCards();
                DBZCCG.performingAction.checkUsableCards();

                DBZCCG.passLog = player.displayName() + " passed the opportunity to defend the attack.";
                if (!DBZCCG.defendingPlayer.onlyPass && defenseChance) {
                    if (DBZCCG.defendingPlayer === player) {
                        if (DBZCCG.mainPlayer === player) {
                            for (var i = 0; i < player.usableCards.length; i++) {
                                DBZCCG.Combat.addSelectionParticle(player.usableCards[i], 0.3);
                            }

                            DBZCCG.waitingMainPlayerMouseCommand = true;
                            DBZCCG.passMessage = 'Pass the opportunity to defend?';
                            $('#pass-btn').show();

                            if (player.usableCards.length === 0) {
                                player.passDialog();
                            }
                        } else {
                            DBZCCG.Player.AIPlay(player);
                            DBZCCG.performingTurn = false;
                        }
                    }
                } else {
                    DBZCCG.performingTurn = false;
                }
            });

            DBZCCG.defendingPlayer.checkPassiveEffects();
            DBZCCG.defendingPlayer.checkRulesCompliance();

            DBZCCG.attackingPlayer.checkPassiveEffects();
            DBZCCG.attackingPlayer.checkRulesCompliance();

            DBZCCG.performingTurn = false;
        };

        this.getPersonalityInControl = function() {
            return this.activePersonality.personality instanceof Function ? this.activePersonality.personality() : null;
        };

        this.combatPhase = function(listActions) {

            DBZCCG.phaseCounter = 0;

            // run when entering combat effects
            this.solveCombatEnteringCallback(function(cb) {
                return cb.f(DBZCCG.defendingPlayer);
            },
                    function(ret) {

                    });

            var player = this;
            DBZCCG.performingAction = DBZCCG.defendingPlayer;
            var defenderSourcePile = 'lifeDeck';
            var defenderQuantityDraw = 3;
            var defenderDrawPosition = "top";

            // run when entering combat effects
            DBZCCG.defendingPlayer.solveCombatEnteringCallback(function(cb) {
                return cb.f(player);
            },
                    function(ret) {
                        if (ret.defenderSourcePile) {
                            defenderSourcePile = ret.defenderSourcePile;
                        }
                        if (typeof ret.defenderQuantityDraw === "number") {
                            defenderQuantityDraw = ret.defenderQuantityDraw;
                        }
                        if (ret.position) {
                            defenderDrawPosition = ret.position;
                        }
                    });

            if (DBZCCG.combat) {
                if (defenderDrawPosition === "top") {
                    DBZCCG.defendingPlayer.drawTopCards(defenderQuantityDraw, defenderSourcePile);
                } else if (defenderDrawPosition === "bottom") {
                    DBZCCG.defendingPlayer.drawBottomCards(defenderQuantityDraw, defenderSourcePile);
                }

                DBZCCG.swapPlayers = function() {
                    if ((DBZCCG.attackingPlayer.passed && DBZCCG.defendingPlayer.passed) || !DBZCCG.combat) {
                        DBZCCG.performingAction = player;
                        DBZCCG.Log.logEntry("The combat is over.");

                        // run leave from combat effects
                        DBZCCG.attackingPlayer.solveCombatLeavingCallback(function(cb) {
                            return cb.f(DBZCCG.defendingPlayer);
                        },
                                function(ret) {

                                });

                        DBZCCG.defendingPlayer.solveCombatLeavingCallback(function(cb) {
                            return cb.f(DBZCCG.attackingPlayer);
                        },
                                function(ret) {

                                });

                        DBZCCG.attackingPlayer.clearUsableCards();
                        DBZCCG.defendingPlayer.clearUsableCards();

                        DBZCCG.attackingPlayer.activePersonality.clear();
                        DBZCCG.defendingPlayer.activePersonality.clear();

                        DBZCCG.defendingPlayer = null;
                        DBZCCG.attackingPlayer = null;

                        DBZCCG.combat = false;
                        DBZCCG.swapPlayers = undefined;

                        DBZCCG.Combat.removeSelectionParticles();
                    } else {
                        var aux = DBZCCG.attackingPlayer;
                        DBZCCG.attackingPlayer = DBZCCG.defendingPlayer;
                        DBZCCG.defendingPlayer = aux;
                        DBZCCG.phaseCounter++;
                        listActions.splice(0, 0, DBZCCG.attackingPlayer.attackerAttacks);
                    }
                };

                DBZCCG.attackingPlayer.activePersonality.set(null, 'mainPersonality');
                DBZCCG.defendingPlayer.activePersonality.set(null, 'mainPersonality');

                listActions.splice(0, 0, this.attackerAttacks);
            }
        };

        this.rejuvenationPhase = function() {
            if (this.discardPile.cards.length > 0) {
                DBZCCG.performingTurn = true;
                if (DBZCCG.performingAction === DBZCCG.mainPlayer) {
                    DBZCCG.waitingMainPlayerMouseCommand = true;
                    document.getElementById('rejuvenate-btn').onclick();
                    $('#rejuvenate-btn').show();
                } else {
                    this.rejuvenate(true);
                }
            }
        };

        this.rejuvenate = function(endTurn) {
            var botPos = this.lifeDeck.display.position.clone();
            var topPos = botPos.clone();
            topPos.y = 5;

            var animation = new TWEEN.Tween(this.lifeDeck.display.position).to(topPos, 200);
            var secondAnimation = new TWEEN.Tween(this.lifeDeck.display.position).to(botPos, 200);

            secondAnimation.delay(300);

            var player = this;
            animation.onComplete(function() {
                var cardName = player.discardPile.cards[player.discardPile.cards.length - 1].logName();
                player.transferCards("discardPile", [player.discardPile.cards.length - 1], "lifeDeck", 0, true);
                DBZCCG.Log.logEntry(player.mainPersonality.displayName() + " sent the top card of " + pronome + " Discard Pile (" + cardName + ") into the bottom of " + pronome + " Life Deck.");
            });

            animation.chain(secondAnimation);

            if (endTurn) {
                secondAnimation.onComplete(function() {
                    DBZCCG.performingTurn = false;
                });
            }

            animation.start();
        };


        this.displayName = function() {
            return this.name;
        };

        this.discardCard = function() {
            DBZCCG.qtipElement.qtip('hide');

            if (DBZCCG.mainPlayer === player) {
                DBZCCG.Combat.removeSelectionParticles();
                player.discardPile.addAddCallback({
                    life: false,
                    f: function() {
                        if (player.hand.cards.length > player.cardDiscardPhaseLimit) {
                            for (var i = 0; i < player.hand.cards.length; i++) {
                                DBZCCG.Combat.addSelectionParticle(player.hand.cards[i].display, 0.3);
                            }
                        }
                    },
                    priority: 1
                });
            }

            player.discardPile.addAddCallback({
                life: false,
                priority: Infinity,
                f: function() {
                    if (player.hand.cards.length === player.cardDiscardPhaseLimit) {
                        DBZCCG.waitingMainPlayerMouseCommand = false;

                        for (var i = 0; i < player.hand.cards.length; i++) {
                            player.hand.cards[i].display.removeCallback(DBZCCG.Player.discardCallback);
                        }

                        DBZCCG.performingTurn = false;
                    }

                    if (player !== DBZCCG.mainPlayer) {
                        DBZCCG.performingTurn = false;
                    }
                }
            });

            player.transferCards("hand", [DBZCCG.toolTip.idxHand], "discardPile");

            DBZCCG.toolTip.parent.removeCallback(DBZCCG.Player.discardCallback);
            DBZCCG.toolTip.idxHand = undefined;
            DBZCCG.clearMouseOver();
        };

        this.discardPhase = function() {

            if (this.hand.cards.length > this.cardDiscardPhaseLimit) {
                DBZCCG.performingTurn = true;

                for (var i = 0; i < this.hand.cards.length; i++) {
                    this.hand.cards[i].display.addCallback(DBZCCG.Player.discardCallback);
                }

                var player = this;

                if (DBZCCG.mainPlayer !== this) {
                    //TODO: AI OR P2
                    var handSize = this.hand.cards.length;
                    for (var i = handSize - 1; i >= this.cardDiscardPhaseLimit; i--) {
                        DBZCCG.listActions.splice(0, 0, function() {
                            DBZCCG.performingTurn = true;
                            DBZCCG.toolTip.idxHand = i;
                            DBZCCG.toolTip.parent = player.hand.cards[DBZCCG.toolTip.idxHand].display;
                            player.discardCard();
                        });
                    }
                    DBZCCG.performingTurn = false;
                } else {
                    for (var i = 0; i < this.hand.cards.length; i++) {
                        DBZCCG.Combat.addSelectionParticle(this.hand.cards[i].display, 0.3);
                    }

                    DBZCCG.waitingMainPlayerMouseCommand = true;
                }
            }
        };

        this.declarePhase = function() {
            DBZCCG.performingTurn = true;
            if (DBZCCG.mainPlayer === this) {
                DBZCCG.waitingMainPlayerMouseCommand = true;
                document.getElementById('combat-btn').onclick();
                $('#combat-btn').show();
            } else {
                // AI OR P2
                if (this.hand.cards.length > 2) {
                    DBZCCG.combat = true;
                    DBZCCG.Combat.speechBubble("Declaring combat!", this.mainPersonality.currentPersonality().display);
                } else {
                    DBZCCG.Combat.speechBubble("I will not declare.", this.mainPersonality.currentPersonality().display);
                }
                DBZCCG.performingTurn = false;
            }
        };

        this.purPhase = function() {
            var pur = this.mainPersonality.currentPersonality().PUR;
            this.mainPersonality.raiseZScouter(pur);
        };

        this.nonCombatPhase = function() {
            DBZCCG.performingTurn = true;

            DBZCCG.performingAction.clearUsableCards();
            DBZCCG.performingAction.checkUsableCards();

            if (DBZCCG.mainPlayer === this) {

                for (var i = 0; i < this.usableCards.length; i++) {
                    DBZCCG.Combat.addSelectionParticle(this.usableCards[i], 0.3);
                }

                DBZCCG.waitingMainPlayerMouseCommand = true;
                DBZCCG.passMessage = 'Advance to the Power UP Phase?';
                DBZCCG.passLog = this.displayName() + " advanced to the Power UP Phase.";
                $('#pass-btn').show();

                if (this.usableCards.length === 0) {
                    this.passDialog();
                }

            } else {
                // TODO: AI OR P2
                var player = this;
                player.clearUsableCards();
                player.checkUsableCards();

                var numberUsable = player.usableCards.length;

                function playNonCombatCard() {
                    player.clearUsableCards();
                    player.checkUsableCards();

                    numberUsable = player.usableCards.length;

                    if (numberUsable > 0) {
                        DBZCCG.listActions.splice(0, 0, function() {
                            DBZCCG.listActions.splice(0, 0, function() {
                                numberUsable--;
                                playNonCombatCard();
                            });

                            DBZCCG.Player.AIPlay(player);
                        });
                    }
                }

                DBZCCG.listActions.splice(0, 0, function() {
                    playNonCombatCard();
                });

                DBZCCG.performingTurn = false;
            }
        };

        this.drawPhase = function() {
            DBZCCG.performingTurn = true;
            DBZCCG.performingAction.drawTopCards(3, "lifeDeck");
            DBZCCG.performingTurn = false;
        };

        DBZCCG.Callbacks.create(this, "activationCallback", function(cb) {
            cb.player = player;
        });

        DBZCCG.Callbacks.create(this, 'postDefenseCallback', function(callback) {
            callback.player = player;
        });

        DBZCCG.Callbacks.create(this, 'postAttackCallback', function(callback) {
            callback.player = player;
        });

        this.addPostDefenseCallback({
            priority: 10000000,
            life: true,
            executeShield: function(card) {
                DBZCCG.listActions.splice(0, 0, function() {
                    DBZCCG.Combat.flashCard(card);
                    card.effect();
                    if (card.postEffect instanceof Function) {
                        card.postEffect(card);
                    }
                });
            },
            f: function() {
                if (DBZCCG.openCard.success) {
                    //check field for defense shields
                    var personality = this.player.getPersonalityInControl();

                    if (personality.defenseShield instanceof Function && personality.defenseShield(this.player)) {
                        this.executeShield(personality);
                    }

                    var checkGroups = ['drills', 'nonCombats'];

                    for (var i = 0; i < checkGroups.length; i++) {
                        for (var j = 0; j < this.player[checkGroups[i]].cards.length; j++) {
                            var card = this.player[checkGroups[i]].cards[j];
                            if (card.defenseShield instanceof Function && card.defenseShield(this.player)) {
                                this.executeShield(card);
                            }
                        }
                    }
                }
            }
        });

        DBZCCG.Callbacks.create(this, 'defenderCallback', function(cb) {
            cb.player = player;
        });

        DBZCCG.Callbacks.create(this, 'combatEnteringCallback', function(cb) {
            cb.player = player;
        });

        DBZCCG.Callbacks.create(this, 'combatLeavingCallback', function(cb) {
            cb.player = player;
        });

        DBZCCG.Callbacks.create(this, 'turnCallback', function(callback) {
            callback.player = player;
        });

        DBZCCG.Callbacks.create(this, 'transferCallback', function(callback) {
            callback.player = player;
        });

        this.drawEffectCard =
                function(card, pile, cardIdx) {
                    var player = this;
                    DBZCCG.listActions.splice(0, 0, function() {
                        DBZCCG.performingAction = player;
                        if (player.discardPile.cards.length > 0) {
                            DBZCCG.listActions.splice(0, 0, function() {
                                DBZCCG.performingAnimation = true;
                                var card = player.hand.cards[player.hand.cards.length - 1];

                                if (card.display.offDescriptionBox !== null) {
                                    card.display.turnGameDisplay();
                                }

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
                                    DBZCCG.Combat.flashCard(card);
                                    DBZCCG.performingAnimation = false;
                                });

                                animation.start();
                            });

                            player.transferCards(pile || 'discardPile', [cardIdx || 0], 'hand');
                        }
                    });

                };

        this.transferCards = function(src, srcCards, destiny, pilePosition, noMessage, addToScene) {

            var card = [];
            var action;
            var destinyString;
            var sourceString;

            this.solveTransferCallback(function(cb) {
                return cb.f(src, srcCards, destiny, pilePosition);
            },
                    function(ret) {
                        if (ret.src !== undefined) {
                            src = ret.src;
                        } else if (ret.srcCards !== undefined) {
                            srcCards = ret.srcCards;
                        } else if (ret.destiny !== undefined) {
                            destiny = ret.destiny;
                        } else if (ret.pilePosition !== undefined) {
                            pilePosition = ret.pilePosition;
                        }
                    });

            if (srcCards.length > 0) {

                // Avoid access to displays that no longer exists
                if ($('.ui-dialog:visible').is(':visible')) {
                    $($('.ui-dialog:visible').children('div')[1]).dialog('close');
                }

                if (this[src].constructor.name === "cardGroupObject") {
                    var idx;
                    for (var i = 0; i < srcCards.length; i++) {
                        idx = srcCards[i];
                        card.push(this[src].cards[idx]);
                        this[src].cards[idx] = undefined;
                    }

                    for (var i = 0; i < this[src].cards.length; i++) {
                        if (!this[src].cards[idx]) {
                            this[src].cards.splice(idx, 1);
                        }
                    }

                    this[src].addCard([]);
                    action = "placed";

                    if (src === "hand") {
                        sourceString = "hand";
                    } else {
                        sourceString = "field";
                    }

                } else /* From pile */ {
                    for (var i = 0; i < srcCards.length; i++) {
                        card.push(this[src].removeCardByIdx(srcCards[i]));
                    }
                    action = "sent";
                    sourceString = this[src].display.name;
                }

                var cardString = "";

                if (card[0]) {
                    cardString += card[0].logName();

                    if (card.length > 1) {
                        for (var i = 1; i < card.length - 1; i++) {
                            cardString += ", " + card[i].logName();
                        }
                        cardString += " and " + card[card.length - 1].logName();
                    }

                    if ("cardGroupObject" === this[destiny].constructor.name) {
                        this[destiny].addCard(card, addToScene);

                        if (destiny === "hand") {
                            destinyString = "hand";
                        } else {
                            destinyString = "field";
                        }

                    } else /* to Pile */ {
                        this[destiny].addCard(pilePosition !== undefined ? pilePosition : this[destiny].cards.length, card);

                        destinyString = this[destiny].display.name;
                    }

                    var msg = this.mainPersonality.displayName() + " " + action + " " + cardString + " from " + pronome + " " + sourceString + " into " + pronome + " " + destinyString + ".";
                    if (!noMessage) {
                        DBZCCG.Log.logEntry(msg);
                    }
                }
            }
        };

        this.drawBottomCards = function(n, sourcePile) {

            var i;

            if (n > this[sourcePile].cards.length) {
                // trigger not enough cards
                i = this[sourcePile].cards.length;
            } else {
                i = n;
            }

            var cbIdx = [];
            for (var j = 0; j < i; j++) {
                cbIdx.push(j);
            }

            this.transferCards("lifeDeck", cbIdx, "hand", null, true, (this === DBZCCG.mainPlayer || this.handOnTable) ? true : false);

            DBZCCG.Log.logEntry(this.mainPersonality.displayName() + " drew " + n + " card" + ((n > 1) ? "s" : "") + " from the bottom of the " + this[sourcePile].display.name + ".");
        };

        this.drawTopCards = function(n, sourcePile) {

            var i;

            if (n > this[sourcePile].cards.length) {
                // trigger not enough cards
                i = 0;
            } else {
                i = this[sourcePile].cards.length - n;
            }

            var cbIdx = [];
            for (var j = this[sourcePile].cards.length - 1; j >= i; j--) {
                cbIdx.push(j);
            }

            this.transferCards(sourcePile, cbIdx, "hand", null, true, (this === DBZCCG.mainPlayer || this.handOnTable) ? true : false);

            DBZCCG.Log.logEntry(this.mainPersonality.displayName() + " drew " + n + " card" + ((n > 1) ? "s" : "") + " from the top of the " + this[sourcePile].display.name + ".");
        };

        /* End of game functions */

        this.loadLabelText = function() {
            this.allyArea.changeLabelText("Allies");
            this.floatingEffectsArea.changeLabelText("Floating Effects");
            this.locationCardsArea.changeLabelText("Field");
            this.activePersonalityArea.changeLabelText("Active<br/>Personality");
            this.asideCardsArea.changeLabelText("Set");
            this.cardsInPlayArea.changeLabelText("Combats");
            this.dragonballArea.changeLabelText("Dragonballs");
            this.nonCombatArea.changeLabelText("Non-Combats");
            this.drillArea.changeLabelText("Drills");
            this.masteryArea.changeLabelText("Mastery");
            this.senseiArea.changeLabelText("Sensei");
            this.deckArea.changeLabelText("Deck");
            this.mainPersonality.surroundingArea.changeLabelText("Main<br/>Personality");
            this.mainPersonality.changePowerStageLabelText();
            this.mainPersonality.changeAngerLabelText();
            this.discardPile.changeLabelText();
            this.removedFromTheGame.changeLabelText();
        };

        this.loadPlayerSpace = function(scene) {
            this.field = new THREE.Object3D();
            this.field.name = "field";
            var mainPersonalityPos = this.dirVector.clone();
            mainPersonalityPos.multiplyScalar(DBZCCG.Player.Field.Height / 5);
            var discardPilePos = mainPersonalityPos.clone().multiplyScalar(1.75);
            discardPilePos.add(MathHelper.rotateVector(this.dirVector.clone().normalize().multiplyScalar(DBZCCG.Card.cardWidth * -0.6)));
            var lifeDeckPos = mainPersonalityPos.clone().multiplyScalar(1.75);
            lifeDeckPos.add(MathHelper.rotateVector(this.dirVector.clone().normalize().multiplyScalar(DBZCCG.Card.cardWidth * 0.6)));
            var removedFromTheGamePos = mainPersonalityPos.clone().multiplyScalar(0.75);
            removedFromTheGamePos.add(MathHelper.rotateVector(this.dirVector.clone().normalize().multiplyScalar(DBZCCG.Card.cardWidth * -0.6)));

            this.mainPersonality.addToField(mainPersonalityPos, this.field);

            /* Beginning of area creation */
            this.deckArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5, DBZCCG.Card.cardHeight * 2.5, DBZCCG.Player.Field.cornerWidth);

            this.nonCombatArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * DBZCCG.CardGroup.maxDisplaySize * 1.35, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);
            this.nonCombatArea.position.x = MathHelper.rotateVector(this.dirVector).x * (DBZCCG.Player.Field.Width / 3.575 - DBZCCG.Card.cardWidth * 1.5);
            this.nonCombatArea.position.z = this.dirVector.clone().multiplyScalar(1.5 * DBZCCG.Card.cardHeight).z * 1.875;

            this.allyArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 8 * 1.35, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);
            this.allyArea.position.x = MathHelper.rotateVector(this.dirVector).x * (DBZCCG.Player.Field.Width / 6.05);

            this.activePersonalityArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5, DBZCCG.Card.cardHeight * 2.5, DBZCCG.Player.Field.cornerWidth);

            this.drillArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * DBZCCG.CardGroup.maxDisplaySize * 1.35, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);
            this.drillArea.position.x = MathHelper.rotateVector(this.dirVector).x * (DBZCCG.Player.Field.Width / 3.575 - DBZCCG.Card.cardWidth * 1.5);

            this.activePersonalityArea.position.z = this.drillArea.position.z = this.mainPersonality.surroundingArea.position.z = this.deckArea.position.z = this.dirVector.clone().multiplyScalar(1.5 * DBZCCG.Card.cardHeight).z;

            this.dragonballArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * DBZCCG.CardGroup.maxDisplaySize * 1.35, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);
            this.dragonballArea.position.x = MathHelper.rotateVector(this.dirVector).x * (DBZCCG.Player.Field.Width / 3.575 - DBZCCG.Card.cardWidth * 1.5);

            this.cardsInPlayArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);

            this.asideCardsArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);
            this.floatingEffectsArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);

            this.locationCardsArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);
            this.floatingEffectsArea.position.z = this.cardsInPlayArea.position.z = this.locationCardsArea.position.z = this.dragonballArea.position.z = this.dirVector.clone().multiplyScalar(1.1).z;

            this.floatingEffectsArea.position.x = this.mainPersonality.surroundingArea.position.x = -MathHelper.rotateVector(this.dirVector).x * (DBZCCG.Player.Field.Width / 9.30);
            this.locationCardsArea.position.x = this.asideCardsArea.position.x = this.deckArea.position.x = -MathHelper.rotateVector(this.dirVector).x * (DBZCCG.Player.Field.Width / 4.65);

            this.masteryArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 1.2, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);
            this.senseiArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 1.2, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);

            this.senseiArea.position.z = this.masteryArea.position.z = this.allyArea.position.z = this.asideCardsArea.position.z = this.dirVector.clone().multiplyScalar(1.5 * 1.875 * DBZCCG.Card.cardHeight).z * 1.4675;

            this.masteryArea.position.x = -MathHelper.rotateVector(this.dirVector).x * (DBZCCG.Player.Field.Width / 7.45);
            this.senseiArea.position.x = -MathHelper.rotateVector(this.dirVector).x * (DBZCCG.Player.Field.Width / 12.25);

            this.field.add(this.masteryArea);
            this.field.add(this.senseiArea);
            this.field.add(this.floatingEffectsArea);
            this.field.add(this.activePersonalityArea);
            this.field.add(this.allyArea);
            this.field.add(this.locationCardsArea);
            this.field.add(this.asideCardsArea);
            this.field.add(this.cardsInPlayArea);
            this.field.add(this.nonCombatArea);
            this.field.add(this.dragonballArea);
            this.field.add(this.drillArea);
            this.field.add(this.deckArea);
            /* End of area creation */

            /* Setting the positions */
            this.fieldCardsRotation = new THREE.Euler(-this.dirVector.z * Math.PI / 2, 0, 0);

            this.nonCombats.position = this.nonCombatArea.getCenterCoords();
            this.nonCombats.rotation.x = this.fieldCardsRotation.x;

            this.drills.position = this.drillArea.getCenterCoords();
            this.drills.rotation.x = this.fieldCardsRotation.x;

            this.dragonballs.position = this.dragonballArea.getCenterCoords();
            this.dragonballs.rotation.x = this.fieldCardsRotation.x;

            this.setAside.position = this.asideCardsArea.getCenterCoords();
            this.setAside.rotation.x = this.fieldCardsRotation.x;

            this.fieldCards.position = this.locationCardsArea.getCenterCoords();
            this.fieldCards.rotation.x = this.fieldCardsRotation.x;

            this.floatingEffects.position = this.floatingEffectsArea.getCenterCoords();
            this.floatingEffects.rotation.x = this.fieldCardsRotation.x;

            this.inPlay.position = this.cardsInPlayArea.getCenterCoords();
            this.inPlay.rotation.x = this.fieldCardsRotation.x;
            /* End of setting the positions */

            this.lifeDeck.addToField(lifeDeckPos, this.deckArea, this.dirVector);
            this.lifeDeck.setOwnerCallback(this.mainPersonality.displayName);

            this.discardPile.addToField(discardPilePos, this.deckArea, this.dirVector);
            this.discardPile.setOwnerCallback(this.mainPersonality.displayName);

            this.removedFromTheGame.addToField(removedFromTheGamePos, this.deckArea, this.dirVector);
            this.removedFromTheGame.setOwnerCallback(this.mainPersonality.displayName);

            this.hand.addToField(this.field, this.dirVector, this.posVector);

            this.dragonballs.addToField(this.field, this.dirVector);
            this.drills.addToField(this.field, this.dirVector);
            this.nonCombats.addToField(this.field, this.dirVector);
            this.setAside.addToField(this.field, this.dirVector);
            this.inPlay.addToField(this.field, this.dirVector);
            this.fieldCards.addToField(this.field, this.dirVector);
            this.floatingEffects.addToField(this.field, this.dirVector);


//            this.surroundingArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Player.Field.Width, DBZCCG.Player.Field.Height, DBZCCG.Player.Field.cornerWidth);
//            this.surroundingArea.removeLabelText();
            //            this.field.add(this.surroundingArea);
            scene.add(this.field);
        };

        this.discardPile = DBZCCG.DiscardPile.create(dataObject.discardPile, this);
        this.removedFromTheGame = DBZCCG.RemovedPile.create(dataObject.removedPile);

        this.nonCombats = DBZCCG.CardGroup.create(dataObject.nonCombats);
        this.drills = DBZCCG.CardGroup.create(dataObject.drills);
        this.dragonballs = DBZCCG.CardGroup.create(dataObject.dragonballs);
        this.setAside = DBZCCG.CardGroup.create(dataObject.setAside);
        this.inPlay = DBZCCG.CardGroup.create(dataObject.inPlay);
        this.fieldCards = DBZCCG.CardGroup.create(dataObject.fieldCards);
        this.floatingEffects = DBZCCG.CardGroup.create(dataObject.floatingEffects);
        this.floatingEffects.name = 'floatingEffects';

        this.floatingEffects.groupMaxWidth = this.inPlay.groupMaxWidth = this.fieldCards.groupMaxWidth = this.setAside.groupMaxWidth = 1.1 * DBZCCG.Card.cardWidth;

        this.allies = null;
        this.mastery = null;
        this.hand = DBZCCG.CardGroup.create(dataObject.hand);

        this.mainPersonality = DBZCCG.MainPersonality.create(dataObject.mainPersonality);
        //            this.mastery = Mastery.create(dataObject.mastery);

        // To be shown in messages

        pronome = 'his';

        this.name = dataObject.name;

        if (this.mainPersonality.currentPersonality().personality instanceof Array) {
            for (var i = 0; i < this.mainPersonality.currentPersonality().personality.length; i++) {
                if (DBZCCG.Personality.FemaleList.indexOf(this.mainPersonality.currentPersonality().personality[i]) !== -1) {
                    pronome = 'her';
                }
            }
        } else {
            if (DBZCCG.Personality.FemaleList.indexOf(this.mainPersonality.currentPersonality().personality) !== -1) {
                pronome = 'her';
            }
        }

        this.lifeDeck = DBZCCG.LifeDeck.create(dataObject.lifeDeck);
        //            this.sensei = Sensei.create(dataObject.sensei);



        if (this.sensei) {
            //              this.senseiDeck = loadCards(dataObject.senseiDeck);
            //Load SenseiDeck and Sensei Card
        }

        //            this.mastery = tableCards.mastery;
        if (this.mastery) {
            //loadMastery
        }

    }
    return new PlayerObject(dataObject, vec);

}
;