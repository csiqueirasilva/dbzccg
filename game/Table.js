DBZCCG.Table = {}

DBZCCG.Table.basePlayerDistance = 1;

DBZCCG.Table.Camera = {};
DBZCCG.Table.Camera.Top = 0;
DBZCCG.Table.Camera.Side = 1;

DBZCCG.Table.createSurroundingArea = function(direction, width, height, cornerWidth) {
    /* Surrounding area */
    var surroundingArea = new THREE.Object3D();
    var dir = direction.clone().normalize();
    var reflectAxis = MathHelper.rotateVector(dir);
    var distanceFromCenter = direction.length();
    var geo = new THREE.CylinderGeometry(cornerWidth, cornerWidth, width, 32, 16, true);
    var material = new THREE.MeshBasicMaterial({color: 0x444444, transparent: true, opacity: 0.75, side: THREE.FrontSide});
    var floorMaterial = new THREE.MeshBasicMaterial({color: 0x444444, transparent: true, opacity: 0.25, side: THREE.FrontSide});

    // floor

    var floor = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height), floorMaterial);

    floor.rotation.x = -90 * Math.PI / 180;
    floor.position.z = (height / 2 + cornerWidth * 4) * dir.z;

    surroundingArea.add(floor);

    // Superior row
    var superiorRow = new THREE.Mesh(geo, material);
    superiorRow.position = direction.clone();
    superiorRow.rotation.z = Math.PI / 2;
    surroundingArea.add(superiorRow);

    // Text
    surroundingArea.removeLabelText = function() {
        if (this.labelText) {
            $(this.labelText).remove();
            this.labelText = undefined;
        }
    };

    var intersections;
    var projector = new THREE.Projector();
    var element = $('#renderer-wrapper')[0];
    var ray = new THREE.Vector2();

    surroundingArea.changeLabelText = function(text) {
        if (text) {
            this.removeLabelText();
            var position = DBZCCG.Screen.getWindowCoords(superiorRow);

            if (!isNaN(position.x)) {
                ray.x = ((position.x - element.offsetLeft) / element.offsetWidth) * 2 - 1;
                ray.y = -((position.y - element.offsetTop) / element.offsetHeight) * 2 + 1;

                var vector = new THREE.Vector3(ray.x, ray.y, 0.5);

                projector.unprojectVector(vector, DBZCCG.playerCamera);
                var raycaster = new THREE.Raycaster(DBZCCG.playerCamera.position, vector.sub(DBZCCG.playerCamera.position).normalize());
                intersections = raycaster.intersectObjects(DBZCCG.objects, true);
                if (!intersections[0]) {
                    this.labelText = DBZCCG.Combat.labelText(text, position, 0xFFFFFF, 800, position.y / window.screen.availHeight + 0.45);
                }
            }
        }
    };

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

    surroundingArea.getCenterCoords = function() {
        var ret;
        if (this.parent instanceof THREE.Object3D) {
            var vec = this.position.clone();
            ret = this.parent.localToWorld(vec);

            ret.add(superiorRow.position.clone().add(inferiorRow.position.clone()).multiplyScalar(0.5));
        }
        return ret;
    };

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

        var position = this.players[0].dirVector.clone();
        this.setCameraSideView = function() {
            DBZCCG.cameraStyle = DBZCCG.Table.Camera.Side;
            camera.position.z = position.z * DBZCCG.Table.basePlayerDistance * 70;
            camera.position.y = 40;
            camera.position.x = position.x;
            camera.lookAt(new THREE.Vector3(position.x, -5, -position.z));

            this.players[0].hand.rotation.x = camera.rotation.x;
            this.players[0].hand.position.y = (camera.position.y + 10) * 0.5;
            this.players[0].hand.position.z = (camera.position.z + position.z) * 0.78;
            this.players[0].hand.addCard([]);
        };

        this.setCameraTopView = function() {
            DBZCCG.cameraStyle = DBZCCG.Table.Camera.Top;
            camera.position.z = position.z * DBZCCG.Table.basePlayerDistance * 80;
            camera.position.y = 60;
            camera.position.x = position.x;
            camera.lookAt(new THREE.Vector3(position.x, -10, -position.z));

            this.players[0].hand.rotation.x = camera.rotation.x;
            this.players[0].hand.position.y = (camera.position.y + 10) * 0.5;
            this.players[0].hand.position.z = (camera.position.z + position.z) * 0.78;
            this.players[0].hand.addCard([]);
        };

        /* Adjust camera for P1 */

        DBZCCG.mainPlayer = this.players[0];
        this.players[0].loadPlayerSpace(scene);
        this.setCameraTopView();

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

        for (var i = 0; i < this.players.length; i++) {
            this.players[i].loadLabelText();
        }
        
        var table = this;
        this.updateLabelPlayers = function () {
            for (var i = 0; i < table.players.length; i++) {
                table.players[i].loadLabelText();
            }
        };
    }

    return new TableObject(extPlayers, camera, scene);
};