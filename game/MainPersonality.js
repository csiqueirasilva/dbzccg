MainPersonality = {};

MainPersonality.maxLevel = 5;

MainPersonality.create = function(data) {
    
    function MainPersonalityObject (data) {
        
        this.moveZScouter = function(toPowerStage) {
            this.personalities[this.currentMainPersonalityLevel-1].moveZScouter(toPowerStage);
        }
        
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
                        if(n > 0) {
                            window.setTimeout(function() {
                                advanceLevel(mp, n);
                            }, 750);
                        }
                    });
                    
                    
                    rp[1].currentPowerStageAboveZero = rp[0].currentPowerStageAboveZero;
                    rp[1].zScouter = rp[0].zScouter;
                    rp[0].currentPowerStageAboveZero = rp[0].zScouter = undefined;
                    mp.currentMainPersonalityLevel++;
                    currentLevelStepAside.start();
                }
            }

            advanceLevel();
            
            if(desiredLevels != n) {
                window.setTimeout(function() {
                    DBZCCG.performingAnimation = false;
                    var currentLevel = mp.personalities[mp.currentMainPersonalityLevel - 1];
                    DBZCCG.quickMessage(previousLevel.displayName() + " advanced to "+ currentLevel.displayName() + ".");
                    mp.moveZScouter("max");
                }, (80+80+120+750)*(desiredLevels-n) + 200 );
            }
        };

        this.addToField = function(position, field) {
            for(var i = 0; i < this.personalities.length; i++) {
                var card = this.personalities[i];
                card.faceup();
                card.turnThisWay(position);
                card.display.position = position.clone();
                var diffName = card.display.position.clone().normalize();
                card.display.position.add(diffName.multiplyScalar(-Card.personalityNameDiff[card.saga] * i));
                card.moveY(this.personalities.length - 1 - i);
                field.add(card.display);
            }
            this.personalities[0].addZScouter(field, this.personalities[0].display.position, this.personalities.length - 1);
        }

        this.personalities = [];
        for(var i = 0; i < data.personalities.length; i++) {
            this.personalities.push(Personality.create(data.personalities[i]));
        }
        
        this.currentMainPersonalityLevel = data.currentMainPersonality;
        this.personalities[this.currentMainPersonalityLevel - 1].currentPowerStageAboveZero = data.currentPowerStageAboveZero;
    }
    
    return new MainPersonalityObject(data);
};