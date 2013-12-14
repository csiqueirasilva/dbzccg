MainPersonality = {};

MainPersonality.maxLevel = 5;

MainPersonality.create = function(data) {
    
    function MainPersonalityObject (data) {
        this.advanceLevels = function(n) {
            var mp = this;
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

                    if (n > 0) {
                        currentLevelStepAside.onComplete(function() {
                            window.setTimeout(function() {
                                advanceLevel(mp, n);
                            }, 750);
                        });
                    }

                    mp.currentMainPersonalityLevel++;
                    currentLevelStepAside.start();
                }
            }

            advanceLevel();

        };

        this.addToField = function(position, field) {
            for(var i = 0; i < this.personalities.length; i++) {
                var card = this.personalities[i];
                card.faceup();
                card.turnThisWay(position);
                card.display.position = position.clone();
                card.display.position.multiplyScalar(1 - Card.personalityNameDiff[card.saga] * i);
                card.moveY(this.personalities.length - 1 - i);
                field.add(card.display);
            }
            this.personalities[0].addZScouter(field, this.currentPowerStageAboveZero, this.personalities[0].display.position, this.personalities.length - 1);
        }

        this.personalities = [];
        for(var i = 0; i < data.personalities.length; i++) {
            this.personalities.push(Personality.create(data.personalities[i]));
        }
        
        this.currentMainPersonalityLevel = data.currentMainPersonality;
        this.currentPowerStageAboveZero = data.currentPowerStageAboveZero;
    }
    
    return new MainPersonalityObject(data);
};