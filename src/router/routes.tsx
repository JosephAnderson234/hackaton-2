import { createBrowserRouter } from "react-router-dom";
import App from "src/App";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "@pages/Dashboard";
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
                path: "dashboard",
                element: <ProtectedRoute to="/"/>,
                children: [
                    {
                        path: "",
                        element: <Dashboard />
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