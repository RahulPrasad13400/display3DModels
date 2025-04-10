import React from 'react'
import Header from '../components/Header'
import ModelPage from './ModelViewer'

export default function Home() {
  return (
    <div>
        <Header />  
        <div>
            <ModelPage />
        </div>
    </div>
  )
}
