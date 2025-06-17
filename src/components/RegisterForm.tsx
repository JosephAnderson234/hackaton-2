import { type ChangeEvent, type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {RegisterRequest}  from "@/types/authTypes";
import  useAuth  from "@hooks/useAuthContext";

interface RegisterFormProps {
    formData: RegisterRequest;
    setFormData: React.Dispatch<React.SetStateAction<RegisterRequest>>;
}

export default function RegisterForm(props: RegisterFormProps) {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {register} = useAuth();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        props.setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));    
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await register(props.formData);
            navigate("/home");
            setError("");
        } catch (err: any) {
            const backendMessage =
                err.response?.data?.message || JSON.stringify(err.response?.data) || err.message;
            setError(backendMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="bg-gradient-to-br from-green-200 via-green-100 to-green-50 rounded-3xl p-10 flex flex-col items-center w-full max-w-md shadow-2xl border border-green-300 relative overflow-hidden">
            {/* Wallet Icon */}
            <div className="mb-6">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                    <rect x="4" y="12" width="64" height="48" rx="12" fill="#38B48E"/>
                    <rect x="12" y="4" width="48" height="32" rx="8" fill="#2D8C6F"/>
                    <circle cx="36" cy="36" r="18" fill="#256D5A"/>
                    <path d="M36 18a18 18 0 0 1 18 18h-18V18z" fill="#6FE3FF"/>
                    <circle cx="54" cy="54" r="12" fill="#38B48E"/>
                    <path d="M50 54l4 4 8-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h1 className="text-3xl font-extrabold mb-8 text-center text-green-800 drop-shadow-sm">Registrarse a MyWallet</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                <div>
                    <label htmlFor="email" className="block mb-1 text-base font-semibold text-green-900">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={props.formData.email}
                        onChange={handleChange}
                        className="w-full border border-green-300 rounded-xl px-4 py-3 text-base bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow shadow-inner"
                        placeholder="example@gmail.com"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1 text-base font-semibold text-green-900">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={props.formData.password}
                        onChange={handleChange}
                        className="w-full border border-green-300 rounded-xl px-4 py-3 text-base bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow shadow-inner"
                        placeholder="**********"
                        required
                    />
                </div>
                <button
                    id="registerSubmit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 rounded-full mt-2 text-base transition-colors duration-200 hover:from-green-600 hover:to-green-800 shadow-lg disabled:opacity-60"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
            </form>
            {error && <div className="text-red-500 font-semibold mt-4">{error}</div>}
        </section>
    );
}