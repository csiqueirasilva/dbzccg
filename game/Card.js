DBZCCG.Card = {};

// SAGA
DBZCCG.Card.Saga = {};
DBZCCG.Card.Saga.Saiyan = 1;

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
DBZCCG.Card.personalityNameDiff[DBZCCG.Card.Saga.Saiyan] = DBZCCG.Card.cardHeight / 10;
DBZCCG.Card.personalityPowerStageDiff = {};
DBZCCG.Card.personalityPowerStageDiff[DBZCCG.Card.Saga.Saiyan] = {"regular": {"Zero": DBZCCG.Card.cardHeight * 0.61, "diff": 0.3845}};

// TYPES
DBZCCG.Card.Type = {};
DBZCCG.Card.Type.Personality = 1;
DBZCCG.Card.Type['Non-Combat'] = 2;
DBZCCG.Card.Type.Combat = 3;
DBZCCG.Card.Type['Physical Combat'] = 4;
DBZCCG.Card.Type['Energy Combat'] = 5;
DBZCCG.Card.Type.Dragonball = 6;
DBZCCG.Card.Type.Mastery = 7;
DBZCCG.Card.Type.Battleground = 8;
DBZCCG.Card.Type.Location = 9;
DBZCCG.Card.Type.Sensei = 10;
DBZCCG.Card.Type.Fusion = 11;
DBZCCG.Card.Type.Drill = 12;

// STYLES
DBZCCG.Card.Style = {};
DBZCCG.Card.Style.Freestyle = 1;
DBZCCG.Card.Style.Red = 2;
DBZCCG.Card.Style.Saiyan = 3;
DBZCCG.Card.Style.Namekian = 4;
DBZCCG.Card.Style.Blue = 5;
DBZCCG.Card.Style.Orange = 6;
DBZCCG.Card.Style.Black = 7;

// RARITY
DBZCCG.Card.Rarity = {};
DBZCCG.Card.Rarity.Common = 0;
DBZCCG.Card.Rarity.Promo = 1;
DBZCCG.Card.Rarity.Uncommon = 2;
DBZCCG.Card.Rarity.Fixed = 3;
DBZCCG.Card.Rarity.Rare = 4;
DBZCCG.Card.Rarity['Ultra Rare'] = 5;
DBZCCG.Card.Rarity['Premium'] = 6;
DBZCCG.Card.Rarity['Ubber Rare'] = 7;

/* To reduce load on card creation */
(function() {
    DBZCCG.Card.backTexture = THREE.ImageUtils.loadTexture("images/DBZCCG/back.jpg", 
    new THREE.UVMapping(), function (cardBack) {
        DBZCCG.Load.cardBack = true;
        console.log('Loaded card back texture');
    }, function () {
        DBZCCG.Load.error = true;
        console.log('Error while loading card back texture');
    });
    DBZCCG.Card.cubeGeo = new THREE.BoxGeometry(DBZCCG.Card.cardWidth, DBZCCG.Card.cardHeight, DBZCCG.Card.cardDepth);

    /* Vertex and face alterations */
    var cube = DBZCCG.Card.cubeGeo;
    var vertices = cube.vertices;
    var faces = cube.faces;

    vertices.push(vertices[7].clone());
    vertices.push(vertices[5].clone());
    vertices.push(vertices[0].clone());
    vertices.push(vertices[2].clone());

    vertices[5].color = vertices[0].color = vertices[2].color = vertices[7].color
            = new THREE.Color(0x777777);

    vertices[5].z = vertices[0].z = vertices[2].z = vertices[7].z = 0;

    faces[8].a = 9;
    faces[8].b = 8;
    faces[8].c = 10;

    faces[9].a = 8;
    faces[9].b = 11;
    faces[9].c = 10;

    faces.push(new THREE.Face3(9, 5, 7));
    faces.push(new THREE.Face3(9, 7, 8));

    faces.push(new THREE.Face3(0, 10, 2));
    faces.push(new THREE.Face3(10, 11, 2));

    faces.push(new THREE.Face3(8, 7, 2));
    faces.push(new THREE.Face3(8, 2, 11));

    faces.push(new THREE.Face3(5, 9, 0));
    faces.push(new THREE.Face3(0, 9, 10));

    for (var i = 0; i < faces.length; i++) {
        if (vertices[faces[i].a].color === undefined) {
            faces[i].vertexColors[0] = new THREE.Color(0x000000);
        } else {
            faces[i].vertexColors[0] = vertices[faces[i].a].color;
        }

        if (vertices[faces[i].b].color === undefined) {
            faces[i].vertexColors[1] = new THREE.Color(0x000000);
        } else {
            faces[i].vertexColors[1] = vertices[faces[i].b].color;
        }

        if (vertices[faces[i].c].color === undefined) {
            faces[i].vertexColors[2] = new THREE.Color(0x000000);
        } else {
            faces[i].vertexColors[2] = vertices[faces[i].c].color;
        }
    }

    DBZCCG.Card.cubeGeo.faceVertexUvs.push(
            DBZCCG.Card.cubeGeo.faceVertexUvs[0].slice(0)
            );

    DBZCCG.Card.cubeGeo.computeFaceNormals();
    DBZCCG.Card.cubeGeo.computeVertexNormals();
})();

/* End of required materials for the cards */

DBZCCG.Card.generateRandom = function() {
    // TODO: Generate a real random card. This only generates the image.
    var card = {type: DBZCCG.Card.Type.Personality, style: DBZCCG.Card.Style.Freestyle, PUR: 2, alignment: DBZCCG.Personality.alignment.Rogue, description: "Power: Once per combat, reduces the damage of an energy attack by 2 life cards.", level: 1, name: "VEGETA", highTech: false, number: 173, texturePath: "images/DBZCCG/saiyan/" + (parseInt(Math.random() * 1000 % 250) + 1001).toString().substring(1) + ".jpg",
        personality: DBZCCG.Personality.Personalities.VEGETA, saga: DBZCCG.Card.Saga.Saiyan, powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]};
    return DBZCCG.Card.createCard(card);
};

DBZCCG.Card.createCard = function(card) {
    var retCard;
    switch (card.type) {
        case DBZCCG.Card.Type.Personality:
            retCard = DBZCCG.Personality.create(card);
            break;
        case DBZCCG.Card.Type['Non-Combat']:
        case DBZCCG.Card.Type.Combat:
        case DBZCCG.Card.Type['Physical Combat']:
        case DBZCCG.Card.Type['Energy Combat']:
            retCard = DBZCCG.Card.create(card);
            break;
        case DBZCCG.Card.Type.Dragonball:
            retCard = DBZCCG.Dragonball.create(card);
            break;
//                        case DBZCCG.Card.Type.Battleground:
//                            card.add(Battleground.create(card));
//                            break;
//                        case DBZCCG.Card.Type.Location:
//                            card.add(Location.create(card));
//                            break;
//                        case DBZCCG.Card.Type.Fusion:
//                            card.add(Fusion.create(card));
//                            break;
        case DBZCCG.Card.Type.Drill:
            retCard = DBZCCG.Drill.create(card);
    }
    return retCard;
};

/* Beginning CardObject */
DBZCCG.Card.CardObject = function(dataObject) {
    this.name = dataObject.name;
    this.rarity = dataObject.rarity;
    this.highTech = dataObject.highTech;
    this.saga = dataObject.saga;
    this.personality = dataObject.personality;
    this.style = dataObject.style;
    this.description = dataObject.description;
    this.number = dataObject.number;
    this.type = dataObject.type;
    this.numberOfUses = dataObject.numberOfUses;

    // Hard coded for testing
    if (DBZCCG.Saiyan && DBZCCG.Frieza) {
        dataObject.foil = Math.random() > 0.5 ? DBZCCG.Saiyan.Foil.Default : Math.random() > 0.5 ? DBZCCG.Frieza.Foil.Default : null;
    }

    this.effect = dataObject.effect;
    this.activable = dataObject.activable;
    this.postEffect = dataObject.postEffect;
    this.successfulEffect = dataObject.successfulEffect;
    this.playable = dataObject.playable;
    this.effectType = dataObject.effectType;
    this.damage = dataObject.damage;
    this.cost = dataObject.cost;
    this.activators = dataObject.activators;
    this.defenseShield = dataObject.defenseShield;
    this.canActivate = true;

    this.createDisplay(dataObject.texturePath, dataObject.foil);
};

DBZCCG.Card.CardObject.prototype.logName = function() {
    return '{' + ClassHelper.getKeyByValue(DBZCCG.Card.Saga, this.saga) + ' ' + this.number + '}';
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

DBZCCG.Card.CardObject.prototype.getTextureImg = function() {
    if (this.display.children[0].material.materials[5].map && this.display.children[0].material.materials[5].map.sourceFile) {
        return this.display.children[0].material.materials[5].map.sourceFile;
    }
};

DBZCCG.Card.CardObject.prototype.createDisplay = function(texturePath, foil) {
    var o = new DBZCCG.Card.CardDisplay(texturePath, foil);
    o.name = this.name;
    o.parentCard = this;
    this.display = o;

    if (!this.playable && this.effect) {
        this.display.addCallback(DBZCCG.Combat.activateEffectCallback);
    } else if (this.playable) {
        this.display.addCallback(DBZCCG.Combat.placeCardInField);
    }
};

/* Ending CardObject */

/* Beginning CardDisplayObject */

DBZCCG.Card.textureCache = {};

DBZCCG.Card.loadTexture = function(texturePath, UVMapping, onLoad, onError) {
    if (!DBZCCG.Card.textureCache[texturePath]) {
        DBZCCG.loadCounter++;
        DBZCCG.Card.textureCache[texturePath] = THREE.ImageUtils.loadTexture(texturePath, 
        new THREE.UVMapping(), 
        function () {
            console.log('Loaded card texture: '+texturePath);
            DBZCCG.incrementLoad();
        }, 
        function(){
            DBZCCG.Load.error = true;
            console.log('Error while loading card texture: '+texturePath);
        });
    }

    return DBZCCG.Card.textureCache[texturePath];
};

DBZCCG.Card.CardDisplay = function(texturePath, foil) {
    THREE.Object3D.apply(this, arguments);

    var frontTexture = texturePath ? DBZCCG.Card.loadTexture(texturePath) : null;
    var specularMap = DBZCCG.Card.loadTexture('images/DBZCCG/saiyan/specularmap.jpg');

    var cardCoverBackMaterials = [];
    for (var i = 0; i < 4; i++) {
        cardCoverBackMaterials.push(new THREE.MeshBasicMaterial(
                {
                    transparent: true,
                    vertexColors: THREE.VertexColors
                })); // sides
    }

    cardCoverBackMaterials[4] = new THREE.MeshBasicMaterial(
            {
                transparent: true,
                map: DBZCCG.Card.backTexture
            }); // back

    cardCoverBackMaterials[5] = new THREE.MeshBasicMaterial(
            {
                transparent: true,
                reflectivity: foil ? foil.reflectivity : 1,
                specularMap: specularMap,
                envMap: foil ? foil.texture : null,
                map: frontTexture
            }); // front

    for (var i = 0; i < 4; i++) {
        cardCoverBackMaterials.push(new THREE.MeshBasicMaterial({transparent: true})); // sides
    }

    var cube = new THREE.Mesh(DBZCCG.Card.cubeGeo.clone(), new THREE.MeshFaceMaterial(cardCoverBackMaterials));

    this.add(cube);

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
    var rotate = false;
    var firstRotationReversed = false;
    if (created.position.z < 0) {
        rotate = true;
        if (created.rotation.y === 0) {
            firstRotationReversed = true;
        }
    }

    created.rotation.x = -Math.PI / 2;
    created.rotation.y = -Math.PI / 2;

    obj.add(created);
    created.position.set(0, 0, 0);

    if (rotate) {
        if (!firstRotationReversed) {
            obj.rotation.y = Math.PI;
        } else {
            obj.rotation.y = 0;
        }

        obj.rotation.z = -Math.PI;
    } else {
        obj.rotation.z = Math.PI;
    }

    var firstRotation = obj.rotation.clone();

    if (!firstRotationReversed) {
        firstRotation.z = 0;
    } else {
        firstRotation.z = -2 * Math.PI;
    }

    var rotation = obj.rotation;
    var animation = new TWEEN.Tween(rotation).to(firstRotation, 400);
    animation.easing(TWEEN.Easing.Circular.In);

    // It just wasnt working without this. I tried to pass directly created.rotation to Tween, but it just wasnt working.
    // I know this is code is a bit messy. Sorry :-(
    animation.onUpdate(function() {
        created.rotation.y = rotation.z;
    });

    animation.start();
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
                            <div class='property-description-box card-type'>[" + ClassHelper.getKeyByValue(DBZCCG.Card.Type, this.parentCard.type) + " Card]</div>\
                            <div class='property-description-box card-description'>" + this.parentCard.description + "</div>";
    content += "<div class='card-collection-box'>";
    if (this.parentCard.personality) {
        content += "<div class='card-personality'><div class='label-title'>[Personality]</div><div class='label-description-box'><div class='description-icon'><img class='left-screen-icon' src='images/icons/" + ClassHelper.getKeyByValue(DBZCCG.Personality.Personalities, this.parentCard.personality).toLowerCase() + "-icon.png' title='" + ClassHelper.getKeyByValue(DBZCCG.Personality.Personalities, this.parentCard.personality) + "'/></div></div></div>";
    }

    content += "<div class='card-style'><div class='label-title'>[Style]</div><div class='label-description-box'><div class='description-icon'><img class='left-screen-icon' src='images/icons/" + ClassHelper.getKeyByValue(DBZCCG.Card.Style, this.parentCard.style).toLowerCase() + "-icon.png' title='" + ClassHelper.getKeyByValue(DBZCCG.Card.Style, this.parentCard.style) + "'/></div></div></div>\
                        <div class='card-saga-label'><div div class='label-title'>[Saga]</div><div class='label-description-box'><div class='description-icon'><img class='left-screen-icon' src='images/icons/" + ClassHelper.getKeyByValue(DBZCCG.Card.Saga, this.parentCard.saga).toLowerCase() + "-saga-icon.png' title='" + ClassHelper.getKeyByValue(DBZCCG.Card.Saga, this.parentCard.saga) + " Saga'/><img class='left-screen-icon' src='images/icons/" + ClassHelper.getKeyByValue(DBZCCG.Card.Rarity, this.parentCard.rarity).toLowerCase().replace(" ", "") + "-icon.png' title='" + ClassHelper.getKeyByValue(DBZCCG.Card.Rarity, this.parentCard.rarity) + "' /></div><div class='saga-label-number'>#" + this.parentCard.number + "</div></div></div>";

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