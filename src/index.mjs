import "../src/reset.css";
import "../src/styles.css";
import Blob from "./Blob";
import WindowResizeObserver from "../src/utils/WindowResizeObserver";

import * as THREE from "three";
import { Pane } from "tweakpane";

/**
 * DOM MANIPULATION
 */
const isMobile = window.innerWidth < 768;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

const workItems = document.querySelectorAll(".work-item");

workItems.forEach((workItem) => {
  let bounds; // This will be updated per item when hovered.

  function rotateToMouse(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
    // const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    workItem.style.transform = `
      scale(1.07)
      translate(
        ${center.x / 30}px,
        ${center.y / 30}px
      )
    `;
    // workItem.style.transform = `
    //   scale3d(1.07, 1.07, 1.07)
    //   rotate3d(
    //     ${center.y / 100},
    //     ${-center.x / 100},
    //     0,
    //     ${Math.log(distance) * 2}deg
    //   )
    // `;

    if (workItem.querySelector(".glow")) {
      workItem.querySelector(".glow").style.backgroundImage = `
        radial-gradient(
          circle at
          ${center.x * 2 + bounds.width / 2}px
          ${center.y * 2 + bounds.height / 2}px,
          #ffffff55,
          #0000000f
        )
      `;
    }
  }

  workItem.addEventListener("mouseenter", () => {
    if (isMobile) return;
    bounds = workItem.getBoundingClientRect();
    document.addEventListener("mousemove", rotateToMouse);
  });

  workItem.addEventListener("mouseleave", () => {
    if (isMobile) return;
    document.removeEventListener("mousemove", rotateToMouse);
    workItem.style.transform = "";
    if (workItem.querySelector(".glow")) {
      workItem.querySelector(".glow").style.backgroundImage = "";
    }
  });

  workItem.addEventListener("touchstart", () => {
    workItem.querySelector(".work-info-container").classList.add(".visible");
  });
});

window.addEventListener("touchstart", (target) => {
  console.log(target);
  // if (!el.classList.includes("workItem") || el.classList.includes("work-info-container"))
});

/**
 * Debug
 */
const settings = {
  particleColor: "#ffeded",
  backgroundColor: "#19171A",
  sphere: {
    scale: {
      x: 0.5,
      y: 0.5,
      z: 0.5,
    },
    speed: 0.782608695652174,
    density: 0.14130434782608695,
    strength: 0.17391304347826086,
    freq: 3.804347826086957,
    amp: 1.7391304347826086,
    hue: 0.40217391304347827,
    offset: 0,
    distortion: 2.554347826086957,
    contrast: {
      x: 1,
      y: 1,
      z: 0,
    },
    phase: {
      x: 1,
      y: 0.5,
      z: 0.777999267578125,
    },
    oscillation: {
      x: 0,
      y: 1,
      z: 1,
    },
    brightness: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
};

const themeColorMetaTag = document.createElement("meta");
themeColorMetaTag.setAttribute("name", "theme-color");
themeColorMetaTag.setAttribute("content", settings.backgroundColor);
document.getElementsByTagName("head")[0].appendChild(themeColorMetaTag);
document.body.style.backgroundColor = settings.backgroundColor;

if (
  window.location.href.includes("localhost") ||
  window.location.href.includes("csb")
) {
  const pane = new Pane();
  const folder = pane.addFolder({ title: "General 3D" });
  folder
    .addBinding(settings, "particleColor", { label: "Particle Color" })
    .on("change", (value) => {
      particlesMaterial.color = new THREE.Color(value.value);
      particlesMaterial.needsUpdate = true;
    });
  folder
    .addBinding(settings, "backgroundColor", { label: "Background Color" })
    .on("change", (value) => {
      scene.background = new THREE.Color(value.value);
    });

  const sphereFolder = folder.addFolder({ title: "Sphere" });
  sphereFolder
    .addBinding(settings.sphere, "scale", { min: 0, max: 2, label: "Scale" })
    .on("change", (value) => {
      blob.scale.set(value.value.x, value.value.y, value.value.z);
    });
  sphereFolder
    .addBinding(settings.sphere, "speed", { min: 0, max: 2, label: "Speed" })
    .on("change", changeBlobSettings);
  sphereFolder
    .addBinding(settings.sphere, "density", {
      min: 0,
      max: 1,
      label: "Density",
    })
    .on("change", changeBlobSettings);
  sphereFolder
    .addBinding(settings.sphere, "strength", {
      min: 0,
      max: 1,
      label: "Strength",
    })
    .on("change", changeBlobSettings);
  sphereFolder
    .addBinding(settings.sphere, "freq", {
      min: 0,
      max: 10,
      label: "Frequency",
    })
    .on("change", changeBlobSettings);
  sphereFolder
    .addBinding(settings.sphere, "amp", { min: 0, max: 10, label: "Amplitude" })
    .on("change", changeBlobSettings);
  sphereFolder
    .addBinding(settings.sphere, "hue", { min: 0, max: 1, label: "Hue" })
    .on("change", changeBlobSettings);
  sphereFolder
    .addBinding(settings.sphere, "offset", { min: 0, max: 1, label: "Offset" })
    .on("change", changeBlobSettings);
  sphereFolder
    .addBinding(settings.sphere, "contrast", {
      min: 0,
      max: 1,
      label: "Contrast",
    })
    .on("change", changeBlobSettings);
  sphereFolder
    .addBinding(settings.sphere, "phase", { min: 0, max: 1, label: "Phase" })
    .on("change", changeBlobSettings);
  sphereFolder
    .addBinding(settings.sphere, "oscillation", {
      min: 0,
      max: 1,
      label: "Oscillation",
    })
    .on("change", changeBlobSettings);
  sphereFolder
    .addBinding(settings.sphere, "brightness", {
      min: 0,
      max: 1,
      label: "Brightness",
    })
    .on("change", changeBlobSettings);
  sphereFolder
    .addBinding(settings.sphere, "distortion", {
      min: 0,
      max: 5,
      label: "Distortion",
    })
    .on("change", changeBlobSettings);

  folder.addBlade({
    view: "separator",
  });
  folder.addButton({ title: "Copy settings to clipboard" }).on("click", () => {
    const copy = JSON.stringify(settings, null, 2);
    navigator.clipboard.writeText(`const settings = ${copy}`);
  });
}

function changeBlobSettings() {
  blob.material.uniforms.uSpeed.value = settings.sphere.speed;
  blob.material.uniforms.uNoiseDensity.value = settings.sphere.density;
  blob.material.uniforms.uNoiseStrength.value = settings.sphere.strength;
  blob.material.uniforms.uFreq.value = settings.sphere.freq;
  blob.material.uniforms.uAmp.value = settings.sphere.amp;
  blob.material.uniforms.uHue.value = settings.sphere.hue;
  blob.material.uniforms.uContrast.value = settings.sphere.contrast;
  blob.material.uniforms.uOffset.value = settings.sphere.offset;
  blob.material.uniforms.uPhase.value = settings.sphere.phase;
  blob.material.uniforms.uOscillation.value = settings.sphere.oscillation;
  blob.material.uniforms.uBrightness.value = settings.sphere.brightness;
  blob.material.uniforms.uDistortion.value = settings.sphere.distortion;
}
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#19171A");

/**
 * Objects
 */
// Texture
const textureLoader = new THREE.TextureLoader();
// const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
// gradientTexture.magFilter = THREE.NearestFilter

// // Material
// const material = new THREE.MeshToonMaterial({
//   color: settings.materialColor,
//   gradientMap: gradientTexture
// })

// Objects
const objectsDistance = 4;
const sectionsLength = 5;
// const mesh1 = new THREE.Mesh(
//   new THREE.TorusGeometry(1, 0.4, 16, 60),
//   material
// )

// Create a blob
const blob = new Blob(1.75, settings.sphere);
blob.scale.set(
  settings.sphere.scale.x,
  settings.sphere.scale.y,
  settings.sphere.scale.z
);
if (isMobile) {
  blob.scale.set(
    settings.sphere.scale.x - 0.1,
    settings.sphere.scale.y - 0.1,
    settings.sphere.scale.z - 0.1
  );
}
scene.add(blob);

/**
 * Particles
 */
// Geometry
const particlesCount = 250;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 12;
  positions[i * 3 + 1] =
    objectsDistance * 0.5 - Math.random() * objectsDistance * sectionsLength;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

// Texture
// const particleTexture = textureLoader.load("./particle.png");

// Material
const particlesMaterial = new THREE.PointsMaterial({
  color: settings.particleColor,
  sizeAttenuation: true,
  size: 0.05,
  // map: particleTexture,
  // transparent: true,
});

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Sizes
 */
const sizes = {
  width: WindowResizeObserver.innerWidth,
  height: WindowResizeObserver.innerHeight,
};

WindowResizeObserver.addEventListener("resize", (dimensions) => {
  // if (isMobile) return; // avoid canvas resize on scroll on iphone
  // Update sizes
  sizes.width = dimensions.innerWidth;
  sizes.height = dimensions.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setPixelRatio(dimensions.dpr);
  renderer.setSize(sizes.width, sizes.height, true);
});

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setPixelRatio(WindowResizeObserver.dpr);
renderer.setSize(sizes.width, sizes.height, true);

/**
 * Cursor
 */
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove", (event) => {
  if (isMobile) return;
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate camera
  camera.position.y = (-scrollY / sizes.height) * objectsDistance;

  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  blob.material.uniforms.uTime.value = elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
