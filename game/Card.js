DBZCCG.Card = {};

// SAGA
DBZCCG.Card.Saga = {};
DBZCCG.Card.Saga.SAIYAN = 1;

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
DBZCCG.Card.personalityNameDiff = {};
DBZCCG.Card.personalityNameDiff[DBZCCG.Card.Saga.SAIYAN] = DBZCCG.Card.cardHeight / 10;
DBZCCG.Card.personalityPowerStageDiff = {};
DBZCCG.Card.personalityPowerStageDiff[DBZCCG.Card.Saga.SAIYAN] = {"regular": {"Zero": DBZCCG.Card.cardHeight * 0.61, "diff": 0.3845}};

// TYPES
DBZCCG.Card.Type = {};
DBZCCG.Card.Type.Personality = 1;
DBZCCG.Card.Type.NonCombat = 2;
DBZCCG.Card.Type.Combat = 3;
DBZCCG.Card.Type.PhysicalCombat = 4;
DBZCCG.Card.Type.EnergyCombat = 5;
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
    DBZCCG.Card.cubeGeo = new THREE.CubeGeometry(DBZCCG.Card.cardWidth - DBZCCG.Card.cornerWidth, DBZCCG.Card.cardHeight, DBZCCG.Card.cornerWidth * 8);


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

    delete baseCorner;
})();

/* End of required materials for the cards */

DBZCCG.Card.generateRandom = function() {
    // TODO: Generate a real random card. This only generates the image.
    var card = {type: DBZCCG.Card.Type.Personality, style: DBZCCG.Card.Style.Freestyle, PUR: 2, alignment: DBZCCG.Personality.alignment.Rogue, description: "Power: Once per combat, reduces the damage of an energy attack by 2 life cards.", level: 1, name: "VEGETA", highTech: false, number: 173, texturePath: "images/DBZCCG/saiyan/" + (parseInt(Math.random() * 1000 % 250) + 1001).toString().substring(1) + ".jpg",
        personality: DBZCCG.Personality.VEGETA, saga: DBZCCG.Card.Saga.SAIYAN, powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]};
    return DBZCCG.Card.createCard(card);
}

DBZCCG.Card.createCard = function(card) {
    var card;
    switch (card.type) {
        case DBZCCG.Card.Type.Personality:
            card = DBZCCG.Personality.create(card);
            break;
        case DBZCCG.Card.Type.NonCombat:
            card = NonCombat.create(card);
            break;
        case DBZCCG.Card.Type.Combat:
            card = Combat.create(card);
            break;
        case DBZCCG.Card.Type.PhysicalCombat:
            card = PhysicalCombat.create(card);
            break;
        case DBZCCG.Card.Type.EnergyCombat:
            card = EnergyCombat.create(card);
            break;
        case DBZCCG.Card.Type.Dragonball:
            card = Dragonball.create(card);
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
            card = Drill.create(card);
    }
    return card;
}

DBZCCG.Card.create = function(dataObject) {

    function CardObject(dataObject) {

        function createCard(texturePath) {
            var card = new THREE.Object3D();
            var frontTexture = texturePath ? THREE.ImageUtils.loadTexture(texturePath) : null;

            card.add(new THREE.Mesh(DBZCCG.Card.basicCardGeo, DBZCCG.Card.borderMaterial));

            cardCoverBackMaterials = [];
            for (var i = 0; i < 4; i++) {
                cardCoverBackMaterials.push(DBZCCG.Card.cardMaterial); // sides
            }

            cardCoverBackMaterials[4] = new THREE.MeshBasicMaterial({map: DBZCCG.Card.backTexture}); // back
            cardCoverBackMaterials[5] = new THREE.MeshBasicMaterial({map: frontTexture}); // front

            var cube = new THREE.Mesh(DBZCCG.Card.cubeGeo, new THREE.MeshFaceMaterial(cardCoverBackMaterials));
            card.add(cube);
            card.scale.z = DBZCCG.Card.cardThicknessScale;

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
            if (typeof n == "number") {
                this.display.position.y = DBZCCG.Card.cornerWidth * DBZCCG.Card.cardThicknessScale * n * 2;
            }
        };

        this.name = dataObject.name;
        this.highTech = dataObject.highTech;
        this.saga = dataObject.saga;
        this.personality = dataObject.personality;
        this.style = dataObject.style;
        this.description = dataObject.description;
        this.number = dataObject.number;
        this.display = createCard(dataObject.texturePath);
        this.display.name = this.name;
        this.display.parentCard = this;
        var card = this;

        card.display.turnGameDisplay = function() {
            if (card.display.leftScreenCallback === null) {
                card.display.leftScreenCallback = card.display.offLeftScreenCallback;
                card.display.offLeftScreenCallback = null;
                card.display.descriptionBox = card.display.offDescriptionBox;
                card.display.offDescriptionBox = null;
            } else {
                card.display.offLeftScreenCallback = card.display.leftScreenCallback;
                card.display.leftScreenCallback = null;
                card.display.offDescriptionBox = card.display.descriptionBox;
                card.display.descriptionBox = null;
            }
        }

        card.display.leftScreenCallback = function(source, created) {
            var obj = new THREE.Object3D();
            var rotate = false;
            if (created.position.z < 0) {
                rotate = true;
            }

            created.rotation.x = -Math.PI/2;
            created.rotation.y = -Math.PI/2;

            obj.add(created);
            created.position.set(0, 0, 0);

            if (rotate) {
                obj.rotation.y = Math.PI;
                obj.rotation.z = -Math.PI;
            } else {
                obj.rotation.z = Math.PI;
            }

            var firstRotation = obj.rotation.clone();
            firstRotation.z = 0;
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

        card.display.descriptionBox = function() {
            var content = "<div class='card-name'>" + card.name + "</div>\
                            <div class='card-type'>[%type%]</div>\
                            <div class='card-description'>" + card.description + "</div>";
            if (card.personality) {
                content += "<div class='card-personality'>Personality: " + getKeyByValue(DBZCCG.Personality, card.personality) + "</div>";
            }

            content += "<div class='card-style'>Style: " + getKeyByValue(DBZCCG.Card.Style, card.style) + "</div>\
                        <div class='card-saga-label'>" + getKeyByValue(DBZCCG.Card.Saga, card.saga) + " SAGA (#" + card.number + ")</div>";

            return content;
        };

    }

    if (dataObject === "random") {
        return new CardObject(DBZCCG.Card.generateRandom());
    } else {
        return new CardObject(dataObject || {});
    }
};