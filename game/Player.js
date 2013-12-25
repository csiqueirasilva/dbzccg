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

            this.mainPersonality.addToField(mainPersonalityPos, this.field);

            this.surroundingArea = Table.createSurroundingArea(this.posVector, Player.Field.Width, Player.Field.Height, Player.Field.cornerWidth);

            this.field.add(this.surroundingArea);
            scene.add(this.field);
        };

        function loadCards(cardList) {
            var cards = [];
            for (var i = 0; i < cardList.length; i++) {
                var card = cardList[i];
                switch (card.type) {
                    case Card.Type.Personality:
                        card.add(Personality.create(card));
                        break;
                    case Card.Type.NonCombat:
                        card.add(NonCombat.create(card));
                        break;
                    case Card.Type.Combat:
                        card.add(Combat.create(card));
                        break;
                    case Card.Type.PhysicalCombat:
                        card.add(PhysicalCombat.create(card));
                        break;
                    case Card.Type.EnergyCombat:
                        card.add(EnergyCombat.create(card));
                        break;
                    case Card.Type.Dragonball:
                        card.add(Dragonball.create(card));
                        break;
//                        case Card.Type.Battleground:
//                            card.add(Battleground.create(card));
//                            break;
//                        case Card.Type.Location:
//                            card.add(Location.create(card));
//                            break;
//                        case Card.Type.Fusion:
//                            card.add(Fusion.create(card));
//                            break;
                    case Card.Type.Drill:
                        card.add(Drill.create(card));
                }
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
//            this.lifeDeck = loadCards(dataObject.lifeDeck);
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