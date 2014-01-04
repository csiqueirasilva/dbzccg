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
        }
        ;

        this.faceup = function() {
            this.display.rotation.z = Math.PI;
        };

        this.turnThisWay = function(vec) {
            if (vec instanceof THREE.Vector3) {
                this.display.rotation.y = Math.acos(vec.z / vec.length());
            }
        };

        function prepareCardRemoval(cardIdx) {
            var card = pile.display.children[cardIdx];

            for (var i = 0; i < DBZCCG.objects.length; i++) {
                if (DBZCCG.objects[i] === card) {
                    DBZCCG.objects.splice(i, 1);
                }
            }

            for (var i = cardIdx + 1; i < pile.display.children.length; i++) {
                pile.display.children[i].position.y = pile.display.children[i - 1].position.y;
            }

            pile.display.remove(pile.display.children[cardIdx]);
            // TODO: Load the right card properties, if it is random

            // TODO: Ajax Load for the online version!
            if (!card.parentCard) {
                var rot = card.rotation.clone();
                var pos = card.position.clone();
                if (!(this.cards instanceof Array)) {
                    delete card;
                    card = DBZCCG.Card.generateRandom();
                } else {
                    card = this.cards[cardIdx];
                    this.cards.splice(cardIdx, 1);
                }
                card.display.rotation = rot;
                card.display.position = pos;
            } else {
                card = card.parentCard;
            }

            card.display.position.add(pile.display.position);

            // Rotate the card to match the player
            card.display.rotation.z += pile.display.rotation.y;

            var parent = pile.display.parent;
            while (parent.name !== "field") {
                card.display.position.add(parent.position);
                card.display.rotation.x += parent.rotation.x;
                card.display.rotation.y += parent.rotation.y;
                card.display.rotation.z += parent.rotation.z;
                parent = parent.parent;
            }

            parent.add(card.display);

            if (pile.display.children.length > 0) {
                DBZCCG.objects.push(pile.display.children[pile.display.children.length - 1]);
            }

            this.currentCards = pile.display.children.length;

            return card;
        }
        ;

        this.removeBottomCard = function() {
            if (this.display.children.length > 0) {
                var cardIdx = 0;
                return prepareCardRemoval(cardIdx);
            }
        };

        this.firstCardFaceUp = function() {
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

        this.removeTopCard = function() {
            if (this.display.children.length > 0) {
                var cardIdx = this.display.children.length - 1;
                var card = prepareCardRemoval(cardIdx);
                if (this.display.children.length > 0 && faceUp == true) {
                    this.firstCardFaceUp();
                }

                return card;
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
            var insideGeo = new THREE.CubeGeometry(DBZCCG.Card.cardWidth + 0.002, DBZCCG.Card.cardHeight + 0.002, (DBZCCG.Card.cornerWidth * 2 * (pile.currentCards) * DBZCCG.Card.cardThicknessScale));

            var faces = insideGeo.faces;
            delete faces[8];
            delete faces[9];
            delete faces[10];
            delete faces[11];
            faces.splice(8, 4);

            // Remove non-used faces
            var aux;
            faces[0].c = faces[0].a;
            faces[0].a = faces[1].a;
            faces[0].b = faces[1].b;
            faces[1].a = faces[1].b;
            faces[1].b = faces[0].c;
            aux = faces[1].b;
            faces[1].b = faces[1].c;
            faces[1].c = aux;

            faces[2].c = faces[2].a;
            faces[2].a = faces[3].a;
            faces[2].b = faces[3].b;
            faces[3].a = faces[3].b;
            faces[3].b = faces[2].c;

            aux = faces[3].b;
            faces[3].b = faces[3].c;
            faces[3].c = aux;

            obj.add(created);

            if (pile.currentCards > 1) {
                var clone = created.clone();
                var texture = THREE.ImageUtils.loadTexture("images/DBZCCG/deck_side.png");
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(pile.currentCards - 2, pile.currentCards - 1);
                var material = new THREE.MeshLambertMaterial({side: THREE.FrontSide,
                    map: texture});
                materials = [];
                for (var i = 0; i < 4; i++) {
                    materials.push(material.clone()); // sides
                }
                var insides = new THREE.Mesh(insideGeo, new THREE.MeshFaceMaterial(materials));
                insides.position.y = DBZCCG.Card.cornerWidth * DBZCCG.Card.cardThicknessScale * (pile.currentCards - 1);
                insides.rotation.x = Math.PI / 2;
                obj.add(insides);
                if (faceUp) {
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