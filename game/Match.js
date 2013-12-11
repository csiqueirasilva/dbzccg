// http://github.com/csiqueirasilva/dbzccg.js
Match = Class.extend({
   init: function () {
        scene = new THREE.Scene();
        var w = window.innerWidth,
            h = window.innerHeight;

        // renderer
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(0x000000, 1);
        renderer.setSize(w, h);
        document.body.appendChild(renderer.domElement);

        // camera
        camera = new THREE.PerspectiveCamera(45, w / h, 1, 600);
        camera.position.set(0, 0, 0);
        scene.add(camera);

        // resize
        window.addEventListener('resize', function() {
            var WIDTH = window.innerWidth,
                    HEIGHT = window.innerHeight;
            renderer.setSize(WIDTH, HEIGHT);
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();
        });
   }
});