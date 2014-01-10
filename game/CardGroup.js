DBZCCG.CardGroup = {};

DBZCCG.CardGroup.YCoord = 5;
DBZCCG.CardGroup.maxDisplaySize = 6;
DBZCCG.CardGroup.maxWidth = DBZCCG.Card.cardWidth * DBZCCG.CardGroup.maxDisplaySize;

DBZCCG.CardGroup.create = function(cardGroup) {
    function cardGroupObject(cardGroup) {
        // Alias: loadToField
        this.addToField = function(field, direction, position) {

            if (direction instanceof THREE.Vector3) {
                // new THREE.Vector3(0,0,-1) is the starting position of the card
                this.rotation.y = MathHelper.angleVectors(direction, new THREE.Vector3(0, 0, -1));
            }

            // If position wasnt set, create a position for the player hand
            if (this.position.y == 0 && this.position.z == 0 && this.position.x == 0) {
                this.position.copy(position.clone().normalize().multiplyScalar(DBZCCG.Player.Field.Height));
                this.position.y = DBZCCG.CardGroup.YCoord;
            }

            var qttCards = this.cards.length;
            var card;

            if (this.cards.length > 0) {

                var diff = DBZCCG.Card.cardWidth * this.cards.length - this.groupMaxWidth;
                var diffacc = diff / this.cards.length;
                var target;

                for (var i = 0; i < qttCards; i++) {
                    card = this.cards[i];

                    target = new THREE.Vector3(this.position.x - this.cards.length * (DBZCCG.Card.cardWidth) / 2 + i * DBZCCG.Card.cardWidth + DBZCCG.Card.cardWidth / 2,
                            this.position.y, this.position.z);

                    if (diff > 0) {
                        target.x = this.position.x - this.groupMaxWidth / 2 - diffacc * i + i * DBZCCG.Card.cardWidth * 0.99;

                        if (Math.abs(this.rotation.x / (Math.PI / 2)) === 1) {
                            target.y += DBZCCG.Card.cardDepth * DBZCCG.Card.cardThicknessScale * i;
                        } else {
                            target.z += DBZCCG.Card.cardDepth * DBZCCG.Card.cardThicknessScale * i;
                        }

                        this.cards[i].display.mouseOver = cardGroupCardMouseOver;
                        this.cards[i].display.mouseOut = cardGroupCardMouseOut;
                    }

                    this.cards[i].display.position = target;

                    if (this.cards[i].display.rotation.x != this.rotation.x ||
                            this.cards[i].display.rotation.y != this.rotation.y ||
                            this.cards[i].display.rotation.z != this.rotation.z) {
                        this.cards[i].display.rotation.copy(this.rotation);
                    }

                    if (DBZCCG.CardGroup.YCoord !== this.position.y) {
                        DBZCCG.objects.push(card.display);
                        card.display.ownParent = true;
                    }

                    field.add(card.display);
                }

            }
        }

        function cardGroupCardMouseOver() {
            if (Math.abs(this.rotation.x / (Math.PI / 2)) !== 1) {
                if (this.originalZ == undefined) {
                    this.originalZ = this.position.z;
                }
                this.position.z = this.originalZ + 0.05;
            }
            else
            {
                if (this.originalY == undefined) {
                    this.originalY = this.position.y;
                }
                this.position.y = this.originalY + 0.05;
            }
        }

        function cardGroupCardMouseOut() {
            if (Math.abs(this.rotation.x / (Math.PI / 2)) !== 1) {
                this.position.z = this.originalZ;
                this.originalZ = undefined;
            } else {
                this.position.y = this.originalY;
                this.originalY = undefined;
            }
        }

        this.addCard = function(cardsToJoin, addToScene) {
            DBZCCG.performingAnimation = true;
            var card;
            if (cardsToJoin.length > 0) {
                card = cardsToJoin.shift();
                this.cards.push(card);
            }

            if (this.cards.length > 0) {
                var diff = DBZCCG.Card.cardWidth * this.cards.length - this.groupMaxWidth;
                var diffacc = diff / this.cards.length;
                var baseAnimation;
                var firstAnimation;
                var itAnimation;
                var target = new THREE.Vector3(this.position.x - this.cards.length * (DBZCCG.Card.cardWidth) / 2 + DBZCCG.Card.cardWidth / 2,
                        this.position.y, this.position.z);
                var i = 0;

                if (diff > 0) {
                    if (target.x < (this.position.x - this.groupMaxWidth / 2)) {
                        target.x = this.position.x - this.groupMaxWidth / 2;
                        this.cards[0].display.mouseOver = cardGroupCardMouseOver;
                        this.cards[0].display.mouseOut = cardGroupCardMouseOut;
                    }
                }

                if(this.cards[0] === card) {
                    if(card.removePositionCallback instanceof Function) {
                        card.removePositionCallback();
                        card.removePositionCallback = undefined;
                    }
                }

                baseAnimation = firstAnimation = new TWEEN.Tween(this.cards[0].display.position)
                        .to(target, card !== this.cards[0] ? 1 : 150);

                if (card === this.cards[0] && card.removeCardCallback instanceof Function) {
                    
                    baseAnimation.onComplete(function() {
                        card.removeCardCallback();
                        card.removeCardCallback = undefined;
                    });
                }

                if (this.cards[0].display.rotation.x != this.rotation.x ||
                        this.cards[0].display.rotation.y != this.rotation.y ||
                        this.cards[0].display.rotation.z != this.rotation.z) {

                    this.cards[0].display.position.rotation = this.cards[0].display.rotation;
                    baseAnimation.onComplete(function() {
                        this.rotation.set(0, 0, 0);
                        this.rotation = undefined;
                    });

                    itAnimation = new TWEEN.Tween(this.cards[0].display.rotation)
                            .to(this.rotation, 1);

                    itAnimation.onUpdate(function() {
                        this.order = "XYZ";
                    });

                    baseAnimation.chain(itAnimation);
                    baseAnimation = itAnimation;
                }

                itAnimation = baseAnimation;

                for (; i <= this.cards.length - 1; i++) {

                    target = new THREE.Vector3(this.position.x - this.cards.length * (DBZCCG.Card.cardWidth) / 2 + i * DBZCCG.Card.cardWidth + DBZCCG.Card.cardWidth / 2,
                            this.position.y, this.position.z);

                    if (diff > 0) {
                        target.x = this.position.x - this.groupMaxWidth / 2 - diffacc * i + i * DBZCCG.Card.cardWidth * 0.99;

                        if (Math.abs(this.rotation.x / (Math.PI / 2)) === 1) {
                            target.y += DBZCCG.Card.cardDepth * DBZCCG.Card.cardThicknessScale * i;
                        } else {
                            target.z += DBZCCG.Card.cardDepth * DBZCCG.Card.cardThicknessScale * i;
                        }

                        this.cards[i].display.mouseOver = cardGroupCardMouseOver;
                        this.cards[i].display.mouseOut = cardGroupCardMouseOut;
                    }

                    if (card === this.cards[i]) {
                        
                        if(card.removePositionCallback instanceof Function) {
                            card.removePositionCallback();
                            card.removePositionCallback = undefined;
                        }

                        itAnimation = new TWEEN.Tween(this.cards[i].display.position)
                                .to(target, 150);

                        baseAnimation.chain(itAnimation);
                        baseAnimation = itAnimation;
                        
                        if (card.beginRemoveCallback instanceof Function) {
                            itAnimation.onStart(function() {
                                card.beginRemoveCallback();
                                card.beginRemoveCallback = undefined;
                            });
                        };
                    } else {
                        this.cards[i].display.position.copy(target);
                    }

                    if (this.cards[i].display.rotation.x != this.rotation.x ||
                            this.cards[i].display.rotation.y != this.rotation.y ||
                            this.cards[i].display.rotation.z != this.rotation.z) {

                        if (card === this.cards[i]) {
                            this.cards[i].display.position.rotation = this.cards[i].display.rotation;
                            baseAnimation.onComplete(function() {
                                if(this.rotation) {
                                    this.rotation.set(0, 0, 0);
                                    this.rotation = undefined;
                                }
                            });

                            itAnimation = new TWEEN.Tween(this.cards[i].display.rotation)
                                    .to(this.rotation, 1);

                            itAnimation.vec = this.cards[i].display.rotation;

                            itAnimation.onUpdate(function() {
                                this.order = "XYZ";
                            });
                        } else {
                            this.cards[i].display.rotation.set(0,0,0);
                        }

                        baseAnimation.chain(itAnimation);
                        baseAnimation = itAnimation;
                    }
                }

                itAnimation.onComplete(function() {
                    if (cardsToJoin.length == 0) {
                        DBZCCG.performingAnimation = false;
                    } else {
                        cardGroup.addCard(cardsToJoin, addToScene);
                    }

                    if ((DBZCCG.performingAction === DBZCCG.mainPlayer || addToScene) && card) {
                        DBZCCG.objects.push(card.display);
                        card.display.ownParent = true;
                    }
                });

                firstAnimation.start();
            }
        };


        this.position = new THREE.Vector3();
        this.rotation = new THREE.Euler();
        this.cards = cardGroup;
        this.groupMaxWidth = DBZCCG.CardGroup.maxWidth;
        cardGroup = this;
    }

    return new cardGroupObject(cardGroup || [DBZCCG.Card.generateRandom(), DBZCCG.Card.generateRandom()]);
};