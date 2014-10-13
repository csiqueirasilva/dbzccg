uniform samplerCube tCube;
uniform samplerCube tCube2;
uniform float tFlip;

varying vec3 vWorldPosition;
varying vec2 vUv;
varying vec3 vViewPosition;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
        vec4 res1 = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );
        vec4 res2 = textureCube( tCube2, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );
        
        gl_FragColor = vec4( vWorldPosition.x > 0.0 ? res1.x : res2.x, vWorldPosition.x > 0.0 ? res1.y : res2.y, vWorldPosition.x > 0.0 ? res1.z : res2.z, 1.0 ) ;
}