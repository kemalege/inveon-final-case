import ErrorPage from "@/components/Error";
import { Loading } from "@/components/Loading";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import OrderItem from "./components/OrderItem";
import { Order } from "./types";

export default function PurchaseHistory() {

  const axiosPrivate = useAxiosPrivate();

  const jwt = localStorage.getItem("accessToken");
  const decodedToken = jwt ? jwtDecode(jwt) : null;

  const getPurchaseHistory = async (userId: string) => {
    const response = await axiosPrivate.get(`/orders/user/${userId}`);
    return response.data;
  };

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["userOrders", decodedToken?.sub],
    queryFn: () => getPurchaseHistory(decodedToken?.sub as string),
    enabled: !!decodedToken?.sub,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="max-w-6xl mx-auto p-8">
    <h1 className="text-3xl font-bold mb-6">Purchase History</h1>
    <div className="flex text-foreground space-x-6 border-b border-border pb-2 font-semibold">
      <span className="w-2/5">Course</span>
      <span className="w-1/5">Date</span>
      <span className="w-1/5">Total Price</span>
      <span className="w-1/5">Payment Method</span>
    </div>
    {orders.length > 0 ? (
      orders.map((order: Order) => <OrderItem key={order.id} order={order} />)
    ) : (
      <p className="text-muted-foreground mt-4">No orders found.</p>
    )}
  </div>
  );
}
