import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterRequest } from "@interfaces/auth/RegisterRequest";
import { useAuthContext } from "@contexts/AuthContext";

interface RegisterFormProps {
    formData: RegisterRequest;
    setFormData: React.Dispatch<React.SetStateAction<RegisterRequest>>;
    setVehicleRegister: (val: boolean) => void;
}

export default function RegisterForm(props: RegisterFormProps) {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {register} = useAuthContext();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        let parsedValue: any = value;
        if (name === "isDriver") {
            parsedValue = value === "true";
            // Immediately show vehicle register form when selecting "Sí"
            props.setFormData((prev) => ({
                ...prev,
                [name]: parsedValue,
            }));
            if (parsedValue) {
                props.setVehicleRegister(true);
            }
            return;
        }

        props.setFormData((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Si es conductor, pasar a registro de vehículo
        if (props.formData.isDriver) {
            setLoading(false);
            props.setVehicleRegister(true);
            return;
        }

        try {
            await register(props.formData);
            navigate("/dashboard");
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
            <h1 className="text-3xl font-bold mb-8 text-center">Registrarse a Uber</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1 text-base">
                            Nombres
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={props.formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1 text-base">
                            Apellidos
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={props.formData.lastName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
                        />
                    </div>
                </div>
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
                <div className="flex gap-3">
                    <div className="flex-1">
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-1 text-base">
                            Celular
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={props.formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                        <span className="block text-gray-700 font-medium mb-1 text-base">¿Eres conductor?</span>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center text-base">
                                <input
                                    type="radio"
                                    name="isDriver"
                                    id="driver"
                                    value="true"
                                    checked={props.formData.isDriver === true}
                                    onChange={handleChange}
                                    className="mr-2 accent-purple-500"
                                />
                                Sí
                            </label>
                            <label className="flex items-center text-base">
                                <input
                                    type="radio"
                                    name="isDriver"
                                    id="passenger"
                                    value="false"
                                    checked={props.formData.isDriver === false}
                                    onChange={handleChange}
                                    className="mr-2 accent-purple-500"
                                />
                                No
                            </label>
                        </div>
                    </div>
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
                <div className="flex items-center my-2">
                    <div className="flex-grow h-px bg-gray-400" />
                    <span className="mx-2 text-gray-500 font-semibold">o</span>
                    <div className="flex-grow h-px bg-gray-400" />
                </div>
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold py-2 px-3 rounded-full cursor-pointer transition-colors duration-200 hover:bg-gray-100 text-base"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    Registrarse con Google
                </button>
            </form>
        </section>
    );
}