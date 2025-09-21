import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Login = () => {
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { setUser, setShowUserLogin } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email.trim() || !password.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        if (state === "register" && !name.trim()) {
            toast.error('Please enter your name');
            return;
        }

        setLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            try {
                // Simple mock authentication - accept any email/password for testing
                const userData = {
                    name: state === "register" ? name : email.split('@')[0] || "User",
                    email: email,
                    id: Date.now() // Simple ID generation for testing
                };
                
                setUser(userData);
                setShowUserLogin(false);
                
                toast.success(`${state === "login" ? "Login" : "Registration"} successful! Welcome ${userData.name}!`);
                
                // Reset form
                setName("");
                setEmail("");
                setPassword("");
                
            } catch (error) {
                toast.error('Something went wrong. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 1000); // 1 second delay to simulate network request
    };
  
    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start p-8 py-12 w-full text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-green-600">Green</span><span className="text-gray-800">Cart</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input 
                        onChange={(e) => setName(e.target.value)} 
                        value={name} 
                        placeholder="Enter your name" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500 focus:border-green-500" 
                        type="text" 
                        required 
                    />
                </div>
            )}
            <div className="w-full">
                <p>Email</p>
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    placeholder="test@example.com" 
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500 focus:border-green-500" 
                    type="email" 
                    required 
                />
            </div>
            <div className="w-full">
                <p>Password</p>
                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    placeholder="Any password works for testing" 
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500 focus:border-green-500" 
                    type="password" 
                    required 
                />
            </div>
            
            {/* Test info */}
            <div className="w-full bg-green-50 p-3 rounded-md text-sm text-green-700">
                <p className="font-medium">💡 For Testing:</p>
                <p>• Enter any email and password</p>
                <p>• All combinations will work</p>
                <p>• Try: test@gmail.com / 123456</p>
            </div>
            
            {/* Quick test buttons */}
            <div className="w-full">
                <p className="text-sm text-gray-600 mb-2">Quick Test:</p>
                <div className="flex gap-2 flex-wrap">
                    <button 
                        type="button"
                        onClick={() => {
                            setEmail('admin@freshfruit.com');
                            setPassword('admin123');
                        }}
                        className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                    >
                        Admin
                    </button>
                    <button 
                        type="button"
                        onClick={() => {
                            setEmail('user@test.com');
                            setPassword('123456');
                        }}
                        className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
                    >
                        User
                    </button>
                    <button 
                        type="button"
                        onClick={() => {
                            setEmail('demo@example.com');
                            setPassword('demo');
                        }}
                        className="text-xs px-3 py-1 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors"
                    >
                        Demo
                    </button>
                </div>
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-green-600 cursor-pointer hover:text-green-700">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-green-600 cursor-pointer hover:text-green-700">click here</span>
                </p>
            )}
            <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-3 rounded-md font-medium transition-all ${
                    loading 
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                        : 'bg-green-500 hover:bg-green-600 text-white hover:shadow-md'
                }`}
            >
                {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        {state === "register" ? "Creating Account..." : "Signing In..."}
                    </div>
                ) : (
                    state === "register" ? "Create Account" : "Login"
                )}
            </button>
        </form>
        </div>
    )
}

export default Login
