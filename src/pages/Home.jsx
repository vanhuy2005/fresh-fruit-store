import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSellers from '../components/BestSellers' 
const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner></MainBanner>
        <Categories></Categories>
        <BestSellers></BestSellers>
        </div>
  )
}

export default Home