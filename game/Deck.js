var Deck = {};

Deck.create = function(data) {

    function DeckObject(data) {
        function createDisplay(number) {
            var display = new THREE.Object3D();
            if(number > 0) {
                var card = Card.create();
                for (var i = 0; i < number; i++) {
                    card.facedown();
                    card.moveY(i);
                    display.add(card.display);
                    card.display = card.display.clone();
                }
            }

            return display;
        }

        this.turnThisWay = function(vec) {
            if (vec instanceof THREE.Vector3) {
                this.display.rotation.y = Math.acos(vec.z / vec.length());
            }
        };

        this.prepareCardRemoval = function(cardInfo, pos ) {
            var topCardIdx = this.display.children.length - 1;
            var cardPos = this.display.children[topCardIdx].position.clone().add(this.display.position);
            var cardRot = this.display.children[topCardIdx].rotation.clone();
            
            // Rotate the card to match the player
            cardRot.z += this.display.rotation.y;
                        
            this.display.remove(this.display.children[topCardIdx]);
            // TODO: Load the right card properties, if it is random
            var card = Card.createCard({type: Card.Type.Personality, style: Card.Style.Freestyle, PUR: 2, alignment: Personality.alignment.Rogue, description: "Power: Once per combat, reduces the damage of an energy attack by 2 life cards.", level: 1, name: "VEGETA", highTech: false, number: 173, texturePath: "images/DBZCCG/saiyan/" + (parseInt(Math.random() * 1000 % 250) + 1001).toString().substring(1) + ".jpg",
                            personality: Personality.VEGETA, saga: Card.Saga.SAIYAN, powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]});

            card.display.rotation = cardRot;
            card.display.position = cardPos;
            this.display.parent.add(card.display);
            return card;
        }

        this.display = createDisplay(data.number);
        this.currentCards = data.number;

        this.setOwnerCallback = function (callback) {
            this.display.owner = callback;
        };
        
        var deck = this;
        this.display.descriptionBox = function() {
            var content = "<div class='card-quantity'>Number of cards: " + deck.currentCards + "</div>";
            
            DBZCCG.descriptionBox(content);
            return content;
        };
        
        this.display.displayObject = function () {
            this.children[0].leftScreenCallback = this.leftScreenCallback;
            return this.children[0];
        }
        
        this.display.leftScreenCallback = function (source, created) {
            var obj = new THREE.Object3D();
            
            for(var i = 1; i < deck.currentCards; i++) {
                var clone = created.clone();
                clone.position.y = Card.cornerWidth * Card.cardThicknessScale * i * 2;
                obj.add(clone);
            }
            obj.add(created);
            return obj;
        }
        
        this.display.displayName = function () {
            return this.owner()+' Life Deck';
        }
    }

    return new DeckObject(data || {number: 50});
};