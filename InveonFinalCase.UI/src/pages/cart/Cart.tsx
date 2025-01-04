import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import CartItem from "./components/CartItem";
import { useCart } from "./context/CartContext";

export default function Cart() {

  const { cart, removeFromCart, clearCart, totalAmount } = useCart();

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="md:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-lg font-medium text-muted-foreground">
          There are {cart.length} items in the cart
        </p>

        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
            />
          ))
        ) : (
          <p className="text-muted-foreground">Your cart is empty.</p>
        )}
      </div>

      <div className="p-6 bg-card space-y-2">
        <div className="space-y-1">
            <span className="text-sm text-muted-foreground font-medium">
                Toplam:
            </span>
            <div className="text-3xl font-bold">
                ₺{totalAmount.toFixed(2)}
            </div>
        </div>
        <Button className="w-full rounded-none bg-purple-600 text-white">Checkout</Button>
        <Separator />
        <Button variant="outline" className="w-full rounded-none" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}
