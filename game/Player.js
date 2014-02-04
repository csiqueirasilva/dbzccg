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
        $(DBZCCG.toolTip.content).children('#tooltipDiscard').show();
    },
    priority: 1};

DBZCCG.Player.AIPlay = function(player, pass) {
    if (player.usableCards.length === 0) {
        if (pass) {
            DBZCCG.logMessage(DBZCCG.passLog);
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

        this.drawPhaseEnabled = true;
        this.nonCombatPhaseEnabled = true;
        this.purPhaseEnabled = true;
        this.declarePhaseEnabled = true;
        this.combatPhaseEnabled = true;
        this.discardPhaseEnabled = true;
        this.rejuvenationPhaseEnabled = true;

        /* Game functions */

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

            passiveEffects.sort(DBZCCG.compareCallbacks);

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
                if (currentPersonality.activable(this)) {
                    this.addUsableCard(currentPersonality.display);
                } else {
                    this.removeUsableCard(currentPersonality.display);
                }
            }

            var cardGroups = ['hand', 'nonCombats'];

            // check cardgroups
            for (var j = 0; j < cardGroups.length; j++) {
                for (var i = 0; i < this[cardGroups[j]].cards.length; i++) {
                    if (this[cardGroups[j]].cards[i].activable instanceof Function || this[cardGroups[j]].cards[i].playable instanceof Function) {
                        if ((this[cardGroups[j]].cards[i].playable instanceof Function && this[cardGroups[j]].cards[i].playable(this)) ||
                                (this[cardGroups[j]].cards[i].activable instanceof Function && this[cardGroups[j]].cards[i].activable(this))) {
                            this.addUsableCard(this[cardGroups[j]].cards[i].display);
                        } else {
                            this.removeUsableCard(this[cardGroups[j]].cards[i].display);
                        }
                    }
                }
            }

        };

        this.takeDamage = function(damage) {
            var powerStages = damage.stages;
            var lifeCards = damage.cards;

            if (powerStages > 0) {
                if (powerStages > this.getPersonalityInControl().currentPowerStageAboveZero) {
                    lifeCards += damage.stages - this.getPersonalityInControl().currentPowerStageAboveZero;
                    damage.stages = this.getPersonalityInControl().currentPowerStageAboveZero;
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
                if (cbIdx.length > 0) {
                    player.transferCards('lifeDeck', cbIdx, 'discardPile', player.discardPile.cards.length);
                }
                player.loadLabelText();
            });

            if (lifeCards !== 0) {
                DBZCCG.Combat.hoverText("-" + lifeCards, this.lifeDeck.display, 0xFF0000);
            }

            if (damage.stages !== 0) {
                this.getPersonalityInControl().raiseZScouter(-damage.stages);
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

                DBZCCG.performingTurn = true;
                DBZCCG.performingAction = DBZCCG.attackingPlayer;

                DBZCCG.listActions.splice(0, 0, DBZCCG.swapPlayers);

                DBZCCG.performingAction.clearUsableCards();
                DBZCCG.performingAction.checkUsableCards();

                DBZCCG.passLog = DBZCCG.attackingPlayer.displayName() + " has passed the chance to perform an action.";

                if (!DBZCCG.attackingPlayer.onlyDefend) {
                    // TODO: run floating effects
                    if (DBZCCG.attackingPlayer === DBZCCG.mainPlayer) {
                        DBZCCG.waitingMainPlayerMouseCommand = true;
                        DBZCCG.passMessage = 'Pass the chance to perform an action?';
                        $('#pass-btn').show();
                        if (DBZCCG.attackingPlayer.hand.cards.length > 0) {
                            $('#final-physical-btn').show();
                        }
                    } else {
                        DBZCCG.Player.AIPlay(DBZCCG.attackingPlayer, true);
                        DBZCCG.performingTurn = false;
                    }
                } else {
                    DBZCCG.attackingPlayer.passed = true;
                    DBZCCG.performingTurn = false;
                }
            });

            DBZCCG.defendingPlayer.checkPassiveEffects();
            DBZCCG.defendingPlayer.checkRulesCompliance();
            DBZCCG.attackingPlayer.checkPassiveEffects();
            DBZCCG.attackingPlayer.checkRulesCompliance();

            DBZCCG.performingTurn = false;
        };

        this.defenderDefends = function(card) {

            DBZCCG.performingTurn = true;

            var player = this;
            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.performingTurn = true;
                DBZCCG.performingAction = DBZCCG.defendingPlayer;
                //debug
                card.success = true;
                DBZCCG.performingAction.clearUsableCards();
                DBZCCG.performingAction.checkUsableCards();
                DBZCCG.passLog = player.displayName() + " passed the opportunity to defend the attack.";
                if (DBZCCG.defendingPlayer === player) {
                    if (DBZCCG.mainPlayer === player) {
                        DBZCCG.waitingMainPlayerMouseCommand = true;
                        DBZCCG.passMessage = 'Pass the opportunity to defend?';
                        $('#pass-btn').show();
                    } else {
                        DBZCCG.Player.AIPlay(player);
                        DBZCCG.performingTurn = false;
                    }
                }
            });

            DBZCCG.defendingPlayer.checkPassiveEffects();
            DBZCCG.defendingPlayer.checkRulesCompliance();

            DBZCCG.attackingPlayer.checkPassiveEffects();
            DBZCCG.attackingPlayer.checkRulesCompliance();

            DBZCCG.performingTurn = false;
        };

        this.getPersonalityInControl = function() {
            return this.mainPersonality.currentPersonality();
        };

        this.combatPhase = function(listActions) {

            // run when entering combat effects

            for (var i = 0; i < this.combatEnteringCallback.length; i++) {
                if (this.combatEnteringCallback[i].f instanceof Function) {
                    var ret = this.combatEnteringCallback[i].f(DBZCCG.defendingPlayer);
                    if (ret instanceof Object) {
                        // Check return
                    } else if (ret === DBZCCG.cancelAction) {
                        return;
                    }
                }
            }

            var player = this;
            DBZCCG.performingAction = DBZCCG.defendingPlayer;
            var defenderSourcePile = 'lifeDeck';
            var defenderQuantityDraw = 3;
            for (var i = 0; i < DBZCCG.defendingPlayer.combatEnteringCallback.length; i++) {
                if (DBZCCG.defendingPlayer.combatEnteringCallback[i].f instanceof Function) {
                    var ret = DBZCCG.defendingPlayer.combatEnteringCallback[i].f(this);
                    if (ret instanceof Object) {
                        // Check return
                    } else if (ret instanceof Object) {
                        if (ret.defenderSourcePile) {
                            defenderSourcePile = ret.defenderSourcePile;
                        }
                        if (typeof ret.defenderQuantityDraw === "number") {
                            defenderQuantityDraw = ret.defenderQuantityDraw;
                        }
                    } else if (ret === DBZCCG.cancelAction) {
                        return;
                    }
                }
            }

            DBZCCG.defendingPlayer.drawTopCards(defenderQuantityDraw, defenderSourcePile);

            DBZCCG.swapPlayers = function() {
                if (DBZCCG.attackingPlayer.passed && DBZCCG.defendingPlayer.passed) {
                    DBZCCG.performingAction = player;
                    DBZCCG.logMessage("The combat is over.");

                    // run leave from combat effects
                    for (var i = 0; i < DBZCCG.attackingPlayer.combatLeavingCallback.length; i++) {
                        if (DBZCCG.attackingPlayer.combatLeavingCallback[i].f instanceof Function) {
                            DBZCCG.attackingPlayer.combatLeavingCallback[i].f(DBZCCG.defendingPlayer);
                        }
                    }

                    // run leave from combat effects
                    for (var i = 0; i < DBZCCG.defendingPlayer.combatLeavingCallback.length; i++) {
                        if (DBZCCG.defendingPlayer.combatLeavingCallback[i].f instanceof Function) {
                            DBZCCG.defendingPlayer.combatLeavingCallback[i].f(DBZCCG.attackingPlayer);
                        }
                    }

                    DBZCCG.attackingPlayer.clearUsableCards();
                    DBZCCG.defendingPlayer.clearUsableCards();

                    DBZCCG.defendingPlayer = null;
                    DBZCCG.attackingPlayer = null;

                    DBZCCG.combat = false;
                    DBZCCG.swapPlayers = undefined;

                } else {
                    var aux = DBZCCG.attackingPlayer;
                    DBZCCG.attackingPlayer = DBZCCG.defendingPlayer;
                    DBZCCG.defendingPlayer = aux;
                    listActions.splice(0, 0, DBZCCG.attackingPlayer.attackerAttacks);
                }
            };

            listActions.splice(0, 0, this.attackerAttacks);
        };

        this.rejuvenationPhase = function() {
            if (this.discardPile.cards.length > 0) {
                DBZCCG.performingTurn = true;
                if (DBZCCG.performingAction === DBZCCG.mainPlayer) {
                    DBZCCG.waitingMainPlayerMouseCommand = true;
                    document.getElementById('rejuvenate-btn').onclick();
                    $('#rejuvenate-btn').show();
                } else {
                    this.rejuvenate();
                }
            }
        };

        this.rejuvenate = function() {
            var botPos = this.lifeDeck.display.position.clone();
            var topPos = botPos.clone();
            topPos.y = 5;

            var animation = new TWEEN.Tween(this.lifeDeck.display.position).to(topPos, 200);
            var secondAnimation = new TWEEN.Tween(this.lifeDeck.display.position).to(botPos, 200);

            secondAnimation.delay(300);

            var player = this;
            animation.onComplete(function() {
                var cardName = player.discardPile.cards[player.discardPile.cards.length - 1].name;
                player.transferCards("discardPile", [player.discardPile.cards.length - 1], "lifeDeck", 0, true);
                DBZCCG.logMessage(player.mainPersonality.displayName() + " sent the top card of " + pronome + " Discard Pile (" + cardName + ") into the bottom of " + pronome + " Life Deck.");
            });

            animation.chain(secondAnimation);

            secondAnimation.onComplete(function() {
                DBZCCG.performingTurn = false;
            });

            animation.start();
        };


        this.displayName = function() {
            return this.name;
        };

        this.discardPhase = function() {
            if (this.hand.cards.length > this.cardDiscardPhaseLimit) {
                DBZCCG.performingTurn = true;
                var elem = $(DBZCCG.toolTip.content).children('#tooltipDiscard')[0];

                for (var i = 0; i < this.hand.cards.length; i++) {
                    this.hand.cards[i].display.addCallback(DBZCCG.Player.discardCallback);
                }

                var player = this;
                elem.onclick = function() {
                    $('#hud').qtip('hide');

                    player.transferCards("hand", [DBZCCG.toolTip.idxHand], "discardPile", player.discardPile.cards.length);

                    if (player.hand.cards.length === player.cardDiscardPhaseLimit) {
                        DBZCCG.waitingMainPlayerMouseCommand = false;

                        elem.onclick = null;
                        DBZCCG.performingTurn = false;
                        for (var i = 0; i < player.hand.cards.length; i++) {
                            player.hand.cards[i].display.removeCallback(DBZCCG.Player.discardCallback);
                        }
                    }

                    DBZCCG.toolTip.parent.removeCallback(DBZCCG.Player.discardCallback);
                    DBZCCG.toolTip.idxHand = undefined;
                    DBZCCG.clearMouseOver();
                };

                if (DBZCCG.mainPlayer !== this) {
                    //TODO: AI OR P2
                    var handSize = this.hand.cards.length;
                    for (var i = handSize - 1; i > 0; i--) {
                        window.setTimeout(function() {
                            DBZCCG.toolTip.idxHand = i;
                            DBZCCG.toolTip.parent = player.hand.cards[DBZCCG.toolTip.idxHand].display;
                            elem.onclick();
                        }, i * 200);
                    }
                } else {
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
            if (DBZCCG.mainPlayer === this) {
                DBZCCG.waitingMainPlayerMouseCommand = true;
                DBZCCG.passMessage = 'Advance to the Power UP Phase?';
                DBZCCG.passLog = this.displayName() + " advanced to the Power UP Phase.";
                $('#pass-btn').show();
            } else {
                // TODO: AI OR P2
                do {
                    this.clearUsableCards();
                    this.checkUsableCards();
                    DBZCCG.Player.AIPlay(this);
                } while (this.usableCards.length > 0);
                DBZCCG.performingTurn = false;
            }
        };

        this.drawPhase = function() {
            DBZCCG.performingTurn = true;
            DBZCCG.performingAction.drawTopCards(3, "lifeDeck");
            DBZCCG.performingTurn = false;
        };


        this.combatEnteringCallback = [];

        this.removeCombatEnteringCallback = function(callback) {
            var idx = combatEnteringCallback.indexOf(callback);
            if (idx !== -1) {
                combatEnteringCallback.splice(idx, 1);
                combatEnteringCallback.sort(DBZCCG.compareCallbacks);
            }
        };

        this.addCombatEnteringCallback = function(callback) {
            var idx = combatEnteringCallback.indexOf(callback);
            if (idx === -1) {
                callback.player = this;
                combatEnteringCallback.push(callback);
                combatEnteringCallback.sort(DBZCCG.compareCallbacks);
            }
        };

        this.combatLeavingCallback = [];

        this.removeCombatLeavingCallback = function(callback) {
            var idx = combatLeavingCallback.indexOf(callback);
            if (idx !== -1) {
                combatLeavingCallback.splice(idx, 1);
                combatLeavingCallback.sort(DBZCCG.compareCallbacks);
            }
        };

        this.addCombatLeavingCallback = function(callback) {
            var idx = turnCallback.indexOf(callback);
            if (idx === -1) {
                callback.player = this;
                turnCallback.push(callback);
                turnCallback.sort(DBZCCG.compareCallbacks);
            }
        };

        this.turnCallback = [];

        this.removeTurnCallback = function(callback) {
            var idx = combatLeavingCallback.indexOf(callback);
            if (idx !== -1) {
                combatLeavingCallback.splice(idx, 1);
                combatLeavingCallback.sort(DBZCCG.compareCallbacks);
            }
        };

        this.addTurnCallback = function(callback) {
            var idx = turnCallback.indexOf(callback);
            if (idx === -1) {
                turnCallback.push(callback);
                turnCallback.sort(DBZCCG.compareCallbacks);
            }
        };

        var transferCallback = [];

        this.removeTransferCallback = function(callback) {
            var idx = transferCallback.indexOf(callback);
            if (idx !== -1) {
                transferCallback.splice(idx, 1);
                transferCallback.sort(DBZCCG.compareCallbacks);
            }
        };

        this.addTransferCallback = function(callback) {
            var idx = transferCallback.indexOf(callback);
            if (idx === -1) {
                // add all the card group and piles of the player to the callback
                callback.player = this;

                transferCallback.push(callback);
                transferCallback.sort(DBZCCG.compareCallbacks);
            }
        };

        this.transferCards = function(src, srcCards, destiny, pilePosition, noMessage, addToScene) {

            var card = [];
            var action;
            var destinyString;
            var sourceString;

            for (var i = 0; i < transferCallback.length; i++) {
                if (transferCallback[i].f instanceof Function) {
                    var ret = transferCallback[i].f(src, srcCards, destiny, pilePosition);
                    if (ret instanceof Object) {
                        if (ret.src !== undefined) {
                            src = ret.src;
                        } else if (ret.srcCards !== undefined) {
                            srcCards = ret.srcCards;
                        } else if (ret.destiny !== undefined) {
                            destiny = ret.destiny;
                        } else if (ret.pilePosition !== undefined) {
                            pilePosition = ret.pilePosition;
                        }
                    }
                }
            }

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

                cardString += card[0].name;

                if (card.length > 1) {
                    for (var i = 1; i < card.length - 1; i++) {
                        cardString += ", " + card[i].name;
                    }
                    cardString += " and " + card[card.length - 1].name;
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
                DBZCCG.logMessage(msg);
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

            DBZCCG.logMessage(this.mainPersonality.displayName() + " drew " + n + " card" + ((n > 1) ? "s" : "") + " from the bottom of the " + this[sourcePile].display.name + ".");
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

            DBZCCG.logMessage(this.mainPersonality.displayName() + " drew " + n + " card" + ((n > 1) ? "s" : "") + " from the top of the " + this[sourcePile].display.name + ".");
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

//            this.surroundingArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Player.Field.Width, DBZCCG.Player.Field.Height, DBZCCG.Player.Field.cornerWidth);
//            this.surroundingArea.removeLabelText();
//            this.field.add(this.surroundingArea);
            scene.add(this.field);
        };

        this.discardPile = DBZCCG.DiscardPile.create(dataObject.discardPile);
        this.removedFromTheGame = DBZCCG.RemovedPile.create(dataObject.removedPile);

        this.nonCombats = DBZCCG.CardGroup.create(dataObject.nonCombats);
        this.drills = DBZCCG.CardGroup.create(dataObject.drills);
        this.dragonballs = DBZCCG.CardGroup.create(dataObject.dragonballs);
        this.setAside = DBZCCG.CardGroup.create(dataObject.setAside);
        this.inPlay = DBZCCG.CardGroup.create(dataObject.inPlay);
        this.fieldCards = DBZCCG.CardGroup.create(dataObject.fieldCards);

        this.inPlay.groupMaxWidth = this.fieldCards.groupMaxWidth = this.setAside.groupMaxWidth = 1.1 * DBZCCG.Card.cardWidth;

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

};