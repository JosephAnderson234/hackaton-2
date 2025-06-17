import { createBrowserRouter } from "react-router-dom";
import App from "src/App";
import { ProtectedRoute } from "./ProtectedRoute";
import Profile from "@pages/Profile";
import Home from "@pages/Home";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";

export const router = createBrowserRouter(
    [{
        path: "/",
        element: <App />,
        children: [
        
            {
				path: "auth",
				children: [
                    {
                        path: "login",
                        element: <div> <LoginPage /></div>
                    },
                    {
                        path: "register",
                        element: <div> <RegisterPage /></div>
                    }
                ],
			},
            {
                path: "profile",
                element: <ProtectedRoute to="/"/>,
                children: [
                    {
                        path: "",
                        element: <Profile />
                    }
                ]
            },
            {
                path: "*",
                element: <div>Not Found</div>
            }
        ]
    }]
)