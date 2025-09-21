import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const ProductCard = ({ product }) => {
    const { addToCart, removeFromCart, cartItems, currency } = useAppContext()

    return (
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group max-w-[220px]'>
            {/* Product Image */}
            <div className='relative overflow-hidden bg-gray-50 aspect-square'>
                <img 
                    src={product.image && product.image[0] ? product.image[0] : '/placeholder-image.png'} 
                    alt={product.name} 
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    onError={(e) => {
                        e.target.src = '/placeholder-image.png'
                    }}
                />
                {product.offerPrice && product.offerPrice < product.price && (
                    <div className='absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium'>
                        {Math.round((1 - product.offerPrice / product.price) * 100)}% OFF
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className='p-2.5'>
                {/* Category */}
                <p className='text-xs text-gray-500 uppercase font-medium tracking-wide mb-1'>
                    {product.category}
                </p>
                
                {/* Product Name */}
                <h3 className='text-sm font-medium text-gray-800 mb-1.5 leading-tight h-8 overflow-hidden'>
                    {product.name}
                </h3>

                {/* Rating */}
                <div className='flex items-center mb-1.5'>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <img 
                            key={star}
                            src={star <= 4 ? assets.star_icon : assets.star_dull_icon} 
                            alt={`${star} star`}
                            className='w-2.5 h-2.5'
                        />
                    ))}
                    <span className='text-xs text-gray-500 ml-1'>(4)</span>
                </div>

                {/* Price */}
                <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-1'>
                        <span className='text-base font-bold text-green-600'>
                            {currency}{product.offerPrice || product.price}
                        </span>
                        {product.offerPrice && product.offerPrice < product.price && (
                            <span className='text-xs text-gray-400 line-through'>
                                {currency}{product.price}
                            </span>
                        )}
                    </div>
                </div>

                {/* Add to Cart Button */}
                {!cartItems[product._id] ? (
                    <button
                        onClick={() => addToCart(product)}
                        className='w-full bg-green-50 hover:bg-green-100 text-green-600 text-xs font-medium py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-1.5 border border-green-200'
                    >
                        <img src={assets.cart_icon} alt="cart" className='w-3.5 h-3.5 flex-shrink-0' />
                        Add
                    </button>
                ) : (
                    <div className='flex items-center w-full h-8 bg-green-100 border border-green-300 rounded-md select-none overflow-hidden'>
                        <button 
                            onClick={() => removeFromCart(product._id)} 
                            className='cursor-pointer text-green-600 font-bold text-sm flex-1 h-full hover:bg-green-200 transition-colors duration-150 flex items-center justify-center'
                        >
                            -
                        </button>
                        <div className='min-w-8 bg-green-50 h-full flex items-center justify-center font-semibold text-green-700 text-xs border-x border-green-300'>
                            {cartItems[product._id]?.quantity || 0}
                        </div>
                        <button 
                            onClick={() => addToCart(product)} 
                            className='cursor-pointer text-green-600 font-bold text-sm flex-1 h-full hover:bg-green-200 transition-colors duration-150 flex items-center justify-center'
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductCard