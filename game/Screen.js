// http://github.com/csiqueirasilva

DBZCCG.Screen = {};

DBZCCG.Screen.findCallbackObject = function(object, callback) {
    var parent;
    
    if (object instanceof THREE.Mesh || object instanceof THREE.Object3D) {
        parent = object;
        while (parent && !parent.ownParent && !(parent.parent instanceof THREE.Scene)) {
            parent = parent.parent;
            if (parent[callback] instanceof Function) {
                break;
            }
        }
    }

    return parent;
};

DBZCCG.Screen.getWorldCoords = function(element, camera) {
    var coords = new THREE.Vector3();
    var projector = new THREE.Projector();
    coords.x = ((element.offsetLeft + element.offsetWidth) / window.innerWidth) * 2 - 1;
    coords.y = -((element.offsetTop + element.offsetHeight) / window.innerHeight) * 2 + 1;

    coords.ix = (element.offsetLeft / window.innerWidth) * 2 - 1;
    coords.iy = -(element.offsetTop / window.innerHeight) * 2 + 1;

    var ret = {};
    ret.endCoords = new THREE.Vector3(coords.x, coords.y, 0.5);
    projector.unprojectVector(ret.endCoords, camera);

    ret.beginCoords = new THREE.Vector3(coords.ix, coords.iy, 0.5);
    projector.unprojectVector(ret.beginCoords, camera);
    return ret;
};

DBZCCG.Screen.getWindowCoords = function(display, camera) {
    var vector = new THREE.Vector3();
    if (display) {
        var width = window.innerWidth, height = window.innerHeight;
        var widthHalf = width / 2, heightHalf = height / 2;

        var projector = new THREE.Projector();

        projector.projectVector(vector.getPositionFromMatrix(display.matrixWorld), camera || DBZCCG.playerCamera);

        vector.x = Math.round((vector.x * widthHalf) + widthHalf);
        vector.y = Math.round(-(vector.y * heightHalf) + heightHalf);

    }
    return vector;
};

DBZCCG.Screen.customAddChild = function(pos, father, child) {
    /* This is a custom routine to add a child element 
     * This routine was implemented since I need to have control of the child index 
     */
    father.children.splice(pos, 0, child);
    child.parent = father;

    var scene = father.parent;

    // find scene
    while (scene.parent !== undefined) {
        scene = scene.parent;
    }

    if (scene !== undefined && scene instanceof THREE.Scene) {
        scene.__addObject(child);
    }
    /* End of the custom routine to add a child element */
}

DBZCCG.Screen.invalidIntersection = function(intersections) {
    for (var i = 0; i < intersections.length; i++) {
        if (intersections[i].object.parent instanceof THREE.Object3D && intersections[i].object.parent.parent) {
            return i;
        }
    }

    return -1;
}

DBZCCG.Screen.create = function(buildScene, render, controls) {
    function GFX(extBuildScene, extRender, extControls) {
        var renderer;
        var scene;
        var camera;
        var cameraControl;
        var buildScene = extBuildScene;
        var render = extRender;
        var running = false;
        var stats = new Stats();

        function animate() {
            window.setTimeout(function() {

                requestAnimationFrame(animate);

            }, 33 - DBZCCG.clock.getDelta() * 1000);

            render(cameraControl, renderer, scene, camera, stats);
        }

        this.animate = animate;

        function initWebGL() {
            if (!running && buildScene instanceof Function && render instanceof Function) {
                scene = new THREE.Scene();
                var w = window.innerWidth,
                        h = window.innerHeight;

                // renderer
                renderer = new THREE.WebGLRenderer({antialias: true});
                renderer.domElement.id = 'main-canvas';
                renderer.setClearColor(0x000000, 1);
                renderer.setSize(w, h);

                document.getElementById('renderer-wrapper').appendChild(renderer.domElement);

                // camera
                camera = new THREE.PerspectiveCamera(45, w / h, 1, 6000);
                camera.position.set(0, 0, 0);
                scene.add(camera);

                window.addEventListener('resize', function() {
                    var WIDTH = window.innerWidth,
                            HEIGHT = window.innerHeight;
                    renderer.setSize(WIDTH, HEIGHT);
                });

                // controls, return camera control if any
                if (extControls instanceof Function) {
                    cameraControl = extControls(camera, renderer, scene, stats);
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

    return {start: gfx.animate};
};