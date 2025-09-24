import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'


const MainBanner = () => {
  return (
    <div className='relative'>
        <img src={assets.main_banner_bg} alt="main banner" className="w-full hidden md:block" />
        <img src={assets.main_banner_bg_sm} alt="main banner mobile" className="w-full block md:hidden" />
        
        <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-96 leading-tight'>
            Freshness You Can Trust, Savings You Will Love!
          </h1>
        
          <div className='flex items-center mt-6 font-medium'>
            <Link to="/products" className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-green-500 hover:bg-green-600 transition rounded text-white cursor-pointer'>
              Shop Now
              <img className='md:hidden transition group-hover:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
            </Link>

            <Link to="/products" className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
              Explore Deal
              <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
            </Link>
          </div>
        </div>
     </div>
  )
}

export default MainBanner