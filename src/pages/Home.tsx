import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuthContext";
import type { LoginRequest } from '@/types/authTypes';
const Home = () => {
    const {login} = useAuth(); // Assuming useAuth provides login management, though not used here
    const navigate = useNavigate();
    const simulateLogin = ()=>{
        const tryLogin: LoginRequest = {
            email: "a@test.com",
            passwd: "anfjkbgkjb"
        }
        login(tryLogin); // This would typically set a token in local storage or context
        console.log('User logged in');
        navigate("/profile");
    }
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the main page of our application.</p>
            <button onClick={simulateLogin}>
                Inicia Sesion
            </button>
        </div>
    );
}
export default Home;
