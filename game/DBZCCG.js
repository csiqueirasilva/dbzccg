// http://github.com/csiqueirasilva/dbzccg.js
function DBZCCG() {

    /* Three related */
    var clock = new THREE.Clock();
    var mouse = new THREE.Vector2();
    var projector;
    var intersected;
    var objects = [];

    /* Game related */
    var table = null;

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
        createSkybox(scene);
        table = Table.create([
            /*P1*/    
            {currentMainPersonality: 1, currentPowerStageAboveZero: 5, currentAngerLevel: 0,
                angerLevelNeededToLevel: 5, mainPersonality: [{highTech: false, number: 158, texturePath: "images/DBZCCG/saiyan/158.jpg",
                        personality: Personality.GOKU, saga: Card.Saga.Saiyan, powerStages: [0, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400]},
                    {highTech: false, number: 159, texturePath: "images/DBZCCG/saiyan/159.jpg",
                        personality: Personality.GOKU, saga: Card.Saga.Saiyan, powerStages: [0, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400]},
                    {highTech: false, number: 160, texturePath: "images/DBZCCG/saiyan/160.jpg",
                        personality: Personality.GOKU, saga: Card.Saga.Saiyan, powerStages: [0, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400]}]},
            /*P2*/
            {currentMainPersonality: 1, currentPowerStageAboveZero: 5, currentAngerLevel: 0,
                angerLevelNeededToLevel: 5, mainPersonality: [{highTech: false, number: 173, texturePath: "images/DBZCCG/saiyan/173.jpg",
                        personality: Personality.VEGETA, saga: Card.Saga.Saiyan, powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]},
                    {highTech: false, number: 174, texturePath: "images/DBZCCG/saiyan/174.jpg",
                        personality: Personality.VEGETA, saga: Card.Saga.Saiyan, powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]},
                    {highTech: false, number: 175, texturePath: "images/DBZCCG/saiyan/175.jpg",
                        personality: Personality.VEGETA, saga: Card.Saga.Saiyan, powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]}]}
        ]);

        console.log(table);

        for (var i = 0; i < table.players.length; i++) {
            var player = table.players[i];
            player.loadPlayerSpace(scene);
        }

        table.players[0].advanceLevel(3000);
        table.players[0].advanceLevel(3000);
        
        console.log(table.players[0]);
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

    function controls(camera, element) {
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
            var intersections = raycaster.intersectObjects(objects, true);

            if (intersections.length > 0) {

                if (intersected != intersections[ 0 ].object) {

                    //if (intersected)
                    //    intersected.material.color.setHex(baseColor);

                    intersected = intersections[ 0 ].object;
                    //intersected.material.color.setHex(intersectColor);
                }

                control.enabled = false;
                document.body.style.cursor = 'pointer';

            }
            else if (intersected) {

                //intersected.material.color.setHex(baseColor);
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