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
DBZCCG.Personality.Personalities.ROSHI = 15;
DBZCCG.Personality.Personalities.BABA = 16;
DBZCCG.Personality.Personalities['KING KAI'] = 17;

DBZCCG.Personality.FemaleList = [
    DBZCCG.Personality.Personalities.BULMA,
    DBZCCG.Personality.Personalities.CHICHI,
    DBZCCG.Personality.Personalities.BABA
];

DBZCCG.Personality.alignment = {};
DBZCCG.Personality.alignment.Hero = 1;
DBZCCG.Personality.alignment.Villain = 2;
DBZCCG.Personality.alignment.Rogue = 3;

DBZCCG.Personality.SaiyanHeritage = [DBZCCG.Personality.Personalities.GOKU, DBZCCG.Personality.Personalities.NAPPA, DBZCCG.Personality.Personalities.VEGETA, DBZCCG.Personality.Personalities.RADITZ, DBZCCG.Personality.Personalities.GOHAN];
DBZCCG.Personality.NamekianHeritage = [DBZCCG.Personality.Personalities.PICCOLO];
DBZCCG.Personality.Hero = [DBZCCG.Personality.Personalities.BABA,
    DBZCCG.Personality.Personalities.ROSHI,
    DBZCCG.Personality.Personalities.GOKU,
    DBZCCG.Personality.Personalities.VEGETA,
    DBZCCG.Personality.Personalities.PICCOLO,
    DBZCCG.Personality.Personalities.CHIAOTZU,
    DBZCCG.Personality.Personalities.TIEN,
    DBZCCG.Personality.Personalities.KRILLIN,
    DBZCCG.Personality.Personalities.GOHAN,
    DBZCCG.Personality.Personalities.YAMCHA,
    DBZCCG.Personality.Personalities.YAJIROBE,
    DBZCCG.Personality.Personalities.BULMA,
    DBZCCG.Personality.Personalities.CHICHI];
DBZCCG.Personality.Villain = [DBZCCG.Personality.Personalities.SAIBAIMEN, DBZCCG.Personality.Personalities.RADITZ, DBZCCG.Personality.Personalities.PICCOLO, DBZCCG.Personality.Personalities.VEGETA, DBZCCG.Personality.Personalities.NAPPA];

DBZCCG.Personality.zScouterMaterial = new THREE.MeshLambertMaterial({transparent: true, shading: THREE.SmoothShading, color: 0xFF2233});

(function() {
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };

    var loader = new THREE.JSONLoader(manager);
    loader.load("model/zscouter.js", function(geometry) {
        DBZCCG.Personality.zScouterModel = geometry;
    });
})();

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

DBZCCG.Personality.PersonalityObject = function(data) {
    DBZCCG.Card.CardObject.apply(this, arguments);

    this.display.cardDescriptionBox = this.display.descriptionBox;
    var card = this;

    this.display.descriptionBox = function() {
        var cardDesc = this.cardDescriptionBox();
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

    this.level = data.level;
    this.powerStages = data.powerStages;
    this.powerStageType = data.powerStageType || 'regular';
    this.currentPowerStageAboveZero = data.currentPowerStageAboveZero;
    this.alignment = data.alignment;
    this.PUR = data.PUR;
};

DBZCCG.Personality.PersonalityObject.prototype = Object.create(DBZCCG.Card.CardObject.prototype);
DBZCCG.Personality.PersonalityObject.prototype.constructor = DBZCCG.Personality.PersonalityObject;

/* PersonalityObject Methods */

DBZCCG.Personality.PersonalityObject.prototype.displayName = function() {
    return "LV" + this.level + " " + this.name;
};

DBZCCG.Personality.PersonalityObject.prototype.raiseZScouter = function(numberPowerStages, noDelay, noMessage) {
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

DBZCCG.Personality.PersonalityObject.prototype.moveZScouter = function(toPowerStages, noDelay, noMessage) {
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

DBZCCG.Personality.PersonalityObject.prototype.addZScouter = function(field, dirVector, distanceFromY) {
    new DBZCCG.Personality.zScouter(this, field, dirVector, distanceFromY);
};

DBZCCG.Personality.PersonalityObject.prototype.currentPowerLevel = function() {
    return this.powerStages[this.currentPowerStageAboveZero];
};

DBZCCG.Personality.PersonalityObject.prototype.removePowerStageLabelText = function() {
    if (this.powerStageLabelText) {
        $(this.powerStageLabelText).remove();
        this.powerStageLabelText = undefined;
    }
};

DBZCCG.Personality.PersonalityObject.prototype.changePowerStageLabelText = function(text) {
    this.removePowerStageLabelText();

    var position = DBZCCG.Screen.getWindowCoords(this.display);

    if (!isNaN(position.x)) {
        this.powerStageLabelText = DBZCCG.Combat.labelText(text || (this.currentPowerStageAboveZero + "/" + (this.powerStages.length - 1)), position, 0xFFFFFF, 800, 1);
    }
};

/* End of PersonalityObject methods */

/* ZScouterObject */

DBZCCG.Personality.zScouter = function(personality, field, dirVector, distanceFromY) {
    THREE.Object3D.call(this);

    personality.zScouter = this;
    this.parentPersonality = personality;
    this.dirVector = dirVector;
    this.name = 'zScouter' + personality.name;

    var meshZScouter = new THREE.Mesh(DBZCCG.Personality.zScouterModel, DBZCCG.Personality.zScouterMaterial);
    this.add(meshZScouter);
    this.rotation.z = Math.PI / 2;
    this.rotation.y = MathHelper.angleVectors(new THREE.Vector3(0, 0, -1), personality.display.position);
    this.position.y += DBZCCG.Card.cornerWidth * DBZCCG.Card.cardThicknessScale * distanceFromY * 2;
    this.receiveShadow = true;
    personality.moveZScouter(personality.currentPowerStageAboveZero || 0, true, true);

    DBZCCG.Combat.setMouseOverCallback(this);
    DBZCCG.objects.push(this);
    field.add(this);
};

DBZCCG.Personality.zScouter.prototype = Object.create(THREE.Object3D.prototype);
DBZCCG.Personality.zScouter.prototype.constructor = DBZCCG.Personality.zScouter;

DBZCCG.Personality.zScouter.prototype.leftScreenCallback = function(source, created) {
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

DBZCCG.Personality.zScouter.prototype.displayName = function() {
    return 'Z-Scouter: ' + this.parentPersonality.displayName();
};

DBZCCG.Personality.zScouter.prototype.descriptionBox = function() {
    var descriptionBoxText = "<div><b>" + this.parentPersonality.displayName() + "</b> current power stage level: <br />" + this.parentPersonality.powerStages[this.parentPersonality.currentPowerStageAboveZero];

    if (this.parentPersonality.currentPowerStageAboveZero === this.parentPersonality.powerStages.length - 1) {
        descriptionBoxText += " (max)";
    } else if (this.parentPersonality.currentPowerStageAboveZero !== 0) {
        descriptionBoxText += " (" + this.parentPersonality.currentPowerStageAboveZero + " above 0)";
    }

    descriptionBoxText += ".</div>"

    DBZCCG.descriptionBox(descriptionBoxText);
};

DBZCCG.Personality.zScouter.prototype.displayHoverText = function() {

    var msg = this.parentPersonality.powerStages[this.parentPersonality.currentPowerStageAboveZero];

    if (this.parentPersonality.currentPowerStageAboveZero === this.parentPersonality.powerStages.length - 1) {
        msg += " (max)";
    } else if (this.parentPersonality.currentPowerStageAboveZero !== 0) {
        msg += " (" + this.parentPersonality.currentPowerStageAboveZero + " " + (this.parentPersonality.currentPowerStageAboveZero === 1 ? "stage" : "stages") + " above 0)";
    }

    return "<b>" + this.parentPersonality.displayName() + "</b> current power stage level: " + "<br />" +
            msg;
};

/* End of ZScouterObject */

DBZCCG.Personality.create = function(data) {
    return new DBZCCG.Personality.PersonalityObject(data);
};