ThreeHelper = {};

ThreeHelper.createSkybox = function (scene, skybox, ext, path) {

    ext = ext || "jpg";
    
    path = path || "images/bg/";

    var urlPrefix = path + skybox + "/";
    var urls = [urlPrefix + "posx." + ext, urlPrefix + "negx." + ext,
        urlPrefix + "posy." + ext, urlPrefix + "negy." + ext,
        urlPrefix + "posz." + ext, urlPrefix + "negz." + ext];
    var textureCube = THREE.ImageUtils.loadTextureCube(urls);

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