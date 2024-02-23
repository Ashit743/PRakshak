import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import Prediction from "./components/prediction/prediction"
export const router = createBrowserRouter([
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/",
        element: <Home />
    },{
        path:"/verify",
        element:<VerifyOTP/>
    },
    {
        path: "/prediction",
        element:<Prediction/>
    }
])

