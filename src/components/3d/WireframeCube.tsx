'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function Cube() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (hovered ? 1.5 : 0.5)
      meshRef.current.rotation.y += delta * (hovered ? 1.5 : 0.5)
      
      // Gentle floating
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hovered ? 1.2 : 1}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#ef4444" wireframe />
    </mesh>
  )
}

export default function WireframeCube() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Cube />
      </Canvas>
    </div>
  )
}
