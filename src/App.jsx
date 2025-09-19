import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
// import Banner from './components/Banner.jsx'

const App = () => {
  const isSellerPath = useLocation().pathname.includes('/seller');
  
  return (
    <div>
      {isSellerPath ? null : <Navbar/>}
      <div className={`${isSellerPath ? "": "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App