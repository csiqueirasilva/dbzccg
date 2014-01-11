DBZCCG.Table = {}

DBZCCG.Table.basePlayerDistance = 1;

DBZCCG.Table.createSurroundingArea = function(direction, width, height, cornerWidth) {
    /* Surrounding area */
    var surroundingArea = new THREE.Object3D();
    var dir = direction.clone().normalize();
    var reflectAxis = MathHelper.rotateVector(dir);
    var distanceFromCenter = direction.length();
    var geo = new THREE.CylinderGeometry(cornerWidth, cornerWidth, width, 32, 16, true);
    var material = new THREE.MeshBasicMaterial({color: 0x444444, side: THREE.FrontSide});
    var fontMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.FrontSide});

    // Superior row
    var superiorRow = new THREE.Mesh(geo, material);
    superiorRow.position = direction.clone();
    superiorRow.rotation.z = Math.PI / 2;
    surroundingArea.add(superiorRow);

    // Text
    surroundingArea.removeLabelText = function() {
        if (this.labelText instanceof THREE.Mesh) {
            this.remove(this.labelText);
            delete this.labelText;
            this.labelText = undefined;
        }
    };

    surroundingArea.changeLabelText = function(text) {
        if (text) {

            this.removeLabelText();

            var textGeo = new THREE.TextGeometry(text, {
                size: 0.8,
                height: 0.1,
                curveSegments: 4,
                weight: "bold",
                font: "optimer"

            });

            textGeo.computeBoundingBox();

            var textMesh = new THREE.Mesh(textGeo, fontMaterial);
            textMesh.position = superiorRow.position.clone();
            textMesh.position.x -= (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x) / 2;
            textMesh.position.y += 0.2;
            this.add(textMesh);
            this.labelText = textMesh;
            DBZCCG.billboards.push(textMesh);
        }
    };

    surroundingArea.changeLabelText("Area");

    // Bottom row
    var inferiorRow = new THREE.Mesh(geo, material);
    inferiorRow.position = direction.clone();
    var bottomRowPosition = dir.clone().multiplyScalar(height);
    inferiorRow.position.add(bottomRowPosition);
    inferiorRow.rotation.z = Math.PI / 2;
    surroundingArea.add(inferiorRow);

    // Right and left rows
    geo = new THREE.CylinderGeometry(cornerWidth, cornerWidth, bottomRowPosition.length(), 32, 16, true);
    var horizontalPos = MathHelper.rotateVector(dir.clone(), new THREE.Vector3(0, 1, 0), Math.PI / 2);
    horizontalPos.multiplyScalar(width / 2);

    // Right column
    var rightColumn = new THREE.Mesh(geo, material);
    rightColumn.position.copy(horizontalPos).add(dir.clone().multiplyScalar(height / 2 + distanceFromCenter));
    rightColumn.rotation.x = Math.PI / 2;
    surroundingArea.add(rightColumn);

    // Left column
    var leftColumn = new THREE.Mesh(geo, material);
    leftColumn.position.copy(MathHelper.reflect(rightColumn.position, reflectAxis));
    leftColumn.rotation.x = Math.PI / 2;
    surroundingArea.add(leftColumn);

    // Corners
    var topRightPos = rightColumn.position.clone().add(dir.clone().multiplyScalar(-height / 2));
    var bottomRightPos = rightColumn.position.clone().add(dir.clone().multiplyScalar(height / 2));
    var bottomLeftPos = MathHelper.reflect(bottomRightPos, reflectAxis);
    var topLeftPos = MathHelper.reflect(topRightPos, reflectAxis);

    // DEBUG 
//     surroundingArea.add(MathHelper.lineFromOrigin(topRightPos, 0xFFFF00));
//     surroundingArea.add(MathHelper.lineFromOrigin(bottomRightPos, 0xFFFF00));
//     surroundingArea.add(MathHelper.lineFromOrigin(topLeftPos, 0xFFFF00));
//     surroundingArea.add(MathHelper.lineFromOrigin(bottomLeftPos, 0xFFFF00));

    geo = new THREE.SphereGeometry(cornerWidth, 32, 16);

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
    surroundingArea.add(bottomRightCorner);

    return surroundingArea;
}

DBZCCG.Table.create = function(extPlayers, camera, scene) {

    function TableObject(extPlayers, camera, scene) {

        this.players = [];

        // Constructor:

        var unparsedPlayers = [];
        var qttPlayers = extPlayers.length;

        /* Special Case */
        if (qttPlayers == 2) {
            var p1 = {data: extPlayers[0], pos: new THREE.Vector3(0, 0, DBZCCG.Table.basePlayerDistance / 2)};
            var p2 = {data: extPlayers[1], pos: new THREE.Vector3(0, 0, -DBZCCG.Table.basePlayerDistance / 2)};

            unparsedPlayers.push(p1);
            unparsedPlayers.push(p2);
        } else /* Use the regular polygon law and cosin law to find all position vectors of the 3+ players */ {
            for (var i = 0; i < qttPlayers; i++) {
                var angleBetween = (qttPlayers - 2) * Math.PI / qttPlayers;
                /* Use the regular polygon law and cosin law to find all position vectors of the players */
                /* NYI */
            }
        }

        /* Player 1 hand adjustments */
        this.players.push(DBZCCG.Player.create(unparsedPlayers[0].data, unparsedPlayers[0].pos));

        /* Adjust camera for P1 */
        var position = this.players[0].dirVector.clone();
        camera.position.z = position.z * DBZCCG.Table.basePlayerDistance * 70;
        camera.position.y = 60;
        camera.position.x = position.x;
        camera.lookAt(new THREE.Vector3(position.x, -10, -position.z));

        DBZCCG.mainPlayer = this.players[0];

        this.players[0].hand.rotation.x = camera.rotation.x;
        this.players[0].hand.position.y = (camera.position.y + 10) * 0.5;
        this.players[0].hand.position.z = (camera.position.z + position.z) * 0.78;
        this.players[0].loadPlayerSpace(scene);

        // Load other players
        for (var i = 1; i < unparsedPlayers.length; i++) {
            this.players.push(DBZCCG.Player.create(unparsedPlayers[i].data, unparsedPlayers[i].pos));
            this.players[i].loadPlayerSpace(scene);
        }

        /* Hide player 2 hand */
        for (var i = 1; i < this.players.length; i++) {
            for (var j = 0; j < this.players[i].hand.cards.length; j++) {
                this.players[i].hand.cards[j].display.turnGameDisplay();
            }
        }
    }

    return new TableObject(extPlayers, camera, scene);
};