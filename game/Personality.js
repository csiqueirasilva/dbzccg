Personality = {};

Personality.GOKU = 1;
Personality.NAPPA = 2;
Personality.VEGETA = 3;
Personality.RADITZ = 4;
Personality.PICCOLO = 5;
Personality.CHIAOTZU = 6;
Personality.TIEN = 7;
Personality.KRILLIN = 8;
Personality.GOHAN = 9;
Personality.YAMCHA = 10;
Personality.YAJIROBI = 11;
Personality.BULMA = 12;
Personality.CHICHI = 13;

Personality.SaiyanHeritage = [Personality.GOKU, Personality.NAPPA, Personality.VEGETA, Personality.RADITZ, Personality.GOHAN];
Personality.NamekianHeritage = [Personality.PICCOLO];

Personality.create = function(data) {

    function PersonalityObject(data) {
        card = Card.create(data);

        for (var key in card) {
            this[key] = card[key];
        }
        
        this.displayName = function() {
            return "LV" + this.level + " " + this.name;
        }
        
        this.moveZScouter = function(toPowerStages, noDelay, noMessage) {
            if (this.zScouter) {
                toPowerStages = toPowerStages == "max" || toPowerStages > this.powerStages.length - 1 ? this.powerStages.length - 1 : toPowerStages;
                DBZCCG.performingAnimation = true;
                var eastDir = this.zScouter.dirVector.clone().normalize();
                var southDir = eastDir.clone();
                eastDir.multiplyScalar(Card.cardWidth * 0.95);
                eastDir = MathHelper.rotateVector(eastDir);
                var northDir = southDir.clone();
                southDir.multiplyScalar(Card.cardHeight * 0.61);
                northDir.multiplyScalar(-1 * Card.personalityPowerStageDiff[this.saga][this.powerStageType]['diff'] * toPowerStages);
                var startPos = this.zScouter.position.clone();
                var endPos = new THREE.Vector3();
                endPos.x = this.display.position.x;
                endPos.z = this.display.position.z;
                endPos
                        // Move east, to match the gap in scouter to the power stages
                        .add(eastDir)
                        // Move to the "0" power stage
                        .add(southDir)
                        // Raise up any number of power stages in the function parameter
                        .add(northDir);
                
                var moveAnimation = new TWEEN.Tween(startPos).to(endPos, 120);
                moveAnimation.easing(TWEEN.Easing.Circular.In);

                var zScouter = this.zScouter;
                moveAnimation.onUpdate(function() {
                    zScouter.position.x = startPos.x;
                    zScouter.position.z = startPos.z;
                });
                
                var card = this;
                moveAnimation.onComplete(function() {
                    DBZCCG.performingAnimation = false;
                    if(!noMessage) {
                        var msg = card.displayName()+" power stages was set to "+card.powerStages[card.currentPowerStageAboveZero];
                        if (card.currentPowerStageAboveZero == card.powerStages.length - 1) {
                            msg += " (max)";
                        } else if (card.currentPowerStageAboveZero != 0) {
                            msg += " ("+card.currentPowerStageAboveZero+" "+(card.currentPowerStageAboveZero == 1 ? "stage" : "stages")+" above 0)";
                        } 
                        
                        msg += ".";
                        DBZCCG.quickMessage(msg);
                    }
                });
                
                if(!noDelay) {
                    moveAnimation.delay(500);
                }
                
                card.currentPowerStageAboveZero = toPowerStages;
                moveAnimation.start();
            }
        }

        this.addZScouter = function(field, dirVector, distanceFromY) {
            var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
                console.log(item, loaded, total);
            };

            var loader = new THREE.JSONLoader(manager);
            var personality = this;

            loader.load("model/zscouter.js", function(geometry) {
                personality.zScouter = new THREE.Object3D();
                personality.zScouter.name = 'zScouter'+personality.name;
                var meshZScouter = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({shading: THREE.FlatShading, color: 0xFF2233}));
                personality.zScouter.add(meshZScouter);
                personality.zScouter.rotation.y = Math.PI;
                personality.zScouter.rotation.z = Math.PI / 2;

                personality.zScouter.rotation.y = MathHelper.angleVectors(new THREE.Vector3(0, 0, -1), personality.display.position);

                personality.zScouter.position.y += Card.cornerWidth * Card.cardThicknessScale * distanceFromY * 2 ;
                personality.zScouter.dirVector = dirVector;
                personality.zScouter.receiveShadow = true;
                personality.moveZScouter(personality.currentPowerStageAboveZero || 0, true, true);
                
                personality.zScouter.mouseOver = function () {
                    var flyToPosition = personality.zScouter.position.clone();
                    flyToPosition.add(MathHelper.rotateVector(personality.display.position.clone()).normalize().multiplyScalar(-2));
                    DBZCCG.flyToPosition(flyToPosition, personality.display.position.clone().normalize());
                    DBZCCG.flyOverCamera.position.y = 8;
                    return "Current power stage: " + personality.currentPowerStageAboveZero;
                };

                personality.zScouter.mouseOut = function () {
                    DBZCCG.flyOverCamera.position.y = 15;
                };
                
                DBZCCG.objects.push(personality.zScouter);
                field.add(personality.zScouter);
            });
        };

        this.level = data.level;
        this.personality = data.personality;
        this.powerStages = data.powerStages;
        this.style = Card.Style.Freestyle;
        this.powerStageType = data.powerStageType || 'regular';
        this.currentPowerStageAboveZero = data.currentPowerStageAboveZero; 
    }

    return new PersonalityObject(data);
};