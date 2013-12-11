varying vec3 vWorldPosition;
varying vec2 vUv;
varying vec3 vViewPosition;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
    vUv = uv;
    vWorldPosition = worldPosition.xyz;
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}