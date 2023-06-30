import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import InvoiceDetails from "../pages/InvoiceDetails";
import EditInvoice from "../pages/EditInvoice";
import CreateInvoice from "../pages/CreateInvoice";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/invoice/:id",
    element: <InvoiceDetails />,
  },

  {
    path: "/invoice/new",
    element: <CreateInvoice />,
  },
  {
    path: "/invoice/edit/:id",
    element: <EditInvoice />,
  },
]);
