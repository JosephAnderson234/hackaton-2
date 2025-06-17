import { type LoginRequest } from "@/types/authTypes";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import  useAuth from "@hooks/useAuthContext";

export default function LoginForm() {
	const [formData, setFormData] = useState<LoginRequest>({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const navigate = useNavigate();
    const {login} = useAuth();

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setError(""); // Clear error on input change
		setSuccessMessage(""); // Clear success message on input change
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			await login(formData);
			setSuccessMessage("Inicio de sesión exitoso");
			setError("");
			navigate("/dashboard"); // Redirect to home page after successful login
		}
		catch (err: any) {
			setError(err.message || "Error al iniciar sesión");
			setSuccessMessage(""); // Clear success message on error	
		}
	}

	
    return (
        <section className="bg-gray-300 rounded-2xl p-10 flex flex-col items-center w-full max-w-md shadow-lg">
            <h1 className="text-3xl font-bold mb-8 text-center">Ingresar a Uber</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                <div>
                    <label htmlFor="email" className="block mb-1 text-base font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-400 rounded-lg px-4 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="example@gmail.com"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1 text-base font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-400 rounded-lg px-4 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="**********"
                        required
                    />
                </div>
                <button
                    id="loginSubmit"
                    className="w-full bg-purple-500 text-white font-bold py-3 rounded-full mt-2 text-base transition-colors duration-200 hover:bg-purple-600"
                    type="submit"
                >
                    Iniciar Sesión
                </button>
                <div className="flex items-center my-2">
                    <hr className="flex-1 border-gray-400" />
                    <span className="mx-2 text-gray-500 font-semibold">o</span>
                    <hr className="flex-1 border-gray-400" />
                </div>
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold py-2 px-3 rounded-full cursor-pointer transition-colors duration-200 hover:bg-gray-100 text-base"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    Ingresar con Google
                </button>
            </form>
            {error && <div className="text-red-500 font-semibold mt-4">{error}</div>}
            {successMessage && <div className="text-blue-500 font-semibold mt-4">{successMessage}</div>}
        </section>
    );
}
