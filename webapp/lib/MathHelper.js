MathHelper = {};

/* v' = v-2(v<dot>n).n
 * https://github.com/mrdoob/three.js/issues/3009
 */
MathHelper.reflect = function(vector, extlineBetween) {
    var reflect = new THREE.Vector3();
    var lineBetween = extlineBetween.clone();
    reflect.copy(vector).add(lineBetween.multiplyScalar(-2 * vector.dot(lineBetween)));
    return reflect;
};

/*
 * http://soledadpenades.com/articles/three-js-tutorials/drawing-the-coordinate-axes/
 */

MathHelper.buildAxes = function (length) {

    function buildAxis(src, dst, colorHex, dashed) {
        var geom = new THREE.Geometry(),
                mat;

        if (dashed) {
            mat = new THREE.LineDashedMaterial({linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3});
        } else {
            mat = new THREE.LineBasicMaterial({linewidth: 3, color: colorHex});
        }

        geom.vertices.push(src.clone());
        geom.vertices.push(dst.clone());
        geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

        var axis = new THREE.Line(geom, mat, THREE.LinePieces);

        return axis;

    }

    var axes = new THREE.Object3D();

    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xFF0000, false)); // +X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xFF0000, true)); // -X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00FF00, false)); // +Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x00FF00, true)); // -Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000FF, false)); // +Z
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x0000FF, true)); // -Z

    return axes;

};

MathHelper.lineFromOrigin = function(pos, color) {
    var line = new THREE.Geometry();
    var lineColor = color || 0x000000;
    line.vertices.push(new THREE.Vector3(0, 0, 0));
    line.vertices.push(pos.clone());

    return new THREE.Line( line, new THREE.LineBasicMaterial({ linewidth: 3, color: lineColor }), THREE.LinePieces );
};

MathHelper.angleVectors = function(vector1, vector2) {
    var v1 = vector1.clone().normalize();
    var v2 = vector2.clone().normalize();
    
    return Math.acos(v1.dot(v2));
};

MathHelper.rotateVector = function(vector, extAxis, extAngle) {
    var rotated = vector.clone();
    var axis = extAxis || new THREE.Vector3(0, 1, 0);
    var angle = extAngle || Math.PI / 2;
    var matrix = new THREE.Matrix4().makeRotationAxis(axis, angle);
    return rotated.applyMatrix4(matrix);
};