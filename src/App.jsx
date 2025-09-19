import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
// import Banner from './components/Banner.jsx'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const isSellerPath = useLocation().pathname.includes('/seller');
  
  return (
    <div>

      {isSellerPath ? null : <Navbar/>}

      <Toaster
        position="top-center"
        containerStyle={{
          top: 20,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#15803d',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            minWidth: '200px',
          },
          success: {
            iconTheme: {
              primary: '#15803d',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <div className={`${isSellerPath ? "": "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App