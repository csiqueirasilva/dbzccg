DBZCCG.Player = {};

DBZCCG.Player.Field = {};

DBZCCG.Player.Field.cornerWidth = 0.1;
DBZCCG.Player.Field.Height = 30;
DBZCCG.Player.Field.Width = 100;

DBZCCG.Player.create = function(dataObject, vec) {

    function PlayerObject(dataObject, vec) {

        this.dirVector = vec.clone().normalize();
        this.posVector = vec.clone();
        this.distanceFromCenter = vec.length();

        this.loadPlayerSpace = function(scene) {
            this.field = new THREE.Object3D();
            this.field.name = "field";
            var mainPersonalityPos = this.dirVector.clone();
            mainPersonalityPos.multiplyScalar(DBZCCG.Player.Field.Height/5);
            var discardPilePos = mainPersonalityPos.clone().multiplyScalar(1.75);
            discardPilePos.add(MathHelper.rotateVector(this.dirVector.clone().normalize().multiplyScalar(DBZCCG.Card.cardWidth * -0.6)));
            var lifeDeckPos = mainPersonalityPos.clone().multiplyScalar(1.75);
            lifeDeckPos.add(MathHelper.rotateVector(this.dirVector.clone().normalize().multiplyScalar(DBZCCG.Card.cardWidth * 0.6)));
            var removedFromTheGamePos = mainPersonalityPos.clone().multiplyScalar(0.75);
            removedFromTheGamePos.add(MathHelper.rotateVector(this.dirVector.clone().normalize().multiplyScalar(DBZCCG.Card.cardWidth * -0.6)));

            this.mainPersonality.addToField(mainPersonalityPos, this.field);
            
            /* Beginning of area creation */
            this.deckArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5, DBZCCG.Card.cardHeight * 2.5, DBZCCG.Player.Field.cornerWidth);

            this.nonCombatArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * DBZCCG.CardGroup.maxDisplaySize * 1.35, DBZCCG.Card.cardHeight * 1.2 , DBZCCG.Player.Field.cornerWidth);
            this.nonCombatArea.position.x = MathHelper.rotateVector(this.dirVector).x * ( DBZCCG.Player.Field.Width/3.575 - DBZCCG.Card.cardWidth * 1.5 );

            this.allyArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Player.Field.Width * 0.432 , DBZCCG.Player.Field.Height * 0.94, DBZCCG.Player.Field.cornerWidth);
            this.allyArea.position.x = -MathHelper.rotateVector(this.dirVector).x * ( DBZCCG.Player.Field.Width/3.65 );

            this.deckArea.position.x = MathHelper.rotateVector(this.dirVector).x * ( DBZCCG.Player.Field.Width/2 - DBZCCG.Card.cardWidth * 1.5 );
            this.allyArea.position.z = this.nonCombatArea.position.z = this.mainPersonality.surroundingArea.position.z = this.deckArea.position.z = this.dirVector.clone().multiplyScalar(1.1).z;
            
            this.drillArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * DBZCCG.CardGroup.maxDisplaySize * 1.35, DBZCCG.Card.cardHeight * 1.2 , DBZCCG.Player.Field.cornerWidth);
            this.drillArea.position.x = MathHelper.rotateVector(this.dirVector).x * ( DBZCCG.Player.Field.Width/3.575 - DBZCCG.Card.cardWidth * 1.5 );
            this.drillArea.position.z = this.dirVector.clone().multiplyScalar(1.5 * DBZCCG.Card.cardHeight).z;
            
            this.dragonballArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * DBZCCG.CardGroup.maxDisplaySize * 1.35, DBZCCG.Card.cardHeight * 1.2 , DBZCCG.Player.Field.cornerWidth);
            this.dragonballArea.position.x = MathHelper.rotateVector(this.dirVector).x * ( DBZCCG.Player.Field.Width/3.575 - DBZCCG.Card.cardWidth * 1.5 );
            this.dragonballArea.position.z = this.dirVector.clone().multiplyScalar(1.5 * DBZCCG.Card.cardHeight).z * 1.875;
            
            this.cardsInPlayArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5 , DBZCCG.Card.cardHeight * 1.2 , DBZCCG.Player.Field.cornerWidth);
            this.cardsInPlayArea.position.z = this.dirVector.clone().multiplyScalar(1.5 * 1.875 * DBZCCG.Card.cardHeight).z;

            this.asideCardsArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5 , DBZCCG.Card.cardHeight * 1.2 , DBZCCG.Player.Field.cornerWidth);
            this.asideCardsArea.position.z = this.dirVector.clone().multiplyScalar(1.5 * 1.875 * DBZCCG.Card.cardHeight).z;
            this.asideCardsArea.position.x = this.deckArea.position.x;
            
            this.locationCardsArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5 , DBZCCG.Card.cardHeight * 1.2 , DBZCCG.Player.Field.cornerWidth);
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
            this.fieldCardsRotation = new THREE.Euler(-this.dirVector.z * Math.PI/2, 0, 0);
            
            this.nonCombats.position = this.nonCombatArea.position.clone();
            this.nonCombats.position.z *= DBZCCG.Card.cardHeight*0.825;
            this.nonCombats.position.x *= 1.025 + MathHelper.rotateVector(this.dirVector).x*0.05;
            this.nonCombats.rotation.x = this.fieldCardsRotation.x;
            
            this.drills.position = this.drillArea.position.clone();
            this.drills.position.z *= DBZCCG.Card.cardHeight*0.265;
            this.drills.position.x *= 1.025 + MathHelper.rotateVector(this.dirVector).x*0.05;
            this.drills.rotation.x = this.fieldCardsRotation.x;
            
            this.dragonballs.position = this.dragonballArea.position.clone();
            this.dragonballs.position.z *= DBZCCG.Card.cardHeight*0.225;
            this.dragonballs.position.x *= 1.025 + MathHelper.rotateVector(this.dirVector).x*0.05;
            this.dragonballs.rotation.x = this.fieldCardsRotation.x;
            
            this.setAside.position = this.asideCardsArea.position.clone();
            this.setAside.position.z *= DBZCCG.Card.cardHeight*0.225;
            this.setAside.position.x *= 1 + MathHelper.rotateVector(this.dirVector).x*0.025;
            this.setAside.rotation.x = this.fieldCardsRotation.x;
            
            this.fieldCards.position = this.locationCardsArea.position.clone();
            this.fieldCards.position.z *= DBZCCG.Card.cardHeight*0.21125;
            this.fieldCards.position.x *= 1 + MathHelper.rotateVector(this.dirVector).x*0.025;
            this.fieldCards.rotation.x = this.fieldCardsRotation.x;
            
            this.inPlay.position = this.cardsInPlayArea.position.clone();
            this.inPlay.position.z *= DBZCCG.Card.cardHeight*0.225;
            this.inPlay.position.x += 0.5 + MathHelper.rotateVector(this.dirVector).x*0.025;
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