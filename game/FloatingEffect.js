DBZCCG.Card.FloatingEffect = {};

(function floatingEffectParticles() {
    var geo = new THREE.Geometry();

    for (var i = 0; i < 150; i++) {
        var particle = new THREE.Vector3();
        geo.vertices.push(particle);
    }

    function floatingEffect() {
        this.element = new THREE.ParticleSystem(geo.clone(), new THREE.ParticleSystemMaterial({
            size: 1,
            map: THREE.ImageUtils.loadTexture("images/gfx/particles/particleTexture.png"),
            depthTest: false,
            vertexColors: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            transparent: true,
            sortParticles: true
        }));

        this.element.rotation.x = -Math.PI / 2;
        this.element.position.z = -0.3;
        this.baseColor = 0.62;
        this.icr = 0;

        var particle;
        for (var i = 0; i < this.element.geometry.vertices.length; i++) {
            particle = this.element.geometry.vertices[i];
            particle.set(-DBZCCG.Card.cardWidth * 0.5 + DBZCCG.Card.cardWidth * Math.random(),
                    -DBZCCG.Card.cardHeight * 0.5 + DBZCCG.Card.cardHeight * Math.random(),
                    -DBZCCG.Card.cardHeight * 0.5 + DBZCCG.Card.cardHeight * Math.random());
        }

        var colors = [];
        var particleCount = this.element.geometry.vertices.length;
        for (var i = 0; i < particleCount; i++) {
            colors[i] = new THREE.Color();
            colors[i].setHSL(0.1, 1, 0.3);
        }

        this.element.geometry.colors = colors;
        this.removed = [];
    }

    floatingEffect.prototype.update = function() {
        var pCount = this.element.geometry.vertices.length;

        if (this.parent && this.parent.checkLife()) {
            this.parent = null;
        }
        ;

        if (pCount === this.removed.length) {
            selections.splice(selections.indexOf(this), 1);
            this.element.parent.remove(this.element);
            this.removeCallback();
            return;
        }

        while (pCount--) {
            if (this.element.geometry.vertices[pCount].y >= DBZCCG.Card.cardHeight) {
                if (!this.remove) {
                    if (this.element.geometry.colors[pCount].getHSL().l <= 0) {
                        this.element.geometry.vertices[pCount].set(-DBZCCG.Card.cardWidth * 0.5 + DBZCCG.Card.cardWidth * Math.random(),
                                -DBZCCG.Card.cardHeight * 0.5 + DBZCCG.Card.cardHeight * Math.random(),
                                -DBZCCG.Card.cardHeight * 0.5 + DBZCCG.Card.cardHeight * Math.random());
                    } else {
                        var hsl = this.element.geometry.colors[pCount].getHSL();
                        hsl.l -= 0.05;
                        this.element.geometry.colors[pCount].setHSL(
                                hsl.h,
                                hsl.s,
                                hsl.l);
                    }
                } else {
                    if (this.removed.indexOf(pCount) === -1) {
                        this.element.geometry.colors[pCount].setHSL(0, 0, 0);
                        this.removed.push(pCount);
                    }
                }
            } else {
                this.element.geometry.colors[pCount].setHSL(0.1, 1, 0.3 + Math.sin(Math.random()) / 4);
                this.element.geometry.vertices[pCount].y += 0.075 + this.icr;
                this.element.geometry.vertices[pCount].x += Math.sin(DBZCCG.clock.elapsedTime * Math.random()) / 20;
            }

        }

        this.element.geometry.colorsNeedUpdate = true;
        this.element.geometry.verticesNeedUpdate = true;
    };

    DBZCCG.Card.FloatingEffect.floatingEffect = floatingEffect;

    DBZCCG.Card.FloatingEffect.update = function() {
        for (var i = 0; i < selections.length; i++) {
            selections[i].update();
        }
    };

    var selections = [];

    DBZCCG.Card.FloatingEffect.addParticle = function(parent, baseColor) {
        var selection = new DBZCCG.Card.FloatingEffect.floatingEffect();
        selection.baseColor = baseColor || 0.62;
        selection.parent = parent;
        selections.push(selection);
        parent.display.add(selection.element);
    };

    DBZCCG.Card.FloatingEffect.removeParticle = function(display, callback) {
        for (var i = 0; i < selections.length; i++) {
            if (display.children[1] === selections[i].element) {
                selections[i].remove = true;
                selections[i].removeCallback = callback;
                selections[i].icr = 0.3;
                return;
            }
        }
    };

})();


DBZCCG.Card.FloatingEffect.create = function(dataObject) {
    function floatingEffectObject(dataObject) {
        ClassHelper.extends(this, DBZCCG.Card.createCard(dataObject.card));

        this.display.parentCard = this;

        this.checkLife = function() {
            var currentTurn = $('#turnCounterNumber').html();
            var currentPhase = DBZCCG.phaseCounter;

            var remove = false;

            if (currentTurn > this.turn) {
                remove = true;
            } else if (currentPhase > this.phase) {
                remove = true;
            } else if (this.combat && !DBZCCG.combat) {
                remove = true;
            } else if (this.nextTurn &&
                    DBZCCG.performingAction === this.player &&
                    $('.selectedTurn').length === 0) {
                remove = true;
            }

            if (remove) {
                DBZCCG.listActions.splice(0, 0, function() {

                    var performingAnimation = DBZCCG.performingAnimation;
                    DBZCCG.Card.FloatingEffect.removeParticle(floatingEffect.display,
                            function() {

                                var animation = new TWEEN.Tween(new THREE.Vector3(1, 0, 0)).to(new THREE.Vector3(0, 0, 0), 250);
                                var materials = floatingEffect.display.children[0].material.materials;

                                animation.onStart(function () {
                                    DBZCCG.Sound.floatingEffect("disappear");
                                });

                                animation.onUpdate(function() {
                                    for (var i = 0; i < materials.length; i++) {
                                        materials[i].opacity = this.x;
                                    }
                                });

                                animation.onComplete(function() {
                                    floatingEffect.display.parent.remove(floatingEffect.display);
                                    floatingEffect.player.floatingEffects.cards.splice(
                                            floatingEffect.player.floatingEffects.cards.indexOf(floatingEffect),
                                            1);
                                    floatingEffect.player.floatingEffects.addCard([]);
                                    delete floatingEffect;
                                    DBZCCG.performingAnimation = performingAnimation;
                                });

                                animation.start();
                            });

                    DBZCCG.performingAnimation = true;
                });
            }

            return remove;
        };

        this.phase = dataObject.phase;
        this.turn = dataObject.turn;
        this.player = dataObject.player;
        this.combat = dataObject.combat;
        this.nextTurn = dataObject.nextTurn;

        // default settings
        this.activable = false;
        this.playable = false;
        this.postEffect = false;
        
        if(dataObject.appendText) {
            if(this.display.displayHoverText instanceof Function) {
                this.display.oldDisplayFunc = this.display.displayHoverText;
                this.display.displayHoverText = function () {
                    return this.oldDisplayFunc() + "<div><h2>Floating Effect:</h2>" + dataObject.appendText + "</div>";
                };
            }
        }

        var floatingEffect = this;

        var addCallback = {f: function() {
                dataObject.scene.add(floatingEffect.display);

                DBZCCG.performingAnimation = true;

                var animation = new TWEEN.Tween(new THREE.Vector3(0, 0, 0)).to(new THREE.Vector3(1, 0, 0), 250);
                var materials = floatingEffect.display.children[0].material.materials;

                animation.onStart(function() {
                    DBZCCG.Sound.floatingEffect("appear");
                    DBZCCG.Card.FloatingEffect.addParticle(floatingEffect);
                });

                animation.onUpdate(function() {
                    for (var i = 0; i < materials.length; i++) {
                        materials[i].opacity = this.x;
                    }
                });

                animation.onComplete(function() {
                    DBZCCG.performingAnimation = false;
                });

                animation.start();
            }, priority: Infinity, life: false};

        dataObject.player.floatingEffects.addAddCallback(addCallback);
        var materials = this.display.children[0].material.materials;
        for (var i = 0; i < materials.length; i++) {
            materials[i].opacity = 0;
            materials[i].transparent = true;
        }

        dataObject.player.floatingEffects.addCard([this], true);
    }

    return new floatingEffectObject(dataObject);
};