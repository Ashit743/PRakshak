import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import Prediction from "./components/prediction/prediction"
import Layout from "./components/UI/Layout";
import MonthlyCalendar from "./components/calendar/Calendar";
import DoctorCard from "./components/doctor-cards/doctorCards";
export const router = createBrowserRouter([
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/",
        element: <Layout><Home /></Layout>
    }, 
    {
        path: "/calendar",
        element: <Layout>< MonthlyCalendar/></Layout>
    },
    {
        path: "/doctor",
        element: <Layout>< DoctorCard/></Layout>
    },
    {
        path: "/notifications",
        element: <Layout>< Notification/></Layout>
    },
    {
        path:"/verify",
        element:<VerifyOTP/>
    },
    {
        path: "/prediction",
        element:<Prediction/>
    }
])

