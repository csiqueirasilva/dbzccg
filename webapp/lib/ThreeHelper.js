ThreeHelper = {};

(function() {

    function disposeTextures(material) {
        if (material.map) {
            material.map.dispose();
        }

        if (material.envMap) {
            material.envMap.dispose();
        }

        if (material.specularMap) {
            material.specularMap.dispose();
        }
    }

    ThreeHelper.dispose = function(ele, disposeTexture) {
        if (ele instanceof THREE.Object3D) {
            for (var i = 0; i < ele.children.length; i++) {
                ThreeHelper.dispose(ele.children[i], disposeTexture);
            }
            delete ele;
        } else if (ele instanceof THREE.Mesh) {
            ele.geometry.dispose();
            if (disposeTexture) {
                if (ele.material instanceof THREE.MeshFaceMaterials) {
                    for (var i = 0; i < ele.material.materials.length; i++) {
                        disposeTextures(ele.material.materials[i]);
                    }
                } else {
                    disposeTextures(ele.material);
                }
            }
            ele.material.dispose();
        }
    };

})();

ThreeHelper.createSkybox = function(scene, skybox, completeCallback, errorCallback, ext, path) {

    ext = ext || "jpg";

    path = path || "images/bg/";

    var urlPrefix = path + skybox + "/";
    var urls = [urlPrefix + "posx." + ext, urlPrefix + "negx." + ext,
        urlPrefix + "posy." + ext, urlPrefix + "negy." + ext,
        urlPrefix + "posz." + ext, urlPrefix + "negz." + ext];

    var textureCube = THREE.ImageUtils.loadTextureCube(urls, undefined, function(tCube) {
        if (completeCallback instanceof Function) {
            completeCallback(tCube);
        }
    }, errorCallback);

    var shader = THREE.ShaderLib.cube;
    var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
    uniforms['tCube'].value = textureCube;

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

    return textureCube;
};

ThreeHelper.getRawWorldCoords = function(x, y, camera) {
    var coords = new THREE.Vector3();
    var projector = new THREE.Projector();
    coords.x = (x / window.innerWidth) * 2 - 1;
    coords.y = -(y / window.innerHeight) * 2 + 1;

    var ret = new THREE.Vector3(coords.x, coords.y, 0.5);
    projector.unprojectVector(ret, camera);

    return ret;
};

ThreeHelper.createBackground = function(scene, camera, backgroundCallback) {
    var sizeX = window.screen.width;
    var sizeY = window.screen.height;

    var background = {
        loadImage: function(image, sizeX, sizeY) {
            var plane = new THREE.PlaneGeometry();

            this.updatePlane = function() {
                plane.vertices[0] = ThreeHelper.getRawWorldCoords(0, 0, this.camera);
                plane.vertices[1] = ThreeHelper.getRawWorldCoords(window.innerWidth, 0, this.camera);
                plane.vertices[2] = ThreeHelper.getRawWorldCoords(0, window.innerHeight, this.camera);
                plane.vertices[3] = ThreeHelper.getRawWorldCoords(window.innerWidth, window.innerHeight, this.camera);
                plane.verticesNeedUpdate = true;
            };

            this.updatePlane();

            this.texture = THREE.ImageUtils.loadTexture(image, new THREE.UVMapping(), function() {
                console.log('Background Image Loaded');
            }, function() {
                console.error('Error on loading Background Image');
            });

            var planeMesh = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({side:
                        THREE.FrontSide, depthTest: false,
                depthWrite: false,
                map: this.texture}));

            this.scene.add(planeMesh);
            this.camera.lookAt(planeMesh.position);
            this.camera.position.z = 100;
        },
        load: backgroundCallback,
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera(45, sizeX / sizeY, 0.01, 10000)
    };

    background.load(sizeX, sizeY);

    background.resize = function() {
        var WIDTH = window.screen.width;
        var HEIGHT = window.screen.height;

        background.camera.aspect = WIDTH / HEIGHT;
        background.camera.updateProjectionMatrix();

        var sizeX = WIDTH;
        var sizeY = HEIGHT;

        if (background.updatePlane instanceof Function) {
            background.updatePlane();
        }

        if (background.contentResize instanceof Function) {
            background.contentResize(sizeX, sizeY);
        }
    };

    return background;
};