// src/components/3D/BlockchainNetwork.tsx

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';

interface BlockchainNetworkProps {
  scale?: number;
}

export const BlockchainNetwork: React.FC<BlockchainNetworkProps> = ({ scale = 1 }) => {
  const groupRef = useRef<Group>(null);
  const nodesRef = useRef<Mesh[]>([]);
  const innerNodesRef = useRef<Mesh[]>([]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (groupRef.current) {
      // Smooth rotation with sine wave
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      groupRef.current.rotation.y += 0.005;
    }

    // Animate outer nodes with floating and pulsing
    nodesRef.current.forEach((node, index) => {
      if (node) {
        const offset = index * 0.5;
        
        // Floating animation
        node.position.y = Math.sin(time * 0.8 + offset) * 0.8;
        
        // Pulsing scale animation
        const pulse = 1 + Math.sin(time * 2 + offset) * 0.15;
        node.scale.set(pulse, pulse, pulse);
        
        // Rotation
        node.rotation.x += 0.01;
        node.rotation.y += 0.015;
      }
    });

    // Animate inner ring nodes
    innerNodesRef.current.forEach((node, index) => {
      if (node) {
        const offset = index * 0.3;
        node.position.y = Math.cos(time * 1.2 + offset) * 0.4;
        node.rotation.x += 0.02;
        node.rotation.z += 0.01;
      }
    });
  });

  // Create outer nodes in a circular pattern
  const outerNodes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return {
      position: [Math.cos(angle) * 4, 0, Math.sin(angle) * 4],
      index: i,
    };
  });

  // Create inner ring nodes
  const innerNodes = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2;
    return {
      position: [Math.cos(angle) * 2, 0, Math.sin(angle) * 2],
      index: i,
    };
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Ambient particles */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 3 + Math.random() * 3;
        return (
          <mesh 
            key={`particle-${i}`}
            position={[
              Math.cos(angle) * radius,
              (Math.random() - 0.5) * 5,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#4da6ff" opacity={0.6} transparent />
          </mesh>
        );
      })}

      {/* Center core - pulsing sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color="#00d4ff" 
          emissive="#00d4ff" 
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Inner glow ring */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial 
          color="#00d4ff" 
          opacity={0.2} 
          transparent 
          wireframe 
        />
      </mesh>

      {/* Inner ring nodes */}
      {innerNodes.map((node, i) => (
        <group key={`inner-${i}`} position={node.position as [number, number, number]}>
          <mesh ref={(el) => el && (innerNodesRef.current[i] = el)}>
            <tetrahedronGeometry args={[0.15]} />
            <meshStandardMaterial 
              color="#a78bfa" 
              emissive="#a78bfa"
              emissiveIntensity={0.5}
              metalness={0.6}
            />
          </mesh>
          
          {/* Inner connection to center */}
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
            <lineBasicMaterial color="#a78bfa" opacity={0.4} transparent />
          </line>
        </group>
      ))}

      {/* Outer nodes */}
      {outerNodes.map((node, i) => (
        <group key={`outer-${i}`} position={node.position as [number, number, number]}>
          {/* Main node */}
          <mesh ref={(el) => el && (nodesRef.current[i] = el)}>
            <octahedronGeometry args={[0.25]} />
            <meshStandardMaterial 
              color="#00d4ff" 
              emissive="#00d4ff"
              emissiveIntensity={0.6}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Outer glow */}
          <mesh>
            <octahedronGeometry args={[0.3]} />
            <meshBasicMaterial 
              color="#00d4ff" 
              opacity={0.15} 
              transparent 
              wireframe 
            />
          </mesh>

          {/* Connection line to center */}
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
              color="#4da6ff" 
              opacity={0.5} 
              transparent 
              linewidth={2}
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
                opacity={0.3} 
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
        <lineBasicMaterial color="#60a5fa" opacity={0.3} transparent />
      </line>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#4da6ff" opacity={0.3} transparent />
      </mesh>

      {/* Inner ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" opacity={0.25} transparent />
      </mesh>
    </group>
  );
};
