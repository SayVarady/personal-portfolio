import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import sky_pano from '../assets/3D/sky_pano.glb'
import { useFrame } from '@react-three/fiber';

const Atmosphere = ({isRotating}) => {
  const skyPano  = useGLTF(sky_pano);
  const skyRef = useRef();

  useFrame(( _, delta ) => {
    if(isRotating) {
      skyRef.current.rotation.y += 0.20 * delta;
    }
  });


  return (
    <mesh ref={skyRef}>
      <primitive object={skyPano.scene} scale={[10, 10, 15]}/>
    </mesh>
  )
}


export default Atmosphere;

