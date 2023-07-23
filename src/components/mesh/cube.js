import { useRef, useState, useMemo, forwardRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Color } from "three"
import { createCubeGrid } from "utils/cube"

export function GlassCube({ position, zoomCompleted }) {
   const ref = useRef()
   const black = useMemo(() => new Color("black"), [])
   const orange = useMemo(() => new Color("orange"), [])
   const [hovered, setHovered] = useState(false)

   useFrame(({ mouse, viewport }) => {
      if (zoomCompleted) {
         const x = (mouse.x * viewport.width) / 2.5
         const y = (mouse.y * viewport.height) / 2.5
         const thresholdDistance = 2

         const distance = Math.sqrt(Math.pow(position[0] - x, 1) + Math.pow(position[1] - y, 1))

         if (distance < thresholdDistance) {
            ref.current.lookAt(x, y, 1)
            ref.current.material.color.lerp(hovered ? orange : black, 0.05)
         } else {
            ref.current.rotation.set(0, 0, 0)
            ref.current.material.color.lerp(black, 0.05)
         }
      }
   })

   return (
      <mesh ref={ref} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} position={position}>
         <boxGeometry />
         <meshPhysicalMaterial
            metalness={0.2}
            roughness={0.1}
            transparent={true}
            transmission={0.9}
            opacity={0.2}
            envMapIntensity={1.0}
            reflectivity={0.5}
            clearcoat={0.2}
            clearcoatRoughness={0.1}
         />
      </mesh>
   )
}

export const CubeGroup = forwardRef(({ zoomCompleted }, ref) => {
   const cubeGrid = createCubeGrid()

   return (
      /* rotation={[0, Math.PI / 4, Math.PI / 4]} 다이아몬드 방향 */
      <group rotation={[0, Math.PI / 4, Math.PI / 4]} ref={ref}>
         {cubeGrid.map(({ position }, index) => (
            <GlassCube key={index} position={position} zoomCompleted={zoomCompleted} />
         ))}
      </group>
   )
})
