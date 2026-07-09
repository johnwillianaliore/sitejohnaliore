import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles } from '@react-three/drei'

const BODY = '#1c1c22'
const ACCENT = '#a3ff12'

function Fin({ angle }) {
  return (
    <group rotation={[0, angle, 0]}>
      <mesh position={[0.55, -1.05, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.55, 0.7, 0.06]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.25}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}

function Flame() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const flicker = 1 + Math.sin(t * 18) * 0.15 + Math.sin(t * 7.3) * 0.1
    ref.current.scale.set(flicker * 0.9, flicker, flicker * 0.9)
    ref.current.material.opacity = 0.55 + Math.sin(t * 22) * 0.15
  })
  return (
    <mesh ref={ref} position={[0, -1.95, 0]} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[0.28, 0.9, 16, 1, true]} />
      <meshBasicMaterial color={ACCENT} transparent opacity={0.6} />
    </mesh>
  )
}

function Rocket() {
  const rocket = useRef()
  const shell = useRef()
  const fins = useMemo(() => [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3], [])

  useFrame((state, delta) => {
    const { x, y } = state.pointer
    if (rocket.current) {
      // inclina suavemente em direção ao ponteiro
      rocket.current.rotation.z += (-x * 0.25 - rocket.current.rotation.z) * 0.05
      rocket.current.rotation.x += (y * 0.2 - rocket.current.rotation.x) * 0.05
    }
    if (shell.current) {
      shell.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={0.25} floatIntensity={0.9}>
        <group ref={rocket}>
          {/* nariz */}
          <mesh position={[0, 1.35, 0]}>
            <coneGeometry args={[0.42, 0.9, 32]} />
            <meshStandardMaterial
              color={ACCENT}
              emissive={ACCENT}
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>

          {/* corpo */}
          <mesh>
            <cylinderGeometry args={[0.42, 0.48, 1.9, 32]} />
            <meshStandardMaterial color={BODY} metalness={0.9} roughness={0.2} />
          </mesh>

          {/* malha "digital" sobre o corpo */}
          <mesh scale={1.012}>
            <cylinderGeometry args={[0.42, 0.48, 1.9, 16, 6]} />
            <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.14} />
          </mesh>

          {/* janela */}
          <mesh position={[0, 0.45, 0.42]} rotation={[Math.PI / 2.6, 0, 0]}>
            <torusGeometry args={[0.16, 0.045, 12, 32]} />
            <meshStandardMaterial
              color={ACCENT}
              emissive={ACCENT}
              emissiveIntensity={0.5}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>

          {/* aletas */}
          {fins.map((a) => (
            <Fin key={a} angle={a} />
          ))}

          {/* bocal do motor */}
          <mesh position={[0, -1.15, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 0.45, 32]} />
            <meshStandardMaterial color="#0d0d10" metalness={0.95} roughness={0.35} />
          </mesh>

          <Flame />
          <pointLight position={[0, -1.8, 0]} intensity={2} color={ACCENT} distance={3} />
        </group>
      </Float>

      {/* casca orbital wireframe */}
      <mesh ref={shell} scale={2.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.07} />
      </mesh>

      <Sparkles count={70} scale={7} size={2} speed={0.4} color={ACCENT} />
    </group>
  )
}

export default function HeroCore() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 6.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} />
        <directionalLight position={[-5, 2, -3]} intensity={0.5} color={ACCENT} />
        <Rocket />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </Canvas>
  )
}
