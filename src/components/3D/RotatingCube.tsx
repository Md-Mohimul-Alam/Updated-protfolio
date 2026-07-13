// src/components/3D/RotatingCube.tsx

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, BoxGeometry, EdgesGeometry, Group, SphereGeometry, Vector3 } from 'three';

interface RotatingCubeProps {
  scale?: number;
  speed?: number;
  colorScheme?: 'blue' | 'purple' | 'pink' | 'rainbow' | 'neon';
}

export const RotatingCube: React.FC<RotatingCubeProps> = React.memo(({
  scale = 1,
  speed = 0.015,
  colorScheme = 'neon'
}) => {
  const meshRef = useRef<Mesh>(null);
  const wireframeRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const ringGroupRef = useRef<Group>(null);
  const particleGroupRef = useRef<Group>(null);
  const innerGlowRef = useRef<Mesh>(null);
  const sparkleRef = useRef<Group>(null);

  // ─── Enhanced Color configuration ───
  const colorSets = {
    blue: { main: '#3b82f6', light: '#60a5fa', glow: '#1d4ed8', accent: '#93c5fd', emissive: '#2563eb' },
    purple: { main: '#8b5cf6', light: '#a78bfa', glow: '#7c3aed', accent: '#c4b5fd', emissive: '#6d28d9' },
    pink: { main: '#ec4899', light: '#f472b6', glow: '#db2777', accent: '#f9a8d4', emissive: '#be185d' },
    rainbow: { main: '#3b82f6', light: '#8b5cf6', glow: '#ec4899', accent: '#f59e0b', emissive: '#3b82f6' },
    neon: { main: '#06ffa5', light: '#00ffcc', glow: '#00ff88', accent: '#7dffb3', emissive: '#00cc77' },
  };

  const colors = colorSets[colorScheme];
  const isRainbow = colorScheme === 'rainbow';
  const isNeon = colorScheme === 'neon';

  // ─── Pre-compute geometries ───
  const { boxGeo, edgesGeo } = useMemo(() => {
    const box = new BoxGeometry(2 * scale, 2 * scale, 2 * scale);
    const edges = new EdgesGeometry(box);
    return { boxGeo: box, edgesGeo: edges };
  }, [scale]);

  // ─── Orbiting particles ───
  const particleCount = 32;
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.6 + Math.random() * 0.8;
      const yOffset = (Math.random() - 0.5) * 2;
      const speedOffset = 0.3 + Math.random() * 0.5;
      const size = 0.04 + Math.random() * 0.06;
      return { angle, radius, yOffset, speedOffset, size };
    });
  }, []);

  // ─── Sparkle particles ───
  const sparkles = useMemo(() => {
    return Array.from({ length: 16 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 1.8 + Math.random() * 1.2,
      yOffset: (Math.random() - 0.5) * 2.5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.5,
    }));
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // ─── Main cube ───
    if (meshRef.current) {
      meshRef.current.rotation.x = time * speed * 0.7 + Math.sin(time * 0.3) * 0.1;
      meshRef.current.rotation.y = time * speed * 1.3;
      meshRef.current.rotation.z = time * speed * 0.5;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.5;

      // Dynamic emissive intensity pulsing
      const pulse = 0.6 + Math.sin(time * 1.8) * 0.4;
      (meshRef.current.material as any).emissiveIntensity = pulse;
    }

    // ─── Wireframe ───
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * speed * 0.9 + Math.sin(time * 0.2) * 0.05;
      wireframeRef.current.rotation.y = -time * speed * 0.7;
      wireframeRef.current.rotation.z = time * speed * 0.3;
      const pulse = 0.2 + Math.sin(time * 1.2) * 0.1;
      (wireframeRef.current.material as any).opacity = pulse;
    }

    // ─── Glow ring ───
    if (glowRef.current) {
      const pulse = 1 + Math.sin(time * 2.2) * 0.2;
      glowRef.current.scale.set(pulse, pulse, pulse);
      (glowRef.current.material as any).opacity = 0.15 + Math.sin(time * 1.5) * 0.08;
    }

    // ─── Inner glow ───
    if (innerGlowRef.current) {
      const pulse = 1 + Math.sin(time * 1.8) * 0.1;
      innerGlowRef.current.scale.set(pulse, pulse, pulse);
      (innerGlowRef.current.material as any).opacity = 0.08 + Math.sin(time * 1.3) * 0.04;
    }

    // ─── Orbital rings ───
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.x = time * 0.04 + Math.sin(time * 0.1) * 0.05;
      ringGroupRef.current.rotation.y = time * 0.06;
      ringGroupRef.current.rotation.z = time * 0.02;
    }

    // ─── Orbiting particles ───
    if (particleGroupRef.current) {
      particleGroupRef.current.children.forEach((child, i) => {
        const data = particles[i];
        if (data) {
          const angle = data.angle + time * 0.5 * data.speedOffset;
          const x = Math.cos(angle) * data.radius;
          const z = Math.sin(angle) * data.radius;
          const y = Math.sin(time * 0.7 + data.yOffset) * 1.0 + data.yOffset * 0.4;
          child.position.set(x, y, z);
          const s = 0.6 + Math.sin(time * 1.5 + i * 0.3) * 0.4;
          child.scale.set(s, s, s);
        }
      });
    }

    // ─── Sparkles ───
    if (sparkleRef.current) {
      sparkleRef.current.children.forEach((child, i) => {
        const data = sparkles[i];
        if (data) {
          const angle = data.angle + time * 0.3 * data.speed;
          const x = Math.cos(angle) * data.radius;
          const z = Math.sin(angle) * data.radius;
          const y = Math.sin(time * 0.8 + data.phase) * data.yOffset * 0.6;
          child.position.set(x, y, z);
          const pulse = 0.5 + Math.sin(time * 2 + data.phase) * 0.5;
          child.scale.set(pulse, pulse, pulse);
        }
      });
    }
  });

  // ─── Helper: get color at time ───
  const getColor = (t: number) => {
    if (isRainbow) {
      const hue = (t * 0.08) % 1;
      return `hsl(${hue * 360}, 90%, 65%)`;
    }
    return colors.main;
  };

  // ─── Helper: get glow color ───
  const getGlowColor = (t: number) => {
    if (isRainbow) {
      const hue = (t * 0.08 + 0.5) % 1;
      return `hsl(${hue * 360}, 100%, 70%)`;
    }
    return isNeon ? colors.glow : colors.glow;
  };

  const mainColor = isRainbow ? '#3b82f6' : colors.main;
  const glowColor = isRainbow ? '#8b5cf6' : colors.glow;
  const lightColor = isRainbow ? '#60a5fa' : colors.light;

  return (
    <group>
      {/* ─── Main Cube ─── */}
      <mesh ref={meshRef} scale={scale}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={mainColor}
          emissive={isNeon ? colors.emissive : mainColor}
          emissiveIntensity={1.2}
          metalness={0.95}
          roughness={0.08}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* ─── Inner glow core ─── */}
      <mesh ref={innerGlowRef} scale={scale * 0.6}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial
          color={isNeon ? '#ffffff' : colors.light}
          opacity={0.1}
          transparent
          wireframe
        />
      </mesh>

      {/* ─── Wireframe layers ─── */}
      <mesh ref={wireframeRef} scale={scale * 1.15}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial
          wireframe
          color={isNeon ? colors.accent : colors.light}
          opacity={0.35}
          transparent
        />
      </mesh>

      <mesh scale={scale * 0.85}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial
          wireframe
          color={isNeon ? colors.light : colors.light}
          opacity={0.15}
          transparent
        />
      </mesh>

      {/* ─── Pulsing glow ─── */}
      <mesh ref={glowRef} scale={scale * 1.5}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial
          wireframe
          color={glowColor}
          opacity={0.12}
          transparent
        />
      </mesh>

      {/* ─── Edge lines ─── */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial
          color={isNeon ? colors.accent : (isRainbow ? '#93c5fd' : colors.light)}
          opacity={isNeon ? 0.7 : 0.5}
          transparent
        />
      </lineSegments>

      {/* ─── Corner particles ─── */}
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
        <mesh
          key={`corner-${i}`}
          position={[pos[0] * scale * 1.15, pos[1] * scale * 1.15, pos[2] * scale * 1.15]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial
            color={isRainbow ? `hsl(${i * 45 + 20}, 90%, 70%)` : (isNeon ? colors.accent : colors.light)}
            opacity={0.9}
            transparent
          />
        </mesh>
      ))}

      {/* ─── Orbital rings ─── */}
      <group ref={ringGroupRef}>
        <mesh rotation={[0.4, 0.3, 0]}>
          <torusGeometry args={[2.5 * scale, 0.02, 16, 100]} />
          <meshBasicMaterial color={isNeon ? colors.accent : colors.light} opacity={0.4} transparent />
        </mesh>

        <mesh rotation={[1.0, 0.6, 0.4]}>
          <torusGeometry args={[2.7 * scale, 0.015, 16, 100]} />
          <meshBasicMaterial color={isNeon ? colors.light : colors.glow} opacity={0.3} transparent />
        </mesh>

        <mesh rotation={[0.2, 1.2, 0.8]}>
          <torusGeometry args={[2.3 * scale, 0.012, 16, 100]} />
          <meshBasicMaterial color={isNeon ? colors.main : colors.light} opacity={0.25} transparent />
        </mesh>

        <mesh rotation={[1.4, 0.1, 0.6]}>
          <torusGeometry args={[2.9 * scale, 0.008, 16, 100]} />
          <meshBasicMaterial color={isNeon ? colors.emissive : colors.glow} opacity={0.15} transparent />
        </mesh>
      </group>

      {/* ─── Orbiting particles ─── */}
      <group ref={particleGroupRef}>
        {particles.map((data, i) => (
          <mesh key={`particle-${i}`}>
            <sphereGeometry args={[data.size, 6, 6]} />
            <meshBasicMaterial
              color={
                isRainbow
                  ? `hsl(${i * 12 + 20}, 90%, 70%)`
                  : isNeon
                  ? i % 2 === 0
                    ? colors.accent
                    : colors.light
                  : colors.light
              }
              opacity={0.8}
              transparent
            />
          </mesh>
        ))}
      </group>

      {/* ─── Sparkle particles ─── */}
      <group ref={sparkleRef}>
        {sparkles.map((_, i) => (
          <mesh key={`sparkle-${i}`}>
            <sphereGeometry args={[0.025, 4, 4]} />
            <meshBasicMaterial
              color={isNeon ? '#ffffff' : colors.accent}
              opacity={0.6}
              transparent
            />
          </mesh>
        ))}
      </group>

      {/* ─── Ambient glow rings (static) ─── */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[3.2 * scale, 0.006, 8, 80]} />
        <meshBasicMaterial color={isNeon ? colors.emissive : colors.glow} opacity={0.06} transparent />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2 * scale, 0.006, 8, 80]} />
        <meshBasicMaterial color={isNeon ? colors.emissive : colors.glow} opacity={0.05} transparent />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.0 * scale, 0.004, 8, 80]} />
        <meshBasicMaterial color={isNeon ? colors.accent : colors.light} opacity={0.04} transparent />
      </mesh>
    </group>
  );
});

RotatingCube.displayName = 'RotatingCube';