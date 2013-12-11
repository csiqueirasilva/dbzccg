// http://github.com/csiqueirasilva/dbzccg.js
function DBZCCG() {

    var clock = new THREE.Clock();

    var cardHeight = 5.5;
    var cardWidth = 4;
    var cornerWidth = 0.10;
    var cornerHeight = cornerWidth;
    var cardThicknessScale = 0.1;
    var personalityNameDiff = 0.55;

    function createCard(texturePath) {
        var card = new THREE.Object3D();
        var cardGeo = new THREE.CylinderGeometry(cornerWidth, cornerWidth, cardWidth - cornerWidth, 32, 16, true);
        var backTexture = THREE.ImageUtils.loadTexture("images/DBZCCG/back.jpg");
        var frontTexture = THREE.ImageUtils.loadTexture(texturePath);
        var borderTexture = THREE.ImageUtils.loadTexture("images/DBZCCG/border.jpg");
        var cornerTexture = THREE.ImageUtils.loadTexture("images/DBZCCG/corner.jpg");
        var cardMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.FrontSide});

        var cornerMaterial = new THREE.MeshBasicMaterial({
            side: THREE.FrontSide,
            map: cornerTexture
        });
        
        var borderMaterial = new THREE.MeshBasicMaterial({
            side: THREE.FrontSide,
            map: borderTexture
        });

        var top = new THREE.Mesh(cardGeo, borderMaterial);
        
        var bot = top.clone();
        
        cardGeo = new THREE.CylinderGeometry(cornerWidth, cornerWidth, cardHeight, 32, 16, true);
        var left = new THREE.Mesh(cardGeo, borderMaterial);
        var right = left.clone();

        top.rotation.z += 90 * Math.PI / 180;
        top.position.y += cardHeight / 2;
        bot.rotation.z += 90 * Math.PI / 180;
        bot.position.y -= cardHeight / 2;
        left.position.x -= (cardWidth - cornerWidth) / 2;
        right.position.x += (cardWidth - cornerWidth) / 2;

        card.add(top);
        card.add(bot);
        card.add(right);
        card.add(left);

        var cornerGeo = new THREE.SphereGeometry(cornerWidth, 32, 16);
        var baseCorner = new THREE.Mesh(cornerGeo, cornerMaterial);

        // Add circles in borders
        for (var i = -1; i <= 1; i = i + 2) {
            for (var j = -1; j <= 1; j = j + 2) {
                corner = baseCorner.clone();
                corner.position.x += i * cardWidth / 2 + i * (-1) * cornerWidth / 2;
                corner.position.y += j * cardHeight / 2;
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
        var cubeGeo = new THREE.CubeGeometry(cardWidth - cornerWidth, cardHeight, cornerWidth * 2);

        var cube = new THREE.Mesh(cubeGeo, new THREE.MeshFaceMaterial(cubeMaterials));
        card.add(cube);
        card.scale.z = cardThicknessScale;

        return card;
    }

    function createSkybox(scene) {
        var urlPrefix = "images/bg/skybox_inferno3/";
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
            fragmentShader: shader.fragmentShader,//document.getElementById('skybox_fragment_shader').textContent,
            vertexShader: shader.vertexShader,//document.getElementById('skybox_vertex_shader').textContent,
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
        function formatnumber(n) {
            if (n < 10)
                return "00" + n;
            else if (n < 100)
                return "0" + n;
            else
                return n.toString();
        }

        var card = createCard("images/DBZCCG/saiyan/001.jpg");
        for (var i = 1; i <= 50; i++) {
            var addcard = card.clone();
            addcard.rotation.x += -90 * Math.PI / 180;
            addcard.position.y = cornerWidth * cardThicknessScale * i * 2 ;
            scene.add(addcard);
        }
        
        for (var i = 1; i <= 10; i++) {
            var addcard = card.clone();
            addcard.rotation.x += -90 * Math.PI / 180;
            addcard.rotation.y += -180 * Math.PI / 180;
            addcard.position.y = cornerWidth * cardThicknessScale * i * 2 ;
            addcard.position.x -= cardWidth + 1;
            scene.add(addcard);
        }
        
        
        card = createCard("images/DBZCCG/saiyan/002.jpg");
        
        for (var i = 1; i <= 30; i++) {
            var addcard = card.clone();
            addcard.rotation.x += -90 * Math.PI / 180;
            addcard.rotation.z += 180 * Math.PI / 180;
            addcard.rotation.y += -180 * Math.PI / 180;
            addcard.position.y = cornerWidth * cardThicknessScale * i * 2 ;
            addcard.position.x -= 29 - (cardWidth + 1);
            addcard.position.z -= 20;
            scene.add(addcard);
        }
        
        for (var i = 80; i <= 120; i++) {
            var addcard = card.clone();
            addcard.rotation.x += -90 * Math.PI / 180;
            addcard.rotation.z += 180 * Math.PI / 180;
            addcard.position.y = cornerWidth * cardThicknessScale * (i-79) * 2 ;
            addcard.position.x -= 29;
            addcard.position.z -= 20;
            scene.add(addcard);
        }

        // MP1
        goku1 = createCard("images/DBZCCG/saiyan/158.jpg");
        goku2 = createCard("images/DBZCCG/saiyan/159.jpg");
        goku3 = createCard("images/DBZCCG/saiyan/160.jpg");

        goku1.rotation.x += -90 * Math.PI / 180;
        goku1.rotation.y += -180 * Math.PI / 180;
        goku1.position.z -= 5+personalityNameDiff;
        goku1.position.y = cornerWidth * cardThicknessScale * 1 * 2 ;
        goku1.position.x -= 14.5;

        goku2.rotation.x += -90 * Math.PI / 180;
        goku2.rotation.y += -180 * Math.PI / 180;
        goku2.position.z -= 5+2*personalityNameDiff;
        goku2.position.y = cornerWidth * cardThicknessScale * 0 * 2 ;
        goku2.position.x -= 14.5;
        
        goku3.rotation.x += -90 * Math.PI / 180;
        goku3.rotation.y += -180 * Math.PI / 180;
        goku3.position.z -= 5;
        goku3.position.y = cornerWidth * cardThicknessScale * 3 * 2 ;
        goku3.position.x -= 14.5;

        // MP2
        vegeta1 = createCard("images/DBZCCG/saiyan/173.jpg");
        vegeta2 = createCard("images/DBZCCG/saiyan/174.jpg");
        vegeta3 = createCard("images/DBZCCG/saiyan/175.jpg");

        vegeta1.rotation.x += -90 * Math.PI / 180;
        vegeta1.rotation.y += -180 * Math.PI / 180;
        vegeta1.rotation.z += -180 * Math.PI / 180;
        vegeta1.position.z -= 15-personalityNameDiff;
        vegeta1.position.y = cornerWidth * cardThicknessScale * 1 * 2 ;
        vegeta1.position.x -= 14.5;

        vegeta2.rotation.z += -180 * Math.PI / 180;
        vegeta2.rotation.x += -90 * Math.PI / 180;
        vegeta2.rotation.y += -180 * Math.PI / 180;
        vegeta2.position.z -= 15-2*personalityNameDiff;
        vegeta2.position.y = cornerWidth * cardThicknessScale * 0 * 2 ;
        vegeta2.position.x -= 14.5;

        vegeta3.rotation.z += -180 * Math.PI / 180;
        vegeta3.rotation.x += -90 * Math.PI / 180;
        vegeta3.rotation.y += -180 * Math.PI / 180;
        vegeta3.position.z -= 15;
        vegeta3.position.y = cornerWidth * cardThicknessScale * 3 * 2 ;
        vegeta3.position.x -= 14.5;

        scene.add(goku1);
        scene.add(goku2);
        scene.add(goku3);
        scene.add(vegeta1);
        scene.add(vegeta2);
        scene.add(vegeta3);
        
        // Removed from the game
        card = createCard("images/DBZCCG/saiyan/250.jpg");
        card.rotation.x += 90 * Math.PI / 180;
        card.rotation.z += 90 * Math.PI / 180;
        card.position.x -= 0.75;
        card.position.z -= 5.5;
        scene.add(card);
        
        card = createCard("images/DBZCCG/saiyan/028.jpg");
        card.rotation.x += 90 * Math.PI / 180;
        card.rotation.z += -90 * Math.PI / 180;
        card.position.x -= 28.25;
        card.position.z -= 15 - 0.5;
        scene.add(card);
        
    }

    function render(cameraControl, renderer, scene, camera) {
        var delta = clock.getDelta();
        cameraControl.update(delta);

        // Render the scene
        renderer.render(scene, camera);
    }

    function controls(camera, element) {
        var control = new THREE.OrbitControls(camera, element);
        control.target.z = -10;
        camera.position.z = 20;
        camera.position.y = 16;
        control.target.x = camera.position.x = -15;
        return control;
    }

    var screen = new Screen(buildScene, render, controls);
}