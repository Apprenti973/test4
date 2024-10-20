varying vec2 vUv;
varying float vDistort;

uniform float uTime;
uniform float uHue;
uniform float uAlpha;
uniform float uDistortion;
uniform vec3 uBrightness;
uniform vec3 uContrast;
uniform vec3 uOscillation;
uniform vec3 uPhase;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}   

void main() {
  float distort = vDistort * uDistortion;

  vec3 brightness = vec3(0.5, 0.5, 0.5);
  vec3 contrast = vec3(0.9, 0.5, 0.5);
  vec3 oscilation = vec3(1.0, 1.0, 1.0);
  vec3 phase = vec3(0.0, 0.2, 0.2);

  vec3 color = cosPalette(uHue + distort, uBrightness, uContrast, uOscillation, uPhase);

  gl_FragColor = vec4(color, uAlpha);
}