DBZCCG.Player = {};

DBZCCG.Player.Field = {};

DBZCCG.Player.Field.cornerWidth = 0.1;
DBZCCG.Player.Field.Height = 30;
DBZCCG.Player.Field.Width = 100;

DBZCCG.Player.create = function(dataObject, vec) {

    function PlayerObject(dataObject, vec) {

        var pronome;

        this.dirVector = vec.clone().normalize();
        this.posVector = vec.clone();
        this.distanceFromCenter = vec.length();

        /* Game variables */
        this.handOnTable = false;
        this.cardDiscardPhaseLimit = 1;

        this.drawPhaseEnabled = true;
        this.nonCombatPhaseEnabled = true;
        this.purPhaseEnabled = true;
        this.declarePhaseEnabled = true;
        this.combatPhaseEnabled = true;
        this.discardPhaseEnabled = true;
        this.rejuvenationPhaseEnabled = true;

        /* Game functions */

        this.rejuvenationPhase = function() {
            DBZCCG.performingTurn = true;

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
                DBZCCG.quickMessage(player.mainPersonality.displayName() + " sent the top card of " + pronome + " Discard Pile (" + cardName + ") into the bottom of " + pronome + " Life Deck.");
            });

            animation.chain(secondAnimation);

            secondAnimation.onComplete(function() {
                DBZCCG.performingTurn = false;
            });

            animation.start();
        };

        this.discardPhase = function() {
            if (this.hand.cards.length > this.cardDiscardPhaseLimit) {
                DBZCCG.performingTurn = true;
                var elem = $(DBZCCG.toolTip.content).children('#tooltipDiscard')[0];

                DBZCCG.toolTip.callbacks.push(function() {

                    $(DBZCCG.toolTip.content).children('#tooltipDiscard').hide();
                    var clicked = DBZCCG.toolTip.parent;
                    var i = 0;
                    for (; i < player.hand.cards.length && clicked !== player.hand.cards[i].display; i++)
                        ;

                    if (i !== player.hand.cards.length) {
                        DBZCCG.toolTip.idxHand = i;
                        $(DBZCCG.toolTip.content).children('#tooltipDiscard').show();
                    }
                    
                });
                
                var callbackIdx = DBZCCG.toolTip.callbacks.length - 1;
                var player = this;
                elem.onclick = function() {
                    
                    $(DBZCCG.toolTip.content).children('#tooltipDiscard').hide();
                    $('#hud').qtip('hide');
                    
                    player.transferCards("hand", [DBZCCG.toolTip.idxHand], "discardPile", player.discardPile.cards.length);

                    if (player.hand.cards.length === player.cardDiscardPhaseLimit) {
                        elem.onclick = null;
                        DBZCCG.performingTurn = false;
                        DBZCCG.toolTip.callbacks.splice(callbackIdx, 1);
                    }
                    
                    DBZCCG.toolTip.idxHand = undefined;
                };
            }
        };

        this.declarePhase = function() {
            DBZCCG.performingTurn = true;
            document.getElementById('combat-btn').onclick();
            $('#combat-btn').show();
        };

        this.purPhase = function() {
            var pur = this.mainPersonality.currentPersonality().PUR;
            this.mainPersonality.raiseZScouter(pur);
        };

        this.nonCombatPhase = function() {
            DBZCCG.performingTurn = true;
            DBZCCG.passMessage = 'Advance to the Power UP Phase?';
            $('#pass-btn').show();
        };

        this.drawPhase = function() {
            DBZCCG.performingAction.drawTopCards(3, "lifeDeck");
        };

        this.transferCards = function(src, srcCards, destiny, pilePosition, noMessage) {

            var card = [];
            var action;
            var destinyString;
            var sourceString;

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
                this[destiny].addCard(card);

                if (destiny === "hand") {
                    destinyString = "hand";
                } else {
                    destinyString = "field";
                }

            } else /* to Pile */ {
                this[destiny].addCard(pilePosition ? pilePosition : this[destiny].cards.length, card);

                destinyString = this[destiny].display.name;
            }

            if (!noMessage) {
                var msg = this.mainPersonality.displayName() + " " + action + " " + cardString + " from " + pronome + " " + sourceString + " into " + pronome + " " + destinyString + ".";

                DBZCCG.quickMessage(msg);
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

            var card = [];

            for (var j = 0; j < i; j++) {
                card.push(this[sourcePile].removeCardByIdx(j));
            }

            this.hand.addCard(card, (this === DBZCCG.performingAction || this.handOnTable) ? true : false);

            DBZCCG.quickMessage(this.mainPersonality.displayName() + " drew " + n + " card" + ((n > 1) ? "s" : "") + " from the bottom of the " + this[sourcePile].display.name + ".");

        };

        this.drawTopCards = function(n, sourcePile) {

            var i;

            if (n > this[sourcePile].cards.length) {
                // trigger not enough cards
                i = 0;
            } else {
                i = this[sourcePile].cards.length - n;
            }

            var card = [];

            for (var j = this[sourcePile].cards.length - 1; j >= i; j--) {
                card.push(this[sourcePile].removeCardByIdx(j));
            }

            this.hand.addCard(card, (this === DBZCCG.performingAction || this.handOnTable) ? true : false);

            DBZCCG.quickMessage(this.mainPersonality.displayName() + " drew " + n + " card" + ((n > 1) ? "s" : "") + " from the top of the " + this[sourcePile].display.name + ".");
        };

        /* End of game functions */

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

            this.allyArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Player.Field.Width * 0.432, DBZCCG.Player.Field.Height * 0.94, DBZCCG.Player.Field.cornerWidth);
            this.allyArea.position.x = -MathHelper.rotateVector(this.dirVector).x * (DBZCCG.Player.Field.Width / 3.65);

            this.deckArea.position.x = MathHelper.rotateVector(this.dirVector).x * (DBZCCG.Player.Field.Width / 2 - DBZCCG.Card.cardWidth * 1.5);
            this.allyArea.position.z = this.nonCombatArea.position.z = this.mainPersonality.surroundingArea.position.z = this.deckArea.position.z = this.dirVector.clone().multiplyScalar(1.1).z;

            this.drillArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * DBZCCG.CardGroup.maxDisplaySize * 1.35, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);
            this.drillArea.position.x = MathHelper.rotateVector(this.dirVector).x * (DBZCCG.Player.Field.Width / 3.575 - DBZCCG.Card.cardWidth * 1.5);
            this.drillArea.position.z = this.dirVector.clone().multiplyScalar(1.5 * DBZCCG.Card.cardHeight).z;

            this.dragonballArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * DBZCCG.CardGroup.maxDisplaySize * 1.35, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);
            this.dragonballArea.position.x = MathHelper.rotateVector(this.dirVector).x * (DBZCCG.Player.Field.Width / 3.575 - DBZCCG.Card.cardWidth * 1.5);
            this.dragonballArea.position.z = this.dirVector.clone().multiplyScalar(1.5 * DBZCCG.Card.cardHeight).z * 1.875;

            this.cardsInPlayArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);
            this.cardsInPlayArea.position.z = this.dirVector.clone().multiplyScalar(1.5 * 1.875 * DBZCCG.Card.cardHeight).z;

            this.asideCardsArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);
            this.asideCardsArea.position.z = this.dirVector.clone().multiplyScalar(1.5 * 1.875 * DBZCCG.Card.cardHeight).z;
            this.asideCardsArea.position.x = this.deckArea.position.x;

            this.locationCardsArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5, DBZCCG.Card.cardHeight * 1.2, DBZCCG.Player.Field.cornerWidth);
            this.locationCardsArea.position.z = this.dirVector.clone().multiplyScalar(1.5 * 1.875 * DBZCCG.Card.cardHeight).z * 1.4675;
            this.locationCardsArea.position.x = this.deckArea.position.x;

            this.allyArea.changeLabelText("Allies");
            this.locationCardsArea.changeLabelText("Field");
            this.asideCardsArea.changeLabelText("Set");
            this.cardsInPlayArea.changeLabelText("In play");
            this.dragonballArea.changeLabelText("Dragonballs");
            this.nonCombatArea.changeLabelText("Non-Combats");
            this.drillArea.changeLabelText("Drills");
            this.deckArea.changeLabelText("Deck");
            this.mainPersonality.surroundingArea.changeLabelText("Main Personality");

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

            this.nonCombats.position = this.nonCombatArea.position.clone();
            this.nonCombats.position.z *= DBZCCG.Card.cardHeight * 0.825;
            this.nonCombats.position.x *= 1.025 + MathHelper.rotateVector(this.dirVector).x * 0.05;
            this.nonCombats.rotation.x = this.fieldCardsRotation.x;

            this.drills.position = this.drillArea.position.clone();
            this.drills.position.z *= DBZCCG.Card.cardHeight * 0.265;
            this.drills.position.x *= 1.025 + MathHelper.rotateVector(this.dirVector).x * 0.05;
            this.drills.rotation.x = this.fieldCardsRotation.x;

            this.dragonballs.position = this.dragonballArea.position.clone();
            this.dragonballs.position.z *= DBZCCG.Card.cardHeight * 0.225;
            this.dragonballs.position.x *= 1.025 + MathHelper.rotateVector(this.dirVector).x * 0.05;
            this.dragonballs.rotation.x = this.fieldCardsRotation.x;

            this.setAside.position = this.asideCardsArea.position.clone();
            this.setAside.position.z *= DBZCCG.Card.cardHeight * 0.225;
            this.setAside.position.x *= 1 + MathHelper.rotateVector(this.dirVector).x * 0.025;
            this.setAside.rotation.x = this.fieldCardsRotation.x;

            this.fieldCards.position = this.locationCardsArea.position.clone();
            this.fieldCards.position.z *= DBZCCG.Card.cardHeight * 0.21125;
            this.fieldCards.position.x *= 1 + MathHelper.rotateVector(this.dirVector).x * 0.025;
            this.fieldCards.rotation.x = this.fieldCardsRotation.x;

            this.inPlay.position = this.cardsInPlayArea.position.clone();
            this.inPlay.position.z *= DBZCCG.Card.cardHeight * 0.225;
            this.inPlay.position.x += 0.5 + MathHelper.rotateVector(this.dirVector).x * 0.025;
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

            this.surroundingArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Player.Field.Width, DBZCCG.Player.Field.Height, DBZCCG.Player.Field.cornerWidth);
            this.surroundingArea.removeLabelText();
            this.field.add(this.surroundingArea);
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