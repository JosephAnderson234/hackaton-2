import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../stores/appStore';
import type { User } from '../types/authTypes';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isAuthenticated, login, logout, token } = useAuthStore();

    useEffect(() => {
        // Check if token exists in localStorage on app start
        const storedToken = localStorage.getItem('token');
        if (storedToken && !token) {
            // If there's a stored token but not in state, restore the auth state
            // In a real app, you might want to validate the token with the backend
            const storedUser = localStorage.getItem('auth-store');
            if (storedUser) {
                try {
                    const parsed = JSON.parse(storedUser);
                    if (parsed.state?.user) {
                        login(parsed.state.user, storedToken);
                    }
                } catch (error) {
                    console.error('Error parsing stored auth data:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('auth-store');
                }
            }
        }
    }, [token, login]);

    const contextValue: AuthContextType = {
        user,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;