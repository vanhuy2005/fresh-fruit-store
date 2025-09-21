import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx'
import SearchBox from './SearchBox.jsx'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const {user,setUser, setShowUserLogin, navigate } = useAppContext();

    const logout = async() => {
        setUser(null);
        navigate('')
    }
  return (
     <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to="/" onClick={() => setOpen(false)} >
                <img className ="h-9" src = {assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Product</NavLink>
                <NavLink to='/'>Contact</NavLink>

                <div className="hidden lg:block">
                    <SearchBox />
                </div>

                <div onClick={()=>navigate("/cart")} className="relative cursor-pointer">
                    <img src ={assets.nav_cart_icon} alt = 'cart' className='w-6 opacity-80'></img>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-green-500 w-[18px] h-[18px] rounded-full">3</button>
                </div>

                {!user ? (
                    <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    <div className='relative group'>
                        <img src={assets.profile_icon} className='w-10 cursor-pointer' alt="profile" />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                            <li className="p-1.5 pl-3 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/orders')}>
                                My Orders
                            </li>
                            <li className="p-1.5 pl-3 hover:bg-gray-100 cursor-pointer" onClick={logout}>
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt = 'menu'></img>
            </button>

            {/* Mobile Menu */}
            {open && (
                <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden">
                    {/* Mobile Search */}
                    <div className="w-full mb-2">
                        <SearchBox />
                    </div>
                    
                    <NavLink to="/" onClick={() => setOpen(false)} className="block">Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
                    {user && (
                        <NavLink to="/orders" onClick={() => setOpen(false)}>My Orders</NavLink>
                    )}
                    <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
                    {!user ? (
                        <button onClick={() => {
                            setOpen(false);
                            setShowUserLogin(true);
                        }} className="cursor-pointer px-6 py-2 mt-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full text-sm">
                            Login
                        </button>
                    ) : (
                        <button onClick={() => {
                            setOpen(false);
                            logout();
                        }} className="cursor-pointer px-6 py-2 mt-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full text-sm">
                            Logout
                        </button>
                    )}
                </div>
            )}

        </nav>
  )
}

export default Navbar