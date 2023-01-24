import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, CameraShake, useCursor, useGLTF } from '@react-three/drei'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { LayerMaterial, Depth, Fresnel } from 'lamina'
import { AsciiEffect } from 'three-stdlib'
import * as THREE from 'three'

export default function Scene({ children, ...props }) {
  return (
    <Canvas {...props} camera={{ position: [0, 10, 0] }}>
      <Suspense fallback={null}>
        <color attach="background" args={['black']} />
        {/* <CameraShake
          yawFrequency={1}
          maxYaw={0.05}
          pitchFrequency={1}
          maxPitch={0.05}
          rollFrequency={0.5}
          maxRoll={0.5}
          intensity={0.5}
        /> */}
        <spotLight position={[10, 10, 10]} angle={0.45} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} />
        <ambientLight intensity={0.4} />
        <Model />
        {/* <Torusknot /> */}
      </Suspense>

      {/* <OrbitControls /> */}
      <Rig />
      {/* <Model /> */}
      <AsciiRenderer fgColor="white" bgColor="black" />
    </Canvas>
  )
}

// Mouse-camera movement
const Rig = () => {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()
  return useFrame(() =>
    camera.position.lerp(vec.set(mouse.x * 2, 10 + mouse.y * 1, camera.position.z), 0.02)
  )
}

function Model(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/banana.glb')

  useFrame((state, delta) => {
    ref.current.rotation.x = ref.current.rotation.y += delta / 5
    ref.current.rotation.y = ref.current.rotation.x += delta / 5
  })

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {/* <group rotation={[Math.PI / 2, 0, 0]}> */}
        <group scale={0.34}>
          <mesh ref={ref} geometry={nodes.Banana_Banana_0.geometry} material={materials.Banana} />
        </group>
        {/* </group> */}
      </group>
    </group>
  )
}

// function Torusknot(props) {
//   const ref = useRef()
//   const layerRef = useRef()
//   const gradient = 0.7
//   useFrame((state, delta) => {
//     ref.current.rotation.x = ref.current.rotation.y += delta / 5
//     // console.log(state.mouse.x)
//   })
//   return (
//     <mesh {...props} ref={ref} frustumCulled={false}>
//       <torusKnotGeometry args={[1, 0.2, 128, 32]} />
//       <LayerMaterial ref={layerRef} toneMapped={false}>
//         <Depth colorA="#ff0080" colorB="black" alpha={1} mode="normal" near={0.5 * gradient} far={0.5} origin={[0, 0, 0]} />
//         <Depth colorA="blue" colorB="#f7b955" alpha={1} mode="add" near={2 * gradient} far={2} origin={[0, 1, 1]} />
//         <Depth colorA="green" colorB="#f7b955" alpha={1} mode="add" near={3 * gradient} far={3} origin={[0, 1, -1]} />
//         <Depth colorA="white" colorB="red" alpha={1} mode="overlay" near={1.5 * gradient} far={1.5} origin={[1, -1, -1]} />
//         {/* <Fresnel mode="add" color="white" intensity={0.5} power={1.5} bias={0.05} /> */}
//       </LayerMaterial>
//     </mesh>
//   )
// }

function AsciiRenderer({
  renderIndex = 1,
  bgColor = 'black',
  fgColor = 'white',
  // characters = ' .:-+*=%@#',
  characters = ' .:-+*=%@#AWESOMES',
  invert = true,
  color = false,
  resolution = 0.15,
}) {
  // Reactive state
  const { size, gl, scene, camera } = useThree()

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, { invert, color, resolution })
    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.pointerEvents = 'none'
    return effect
  }, [characters, invert, color, resolution])

  // // Styling
  // useLayoutEffect(() => {
  //   effect.domElement.style.color = fgColor
  //   effect.domElement.style.backgroundColor = bgColor
  // }, [fgColor, bgColor])

  // Append on mount, remove on unmount
  useEffect(() => {
    gl.domElement.style.opacity = '0'
    gl.domElement.parentNode.appendChild(effect.domElement)
    return () => {
      gl.domElement.style.opacity = '1'
      gl.domElement.parentNode.removeChild(effect.domElement)
    }
  }, [effect])

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height)
  }, [effect, size])

  // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera)
  }, renderIndex)

  // This component returns nothing, it is a purely logical
  return null
}
