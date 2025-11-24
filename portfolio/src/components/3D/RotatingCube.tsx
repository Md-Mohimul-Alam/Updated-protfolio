// src/components/3D/RotatingCube.tsx

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, BoxGeometry, EdgesGeometry } from 'three';

interface RotatingCubeProps {
  scale?: number;
  speed?: number;
}

export const RotatingCube: React.FC<RotatingCubeProps> = ({ scale = 1, speed = 0.01 }) => {
  const meshRef = useRef<Mesh>(null);
  const wireframeRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.x = time * speed * 0.8;
      meshRef.current.rotation.y = time * speed * 1.2;
      meshRef.current.rotation.z = time * speed * 0.5;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * speed * 1.2;
      wireframeRef.current.rotation.y = -time * speed * 0.8;
      wireframeRef.current.rotation.z = time * speed * 0.3;
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(time * 2) * 0.1;
      glowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  // Pre-create geometry for edges (no global THREE usage)
  const boxGeo = new BoxGeometry(2 * scale, 2 * scale, 2 * scale);
  const edgesGeo = new EdgesGeometry(boxGeo);

  return (
    <group>
      {/* Main solid cube */}
      <mesh ref={meshRef} scale={scale}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Outer wireframe cube */}
      <mesh ref={wireframeRef} scale={scale * 1.15}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial wireframe color="#60a5fa" opacity={0.4} transparent />
      </mesh>

      {/* Inner wireframe glow */}
      <mesh scale={scale * 0.85}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial wireframe color="#a78bfa" opacity={0.3} transparent />
      </mesh>

      {/* Pulsing outer glow */}
      <mesh ref={glowRef} scale={scale * 1.3}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial wireframe color="#00d4ff" opacity={0.15} transparent />
      </mesh>

      {/* Corner particles */}
      {[
        [1, 1, 1],
        [1, 1, -1],
        [1, -1, 1],
        [1, -1, -1],
        [-1, 1, 1],
        [-1, 1, -1],
        [-1, -1, 1],
        [-1, -1, -1],
      ].map((pos, i) => (
        <mesh key={i} position={[pos[0] * scale, pos[1] * scale, pos[2] * scale]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#00d4ff" opacity={0.8} transparent />
        </mesh>
      ))}

      {/* Edge lines (using imported geometries, no global THREE) */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="#4da6ff" opacity={0.6} transparent />
      </lineSegments>

      {/* Rotating orbital rings */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[2.2 * scale, 0.02, 16, 100]} />
        <meshBasicMaterial color="#60a5fa" opacity={0.4} transparent />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2 * scale, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" opacity={0.3} transparent />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.2 * scale, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00d4ff" opacity={0.35} transparent />
      </mesh>
    </group>
  );
};
