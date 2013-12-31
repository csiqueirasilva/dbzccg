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
            this.field.name = "campo";
            var mainPersonalityPos = this.dirVector.clone();
            mainPersonalityPos.multiplyScalar(DBZCCG.Player.Field.Height/5);
            var lifeDeckPos = mainPersonalityPos.clone().multiplyScalar(1.75);
            lifeDeckPos.add(MathHelper.rotateVector(this.dirVector.clone().normalize().multiplyScalar(DBZCCG.Card.cardWidth * -0.6)));
            var discardPilePos = mainPersonalityPos.clone().multiplyScalar(1.75);
            discardPilePos.add(MathHelper.rotateVector(this.dirVector.clone().normalize().multiplyScalar(DBZCCG.Card.cardWidth * 0.6)));
            var removedFromTheGamePos = mainPersonalityPos.clone().multiplyScalar(0.75);
            removedFromTheGamePos.add(MathHelper.rotateVector(this.dirVector.clone().normalize().multiplyScalar(DBZCCG.Card.cardWidth * -0.6)));

            this.mainPersonality.addToField(mainPersonalityPos, this.field);
            
            this.deckArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Card.cardWidth * 2.5, DBZCCG.Card.cardHeight * 2.5, DBZCCG.Player.Field.cornerWidth);

            this.lifeDeck.addToField(lifeDeckPos, this.deckArea, this.dirVector);
            this.lifeDeck.setOwnerCallback(this.mainPersonality.displayName);
            
            this.discardPile.addToField(discardPilePos, this.deckArea, this.dirVector);
            this.discardPile.setOwnerCallback(this.mainPersonality.displayName);
            
            this.removedFromTheGame.addToField(removedFromTheGamePos, this.deckArea, this.dirVector);
            this.removedFromTheGame.setOwnerCallback(this.mainPersonality.displayName);
            
            this.deckArea.position.x = MathHelper.rotateVector(this.dirVector).x * 14;
            this.deckArea.position.z = this.dirVector.clone().multiplyScalar(1.1).z;
            
            this.mainPersonality.surroundingArea.position.z = this.dirVector.clone().multiplyScalar(1.1).z;

            this.hand.addToField(this.field, this.posVector, this.dirVector);
            
            this.field.add(this.deckArea);
            
            this.surroundingArea = DBZCCG.Table.createSurroundingArea(this.posVector, DBZCCG.Player.Field.Width, DBZCCG.Player.Field.Height, DBZCCG.Player.Field.cornerWidth);

            this.field.add(this.surroundingArea);
            scene.add(this.field);
        };

        this.discardPile = DBZCCG.DiscardPile.create(dataObject.discardPile);
        this.removedFromTheGame = DBZCCG.RemovedPile.create(dataObject.removedPile);

        this.allies = null;
        this.mastery = null;
        this.hand = DBZCCG.Hand.create(dataObject.hand);

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