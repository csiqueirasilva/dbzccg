// http://github.com/csiqueirasilva/dbzccg.js
function DBZCCG () {

    var clock = new THREE.Clock();

    var cardHeight = 5.5;
    var cardWidth = 4;
    var cornerWidth = 0.10;
    var cornerHeight = cornerWidth;
    var cardThicknessScale = 0.1;

    function createCard (texturePath) {
        var card = new THREE.Object3D();
        var cardGeo = new THREE.CylinderGeometry(cornerWidth,cornerWidth,cardWidth - cornerWidth,32,16,true);
        var backTexture = THREE.ImageUtils.loadTexture("images/DBZCCG/back.jpg");
        var frontTexture = THREE.ImageUtils.loadTexture(texturePath);
        var cardMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 , side: THREE.DoubleSide});

        var top = new THREE.Mesh(cardGeo, cardMaterial);
        var bot = top.clone();
        
        cardGeo = new THREE.CylinderGeometry(cornerWidth,cornerWidth,cardHeight,32,16,true);
        var left = new THREE.Mesh(cardGeo, cardMaterial);
        var right = left.clone();
        
        top.rotation.z += 90 * Math.PI/180;
        top.position.y += cardHeight/2;
        bot.rotation.z += 90 * Math.PI/180;
        bot.position.y -= cardHeight/2;
        left.position.x -= (cardWidth - cornerWidth)/2;
        right.position.x += (cardWidth - cornerWidth)/2;
        
        card.add(top);
        card.add(bot);
        card.add(right);
        card.add(left);

        var cornerGeo = new THREE.SphereGeometry(cornerWidth, 32, 16);
        var baseCorner = new THREE.Mesh(cornerGeo, cardMaterial);
        
        // Add circles in borders
        for(var i = -1; i <= 1; i = i + 2) {
            for(var j = -1; j <= 1; j = j + 2) {
                corner = baseCorner.clone();
                corner.position.x += i*cardWidth/2 + i*(-1)*cornerWidth/2;
                corner.position.y += j*cardHeight/2;
                card.add(corner);
            }
        }

        // Add card box
        var cubeMaterials = [];
       for ( var i = 0; i < 6; i ++ ) {
            cubeMaterials.push( cardMaterial.clone() );
        }
        cubeMaterials[5] = new THREE.MeshBasicMaterial({ map: frontTexture });
        cubeMaterials[4] = new THREE.MeshBasicMaterial({ map: backTexture }) ;

        var cubeGeo = new THREE.CubeGeometry(cardWidth - cornerWidth, cardHeight, cornerWidth*2);

        
        var cube = new THREE.Mesh(cubeGeo, new THREE.MeshFaceMaterial(cubeMaterials));
        card.add(cube);
        card.scale.z = cardThicknessScale;

        return card;
    }

    function createSkybox(scene) {
        var urlPrefix = "images/bg/skybox_paraiso3/";
        var urls = [ urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
            urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
            urlPrefix + "posz.jpg", urlPrefix + "negz.jpg" ];
        var textureCube = THREE.ImageUtils.loadTextureCube( urls );

        urlPrefix = "images/bg/skybox_carro/";
        urls = [ urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
            urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
            urlPrefix + "posz.jpg", urlPrefix + "negz.jpg" ];
        var textureCube2 = THREE.ImageUtils.loadTextureCube( urls );

        var shader = THREE.ShaderLib.cube;
        var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
        uniforms['tCube'].value = textureCube;
        uniforms['tCube2'] = { type: 't', value: textureCube2 };
        
        var material = new THREE.ShaderMaterial({
            fragmentShader    : document.getElementById('skybox_fragment_shader').textContent,
            vertexShader  : document.getElementById('skybox_vertex_shader').textContent,
            uniforms  : uniforms,
            side : THREE.BackSide
        });
        
        var skybox = new THREE.Mesh(
                new THREE.CubeGeometry(4000, 4000, 4000),
                material);

        scene.add(skybox);
    }

    function buildScene(scene) {
        createSkybox(scene);
        function formatnumber(n) {
            if(n < 10) return "00" + n;
            else if (n < 100) return "0" + n;
            else return n.toString() ;
        }
        
        for(var i = 1; i <= 80; i++) {
            var card = createCard("images/DBZCCG/saiyan/"+formatnumber(i)+".jpg");
            card.rotation.x += -90 * Math.PI/180;
            card.position.y = cornerWidth*cardThicknessScale*i*3 ;
            scene.add(card);
        }
    }
    
    function render(cameraControl, renderer, scene, camera) {
        var delta = clock.getDelta();
        cameraControl.update(delta);

        // Render the scene
        renderer.render(scene, camera);
    }
    
    function controls(camera, element) {
        var control = new THREE.OrbitControls(camera, element);
        control.target.z = -1;
        camera.position.z = -100;
        return control;
    }
    
    var screen = new Screen(buildScene, render, controls);
}