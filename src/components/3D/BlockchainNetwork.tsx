// src/components/3D/BlockchainNetwork.tsx

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, BufferGeometry, Float32BufferAttribute } from 'three';

interface BlockchainNetworkProps {
  scale?: number;
  colorScheme?: 'blue' | 'purple' | 'pink';
}

export const BlockchainNetwork: React.FC<BlockchainNetworkProps> = React.memo(({ 
  scale = 1, 
  colorScheme = 'blue' 
}) => {
  const groupRef = useRef<Group>(null);
  const nodesRef = useRef<Mesh[]>([]);
  const innerNodesRef = useRef<Mesh[]>([]);
  const ringRef = useRef<Mesh>(null);
  const orbitRef = useRef<Group>(null);

  // ─── Color configuration ───
  const colorSets = {
    blue: { main: '#3b82f6', light: '#60a5fa', glow: '#1d4ed8' },
    purple: { main: '#8b5cf6', light: '#a78bfa', glow: '#7c3aed' },
    pink: { main: '#ec4899', light: '#f472b6', glow: '#db2777' },
  };

  const colors = colorSets[colorScheme];

  // ─── Create geometries once with useMemo ───
  const geometries = useMemo(() => {
    return {
      sphere: new Float32Array([0.4, 32, 32]),
      tetrahedron: new Float32Array([0.15]),
      octahedron: new Float32Array([0.25]),
      torus: new Float32Array([4.8, 0.015, 16, 100]),
      innerTorus: new Float32Array([2.4, 0.012, 16, 100]),
    };
  }, []);

  // ─── Node positions ───
  const outerNodes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      return {
        position: [Math.cos(angle) * 4.5, 0, Math.sin(angle) * 4.5] as [number, number, number],
        index: i,
        color: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#ec4899',
      };
    });
  }, []);

  const innerNodes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
      return {
        position: [Math.cos(angle) * 2.2, 0, Math.sin(angle) * 2.2] as [number, number, number],
        index: i,
        color: i % 2 === 0 ? '#60a5fa' : '#a78bfa',
      };
    });
  }, []);

  // ─── Orbiting particles ───
  const orbitParticles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 3;
      const height = (Math.random() - 0.5) * 2;
      const speed = 0.2 + Math.random() * 0.3;
      const phase = Math.random() * Math.PI * 2;
      return { angle, radius, height, speed, phase };
    });
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // ─── Group rotation ───
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.15;
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
    }

    // ─── Outer nodes ───
    nodesRef.current.forEach((node, index) => {
      if (node) {
        const offset = index * 0.4;
        node.position.y = Math.sin(time * 0.6 + offset) * 0.8;
        const pulse = 1 + Math.sin(time * 1.5 + offset) * 0.12;
        node.scale.set(pulse, pulse, pulse);
        node.rotation.x += 0.008;
        node.rotation.y += 0.012;
        node.rotation.z += 0.005;
      }
    });

    // ─── Inner nodes ───
    innerNodesRef.current.forEach((node, index) => {
      if (node) {
        const offset = index * 0.35;
        node.position.y = Math.cos(time * 1.0 + offset) * 0.5;
        node.rotation.x += 0.015;
        node.rotation.z += 0.01;
        const pulse = 1 + Math.sin(time * 1.8 + offset) * 0.08;
        node.scale.set(pulse, pulse, pulse);
      }
    });

    // ─── Orbiting ring rotation ───
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.1;
      ringRef.current.rotation.x = Math.sin(time * 0.15) * 0.1;
    }

    // ─── Orbit particles ───
    if (orbitRef.current) {
      orbitRef.current.rotation.y = time * 0.05;
      orbitRef.current.children.forEach((child, i) => {
        const data = orbitParticles[i];
        if (data) {
          const angle = data.angle + time * data.speed;
          const x = Math.cos(angle) * data.radius;
          const z = Math.sin(angle) * data.radius;
          const y = Math.sin(time * 0.5 + data.phase) * data.height;
          child.position.set(x, y, z);
          const s = 1 + Math.sin(time * 1.2 + data.phase) * 0.3;
          child.scale.set(s, s, s);
        }
      });
    }
  });

  return (
    <group ref={groupRef} scale={scale}>

      {/* ─── Center Core ─── */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={colors.main}
          emissive={colors.main}
          emissiveIntensity={1.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Core glow ring */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          color={colors.main}
          opacity={0.15}
          transparent
          wireframe
        />
      </mesh>

      {/* Secondary glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshBasicMaterial
          color={colors.light}
          opacity={0.06}
          transparent
          wireframe
        />
      </mesh>

      {/* ─── Inner Nodes ─── */}
      {innerNodes.map((node, i) => (
        <group key={`inner-${i}`} position={node.position}>
          <mesh ref={(el) => el && (innerNodesRef.current[i] = el)}>
            <tetrahedronGeometry args={[0.18]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.4}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>

          {/* Inner node glow */}
          <mesh>
            <tetrahedronGeometry args={[0.22]} />
            <meshBasicMaterial
              color={node.color}
              opacity={0.15}
              transparent
              wireframe
            />
          </mesh>

          {/* Connection to center */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  0, 0, 0,
                  -node.position[0], -node.position[1], -node.position[2]
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={node.color}
              opacity={0.25}
              transparent
            />
          </line>
        </group>
      ))}

      {/* ─── Outer Nodes ─── */}
      {outerNodes.map((node, i) => (
        <group key={`outer-${i}`} position={node.position}>
          {/* Main node */}
          <mesh ref={(el) => el && (nodesRef.current[i] = el)}>
            <octahedronGeometry args={[0.28]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Outer glow */}
          <mesh>
            <octahedronGeometry args={[0.35]} />
            <meshBasicMaterial
              color={node.color}
              opacity={0.12}
              transparent
              wireframe
            />
          </mesh>

          {/* Connection to center */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  0, 0, 0,
                  -node.position[0], 0, -node.position[2]
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={node.color}
              opacity={0.3}
              transparent
            />
          </line>

          {/* Connection to adjacent nodes */}
          {i < outerNodes.length - 1 && (
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    0, 0, 0,
                    outerNodes[i + 1].position[0] - node.position[0],
                    0,
                    outerNodes[i + 1].position[2] - node.position[2]
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color="#60a5fa"
                opacity={0.2}
                transparent
              />
            </line>
          )}
        </group>
      ))}

      {/* Connection from last to first node */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([
              outerNodes[outerNodes.length - 1].position[0],
              0,
              outerNodes[outerNodes.length - 1].position[2],
              outerNodes[0].position[0],
              0,
              outerNodes[0].position[2]
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#60a5fa" opacity={0.2} transparent />
      </line>

      {/* ─── Orbital Rings ─── */}
      <mesh ref={ringRef}>
        <torusGeometry args={[4.8, 0.015, 16, 100]} />
        <meshBasicMaterial
          color={colors.light}
          opacity={0.25}
          transparent
        />
      </mesh>

      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[4.8, 0.01, 16, 100]} />
        <meshBasicMaterial
          color="#a78bfa"
          opacity={0.15}
          transparent
        />
      </mesh>

      <mesh rotation={[0, Math.PI / 3, Math.PI / 4]}>
        <torusGeometry args={[4.2, 0.008, 16, 100]} />
        <meshBasicMaterial
          color={colors.glow}
          opacity={0.12}
          transparent
        />
      </mesh>

      {/* Inner ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.012, 16, 100]} />
        <meshBasicMaterial
          color="#a78bfa"
          opacity={0.2}
          transparent
        />
      </mesh>

      {/* ─── Orbiting Particles ─── */}
      <group ref={orbitRef}>
        {orbitParticles.map((_, i) => (
          <mesh key={`orbit-${i}`}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#ec4899'}
              opacity={0.6 + Math.random() * 0.3}
              transparent
            />
          </mesh>
        ))}
      </group>

      {/* ─── Ambient Particles (static background) ─── */}
      {Array.from({ length: 40 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 4;
        const height = (Math.random() - 0.5) * 6;
        const size = 0.03 + Math.random() * 0.04;
        return (
          <mesh
            key={`ambient-${i}`}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[size, 4, 4]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#ec4899'}
              opacity={0.3 + Math.random() * 0.3}
              transparent
            />
          </mesh>
        );
      })}
    </group>
  );
});

BlockchainNetwork.displayName = 'BlockchainNetwork';