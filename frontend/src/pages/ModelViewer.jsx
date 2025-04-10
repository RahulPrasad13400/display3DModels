import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { Matilda } from '../components/3dModels/Matilda'

export default function ModelPage() {
  return (  
        <div className='h-[850px]'>
            <Canvas>
                <PerspectiveCamera makeDefault fov={75} position={[0,0,350]} />
                <CameraControls />
                <Suspense>
                    <Matilda />
                </Suspense>
                <ambientLight intensity={1} />
                <Environment preset='city' />
            </Canvas>
         </div>
  )
}       


