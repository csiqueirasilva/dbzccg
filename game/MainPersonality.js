DBZCCG.MainPersonality = {};

DBZCCG.MainPersonality.maxLevel = 5;

// Globals for the zSword Model
DBZCCG.MainPersonality.zSwordMaterial = new THREE.MeshLambertMaterial({side: THREE.DoubleSide, shading: THREE.SmoothShading, color: 0x777777});

DBZCCG.MainPersonality.create = function(data) {

    function MainPersonalityObject(data) {

        this.raiseZScouter = function(numberPowerStages, noDelay, noMessage) {
            this.personalities[this.currentMainPersonalityLevel - 1].raiseZScouter(numberPowerStages, noDelay, noMessage);
        };

        this.moveZScouter = function(toPowerStage, noDelay, noMessage) {
            this.personalities[this.currentMainPersonalityLevel - 1].moveZScouter(toPowerStage, noDelay, noMessage);
        };

        this.neutralPositionScabbard = function(dirVector) {
            var dirVector = dirVector.clone();
            this.zScabbard.rotation.copy(this.zSword.rotation);
            this.zScabbard.position.copy(this.zSword.position);
            this.zScabbard.position.add(dirVector.multiplyScalar(0.075));
            this.zScabbard.position.y += -0.075;
            this.zScabbard.scale.copy(this.zSword.scale);
        };

        this.addZSword = function(field, dirVector) {
            var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
                console.log(item, loaded, total);
            };

            var mp = this;
            mp.zSwordComplete = new THREE.Object3D();
            mp.zSwordComplete.name = 'zSwordComplete';
            mp.zSwordComplete.displayName = function() {
                return 'Z-Sword: ' + mp.personalities[mp.currentMainPersonalityLevel - 1].displayName();
            };

            mp.zSwordComplete.leftScreenCallback = function(source, created) {
                var rotate = false;
                var zTranslate = created.position.z;

                if (created.position.z < 0) {
                    rotate = true;
                }

                created.position.set(0, 0, 0);
                var obj = new THREE.Object3D();

                obj.add(created);
                obj.position.copy(source.position);
                obj.position.y -= 1;

                if (rotate) {
                    obj.rotation.y = Math.PI;
                    created.rotation.y = Math.PI;
                }

                created.position.y = 6;
                created.position.x = -2;
                created.position.z = 4.5 + mp.currentAngerLevel * 0.8;

                return obj;
            };

            function loadZSwordComplete(geometrySword, geometryScabbard, field) {
                mp.zSword = new THREE.Mesh(geometrySword, DBZCCG.MainPersonality.zSwordMaterial);
                mp.zSword.rotation.x = dirVector.clone().cross(new THREE.Vector3(0, 1, 0)).x > 0 ? -Math.PI / 2 : Math.PI / 2;
                mp.zSword.rotation.y = MathHelper.angleVectors(new THREE.Vector3(0, 0, 1), dirVector) - Math.PI / 2;
                mp.zSword.position.copy(dirVector);
                mp.zSword.scale = new THREE.Vector3(3, 3, 3);
                mp.zSword.position.y = 0.2;
                mp.zSwordComplete.add(mp.zSword);

                mp.zScabbard = new THREE.Mesh(geometryScabbard, DBZCCG.MainPersonality.zSwordMaterial);
                mp.zSwordComplete.add(mp.zScabbard);
                mp.neutralPositionScabbard(dirVector);
                mp.zSwordComplete.position.add(MathHelper.rotateVector(dirVector).multiplyScalar(-0.54));
                DBZCCG.objects.push(mp.zSwordComplete);
                mp.zSwordComplete.cursor = 'pointer';

                mp.zSwordComplete.descriptionBox = function() {
                    var descriptionBoxText = "<div><b>" + mp.personalities[mp.currentMainPersonalityLevel - 1].displayName() + "</b> current anger level: " + mp.currentAngerLevel + "</div><div>(" +
                            (mp.currentMainPersonalityLevel != mp.personalities.length ? "Levels up" : "Goes to highest power stage")
                            + " with " + mp.angerLevelNeededToLevel + " anger)</div>";
                    DBZCCG.descriptionBox(descriptionBoxText);
                };

                var anger = mp.currentAngerLevel;
                mp.zScabbard.position.add(
                        MathHelper
                        .rotateVector(mp.personalities[0].display.position)
                        .normalize()
                        .multiplyScalar(-1 * 0.785 * anger));

                field.add(mp.zSwordComplete);
            }

            if (!DBZCCG.MainPersonality.zSwordModel) {
                var loader = new THREE.JSONLoader(manager);
                loader.load("model/zsword.js", function(geometry) {
                    DBZCCG.MainPersonality.zSwordModel = geometry;

                    loader.load("model/zswordcover.js", function(geometry) {
                        DBZCCG.MainPersonality.zScabbardModel = geometry;
                        loadZSwordComplete(DBZCCG.MainPersonality.zSwordModel, DBZCCG.MainPersonality.zScabbardModel, field);
                    });
                });
            } else {
                loadZSwordComplete(DBZCCG.MainPersonality.zSwordModel, DBZCCG.MainPersonality.zScabbardModel, field);
            }
        };

        this.setAnger = function(n, noDelay, noMessage) {
            // Sword animation
            var mp = this;
            var anger = parseInt(n);

            if (anger < this.angerLevelNeededToLevel && anger >= 0 && anger !== this.currentAngerLevel) {
                DBZCCG.performingAnimation = true;
                var oldAnger = this.currentAngerLevel;
                var position = this.zScabbard.position.clone();
                var moveAxis = this.personalities[0].display.position.clone().normalize();

                var target = this.zSword.position.clone();
                target.y += -0.075;
                target.add(moveAxis.clone().multiplyScalar(0.49));
                target.add(moveAxis.multiplyScalar(-1 * ((anger - oldAnger) / Math.abs(anger - oldAnger)) * 0.785 * anger));

                var animation = new TWEEN.Tween(position).to(target, 600 + 50 * Math.abs(anger - oldAnger));
                var scabbard = this.zScabbard.position;

                animation.onStart(function() {
                    var text = "=" + anger;
                    DBZCCG.Combat.hoverText(text, mp.zScabbard);
                    DBZCCG.Sound.anger(anger - oldAnger);
                });

                animation.onUpdate(function() {
                    scabbard.copy(position);
                });

                if (!noDelay) {
                    animation.delay(500);
                }

                animation.onComplete(function() {
                    if (!noMessage) {
                        var msg = mp.personalities[mp.currentMainPersonalityLevel - 1].displayName() + "'s anger was set to " + anger + ".";
                        DBZCCG.Log.logEntry(msg);
                    }
                    mp.currentAngerLevel = anger;
                    DBZCCG.performingAnimation = false;
                    window.setTimeout(function() {
                        if (DBZCCG.resizeLabels instanceof Function) {
                            DBZCCG.resizeLabels();
                        }
                    }, 200);
                });

                animation.easing(TWEEN.Easing.Circular.In);

                animation.start();
            } else if (anger === this.currentAngerLevel) {
                DBZCCG.Log.logEntry("No change at anger level");
            }
        };

        this.changeAnger = function(n, noDelay, noMessage) {
            // Sword animation
            if (n !== 0) {
                DBZCCG.performingAnimation = true;
                var anger = parseInt(n);
                var updateLevel = false;
                var oldAnger = this.currentAngerLevel;

                if (anger + this.currentAngerLevel >= this.angerLevelNeededToLevel) {
                    anger = this.angerLevelNeededToLevel >= 5 ? 5 : this.angerLevelNeededToLevel;
                    updateLevel = true;
                } else if (anger + this.currentAngerLevel <= 0) {
                    anger = 0;
                } else if (anger === 0) {
                    anger = this.currentAngerLevel;
                } else {
                    anger = anger + this.currentAngerLevel;
                }

                if (anger !== oldAnger) {

                    var position = this.zScabbard.position.clone();
                    var moveAxis = this.personalities[0].display.position.clone().normalize();

                    var target;

                    target = this.zSword.position.clone();
                    target.y += -0.075;
                    target.add(moveAxis.clone().multiplyScalar(0.49));

                    target.add(moveAxis.multiplyScalar(0.785 * anger));

                    var animation = new TWEEN.Tween(position).to(target, 600 + 50 * Math.abs(anger - oldAnger));
                    var scabbard = this.zScabbard.position;

                    var mp = this;
                    var diffAnger = anger - oldAnger;

                    animation.onStart(function() {
                        var text;
                        if (oldAnger === 0 && anger > 0 || oldAnger !== 0) {
                            text = (diffAnger < 0 ? '' : '+') + diffAnger;
                            DBZCCG.Combat.hoverText(text, mp.zScabbard);
                        }
                        DBZCCG.Sound.anger(diffAnger);
                    });

                    animation.onUpdate(function() {
                        scabbard.copy(position);
                    });

                    if (!noDelay) {
                        animation.delay(500);
                    }

                    animation.onComplete(function() {
                        if (!noMessage) {
                            if (oldAnger !== anger) {
                                var msg;
                                if (diffAnger < 0) {
                                    msg = mp.personalities[mp.currentMainPersonalityLevel - 1].displayName() + " lost " + Math.abs(diffAnger) + " anger.";
                                } else {
                                    msg = mp.personalities[mp.currentMainPersonalityLevel - 1].displayName() + " gained " + diffAnger + " anger.";
                                }
                                DBZCCG.Log.logEntry(msg);
                                window.setTimeout(function() {
                                    if (DBZCCG.resizeLabels instanceof Function) {
                                        DBZCCG.resizeLabels();
                                    }
                                }, 200);
                            }
                        }

                        if (updateLevel) {
                            mp.currentAngerLevel = mp.angerLevelNeededToLevel;
                            if (mp.personalities.length !== mp.currentMainPersonalityLevel) {
                                mp.advanceLevels(1);
                            } else {
                                DBZCCG.Log.logEntry(mp.personalities[mp.currentMainPersonalityLevel - 1].logName() + "'s level cannot go higher.");
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
                } else {
                    DBZCCG.Log.logEntry("No change at anger level");
                    DBZCCG.performingAnimation = false;
                }
            }
        };

        this.advanceLevels = function(n) {
            var mp = this;
            var previousLevel = mp.personalities[mp.currentMainPersonalityLevel - 1];
            previousLevel.canActivate = false;
            this.removePowerStageLabelText();

            function advanceLevel() {
                if (mp.currentMainPersonalityLevel !== mp.personalities.length && n > 0) {
                    DBZCCG.performingAnimation = true;
                    // Reorder personalities array
                    var rp = [];

                    var qttLevels = mp.personalities.length;
                    for (var i = mp.currentMainPersonalityLevel - 1;
                            rp.length !== qttLevels;
                            i++) {
                        if (i === qttLevels) {
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

                    putOldLevelBehind.onComplete(function() {
                        if (mp.currentMainPersonalityLevel !== mp.personalities.length && n > 0) {
                            window.setTimeout(function() {
                                advanceLevel(mp, n);
                            }, 750);
                        } else if (mp.currentMainPersonalityLevel === mp.personalities.length ||
                                n === 0) {
                            DBZCCG.performingAnimation = false;
                            var currentLevel = mp.personalities[mp.currentMainPersonalityLevel - 1];
                            currentLevel.canActivate = true;
                            DBZCCG.Log.logEntry(previousLevel.logName() + " advanced to " + currentLevel.logName() + ".");
                            mp.moveZScouter("max");
                            mp.setAnger(0, true);
                        }
                    });

                    rp[1].currentPowerStageAboveZero = rp[0].currentPowerStageAboveZero;
                    rp[1].zScouter = rp[0].zScouter;

                    rp[1].zScouter.displayName = function() {
                        return 'Z-Scouter: ' + rp[1].displayName();
                    };

                    rp[1].zScouter.descriptionBox = function() {
                        var descriptionBoxText = "<div><b>" + rp[1].displayName() + "</b> current power stage level: " + rp[1].powerStages[rp[1].currentPowerStageAboveZero];

                        if (rp[1].currentPowerStageAboveZero === rp[1].powerStages.length - 1) {
                            descriptionBoxText += " (max)";
                        } else if (rp[1].currentPowerStageAboveZero !== 0) {
                            descriptionBoxText += " (" + rp[1].currentPowerStageAboveZero + " above 0)";
                        }

                        descriptionBoxText += ".</div>";

                        DBZCCG.descriptionBox(descriptionBoxText);
                    };

                    rp[0].currentPowerStageAboveZero = rp[0].zScouter = undefined;
                    mp.currentMainPersonalityLevel++;
                    DBZCCG.Sound.level(1);
                    currentLevelStepAside.start();
                } else if (mp.currentMainPersonalityLevel !== 1 && n < 0) {
                    DBZCCG.performingAnimation = true;
                    // Reorder personalities array
                    var rp = [];

                    var qttLevels = mp.personalities.length;
                    for (var i = mp.currentMainPersonalityLevel - 1;
                            rp.length !== qttLevels;
                            i++) {
                        if (i === qttLevels) {
                            i = 0;
                        }
                        rp.push(mp.personalities[i]);
                    }

                    var lastPosition = rp[rp.length - 1].display.position.clone();
                    var lastPosition = {x: lastPosition.x, y: lastPosition.y, z: lastPosition.z};

                    var currentPosition = {x: lastPosition.x, y: lastPosition.y, z: lastPosition.z};
                    var stepAside = {y: 3};
                    var previousLevelStepAside = new TWEEN.Tween(currentPosition).to(stepAside, 120);

                    var lastTween = previousLevelStepAside;

                    var j = rp.length - 1;
                    var position = [];
                    var target = [];
                    for (var i = rp.length - 1; i >= 0; i--) {
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
                            j--;
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
                        rp[rp.length - 1].display.position.x = stepAside.x;
                        rp[rp.length - 1].display.position.y = stepAside.y;
                        rp[rp.length - 1].display.position.z = stepAside.z;
                    });

                    previousLevelStepAside.onUpdate(function() {
                        rp[rp.length - 1].display.position.x = currentPosition.x;
                    });

                    n--;

                    putOldLevelBehind.onComplete(function() {
                        if (mp.currentMainPersonalityLevel !== 1 && n < 0) {
                            window.setTimeout(function() {
                                advanceLevel(mp, n);
                            }, 750);
                        } else if (mp.currentMainPersonalityLevel === 1 ||
                                n === 0) {
                            DBZCCG.performingAnimation = false;
                            var currentLevel = mp.personalities[mp.currentMainPersonalityLevel - 1];
                            currentLevel.canActivate = true;
                            DBZCCG.Log.logEntry(previousLevel.logName() + " to " + currentLevel.logName() + ".");
                            mp.moveZScouter(5);
                            mp.setAnger(0, true);
                        }
                    });

                    rp[rp.length - 1].zScouter = rp[0].zScouter;

                    rp[rp.length - 1].zScouter.displayName = function() {
                        return 'Z-Scouter: ' + rp[rp.length - 1].displayName();
                    };

                    rp[rp.length - 1].zScouter.descriptionBox = function() {
                        var descriptionBoxText = "<div><b>" + rp[rp.length - 1].displayName() + "</b> current power stage level: " + rp[rp.length - 1].powerStages[rp[rp.length - 1].currentPowerStageAboveZero];

                        if (rp[rp.length - 1].currentPowerStageAboveZero === rp[rp.length - 1].powerStages.length - 1) {
                            descriptionBoxText += " (max)";
                        } else if (rp[rp.length - 1].currentPowerStageAboveZero !== 0) {
                            descriptionBoxText += " (" + rp[rp.length - 1].currentPowerStageAboveZero + " above 0)";
                        }

                        descriptionBoxText += ".</div>";

                        DBZCCG.descriptionBox(descriptionBoxText);
                    };

                    mp.currentMainPersonalityLevel--;
                    DBZCCG.Sound.level(-1);
                    previousLevelStepAside.start();
                } else {
                    var currentLevel = mp.personalities[mp.currentMainPersonalityLevel - 1];
                    currentLevel.canActivate = true;
                    if (n !== 0) {
                        if (mp.currentMainPersonalityLevel !== mp.personalities.length) {
                            DBZCCG.Log.logEntry(previousLevel.logName() + " already is the personality maximum level.");
                            mp.moveZScouter("max");
                        } else {
                            DBZCCG.Log.logEntry(previousLevel.logName() + " already is the personality minimum level.");
                            mp.moveZScouter(5);
                        }
                    }
                    mp.setAnger(0, true);
                }
            }

            advanceLevel();
        };

        this.display = new THREE.Object3D();

        var mp = this;

        this.display.displayName = function() {
            return 'Main Personality: ' + mp.personalities[mp.currentMainPersonalityLevel - 1].displayName();
        };

        function atribCallback() {
        }

        DBZCCG.Callbacks.create(this.display, 'callback', atribCallback);

        this.addToField = function(position, field) {
            this.surroundingArea = DBZCCG.Table.createSurroundingArea(position.clone().multiplyScalar(0.08), DBZCCG.Card.cardWidth * 2.5, DBZCCG.Card.cardHeight * 2.5, DBZCCG.Player.Field.cornerWidth);
            this.display.name = 'mp';
            var mp = this;

            this.display.addCallback({
                priority: 50000,
                f: function() {
                    DBZCCG.toolTip.parent = mp.currentPersonality().display;

                    function argsCallback(cb) {
                        return cb.f()
                    }
                    function solveCallback(ret) {
                    }

                    mp.currentPersonality().display.solveCallback(argsCallback, solveCallback);
                }
            });

            for (var i = 0; i < this.personalities.length; i++) {
                var card = this.personalities[i];
                card.faceup();
                card.turnThisWay(position);
                card.display.position = position.clone().multiplyScalar(1.3);
                var diffName = card.display.position.clone().normalize();
                card.display.position.add(diffName.multiplyScalar(-DBZCCG.Card.personalityNameDiff[card.saga] * i));
                card.moveY(this.personalities.length - 1 - i);
                this.display.add(card.display);
                DBZCCG.objects.push(card.display);
            }

            this.personalities[0].addZScouter(this.surroundingArea, this.personalities[0].display.position, this.personalities.length);

            this.personalities[0].zScouter.displayHoverText = function() {

                var personality = mp.currentPersonality();
                var msg = personality.powerStages[personality.currentPowerStageAboveZero];

                if (personality.currentPowerStageAboveZero === personality.powerStages.length - 1) {
                    msg += " (max)";
                } else if (personality.currentPowerStageAboveZero !== 0) {
                    msg += " (" + personality.currentPowerStageAboveZero + " " + (personality.currentPowerStageAboveZero === 1 ? "stage" : "stages") + " above 0)";
                }

                return "<b>" + personality.displayName() + "</b> current power stage level: " + "<br />" +
                        msg;
            };

            this.personalities[0].canActivate = true;
            this.personalities[0].moveZScouter(this.currentPowerStageAboveZero, true, true);
            this.addZSword(this.surroundingArea, position);

            mp.display.displayObject = function() {
                var card = mp.personalities[mp.currentMainPersonalityLevel - 1];
                return card.display;
            };


            mp.display.descriptionBox = function() {
                var card = mp.personalities[mp.currentMainPersonalityLevel - 1];
                DBZCCG.descriptionBox(card.descriptionBox());
            };

            this.surroundingArea.add(this.display);
            field.add(this.surroundingArea);
        };

        var mp = this;
        mp.currentPersonality = function() {
            return mp.personalities[mp.currentMainPersonalityLevel - 1];
        };

        mp.displayName = function() {
            return mp.currentPersonality().displayName();
        };

        this.removePowerStageLabelText = function() {
            this.currentPersonality().removePowerStageLabelText();
        };

        this.changePowerStageLabelText = function(text) {
            this.currentPersonality().changePowerStageLabelText(text);
        };

        this.removeAngerLabelText = function() {
            if (this.angerLabelText) {
                $(this.angerLabelText).remove();
                this.angerLabelText = undefined;
            }
        };

        this.changeAngerLabelText = function(text) {
            this.removeAngerLabelText();

            var position = DBZCCG.Screen.getWindowCoords(this.zSword);

            if (!isNaN(position.x)) {
                this.angerLabelText = DBZCCG.Combat.labelText(text || (this.currentAngerLevel + "/" + this.angerLevelNeededToLevel), position, 0xFFFFFF, 800, 1);
            }
        };

        this.personalities = [];
        for (var i = 0; i < data.personalities.length; i++) {
            this.personalities.push(DBZCCG.Personality.create(data.personalities[i]));
            this.personalities[i].descriptionBox = this.personalities[i].display.descriptionBox;
            this.personalities[i].display.displayName = this.display.displayName;
            this.personalities[i].canActivate = false;
        }

        this.angerLevelNeededToLevel = data.angerLevelNeededToLevel;
        this.currentAngerLevel = data.currentAngerLevel;
        this.currentPowerStageAboveZero = data.currentPowerStageAboveZero;
        this.currentMainPersonalityLevel = data.currentMainPersonalityLevel;
        this.personalities[this.currentMainPersonalityLevel - 1].currentPowerStageAboveZero = data.currentPowerStageAboveZero;
        this.alignment = data.alignment;
    }

    return new MainPersonalityObject(data);
};