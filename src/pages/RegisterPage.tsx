import Button from "@components/Button";
import RegisterForm from "@components/RegisterForm";
import { useState } from "react";
import { type RegisterRequest } from "@/types/authTypes";
import imgR from "@assets/mywallet.png";

export default function RegisterPage() {
	const [formData, setFormData] = useState<RegisterRequest>({
		email: "",
		password: "",
	});

	return (
		<main className="px-10">
			<section className="flex justify-center items-center py-4">
				<Button message="Iniciar Sesión" to="/auth/login" />
				<Button message="Registrarse" to="/auth/register" />
			</section>

			<article className="flex justify-between">
				<section className="login-section flex flex-col items-center p-4 text-center">
					<h1 className="title">¡Bienvenido!</h1>
					<p>Regístrate para poder usar BellidoMoney!!!</p>
					<img src={imgR} />
				</section>
					<RegisterForm
						formData={formData}
						setFormData={setFormData}
					/>
			</article>
		</main>
	);
}
