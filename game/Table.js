DBZCCG.Table = {}

DBZCCG.Table.basePlayerDistance = 1;

DBZCCG.Table.createSurroundingArea = function(direction, width, height, cornerWidth) {
    /* Surrounding area */
    var surroundingArea = new THREE.Object3D();
    var dir = direction.clone().normalize();
    var reflectAxis = MathHelper.rotateVector(dir);
    var distanceFromCenter = direction.length();
    var geo = new THREE.CylinderGeometry(cornerWidth, cornerWidth, width, 32, 16, true);
    var material = new THREE.MeshBasicMaterial({color: 0x444444, side: THREE.DoubleSide});

    // Superior row
    var superiorRow = new THREE.Mesh(geo, material);
    superiorRow.position = direction.clone();
    superiorRow.rotation.z = Math.PI / 2;
    surroundingArea.add(superiorRow);

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

        for (var i = 0; i < unparsedPlayers.length; i++) {
            this.players.push(DBZCCG.Player.create(unparsedPlayers[i].data, unparsedPlayers[i].pos));
            this.players[i].loadPlayerSpace(scene);
        }

        /* Adjust camera for P1 */
        var position = this.players[0].dirVector.clone();
        camera.position.z = position.z * DBZCCG.Table.basePlayerDistance * 70;
        camera.position.y = 60;
        camera.position.x = position.x;
        camera.lookAt(new THREE.Vector3(position.x, -10, -position.z));

        this.players[0].hand.display.rotation.x = camera.rotation.x;
        this.players[0].hand.display.position.y = (camera.position.y + 10) * 0.5;
        this.players[0].hand.display.position.z = (camera.position.z + position.z) * 0.78;

        DBZCCG.mainPlayer = this.players[0];

        for (var j = 0; j < this.players[0].hand.display.children.length; j++) {
            console.log(this.players[0].hand.display.children[j].parentCard);
        }

        /* Hide player 2 hand */
        for (var i = 1; i < this.players.length; i++) {
            for (var j = 0; j < this.players[i].hand.display.children.length; j++) {
                this.players[i].hand.display.children[j].turnGameDisplay();
            }
        }
    }

    return new TableObject(extPlayers, camera, scene);
};