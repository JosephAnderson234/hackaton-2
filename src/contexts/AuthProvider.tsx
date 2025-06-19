import { AuthContext } from "./contexts";
import type { LoginRequest, RegisterRequest } from "@/types/authTypes";
import { login, register } from "@utils/api";
import { useUserStore } from "@utils/userStorage";
async function loginHandler(
    loginRequest: LoginRequest,
    setSession: (value: string) => void,
) {
    const response = await login(loginRequest)
    //console.log(response)
    setSession(response.data.data.token);
    /* const response = await login(loginRequest);
    setSession(response.data.token); */
}

async function signupHandler(
    signupRequest: RegisterRequest,
    setSession: (value: string) => void,
) {
    const response = await register(signupRequest);
    setSession(response.data.token);
}

const AuthProvider = (props: { children: React.ReactNode }) => {
    const token = useUserStore((state) => state.token);
    const setToken = useUserStore((state) => state.setToken);
    
    return (
        <AuthContext.Provider
            value={{
                register: (signupRequest) => signupHandler(signupRequest, setToken),
                login: (loginRequest) => loginHandler(loginRequest, setToken),
                logout: () => {
                    setToken(null);
                },
                session: token
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;