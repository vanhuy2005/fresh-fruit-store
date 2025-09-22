import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import AllProducts from './pages/AllProducts.jsx'
import Login from './components/Login.jsx'
// import Banner from './components/Banner.jsx'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer.jsx'
import { useAppContext } from './context/AppContext.jsx'
import { assets } from './assets/assets'

const App = () => {
  const isSellerPath = useLocation().pathname.includes('/seller');
  const { showUserLogin, setShowUserLogin } = useAppContext();
  
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
          <Route path='/products' element={<AllProducts/>}></Route>
        </Routes>
      </div>

      {/* Login Modal */}
      {showUserLogin && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative max-w-md w-full">
            {/* Close button */}
            <button
              onClick={() => setShowUserLogin(false)}
              className="absolute -top-3 -right-3 z-[10000] w-9 h-9 bg-white hover:bg-green-50 text-gray-500 hover:text-green-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md border border-gray-100 hover:border-green-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Login />
          </div>
        </div>
      )}

     {!isSellerPath&& <Footer/>}
    </div>
  )
}

export default App