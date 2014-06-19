if (typeof window !== "undefined" && window !== null) {
    DBZCCG.Frieza.Foil.Default = (function() {
        var ext = 'jpg';
        var urlPrefix = "images/bg/frieza-saga-foil2/";
        var urls = [urlPrefix + "posx." + ext, urlPrefix + "negx." + ext,
            urlPrefix + "posy." + ext, urlPrefix + "negy." + ext,
            urlPrefix + "posz." + ext, urlPrefix + "negz." + ext];
        var textureCube = THREE.ImageUtils.loadTextureCube(urls, undefined, function() {
            DBZCCG.Load.foilFriezaDefault = true;
            console.log('Frieza Saga Default Foil effect loaded');
        },
                function() {
                    DBZCCG.Load.error = true;
                    console.log('Error while loading Frieza Saga Foil effect');
                });
        return {texture: textureCube, reflectivity: 1.5};
    }());
}