// GFX Parameters
DBZCCG.Card.cardHeight = 5.5;
DBZCCG.Card.cardWidth = 4;
DBZCCG.Card.cornerWidth = 0.10;
DBZCCG.Card.cornerHeight = DBZCCG.Card.cornerWidth;
DBZCCG.Card.cardHeight = 5.5;
DBZCCG.Card.cardWidth = 4;
DBZCCG.Card.cornerWidth = 0.10;
DBZCCG.Card.cornerHeight = DBZCCG.Card.cornerWidth;
DBZCCG.Card.cardThicknessScale = 0.1;
DBZCCG.Card.cardDepth = DBZCCG.Card.cornerWidth * 8 * DBZCCG.Card.cardThicknessScale;
DBZCCG.Card.personalityNameDiff = {};
DBZCCG.Card.personalityNameDiff[DBZCCG.Card.Saga["Collectible Card Game"].Saiyan] = DBZCCG.Card.cardHeight / 10;
DBZCCG.Card.personalityPowerStageDiff = {};
DBZCCG.Card.personalityPowerStageDiff[DBZCCG.Card.Saga["Collectible Card Game"].Saiyan] = {"regular": {"Zero": DBZCCG.Card.cardHeight * 0.61, "diff": 0.3845}};

// LIMIT
DBZCCG.Card.Limit = {};
DBZCCG.Card.Limit.Default = 3;
DBZCCG.Card.Limit['Same Personality'] = 4;
DBZCCG.Card.Limit.Limited = 1;
DBZCCG.Card.Limit.Restricted = 2;

/* To reduce load on card creation */
(function() {

    var loader = new THREE.OBJMTLLoader();

    loader.load('model/card/card-with-material.obj', 'model/card/card-with-material.mtl', function(object) {

        DBZCCG.Card.backTexture = THREE.ImageUtils.loadTexture("images/cardimages/back.jpg",
                new THREE.UVMapping(), function(cardBack) {
            DBZCCG.Load.cardBack = true;
            console.log('Loaded card back texture');
        }, function() {
            DBZCCG.Load.error = true;
            console.log('Error while loading card back texture');
        });

        DBZCCG.Card.backMaterial = new THREE.MeshBasicMaterial(
                {
                    map: DBZCCG.Card.backTexture,
                    side: THREE.FrontSide
                }
        );

        object.rotation.x = Math.PI / 2;
        object.rotation.y = Math.PI;

        var geo = new THREE.Geometry();

        for (var i = 0; i < object.children.length; i++) {
            if (i !== 4 && i !== 6) {
                THREE.GeometryUtils.merge(geo, object.children[i].geometry);
            }
        }

        object.children[4].material = DBZCCG.Card.backMaterial;
        object.children[4].material.map = DBZCCG.Card.backTexture;
        object.children[4].material.color.setRGB(1, 1, 1);

        var cardMesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
            color: 0x000000,
            side: THREE.FrontSide
        }));

        cardMesh.rotation.x = object.children[6].rotation.x = object.children[4].rotation.x = Math.PI / 2;
        cardMesh.rotation.y = object.children[6].rotation.y = object.children[4].rotation.y = Math.PI;

        var cardObject = new THREE.Object3D();

        cardObject.add(cardMesh);
        cardObject.add(object.children[4].clone());
        cardObject.add(object.children[6].clone());

        DBZCCG.Card.cardModel = cardObject;

        ThreeHelper.dispose(object);
    });
})();

/* End of required materials for the cards */

DBZCCG.Card.generateRandom = function() {
    // TODO: Generate a real random card. This only generates the image.
    var card = {type: DBZCCG.Card.Type.Personality, style: DBZCCG.Card.Style.Freestyle, pur: 2, alignment: DBZCCG.Personality.alignment.Rogue, description: "Power: Once per combat, reduces the damage of an energy attack by 2 life cards.", level: 1, name: "VEGETA", highTech: false, number: 173, texturePath: "images/DBZCCG/saiyan/" + (parseInt(Math.random() * 1000 % 250) + 1001).toString().substring(1) + ".jpg",
        personality: DBZCCG.Personality.Personalities.VEGETA, saga: DBZCCG.Card.Saga["Collectible Card Game"].Saiyan, powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]};
    return DBZCCG.Card.createCard(card);
};

DBZCCG.Card.createCard = function(srcCard) {
    var retCard;
    var card;
    
    if (srcCard.sourceCard) {
        if (!DBZCCG.Card.sourceCardsReference[srcCard.sourceCard]) {
            $.ajax({
                url: sourceDefaultUrl + "collection/card/source/" + dataObject.sourceCard,
                type: 'POST',
                dataType: 'json'
            })

            .fail(function() {
                console.log("Failed to create card: " + srcCard.sourceCard);
            })

            .done(function(data) {
                card = DBZCCG.Card.sourceCardsReference[srcCard.sourceCard] = data;
            });

            while (!DBZCCG.Card.sourceCardsReference[srcCard.sourceCard] && !card)
                ;
        } else {
            card = DBZCCG.Card.sourceCardsReference[srcCard.sourceCard];
        }
    }

    if (card) {
        if (card.type.indexOf(DBZCCG.Card.Type.Personality) !== -1) {
            retCard = DBZCCG.Personality.create(srcCard);
        } else if (card.type.indexOf(DBZCCG.Card.Type.Dragonball) !== -1) {
            retCard = DBZCCG.DragonBall.create(srcCard);
        } else if (card.type.indexOf(DBZCCG.Card.Type.Drill) !== -1) {
            retCard = DBZCCG.Drill.create(srcCard);
        }
    }

    if (!retCard) {
        retCard = DBZCCG.Card.create(srcCard);
    }

    return retCard;
};

/* Beginning CardObject */
DBZCCG.Card.CardObject = function(dataObject) {
    if (dataObject.sourceCard) {
        this.sourceCard = dataObject.sourceCard;
        
        var o = this;
        for (var i in DBZCCG.Card.sourceCardsReference[dataObject.sourceCard]) {
            o[i] = DBZCCG.Card.sourceCardsReference[dataObject.sourceCard][i];
        }

        // fixes
        o['effectTypes'] = undefined;
        o['effectType'] = DBZCCG.Card.sourceCardsReference[dataObject.sourceCard].effectTypes;
    } else {
        for(var i in dataObject) {
            this[i] = dataObject[i];
        }
    }
    
    this.instanceId = dataObject.id;
    this.highTech = dataObject.highTech;
    this.numberOfUses = dataObject.numberOfUses;
    this.effect = dataObject.effect;
    this.foil = dataObject.foil;
    this.activable = dataObject.activable;
    this.postEffect = dataObject.postEffect;
    this.successfulEffect = dataObject.successfulEffect;
    this.playable = dataObject.playable;
    this.damage = dataObject.damage;
    this.cost = dataObject.cost;
    this.activators = dataObject.activators;
    this.defenseShield = dataObject.defenseShield;
    this.canActivate = true;

    // hack, remove this with server side implemented
    for(var i in DBZCCG.Saiyan[this.number]) {
        if(this[i] === undefined) {
            this[i] = DBZCCG.Saiyan[this.number][i];
        }
    }

    this.createDisplay(dataObject.texturePath, dataObject.specularMap, dataObject.foil);
};

DBZCCG.Card.CardObject.prototype.logName = function() {
    return '{' + ClassHelper.getNestedKeyByValue(DBZCCG.Card.Saga, this.saga) + ' ' + this.number + '}';
};

DBZCCG.Card.CardObject.prototype.facedown = function() {
    this.display.rotation.x = this.display.rotation.y = this.display.rotation.z = 0.0;
    this.display.rotation.x += -90 * Math.PI / 180;
};

DBZCCG.Card.CardObject.prototype.faceup = function() {
    this.display.rotation.x = this.display.rotation.y = this.display.rotation.z = 0.0;
    this.display.rotation.x += -90 * Math.PI / 180;
    this.display.rotation.y += -180 * Math.PI / 180;
};

DBZCCG.Card.CardObject.prototype.turnThisWay = function(vec) {
    if (vec instanceof THREE.Vector3) {
        this.display.rotation.z = Math.acos(vec.z / vec.length());
    }
};

DBZCCG.Card.CardObject.prototype.moveY = function(n) {
    if (typeof n === "number") {
        this.display.position.y = DBZCCG.Card.cornerWidth * DBZCCG.Card.cardThicknessScale * n * 2;
    }
};

DBZCCG.Card.CardObject.prototype.getDisplayMaterials = function() {
    var materials = [];
    for (var i = 0; i < this.display.children.length; i++) {
        materials.push(this.display.children[i].material);
    }
    return materials;
};

DBZCCG.Card.CardObject.prototype.getTextureImg = function() {
    var idx = 2;
    if (this.display.children[idx].material.map && this.display.children[idx].material.map.sourceFile) {
        return this.display.children[idx].material.map.sourceFile;
    }
};

DBZCCG.Card.CardObject.prototype.createDisplay = function(texturePath, specularMap, foil) {
    var o = new DBZCCG.Card.CardDisplay(texturePath, specularMap, foil);
    o.name = this.name;
    o.parentCard = this;
    this.display = o;

    if (!this.playable && this.effect) {
        this.display.addCallback(DBZCCG.Combat.activateEffectCallback);
    } else if (this.playable) {
        this.display.addCallback(DBZCCG.Combat.placeCardInField);
    }
};

DBZCCG.Card.CardObject.prototype.getPrimaryType = function() {
    var type;
    
    if (this.type.length === 1) {
        type = this.type[0];
    } /* Check for Fusion/Personality etc */

    return type;
};

/* Ending CardObject */

/* Beginning CardDisplayObject */

DBZCCG.Card.textureCache = {};

DBZCCG.Card.loadTexture = function(texturePath, UVMapping, onLoad, onError) {
    if (!DBZCCG.Card.textureCache[texturePath]) {
        DBZCCG.loadCounter++;
        DBZCCG.Card.textureCache[texturePath] = THREE.ImageUtils.loadTexture(texturePath,
                new THREE.UVMapping(),
                function() {
                    console.log('Loaded card texture: ' + texturePath);
                    DBZCCG.incrementLoad();
                },
                function() {
                    DBZCCG.Load.error = true;
                    console.log('Error while loading card texture: ' + texturePath);
                });
    }

    return DBZCCG.Card.textureCache[texturePath];
};

DBZCCG.Card.CardDisplay = function(texturePath, specularMap, foil) {
    THREE.Object3D.apply(this, arguments);

    var frontTexture = texturePath ? DBZCCG.Card.loadTexture(texturePath) : null;
    var specularMap = specularMap ? DBZCCG.Card.loadTexture(specularMap) : null;

    for (var i = 0; i < DBZCCG.Card.cardModel.children.length; i++) {
        this.add(DBZCCG.Card.cardModel.children[i].clone());
    }

    this.children[2].material = new THREE.MeshBasicMaterial(
            {
                reflectivity: foil ? foil.reflectivity : 1,
                specularMap: specularMap,
                envMap: foil ? foil.texture : null,
                map: frontTexture,
                side: THREE.FrontSide
            }
    );

    DBZCCG.Callbacks.create(this, 'callback', function(cb) {
    });

    DBZCCG.Combat.setMouseOverCallback(this);
};

DBZCCG.Card.CardDisplay.prototype = Object.create(THREE.Object3D.prototype);
DBZCCG.Card.CardDisplay.prototype.constructor = DBZCCG.Card.CardDisplay;

DBZCCG.Card.CardDisplay.prototype.displayName = function() {
    return this.parentCard.name;
};

DBZCCG.Card.CardDisplay.prototype.turnGameDisplay = function() {
    if (this.leftScreenCallback === null) {
        this.leftScreenCallback = this.offLeftScreenCallback;
        this.offLeftScreenCallback = null;
        this.descriptionBox = this.offDescriptionBox;
        this.offDescriptionBox = null;
        this.mouseOut = this.offMouseOut;
        this.offMouseOut = null;
        this.mouseOver = this.offMouseOver;
        this.offMouseOver = null;
    } else {
        this.offLeftScreenCallback = this.leftScreenCallback;
        this.leftScreenCallback = null;
        this.offDescriptionBox = this.descriptionBox;
        this.descriptionBox = null;
        this.offMouseOut = this.mouseOut;
        this.mouseOut = null;
        this.offMouseOver = this.mouseOver;
        this.mouseOver = null;
    }
};

DBZCCG.Card.CardDisplay.prototype.leftScreenCallback = function(source, created) {
    var obj = new THREE.Object3D();
    created.scale.z = DBZCCG.Card.cardThicknessScale;
    created.rotation.x = -Math.PI / 2;
    created.rotation.y = -Math.PI;

    obj.add(created);
    created.position.set(0, 0, 0);

    return obj;
};

DBZCCG.Card.CardDisplay.prototype.displayHoverText = function() {
    var ret = '';

    ret += this.parentCard.display.descriptionBox();

    ret += '<div style="clear:both;"/>';

    if (DBZCCG.performingAction && DBZCCG.performingAction.checkOwnership(this.parentCard.display) && this.parentCard.activable instanceof Function &&
            this.parentCard.activable(DBZCCG.performingAction) && this.parentCard.effectType instanceof Array &&
            (this.parentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 ||
                    this.parentCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1)) {

        if (this.parentCard.damage instanceof Function && this.parentCard.damage() instanceof Object) {
            var damage = this.parentCard.damage();
            ret += '<div><h3 style="text-align: center;">Attack Damage</h3>\
                            <div class="damage-hover-helper">\
                            \
                            <div style="margin-left: 40%"><div style="float:left;" class="hover-icon physical-attack-icon" title="Power Stage Damage"></div><div style="float:left; font-size: 3em;" class="hover-damage-text">' + damage.stages + '</div>';
            ret += '</div><div style="clear:both;"/><div style="padding-top: 10px; margin-left: 40%"><div style="float:left;" class="hover-icon energy-attack-icon" title="Life Card Damage"></div><div style="float:left; font-size: 3em;" class="hover-damage-text">' + damage.cards + '</div>'
                    + '</div></div></div>';
        }
    }

    return ret;
};

DBZCCG.Card.CardDisplay.prototype.descriptionBox = function() {
    var content = "<div class='property-description-box card-name'>" + this.parentCard.name + "</div>\
                            <div class='property-description-box card-type'>[" + ClassHelper.getKeyByValue(DBZCCG.Card.Type, this.parentCard.getPrimaryType()) + " Card]</div>\
                            <div class='property-description-box card-description'>" + this.parentCard.description + "</div>";
    content += "<div class='card-collection-box'>";

    if (this.parentCard.personalities instanceof Array && this.parentCard.personalities.length > 0) {
        content += "<div class='card-personality'><div class='label-title'>[Personality]</div><div class='label-description-box'>";
        for (var i = 0; i < this.parentCard.personalities.length; i++) {
            content += "<div class='description-icon'><img class='left-screen-icon' src='images/icons/"
                    + ClassHelper.getKeyByValue(DBZCCG.Personality.Personalities, this.parentCard.personalities[i]).toLowerCase()
                    + "-icon.png' title='" + ClassHelper.getKeyByValue(DBZCCG.Personality.Personalities, this.parentCard.personalities[i])
                    + "'/>"
                    + "</div>";
        }
        content += "</div></div>";
    }

    content += "<div class='card-style'><div class='label-title'>[Style]</div><div class='label-description-box'><div class='description-icon'><img class='left-screen-icon' src='images/icons/" + ClassHelper.getKeyByValue(DBZCCG.Card.Style, this.parentCard.style).toLowerCase() + "-icon.png' title='" + ClassHelper.getKeyByValue(DBZCCG.Card.Style, this.parentCard.style) + "'/></div></div></div>\
                        <div class='card-saga-label'><div div class='label-title'>[Saga]</div><div class='label-description-box'><div class='description-icon'><img class='left-screen-icon' src='images/icons/" + ClassHelper.getNestedKeyByValue(DBZCCG.Card.Saga, this.parentCard.saga).toLowerCase() + "-saga-icon.png' title='" + ClassHelper.getNestedKeyByValue(DBZCCG.Card.Saga, this.parentCard.saga) + " Saga'/><img class='left-screen-icon' src='images/icons/" + ClassHelper.getKeyByValue(DBZCCG.Card.Rarity, this.parentCard.rarity).toLowerCase().replace(" ", "") + "-icon.png' title='" + ClassHelper.getKeyByValue(DBZCCG.Card.Rarity, this.parentCard.rarity) + "' /></div><div class='saga-label-number'>#" + this.parentCard.number + "</div></div></div>";

    content += "</div><div style='clear: both;'>";
    return content;
};

/* Ending CardDisplayObject */

DBZCCG.Card.create = function(dataObject) {
    if (dataObject === "random") {
        return new DBZCCG.Card.CardObject(DBZCCG.Card.generateRandom());
    } else {
        return new DBZCCG.Card.CardObject(dataObject || {});
    }
};

DBZCCG.Card.findSagaByValue = function(sagaNumber) {
    var saga = null;

    for (var j in DBZCCG.Card.Saga) {
        if (saga !== null) {
            break;
        } else {
            for (var k in DBZCCG.Card.Saga[j]) {
                if (saga !== null) {
                    break;
                } else if (sagaNumber === DBZCCG.Card.Saga[j][k]) {
                    saga = k;
                }
            }
        }
    }
    return saga;
};