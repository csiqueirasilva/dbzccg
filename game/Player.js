Player = {};

Player.Field = {};

Player.Field.cornerWidth = 1;
Player.Field.Height = 40;
Player.Field.Width = 40;

Player.create = function(dataObject, vec) {

    function PlayerObject(dataObject, vec) {

        this.dirVector = vec.clone().normalize();
        this.distanceFromCenter = vec.length();

        this.loadPlayerSpace = function(scene) {
            var field = new THREE.Object3D();

            var mainPersonalityPos = this.dirVector.clone();
            mainPersonalityPos.multiplyScalar(Player.Field.Height/2 + this.distanceFromCenter);

            this.mainPersonality.addToField(mainPersonalityPos, field);

            /* Surrounding area */
            var surroundingArea = new THREE.Object3D();
            var geo = new THREE.CylinderGeometry(Player.Field.cornerWidth, Player.Field.cornerWidth, Player.Field.Width, 32, 16, true);
            var material = new THREE.MeshBasicMaterial({wireframe: true, color: 0xFFFFFF, side: THREE.DoubleSide});

            // Superior row
            var superiorRow = new THREE.Mesh(geo, material);
            superiorRow.position = this.dirVector.clone().multiplyScalar(this.distanceFromCenter);
            superiorRow.rotation.z = Math.PI / 2;
            surroundingArea.add(superiorRow);

            // Bottom row
            var inferiorRow = new THREE.Mesh(geo, material);
            inferiorRow.position = this.dirVector.clone().multiplyScalar(this.distanceFromCenter);
            var bottomRowPosition = this.dirVector.clone().multiplyScalar(Player.Field.Width);
            inferiorRow.position.add(bottomRowPosition);
            inferiorRow.rotation.z = Math.PI / 2;
            surroundingArea.add(inferiorRow);

            // Right and left rows
            geo = new THREE.CylinderGeometry(Player.Field.cornerWidth, Player.Field.cornerWidth, bottomRowPosition.length(), 32, 16, true);
            var horizontalPos = MathHelper.rotateVector(this.dirVector, new THREE.Vector3(0,1,0), Math.PI/2);
            horizontalPos.multiplyScalar(Player.Field.Width / 2);

            // Right column
            var rightColumn = new THREE.Mesh(geo, material);
            rightColumn.position.copy(horizontalPos).add(this.dirVector.clone().multiplyScalar(Player.Field.Height / 2 + this.distanceFromCenter));
            rightColumn.rotation.x = Math.PI / 2;
            surroundingArea.add(rightColumn);

            // Left column
            var leftColumn = new THREE.Mesh(geo, material);
            leftColumn.position.copy(MathHelper.reflect(rightColumn.position, this.dirVector));
            leftColumn.rotation.x = Math.PI / 2;
            surroundingArea.add(leftColumn);

            // debug reflect

            // Corners
            var topRightPos = rightColumn.position.clone().add(this.dirVector.clone().multiplyScalar(-Player.Field.Height / 2));
            var bottomRightPos = rightColumn.position.clone().add(this.dirVector.clone().multiplyScalar(Player.Field.Height / 2));
            var bottomLeftPos = MathHelper.reflect(bottomRightPos, this.dirVector);
            var topLeftPos = MathHelper.reflect(topRightPos, this.dirVector);

            scene.add(MathHelper.lineFromOrigin(topRightPos, 0xFFFF00));
            scene.add(MathHelper.lineFromOrigin(bottomRightPos, 0xFFFF00));
            scene.add(MathHelper.lineFromOrigin(topLeftPos, 0xFFFF00));
            scene.add(MathHelper.lineFromOrigin(bottomLeftPos, 0xFFFF00));

            geo = new THREE.SphereGeometry(Player.Field.cornerWidth, 32, 16);

            // top left
            var topLeftCorner = new THREE.Mesh(geo, material);
            topLeftCorner.position.copy(topLeftPos);
            surroundingArea.add(topLeftCorner);

            // bottom left
            var bottomLeftCorner = topLeftCorner.clone();
            bottomLeftCorner.position.copy(bottomLeftPos);
            surroundingArea.add(bottomLeftCorner);

            // top right
            var topRightCorner = topLeftCorner.clone();
            topRightCorner.position.copy(topRightPos);
            surroundingArea.add(topRightCorner);

            // bottom right
            var bottomRightCorner = topLeftCorner.clone();
            bottomRightCorner.position.copy(bottomRightPos);
            field.add(bottomRightCorner);

            field.add(surroundingArea);
            scene.add(field);
        };

        function loadCards(cardList) {
            var cards = [];
            for (var i = 0; i < cardList.length; i++) {
                var card = cardList[i];
                switch (card.type) {
                    case Card.Type.Personality:
                        card.add(Personality.create(card));
                        break;
                    case Card.Type.NonCombat:
                        card.add(NonCombat.create(card));
                        break;
                    case Card.Type.Combat:
                        card.add(Combat.create(card));
                        break;
                    case Card.Type.PhysicalCombat:
                        card.add(PhysicalCombat.create(card));
                        break;
                    case Card.Type.EnergyCombat:
                        card.add(EnergyCombat.create(card));
                        break;
                    case Card.Type.Dragonball:
                        card.add(Dragonball.create(card));
                        break;
//                        case Card.Type.Battleground:
//                            card.add(Battleground.create(card));
//                            break;
//                        case Card.Type.Location:
//                            card.add(Location.create(card));
//                            break;
//                        case Card.Type.Fusion:
//                            card.add(Fusion.create(card));
//                            break;
                    case Card.Type.Drill:
                        card.add(Drill.create(card));
                }
            }
            return cards;
        }

        this.angerLevelNeededToLevel = dataObject.angerLevelNeededToLevel;
        this.angerLevel = dataObject.currentAngerLevel;
        this.lifeDeck = null;
        this.discardPile = null;
        this.removedFromTheGame = null;
        this.allies = null;
        this.mastery = null;

        this.mainPersonality = MainPersonality.create(dataObject.mainPersonality);
//            this.mastery = Mastery.create(dataObject.mastery);
//            this.lifeDeck = loadCards(dataObject.lifeDeck);
//            this.sensei = Sensei.create(dataObject.sensei);

        if (this.sensei) {
            //              this.senseiDeck = loadCards(dataObject.senseiDeck);
            //Load SenseiDeck and Sensei Card
        }

//            this.mastery = tableCards.mastery;
        if (this.mastery) {
            //loadMastery
        }

    }
    return new PlayerObject(dataObject, vec);

};