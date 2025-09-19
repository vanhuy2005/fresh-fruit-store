import React from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({product}) => {
    const {currency, addToCart, removeFromCart, cartItems, navigate} = useAppContext();

    return product && (
        <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2" onClick={() => navigate(`/product/${product._id}`)}>
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <img key={i} className="md:w-3.5 w-3" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
                    ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <div className="flex flex-col">
                        <p className="md:text-xl text-lg font-bold text-green-600">
                            {currency}{product.offerPrice}
                        </p>
                        <p className="text-gray-400 md:text-sm text-xs line-through">
                            {currency}{product.price}
                        </p>
                    </div>
                    <div>
                        {!cartItems[product._id] ? (
                            <button 
                                className="flex items-center justify-center gap-1 bg-green-50 border border-green-200 hover:bg-green-100 transition-colors duration-200 md:w-[80px] w-[70px] h-[36px] rounded-md text-green-600 font-semibold text-sm" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                            >
                                <img src={assets.cart_icon} alt="cart_icon" className="w-4 h-4"/>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[36px] bg-green-100 border border-green-300 rounded-md select-none">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromCart(product._id);
                                    }} 
                                    className="cursor-pointer text-green-600 font-bold text-lg px-2 h-full hover:bg-green-200 rounded-l-md transition-colors duration-150"
                                >
                                    -
                                </button>
                                <span className="w-5 text-center font-semibold text-green-700">
                                    {cartItems[product._id]?.quantity || 0}
                                </span>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(product);
                                    }} 
                                    className="cursor-pointer text-green-600 font-bold text-lg px-2 h-full hover:bg-green-200 rounded-r-md transition-colors duration-150"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};  

export default ProductCard