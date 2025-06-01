import { useState,Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader"
import Island from "../models/Island";
import Atmosphere from "../models/Atmosphere";
import Bird from "../models/Bird";

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);

    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        const screenPosition = [-5, -5, -50];
        const rotation = [0.3, -15, 0];
        
        if(window.innerWidth < 768) {            
            screenScale = [0.06, 0.06, 0.06];
        } else {
            screenScale = [0.1, 0.09, 0.09];
        }
        return  [ screenScale, screenPosition, rotation];
    }
    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

    const adjustBirdForScreenSize = () => {
        let screenScale, screenPosition;
        // position={[3, -1, -4]} scale={[0.003, 0.003, 0.003]}

        if(window.innerWidth < 768) {
            screenScale = [0.003, 0.003, 0.003];
            screenPosition = [1, 1, 1];
        } else {
            screenScale = [0.003, 0.003, 0.003];
            screenPosition = [3, -1, -4];
        } 
        return [screenScale, screenPosition];
    }
    const [birdScale, birdPosition] = adjustBirdForScreenSize();


    return (
        <section className="w-full h-screen relative">
            <Canvas 
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{near: 0.1, far: 1000}}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5}/>
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#ffffff" intensity={1}/>

                    {/* <Bird 
                        scale={birdScale}
                        position={birdPosition}
                        // rotation={birdRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                    /> */}
                    <Atmosphere isRotating={isRotating} />
                    <Island 
                        scale={islandScale}
                        position={islandPosition}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                </Suspense>
            </Canvas>   
        </section>
    )
}

export default Home;