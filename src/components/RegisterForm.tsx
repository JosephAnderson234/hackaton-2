import { type ChangeEvent, type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {RegisterRequest}  from "@/types/authTypes";
import  useAuth  from "@hooks/useAuthContext";

interface RegisterFormProps {
    formData: RegisterRequest;
    setFormData: React.Dispatch<React.SetStateAction<RegisterRequest>>;
    setVehicleRegister: (val: boolean) => void;
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
        <section className="bg-gray-300 rounded-2xl p-10 flex flex-col items-center w-full max-w-md shadow-lg">
            <h1 className="text-3xl font-bold mb-8 text-center">Registrarse a BellidoMoney</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-base">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={props.formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-1 text-base">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={props.formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
                    />
                </div>
                {error && (
                    <p className="text-red-500 font-semibold text-center text-base">{error}</p>
                )}
                <button
                    id="registerSubmit"
                    className="w-full bg-purple-500 text-white font-bold py-3 rounded-full cursor-pointer transition-colors duration-200 hover:bg-purple-600 disabled:opacity-60 text-base"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
            </form>
        </section>
    );
}