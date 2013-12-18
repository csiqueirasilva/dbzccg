// http://github.com/csiqueirasilva/dbzccg.js
DBZCCG = {};

DBZCCG.performingAnimation = false;
DBZCCG.performingAction = null;
DBZCCG.mainPlayer = null;
DBZCCG.finishedLoading = false;
DBZCCG.currentTip = null;
DBZCCG.objects = [];

DBZCCG.quickMessage = function(msg) {
    if (DBZCCG.finishedLoading) {
        if (DBZCCG.performingAction != null) {
            if (DBZCCG.performingAction == DBZCCG.mainPlayer) {
                alertify.custom = alertify.extend("player");
            } else {
                alertify.custom = alertify.extend("enemy");
            }
            alertify.custom(msg);
        } else {
            alertify.log(msg);
        }
    }
};

DBZCCG.create = function() {

    /* Three related */
    var clock = new THREE.Clock();
    var mouse = new THREE.Vector2();
    var projector;
    var intersected;

    /* Game related */
    var table = null;
    var listActions = [];

    function createSkybox(scene) {
        var urlPrefix = "images/bg/skybox_carro/";
        var urls = [urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
            urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
            urlPrefix + "posz.jpg", urlPrefix + "negz.jpg"];
        var textureCube = THREE.ImageUtils.loadTextureCube(urls);

        urlPrefix = "images/bg/skybox_carro/";
        urls = [urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
            urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
            urlPrefix + "posz.jpg", urlPrefix + "negz.jpg"];
        var textureCube2 = THREE.ImageUtils.loadTextureCube(urls);

        var shader = THREE.ShaderLib.cube;
        var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
        uniforms['tCube'].value = textureCube;
        //uniforms['tCube2'] = {type: 't', value: textureCube2};

        var material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader, //document.getElementById('skybox_fragment_shader').textContent,
            vertexShader: document.getElementById('skybox_vertex_shader').textContent,
            uniforms: uniforms,
            side: THREE.BackSide
        });

        var skybox = new THREE.Mesh(
                new THREE.CubeGeometry(4000, 4000, 4000),
                material);

        scene.add(skybox);
    }

    function buildScene(scene) {
        var light = new THREE.PointLight(0xF0F0F0); // soft white light
        light.position.set(0, 100, 0);
        scene.add(light);
        createSkybox(scene);
        table = Table.create([
            /*P1*/
            {mainPersonality: {currentMainPersonalityLevel: 1, currentPowerStageAboveZero: 6, currentAngerLevel: 1,
                    angerLevelNeededToLevel: 5, personalities: [{level: 1, name: "GOKU", highTech: false, number: 158, texturePath: "images/DBZCCG/saiyan/158.jpg",
                            personality: Personality.GOKU, saga: Card.Saga.Saiyan, powerStages: [0, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400]},
                        {level: 2, name: "GOKU", highTech: false, number: 159, texturePath: "images/DBZCCG/saiyan/159.jpg",
                            personality: Personality.GOKU, saga: Card.Saga.Saiyan, powerStages: [0, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400]},
                        {level: 3, name: "GOKU", highTech: false, number: 160, texturePath: "images/DBZCCG/saiyan/160.jpg",
                            personality: Personality.GOKU, saga: Card.Saga.Saiyan, powerStages: [0, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500]}]}},
            /*P2*/
            {mainPersonality: {currentMainPersonalityLevel: 1, currentPowerStageAboveZero: 2, currentAngerLevel: 1,
                    angerLevelNeededToLevel: 5, personalities: [{level: 1, name: "VEGETA", highTech: false, number: 173, texturePath: "images/DBZCCG/saiyan/173.jpg",
                            personality: Personality.VEGETA, saga: Card.Saga.Saiyan, powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]},
                        {level: 2, name: "VEGETA", highTech: false, number: 174, texturePath: "images/DBZCCG/saiyan/174.jpg",
                            personality: Personality.VEGETA, saga: Card.Saga.Saiyan, powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]},
                        {level: 3, name: "VEGETA", highTech: false, number: 175, texturePath: "images/DBZCCG/saiyan/175.jpg",
                            personality: Personality.VEGETA, saga: Card.Saga.Saiyan, powerStages: [0, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000]}]}}
        ]);

        DBZCCG.mainPlayer = table.players[0];

        for (var i = 0; i < table.players.length; i++) {
            var player = table.players[i];
            player.loadPlayerSpace(scene);
            DBZCCG.quickMessage("Player " + (i + 1) + " loaded.");
        }

        DBZCCG.finishedLoading = true;

        function checkLoad() {
            if (table.players[0].mainPersonality.personalities[0].zScouter == undefined) {
                window.setTimeout(checkLoad, 500);
            } else /*Begin code after everything was loaded */ {

                listActions.push(function() {
                    DBZCCG.performingAction = table.players[0];
                    table.players[0].mainPersonality.advanceLevels(2);
                });

                listActions.push(function() {
                    DBZCCG.performingAction = table.players[1];
                    table.players[1].mainPersonality.advanceLevels(8);
                });

                listActions.push(function() {
                    DBZCCG.performingAction = table.players[0];
                    table.players[0].mainPersonality.moveZScouter(0);
                });

                listActions.push(function() {
                    DBZCCG.performingAction = table.players[0];
                    table.players[0].mainPersonality.moveZScouter(5);
                });

                listActions.push(function() {
                    DBZCCG.performingAction = table.players[0];
                    table.players[0].mainPersonality.moveZScouter(12);
                });

                listActions.push(function() {
                    DBZCCG.performingAction = table.players[0];
                    table.players[0].mainPersonality.moveZScouter(1);
                });

                listActions.push(function() {
                    DBZCCG.performingAction = table.players[0];
                    table.players[0].mainPersonality.changeAnger(1);
                });
                listActions.push(function() {
                    DBZCCG.performingAction = table.players[0];
                    table.players[0].mainPersonality.changeAnger(-1);
                });

                listActions.push(function() {
                    DBZCCG.performingAction = table.players[0];
                    table.players[0].mainPersonality.changeAnger(2);
                });

                listActions.push(function() {
                    DBZCCG.performingAction = table.players[0];
                    table.players[0].mainPersonality.changeAnger(5);
                });

                listActions.push(function() {
                    DBZCCG.performingAction = table.players[0];
                    table.players[0].mainPersonality.changeAnger(-3);
                });
                
                listActions.push(function() {
                    DBZCCG.performingAction = table.players[1];
                    table.players[1].mainPersonality.changeAnger(-3);
                });

                listActions.push(function() {
                    DBZCCG.performingAction = table.players[1];
                    table.players[1].mainPersonality.changeAnger(-3);
                });
                
                listActions.push(function() {
                    DBZCCG.performingAction = table.players[1];
                    table.players[1].mainPersonality.changeAnger(5);
                });

            }
        }

        window.setTimeout(checkLoad, 500);

        function checkAction() {
            if (DBZCCG.performingAnimation == false && listActions.length > 0 && $(".alertify-log").length == 0) {
                listActions.shift()();
            }
        }

        window.setInterval(checkAction, 150);

        // debug
        scene.add(MathHelper.buildAxes(1000));

        /*
         function formatnumber(n) {
         if (n < 10)
         return "00" + n;
         else if (n < 100)
         return "0" + n;
         else
         return n.toString();
         }
         
         // discard 1
         for (var i = 1; i <= 10; i++) {
         var addcard = card.clone();
         addcard.rotation.x += -90 * Math.PI / 180;
         addcard.rotation.y += -180 * Math.PI / 180;
         addcard.position.y = cornerWidth * cardThicknessScale * i * 2;
         addcard.position.x -= cardWidth + 1;
         scene.add(addcard);
         }
         
         card = Card.create("images/DBZCCG/saiyan/002.jpg");
         
         // deck 2
         for (var i = 1; i <= 30; i++) {
         var addcard = card.clone();
         addcard.rotation.x += -90 * Math.PI / 180;
         addcard.rotation.z += 180 * Math.PI / 180;
         addcard.rotation.y += -180 * Math.PI / 180;
         addcard.position.y = cornerWidth * cardThicknessScale * i * 2;
         addcard.position.x -= 29 - (cardWidth + 1);
         addcard.position.z -= 20;
         scene.add(addcard);
         }
         
         // discard 2
         for (var i = 80; i <= 120; i++) {
         var addcard = card.clone();
         addcard.rotation.x += -90 * Math.PI / 180;
         addcard.rotation.z += 180 * Math.PI / 180;
         addcard.position.y = cornerWidth * cardThicknessScale * (i - 79) * 2;
         addcard.position.x -= 29;
         addcard.position.z -= 20;
         scene.add(addcard);
         }
         
         // MP1
         goku1 = Card.create("images/DBZCCG/saiyan/158.jpg");
         goku2 = Card.create("images/DBZCCG/saiyan/159.jpg");
         goku3 = Card.create("images/DBZCCG/saiyan/160.jpg");
         
         goku1.rotation.x += -90 * Math.PI / 180;
         goku1.rotation.y += -180 * Math.PI / 180;
         goku1.position.z -= 5 + personalityNameDiff;
         goku1.position.y = cornerWidth * cardThicknessScale * 1 * 2;
         goku1.position.x -= 14.5;
         
         goku2.rotation.x += -90 * Math.PI / 180;
         goku2.rotation.y += -180 * Math.PI / 180;
         goku2.position.z -= 5 + 2 * personalityNameDiff;
         goku2.position.y = cornerWidth * cardThicknessScale * 0 * 2;
         goku2.position.x -= 14.5;
         
         goku3.rotation.x += -90 * Math.PI / 180;
         goku3.rotation.y += -180 * Math.PI / 180;
         goku3.position.z -= 5;
         goku3.position.y = cornerWidth * cardThicknessScale * 3 * 2;
         goku3.position.x -= 14.5;
         
         // MP2
         vegeta1 = Card.create("images/DBZCCG/saiyan/173.jpg");
         vegeta2 = Card.create("images/DBZCCG/saiyan/174.jpg");
         vegeta3 = Card.create("images/DBZCCG/saiyan/175.jpg");
         
         vegeta1.rotation.x += -90 * Math.PI / 180;
         vegeta1.rotation.y += -180 * Math.PI / 180;
         vegeta1.rotation.z += -180 * Math.PI / 180;
         vegeta1.position.z -= 15 - personalityNameDiff;
         vegeta1.position.y = cornerWidth * cardThicknessScale * 1 * 2;
         vegeta1.position.x -= 14.5;
         
         vegeta2.rotation.z += -180 * Math.PI / 180;
         vegeta2.rotation.x += -90 * Math.PI / 180;
         vegeta2.rotation.y += -180 * Math.PI / 180;
         vegeta2.position.z -= 15 - 2 * personalityNameDiff;
         vegeta2.position.y = cornerWidth * cardThicknessScale * 0 * 2;
         vegeta2.position.x -= 14.5;
         
         vegeta3.rotation.z += -180 * Math.PI / 180;
         vegeta3.rotation.x += -90 * Math.PI / 180;
         vegeta3.rotation.y += -180 * Math.PI / 180;
         vegeta3.position.z -= 15;
         vegeta3.position.y = cornerWidth * cardThicknessScale * 3 * 2;
         vegeta3.position.x -= 14.5;
         
         var mp1 = new THREE.Object3D();
         mp1.add(goku1);
         mp1.add(goku2);
         mp1.add(goku3);
         scene.add(mp1);
         
         var mp2 = new THREE.Object3D();
         mp2.add(vegeta1);
         mp2.add(vegeta2);
         mp2.add(vegeta3);
         scene.add(mp2);
         
         objects.push(mp1);
         objects.push(mp2);
         
         // Removed from the game
         card = Card.create("images/DBZCCG/saiyan/250.jpg");
         card.rotation.x += 90 * Math.PI / 180;
         card.rotation.z += 90 * Math.PI / 180;
         card.position.x -= 0.75;
         card.position.z -= 5.5;
         scene.add(card);
         
         card = Card.create("images/DBZCCG/saiyan/028.jpg");
         card.rotation.x += 90 * Math.PI / 180;
         card.rotation.z += -90 * Math.PI / 180;
         card.position.x -= 28.25;
         card.position.z -= 15 - 0.5;
         scene.add(card); */

    }

    function render(cameraControl, renderer, scene, camera) {
        var delta = clock.getDelta();
        cameraControl.update(delta);

        TWEEN.update();

        // Render the scene
        renderer.render(scene, camera);
    }

    function controls(camera, element, scene) {
        var control = new THREE.OrbitControls(camera, element);
        control.target.z = Table.basePlayerDistance / 2;
        camera.position.z = Table.basePlayerDistance * 2.7;
        camera.position.y = 28;
        // control.maxPolarAngle = 45 * Math.PI/180;
        // control.minPolarAngle = 10 * Math.PI/180;
//        control.maxDistance = 40;
        // control.minDistance = 10;
        projector = new THREE.Projector();

        function onDocumentMouseMove(event) {

            event.preventDefault();

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
            projector.unprojectVector(vector, camera);

            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
            var intersections = raycaster.intersectObjects(DBZCCG.objects, true);

            if (intersections.length > 0) {
                if (intersected != intersections[ 0 ].object) {

                    //if (intersected)
                    //    intersected.material.color.setHex(baseColor);
                    intersected = intersections[ 0 ].object;
                    //intersected.material.color.setHex(intersectColor);
                }

                control.enabled = false;
                document.body.style.cursor = intersected.cursor;

                if (intersected.parent.mouseOver instanceof Function) {
                    intersected.parent.mouseOver();
                }

            }
            else if (intersected) {
                //intersected.material.color.setHex(baseColor);
                if (intersected.parent.mouseOut instanceof Function) {
                    intersected.parent.mouseOut();
                }

                intersected = null;

                control.enabled = true;
                document.body.style.cursor = 'auto';

            }
        }

        element.addEventListener('mousemove', onDocumentMouseMove, false);

        return control;
    }

    var scr = new Screen(buildScene, render, controls);

}