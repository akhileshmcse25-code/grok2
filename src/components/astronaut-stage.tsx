import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { type Group } from "three";
import { ASTRONAUT, LIGHTS, MODEL_URL } from "@/lib/astronaut";

function readScrollProgress() {
  const port = document.querySelector(".scrollport");
  if (port instanceof HTMLElement) {
    const max = port.scrollHeight - port.clientHeight;
    if (max > 0) return port.scrollTop / max;
  }
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}

function Suit() {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<Group>(null);
  const target = useRef(0);
  const smooth = useRef(0);
  const { size } = useThree();

  useEffect(() => {
    const read = () => {
      target.current = readScrollProgress();
    };
    read();
    const port = document.querySelector(".scrollport");
    port?.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      port?.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    target.current = readScrollProgress();
    const dt = Math.min(delta, 0.05);
    const k = 1 - Math.exp(-dt / ASTRONAUT.scrub);
    smooth.current += (target.current - smooth.current) * k;
    const c = smooth.current;
    const aspect = size.width / Math.max(1, size.height);
    const xFit = Math.min(1, aspect / (16 / 9));
    g.position.x = (ASTRONAUT.startX + c * (ASTRONAUT.endX - ASTRONAUT.startX)) * xFit;
    const bob = Math.sin(state.clock.elapsedTime * ASTRONAUT.floatSpeed) * ASTRONAUT.floatAmplitude;
    g.position.y = ASTRONAUT.positionY - -0.38 * ASTRONAUT.scale + bob;
    g.position.z = 0;
    g.rotation.y = -Math.PI / 2 + ASTRONAUT.initialRotationY + c * ASTRONAUT.rotationMultiplierY;
    g.rotation.x = ASTRONAUT.initialRotationX + c * ASTRONAUT.rotationMultiplierX;
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={ASTRONAUT.scale} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export function AstronautStage() {
  return (
    <div className="astronaut-layer" aria-hidden="true">
      <Canvas
        camera={{
          position: [0, ASTRONAUT.cameraY, ASTRONAUT.cameraZ],
          fov: ASTRONAUT.fov,
          near: 0.1,
          far: 40,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={ASTRONAUT.ambientIntensity} />
        <directionalLight position={[5, 6, 4]} intensity={ASTRONAUT.mainLightIntensity} color={LIGHTS.key} />
        <directionalLight position={[-4, 1, -3]} intensity={ASTRONAUT.rimLightIntensity} color={LIGHTS.rim} />
        <pointLight position={[2, 0, 3]} intensity={0.45} color={LIGHTS.pink} distance={12} />
        <Suspense fallback={null}>
          <Suit />
        </Suspense>
      </Canvas>
    </div>
  );
}
