import Button from "@components/Button";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    {/* Wallet Icon */}
                    <svg width="32" height="32" viewBox="0 0 72 72" fill="none">
                        <rect x="4" y="12" width="64" height="48" rx="12" fill="#38B48E"/>
                        <rect x="12" y="4" width="48" height="32" rx="8" fill="#2D8C6F"/>
                        <circle cx="36" cy="36" r="18" fill="#256D5A"/>
                        <path d="M36 18a18 18 0 0 1 18 18h-18V18z" fill="#6FE3FF"/>
                        <circle cx="54" cy="54" r="12" fill="#38B48E"/>
                        <path d="M50 54l4 4 8-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-white text-lg font-bold">MyWallet</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        message="Iniciar Sesión"
                        to="/auth/login"
                        className="px-3 py-1 text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                    />
                    <Button
                        message="Registrarse"
                        to="/auth/register"
                        className="px-3 py-1 text-sm font-medium bg-green-600 hover:bg-green-500 text-white rounded transition-colors"
                    />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;