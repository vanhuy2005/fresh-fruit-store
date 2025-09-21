import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
    const { products, searchQuery, setSearchQuery } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])

    const clearSearch = () => {
        setSearchQuery('')
    }

    useEffect(() => {
        if (products && products.length > 0) {
            if (searchQuery && searchQuery.length > 0) {
                setFilteredProducts(products.filter(
                    product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
                ))
            } else {
                setFilteredProducts(products)
            }
        } else {
            setFilteredProducts([])
        }
    }, [products, searchQuery])

    return (
        <div className='mt-16 flex flex-col'>
            <div className='flex flex-col items-end w-max mb-4'>
                <p className='text-2xl font-medium uppercase'>All products</p>
                <div className='w-16 h-0.5 bg-green-500 rounded-full'></div>
            </div>

            {/* Search Status */}
            {searchQuery && (
                <div className='mb-4 flex items-center gap-2 text-sm text-gray-600'>
                    <span>Showing results for: </span>
                    <span className='font-medium text-green-600'>"{searchQuery}"</span>
                    <button 
                        onClick={clearSearch}
                        className='ml-2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors'
                    >
                        Clear
                    </button>
                </div>
            )}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {filteredProducts.length > 0 ? (
                    filteredProducts
                        .filter((product) => product.inStock)
                        .map((product) => (
                            <ProductCard key={product._id} product={product}/>
                        ))
                ) : (
                    <div className='col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 text-center py-12'>
                        <p className='text-gray-500 text-lg'>No products available</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllProducts
