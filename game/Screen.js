// http://github.com/csiqueirasilva

Screen = {};

Screen.findCallbackObject = function (object, callback) {
    var parent;
    if (object instanceof THREE.Mesh || object instanceof THREE.Object3D) {
        parent = object;
        while(parent && !(parent.parent instanceof THREE.Scene)) {
            parent = parent.parent;
            if(parent[callback] instanceof Function) {
                break;
            }
        }
    }
    return parent;
};

Screen.create = function (buildScene, render, controls) {
    function GFX(extBuildScene, extRender, extControls) {
        var renderer;
        var scene;
        var camera;
        var cameraControl;
        var buildScene = extBuildScene;
        var render = extRender;
        var running = false;

        function animate () {
            requestAnimationFrame(animate);
            render(cameraControl, renderer, scene, camera);
        }

        this.animate = animate;

        function initWebGL() {
            if (!running && buildScene instanceof Function && render instanceof Function) {
                scene = new THREE.Scene();
                var w = window.innerWidth,
                        h = window.innerHeight;

                // renderer
                renderer = new THREE.WebGLRenderer({antialias: true});
                renderer.setClearColor(0x000000, 1);
                renderer.setSize(w, h);
                
                document.body.appendChild(renderer.domElement);

                // camera
                camera = new THREE.PerspectiveCamera(45, w / h, 1, 6000);
                camera.position.set(0, 0, 0);
                scene.add(camera);

                window.addEventListener('resize', function() {
                    var WIDTH = window.innerWidth,
                            HEIGHT = window.innerHeight;
                    renderer.setSize(WIDTH, HEIGHT);
                });

                // camera control
                if (extControls instanceof Function) {
                    cameraControl = extControls(camera, renderer, scene);
                }

                // Build scene
                buildScene(scene, camera);

                running = true;
            }
        }

        this.init = initWebGL;
    }

    var gfx = new GFX(buildScene, render, controls);
    gfx.init();
    
    return { start: gfx.animate };
};