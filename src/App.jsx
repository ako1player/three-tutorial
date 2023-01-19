import './App.css'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Three from './component/three'

function App() {

  return (
    <Canvas id="three-canvas-container" shadows>
      <Suspense fallback={null}>
        <Three />
      </Suspense>
    </Canvas>
  )
}

export default App
