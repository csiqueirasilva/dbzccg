MainPersonality = {};

MainPersonality.maxLevel = 5;

MainPersonality.create = function(data) {

    function MainPersonalityObject(data) {

        this.moveZScouter = function(toPowerStage) {
            this.personalities[this.currentMainPersonalityLevel - 1].moveZScouter(toPowerStage);
        }

        this.neutralPositionScabbard = function(dirVector) {
            this.zScabbard.rotation.copy(this.zSword.rotation);
            this.zScabbard.position.copy(this.zSword.position);
            this.zScabbard.position.y += -0.075;
            this.zScabbard.position.add(MathHelper.rotateVector(dirVector).normalize().multiplyScalar(-0.49));
            this.zScabbard.scale.copy(this.zSword.scale);
        }

        this.addZSword = function(field, dirVector) {
            var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
                console.log(item, loaded, total);
            };

            var loader = new THREE.JSONLoader(manager);
            var mp = this;
            mp.zSwordComplete = new THREE.Object3D();
            mp.zSwordComplete.name = 'zSwordComplete';

            loader.load("model/zsword.js", function(geometry) {
                mp.zSword = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({side: THREE.DoubleSide, shading: THREE.SmoothShading, color: 0x777777}));
                mp.zSword.rotation.z = -Math.PI / 2;
                mp.zSword.rotation.y += MathHelper.angleVectors(new THREE.Vector3(0, 0, -1), dirVector);
                mp.zSword.position.copy(dirVector);
                mp.zSword.position.multiplyScalar(0.34);
                mp.zSword.scale = new THREE.Vector3(3, 3, 3);
                mp.zSword.position.y = 0.2;
                mp.zSwordComplete.add(mp.zSword);

                loader.load("model/zswordcover.js", function(geometry) {
                    mp.zScabbard = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({side: THREE.DoubleSide, shading: THREE.SmoothShading, color: 0x777777}));
                    mp.zSwordComplete.add(mp.zScabbard);
                    mp.neutralPositionScabbard(dirVector);
                    DBZCCG.objects.push(mp.zSwordComplete);
                    mp.zSwordComplete.cursor = 'auto';
                    mp.zSwordComplete.mouseOver = function() {
                        var flyToPosition = mp.zScabbard.position.clone();
                        flyToPosition.add(MathHelper.rotateVector(mp.zSword.position.clone()).normalize().multiplyScalar(2.8));
                        DBZCCG.flyToPosition(flyToPosition, mp.zSword.position.clone().normalize());
                        DBZCCG.flyOverCamera.position.y = 5;
                        return "Current anger level: " + mp.currentAngerLevel;
                    };

                    mp.zSwordComplete.mouseOut = function() {
                        DBZCCG.flyOverCamera.position.y = 15;
                    };

                    var anger = mp.currentAngerLevel;
                    mp.zScabbard.position.add(
                            MathHelper
                            .rotateVector(mp.personalities[0].display.position)
                            .normalize()
                            .multiplyScalar(-1 * 0.785 * anger));

                    field.add(mp.zSwordComplete);
                });
            });
        };

        this.setAnger = function(n, noDelay, noMessage) {
            // Sword animation
            DBZCCG.performingAnimation = true;
            var anger = parseInt(n);

            if (anger < this.angerLevelNeededToLevel && anger >= 0 && anger != this.currentAngerLevel) {
                var oldAnger = this.currentAngerLevel;
                var position = this.zScabbard.position.clone();
                var moveAxis = MathHelper.rotateVector(this.personalities[0].display.position).normalize();

                var target = this.zSword.position.clone();
                target.y += -0.075;
                target.add(moveAxis.clone().multiplyScalar(-0.49));
                target.add(moveAxis.multiplyScalar(-1 * ((anger - oldAnger) / Math.abs(anger - oldAnger)) * 0.785 * anger));

                var animation = new TWEEN.Tween(position).to(target, 600 + 50 * Math.abs(anger - oldAnger));
                var scabbard = this.zScabbard.position;

                animation.onUpdate(function() {
                    scabbard.copy(position);
                });

                if (!noDelay) {
                    animation.delay(500);
                }

                var mp = this;
                animation.onComplete(function() {
                    if (!noMessage) {
                        var msg = mp.personalities[mp.currentMainPersonalityLevel - 1].displayName() + "'s anger was set to " + anger + ".";
                        DBZCCG.quickMessage(msg);
                    }
                    mp.currentAngerLevel = anger;
                    DBZCCG.performingAnimation = false;
                });

                animation.easing(TWEEN.Easing.Circular.In);

                animation.start();
            }
        };

        this.changeAnger = function(n, noDelay, noMessage) {
            // Sword animation
            DBZCCG.performingAnimation = true;
            var anger = parseInt(n);
            var updateLevel = false;
            var oldAnger = this.currentAngerLevel;

            if (anger + this.currentAngerLevel >= this.angerLevelNeededToLevel) {
                anger = this.angerLevelNeededToLevel >= 5 ? 5 : this.angerLevelNeededToLevel;
                updateLevel = true;
            } else if (anger + this.currentAngerLevel <= 0) {
                anger = 0;
            } else if (anger == 0) {
                anger = this.currentAngerLevel;
            } else {
                anger = anger + this.currentAngerLevel;
            }

            var position = this.zScabbard.position.clone();
            var moveAxis = MathHelper.rotateVector(this.personalities[0].display.position).normalize();

            var target;

            target = this.zSword.position.clone();
            target.y += -0.075;
            target.add(moveAxis.clone().multiplyScalar(-0.49));

            if (n > 0) {
                target.add(moveAxis.multiplyScalar(-1 * 0.785 * anger));
            } else {
                target.add(moveAxis.multiplyScalar(0.785 * anger));
            }

            var animation = new TWEEN.Tween(position).to(target, 600 + 50 * Math.abs(anger - oldAnger));
            var scabbard = this.zScabbard.position;

            animation.onUpdate(function() {
                scabbard.copy(position);
            });

            if (!noDelay) {
                animation.delay(500);
            }

            var mp = this;
            animation.onComplete(function() {
                if (!noMessage) {
                    if (oldAnger != anger) {
                        var diffAnger = anger - oldAnger;
                        var msg;
                        if (diffAnger < 0) {
                            msg = mp.personalities[mp.currentMainPersonalityLevel - 1].displayName() + " lost " + Math.abs(diffAnger) + " anger.";
                        } else {
                            msg = mp.personalities[mp.currentMainPersonalityLevel - 1].displayName() + " gained " + diffAnger + " anger.";
                        }
                        DBZCCG.quickMessage(msg);
                    }
                }

                if (updateLevel) {
                    mp.currentAngerLevel = mp.angerLevelNeededToLevel;
                    if (mp.personalities.length != mp.currentMainPersonalityLevel) {
                        mp.advanceLevels(1);
                    } else {
                        DBZCCG.quickMessage(mp.personalities[mp.currentMainPersonalityLevel - 1].displayName() + "'s level cannot go higher.");
                        mp.personalities[mp.currentMainPersonalityLevel - 1].moveZScouter("max");
                        mp.setAnger(0);
                    }
                } else {
                    mp.currentAngerLevel = anger;
                }
                DBZCCG.performingAnimation = false;
            });

            animation.easing(TWEEN.Easing.Circular.In);

            animation.start();
        };

        this.advanceLevels = function(n) {
            var mp = this;
            var desiredLevels = n;
            var previousLevel = mp.personalities[mp.currentMainPersonalityLevel - 1];
            DBZCCG.performingAnimation = true;
            function advanceLevel() {
                if (mp.currentMainPersonalityLevel != mp.personalities.length && n > 0) {
                    // Reorder personalities array
                    var rp = [];

                    var qttLevels = mp.personalities.length;
                    for (var i = mp.currentMainPersonalityLevel - 1;
                            rp.length != qttLevels;
                            i++) {
                        if (i == qttLevels) {
                            i = 0;
                        }
                        rp.push(mp.personalities[i]);
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


                    n--;


                    currentLevelStepAside.onComplete(function() {
                        if (n > 0) {
                            window.setTimeout(function() {
                                advanceLevel(mp, n);
                            }, 750);
                        }
                    });


                    rp[1].currentPowerStageAboveZero = rp[0].currentPowerStageAboveZero;
                    rp[1].zScouter = rp[0].zScouter;
                    
                    rp[1].zScouter.mouseOver = function () {
                        var flyToPosition = rp[1].zScouter.position.clone();
                        flyToPosition.add(MathHelper.rotateVector(rp[1].display.position.clone()).normalize().multiplyScalar(-2));
                        DBZCCG.flyToPosition(flyToPosition, rp[1].display.position.clone().normalize());
                        DBZCCG.flyOverCamera.position.y = 8;
                        return "Current power stage: " + rp[1].currentPowerStageAboveZero;
                    };

                    rp[1].zScouter.mouseOut = function () {
                        DBZCCG.flyOverCamera.position.y = 15;
                    };
                    
                    rp[0].currentPowerStageAboveZero = rp[0].zScouter = undefined;
                    mp.currentMainPersonalityLevel++;
                    currentLevelStepAside.start();
                }
            }

            advanceLevel();

            if (desiredLevels != n) {
                window.setTimeout(function() {
                    DBZCCG.performingAnimation = false;
                    var currentLevel = mp.personalities[mp.currentMainPersonalityLevel - 1];
                    DBZCCG.quickMessage(previousLevel.displayName() + " advanced to " + currentLevel.displayName() + ".");
                    mp.moveZScouter("max");
                    mp.setAnger(0, true);
                }, (80 + 80 + 120 + 750) * (desiredLevels - n) + 200);
            }
        };

        this.addToField = function(position, field) {
            this.display = new THREE.Object3D();
            this.display.name = "mp";
            for (var i = 0; i < this.personalities.length; i++) {
                var card = this.personalities[i];
                card.faceup();
                card.turnThisWay(position);
                card.display.position = position.clone().multiplyScalar(1.3);
                var diffName = card.display.position.clone().normalize();
                card.display.position.add(diffName.multiplyScalar(-Card.personalityNameDiff[card.saga] * i));
                card.moveY(this.personalities.length - 1 - i);
                this.display.add(card.display);
                DBZCCG.objects.push(card.display);
            }
            this.personalities[0].addZScouter(field, this.personalities[0].display.position, this.personalities.length);
            this.personalities[0].moveZScouter(this.currentPowerStageAboveZero, true, true);
            this.addZSword(field, position);
            
            var mp = this ;
            mp.display.mouseOver = function() {
                var card = mp.personalities[mp.currentMainPersonalityLevel - 1];
                DBZCCG.selectionEffect(DBZCCG.selectionColor, card.display.children);
                DBZCCG.flyToPosition(card.display.position, card.display.position.clone().normalize());
                DBZCCG.selectionParticles.position.copy(card.display.position);
                DBZCCG.selectionParticles.visible = true;
                // add card description
    //            return "Current anger level: " + mp.currentAngerLevel;
            };

            mp.display.mouseOut = function() {
                var card = mp.personalities[mp.currentMainPersonalityLevel - 1];
                DBZCCG.selectionEffect(DBZCCG.clearSelectionColor, card.display.children);
                DBZCCG.selectionParticles.visible = false;
            };

            
            field.add(this.display);
        };

        this.personalities = [];
        for (var i = 0; i < data.personalities.length; i++) {
            this.personalities.push(Personality.create(data.personalities[i]));
            delete this.personalities[i].display.mouseOver;
            delete this.personalities[i].display.mouseOut;
        }

        this.angerLevelNeededToLevel = data.angerLevelNeededToLevel;
        this.currentAngerLevel = data.currentAngerLevel;
        this.currentPowerStageAboveZero = data.currentPowerStageAboveZero;
        this.currentMainPersonalityLevel = data.currentMainPersonalityLevel;
        this.personalities[this.currentMainPersonalityLevel - 1].currentPowerStageAboveZero = data.currentPowerStageAboveZero;
    }

    return new MainPersonalityObject(data);
};