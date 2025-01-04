import { Link } from "react-router";

export default function CheckoutSuccess() {
  return (
    <div className="max-w-xl mx-auto mt-16 p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Your order has been placed!</h1>
      <p className="text-muted-foreground mb-6">
        Your payment was successfully completed.
      </p>
      <Link 
        to="/"
        className="inline-block text-primary hover:underline"
      >
        You can continue learning
      </Link>
    </div>
  );
}
