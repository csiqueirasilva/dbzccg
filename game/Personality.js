DBZCCG.Personality = {};

DBZCCG.Personality.GOKU = 1;
DBZCCG.Personality.NAPPA = 2;
DBZCCG.Personality.VEGETA = 3;
DBZCCG.Personality.RADITZ = 4;
DBZCCG.Personality.PICCOLO = 5;
DBZCCG.Personality.CHIAOTZU = 6;
DBZCCG.Personality.TIEN = 7;
DBZCCG.Personality.KRILLIN = 8;
DBZCCG.Personality.GOHAN = 9;
DBZCCG.Personality.YAMCHA = 10;
DBZCCG.Personality.YAJIROBI = 11;
DBZCCG.Personality.BULMA = 12;
DBZCCG.Personality.CHICHI = 13;
DBZCCG.Personality.SAIBAIMEN = 14;

DBZCCG.Personality.FemaleList = [
    DBZCCG.Personality.BULMA,
    DBZCCG.Personality.CHICHI
];

DBZCCG.Personality.alignment = {};
DBZCCG.Personality.alignment.Hero = 1;
DBZCCG.Personality.alignment.Villain = 2;
DBZCCG.Personality.alignment.Rogue = 3;

DBZCCG.Personality.SaiyanHeritage = [DBZCCG.Personality.GOKU, DBZCCG.Personality.NAPPA, DBZCCG.Personality.VEGETA, DBZCCG.Personality.RADITZ, DBZCCG.Personality.GOHAN];
DBZCCG.Personality.NamekianHeritage = [DBZCCG.Personality.PICCOLO];
DBZCCG.Personality.Hero = [DBZCCG.Personality.GOKU, DBZCCG.Personality.VEGETA, DBZCCG.Personality.PICCOLO, DBZCCG.Personality.CHIAOTZU, DBZCCG.Personality.TIEN, DBZCCG.Personality.KRILLIN, DBZCCG.Personality.GOHAN, DBZCCG.Personality.YAMCHA, DBZCCG.Personality.YAJIROBI, DBZCCG.Personality.BULMA, DBZCCG.Personality.CHICHI];
DBZCCG.Personality.Villain = [DBZCCG.Personality.SAIBAIMEN, DBZCCG.Personality.RADITZ, DBZCCG.Personality.PICCOLO, DBZCCG.Personality.VEGETA, DBZCCG.Personality.NAPPA];

DBZCCG.Personality.zScouterMaterial = new THREE.MeshLambertMaterial({shading: THREE.SmoothShading, color: 0xFF2233});

DBZCCG.Personality.create = function(data) {

    function PersonalityObject(data) {
        ClassHelper.extends(this, DBZCCG.Card.create(data));

        this.displayName = function() {
            return "LV" + this.level + " " + this.name;
        }

        var cardDescription = this.display.descriptionBox;
        var card = this;
        this.display.descriptionBox = function() {
            var cardDesc = cardDescription();
            cardDesc = cardDesc.replace(/%type%/g, "Personality");
            var elements = $(cardDesc).not(".card-saga-label");
            var sagaLabel = $(cardDesc).filter(".card-saga-label")[0].outerHTML;
            var content = '';

            $.each(elements, function(key, value) {
                content += value.outerHTML;
            });

            content += "<div class='personality-pur-label'>Personality Level: " + card.level + "</div>";
            content += "<div class='personality-pur-label'>Power-Up Rating: " + card.PUR + "</div>";
            content += "<div class='personality-alignment-label'>Alignment: " + getKeyByValue(DBZCCG.Personality.alignment, card.alignment) + "</div>";
            content += "<div class='personality-powerstage-label'>Power Stages (" + (+card.powerStages.length - 1) + " total stages above zero): <br />" + card.powerStages.slice(0).reverse().toString().replace(/,/g, '<br />') + "</div>";

            content += sagaLabel;

            return content;
        }

        this.raiseZScouter = function (numberPowerStages, noDelay, noMessage) {
            if(numberPowerStages === 0) {
                return;
            }

            if(this.currentPowerStageAboveZero === 0 && numberPowerStages < 0) {
                if(!noMessage) {
                    DBZCCG.quickMessage(this.displayName() + ' already at 0.');
                }
                
                return numberPowerStages;
            } else if (this.currentPowerStageAboveZero === this.powerStages.length - 1 && numberPowerStages > 0) {
                if(!noMessage) {
                    DBZCCG.quickMessage(this.displayName() + ' already at maximum power stage level.');
                }
                
                return numberPowerStages;
            }
            
            var action = 'gained';
            if(numberPowerStages < 0) {
                action = 'lost';
            }

            var resultPowerStage = this.currentPowerStageAboveZero + numberPowerStages;
            var diffPowerStage = resultPowerStage - this.currentPowerStageAboveZero;
            var leftover;
            
            if(!this.powerStages[resultPowerStage]) {
                leftover = resultPowerStage;
                resultPowerStage = resultPowerStage > 0 ? this.powerStages.length - 1 : 0;
                diffPowerStage = resultPowerStage - this.currentPowerStageAboveZero;
            }
            
            this.moveZScouter(resultPowerStage, noDelay, true);
            
           if(!noMessage) {
                var msg = this.displayName() + " " + action + " " + Math.abs(diffPowerStage) + " power stage" + (Math.abs(diffPowerStage) > 1 ? "s" : "") + ".";
                DBZCCG.quickMessage(msg);
            }
            
            return leftover;
        }

        this.moveZScouter = function(toPowerStages, noDelay, noMessage) {
            if (this.zScouter) {
                toPowerStages = toPowerStages == "max" || toPowerStages > this.powerStages.length - 1 ? this.powerStages.length - 1 : toPowerStages;
                DBZCCG.performingAnimation = true;
                var eastDir = this.zScouter.dirVector.clone().normalize();
                var southDir = eastDir.clone();
                eastDir.multiplyScalar(DBZCCG.Card.cardWidth * 0.95);
                eastDir = MathHelper.rotateVector(eastDir);
                var northDir = southDir.clone();
                southDir.multiplyScalar(DBZCCG.Card.cardHeight * 0.61);
                northDir.multiplyScalar(-1 * DBZCCG.Card.personalityPowerStageDiff[this.saga][this.powerStageType]['diff'] * toPowerStages);
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
                    if (!noMessage) {
                        var msg = card.displayName() + " power stages was set to " + card.powerStages[card.currentPowerStageAboveZero];
                        if (card.currentPowerStageAboveZero == card.powerStages.length - 1) {
                            msg += " (max)";
                        } else if (card.currentPowerStageAboveZero != 0) {
                            msg += " (" + card.currentPowerStageAboveZero + " " + (card.currentPowerStageAboveZero == 1 ? "stage" : "stages") + " above 0)";
                        }

                        msg += ".";
                        DBZCCG.quickMessage(msg);
                    }
                });

                if (!noDelay) {
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

            var personality = this;
            personality.zScouter = new THREE.Object3D();
            personality.zScouter.dirVector = dirVector;

            function loadZScouter(geometry, field) {
                personality.zScouter.leftScreenCallback = function(source, created) {
                    var obj = new THREE.Object3D();
                    created.rotation.set(0, 0, 0);
                    created.position.set(0, 0, 0);
                    created.rotation.z = -Math.PI / 2;
                    created.rotation.x = Math.PI;
                    obj.add(created);
                    created.position.z += 1.4;
                    created.position.x += 1.1;
                    return obj;
                };

                personality.zScouter.name = 'zScouter' + personality.name;
                personality.zScouter.displayName = function() {
                    return 'Z-Scouter: ' + personality.displayName();
                };

                var meshZScouter = new THREE.Mesh(geometry, DBZCCG.Personality.zScouterMaterial);
                personality.zScouter.add(meshZScouter);
                personality.zScouter.rotation.y = Math.PI;
                personality.zScouter.rotation.z = Math.PI / 2;

                personality.zScouter.rotation.y = MathHelper.angleVectors(new THREE.Vector3(0, 0, -1), personality.display.position);

                personality.zScouter.position.y += DBZCCG.Card.cornerWidth * DBZCCG.Card.cardThicknessScale * distanceFromY * 2;
                personality.zScouter.receiveShadow = true;
                personality.moveZScouter(personality.currentPowerStageAboveZero || 0, true, true);

                personality.zScouter.descriptionBox = function() {
                    var descriptionBoxText = "<div><b>" + personality.displayName() + "</b> current power stage level: " + personality.powerStages[personality.currentPowerStageAboveZero];

                    if (personality.currentPowerStageAboveZero == personality.powerStages.length - 1) {
                        descriptionBoxText += " (max)";
                    } else if (personality.currentPowerStageAboveZero != 0) {
                        descriptionBoxText += " (" + personality.currentPowerStageAboveZero + " above 0)";
                    }

                    descriptionBoxText += ".</div>"

                    DBZCCG.descriptionBox(descriptionBoxText);
                };

                DBZCCG.objects.push(personality.zScouter);
                field.add(personality.zScouter);
            }

            if (!DBZCCG.Personality.zScouterModel) {
                var loader = new THREE.JSONLoader(manager);
                loader.load("model/zscouter.js", function(geometry) {
                    DBZCCG.Personality.zScouterModel = geometry;
                    loadZScouter(DBZCCG.Personality.zScouterModel, field);
                });
            } else {
                loadZScouter(DBZCCG.Personality.zScouterModel, field);
            }
        };

        this.level = data.level;
        this.powerStages = data.powerStages;
        this.powerStageType = data.powerStageType || 'regular';
        this.currentPowerStageAboveZero = data.currentPowerStageAboveZero;
        this.alignment = data.alignment;
        this.PUR = data.PUR;
    }

    return new PersonalityObject(data);
};