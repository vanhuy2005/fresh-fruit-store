import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
  const { navigate } = useAppContext()

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Categories</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>
        {categories.map((category, index) => (
          <div key={index} className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:scale-105 hover:brightness-95'
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products?${category.path.toLowerCase()}`);
              scrollTo(0, 0)
            }}
          >
            <img src={category.image} alt={category.text} 
              className='group-hover:scale-108 transition max-w-28' />
            <p className='text-sm font-medium group-hover:text-gray-900 transition-colors duration-300'>{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
