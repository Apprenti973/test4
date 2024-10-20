import { IcosahedronGeometry, Mesh, Object3D, ShaderMaterial } from "three";
import vertexShader from "../src/shaders/vertex.glsl";
import fragmentShader from "../src/shaders/fragment.glsl";

export default class Blob extends Object3D {
  constructor(size, settings) {
    super();

    this.geometry = new IcosahedronGeometry(size, 64);
    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: settings.speed },
        uNoiseDensity: { value: settings.density },
        uNoiseStrength: { value: settings.strength },
        uFreq: { value: settings.freq },
        uAmp: { value: settings.amp },
        uOffset: { value: settings.offset },
        uHue: { value: settings.hue },
        uContrast: { value: settings.contrast },
        uPhase: { value: settings.phase },
        uOscillation: { value: settings.oscillation },
        uBrightness: { value: settings.brightness },
        uDistortion: { value: settings.distortion },
        red: { value: 0 },
        green: { value: 0 },
        blue: { value: 0 },
        uAlpha: { value: 1.0 },
      },
      defines: {
        PI: Math.PI,
      },
      // wireframe: true,
      // side: DoubleSide
      // transparent: true,
    });

    this.mesh = new Mesh(this.geometry, this.material);

    this.add(this.mesh);
  }
}
