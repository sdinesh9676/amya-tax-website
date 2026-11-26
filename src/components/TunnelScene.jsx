
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

function TunnelFrame({ position }) {
  return (
    <group position={position}>
      {/* Top beam */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[8, 0.12, 0.16]} />
        <meshStandardMaterial
          color="#9c6bd0"
          metalness={0.8}
          roughness={0.2}
          emissive="#54247d"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Bottom beam */}
      <mesh position={[0, -2.5, 0]}>
        <boxGeometry args={[8, 0.12, 0.16]} />
        <meshStandardMaterial
          color="#9c6bd0"
          metalness={0.8}
          roughness={0.2}
          emissive="#54247d"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Left and right beams */}
      {[-4, 4].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.12, 5, 0.16]} />
          <meshStandardMaterial
            color="#9c6bd0"
            metalness={0.8}
            roughness={0.2}
            emissive="#54247d"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Gold light strips */}
      <mesh position={[0, -2.4, 0]}>
        <boxGeometry args={[7.5, 0.025, 0.025]} />
        <meshBasicMaterial color="#eeb32b" />
      </mesh>
    </group>
  );
}

function Tunnel({ onReady }) {
  const { camera } = useThree();
  const lightRef = useRef();
  const scrollProgress = useRef(0);
  const elapsed = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );

      scrollProgress.current = THREE.MathUtils.clamp(
        window.scrollY / maxScroll,
        0,
        1
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    onReady?.();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onReady]);

  // Three.js requires imperative camera updates inside useFrame.
  /* eslint-disable react-hooks/immutability */
  useFrame((state, delta) => {
    elapsed.current += delta;

    // Scroll moves the camera forward through the tunnel.
    const scrollDistance = scrollProgress.current * 38;

    // Gentle automatic forward movement.
    const automaticMovement = Math.min(elapsed.current * 0.12, 5);

    const targetZ = 7 - scrollDistance - automaticMovement;

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      2.5,
      delta
    );

    // Subtle camera movement.
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      Math.sin(elapsed.current * 0.35) * 0.12,
      1.5,
      delta
    );

    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      Math.sin(elapsed.current * 0.5) * 0.08,
      1.5,
      delta
    );

    camera.lookAt(camera.position.x * 0.2, 0, camera.position.z - 10);

    // Animate the gold and purple lighting.
    if (lightRef.current) {
      lightRef.current.intensity =
        28 + Math.sin(elapsed.current * 1.5) * 8;
    }
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <>
      <ambientLight intensity={1.1} />

      <pointLight
        position={[0, 2, 4]}
        intensity={25}
        color="#c9a7ff"
      />

      <pointLight
        ref={lightRef}
        position={[0, -1, -12]}
        intensity={28}
        color="#eeb32b"
      />

      {Array.from({ length: 20 }, (_, i) => (
        <TunnelFrame
          key={i}
          position={[0, 0, -i * 3]}
        />
      ))}

      {/* Tunnel floor */}
      <mesh position={[0, -2.65, -28]}>
        <boxGeometry args={[8, 0.12, 65]} />
        <meshStandardMaterial
          color="#21152f"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Tunnel ceiling */}
      <mesh position={[0, 2.65, -28]}>
        <boxGeometry args={[8, 0.12, 65]} />
        <meshStandardMaterial
          color="#21152f"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </>
  );
}

export default function TunnelScene({ onReady }) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: 65,
        near: 0.1,
        far: 150,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <Suspense fallback={null}>
        <Tunnel onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
