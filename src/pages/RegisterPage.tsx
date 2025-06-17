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
		<main className="px-10 min-h-screen flex flex-col justify-center">

			<article className="flex justify-center items-center gap-12">
				<section className="flex flex-col items-center justify-center p-10 rounded-2xl shadow-lg max-w-sm w-full bg-white">
					<img
						src={imgR}
						alt="BellidoMoney Logo"
						className="w-36 h-36 object-contain rounded-full border-4 border-green-500 shadow-lg mb-6 bg-white"
					/>
					<h1 className="text-4xl font-extrabold text-green-800 mb-3 tracking-tight">¡Bienvenido!</h1>
					<p className="text-green-900 mb-2 text-center text-lg">
						Regístrate para poder usar <span className="font-semibold">MyWallet</span>!
					</p>
				</section>
				<div className="max-w-md w-full">
					<RegisterForm
						formData={formData}
						setFormData={setFormData}
					/>
				</div>
			</article>
		</main>
	);
}
