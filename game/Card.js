var Card = {};

// SAGA
Card.Saga = {};
Card.Saga.SAIYAN = 1;


// GFX Parameters
Card.cardHeight = 5.5;
Card.cardWidth = 4;
Card.cornerWidth = 0.10;
Card.cornerHeight = Card.cornerWidth;
Card.cardHeight = 5.5;
Card.cardWidth = 4;
Card.cornerWidth = 0.10;
Card.cornerHeight = Card.cornerWidth;
Card.cardThicknessScale = 0.1;
Card.personalityNameDiff = {};
Card.personalityNameDiff[Card.Saga.SAIYAN] = Card.cardHeight/10;
Card.personalityPowerStageDiff = {};
Card.personalityPowerStageDiff[Card.Saga.SAIYAN] = { "regular": {"Zero": Card.cardHeight*0.61, "diff": 0.3845} };

// TYPES
Card.Type = {};
Card.Type.Personality = 1;
Card.Type.NonCombat = 2;
Card.Type.Combat = 3;
Card.Type.PhysicalCombat = 4;
Card.Type.EnergyCombat = 5;
Card.Type.Dragonball = 6;
Card.Type.Mastery = 7;
Card.Type.Battleground = 8;
Card.Type.Location = 9;
Card.Type.Sensei = 10;
Card.Type.Fusion = 11;
Card.Type.Drill = 12;

// STYLES
Card.Style = {};
Card.Style.Freestyle = 1;
Card.Style.Red = 2;
Card.Style.Saiyan = 3;
Card.Style.Namekian = 4;
Card.Style.Blue = 5;
Card.Style.Orange = 6;
Card.Style.Black = 7;

Card.create = function(dataObject) {
    
    function CardObject(dataObject) {

        function createCard(texturePath) {
            var card = new THREE.Object3D();
            var cardGeo = new THREE.CylinderGeometry(Card.cornerWidth, Card.cornerWidth, Card.cardWidth - Card.cornerWidth, 32, 16, true);
            var backTexture = THREE.ImageUtils.loadTexture("images/DBZCCG/back.jpg");
            var frontTexture = THREE.ImageUtils.loadTexture(texturePath);
            var borderTexture = THREE.ImageUtils.loadTexture("images/DBZCCG/border_low.jpg");
            var cornerTexture = THREE.ImageUtils.loadTexture("images/DBZCCG/corner_low.jpg");
            var cardMaterial = new THREE.MeshLambertMaterial({color: 0x000000, side: THREE.FrontSide});

            var cornerMaterial = new THREE.MeshLambertMaterial({
                side: THREE.FrontSide,
                map: cornerTexture
            });

            var borderMaterial = new THREE.MeshLambertMaterial({
                side: THREE.FrontSide,
                map: borderTexture
            });

            var top = new THREE.Mesh(cardGeo, borderMaterial);

            var bot = top.clone();

            cardGeo = new THREE.CylinderGeometry(Card.cornerWidth, Card.cornerWidth, Card.cardHeight, 32, 16, true);
            var left = new THREE.Mesh(cardGeo, borderMaterial);
            var right = left.clone();

            top.rotation.z += 90 * Math.PI / 180;
            top.position.y += Card.cardHeight / 2;
            bot.rotation.z += 90 * Math.PI / 180;
            bot.position.y -= Card.cardHeight / 2;
            left.position.x -= (Card.cardWidth - Card.cornerWidth) / 2;
            right.position.x += (Card.cardWidth - Card.cornerWidth) / 2;

            card.add(top);
            card.add(bot);
            card.add(right);
            card.add(left);

            var cornerGeo = new THREE.SphereGeometry(Card.cornerWidth, 32, 16);
            var baseCorner = new THREE.Mesh(cornerGeo, cornerMaterial);

            // Add circles in borders
            for (var i = -1; i <= 1; i = i + 2) {
                for (var j = -1; j <= 1; j = j + 2) {
                    corner = baseCorner.clone();
                    corner.position.x += i * Card.cardWidth / 2 + i * (-1) * Card.cornerWidth / 2;
                    corner.position.y += j * Card.cardHeight / 2;
                    card.add(corner);
                }
            }

            // Add card box
            var cubeMaterials = [];
            for (var i = 0; i < 4; i++) {
                cubeMaterials.push(cardMaterial.clone()); // sides
            }
            cubeMaterials[4] = new THREE.MeshBasicMaterial({map: backTexture}); // back
            cubeMaterials[5] = new THREE.MeshBasicMaterial({map: frontTexture}); // front
            var cubeGeo = new THREE.CubeGeometry(Card.cardWidth - Card.cornerWidth, Card.cardHeight, Card.cornerWidth * 2);

            var cube = new THREE.Mesh(cubeGeo, new THREE.MeshFaceMaterial(cubeMaterials));
            card.add(cube);
            card.scale.z = Card.cardThicknessScale;

            return card;
        }

        this.facedown = function () {
            this.display.rotation.x = this.display.rotation.y = this.display.rotation.z = 0.0;
            this.display.rotation.x += -90 * Math.PI / 180;
        };
        
        this.faceup = function () {
            this.display.rotation.x = this.display.rotation.y = this.display.rotation.z = 0.0;
            this.display.rotation.x += -90 * Math.PI / 180;
            this.display.rotation.y += -180 * Math.PI / 180;
        };
        
        this.turnThisWay = function (vec) {
            if(vec instanceof THREE.Vector3) {
                this.display.rotation.z = Math.acos(vec.z/vec.length());
            }
        };
        
        this.moveY = function (n) {
            if(typeof n == "number") {
                this.display.position.y = Card.cornerWidth * Card.cardThicknessScale * n * 2;
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
        var card = this;
        card.display.mouseOver = function() {
            DBZCCG.selectionEffect(DBZCCG.selectionColor, card.display.children);
            DBZCCG.leftScreen.focusElement(card.display, card.display.position);

            DBZCCG.selectionParticles.position.copy(card.display.position);
            DBZCCG.selectionParticles.visible = true;
            // format card text
//            return "Current anger level: " + mp.currentAngerLevel;
        };

        card.display.mouseOut = function() {
            DBZCCG.selectionEffect(DBZCCG.clearSelectionColor, card.display.children);
            DBZCCG.selectionParticles.visible = false;
        };
        
        card.descriptionBox = function () {
            var content = "<div class='card-name'>"+card.name+"</div>\
                            <div class='card-type'>[%type%]</div>\
                            <div class='card-description'>"+card.description+"</div>";
            if(card.personality) {
                content += "<div class='card-personality'>Personality: "+getKeyByValue(Personality, card.personality)+"</div>";
            }
            
            content += "<div class='card-style'>Style: "+getKeyByValue(Card.Style, card.style)+"</div>\
                        <div class='card-saga-label'>"+getKeyByValue(Card.Saga, card.saga)+" SAGA (#"+card.number+")</div>";

            return content;
        };

    }
    
    return new CardObject(dataObject);
    
};