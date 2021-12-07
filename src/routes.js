import Auth from "./Auth";
import Main from "./Main";
import SignUp from "./SignUp";

export const authRoutes = [
    {
        path: "/Auth",
        component: Auth
    },
    {
        path: "/",
        component: Main
    }
]

export const publickRoutes = [
    {
        path: "/Auth",
        component: Auth
    },
    {
        path: "/SignUp",
        component: SignUp
    }
]