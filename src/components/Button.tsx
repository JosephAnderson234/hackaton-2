import { useNavigate,useLocation } from "react-router-dom";

interface ButtonProps {
	to: string;
	message: string;
	className?: string;
	onClick?: () => void;
}

export default function Button(props: ButtonProps) {
	const location = useLocation();
	const navigate = useNavigate();
	const isActive = location.pathname === props.to;

	const buttonStyle = `px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${
		isActive
			? "bg-green-600 hover:bg-green-700 cursor-not-allowed"
			: "bg-green-500 hover:bg-green-600 cursor-pointer"
	} shadow-md border border-green-700`

	function handleClick() {
		if (!props.onClick) {
		navigate(props.to);
		} else {
			props.onClick();
		}
	}

	return (
		<button className={`${buttonStyle} `} onClick={handleClick}>
			{props.message}
		</button>
	);
}
