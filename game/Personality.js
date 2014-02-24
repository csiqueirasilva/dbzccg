DBZCCG.Personality = {};

DBZCCG.Personality.Personalities = {};

DBZCCG.Personality.Personalities.GOKU = 1;
DBZCCG.Personality.Personalities.NAPPA = 2;
DBZCCG.Personality.Personalities.VEGETA = 3;
DBZCCG.Personality.Personalities.RADITZ = 4;
DBZCCG.Personality.Personalities.PICCOLO = 5;
DBZCCG.Personality.Personalities.CHIAOTZU = 6;
DBZCCG.Personality.Personalities.TIEN = 7;
DBZCCG.Personality.Personalities.KRILLIN = 8;
DBZCCG.Personality.Personalities.GOHAN = 9;
DBZCCG.Personality.Personalities.YAMCHA = 10;
DBZCCG.Personality.Personalities.YAJIROBE = 11;
DBZCCG.Personality.Personalities.BULMA = 12;
DBZCCG.Personality.Personalities.CHICHI = 13;
DBZCCG.Personality.Personalities.SAIBAIMEN = 14;

DBZCCG.Personality.FemaleList = [
    DBZCCG.Personality.Personalities.BULMA,
    DBZCCG.Personality.Personalities.CHICHI
];

DBZCCG.Personality.alignment = {};
DBZCCG.Personality.alignment.Hero = 1;
DBZCCG.Personality.alignment.Villain = 2;
DBZCCG.Personality.alignment.Rogue = 3;

DBZCCG.Personality.SaiyanHeritage = [DBZCCG.Personality.Personalities.GOKU, DBZCCG.Personality.Personalities.NAPPA, DBZCCG.Personality.Personalities.VEGETA, DBZCCG.Personality.Personalities.RADITZ, DBZCCG.Personality.Personalities.GOHAN];
DBZCCG.Personality.NamekianHeritage = [DBZCCG.Personality.Personalities.PICCOLO];
DBZCCG.Personality.Hero = [DBZCCG.Personality.Personalities.GOKU, DBZCCG.Personality.Personalities.VEGETA, DBZCCG.Personality.Personalities.PICCOLO, DBZCCG.Personality.Personalities.CHIAOTZU, DBZCCG.Personality.Personalities.TIEN, DBZCCG.Personality.Personalities.KRILLIN, DBZCCG.Personality.Personalities.GOHAN, DBZCCG.Personality.Personalities.YAMCHA, DBZCCG.Personality.Personalities.YAJIROBE, DBZCCG.Personality.Personalities.BULMA, DBZCCG.Personality.Personalities.CHICHI];
DBZCCG.Personality.Villain = [DBZCCG.Personality.Personalities.SAIBAIMEN, DBZCCG.Personality.Personalities.RADITZ, DBZCCG.Personality.Personalities.PICCOLO, DBZCCG.Personality.Personalities.VEGETA, DBZCCG.Personality.Personalities.NAPPA];

DBZCCG.Personality.zScouterMaterial = new THREE.MeshLambertMaterial({shading: THREE.SmoothShading, color: 0xFF2233});

DBZCCG.Personality.checkHeritage = function(personality, heritage) {
    heritage = heritage.charAt(0).toUpperCase() + heritage.substring(1) + 'Heritage';
    var ret = false;
    for (var i = 0; i < DBZCCG.Personality[heritage].length && !ret; i++) {
        if (ClassHelper.checkValue(personality, DBZCCG.Personality[heritage][i])) {
            ret = true;
        }
    }
    return ret;
};

DBZCCG.Personality.create = function(data) {

    function PersonalityObject(data) {
        ClassHelper.extends(this, DBZCCG.Card.create(data));

        this.display.parentCard = this;

        this.displayName = function() {
            return "LV" + this.level + " " + this.name;
        }

        var cardDescription = this.display.descriptionBox;
        var card = this;
        this.display.descriptionBox = function() {
            var cardDesc = cardDescription();
            var collectionBox =
                    $(cardDesc).filter(".card-collection-box")[0].outerHTML;

            var name = $(cardDesc).filter(".card-name").removeClass('property-description-box')[0].outerHTML;

            var content =
                    '<div>\
                        <div class="personality-card-content">';

            content += "<div class='property-description-box'>\
            <div class='level-label-bg'></div><div title='Personality Level' class='level-label'>" + card.level + "</div>" + name + "</div>";

            var elements = $(cardDesc).not(".card-collection-box").not(".card-description").not(".card-name");

            $.each(elements, function(key, value) {
                content += value.outerHTML;
            });

            content += "<div class='property-description-box'>\
                            <div class='card-label-pur'>\
                                <div title='PUR'>" + card.PUR + "</div>\
                            </div>" +
                    $(cardDesc).filter(".card-description")[0].outerHTML.replace("div class", "div style='width: 80%; float: left;' class") +
                    "</div>";

            content = content.replace(/\[Personality Card\]/, "[" + ClassHelper.getKeyByValue(DBZCCG.Personality.alignment, card.alignment) + " Personality Card]");
            content = content.replace(/(Power:|Constant Combat Power:)/, function(match) {
                return "<div class='personality-power-label'>" + match + "</div>";
            });

            content += "</div>";

            content += "<div class='personality-content'>" +
                    card.powerStages.slice(0).reverse().toString().replace(/(\d+,|\d+)/g, function(match) {
                var number = numeral(parseInt(match.replace(",", ""))).format('0,0').replace(",", ".");
                var div = "<div class='card-label-power-stage-" + ClassHelper.getKeyByValue(DBZCCG.Personality.alignment, card.alignment).toLowerCase() + "'>"
                        + number + "</div>";

                return div;
            }) + "</div></div>";

            var endContent = "<div style='clear:both;'></div>" + collectionBox;
            content += endContent;

            return content;
        };

        this.raiseZScouter = function(numberPowerStages, noDelay, noMessage) {
            if (numberPowerStages === 0) {
                return;
            }

            if (this.currentPowerStageAboveZero === 0 && numberPowerStages < 0) {
                if (!noMessage) {
                    DBZCCG.Log.logEntry(this.logName() + ' already at 0.');
                }

                return numberPowerStages;
            } else if (this.currentPowerStageAboveZero === this.powerStages.length - 1 && numberPowerStages > 0) {
                if (!noMessage) {
                    DBZCCG.Log.logEntry(this.logName() + ' already at maximum power stage level.');
                }

                return numberPowerStages;
            }

            var action = 'gained';
            if (numberPowerStages < 0) {
                action = 'lost';
            }

            var resultPowerStage = this.currentPowerStageAboveZero + numberPowerStages;
            var diffPowerStage = resultPowerStage - this.currentPowerStageAboveZero;
            var leftover;

            if (!this.powerStages[resultPowerStage]) {
                leftover = resultPowerStage;
                resultPowerStage = resultPowerStage > 0 ? this.powerStages.length - 1 : 0;
                diffPowerStage = resultPowerStage - this.currentPowerStageAboveZero;
            }


            DBZCCG.Sound.power(diffPowerStage);
            DBZCCG.Combat.hoverText((diffPowerStage < 0 ? '' : '+') + diffPowerStage.toString(), this.zScouter, diffPowerStage > 0 ? 0x00FF00 : 0xFF0000);

            this.moveZScouter(resultPowerStage, noDelay, true);

            if (!noMessage) {
                var msg = this.displayName() + " " + action + " " + Math.abs(diffPowerStage) + " power stage" + (Math.abs(diffPowerStage) > 1 ? "s" : "") + ".";
                DBZCCG.Log.logEntry(msg);
            }

            return leftover;
        };

        this.moveZScouter = function(toPowerStages, noDelay, noMessage) {
            if (this.zScouter) {
                toPowerStages = toPowerStages === "max" || toPowerStages > this.powerStages.length - 1 ? this.powerStages.length - 1 : toPowerStages;
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
                        var msg = card.displayName() + " power stage level set to " + card.powerStages[card.currentPowerStageAboveZero];
                        if (card.currentPowerStageAboveZero === card.powerStages.length - 1) {
                            msg += " (max)";
                        } else if (card.currentPowerStageAboveZero !== 0) {
                            msg += " (" + card.currentPowerStageAboveZero + " " + (card.currentPowerStageAboveZero === 1 ? "stage" : "stages") + " above 0)";
                        }

                        DBZCCG.Sound.power();
                        DBZCCG.Combat.hoverText("=" + card.powerStages[card.currentPowerStageAboveZero], card.zScouter);
                        DBZCCG.Log.logEntry(msg);
                    }

                    if (DBZCCG.resizeLabels instanceof Function) {
                        window.setTimeout(DBZCCG.resizeLabels, 200);
                    }
                });

                if (!noDelay) {
                    moveAnimation.delay(500);
                }

                card.currentPowerStageAboveZero = toPowerStages;
                moveAnimation.start();
            }
        };

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
                personality.zScouter.rotation.z = Math.PI / 2;

                personality.zScouter.rotation.y = MathHelper.angleVectors(new THREE.Vector3(0, 0, -1), personality.display.position);

                personality.zScouter.position.y += DBZCCG.Card.cornerWidth * DBZCCG.Card.cardThicknessScale * distanceFromY * 2;
                personality.zScouter.receiveShadow = true;
                personality.moveZScouter(personality.currentPowerStageAboveZero || 0, true, true);

                personality.zScouter.descriptionBox = function() {
                    var descriptionBoxText = "<div><b>" + personality.displayName() + "</b> current power stage level: <br />" + personality.powerStages[personality.currentPowerStageAboveZero];

                    if (personality.currentPowerStageAboveZero === personality.powerStages.length - 1) {
                        descriptionBoxText += " (max)";
                    } else if (personality.currentPowerStageAboveZero !== 0) {
                        descriptionBoxText += " (" + personality.currentPowerStageAboveZero + " above 0)";
                    }

                    descriptionBoxText += ".</div>"

                    DBZCCG.descriptionBox(descriptionBoxText);
                };

                if (!personality.zScouter.displayHoverText) {
                    personality.zScouter.displayHoverText = function() {

                        var msg = personality.powerStages[personality.currentPowerStageAboveZero];

                        if (card.currentPowerStageAboveZero === card.powerStages.length - 1) {
                            msg += " (max)";
                        } else if (card.currentPowerStageAboveZero !== 0) {
                            msg += " (" + card.currentPowerStageAboveZero + " " + (card.currentPowerStageAboveZero === 1 ? "stage" : "stages") + " above 0)";
                        }

                        return "<b>" + personality.displayName() + "</b> current power stage level: " + "<br />" +
                                msg;
                    };
                }

                DBZCCG.Combat.setMouseOverCallback(personality.zScouter);

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

        this.currentPowerLevel = function() {
            return this.powerStages[this.currentPowerStageAboveZero];
        };

        this.removePowerStageLabelText = function() {
            if (this.powerStageLabelText) {
                $(this.powerStageLabelText).remove();
                this.powerStageLabelText = undefined;
            }
        };

        this.changePowerStageLabelText = function(text) {
            this.removePowerStageLabelText();

            var position = DBZCCG.Screen.getWindowCoords(this.display);

            if (!isNaN(position.x)) {
                this.powerStageLabelText = DBZCCG.Combat.labelText(text || (this.currentPowerStageAboveZero + "/" + (this.powerStages.length - 1)), position, 0xFFFFFF, 800, 1);
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