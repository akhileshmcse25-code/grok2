export const ASTRONAUT = {
  scale: 1,
  positionY: -2.5,
  startX: 3,
  endX: -3,
  cameraZ: 6,
  cameraY: 0.5,
  fov: 50,
  initialRotationY: 0.2 * Math.PI,
  initialRotationX: 0.1,
  rotationMultiplierY: 2 * Math.PI,
  rotationMultiplierX: 0.3,
  floatAmplitude: 0.1,
  floatSpeed: 0.8,
  ambientIntensity: 0.6,
  mainLightIntensity: 1.5,
  rimLightIntensity: 0.8,
  scrub: 0.08,
} as const;

export const LIGHTS = {
  key: "#ffffff",
  rim: "#8b5cf6",
  pink: "#ec4899",
  cyan: "#06b6d4",
} as const;

export const MODEL_URL = "/models/astronaut.glb";
