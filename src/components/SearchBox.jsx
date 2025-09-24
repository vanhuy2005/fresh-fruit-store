import React, { useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx'

const SearchBox = () => {
    const { products, searchQuery, setSearchQuery, navigate } = useAppContext()
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [activeSuggestion, setActiveSuggestion] = useState(-1)
    const [isClicking, setIsClicking] = useState(false)
    const inputRef = useRef(null)
    const suggestionsRef = useRef(null)

    // Generate suggestions based on input
    useEffect(() => {
        if (inputValue.trim().length >= 1 && products.length > 0) {
            const filteredSuggestions = products
                .filter(product => 
                    product.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                    product.category.toLowerCase().includes(inputValue.toLowerCase())
                )
                .slice(0, 6) // Limit to 6 suggestions
                .map(product => ({
                    id: product._id,
                    name: product.name,
                    category: product.category,
                    image: product.image[0]
                }))
            
            setSuggestions(filteredSuggestions)
            setShowSuggestions(filteredSuggestions.length > 0)
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
        setActiveSuggestion(-1)
    }, [inputValue, products])

    const handleInputChange = (e) => {
        const value = e.target.value
        setInputValue(value)
        // Cập nhật searchQuery real-time để AllProducts filter ngay lập tức
        setSearchQuery(value.trim())
    }

    const handleSuggestionClick = (suggestion, event) => {
        event.preventDefault()
        event.stopPropagation()
        
        // Set flag to prevent other handlers
        setIsClicking(true)
        
        // Update input and search query first
        const productName = suggestion.name
        setInputValue(productName)
        setSearchQuery(productName)
        
        // Force hide suggestions immediately
        setShowSuggestions(false)
        setActiveSuggestion(-1)
        
        // Blur input to remove focus
        if (inputRef.current) {
            inputRef.current.blur()
        }
        
        // Navigate and reset flag
        requestAnimationFrame(() => {
            navigate('/products')
            setIsClicking(false)
        })
    }

    const handleSearch = () => {
        if (inputValue.trim()) {
            setSearchQuery(inputValue.trim())
            setShowSuggestions(false)
            navigate('/products')
        }
    }

    const handleKeyDown = (e) => {
        if (!showSuggestions) return

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setActiveSuggestion(prev => 
                    prev < suggestions.length - 1 ? prev + 1 : 0
                )
                break
            case 'ArrowUp':
                e.preventDefault()
                setActiveSuggestion(prev => 
                    prev > 0 ? prev - 1 : suggestions.length - 1
                )
                break
            case 'Enter':
                e.preventDefault()
                if (activeSuggestion >= 0) {
                    const suggestion = suggestions[activeSuggestion]
                    setInputValue(suggestion.name)
                    setSearchQuery(suggestion.name)
                    setShowSuggestions(false)
                    setActiveSuggestion(-1)
                    navigate('/products')
                } else {
                    handleSearch()
                }
                break
            case 'Escape':
                setShowSuggestions(false)
                setActiveSuggestion(-1)
                inputRef.current?.blur()
                break
        }
    }

    const highlightMatch = (text, query) => {
        if (!query.trim()) return text
        
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
        const parts = text.split(regex)
        
        return parts.map((part, index) => 
            regex.test(part) ? 
                <mark key={index} className="bg-yellow-200 text-black">{part}</mark> : part
        )
    }

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Don't handle if currently clicking on suggestion
            if (isClicking || !showSuggestions) return
            
            const clickedInsideSuggestions = suggestionsRef.current?.contains(event.target)
            const clickedInsideInput = inputRef.current?.contains(event.target)
            
            if (!clickedInsideSuggestions && !clickedInsideInput) {
                setShowSuggestions(false)
                setActiveSuggestion(-1)
            }
        }

        if (showSuggestions) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showSuggestions, isClicking])

    return (
        <div className="relative">
            <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full bg-white">
                <input 
                    ref={inputRef}
                    className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" 
                    type="text" 
                    placeholder="Search products..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => inputValue.trim() && setShowSuggestions(suggestions.length > 0)}
                />
                <button onClick={handleSearch} className="flex-shrink-0">
                    <img src={assets.search_icon} alt='search' className='w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity'/>
                </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <div 
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50"
                >
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={suggestion.id}
                            className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                                index === activeSuggestion ? 'bg-green-50 border-l-2 border-green-500' : ''
                            }`}
                            onClick={(e) => handleSuggestionClick(suggestion, e)}
                            onMouseDown={(e) => e.preventDefault()} 
                        >
                            <img 
                                src={suggestion.image} 
                                alt={suggestion.name}
                                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                                onError={(e) => {
                                    e.target.src = '/placeholder-image.png'
                                }}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {highlightMatch(suggestion.name, inputValue)}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                    {suggestion.category}
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                    
                    {suggestions.length === 0 && inputValue.trim() && (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            <div className="flex flex-col items-center gap-2">
                                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <p>No products found for "{inputValue}"</p>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        handleSearch()
                                    }}
                                    onMouseDown={(e) => e.preventDefault()}
                                    className="text-green-600 text-xs hover:text-green-700 font-medium"
                                >
                                    Search anyway
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBox