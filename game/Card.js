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
    DBZCCG.Card.backTexture = THREE.ImageUtils.loadTexture("images/DBZCCG/back.jpg");
    borderTexture = THREE.ImageUtils.loadTexture("images/DBZCCG/border_low.jpg");
    cornerTexture = THREE.ImageUtils.loadTexture("images/DBZCCG/corner_low.jpg");
    columnGeo = new THREE.CylinderGeometry(DBZCCG.Card.cornerWidth, DBZCCG.Card.cornerWidth, DBZCCG.Card.cardHeight, 32, 16, true);
    lineGeo = new THREE.CylinderGeometry(DBZCCG.Card.cornerWidth, DBZCCG.Card.cornerWidth, DBZCCG.Card.cardWidth - DBZCCG.Card.cornerWidth, 32, 16, true);
    DBZCCG.Card.cardMaterial = new THREE.MeshLambertMaterial({shading: THREE.SmoothShading, color: 0x000000, side: THREE.FrontSide});
    cornerMaterial = new THREE.MeshLambertMaterial({
        side: THREE.FrontSide,
        map: cornerTexture
    });

    borderMaterial = new THREE.MeshLambertMaterial({
        side: THREE.FrontSide,
        map: borderTexture
    });

    cornerGeo = new THREE.SphereGeometry(DBZCCG.Card.cornerWidth, 32, 16);
    DBZCCG.Card.cubeGeo = new THREE.CubeGeometry(DBZCCG.Card.cardWidth, DBZCCG.Card.cardHeight, DBZCCG.Card.cardDepth);

    DBZCCG.Card.basicCardGeo = new THREE.Geometry();
    var top = new THREE.Mesh(lineGeo, borderMaterial);
    var bot = top.clone();

    var left = new THREE.Mesh(columnGeo, borderMaterial);
    var right = left.clone();

    top.rotation.z += 90 * Math.PI / 180;
    top.position.y += DBZCCG.Card.cardHeight / 2;
    bot.rotation.z += 90 * Math.PI / 180;
    bot.position.y -= DBZCCG.Card.cardHeight / 2;
    left.position.x -= (DBZCCG.Card.cardWidth - DBZCCG.Card.cornerWidth) / 2;
    right.position.x += (DBZCCG.Card.cardWidth - DBZCCG.Card.cornerWidth) / 2;

    THREE.GeometryUtils.merge(DBZCCG.Card.basicCardGeo, top);
    THREE.GeometryUtils.merge(DBZCCG.Card.basicCardGeo, bot);
    THREE.GeometryUtils.merge(DBZCCG.Card.basicCardGeo, left);
    THREE.GeometryUtils.merge(DBZCCG.Card.basicCardGeo, right);

    var baseCorner = new THREE.Mesh(cornerGeo, cornerMaterial);

    // Add circles in borders
    for (var i = -1; i <= 1; i = i + 2) {
        for (var j = -1; j <= 1; j = j + 2) {
            corner = baseCorner.clone();
            corner.position.x += i * DBZCCG.Card.cardWidth / 2 + i * (-1) * DBZCCG.Card.cornerWidth / 2;
            corner.position.y += j * DBZCCG.Card.cardHeight / 2;
            THREE.GeometryUtils.merge(DBZCCG.Card.basicCardGeo, corner);
        }
    }

    DBZCCG.Card.borderMaterial = borderMaterial;

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

    DBZCCG.Card.basicCardGeo.computeFaceNormals();

    delete baseCorner;
})();

/* End of required materials for the cards */

DBZCCG.Card.generateRandom = function() {
    // TODO: Generate a real random card. This only generates the image.
    var card = {type: DBZCCG.Card.Type.Personality, style: DBZCCG.Card.Style.Freestyle, PUR: 2, alignment: DBZCCG.Personality.alignment.Rogue, description: "Power: Once per combat, reduces the damage of an energy attack by 2 life cards.", level: 1, name: "VEGETA", highTech: false, number: 173, texturePath: "images/DBZCCG/saiyan/" + (parseInt(Math.random() * 1000 % 250) + 1001).toString().substring(1) + ".jpg",
        personality: DBZCCG.Personality.Personalities.VEGETA, saga: DBZCCG.Card.Saga.Saiyan, powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]};
    return DBZCCG.Card.createCard(card);
}

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

DBZCCG.Card.create = function(dataObject) {

    function CardObject(dataObject) {

        function createCard(texturePath) {
            var card = new THREE.Object3D();
            var frontTexture = texturePath ? THREE.ImageUtils.loadTexture(texturePath) : null;

            cardCoverBackMaterials = [];
            for (var i = 0; i < 4; i++) {
                cardCoverBackMaterials.push(new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors})); // sides
            }

            cardCoverBackMaterials[4] = new THREE.MeshBasicMaterial({map: DBZCCG.Card.backTexture}); // back
            cardCoverBackMaterials[5] = new THREE.MeshBasicMaterial({map: frontTexture}); // front

            for (var i = 0; i < 4; i++) {
                cardCoverBackMaterials.push(new THREE.MeshBasicMaterial({wireframe: true})); // sides
            }

            var cube = new THREE.Mesh(DBZCCG.Card.cubeGeo, new THREE.MeshFaceMaterial(cardCoverBackMaterials));

            card.add(cube);

            return card;
        }

        this.facedown = function() {
            this.display.rotation.x = this.display.rotation.y = this.display.rotation.z = 0.0;
            this.display.rotation.x += -90 * Math.PI / 180;
        };

        this.faceup = function() {
            this.display.rotation.x = this.display.rotation.y = this.display.rotation.z = 0.0;
            this.display.rotation.x += -90 * Math.PI / 180;
            this.display.rotation.y += -180 * Math.PI / 180;
        };

        this.turnThisWay = function(vec) {
            if (vec instanceof THREE.Vector3) {
                this.display.rotation.z = Math.acos(vec.z / vec.length());
            }
        };

        this.moveY = function(n) {
            if (typeof n === "number") {
                this.display.position.y = DBZCCG.Card.cornerWidth * DBZCCG.Card.cardThicknessScale * n * 2;
            }
        };

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

        this.display = createCard(dataObject.texturePath);
        this.display.name = this.name;
        this.display.parentCard = this;
        var card = this;

        DBZCCG.Callbacks.create(card.display, 'callback', function (cb) {
        });

        if (!dataObject.playable && dataObject.effect) {
            card.display.addCallback(DBZCCG.Combat.activateEffectCallback);
        } else if (dataObject.playable) {
            card.display.addCallback(DBZCCG.Combat.placeCardInField);
        }

        card.effect = dataObject.effect;
        card.activable = dataObject.activable;
        card.postEffect = dataObject.postEffect;
        card.successfulEffect = dataObject.successfulEffect;
        card.playable = dataObject.playable;
        card.effectType = dataObject.effectType;
        card.damage = dataObject.damage;
        card.cost = dataObject.cost;
        card.activators = dataObject.activators;
        card.defenseShield = dataObject.defenseShield;

        card.getTextureImg = function () {
            if(card.display.children[0].material.materials[5].map && card.display.children[0].material.materials[5].map.sourceFile) {
                return card.display.children[0].material.materials[5].map.sourceFile;
            }
        };

        card.display.displayName = function() {
            return card.name;
        };

        card.display.turnGameDisplay = function() {
            if (card.display.leftScreenCallback === null) {
                card.display.leftScreenCallback = card.display.offLeftScreenCallback;
                card.display.offLeftScreenCallback = null;
                card.display.descriptionBox = card.display.offDescriptionBox;
                card.display.offDescriptionBox = null;
                card.display.mouseOut = card.display.offMouseOut;
                card.display.offMouseOut = null;
                card.display.mouseOver = card.display.offMouseOver;
                card.display.offMouseOver = null;
            } else {
                card.display.offLeftScreenCallback = card.display.leftScreenCallback;
                card.display.leftScreenCallback = null;
                card.display.offDescriptionBox = card.display.descriptionBox;
                card.display.descriptionBox = null;
                card.display.offMouseOut = card.display.mouseOut;
                card.display.mouseOut = null;
                card.display.offMouseOver = card.display.mouseOver;
                card.display.mouseOver = null;
            }
        };

        card.display.leftScreenCallback = function(source, created) {
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

        card.display.displayHoverText = function() {
            var ret = '';

            ret += card.display.descriptionBox();

            ret += '<div style="clear:both;"/>';

            if (DBZCCG.performingAction.checkOwnership(card.display) && card.activable instanceof Function &&
                    card.activable(DBZCCG.performingAction) && card.effectType instanceof Array &&
                    (card.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 ||
                            card.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1)) {

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

        DBZCCG.Combat.setMouseOverCallback(card.display);

        card.display.descriptionBox = function() {
            var content = "<div class='property-description-box card-name'>" + card.name + "</div>\
                            <div class='property-description-box card-type'>[" + ClassHelper.getKeyByValue(DBZCCG.Card.Type, card.type) + " Card]</div>\
                            <div class='property-description-box card-description'>" + card.description + "</div>";
            content += "<div class='card-collection-box'>";
            if (card.personality) {
                content += "<div class='card-personality'><div class='label-title'>[Personality]</div><div class='label-description-box'><div class='description-icon'><img class='left-screen-icon' src='images/icons/" + ClassHelper.getKeyByValue(DBZCCG.Personality.Personalities, card.personality).toLowerCase() + "-icon.png' title='" + ClassHelper.getKeyByValue(DBZCCG.Personality.Personalities, card.personality) + "'/></div></div></div>";
            }

            content += "<div class='card-style'><div class='label-title'>[Style]</div><div class='label-description-box'><div class='description-icon'><img class='left-screen-icon' src='images/icons/" + ClassHelper.getKeyByValue(DBZCCG.Card.Style, card.style).toLowerCase() + "-icon.png' title='" + ClassHelper.getKeyByValue(DBZCCG.Card.Style, card.style) + "'/></div></div></div>\
                        <div class='card-saga-label'><div div class='label-title'>[Saga]</div><div class='label-description-box'><div class='description-icon'><img class='left-screen-icon' src='images/icons/" + ClassHelper.getKeyByValue(DBZCCG.Card.Saga, card.saga).toLowerCase() + "-saga-icon.png' title='" + ClassHelper.getKeyByValue(DBZCCG.Card.Saga, card.saga) + " Saga'/><img class='left-screen-icon' src='images/icons/" + ClassHelper.getKeyByValue(DBZCCG.Card.Rarity, card.rarity).toLowerCase().replace(" ", "") + "-icon.png' title='" + ClassHelper.getKeyByValue(DBZCCG.Card.Rarity, card.rarity) + "' /></div><div class='saga-label-number'>#" + card.number + "</div></div></div>";

            content += "</div><div style='clear: both;'>";
            return content;
        };

        card.logName = function() {
            return '{' + ClassHelper.getKeyByValue(DBZCCG.Card.Saga, card.saga) + ' ' + card.number + '}';
        }

    }

    if (dataObject === "random") {
        return new CardObject(DBZCCG.Card.generateRandom());
    } else {
        return new CardObject(dataObject || {});
    }
};