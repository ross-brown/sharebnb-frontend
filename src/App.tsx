// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import RoutesList from './RoutesList';

function App() {

  return (
    <div>
      <h1>Test</h1>
      <BrowserRouter>
      <RoutesList/>
      </BrowserRouter>
    </div>
  )
}

export default App
