import { useCart } from "@/pages/cart/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";

interface CartButtonProps {
  cartItemCount: number;
}

export const CartHeaderButton = ({ cartItemCount }: CartButtonProps) => {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <button
      onClick={() => navigate("/cart")}
      className="relative p-2 rounded-full hover:bg-muted transition"
    >
      <ShoppingCart className="w-6 h-6 text-primary" />

      {cartItemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-purple-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
          {cart.length}
        </span>
      )}
    </button>
  );
};
