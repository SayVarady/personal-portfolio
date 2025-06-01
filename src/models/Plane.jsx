import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import Plane from '../assets/3D/plane.glb'

const Plane = () => {
    const { scene, animations } = useGLTF(Plane);
    return (
        <mesh>
            <primitive object={scene} />
        </mesh>
    )
}

export default Plane;

