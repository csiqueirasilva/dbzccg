var Pile = {};

Pile.Face = {};

Pile.cardBase = DBZCCG.Card.create();
/* TODO: Rename this object to Pile (OfCards) */
Pile.create = function(data, faceUp) {

    function PileObject(data, faceUp) {
        
        var pile = this;
        function createDisplay(number, faceUp) {
            var display = new THREE.Object3D();
            if (number > 0) {
                var card = Pile.cardBase;
                for (var i = 0; i < number; i++) {
                    card.display = card.display.clone();
                    if (faceUp) {
                        card.faceup();
                    } else {
                        card.facedown();
                    }
                    card.moveY(i);
                    display.add(card.display);
                }
            }

            return display;
        };

        this.faceup = function() {
            this.display.rotation.z = Math.PI;
        };

        this.turnThisWay = function(vec) {
            if (vec instanceof THREE.Vector3) {
                this.display.rotation.y = Math.acos(vec.z / vec.length());
            }
        };

        function prepareCardRemoval (card, cardIdx) {
            var cardPos = this.display.children[cardIdx].position.clone().add(this.display.position);
            var cardRot = this.display.children[cardIdx].rotation.clone();

            // Rotate the card to match the player
            cardRot.z += this.display.rotation.y;

            this.display.remove(this.display.children[cardIdx]);
            // TODO: Load the right card properties, if it is random

            card.display.rotation = cardRot;
            card.display.position = cardPos;
            this.display.parent.add(card.display);
        };

        this.removeBottomCard = function (card) {
            if(this.display.children.length > 0) {
                var cardIdx = 0;
                prepareCardRemoval(card, cardIdx);
            }
        };

        this.firstCardFaceUp = function () {
            if (this.getTopCard instanceof Function) {
                var card = this.getTopCard();
                var cardIdx = this.display.children.length - 1;
                var cardPos = this.display.children[cardIdx].position.clone().add(this.display.position);
                var cardRot = this.display.children[cardIdx].rotation.clone();

                // Rotate the card to match the player
                cardRot.z += this.display.rotation.y;

                this.display.remove(this.display.children[cardIdx]);
                // TODO: Load the right card properties, if it is random

                card.display.rotation = cardRot;
                card.display.position = cardPos;
                this.display.add(card.display);
            }
        };

        this.removeTopCard = function (card) {
            if(this.display.children.length > 0) {
                var cardIdx = this.display.children.length - 1;
                prepareCardRemoval(card, cardIdx);
                if(this.display.children.length > 0 && faceup) {
                    firstCardFaceUp();
                }
            }
        };

        this.display = createDisplay(data.number, faceUp);
        this.currentCards = data.number;

        this.setOwnerCallback = function(callback) {
            this.display.owner = callback;
        };

        this.display.displayObject = function() {
            this.children[0].leftScreenCallback = this.leftScreenCallback;
            return this.children[0];
        };

        this.display.leftScreenCallback = function(source, created) {
            var obj = new THREE.Object3D();
            var insideGeo = new THREE.CubeGeometry(DBZCCG.Card.cardWidth + DBZCCG.Card.cornerWidth, DBZCCG.Card.cardHeight + DBZCCG.Card.cornerHeight*2, (DBZCCG.Card.cornerWidth * 2 * (pile.currentCards - 1)*DBZCCG.Card.cardThicknessScale) - 0.05);
            
            obj.add(created);
            if (pile.currentCards > 1) {
                var clone = created.clone();
                var texture = THREE.ImageUtils.loadTexture("images/DBZCCG/deck_side.png");
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(64,64);
                var material = new THREE.MeshLambertMaterial({ side: THREE.FrontSide, 
                map: texture });
                materials = [];
                for (var i = 0; i < 6; i++) {
                    materials.push(material.clone()); // sides
                }
                var insides = new THREE.Mesh(insideGeo, new THREE.MeshFaceMaterial(materials));
                insides.position.y = DBZCCG.Card.cornerWidth * DBZCCG.Card.cardThicknessScale * (pile.currentCards - 1);
                insides.rotation.x = Math.PI/2;
                obj.add(insides);
                if(faceUp) {
                    clone.position.y = 0;
                } else {
                    clone.position.y = DBZCCG.Card.cornerWidth * DBZCCG.Card.cardThicknessScale * (pile.currentCards - 1) * 2;
                }
                obj.add(clone);
            }

            return obj;
        }


        this.addToField = function(position, field, direction) {
            this.display.position.copy(position);
            if (this.display.children.length > 0) {
                var idx = this.display.children.length - 1;
                DBZCCG.objects.push(this.display.children[idx]);
                this.objectIdx = DBZCCG.objects.length - 1;
            }
            this.turnThisWay(direction);
            field.add(this.display);
        }
    }

    return new PileObject(data || {number: 50}, faceUp);
};