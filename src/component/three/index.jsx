import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import { angleToRadians } from "../../utils/angle"
import * as THREE from 'three'
import gsap from 'gsap';

export default function Three(){

    //code to move the camera around
    const orbitControlsRef = useRef(null);
    useFrame((state)=>{
        if(!!orbitControlsRef.current){
            const {x,y} = state.mouse;
            orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
            orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30 ));
            orbitControlsRef.current.update();
        }
    })

    // useEffect(() => {
    //     if(!!orbitControlsRef.current){
    //         console.log(orbitControlsRef.current);
    //     }
    // }, [orbitControlsRef.current]);

    //Animation
    const ballRef = useRef(null);
    useEffect(() =>{
        if(!!ballRef.current){
            console.log(ballRef.current)

            //timeline
            const timeline = gsap.timeline();

            //x axis motion
            timeline.to(ballRef.current.position,{
                x: 1, 
                duration: 2,
                ease: "power2.out",
            },);
            
            //y axis motion
            timeline.to(ballRef.current.position, {
                y:0.5,
                duration: 1,
                ease: "bounce.out",
            }, "<");

            //play
            timeline.play();
        }
    },[ballRef.current])

    return(
        <>
            <PerspectiveCamera makeDefault position={[5,5,5]}/>
            <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)} />

            {/* Ball */}
            <mesh position={[-2,1.75,0]} castShadow ref={ballRef}>
                <sphereGeometry args={[0.5,32,32]}/>
                <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
            </mesh>

            {/* Floor */}
            <mesh rotation={[-(angleToRadians(90)),0,0]} receiveShadow>
                <planeGeometry args={[20, 20]} rotation={[]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh>

            {/* Ambient Light */}
            <ambientLight args={["#ffffff", 0.25]} />

            {/* spot Light */}
            <spotLight args={["#ffffff", 1.5, 8, angleToRadians(45), 0.4]} position={[-4, 1, 0]} castShadow/>
        
            {/* Environment */}
            <Environment background>
                <mesh>
                    <sphereGeometry args={[50,100,100]} />
                    <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
                </mesh>
            </Environment>

        </>
    )
}