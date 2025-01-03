import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorPage from "./error-page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginPage } from "./pages/auth/login/Login.tsx";
import { AuthProvider } from "./context/auth-provider.tsx";
import RequireAuth from "./pages/auth/RequireAuth.tsx";
import Home from "./pages/home/Home.tsx";
import Unauthorized from "./pages/auth/Unauthorized.tsx";
import Layout from "./pages/layouts/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout />,
    children: [
        { path: "/", element: <Home /> },
        {
            path: "instructor",
            element: (
                <RequireAuth allowedRoles={['Instructor']}>
                    <Home />
                </RequireAuth>
            ),
        },
        { path: "login", element: <LoginPage /> },
        {
          path: "/unauthorized",
          element: <Unauthorized />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
          errorElement: <ErrorPage />,
        },
    ],
}
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </App>
    </QueryClientProvider>
  </StrictMode>
);
