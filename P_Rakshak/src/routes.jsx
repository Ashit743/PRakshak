import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import Prediction from "./components/prediction/prediction";
import Layout from "./components/UI/Layout";
import MonthlyCalendar from "./components/calendar/Calendar";
import DoctorCard from "./components/doctor-cards/doctorCards";
import EmergencyCall from "./components/EmergencyCall";
import Notifications from "./components/Notifications";
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
        path: "/prediction",
        element:<Layout><Prediction/></Layout>
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
        element: <Layout>< Notifications/></Layout>
    },
    {
        path: "/emergency",
        element: <Layout>< EmergencyCall/></Layout>
    },
    {
        path:"/verify",
        element:<VerifyOTP/>
    },
   
])

