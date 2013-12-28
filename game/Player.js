Player = {};

Player.Field = {};

Player.Field.cornerWidth = 0.1;
Player.Field.Height = 30;
Player.Field.Width = 50;

Player.create = function(dataObject, vec) {

    function PlayerObject(dataObject, vec) {

        this.dirVector = vec.clone().normalize();
        this.posVector = vec.clone();
        this.distanceFromCenter = vec.length();

        this.loadPlayerSpace = function(scene) {
            this.field = new THREE.Object3D();
            this.field.name = "campo";
            var mainPersonalityPos = this.dirVector.clone();
            mainPersonalityPos.multiplyScalar(Player.Field.Height/5 + this.distanceFromCenter);
            var lifeDeckPos = mainPersonalityPos.clone();
            lifeDeckPos.add(MathHelper.rotateVector(this.dirVector.clone().normalize().multiplyScalar(Player.Field.Width/2.5)));
            
            this.mainPersonality.addToField(mainPersonalityPos, this.field);
            this.lifeDeck.addToField(lifeDeckPos, this.field);
            this.lifeDeck.turnThisWay(this.dirVector);
            this.lifeDeck.setOwnerCallback(this.mainPersonality.displayName);
            this.surroundingArea = Table.createSurroundingArea(this.posVector, Player.Field.Width, Player.Field.Height, Player.Field.cornerWidth);

            this.field.add(this.surroundingArea);
            scene.add(this.field);
        };

        function loadCards(cardList) {
            var cards = [];
            for (var i = 0; i < cardList.length; i++) {
                var card = cardList[i];
            }
            return cards;
        }

        this.lifeDeck = null;
        this.discardPile = null;
        this.removedFromTheGame = null;
        this.allies = null;
        this.mastery = null;

        this.mainPersonality = MainPersonality.create(dataObject.mainPersonality);
//            this.mastery = Mastery.create(dataObject.mastery);
        this.lifeDeck = LifeDeck.create(dataObject.lifeDeck);
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