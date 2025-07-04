/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Artjoms Horosilovs (https://sketchfab.com/Artjoms_Horosilovs)
License: CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)
Source: https://sketchfab.com/3d-models/sea-keep-lonely-watcher-09a15a0c14cb4accaf060a92bc70413d
Title: Sea Keep "Lonely Watcher"
*/

import { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { a } from '@react-spring/three'
import sea_keep_lonely_watcher from '../assets/3D/sea_keep_lonely_watcher.glb'


const Island = ({isRotating, setIsRotating, setCurrentStage, ...props}) => {
  const islandRef = useRef();

  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(sea_keep_lonely_watcher)

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dumpingFactor = 0.95;

  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    lastX.current = event.touches ? event.touches[0].clientX : event.clientX;
  }

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);    
  }

  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if(isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      islandRef.current.rotation.y += delta * Math.PI * 0.01;
      lastX.current = clientX;

      rotationSpeed.current = delta * Math.PI * 0.01;
    }

  }

  const handleKeyDown = (event) => {
    if(event.key === "ArrowLeft") {
      if(!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.01 * Math.PI;
    } else if(event.key === "ArrowRight") {
      if(!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= 0.01 * Math.PI;
    }
  }

  const handleKeyUp = (event) => {
    if(event.key === "ArrowLeft" || event.key === "ArrowRight") setIsRotating(false);
  }

  useFrame(() => {
    if(!isRotating) {
      rotationSpeed.current *= dumpingFactor;
      
      if(Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;

      const normalizedRotation = ((rotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI));
      
      switch(true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;

    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }

  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  return (
    <a.group ref={islandRef} {...props}>
      <a.group position={[17.117, 218.356, 23.591]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <a.group position={[33.745, 38.713, -60.289]}>
          <mesh
            geometry={nodes.Fortress_Fortress_0.geometry}
            material={materials.Fortress}
          />
          <mesh
            geometry={nodes.Fortress_Fortress_0_1.geometry}
            material={materials.Fortress}
          />
          <mesh
            geometry={nodes.Fortress_Fortress_0_2.geometry}
            material={materials.Fortress}
          />
          <mesh
            geometry={nodes.Fortress_Environment_0.geometry}
            material={materials.Environment}
          />
          <mesh
            geometry={nodes.Fortress_Sand_0.geometry}
            material={materials.Sand}
          />
        </a.group>
      </a.group>
      <mesh
        geometry={nodes.Sea_Sea_0.geometry}
        material={materials.material}
        position={[-1.388, 326.224, 14.92]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      {/* <mesh
        geometry={nodes.Sky_Sky_0.geometry}
        material={materials.material_4}
        rotation={[-Math.PI / 2, 0, 0]}
      /> */}
    </a.group>
  )
}

// useGLTF.preload('/sea_keep_lonely_watcher.glb')

export default Island;
