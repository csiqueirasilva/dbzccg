DBZCCG.Frieza = {};

DBZCCG.Frieza.Foil = {};

DBZCCG.Frieza.Foil.default = (function() {
    var ext = 'jpg';
    var urlPrefix = "images/bg/frieza-saga-foil2/";
    var urls = [urlPrefix + "posx." + ext, urlPrefix + "negx." + ext,
        urlPrefix + "posy." + ext, urlPrefix + "negy." + ext,
        urlPrefix + "posz." + ext, urlPrefix + "negz." + ext];
    var textureCube = THREE.ImageUtils.loadTextureCube(urls);
    return {texture: textureCube, reflectivity: 1.5};
}());