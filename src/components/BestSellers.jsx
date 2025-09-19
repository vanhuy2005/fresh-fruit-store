import React from 'react'
import ProductCard from './ProductCards'
import { useAppContext } from '../context/AppContext'

const BestSellers = () => {
  const { products } = useAppContext();

  // Get first 8 products as best sellers
  const bestSellers = products.slice(0, 8);

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
        {bestSellers.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default BestSellers
