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
        DBZCCG.Album.pageModel.children[0].material.transparent = true;
        DBZCCG.Album.pageModel.children[0].material.opacity = 0.1;
    });

    // model locker
    var loader = new THREE.OBJLoader(manager);
    loader.load('model/album-locker.obj', function(object) {
        object.scale.z = 0.65;
        DBZCCG.Album.lockerModel = object;
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

DBZCCG.Album.create = function(scene, globalReflections) {
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

    var total = 14;

    var display = new THREE.Object3D();

    DBZCCG.loadCounter++;
    DBZCCG.loadCounter++;
    var middleTexture = THREE.ImageUtils.loadTexture('images/textures/album/saiyan/middle-texture.jpg', new THREE.UVMapping(),
            function() {
                DBZCCG.incrementLoad();
                console.log('Loaded mid album texture');
            }, function() {
        DBZCCG.Load.error = true;
        console.log('Error while loading mid album texture');
    });

    var innerTexture = THREE.ImageUtils.loadTexture('images/textures/album/saiyan/inner-texture.jpg',
            new THREE.UVMapping(),
            function() {
                DBZCCG.incrementLoad();
                console.log('Loaded inner album texture');
            }, function() {
        DBZCCG.Load.error = true;
        console.log('Error while loading inner album texture');
    });

    innerTexture.wrapS = innerTexture.wrapT = THREE.RepeatWrapping;
    innerTexture.repeat.set(8, 8);

    middleTexture.wrapS = middleTexture.wrapT = THREE.RepeatWrapping;
    middleTexture.repeat.set(1, 1);

    var materials = [];

    for (var i = 0; i < 4; i++) {
        materials.push(new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: middleTexture
        }));
    }

    // inner
    materials.push(new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        map: innerTexture
    }));

    DBZCCG.loadCounter++;

    // outer
    materials.push(new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        envMap: globalReflections,
        reflectivity: 0.3,
        map: THREE.ImageUtils.loadTexture('images/textures/album/saiyan/cover2.jpg', new THREE.UVMapping(),
                function() {
                    DBZCCG.incrementLoad();
                    console.log('Loaded back album cover texture');
                }, function() {
            DBZCCG.Load.error = true;
            console.log('Error while loading back album cover texture');
        })
    }));

    var backMaterial = new THREE.MeshFaceMaterial(materials);

    // cover parts
    this.backCover = new THREE.Mesh(
            new THREE.CubeGeometry(17, 18, 0.2),
            backMaterial);

    this.backCover.name = 'backCover';

    this.backCover.position.x = 11.5;

    var materials = [];

    for (var i = 0; i < 4; i++) {
        materials.push(new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: middleTexture
        }));
    }

    // inner
    materials.push(new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        map: innerTexture
    }));

    DBZCCG.loadCounter++;

    // outer
    materials.push(new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        envMap: globalReflections,
        reflectivity: 0.3,
        map: THREE.ImageUtils.loadTexture('images/textures/album/saiyan/cover1.jpg', new THREE.UVMapping(),
                function() {
                    DBZCCG.incrementLoad();
                    console.log('Loaded cover album texture');
                }, function() {
            DBZCCG.Load.error = true;
            console.log('Error while loading cover album texture');
        })
    }));

    var frontMaterial = new THREE.MeshFaceMaterial(materials);

    // cover parts
    this.frontCover = new THREE.Mesh(
            new THREE.CubeGeometry(17, 18, 0.2),
            frontMaterial);

    this.frontCover.name = 'frontCover';

    this.frontCover.position.x = -9.5;

    var midMaterial = new THREE.MeshBasicMaterial({
        map: middleTexture,
        envMap: globalReflections,
        reflectivity: 0.1
    });

    this.midCover = new THREE.Mesh(
            new THREE.CubeGeometry(4, 18, 0.2),
            midMaterial);

    this.midCover.name = 'midCover';

    this.frontCover.position.z = this.backCover.position.z = -0.3;

    this.pagesGroupDisplay = new THREE.Object3D();
    this.pagesGroupDisplay.name = 'pagesGroupDisplay';
    display.add(this.pagesGroupDisplay);

    var reflection = new THREE.CubeCamera(0.1, 1000, 24);
    scene.add(reflection);
    DBZCCG.Album.reflections.push({open: true, page: this.pagesGroupDisplay, reflection: reflection});

    this.lockers = new THREE.Object3D();

    this.lockers.position.z = -0.3;
    this.lockers.position.x = 1;
    this.lockers.name = 'lockers';

    // add lockers
    for (var i = 0; i < 3; i++) {
        var mesh = DBZCCG.Album.lockerModel.clone();
        this.lockers.add(mesh);
        mesh.position.x = 0.9;
        mesh.position.y = 6 - i * 6;
        mesh.position.z = 0.1;

        mesh.children[0].material = new THREE.MeshBasicMaterial(
                {
                    envMap: reflection.renderTarget,
                    color: 0x777777,
                    reflectivity: 1
                });
    }

    display.add(this.lockers);

    display.add(this.frontCover);
    this.lockers.add(this.midCover);
    display.add(this.backCover);

    DBZCCG.objects.push(this.frontCover);
    DBZCCG.objects.push(this.midCover);
    DBZCCG.objects.push(this.backCover);

    // add pages
    for (var i = total - 1; i >= 0; i--) {
        var mesh = DBZCCG.Album.pageModel.clone();
        mesh.position.x = 8.25;
        var page = new THREE.Object3D();
        page.add(mesh);
        page.position.z = (total - 1) * 0.075 + -i * 0.075;
        mesh.children[0].material = new THREE.MeshBasicMaterial(
                {
                    envMap: globalReflections,
                    transparent: true,
                    color: 0xAAAAAA,
                    opacity: 0.3,
                    reflectivity: 0.2
                });

        this.pagesGroupDisplay.add(page);
        pages.splice(0, 0, page);

        // fill the page
        for (var j = cardData.length - 1; j >= 0 && cardData[j].idx >= i * 18; j--) {
            var data = cardData.pop();
            var reverse = false;
            if ((data.idx % 18) / 9 >= 1) {
                reverse = true;
            }

            var card = DBZCCG.Card.createCard(DBZCCG[data.content.saga][data.content.number]);
            card.display.scale.z = DBZCCG.Card.cardThicknessScale;

//            for (var p = 0; p < card.display.children[0].material.materials.length; p++) {
//                card.display.children[0].material.materials[p].transparent = false;
//            }

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
    }

    scene.add(display);

    var leftSide = 0;
    var rightSide = pages.length - 1;
    var frontCoverClosed = false;
    var backCoverClosed = false;

    var closeFrontPosition = {
        "frontCover": {
            position: new THREE.Vector3(2.5, 0, 3.8),
            rotation: new THREE.Euler(0, Math.PI, 0)
        },
        "lockers": {
            position: new THREE.Vector3(3, 0, 1.75),
            rotation: new THREE.Euler(0, Math.PI / 2, 0)
        },
        "pagesGroupDisplay": {
            position: new THREE.Vector3(4, 0, 1.2),
            rotation: new THREE.Euler(0, 0, 0)
        },
        "backCover": {
            position: new THREE.Vector3(11.5, 0, -0.3),
            rotation: new THREE.Euler(0, 0, 0)
        },
        "original": {
            "frontCover": {
                rotation: new THREE.Euler(0, Math.PI, 0),
                position: new THREE.Vector3(11.5, 0, 3.8)
            }
        }
    };

    var closeBackPosition = {
        "frontCover": {
            position: new THREE.Vector3(-9.5, 0, -0.3),
            rotation: new THREE.Euler(0, 0, 0)
        },
        "lockers": {
            position: new THREE.Vector3(-1, 0, 1.75),
            rotation: new THREE.Euler(0, -Math.PI / 2, 0)
        },
        "pagesGroupDisplay": {
            position: new THREE.Vector3(-3.5, 0, 1.2),
            rotation: new THREE.Euler(0, 0, 0)
        },
        "backCover": {
            position: new THREE.Vector3(1.5, 0, 3.8),
            rotation: new THREE.Euler(0, -Math.PI, 0)
        },
        "original": {
            "backCover": {
                rotation: new THREE.Euler(0, -Math.PI, 0),
                position: new THREE.Vector3(-9.5, 0, 3.8)
            }
        }
    };

    var openPosition = {
        "frontCover": {
            position: new THREE.Vector3(-1, 0, -0.3),
            rotation: new THREE.Euler(0, -Math.PI, 0)
        },
        "lockers": {
            position: new THREE.Vector3(1, 0, -0.3),
            rotation: new THREE.Euler(0, 0, 0)
        },
        "pagesGroupDisplay": {
            position: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0)
        },
        "backCover": {
            position: new THREE.Vector3(0.5, 0, -0.3),
            rotation: new THREE.Euler(0, Math.PI, 0)
        },
        "original": {
            "lockers": {
                rotation: new THREE.Euler(0, 0, 0),
                position: new THREE.Vector3(1, 0, -0.3)
            },
            "frontCover": {
                rotation: new THREE.Euler(0, 0, 0),
                position: new THREE.Vector3(-9.5, 0, -0.3)
            },
            "backCover": {
                rotation: new THREE.Euler(0, 0, 0),
                position: new THREE.Vector3(11.5, 0, -0.3)
            }
        }
    };

    var rotationFix = function(vec) {
        var v = vec || this;
        v.order = "XYZ";
    };

    function createRotationOffset(offset, element, sourceRef) {
        var o = new THREE.Object3D();
        scene.add(o);

        element.originalParent = element.parent;

        o.resetToOriginal = function() {
            var elem = this.children[0];

            if (elem && elem.originalParent) {
                elem.originalParent.add(elem);

                elem.rotation.copy(sourceRef.original[elem.name].rotation);
                elem.position.copy(sourceRef.original[elem.name].position);

                album[elem.name] = elem;
            }

            delete this;
        };

        o.position = element.position.clone();
        o.position.add(offset.clone().multiplyScalar(-0.5));
        element.position.copy(offset.clone().multiplyScalar(0.5));
        o.add(element);
        return o;
    }

    this.openBackAlbum = function() {
        if (currentPage === pages.length) {
            DBZCCG.performingAnimation = true;
            backCoverClosed = false;

            var timer = 300;
            var animation = [];
            var animationCounter = 0;
            var animationLength = 0;

            var completeFunc = function() {
                if (this.parent && this.parent.resetToOriginal instanceof Function) {
                    this.parent.resetToOriginal();
                }

                if (++animationCounter === animationLength) {
                    DBZCCG.performingAnimation = false;
                }
            };

            this.backCover = createRotationOffset(new THREE.Vector3(-22, 0, 0), this.backCover, openPosition);

            var values = {
                'lockers': {rotation: true, position: true},
                'pagesGroupDisplay': {rotation: true, position: true},
                'backCover': {rotation: true, position: true}
            };

            for (var key in values) {
                if (values[key].rotation) {
                    var aniRot = new TWEEN.Tween(this[key].rotation).to(openPosition[key].rotation, timer);
                    this[key].rotation.parent = this[key];
                    aniRot.onUpdate(function() {
                        rotationFix(this);
                    });
                    aniRot.onComplete(completeFunc);
                    animation.push(aniRot);
                }

                if (values[key].position) {
                    var aniPos = new TWEEN.Tween(this[key].position).to(openPosition[key].position.clone(), timer);
                    aniPos.onComplete(completeFunc);
                    this[key].position.parent = this[key];
                    animation.push(aniPos);
                }
            }

            animationLength = animation.length;

            for (var i = 0; i < animation.length; i++) {
                animation[i].start();
            }
        }
    };

    this.openFrontAlbum = function() {
        if (currentPage === 0) {
            DBZCCG.performingAnimation = true;
            frontCoverClosed = false;

            var timer = 300;
            var animation = [];
            var animationCounter = 0;
            var animationLength = 0;

            var completeFunc = function() {
                if (this.parent && this.parent.resetToOriginal instanceof Function) {
                    this.parent.resetToOriginal();
                }

                if (++animationCounter === animationLength) {
                    DBZCCG.performingAnimation = false;
                }
            };

            this.frontCover = createRotationOffset(new THREE.Vector3(17, 0, 0), this.frontCover, openPosition);

            var values = {
                'frontCover': {rotation: true, position: true},
                'lockers': {rotation: true, position: true},
                'pagesGroupDisplay': {rotation: true, position: true}
            };

            for (var key in values) {
                if (values[key].rotation) {
                    var aniRot = new TWEEN.Tween(this[key].rotation).to(openPosition[key].rotation, timer);
                    this[key].rotation.parent = this[key];
                    aniRot.onUpdate(function() {
                        rotationFix(this);
                    });
                    aniRot.onComplete(completeFunc);
                    animation.push(aniRot);
                }

                if (values[key].position) {
                    var aniPos = new TWEEN.Tween(this[key].position).to(openPosition[key].position.clone(), timer);
                    aniPos.onComplete(completeFunc);
                    this[key].position.parent = this[key];
                    animation.push(aniPos);
                }
            }

            animationLength = animation.length;

            for (var i = 0; i < animation.length; i++) {
                animation[i].start();
            }
        }
    };

    this.closeBackAlbum = function() {
        if (currentPage === pages.length) {
            DBZCCG.performingAnimation = true;
            backCoverClosed = true;

            var timer = 300;
            var animation = [];
            var animationCounter = 0;
            var animationLength = 0;

            var completeFunc = function() {
                if (this.parent && this.parent.resetToOriginal instanceof Function) {
                    this.parent.resetToOriginal();
                }

                if (++animationCounter === animationLength) {
                    DBZCCG.performingAnimation = false;
                }
            };

            this.backCover = createRotationOffset(new THREE.Vector3(22, 0, 0), this.backCover, closeBackPosition);

            var values = {
                'lockers': {rotation: true, position: true},
                'pagesGroupDisplay': {rotation: true, position: true},
                'backCover': {rotation: true, position: true}
            };

            for (var key in values) {
                if (values[key].rotation) {
                    var aniRot = new TWEEN.Tween(this[key].rotation).to(closeBackPosition[key].rotation, timer);
                    this[key].rotation.parent = this[key];
                    aniRot.onUpdate(function() {
                        rotationFix(this);
                    });
                    aniRot.onComplete(completeFunc);
                    animation.push(aniRot);
                }

                if (values[key].position) {
                    var aniPos = new TWEEN.Tween(this[key].position).to(closeBackPosition[key].position.clone(), timer);
                    aniPos.onComplete(completeFunc);
                    this[key].position.parent = this[key];
                    animation.push(aniPos);
                }
            }

            animationLength = animation.length;

            for (var i = 0; i < animation.length; i++) {
                animation[i].start();
            }
        }
    };

    this.closeFrontAlbum = function() {
        if (currentPage === 0) {
            DBZCCG.performingAnimation = true;
            frontCoverClosed = true;

            var timer = 300;
            var animation = [];
            var animationCounter = 0;
            var animationLength = 0;

            var completeFunc = function() {
                if (this.parent && this.parent.resetToOriginal instanceof Function) {
                    this.parent.resetToOriginal();
                }

                if (++animationCounter === animationLength) {
                    DBZCCG.performingAnimation = false;
                }
            };

            this.frontCover = createRotationOffset(new THREE.Vector3(-17, 0, 0), this.frontCover, closeFrontPosition);

            var values = {
                'frontCover': {rotation: true, position: true},
                'lockers': {rotation: true, position: true},
                'pagesGroupDisplay': {rotation: true, position: true},
                'backCover': {rotation: true, position: true}
            };

            for (var key in values) {
                if (values[key].rotation) {
                    var aniRot = new TWEEN.Tween(this[key].rotation).to(closeFrontPosition[key].rotation, timer);
                    this[key].rotation.parent = this[key];
                    aniRot.onUpdate(function() {
                        rotationFix(this);
                    });
                    aniRot.onComplete(completeFunc);
                    animation.push(aniRot);
                }

                if (values[key].position) {
                    var aniPos = new TWEEN.Tween(this[key].position).to(closeFrontPosition[key].position.clone(), timer);
                    aniPos.onComplete(completeFunc);
                    this[key].position.parent = this[key];
                    animation.push(aniPos);
                }
            }

            animationLength = animation.length;

            for (var i = 0; i < animation.length; i++) {
                animation[i].start();
            }
        }
    };

    var album = this;
    return {
        adjust: function() {
            //album.adjustMid();
        },
        nextPage: function() {
            if (currentPage !== pages.length && !frontCoverClosed) {
                DBZCCG.performingAnimation = true;
                var timer = 600;
                var rotation = pages[currentPage].rotation.clone();
                rotation.y = -Math.PI;
                var position = pages[currentPage].position.clone();
                position.x = 1.5;
                position.z = leftSide * 0.1;

                var animationCounter = 0;
                var animationLength = 2;

                var completeFunc = function() {
                    if (++animationCounter === animationLength) {
                        DBZCCG.performingAnimation = false;
                        leftSide++;
                        rightSide--;
                        currentPage++;
                    }
                };

                var rotAni = new TWEEN.Tween(pages[currentPage].rotation).to(
                        rotation, timer);
                var rotPos = new TWEEN.Tween(pages[currentPage].position).to(
                        position, timer);

                rotAni.easing(TWEEN.Easing.SinusoidalIn);
                rotPos.easing(TWEEN.Easing.CircularIn);

                rotAni.onUpdate(function() {
                    rotationFix(this);
                });

                rotAni.onComplete(completeFunc);
                rotPos.onComplete(completeFunc);

                rotAni.start();
                rotPos.start();
            } else if (frontCoverClosed) {
                album.openFrontAlbum();
            } else if (!backCoverClosed) {
                album.closeBackAlbum();
            }
        },
        previousPage: function() {
            if (currentPage !== 0 && !backCoverClosed) {
                DBZCCG.performingAnimation = true;
                var timer = 600;
                var rotation = pages[currentPage - 1].rotation.clone();
                rotation.y = 0;
                var position = pages[currentPage - 1].position.clone();
                position.x = 0;
                position.z = rightSide * 0.1;

                var animationCounter = 0;
                var animationLength = 2;

                var completeFunc = function() {
                    if (++animationCounter === animationLength) {
                        DBZCCG.performingAnimation = false;
                        leftSide--;
                        rightSide++;
                        currentPage--;
                    }
                };

                var rotAni = new TWEEN.Tween(pages[currentPage - 1].rotation).to(
                        rotation, timer);
                var rotPos = new TWEEN.Tween(pages[currentPage - 1].position).to(
                        position, timer);

                rotAni.easing(TWEEN.Easing.SinusoidalIn);
                rotPos.easing(TWEEN.Easing.CircularIn);

                rotAni.onUpdate(function() {
                    rotationFix(this);
                });

                rotAni.onComplete(completeFunc);
                rotPos.onComplete(completeFunc);

                rotAni.start();
                rotPos.start();

            } else if (backCoverClosed) {
                album.openBackAlbum();
            } else if (!frontCoverClosed) {
                album.closeFrontAlbum();
            }
        },
        checkCurrentPage: function(display) {
            var ret = false;

            // leftPage
            if (currentPage > 0) {
                for (var i = 0; i < pages[currentPage - 1].children[0].children.length && !ret; i++) {
                    if (display === pages[currentPage - 1].children[0].children[i]) {
                        ret = true;
                    }
                }
            }

            // rightPage
            if (currentPage !== pages.length) {
                for (var i = 0; i < pages[currentPage].children[0].children.length && !ret; i++) {
                    if (display === pages[currentPage].children[0].children[i]) {
                        ret = true;
                    }
                }
            }

            return ret;
        }
    };

};

DBZCCG.checkAlbumLoad = function() {
    return DBZCCG.Load.mustHave() && DBZCCG.Album.pageModel && DBZCCG.Album.lockerModel;
};

DBZCCG.album = function() {
    /* Three related */
    var mouse = new THREE.Vector2();
    var intersected;

    /* Game related */
    var album;

    /* Interface related */
    DBZCCG.qtipElement = $('body');
    DBZCCG.Interface.startQtip();

    function buildScene(scene, camera) {
        /* Load variables */

        DBZCCG.Album.bg = ThreeHelper.createSkybox(scene, 'purplenebula', function(textureCube) {
            console.log('Skybox loaded');
            DBZCCG.loadCounter = 0;
            DBZCCG.loadIcr = 0;
            DBZCCG.mainScene = scene;
            camera.position.set(0, 0, 50);
            album = DBZCCG.Album.create(scene, textureCube);
            console.log('Album loaded');
            DBZCCG.finishedLoading = true;
        });
    }

    function render(cameraControl, renderer, scene, camera, stats) {
        cameraControl.update(DBZCCG.clock.getDelta());

        TWEEN.update();

        DBZCCG.Album.updateReflections(renderer, scene);

        renderer.render(scene, camera);
    }

    function controls(camera, renderer, scene, stats) {
        var control = new THREE.OrbitControls(camera);
        var element;
        var display = element = document.getElementById('renderer-wrapper');
        var faceIndex;

        renderer.setClearColor(0xFFFFFF);

        var projector = new THREE.Projector();

        DBZCCG.previousPage = function() {
            if (album && !DBZCCG.performingAnimation) {
                album.previousPage();
            }
        };

        DBZCCG.nextPage = function() {
            if (album && !DBZCCG.performingAnimation) {
                album.nextPage();
            }
        };

        Mousetrap.bind('z', function() {
            DBZCCG.previousPage();
        });

        Mousetrap.bind('x', function() {
            DBZCCG.nextPage();
        });

        // MOUSE
        function onDocumentMouseMove(event) {

            if (DBZCCG.waitingMainPlayerMouseCommand) {
                mouse.x = ((event.clientX - element.offsetLeft) / element.offsetWidth) * 2 - 1;
                mouse.y = -((event.clientY - element.offsetTop) / element.offsetHeight) * 2 + 1;

                var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
                projector.unprojectVector(vector, camera);
                var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
                var intersections = raycaster.intersectObjects(DBZCCG.objects, true);

                var intersectionIndex = DBZCCG.Screen.invalidIntersection(intersections);

                if (intersections.length > 0 && intersectionIndex !== -1) {
                    if (intersected !== intersections[ intersectionIndex ].object) {
                        if (intersected) {
                            var parent = DBZCCG.Screen.findCallbackObject(intersected, "mouseOut");
                            if (parent.mouseOut instanceof Function) {
                                parent.mouseOut(event);
                            }
                        }
                        if ($('.ui-dialog:visible').length === 0) {
                            intersected = intersections[ intersectionIndex ].object;
                            faceIndex = intersections[ intersectionIndex ].faceIndex;
                        }
                    }

                    if ($('.ui-dialog:visible').length === 0
                            && (faceIndex === 10 || faceIndex === 11)
                            && album.checkCurrentPage(intersected.parent)) {
                        var parent = DBZCCG.Screen.findCallbackObject(intersected, "mouseOver");

                        if (parent.mouseOver instanceof Function) {
                            parent.mouseOver(event);
                        }
                    }
                }
                else if (intersected) {
                    // check if it is in the scene
                    if (intersected.parent.parent) {
                        var parent = DBZCCG.Screen.findCallbackObject(intersected, "mouseOut");

                        if (parent.mouseOut instanceof Function) {
                            parent.mouseOut(event);
                        }
                    }
                    intersected = null;
                }
            } else if (intersected) {
                // check if it is in the scene
                if (intersected.parent.parent) {
                    var parent = DBZCCG.Screen.findCallbackObject(intersected, "mouseOut");
                    if (parent.mouseOut instanceof Function) {
                        parent.mouseOut(event);
                    }
                }
                intersected = null;
            }
        }

        display.addEventListener('mousemove', onDocumentMouseMove, false);

        InterfaceDBZ.onGameResize = function() {
            // RESIZE Main Screen
            var WIDTH = window.innerWidth,
                    HEIGHT = window.innerHeight;
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();

            renderer.setSize(WIDTH, HEIGHT);
            document.getElementById('renderer-wrapper').style.width = WIDTH + 'px';
            document.getElementById('renderer-wrapper').style.height = HEIGHT + 'px';
        };

        console.log('Controls loaded');
        return control;
    }

    function loadUI() {
        $('.album-btn').button();
        $('#next-page-button').click(DBZCCG.nextPage);
        $('#previous-page-button').click(DBZCCG.previousPage);
        $('.album-btn').show();
    }

    DBZCCG.loadFunction(DBZCCG.checkAlbumLoad, buildScene, render, controls, loadUI, function() {
    });
};