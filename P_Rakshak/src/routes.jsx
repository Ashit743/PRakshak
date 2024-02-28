import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import Prediction from "./components/prediction/prediction";
import Layout from "./components/UI/Layout";
import MonthlyCalendar from "./components/calendar/Calendar";
import EmergencyCall from "./components/EmergencyCall";
import Notifications from "./components/Notifications";
import DoctorComponent from "./components/manual-appointment/availableDoctors";
import FoodRecommendations from "./components/food-Rec/foodRecommendation";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/prediction",
    element: (
      <Layout>
        <Prediction />
      </Layout>
    ),
  },
  {
    path: "/calendar",
    element: (
      <Layout>
        <MonthlyCalendar />
      </Layout>
    ),
  },
  {
    path: "/availabledocs",
    element: (
      <Layout>
        <DoctorComponent />
      </Layout>
    ),
  },
  {
    path: "/notifications",
    element: (
      <Layout>
        <Notifications />
      </Layout>
    ),
  },
  {
    path: "/emergency",
    element: (
      <Layout>
        <EmergencyCall />
      </Layout>
    ),
  },
  {
    path: "/verify",
    element: <VerifyOTP />,
  },
  {
    path: "/foodRecommendations",
    element: (
      <Layout>
        <FoodRecommendations />
      </Layout>
    ),
  },
]);
