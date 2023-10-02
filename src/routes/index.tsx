import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import InvoiceDetails from "../pages/InvoiceDetails";
import EditInvoice from "../pages/EditInvoice";
import CreateInvoice from "../pages/CreateInvoice";
import Error from "../pages/Error";
import Profile from "../pages/Profile";
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AuthLayout from "../components/layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/auth",
    errorElement: <Error />,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace={true} />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    errorElement: <Error />,
    element: <Home />,
  },
  {
    path: "/invoice/:id",
    errorElement: <Error />,
    element: <InvoiceDetails />,
  },

  {
    path: "/invoice/new",
    errorElement: <Error />,
    element: <CreateInvoice />,
  },
  {
    path: "/invoice/edit/:id",
    errorElement: <Error />,
    element: <EditInvoice />,
  },
  {
    path: "/profile",
    errorElement: <Error />,
    element: <Profile />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);
