DBZCCG.Album = {};
DBZCCG.Album.reflections = [];

(function() {
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };

    // model page
    var loader = new THREE.OBJLoader(manager);
    loader.load('model/album-page.obj', function(object) {
        object.children[0].scale.multiplyScalar(2.0);
        object.children[0].scale.y = 0.5;
        object.children[0].scale.x = 2.125;
        object.children[0].rotation.y = 0;
        object.children[0].rotation.x = Math.PI / 2;
        DBZCCG.Album.pageModel = object;
//        DBZCCG.Album.pageModel.children[0].material.emissive.setRGB(1, 1, 1);
        DBZCCG.Album.pageModel.children[0].material.transparent = true;
        DBZCCG.Album.pageModel.children[0].material.opacity = 0.1;
    });

    // model locker
    var loader = new THREE.OBJLoader(manager);
    loader.load('model/album-locker.obj', function(object) {
        object.scale.z = 1.5;
        DBZCCG.Album.lockerModel = object;
//        DBZCCG.Album.lockerModel.children[0].material.emissive.setRGB(1, 1, 1);
        DBZCCG.Album.lockerModel.children[0].material.metal = true;
    });

}());

DBZCCG.Album.updateReflections = function(renderer, scene) {
    var reflections = DBZCCG.Album.reflections;
    for (var i = 0; i < reflections.length; i++) {
        if (reflections[i].open) {
            reflections[i].page.visible = false;
            reflections[i].reflection.updateCubeMap(renderer, scene);
            reflections[i].page.visible = true;
        }
    }

};

DBZCCG.Album.getCoordsSlot = function(idx, back) {

};

DBZCCG.Album.create = function(scene) {
    var saga = 'Saiyan';
    var cardData = [];
    var currentPage = 0;
    var pages = [];

    var allowedCards = [];

    for (var i in DBZCCG[saga]) {
        if (!isNaN(parseInt(i))) {
            allowedCards.push(i);
        }
    }

    allowedCards.sort(function(a, b) {
        if (parseInt(a) > parseInt(b))
            return 1;
        if (parseInt(b) > parseInt(a))
            return -1;
        return 0;
    });

    for (var i = 0; i < allowedCards.length; i++) {
        cardData.push({
            idx: parseInt(allowedCards[i]) - 1,
            content: {
                saga: saga,
                number: allowedCards[i]
            }
        });
    }

    var total = cardData.length % 18;

    var display = new THREE.Object3D();

    // cover parts
    var backCover = new THREE.Mesh(
            new THREE.CubeGeometry(14, 18, 0.2),
            new THREE.MeshBasicMaterial({
        color: 0x777777
    }));

    backCover.position.x = 10;
    
    var midCover = new THREE.Mesh(
            new THREE.CubeGeometry(4, 18, 0.2),
            new THREE.MeshBasicMaterial({
        color: 0xFF0000
    }));

    midCover.position.x = 1;

    // cover parts
    var frontCover = new THREE.Mesh(
            new THREE.CubeGeometry(14, 18, 0.2),
            new THREE.MeshBasicMaterial({
        color: 0x777777
    }));

    frontCover.position.x = -8;

    frontCover.position.z = backCover.position.z = midCover.position.z = -0.3;

    display.add(frontCover);
    display.add(midCover);
    display.add(backCover);

    // add lockers
    for (var i = 0; i < 3; i++) {
        var mesh = DBZCCG.Album.lockerModel.clone();
        midCover.add(mesh);
        mesh.position.x = 0.9;
        mesh.position.y = 6 - i * 6;
        mesh.position.z = 0.2;

        var reflection = new THREE.CubeCamera(0.1, 1000, 24);
        scene.add(reflection);

        DBZCCG.Album.reflections.push({open: false, page: mesh, reflection: reflection});

        mesh.children[0].material = new THREE.MeshBasicMaterial(
                {
                    envMap: reflection.renderTarget,
                    color: 0x777777,
                    reflectivity: 1
                });
    }

    // add pages
    for (var i = total - 1; i >= 0; i--) {
        var mesh = DBZCCG.Album.pageModel.clone();
        var reflection = new THREE.CubeCamera(0.1, 1000, 24);
        scene.add(reflection);
        mesh.position.x = 8.25;
        var page = new THREE.Object3D();
        page.add(mesh);
        page.position.z = (total - 1) * 0.1 + -i * 0.1;
        reflection.position = page.position;
        mesh.children[0].material = new THREE.MeshBasicMaterial(
                {
                    envMap: reflection.renderTarget,
                    transparent: true,
                    color: 0x333333,
                    opacity: 0.1,
                    reflectivity: 0.1
                });

        DBZCCG.Album.reflections.push({open: false, page: mesh, reflection: reflection});
        display.add(page);
        pages.splice(0, 0, page);

        // fill the page
        for (var j = cardData.length - 1; j >= 0 && cardData[j].idx >= i * 17; j--) {
            var data = cardData.pop();
            var reverse = false;
            if ((data.idx % 18) / 9 >= 1) {
                reverse = true;
            }

            var card = DBZCCG.Card.createCard(DBZCCG[data.content.saga][data.content.number]);
            card.display.scale.z = DBZCCG.Card.cardThicknessScale;
            DBZCCG.mainScene.add(card.display);
            var individualIdx = Math.floor(data.idx / 3);
            card.display.position.x = -3.5 + (reverse ? 2 - (data.idx % 3) : (data.idx % 3)) * 4.25;
            card.display.position.y = 5.75 - (individualIdx % 3) * 5.75;

            if (reverse) {
                card.display.position.z = -0.005;
            } else {
                card.display.position.z = 0.005;
                card.display.rotation.y = Math.PI;
            }

            mesh.add(card.display);
            DBZCCG.objects.push(card.display);
        }
        scene.add(display);
    }

    var leftSide = 0;
    var rightSide = pages.length - 1;

    return {
        nextPage: function() {
            if (currentPage !== pages.length) {
                pages[currentPage].rotation.y = Math.PI;
                pages[currentPage].position.x = 1.5;
                pages[currentPage].position.z = leftSide * 0.1;
                leftSide++;
                rightSide--;
                currentPage++;
            }
        },
        previousPage: function() {
            if (currentPage !== 0) {
                pages[currentPage - 1].rotation.y = 0;
                pages[currentPage - 1].position.x = 0;
                pages[currentPage - 1].position.z = rightSide * 0.1;
                leftSide--;
                rightSide++;
                currentPage--;
            }
        },
        checkCurrentPage: function (display) {
            var ret = false;
            
            // leftPage
            if(currentPage > 0) {
                for(var i = 0; i < pages[currentPage - 1].children[0].children.length && !ret; i++) {
                    if(display === pages[currentPage - 1].children[0].children[i]) {
                        ret = true;
                    }
                }
            }
            
            // rightPage
            if(currentPage !== pages.length) {
                for(var i = 0; i < pages[currentPage].children[0].children.length && !ret; i++) {
                    if(display === pages[currentPage].children[0].children[i]) {
                        ret = true;
                    }
                }
            }
            
            return ret;
        }
    };

};