import {createContext, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { dummyProducts } from '../assets/assets.js';

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const currency = import.meta.env.VITE_CURRENCY || "$";

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    
    // Advanced spam detection with hard limits
    const [actionCounts, setActionCounts] = useState({});
    const [lastActionTime, setLastActionTime] = useState({});
    const [activeToasts, setActiveToasts] = useState({}); // Track active toasts
    const [blockedActions, setBlockedActions] = useState({}); // Track blocked actions
    const [warningCount, setWarningCount] = useState({}); // Track warning count per action
    
    const SPAM_THRESHOLD = 5; // tăng từ 3 lên 5 clicks để bắt đầu đếm spam
    const WARNING_LIMIT = 20; // tăng từ 10 lên 20 clicks trong time window để hiện warning  
    const HARD_BLOCK_LIMIT = 30; // tăng từ 15 lên 30 clicks trong time window để block
    const SPAM_TIME_WINDOW = 5000; // tăng từ 3s lên 5s - thời gian tính spam
    const ACCUMULATE_DURATION = 1500; // thời gian cộng dồn counter (1.5 giây)
    const WARNING_COOLDOWN = 3000; // thời gian nghỉ sau warning (3 giây)
    const HARD_BLOCK_COOLDOWN = 3000; // thời gian block cứng (3 giây)

    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    // Advanced spam protection with better detection
    const handleActionWithAdvancedProtection = (actionKey, message, callback) => {
        const now = Date.now();
        const lastTime = lastActionTime[actionKey] || 0;
        const currentCount = actionCounts[actionKey] || 0;
        const activeToastId = activeToasts[actionKey];
        const isBlocked = blockedActions[actionKey];
        const warnings = warningCount[actionKey] || 0;
        const timeSinceLastAction = now - lastTime;

        // Kiểm tra nếu action đang bị block
        if (isBlocked && isBlocked > now) {
            const remainingTime = Math.ceil((isBlocked - now) / 1000);
            if (!activeToasts[`${actionKey}_blocked`]) {
                const blockToastId = toast.error(`🚫 Spam blocked! Wait ${remainingTime}s`, {
                    id: `${actionKey}_blocked`,
                    duration: 2000,
                    style: {
                        background: '#fef2f2',
                        color: '#dc2626',
                        border: '1px solid #fecaca',
                        fontWeight: '600',
                    },
                });
                setActiveToasts(prev => ({ ...prev, [`${actionKey}_blocked`]: blockToastId }));
                
                setTimeout(() => {
                    setActiveToasts(prev => ({ ...prev, [`${actionKey}_blocked`]: null }));
                }, 2000);
            }
            return false; // Block action completely
        }

        // Reset counter nếu đã qua thời gian spam window (người dùng đã nghỉ đủ lâu) - giảm thời gian này
        if (timeSinceLastAction > 1500) {
            setActionCounts(prev => ({ ...prev, [actionKey]: 1 }));
            setLastActionTime(prev => ({ ...prev, [actionKey]: now }));
            setWarningCount(prev => ({ ...prev, [actionKey]: 0 })); // Reset warnings
            
            // Tạo toast mới bình thường
            const toastId = toast.success(message);
            setActiveToasts(prev => ({ ...prev, [actionKey]: toastId }));
            
            setTimeout(() => {
                setActiveToasts(prev => ({ ...prev, [actionKey]: null }));
            }, 3000);
            
            callback(1);
            return true;
        }

        const newCount = currentCount + 1;
        setActionCounts(prev => ({ ...prev, [actionKey]: newCount }));
        setLastActionTime(prev => ({ ...prev, [actionKey]: now }));

        // HARD BLOCK - Chỉ block khi thực sự spam trong time window - tăng threshold
        if (newCount >= HARD_BLOCK_LIMIT && timeSinceLastAction < 600) {
            const blockEndTime = now + HARD_BLOCK_COOLDOWN;
            setBlockedActions(prev => ({ ...prev, [actionKey]: blockEndTime }));
            
            // Dismiss all existing toasts for this action
            if (activeToastId) toast.dismiss(activeToastId);
            
            // Show hard block toast
            toast.error(`🛑 Too fast! Blocked for ${HARD_BLOCK_COOLDOWN/1000}s`, {
                duration: 4000,
                style: {
                    background: '#fef2f2',
                    color: '#dc2626',
                    border: '2px solid #dc2626',
                    fontWeight: '700',
                    fontSize: '15px',
                },
            });

            // Auto unblock after cooldown
            setTimeout(() => {
                setBlockedActions(prev => ({ ...prev, [actionKey]: null }));
                setActionCounts(prev => ({ ...prev, [actionKey]: 0 }));
                setWarningCount(prev => ({ ...prev, [actionKey]: 0 }));
                setActiveToasts(prev => ({ ...prev, [actionKey]: null }));
            }, HARD_BLOCK_COOLDOWN);

            return false; // Block action
        }

        // WARNING LEVEL - Show warning but allow action - chỉ khi click quá nhanh
        if (newCount >= WARNING_LIMIT && timeSinceLastAction < 800) {
            // Dismiss existing toast and show warning
            if (activeToastId) toast.dismiss(activeToastId);
            
            const newWarnings = warnings + 1;
            setWarningCount(prev => ({ ...prev, [actionKey]: newWarnings }));
            
            toast.warning(`⚠️ Slow down! (${newCount}/${HARD_BLOCK_LIMIT}) clicks in ${SPAM_TIME_WINDOW/1000}s`, {
                duration: 3000,
                style: {
                    background: '#fef3cd',
                    color: '#d97706',
                    border: '1px solid #fed7aa',
                    fontWeight: '600',
                },
                iconTheme: {
                    primary: '#d97706',
                    secondary: '#fef3cd',
                },
            });

            callback(newCount);
            return true; // Allow action but with warning
        }

        // SPAM ACCUMULATION - Chỉ khi click thật sự nhanh
        if (newCount >= SPAM_THRESHOLD && activeToastId && timeSinceLastAction < 1000) {
            toast.dismiss(activeToastId);
            const newToastId = toast.success(`${message} (×${newCount})`, {
                id: `${actionKey}-accumulated`,
                duration: ACCUMULATE_DURATION,
            });
            setActiveToasts(prev => ({ ...prev, [actionKey]: newToastId }));
            
            setTimeout(() => {
                setActiveToasts(prev => ({ ...prev, [actionKey]: null }));
            }, ACCUMULATE_DURATION);
        } else if (newCount >= SPAM_THRESHOLD && timeSinceLastAction < 1000) {
            const toastId = toast.success(`${message} (×${newCount})`, {
                id: `${actionKey}-accumulated`,
                duration: ACCUMULATE_DURATION,
            });
            setActiveToasts(prev => ({ ...prev, [actionKey]: toastId }));
            
            setTimeout(() => {
                setActiveToasts(prev => ({ ...prev, [actionKey]: null }));
            }, ACCUMULATE_DURATION);
        } else {
            // Normal action
            const toastId = toast.success(message);
            setActiveToasts(prev => ({ ...prev, [actionKey]: toastId }));
            
            setTimeout(() => {
                setActiveToasts(prev => ({ ...prev, [actionKey]: null }));
            }, 3000);
        }

        callback(newCount);
        return true; // Allow action
    }

    // add to cart with advanced spam protection
    const addToCart = (product) => {
        const actionKey = `add_${product._id}`;

        // Try to execute action with advanced protection
        const actionAllowed = handleActionWithAdvancedProtection(actionKey, "Added to Cart", (count) => {
            // This callback runs only if action is allowed
        });

        // Only proceed with cart update if action is allowed
        if (actionAllowed) {
            let cartData = {...cartItems};
            if (cartData[product._id]) {
                cartData[product._id].quantity += 1;
            } else {
                cartData[product._id] = {...product, quantity: 1};
            }
            setCartItems(cartData);
            localStorage.setItem("cart", JSON.stringify(cartData));
        }
    }

    // update cart items quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = {...cartItems};
        if (quantity > 0) {
            cartData[itemId].quantity = quantity;
        } else {
            delete cartData[itemId];
        }
        setCartItems(cartData);
        localStorage.setItem("cart", JSON.stringify(cartData));
        toast.success("Cart Updated");
    }

    // remove product from cart with advanced spam protection
    const removeFromCart = (itemId) => {
        const actionKey = `remove_${itemId}`;

        // Try to execute action with advanced protection
        const actionAllowed = handleActionWithAdvancedProtection(actionKey, "Removed from Cart", (count) => {
            // This callback runs only if action is allowed
        });

        // Only proceed with cart update if action is allowed
        if (actionAllowed) {
            let cartData = {...cartItems};
            if (cartData[itemId]) {
                cartData[itemId].quantity -= 1;
                if(cartData[itemId].quantity === 0) {
                    delete cartData[itemId];
                }
            }
            setCartItems(cartData);
            localStorage.setItem("cart", JSON.stringify(cartData));
        }
    }

    // Load cart from localStorage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
        fetchProducts();
    }, []);

    const value = {
        navigate, 
        user, 
        setUser, 
        setIsSeller, 
        isSeller, 
        showUserLogin, 
        setShowUserLogin, 
        products, 
        setProducts, 
        currency, 
        addToCart, 
        cartItems, 
        setCartItems,
        updateCartItem,
        removeFromCart
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>  
    )
}
export const useAppContext = () =>{
    return useContext(AppContext);
}