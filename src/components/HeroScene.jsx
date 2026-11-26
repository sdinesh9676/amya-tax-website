
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  RoundedBox,
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";

function GraphBars() {
  const bars = [1.1, 1.7, 1.35, 2.1, 2.6, 2.2, 3.1];

  return (
    <group position={[-1.5, -0.8, 0]}>
      {bars.map((height, index) => (
        <RoundedBox
          key={index}
          args={[0.24, height, 0.24]}
          radius={0.07}
          smoothness={4}
          position={[index * 0.48, height / 2, 0]}
        >
          <meshStandardMaterial
            color={index === 6 ? "#EEB32B" : "#A77BD2"}
            metalness={0.35}
            roughness={0.3}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

function FloatingRing() {
  const ring = useRef();

  useFrame((state, delta) => {
    if (ring.current) {
      ring.current.rotation.y += delta * 0.3;
      ring.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
    }
  });

  return (
    <mesh ref={ring} position={[2.2, 1.4, -0.8]}>
      <torusGeometry args={[0.55, 0.07, 16, 80]} />
      <meshStandardMaterial
        color="#EEB32B"
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
}

function Dashboard() {
  const panel = useRef();

  useFrame((state) => {
    if (panel.current) {
      panel.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
    }
  });

  return (
    <group ref={panel} rotation={[-0.08, -0.2, 0]}>
      {/* Main dashboard panel */}
      <RoundedBox
        args={[4.7, 3.3, 0.22]}
        radius={0.12}
        smoothness={5}
        position={[0, 0, -0.15]}
      >
        <meshPhysicalMaterial
          color="#431F6F"
          metalness={0.2}
          roughness={0.28}
          clearcoat={0.8}
        />
      </RoundedBox>

      {/* Graph area */}
      <GraphBars />

      {/* Gold decorative elements */}
      <FloatingRing />

      {/* Small dashboard indicators */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-1.65 + i * 0.55, 1.15, 0.04]}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshStandardMaterial color="#EEB32B" />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[4, 5, 6]}
        intensity={2}
      />

      <pointLight
        position={[-4, 2, 3]}
        intensity={35}
        color="#B88AE8"
      />

      <Float
        speed={1.2}
        rotationIntensity={0.12}
        floatIntensity={0.3}
      >
        <Dashboard />
      </Float>

      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.3}
        scale={8}
        blur={2}
      />

      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        rotateSpeed={0.45}
      />
    </>
  );
}

export default function HeroScene({ onReady }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 8], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      onCreated={() => onReady?.()}
      fallback={<div className="scene-fallback">Financial visualization</div>}
    >
      <Scene />
    </Canvas>
  );
}
