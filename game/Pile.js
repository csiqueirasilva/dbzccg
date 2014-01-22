DBZCCG.Pile = {};

DBZCCG.Pile.Face = {};

DBZCCG.Pile.cardBase = DBZCCG.Card.create();
/* TODO: Rename this object to DBZCCG.Pile (OfCards) */
DBZCCG.Pile.create = function(data, faceUp) {

    function PileObject(data, faceUp) {

        var pile = this;

        this.number = data.number;

        function addTopToObjectList() {
            var idx = pile.display.children.length - 1;
            var display = pile.display.children[idx];

            var displayIdx = DBZCCG.objects.indexOf(display);

            if (displayIdx !== -1) {
                DBZCCG.objects[displayIdx] = display;
            } else {
                DBZCCG.objects.push(display);
            }
        }

        function createDisplay(number, faceUp) {
            var display = new THREE.Object3D();
            if (number > 0) {
                var card = DBZCCG.Pile.cardBase;
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

        var addCallback = [];

        this.removeCallback = function(callback) {
            var idx = addCallback.indexOf(callback);
            if (idx !== -1) {
                addCallback.splice(idx, 1);
                addCallback.sort(DBZCCG.compareCallbacks);
            }
        }

        this.addCallback = function(callback) {
            var idx = addCallback.indexOf(callback);
            if (idx === -1) {
                addCallback.push(callback);
                callback.pile = this;
                addCallback.sort(DBZCCG.compareCallbacks);
            }
        };

        this.addCard = function(cardIdx, cards) {
            if (cards instanceof Array && cards.length > 0) {
                DBZCCG.performingAnimation = true;
                var card = cards.shift();

                if (!(card.display.offDescriptionBox instanceof Function)) {
                    card.display.turnGameDisplay();
                    card.display.ownParent = false;
                }

                if (card.removePositionCallback instanceof Function) {
                    card.removePositionCallback();
                    card.removePositionCallback = undefined;
                }

                card.display.mouseOut = card.display.mouseOver = undefined;

                var otherCards = pile.display.children;

                card.display.position.y = DBZCCG.Card.cornerWidth * DBZCCG.Card.cardThicknessScale * (50 + card.display.parent.children.length + pile.display.children.length) * 2;

                var target = pile.display.position.clone();
                target.add(pile.display.parent.position);
                target.y = DBZCCG.Card.cornerWidth * DBZCCG.Card.cardThicknessScale * cardIdx * 2;
                var animation = new TWEEN.Tween(card.display.position).to(target, 150);

                var newTopCard = false;

                var increaseIndex = 0;

                animation.onStart(function() {

                    if (cardIdx === otherCards.length) {
                        if (faceUp) {
                            card.faceup();
                        } else {
                            card.facedown();
                        }

                        increaseIndex = 1;

                        newTopCard = true;

                    }

                    // match player position
                    card.display.rotation.z += pile.display.rotation.y;

                    for (var i = cardIdx + 1; i < otherCards.length; i++) {
                        DBZCCG.Pile.cardBase.display = otherCards[i];

                        if (faceUp) {
                            DBZCCG.Pile.cardBase.faceup();
                        } else {
                            DBZCCG.Pile.cardBase.facedown();
                        }

                        DBZCCG.Pile.cardBase.moveY(i);
                    }

                    if (card.beginRemoveCallback instanceof Function) {
                        card.beginRemoveCallback();
                        card.beginRemoveCallback = undefined;
                    }

                });

                animation.onComplete(function() {

                    var insertCard = DBZCCG.Pile.cardBase.display.clone();
                    DBZCCG.Pile.cardBase.display = insertCard;
                    insertCard.position.set(0, 0, 0);

                    if (newTopCard) {
                        card.display.position.set(0, 0, 0);
                        card.display.ownParent = false;
                        card.moveY(cardIdx);

                        pile.display.add(card.display);
                        pile.cards.push(card);

                        addTopToObjectList();

                    } else {
                        DBZCCG.Pile.cardBase.moveY(cardIdx);

                        DBZCCG.Screen.customAddChild(cardIdx, pile.display, DBZCCG.Pile.cardBase.display);

                        pile.cards.splice(cardIdx, 0, card);
                        card.display.parent.remove(card.display);
                    }

                    // Match the player
                    card.display.rotation.z += pile.display.rotation.y;

                    pile.currentCards = pile.display.children.length;

                    for (var i = 0; i < addCallback.length; i++) {
                        if (addCallback[i].f instanceof Function) {
                            var ret = addCallback[i].f(cardIdx, increaseIndex, cards);
                            if (ret instanceof Object) {
                                if (ret.cardIdx !== undefined) {
                                    cardIdx = ret.cardIdx;
                                } else if (ret.increaseIndex !== undefined) {
                                    increaseIndex = ret.increaseIndex;
                                } else if (ret.cards !== undefined) {
                                    destiny = ret.cards;
                                }
                            }
                        }
                    }

                    if (cards.length > 0) {
                        pile.addCard(cardIdx + increaseIndex, cards);
                    } else {
                        DBZCCG.performingAnimation = false;
                    }

                });

                animation.start();
            }
        };

        this.faceup = function() {
            this.display.rotation.z = Math.PI;
        };

        this.turnThisWay = function(vec) {
            if (vec instanceof THREE.Vector3) {
                this.display.rotation.y = Math.acos(vec.z / vec.length());
            }
        };

        function prepareCardRemoval(cardIdx) {

            var removedCard = pile.display.children[cardIdx];
            var card;

            // TODO: Load the right card properties, if it is random

            // TODO: Ajax Load for the online version!
            if (!removedCard.parentCard) {
                var rot = removedCard.rotation.clone();
                var pos = removedCard.position.clone();
                if (!(pile.cards instanceof Array)) {
                    DBZCCG.removeObject(removedCard);
                    card = DBZCCG.Card.generateRandom();
                } else {
                    card = pile.cards[cardIdx];
                }

                card.display.rotation = rot;
                card.display.position = pos;
            } else {
                card = removedCard.parentCard;
            }

            card.removePositionCallback = function() {

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
            };

            var otherCards = pile.display.children;

            card.beginRemoveCallback = function() {

                /* Everyone above the removed card get down by 1 card (aka get the position of the card below it) */
                for (var i = otherCards.length - 1; i > cardIdx; i--) {
                    otherCards[i].position.y = otherCards[i - 1].position.y;
                }

                pile.display.remove(removedCard);

                // find card idx, it might be changed
                for (var i = 0; i < pile.cards.length; i++) {
                    if (pile.cards[i].display === removedCard) {
                        cardIdx = i;
                        break;
                    }
                }

                pile.cards.splice(cardIdx, 1);

                var idx;
                for (var i = 0; i < otherCards.length; i++) {
                    idx = DBZCCG.objects.indexOf(otherCards[i]);
                    if (idx !== -1) {
                        DBZCCG.objects.splice(idx, 1);
                    }
                }

                pile.currentCards = pile.display.children.length;

                if (cardIdx === pile.cards.length && otherCards.length > 0 && faceUp === true) {
                    pile.firstCardFaceUp();
                }

                // Adjust top card object
                if (otherCards.length > 0) {
                    DBZCCG.objects.push(otherCards[otherCards.length - 1]);
                }
            };

            return card;
        }
        ;

        this.removeBottomCard = function() {
            if (this.display.children.length > 0) {
                var cardIdx = 0;
                return prepareCardRemoval(cardIdx);
            }
        };

        this.firstCardFaceUp = function(idx) {
            if (pile.cards.length > 0) {
                var selectIdx = idx || pile.cards.length - 1;
                var card = pile.cards[selectIdx];
                var cardPos = pile.display.children[selectIdx].position.clone();

                pile.display.remove(pile.display.children[selectIdx]);

                if (faceUp) {
                    card.faceup();
                } else {
                    card.facedown();
                }

                card.display.position = cardPos;

                pile.display.add(card.display);
            }
        };

        this.removeCardByIdx = function(idx) {
            if (this.display.children.length > 0) {
                var card = prepareCardRemoval(idx);

                return card;
            }
        };

        this.removeTopCard = function() {
            if (this.display.children.length > 0) {
                var cardIdx = this.display.children.length - 1;
                var card = prepareCardRemoval(cardIdx);

                return card;
            }
        };

        this.display = createDisplay(data.number, faceUp);
        this.currentCards = data.number;
        this.cards = data.cards || [];

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

            created.scale.z = DBZCCG.Card.cardThicknessScale;

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
                addTopToObjectList();
            }
            this.turnThisWay(direction);
            field.add(this.display);
        }

        this.removeLabelText = function() {
            if (this.labelText) {
                $(this.labelText).remove();
                this.labelText = undefined;
            }
        };

        this.changeLabelText = function(text) {
            this.removeLabelText();

            var position = DBZCCG.Screen.getWindowCoords(this.display);

            if (!isNaN(position.x)) {
                this.labelText = DBZCCG.Combat.labelText(text || this.cards.length, position, 0xFFFFFF, 800, 1);
            }
        };

    }

    return new PileObject(data || {number: 50}, faceUp);
};