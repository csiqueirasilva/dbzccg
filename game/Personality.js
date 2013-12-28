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
Personality.SAIBAIMEN = 14;

Personality.alignment = {};
Personality.alignment.Hero = 1;
Personality.alignment.Villain = 2;
Personality.alignment.Rogue = 3;

Personality.SaiyanHeritage = [Personality.GOKU, Personality.NAPPA, Personality.VEGETA, Personality.RADITZ, Personality.GOHAN];
Personality.NamekianHeritage = [Personality.PICCOLO];
Personality.Hero = [Personality.GOKU, Personality.VEGETA, Personality.PICCOLO, Personality.CHIAOTZU, Personality.TIEN, Personality.KRILLIN, Personality.GOHAN, Personality.YAMCHA, Personality.YAJIROBI, Personality.BULMA, Personality.CHICHI];
Personality.Villain = [Personality.SAIBAIMEN, Personality.RADITZ, Personality.PICCOLO, Personality.VEGETA, Personality.NAPPA];

Personality.zScouterMaterial = new THREE.MeshLambertMaterial({shading: THREE.SmoothShading, color: 0xFF2233});

Personality.create = function(data) {

    function PersonalityObject(data) {
        var card = Card.create(data);

        for (var key in card) {
            this[key] = card[key];
        }

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
            content += "<div class='personality-alignment-label'>Alignment: " + getKeyByValue(Personality.alignment, card.alignment) + "</div>";
            content += "<div class='personality-powerstage-label'>Power Stages (" + (+card.powerStages.length - 1) + " total stages above zero): <br />" + card.powerStages.slice(0).reverse().toString().replace(/,/g, '<br />') + "</div>";

            content += sagaLabel;

            return content;
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

                var meshZScouter = new THREE.Mesh(geometry, Personality.zScouterMaterial);
                personality.zScouter.add(meshZScouter);
                personality.zScouter.rotation.y = Math.PI;
                personality.zScouter.rotation.z = Math.PI / 2;

                personality.zScouter.rotation.y = MathHelper.angleVectors(new THREE.Vector3(0, 0, -1), personality.display.position);

                personality.zScouter.position.y += Card.cornerWidth * Card.cardThicknessScale * distanceFromY * 2;
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

            if (!Personality.zScouterModel) {
                var loader = new THREE.JSONLoader(manager);
                loader.load("model/zscouter.js", function(geometry) {
                    Personality.zScouterModel = geometry;
                    loadZScouter(Personality.zScouterModel, field);
                });
            } else {
                loadZScouter(Personality.zScouterModel, field);
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