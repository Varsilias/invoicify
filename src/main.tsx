import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./index.css";

import { ThemeContextProvider, AuthContextProvider } from "./context";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { CloseButton } from "./components/general/buttons/CloseButton";
import { FilterContextProvider } from "./context/FilterContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <AuthContextProvider>
          <FilterContextProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={true}
              toastStyle={{
                borderRadius: "8px",
                boxShadow: "0px 12px 16px -4px #0000001A",
                border: "1px solid #b6b6b61a",
                width: "100%",
              }}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
              closeButton={CloseButton}
            />
            <RouterProvider router={router} />
          </FilterContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
