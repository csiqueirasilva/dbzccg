Table = {}

Table.basePlayerDistance = 1;

Table.createSurroundingArea = function (direction, width, height, cornerWidth) {
    /* Surrounding area */
    var surroundingArea = new THREE.Object3D();
    var dir = direction.clone().normalize();
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
    var horizontalPos = MathHelper.rotateVector(dir, new THREE.Vector3(0, 1, 0), Math.PI / 2);
    horizontalPos.multiplyScalar(width / 2);

    // Right column
    var rightColumn = new THREE.Mesh(geo, material);
    rightColumn.position.copy(horizontalPos).add(dir.clone().multiplyScalar(height / 2 + distanceFromCenter));
    rightColumn.rotation.x = Math.PI / 2;
    surroundingArea.add(rightColumn);

    // Left column
    var leftColumn = new THREE.Mesh(geo, material);
    leftColumn.position.copy(MathHelper.reflect(rightColumn.position, dir));
    leftColumn.rotation.x = Math.PI / 2;
    surroundingArea.add(leftColumn);

    // Corners
    var topRightPos = rightColumn.position.clone().add(dir.clone().multiplyScalar(-height / 2));
    var bottomRightPos = rightColumn.position.clone().add(dir.clone().multiplyScalar(height / 2));
    var bottomLeftPos = MathHelper.reflect(bottomRightPos, dir);
    var topLeftPos = MathHelper.reflect(topRightPos, dir);

    /*
     // DEBUG 
     scene.add(MathHelper.lineFromOrigin(topRightPos, 0xFFFF00));
     scene.add(MathHelper.lineFromOrigin(bottomRightPos, 0xFFFF00));
     scene.add(MathHelper.lineFromOrigin(topLeftPos, 0xFFFF00));
     scene.add(MathHelper.lineFromOrigin(bottomLeftPos, 0xFFFF00));
     */

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

Table.create = function(extPlayers) {

    function TableObject(extPlayers) {

        this.players = [];

        var unparsedPlayers = [];
        var qttPlayers = extPlayers.length;

        /* Special Case */
        if (qttPlayers == 2) {
            var p1 = {data: extPlayers[0], pos: new THREE.Vector3(0, 0, Table.basePlayerDistance / 2)};
            var p2 = {data: extPlayers[1], pos: new THREE.Vector3(0, 0, -Table.basePlayerDistance / 2)};

            unparsedPlayers.push(p1);
            unparsedPlayers.push(p2);
        } else /* Use the regular polygon law and cosin law to find all position vectors of the 3+ players */ {
            for (var i = 0; i < qttPlayers; i++) {
                var angleBetween = (qttPlayers - 2) * Math.PI / qttPlayers;
                /* Use the regular polygon law and cosin law to find all position vectors of the players */
            }
        }

        for (var i = 0; i < unparsedPlayers.length; i++) {
            this.players.push(Player.create(unparsedPlayers[i].data, unparsedPlayers[i].pos));
        }

    }

    return new TableObject(extPlayers);
};