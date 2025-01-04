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
import CourseDetail from "./pages/course/details/CourseDetail.tsx";
import { CartProvider } from "./pages/cart/context/CartContext.tsx";
import Cart from "./pages/cart/Cart.tsx";
import Checkout from "./pages/checkout/Checkout.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess.tsx";
import PurchaseHistory from "./pages/order/PurchaseHistory.tsx";
import NotFound from "./components/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout />,
    children: [
        { path: "/", element: <Home /> },
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
          path: "/course/:courseId",
          element: <CourseDetail />,
          errorElement: <ErrorPage />,
        },
        {
          path: "instructor",
          element: (
              <RequireAuth allowedRoles={['Instructor']}>
                  <Home />
              </RequireAuth>
          ),
        },
        {
          path: "/cart",
          element: (
              <RequireAuth>
                  <Cart />
              </RequireAuth>
          ),
        },
        {
          path: "/checkout",
          element: (
              <RequireAuth>
                  <Checkout />
              </RequireAuth>
          ),
        },
        {
          path: "/order-success",
          element: <CheckoutSuccess />,
        },
        {
          path: "/purchase-history",
          element: (
              <RequireAuth>
                <PurchaseHistory />
              </RequireAuth>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "*",
          element: <NotFound />, 
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
          <CartProvider>
            <RouterProvider router={router} />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </App>
    </QueryClientProvider>
  </StrictMode>
);
