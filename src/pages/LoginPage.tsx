import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { login as apiLogin, register as apiRegister } from '../utils/api';
import type { LoginRequest, RegisterRequest } from '../types/authTypes';
export const LoginPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if (passwd.length < 12) {
            setError('La contraseña debe tener al menos 12 caracteres');
            setLoading(false);
            return;
        }        try {
            if (isLogin) {
                const loginRequest: LoginRequest = { email, passwd };
                console.log('Attempting login with:', { email, passwdLength: passwd.length });
                const response = await apiLogin(loginRequest);
                console.log('Login response received:', response);
                let token: string | undefined;
                let userEmail: string | undefined;
                if (response?.result?.token) {
                    console.log('Found token in response.result.token');
                    token = response.result.token;
                    userEmail = response.result.username || response.result.email || email;
                } else if (response?.data?.token) {
                    console.log('Found token in response.data.token');
                    token = response.data.token;
                    userEmail = response.data.email || email;
                } else if (response?.token) {
                    console.log('Found token in response.token');
                    token = response.token;
                    userEmail = response.email || email;
                }
                console.log('Final extracted token:', token ? '[TOKEN_FOUND]' : 'NO_TOKEN');
                console.log('Final extracted email:', userEmail);
                if (token) {
                    console.log('Login successful, storing user data');
                    login({ email: userEmail || email, token }, token);
                    navigate('/dashboard');
                } else {
                    console.error('No token found in response:', response);
                    setError('No se recibió un token válido del servidor');
                }
            } else {
                const registerRequest: RegisterRequest = { email, passwd };
                console.log('Attempting registration with:', { email, passwdLength: passwd.length });
                const response = await apiRegister(registerRequest);
                console.log('Registration response:', response);
                setError('Registro exitoso. Ahora puedes iniciar sesión.');
                setIsLogin(true);
            }        } catch (err: any) {
            console.error('Authentication error:', err);
            let errorMessage = 'Error en la autenticación';
            if (err.code === 'ECONNABORTED') {
                errorMessage = 'La conexión ha tardado demasiado. Verifica tu conexión a internet e intenta nuevamente.';
            } else if (err.code === 'ERR_NETWORK') {
                errorMessage = 'Error de red. Verifica tu conexión a internet.';
            } else if (err.response?.status === 401) {
                errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
            } else if (err.response?.status === 404) {
                errorMessage = 'Servicio no encontrado. El servidor puede estar temporalmente inactivo.';
            } else if (err.response?.status >= 500) {
                errorMessage = 'Error del servidor. Intenta nuevamente en unos momentos.';
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Ahorrista</h1>
                    <p className="text-gray-600">Tu compañero financiero personal</p>
                </div>
                <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                    <button
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            isLogin
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => setIsLogin(true)}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            !isLogin
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => setIsLogin(false)}
                    >
                        Registrarse
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="tu@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="passwd" className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <input
                            id="passwd"
                            type="password"
                            required
                            value={passwd}
                            onChange={(e) => setPasswd(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Mínimo 12 caracteres"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            La contraseña debe tener al menos 12 caracteres
                        </p>
                    </div>
                    {error && (
                        <div className={`p-3 rounded-md text-sm ${
                            error.includes('exitoso') 
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                    </button>
                </form>
                {!isLogin && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-700">
                            <strong>Nota:</strong> Al registrarte, se crearán automáticamente 10,000 gastos de ejemplo para que puedas explorar la aplicación.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
