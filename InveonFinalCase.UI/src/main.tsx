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
import CreateCourse from "./pages/auth/instructor/CreateCourse.tsx";
import Unauthorized from "./pages/auth/Unauthorized.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
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
  {
    path: "/instructor",
    element: (
      <RequireAuth allowedRoles={["Instructor"]}>
        <CreateCourse />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
  },
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
