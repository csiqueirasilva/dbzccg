Player = {};

Player.create = function(dataObject, vec) {

    function PlayerObject(dataObject, vec) {

        this.advanceLevel = function(delay) {
            if (this.currentMainPersonalityLevel != this.mainPersonality.personalities.length) {
                // Reorder personalities array
                var rp = [];

                var qttLevels = this.mainPersonality.personalities.length;
                for (var i = this.currentMainPersonalityLevel - 1;
                        rp.length != qttLevels;
                        i++) {
                    if (i == qttLevels) {
                        i = 0;
                    }
                    rp.push(this.mainPersonality.personalities[i]);
                }

                var lastPosition = rp[0].display.position.clone();
                var lastPosition = {x: lastPosition.x, y: lastPosition.y, z: lastPosition.z};

                var currentPosition = {x: lastPosition.x, y: lastPosition.y, z: lastPosition.z};
                var stepAside = {y: 3};
                var currentLevelStepAside = new TWEEN.Tween(currentPosition).to(stepAside, 120);

                var lastTween = currentLevelStepAside;

                var j = 1;
                var position = [];
                var target = [];
                for (var i = 1; i < rp.length; i++) {
                    var pos = rp[i].display.position.clone();
                    position[i] = {x: pos.x, y: pos.y, z: pos.z};
                    target[i] = lastPosition;
                    var currTween = new TWEEN.Tween(position[i]).to(target[i], 80);
                    currTween.onUpdate(function() {
                        rp[j].display.position.x = position[j].x;
                        rp[j].display.position.y = position[j].y;
                        rp[j].display.position.z = position[j].z;
                    });

                    currTween.onComplete(function() {
                        j++;
                    });

                    lastTween.chain(currTween);
                    lastTween = currTween;
                    lastPosition = {};
                    lastPosition.x = pos.x;
                    lastPosition.y = pos.y;
                    lastPosition.z = pos.z;
                }
                var putOldLevelBehind = new TWEEN.Tween(stepAside).to(lastPosition, 80);

                lastTween.chain(putOldLevelBehind);
                putOldLevelBehind.onUpdate(function() {
                    rp[0].display.position.x = stepAside.x;
                    rp[0].display.position.y = stepAside.y;
                    rp[0].display.position.z = stepAside.z;
                });

                currentLevelStepAside.onUpdate(function() {
                    rp[0].display.position.x = currentPosition.x;
                });

                currentLevelStepAside.start();
                this.currentMainPersonalityLevel++;
            }
        };

        this.loadPlayerSpace = function(scene) {
            this.mainPersonality.addToScene(vec, scene);
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

        this.angerLevelNeededToLevel = dataObject.angerLevelNeededToLevel;
        this.angerLevel = dataObject.currentAngerLevel;
        this.lifeDeck = null;
        this.discardPile = null;
        this.removedFromTheGame = null;
        this.allies = null;
        this.mastery = null;
        this.currentMainPersonalityLevel = dataObject.currentMainPersonality;
        this.currentPowerStageAboveZero = dataObject.currentPowerStageAboveZero;

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