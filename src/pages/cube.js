import { useRef, useState, useEffect } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Vector3 } from "three"
import { gsap } from "gsap"
import { CubeGroup } from "components/mesh/cube"

function Rig({ groupRef, onZoomComplete }) {
   const { camera, mouse } = useThree()
   useEffect(() => {
      gsap.fromTo(
         camera,
         {
            zoom: 2
         },
         {
            duration: 2,
            zoom: 1,
            onUpdate: function () {
               camera.updateProjectionMatrix()
            },
            onComplete: function () {
               onZoomComplete()
            }
         }
      )
   }, [])

   const vec = new Vector3()
   return useFrame((_, delta) => {
      // camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.05)
      // camera.lookAt(0, 0, 0)
      groupRef.current.rotation.y += 0.1 * delta
   })
}

export default function App() {
   const groupRef = useRef()
   const [zoomCompleted, setZoomCompleted] = useState(false)
   const handleZoomComplete = () => {
      setZoomCompleted(true)
   }

   return (
      <Canvas camera={{ position: [0, 2, 10] }} style={{ height: "100vh" }}>
         <directionalLight position={[0, 0, 1]} />
         <CubeGroup ref={groupRef} zoomCompleted={zoomCompleted} />
         <Rig groupRef={groupRef} onZoomComplete={handleZoomComplete} />
      </Canvas>
   )
}
